"""
Google Places API (New) integration for SkillFinder.

Fetches real businesses and their reviews via Text Search,
then transforms the data into the format expected by our
scoring algorithm.
"""

import os
import logging

import httpx

logger = logging.getLogger(__name__)

PLACES_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText"

# Only request the fields we need — keeps responses fast and costs low.
FIELD_MASK = ",".join([
    "places.displayName",
    "places.formattedAddress",
    "places.rating",
    "places.userRatingCount",
    "places.reviews",
    "places.photos",
])


def _get_api_key() -> str:
    key = os.environ.get("GOOGLE_API_KEY")
    if not key:
        raise RuntimeError(
            "GOOGLE_API_KEY is not set. "
            "Add it to your environment variables on Render."
        )
    return key


async def search_places(query: str, location: str = "France") -> list[dict]:
    """
    Call Google Places Text Search (New) and return a list of businesses
    in the format expected by rank_businesses():

        {
            "name": str,
            "address": str,
            "global_rating": float,
            "reviews": list[str],
            "photo_url": str | None,
        }
    """
    api_key = _get_api_key()

    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": FIELD_MASK,
    }

    body = {
        "textQuery": query,
        "languageCode": "fr",
    }

    async with httpx.AsyncClient(timeout=15.0) as client:
        resp = await client.post(PLACES_SEARCH_URL, headers=headers, json=body)

    if resp.status_code != 200:
        logger.error("Google Places API error %s: %s", resp.status_code, resp.text)
        raise RuntimeError(f"Google Places API returned {resp.status_code}")

    data = resp.json()
    places = data.get("places", [])

    return [_transform_place(place) for place in places]


def _transform_place(place: dict) -> dict:
    """Convert a Google Places API response into our internal format."""
    name = place.get("displayName", {}).get("text", "Unknown")
    address = place.get("formattedAddress", "")
    rating = place.get("rating", 0.0)

    # Extract review texts — gracefully handle places with no reviews
    raw_reviews = place.get("reviews", [])
    reviews = []
    for r in raw_reviews:
        text = r.get("text", {}).get("text", "")
        if text:
            reviews.append(text)

    # Get first photo reference (for future use in the UI)
    photos = place.get("photos", [])
    photo_name = photos[0].get("name", "") if photos else None

    return {
        "name": name,
        "address": address,
        "global_rating": rating,
        "reviews": reviews,
        "photo_name": photo_name,
    }
