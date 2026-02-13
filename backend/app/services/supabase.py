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
from datetime import date, timedelta

import httpx

_SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
_SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "")

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
    return {"Content-Type": "application/json", "Prefer": "return=minimal"}


def is_enabled() -> bool:
    return bool(_SUPABASE_URL and _SUPABASE_KEY)


async def add_vote(place_id: str, vote: str) -> None:
    """Insert a verification vote ('yes' or 'no')."""
    client = _get_client()
    resp = await client.post(
        "/rest/v1/verifications",
        headers=_write_headers(),
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


async def get_leaderboard(city: str) -> list[dict]:
    """Fetch top 10 contributors for a city this week."""
    if not is_enabled() or not city:
        return []

    client = _get_client()
    week = _current_week_start()
    resp = await client.get(
        "/rest/v1/leaderboard",
        params={
            "select": "pseudo,weekly_points,total_points,city",
            "city": f"eq.{city}",
            "week_start": f"eq.{week}",
            "order": "weekly_points.desc",
            "limit": "10",
        },
    )
    resp.raise_for_status()
    return resp.json()


async def upsert_leaderboard(
    pseudo: str, city: str, weekly_points: int, total_points: int
) -> None:
    """Insert or update a leaderboard entry for this week."""
    if not is_enabled():
        return

    client = _get_client()
    week = _current_week_start()
    resp = await client.post(
        "/rest/v1/leaderboard",
        headers={
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates,return=minimal",
        },
        json={
            "pseudo": pseudo,
            "city": city,
            "weekly_points": weekly_points,
            "total_points": total_points,
            "week_start": week,
        },
    )
    resp.raise_for_status()
