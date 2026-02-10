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
from datetime import datetime, timezone

import httpx

_SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
_SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "")


def _headers() -> dict[str, str]:
    return {
        "apikey": _SUPABASE_KEY,
        "Authorization": f"Bearer {_SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    }


def _rest_url(table: str) -> str:
    return f"{_SUPABASE_URL}/rest/v1/{table}"


def is_enabled() -> bool:
    return bool(_SUPABASE_URL and _SUPABASE_KEY)


async def add_vote(place_id: str, vote: str) -> None:
    """Insert a verification vote ('yes' or 'no')."""
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            _rest_url("verifications"),
            headers=_headers(),
            json={"place_id": place_id, "vote": vote},
        )
        resp.raise_for_status()


async def get_stats(place_ids: list[str]) -> dict[str, dict]:
    """
    Fetch verification stats for a list of place_ids.
    Returns {place_id: {yes: int, no: int, last_vote: str|None}}.
    """
    if not place_ids or not is_enabled():
        return {}

    # Fetch all votes for the given place_ids in one query
    ids_filter = ",".join(place_ids)
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            _rest_url("verifications"),
            headers={
                "apikey": _SUPABASE_KEY,
                "Authorization": f"Bearer {_SUPABASE_KEY}",
            },
            params={
                "select": "place_id,vote,created_at",
                "place_id": f"in.({ids_filter})",
                "order": "created_at.desc",
            },
        )
        resp.raise_for_status()
        rows = resp.json()

    # Aggregate
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
    from datetime import date, timedelta
    today = date.today()
    monday = today - timedelta(days=today.weekday())
    return monday.isoformat()


async def get_leaderboard(city: str) -> list[dict]:
    """Fetch top 10 contributors for a city this week."""
    if not is_enabled() or not city:
        return []

    week = _current_week_start()
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            _rest_url("leaderboard"),
            headers={
                "apikey": _SUPABASE_KEY,
                "Authorization": f"Bearer {_SUPABASE_KEY}",
            },
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

    week = _current_week_start()
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            _rest_url("leaderboard"),
            headers={
                **_headers(),
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
