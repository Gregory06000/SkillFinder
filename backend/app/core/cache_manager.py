"""
SQLite caching layer for search results.
Avoids redundant Google Places + LLM calls for identical queries.
"""

import json
import sqlite3
import threading
import unicodedata
from datetime import datetime, timedelta, timezone
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent.parent / "cache.db"

_conn: sqlite3.Connection | None = None
_lock = threading.Lock()


def _get_conn() -> sqlite3.Connection:
    global _conn
    if _conn is None:
        _conn = sqlite3.connect(str(DB_PATH), check_same_thread=False)
        _conn.execute(
            """
            CREATE TABLE IF NOT EXISTS search_cache (
                search_key  TEXT PRIMARY KEY,
                json_results TEXT NOT NULL,
                created_at  TEXT NOT NULL,
                expires_at  TEXT NOT NULL
            )
            """
        )
        _conn.commit()
    return _conn


def _normalize(text: str) -> str:
    """Lowercase, strip accents, collapse whitespace."""
    text = text.strip().lower()
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    return "_".join(text.split())


def _make_key(city: str, service: str, keyword: str, radius_km: int) -> str:
    return f"{_normalize(city)}_{_normalize(service)}_{_normalize(keyword)}_{radius_km}"


def get_cached_search(
    city: str, service: str, keyword: str, radius_km: int
) -> dict | None:
    """Return cached response dict if a valid (non-expired) entry exists."""
    key = _make_key(city, service, keyword, radius_km)
    with _lock:
        conn = _get_conn()
        row = conn.execute(
            "SELECT json_results, expires_at FROM search_cache WHERE search_key = ?",
            (key,),
        ).fetchone()

        if row is None:
            return None

        expires_at = datetime.fromisoformat(row[1])
        if datetime.now(timezone.utc) > expires_at:
            conn.execute("DELETE FROM search_cache WHERE search_key = ?", (key,))
            conn.commit()
            return None

        cached = json.loads(row[0])

        # Don't serve cached empty results — let the search retry
        if not cached.get("results"):
            conn.execute("DELETE FROM search_cache WHERE search_key = ?", (key,))
            conn.commit()
            return None

    return cached


def save_search_to_cache(
    city: str,
    service: str,
    keyword: str,
    radius_km: int,
    data: dict,
    duration_days: int = 7,
) -> None:
    """Insert or replace a search result in the cache."""
    key = _make_key(city, service, keyword, radius_km)
    now = datetime.now(timezone.utc)
    expires = now + timedelta(days=duration_days)
    with _lock:
        conn = _get_conn()
        conn.execute(
            """
            INSERT OR REPLACE INTO search_cache (search_key, json_results, created_at, expires_at)
            VALUES (?, ?, ?, ?)
            """,
            (key, json.dumps(data, ensure_ascii=False), now.isoformat(), expires.isoformat()),
        )
        conn.commit()
