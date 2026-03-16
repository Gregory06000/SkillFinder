"""
Supabase REST API client for community verification + leaderboard.
Uses httpx to call the Supabase PostgREST API — no extra dependencies needed.

Required env vars:
  SUPABASE_URL  – e.g. https://xxxx.supabase.co
  SUPABASE_KEY  – the "anon" public key (safe for server-side usage)

SQL to run in Supabase SQL Editor:

  -- Verification votes (one vote per user per place)
  CREATE TABLE verifications (
      id          BIGSERIAL PRIMARY KEY,
      place_id    TEXT NOT NULL,
      user_id     UUID NOT NULL,
      vote        TEXT NOT NULL CHECK (vote IN ('yes', 'no')),
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (place_id, user_id)
  );
  CREATE INDEX idx_verifications_place ON verifications (place_id);

  -- Migration for existing table:
  -- ALTER TABLE verifications ADD COLUMN IF NOT EXISTS user_id UUID;
  -- ALTER TABLE verifications ADD CONSTRAINT verifications_place_user_unique
  --   UNIQUE (place_id, user_id);

  -- Aggregated view (server-side — avoids fetching all rows)
  CREATE OR REPLACE VIEW verification_stats AS
  SELECT
      place_id,
      COUNT(*) FILTER (WHERE vote = 'yes') AS yes_count,
      COUNT(*) FILTER (WHERE vote = 'no')  AS no_count,
      MAX(created_at)                       AS last_vote
  FROM verifications
  GROUP BY place_id;

  -- Leaderboard scores
  CREATE TABLE leaderboard (
      id              BIGSERIAL PRIMARY KEY,
      pseudo          TEXT NOT NULL,
      city            TEXT NOT NULL,
      weekly_points   INT NOT NULL DEFAULT 0,
      total_points    INT NOT NULL DEFAULT 0,
      week_start      DATE NOT NULL,
      updated_at      TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (pseudo, city, week_start)
  );
  CREATE INDEX idx_leaderboard_city_week ON leaderboard (city, week_start);

  -- Comment reports (moderation)
  CREATE TABLE comment_reports (
      id          BIGSERIAL PRIMARY KEY,
      comment_id  UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
      reporter_id UUID NOT NULL,
      reason      TEXT NOT NULL DEFAULT 'inappropriate',
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (comment_id, reporter_id)
  );
  ALTER TABLE comment_reports ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Users can report" ON comment_reports FOR INSERT
    TO authenticated WITH CHECK (auth.uid() = reporter_id);

  -- Auto-hide: add report_count to comments + trigger
  ALTER TABLE comments ADD COLUMN IF NOT EXISTS report_count INT NOT NULL DEFAULT 0;

  CREATE OR REPLACE FUNCTION increment_report_count()
  RETURNS TRIGGER AS $$
  BEGIN
    UPDATE comments SET report_count = report_count + 1 WHERE id = NEW.comment_id;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  CREATE TRIGGER trg_increment_report_count
    AFTER INSERT ON comment_reports
    FOR EACH ROW EXECUTE FUNCTION increment_report_count();
"""

import asyncio
import os
import logging
from datetime import date, timedelta

from html import escape as html_escape

import httpx
import jwt

logger = logging.getLogger("skillfinder.supabase")

_SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
_SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "")
_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
_JWT_SECRET = os.environ.get("SUPABASE_JWT_SECRET", "")

# Singleton client — avoids creating a new TCP connection per request
_client: httpx.AsyncClient | None = None
_client_lock: asyncio.Lock | None = None


def _get_lock() -> asyncio.Lock:
    """Return (creating if necessary) the module-level asyncio Lock.

    The Lock must be created inside the running event loop, so we lazily
    instantiate it on first use rather than at import time.
    """
    global _client_lock
    if _client_lock is None:
        _client_lock = asyncio.Lock()
    return _client_lock


async def _get_client() -> httpx.AsyncClient:
    global _client
    if _client is not None and not _client.is_closed:
        return _client
    async with _get_lock():
        # Double-checked locking: another coroutine may have created it while
        # we were waiting for the lock.
        if _client is None or _client.is_closed:
            _client = httpx.AsyncClient(
                base_url=_SUPABASE_URL,
                headers={
                    "apikey": _SUPABASE_KEY,
                    "Authorization": f"Bearer {_SUPABASE_KEY}",
                },
                timeout=10.0,
            )
    return _client


def _write_headers() -> dict[str, str]:
    """Base write headers. If service_role key is available, use it to bypass RLS."""
    headers: dict[str, str] = {"Content-Type": "application/json", "Prefer": "return=minimal"}
    if _SERVICE_ROLE_KEY:
        headers["Authorization"] = f"Bearer {_SERVICE_ROLE_KEY}"
    return headers


def is_enabled() -> bool:
    return bool(_SUPABASE_URL and _SUPABASE_KEY)


async def add_vote(
    place_id: str, vote: str, user_id: str | None = None, user_token: str | None = None,
) -> None:
    """Insert or update a verification vote ('yes' or 'no').

    Uses upsert with ON CONFLICT (place_id, user_id) to enforce one vote per user
    per place. If the user votes again, their vote is updated.
    """
    client = await _get_client()
    headers: dict[str, str] = {"Content-Type": "application/json"}
    if _SERVICE_ROLE_KEY:
        headers["Authorization"] = f"Bearer {_SERVICE_ROLE_KEY}"
    elif user_token:
        headers["Authorization"] = f"Bearer {user_token}"
    # Use upsert: if (place_id, user_id) already exists, update the vote
    headers["Prefer"] = "resolution=merge-duplicates,return=minimal"
    payload: dict = {"place_id": place_id, "vote": vote}
    if user_id:
        payload["user_id"] = user_id
    resp = await client.post(
        "/rest/v1/verifications",
        headers=headers,
        json=payload,
    )
    resp.raise_for_status()


async def get_user_votes(place_ids: list[str], user_id: str) -> list[str]:
    """Return which of the given place_ids the user has already voted on."""
    if not place_ids or not is_enabled():
        return []
    client = await _get_client()
    headers: dict[str, str] = {}
    if _SERVICE_ROLE_KEY:
        headers["Authorization"] = f"Bearer {_SERVICE_ROLE_KEY}"
    ids_filter = ",".join(place_ids)
    resp = await client.get(
        "/rest/v1/verifications",
        headers=headers,
        params={
            "select": "place_id",
            "user_id": f"eq.{user_id}",
            "place_id": f"in.({ids_filter})",
        },
    )
    if resp.status_code != 200:
        return []
    return [row["place_id"] for row in resp.json()]


async def get_stats(place_ids: list[str]) -> dict[str, dict]:
    """
    Fetch verification stats for a list of place_ids.
    Uses the verification_stats SQL view for server-side aggregation.
    Falls back to client-side aggregation if the view doesn't exist.
    Returns {place_id: {yes: int, no: int, last_vote: str|None}}.
    """
    if not place_ids or not is_enabled():
        return {}

    client = await _get_client()
    ids_filter = ",".join(place_ids)

    # Try the aggregated view first (fast: 1 row per place_id)
    resp = await client.get(
        "/rest/v1/verification_stats",
        params={
            "select": "place_id,yes_count,no_count,last_vote",
            "place_id": f"in.({ids_filter})",
        },
    )

    if resp.status_code == 200:
        rows = resp.json()
        return {
            row["place_id"]: {
                "yes": row["yes_count"],
                "no": row["no_count"],
                "last_vote": row.get("last_vote"),
            }
            for row in rows
        }

    # Fallback: fetch raw rows and aggregate in Python
    resp = await client.get(
        "/rest/v1/verifications",
        params={
            "select": "place_id,vote,created_at",
            "place_id": f"in.({ids_filter})",
            "order": "created_at.desc",
        },
    )
    resp.raise_for_status()
    rows = resp.json()

    stats: dict[str, dict] = {}
    for row in rows:
        pid = row["place_id"]
        if pid not in stats:
            stats[pid] = {"yes": 0, "no": 0, "last_vote": row["created_at"]}
        if row["vote"] == "yes":
            stats[pid]["yes"] += 1
        else:
            stats[pid]["no"] += 1
    return stats


# ── Leaderboard ──────────────────────────────

def _current_week_start() -> str:
    """Return ISO date string of Monday 00:00 for the current week."""
    today = date.today()
    monday = today - timedelta(days=today.weekday())
    return monday.isoformat()


async def get_leaderboard(city: str, limit: int = 50) -> list[dict]:
    """Fetch top contributors for a city this week."""
    if not is_enabled() or not city:
        return []

    client = await _get_client()
    week = _current_week_start()
    resp = await client.get(
        "/rest/v1/leaderboard",
        params={
            "select": "pseudo,weekly_points,total_points,city,user_id",
            "city": f"eq.{city}",
            "week_start": f"eq.{week}",
            "order": "weekly_points.desc",
            "limit": str(limit),
        },
    )
    resp.raise_for_status()
    return resp.json()


async def search_cities(query: str) -> list[str]:
    """Search for distinct cities in the leaderboard matching a prefix."""
    if not is_enabled() or not query:
        return []

    # Sanitize: only keep alphanumeric, spaces, hyphens, apostrophes (city names)
    import re
    safe_query = re.sub(r"[^a-zA-ZÀ-ÿ0-9\s\-']", "", query.strip())
    if not safe_query:
        return []

    client = await _get_client()
    week = _current_week_start()
    resp = await client.get(
        "/rest/v1/leaderboard",
        params={
            "select": "city",
            "city": f"ilike.{safe_query}*",
            "week_start": f"eq.{week}",
            "order": "city.asc",
            "limit": "20",
        },
    )
    resp.raise_for_status()
    rows = resp.json()
    seen: set[str] = set()
    cities: list[str] = []
    for row in rows:
        c = row["city"]
        if c not in seen:
            seen.add(c)
            cities.append(c)
    return cities


async def upsert_leaderboard(
    pseudo: str,
    city: str,
    weekly_points: int,
    total_points: int,
    user_id: str | None = None,
    user_token: str | None = None,
) -> None:
    """Insert or update a leaderboard entry for this week.

    Uses PATCH first to update any existing row matching (pseudo, city, week_start),
    then falls back to POST if no row exists. This handles cases where old entries
    were created without user_id.
    """
    if not is_enabled():
        return

    client = await _get_client()
    week = _current_week_start()

    auth_headers: dict[str, str] = {}
    if _SERVICE_ROLE_KEY:
        auth_headers["Authorization"] = f"Bearer {_SERVICE_ROLE_KEY}"
    elif user_token:
        auth_headers["Authorization"] = f"Bearer {user_token}"

    # 1) Try PATCH: update existing row matching (pseudo, city, week_start)
    update_payload: dict = {
        "weekly_points": weekly_points,
        "total_points": total_points,
    }
    if user_id:
        update_payload["user_id"] = user_id

    patch_resp = await client.patch(
        "/rest/v1/leaderboard",
        params={
            "pseudo": f"eq.{pseudo}",
            "city": f"eq.{city}",
            "week_start": f"eq.{week}",
            "total_points": f"lte.{total_points}",
        },
        headers={
            "Content-Type": "application/json",
            "Prefer": "return=headers-only",
            **auth_headers,
        },
        json=update_payload,
    )

    # Check if PATCH updated any rows via content-range header.
    # PostgREST returns "0-N/total" when rows match, "*/0" when nothing matched.
    # Parse the count after "/" to determine if at least one row was updated.
    content_range = patch_resp.headers.get("content-range", "")
    updated_count = 0
    if "/" in content_range:
        try:
            updated_count = int(content_range.split("/", 1)[1])
        except (ValueError, IndexError):
            pass
    if patch_resp.status_code == 200 and updated_count > 0:
        # Updated at least one row — done
        return

    # 2) No existing row: INSERT new entry
    insert_payload: dict = {
        "pseudo": pseudo,
        "city": city,
        "weekly_points": weekly_points,
        "total_points": total_points,
        "week_start": week,
    }
    if user_id:
        insert_payload["user_id"] = user_id

    resp = await client.post(
        "/rest/v1/leaderboard",
        headers={
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates,return=minimal",
            **auth_headers,
        },
        json=insert_payload,
    )
    resp.raise_for_status()


async def get_user_profile(user_id: str) -> dict | None:
    """
    Fetch the most recent leaderboard entry for a user_id.
    Returns {pseudo, total_points, weekly_points, city} or None.
    """
    if not is_enabled() or not user_id:
        return None

    client = await _get_client()
    resp = await client.get(
        "/rest/v1/leaderboard",
        params={
            "select": "pseudo,total_points,weekly_points,city,week_start",
            "user_id": f"eq.{user_id}",
            "order": "updated_at.desc",
            "limit": "1",
        },
    )
    resp.raise_for_status()
    rows = resp.json()
    if not rows:
        return None

    row = rows[0]
    # If the entry is from a previous week, weekly_points should be 0
    current_week = _current_week_start()
    # Supabase may return date as "2026-02-16" or "2026-02-16T00:00:00+00:00"
    row_week = str(row.get("week_start", ""))[:10]
    weekly = row["weekly_points"] if row_week == current_week else 0

    return {
        "pseudo": row["pseudo"],
        "total_points": row["total_points"],
        "weekly_points": weekly,
        "city": row["city"],
    }


# ── Authentication ──────────────────────────────


# ── Admin Stats ──────────────────────────────


async def get_admin_stats() -> dict:
    """Fetch aggregated stats for the admin dashboard."""
    if not is_enabled():
        return {}

    client = await _get_client()
    week = _current_week_start()

    # Total votes
    votes_resp = await client.get(
        "/rest/v1/verifications",
        params={"select": "id", "order": "id.desc", "limit": "1"},
        headers={"Prefer": "count=exact", "Range-Unit": "items", "Range": "0-0"},
    )
    total_votes = 0
    cr = votes_resp.headers.get("content-range", "")
    if "/" in cr:
        try:
            total_votes = int(cr.split("/")[1])
        except (ValueError, IndexError):
            pass

    # Active users this week
    lb_resp = await client.get(
        "/rest/v1/leaderboard",
        params={
            "select": "id",
            "week_start": f"eq.{week}",
        },
        headers={"Prefer": "count=exact", "Range-Unit": "items", "Range": "0-0"},
    )
    active_users = 0
    cr2 = lb_resp.headers.get("content-range", "")
    if "/" in cr2:
        try:
            active_users = int(cr2.split("/")[1])
        except (ValueError, IndexError):
            pass

    # Top 10 cities this week by number of contributors
    cities_resp = await client.get(
        "/rest/v1/leaderboard",
        params={
            "select": "city,weekly_points",
            "week_start": f"eq.{week}",
            "order": "weekly_points.desc",
            "limit": "200",
        },
    )
    city_counts: dict[str, dict] = {}
    if cities_resp.status_code == 200:
        for row in cities_resp.json():
            c = row["city"]
            if c not in city_counts:
                city_counts[c] = {"contributors": 0, "points": 0}
            city_counts[c]["contributors"] += 1
            city_counts[c]["points"] += row["weekly_points"]
    top_cities = sorted(city_counts.items(), key=lambda x: x[1]["contributors"], reverse=True)[:10]

    # Top 10 contributors this week
    top_resp = await client.get(
        "/rest/v1/leaderboard",
        params={
            "select": "pseudo,city,weekly_points,total_points",
            "week_start": f"eq.{week}",
            "order": "weekly_points.desc",
            "limit": "10",
        },
    )
    top_contributors = top_resp.json() if top_resp.status_code == 200 else []

    # Recent votes (last 20)
    recent_resp = await client.get(
        "/rest/v1/verifications",
        params={
            "select": "place_id,vote,created_at",
            "order": "created_at.desc",
            "limit": "20",
        },
    )
    recent_votes = recent_resp.json() if recent_resp.status_code == 200 else []

    return {
        "total_votes": total_votes,
        "active_users_week": active_users,
        "top_cities": [{"city": c, **d} for c, d in top_cities],
        "top_contributors": top_contributors,
        "recent_votes": recent_votes,
    }


# ── Comments ──────────────────────────────

async def get_comments(place_id: str, keyword: str, limit: int = 5, offset: int = 0) -> dict:
    """Fetch comments for a given place + keyword, newest first.
    Fetches limit+1 rows to detect whether more exist (has_more flag).
    Returns {"comments": [...], "has_more": bool}.
    """
    if not is_enabled():
        return {"comments": [], "has_more": False}
    client = await _get_client()
    resp = await client.get(
        "/rest/v1/comments",
        params={
            "select": "id,user_id,pseudo,content,created_at",
            "place_id": f"eq.{place_id}",
            "keyword": f"eq.{keyword.strip().lower()}",
            "report_count": "lt.5",
            "order": "created_at.desc",
            "limit": str(limit + 1),
            "offset": str(offset),
        },
    )
    if resp.status_code != 200:
        logger.warning("get_comments failed: %s %s", resp.status_code, resp.text)
        return {"comments": [], "has_more": False}
    rows = resp.json()
    has_more = len(rows) > limit
    return {"comments": rows[:limit], "has_more": has_more}


async def add_comment(
    place_id: str, keyword: str, user_id: str, pseudo: str, content: str,
    user_token: str | None = None,
) -> dict:
    """Insert or update a comment (one per user per place+keyword).
    Checks for an existing row first, then PATCHes by primary key ID or INSERTs.
    Returns the resulting row.
    """
    client = await _get_client()
    auth_headers: dict[str, str] = {}
    if _SERVICE_ROLE_KEY:
        auth_headers["Authorization"] = f"Bearer {_SERVICE_ROLE_KEY}"
    elif user_token:
        auth_headers["Authorization"] = f"Bearer {user_token}"

    normalized_keyword = keyword.strip().lower()
    content = content.strip()
    pseudo = pseudo.strip()

    # 1) Look for an existing comment by this user for this place+keyword
    get_resp = await client.get(
        "/rest/v1/comments",
        params={
            "select": "id",
            "place_id": f"eq.{place_id}",
            "keyword": f"eq.{normalized_keyword}",
            "user_id": f"eq.{user_id}",
            "limit": "1",
        },
        headers=auth_headers,
    )
    existing_id: str | None = None
    if get_resp.status_code == 200:
        rows = get_resp.json()
        if rows:
            existing_id = rows[0]["id"]

    if existing_id:
        # 2) Update by primary key — no ambiguity, bypasses any RLS filter issues
        patch_resp = await client.patch(
            "/rest/v1/comments",
            params={"id": f"eq.{existing_id}"},
            headers={
                "Content-Type": "application/json",
                "Prefer": "return=representation",
                **auth_headers,
            },
            json={"content": content},
        )
        patch_resp.raise_for_status()
        rows = patch_resp.json()
        return rows[0] if rows else {}

    # 3) No existing row — INSERT
    insert_resp = await client.post(
        "/rest/v1/comments",
        headers={
            "Content-Type": "application/json",
            "Prefer": "return=representation",
            **auth_headers,
        },
        json={
            "place_id": place_id,
            "keyword": normalized_keyword,
            "user_id": user_id,
            "pseudo": pseudo,
            "content": content,
        },
    )
    insert_resp.raise_for_status()
    rows = insert_resp.json()
    return rows[0] if rows else {}


async def delete_comment(comment_id: str, user_id: str, user_token: str | None = None) -> bool:
    """Delete a comment by ID, only if it belongs to user_id. Returns True on success."""
    if not is_enabled():
        return False
    client = await _get_client()
    auth_headers: dict[str, str] = {}
    if _SERVICE_ROLE_KEY:
        auth_headers["Authorization"] = f"Bearer {_SERVICE_ROLE_KEY}"
    elif user_token:
        auth_headers["Authorization"] = f"Bearer {user_token}"

    # DELETE with both id and user_id filters — ownership enforced at DB level
    del_resp = await client.delete(
        "/rest/v1/comments",
        params={"id": f"eq.{comment_id}", "user_id": f"eq.{user_id}"},
        headers={"Prefer": "return=representation", **auth_headers},
    )
    if del_resp.status_code not in (200, 204):
        logger.warning("delete_comment failed: %s %s", del_resp.status_code, del_resp.text)
        return False
    # return=representation gives back deleted rows; empty list = nothing was deleted
    try:
        deleted = del_resp.json()
        return isinstance(deleted, list) and len(deleted) > 0
    except Exception:
        return del_resp.status_code == 204


async def report_comment(comment_id: str, user_id: str, reason: str = "inappropriate") -> bool:
    """Insert a report into the comment_reports table. One report per user per comment."""
    client = await _get_client()
    headers = _write_headers()
    headers["Prefer"] = "return=minimal"

    resp = await client.post(
        "/rest/v1/comment_reports",
        headers=headers,
        json={
            "comment_id": comment_id,
            "reporter_id": user_id,
            "reason": reason,
        },
    )
    # 201 = created, 409 = already reported (unique constraint)
    return resp.status_code in (201, 409)


async def get_user_from_token(authorization: str | None) -> str | None:
    """
    Extract and verify user_id from a Supabase JWT Bearer token.
    Tries local JWT decode first (fast), falls back to Supabase Auth API.
    Returns the user UUID string, or None if the token is invalid/missing.
    """
    if not authorization or not authorization.startswith("Bearer "):
        return None

    token = authorization[7:]  # Strip "Bearer "

    # 1) Try local JWT decode (fast, no network call)
    if _JWT_SECRET:
        try:
            payload = jwt.decode(
                token,
                _JWT_SECRET,
                algorithms=["HS256"],
                audience="authenticated",
            )
            user_id = payload.get("sub")
            if user_id:
                return user_id
        except jwt.ExpiredSignatureError:
            logger.warning("Expired JWT token")
            return None
        except jwt.InvalidTokenError as e:
            # Don't return None here — fall through to Auth API fallback
            logger.warning("Local JWT decode failed: %s — trying Auth API fallback", e)

    # 2) Fallback: verify via Supabase Auth API (works without JWT_SECRET)
    if not is_enabled():
        return None

    try:
        client = await _get_client()
        resp = await client.get(
            "/auth/v1/user",
            headers={
                "Authorization": f"Bearer {token}",
                "apikey": _SUPABASE_KEY,
            },
        )
        if resp.status_code == 200:
            user_data = resp.json()
            user_id = user_data.get("id")
            if user_id:
                logger.info("Token verified via Supabase Auth API (user_id=%s)", user_id)
                return user_id
        else:
            logger.warning("Supabase Auth API returned %s", resp.status_code)
    except Exception as e:
        logger.warning("Supabase Auth API call failed: %s", e)

    return None
