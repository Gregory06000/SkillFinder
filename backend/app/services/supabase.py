"""
Supabase REST API client for community verification + leaderboard.
Uses httpx to call the Supabase PostgREST API — no extra dependencies needed.

Required env vars:
  SUPABASE_URL  – e.g. https://xxxx.supabase.co
  SUPABASE_KEY  – the "anon" public key (safe for server-side usage)

SQL to run in Supabase SQL Editor:

  -- Verification votes
  CREATE TABLE verifications (
      id          BIGSERIAL PRIMARY KEY,
      place_id    TEXT NOT NULL,
      vote        TEXT NOT NULL CHECK (vote IN ('yes', 'no')),
      created_at  TIMESTAMPTZ DEFAULT NOW()
  );
  CREATE INDEX idx_verifications_place ON verifications (place_id);

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
"""

import os
import logging
from datetime import date, timedelta

import httpx
import jwt

logger = logging.getLogger("skillfinder.supabase")

_SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
_SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "")
_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
_JWT_SECRET = os.environ.get("SUPABASE_JWT_SECRET", "")

# Singleton client — avoids creating a new TCP connection per request
_client: httpx.AsyncClient | None = None


def _get_client() -> httpx.AsyncClient:
    global _client
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


async def add_vote(place_id: str, vote: str, user_token: str | None = None) -> None:
    """Insert a verification vote ('yes' or 'no')."""
    client = _get_client()
    headers = _write_headers()
    # _write_headers uses service_role key if available (bypasses RLS).
    # Otherwise, use the user's JWT so authenticated RLS policies work.
    if "Authorization" not in headers and user_token:
        headers["Authorization"] = f"Bearer {user_token}"
    resp = await client.post(
        "/rest/v1/verifications",
        headers=headers,
        json={"place_id": place_id, "vote": vote},
    )
    resp.raise_for_status()


async def get_stats(place_ids: list[str]) -> dict[str, dict]:
    """
    Fetch verification stats for a list of place_ids.
    Uses the verification_stats SQL view for server-side aggregation.
    Falls back to client-side aggregation if the view doesn't exist.
    Returns {place_id: {yes: int, no: int, last_vote: str|None}}.
    """
    if not place_ids or not is_enabled():
        return {}

    client = _get_client()
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

    client = _get_client()
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

    client = _get_client()
    week = _current_week_start()
    resp = await client.get(
        "/rest/v1/leaderboard",
        params={
            "select": "city",
            "city": f"ilike.{query}*",
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

    client = _get_client()
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
        },
        headers={
            "Content-Type": "application/json",
            "Prefer": "return=headers-only",
            **auth_headers,
        },
        json=update_payload,
    )

    # Check if PATCH updated any rows (content-range header tells us)
    content_range = patch_resp.headers.get("content-range", "")
    if patch_resp.status_code == 200 and "0-" in content_range:
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

    client = _get_client()
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
    weekly = row["weekly_points"] if row.get("week_start") == current_week else 0

    return {
        "pseudo": row["pseudo"],
        "total_points": row["total_points"],
        "weekly_points": weekly,
        "city": row["city"],
    }


# ── Authentication ──────────────────────────────


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
        client = _get_client()
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
