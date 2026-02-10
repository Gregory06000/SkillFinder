"""
Google Places API (New) integration for SkillFinder.

Fetches real businesses and their reviews via Text Search,
then transforms the data into the format expected by our
scoring algorithm. Supports geographic filtering via locationBias.
"""

import os
import math
import logging

import httpx

logger = logging.getLogger(__name__)

PLACES_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText"
GEOCODING_URL = "https://maps.googleapis.com/maps/api/geocode/json"

FIELD_MASK = ",".join([
    "places.displayName",
    "places.formattedAddress",
    "places.rating",
    "places.userRatingCount",
    "places.reviews",
    "places.photos",
    "places.googleMapsUri",
    "places.location",
])


def _get_api_key() -> str:
    key = os.environ.get("GOOGLE_API_KEY")
    if not key:
        raise RuntimeError(
            "GOOGLE_API_KEY is not set. "
            "Add it to your environment variables on Render."
        )
    return key


def _haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate the distance in km between two lat/lng points."""
    R = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2) ** 2
    )
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


async def geocode(address: str) -> tuple[float, float] | None:
    """
    Convert an address string to (latitude, longitude) using Google Geocoding API.
    Returns None if geocoding fails.
    """
    api_key = _get_api_key()
    params = {
        "address": address,
        "key": api_key,
        "language": "fr",
    }

    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(GEOCODING_URL, params=params)

    if resp.status_code != 200:
        logger.error("Geocoding API error %s: %s", resp.status_code, resp.text)
        return None

    data = resp.json()
    results = data.get("results", [])
    if not results:
        return None

    loc = results[0]["geometry"]["location"]
    return (loc["lat"], loc["lng"])


async def reverse_geocode(lat: float, lng: float) -> str:
    """
    Convert (latitude, longitude) to a human-readable location name.
    Returns the city/locality name, or a formatted address as fallback.
    """
    api_key = _get_api_key()
    params = {
        "latlng": f"{lat},{lng}",
        "key": api_key,
        "language": "fr",
        "result_type": "locality|sublocality|administrative_area_level_1",
    }

    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(GEOCODING_URL, params=params)

    if resp.status_code != 200:
        return f"{lat:.4f}, {lng:.4f}"

    data = resp.json()
    results = data.get("results", [])
    if not results:
        # Fallback: try without result_type filter
        params.pop("result_type")
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(GEOCODING_URL, params=params)
        data = resp.json()
        results = data.get("results", [])

    if not results:
        return f"{lat:.4f}, {lng:.4f}"

    return results[0].get("formatted_address", f"{lat:.4f}, {lng:.4f}")


def get_photo_url(photo_name: str, max_width: int = 600, max_height: int = 400) -> str:
    """Build a Google Places photo URL from a photo resource name."""
    api_key = _get_api_key()
    return (
        f"https://places.googleapis.com/v1/{photo_name}/media"
        f"?maxWidthPx={max_width}&maxHeightPx={max_height}&key={api_key}"
    )


async def fetch_photo_bytes(photo_name: str) -> tuple[bytes, str]:
    """Fetch photo binary from Google and return (bytes, content_type)."""
    url = get_photo_url(photo_name)
    async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
        resp = await client.get(url)
    if resp.status_code != 200:
        raise RuntimeError(f"Photo fetch failed: {resp.status_code}")
    content_type = resp.headers.get("content-type", "image/jpeg")
    return resp.content, content_type


async def search_places(
    query: str,
    center: tuple[float, float] | None = None,
    radius_km: int | None = None,
) -> list[dict]:
    """
    Call Google Places Text Search (New) and return a list of businesses.

    If center (lat, lng) and radius_km are provided, results are biased
    toward that geographic area using locationBias.
    """
    api_key = _get_api_key()

    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": FIELD_MASK,
    }

    body: dict = {
        "textQuery": query,
        "languageCode": "fr",
    }

    if center and radius_km:
        body["locationBias"] = {
            "circle": {
                "center": {
                    "latitude": center[0],
                    "longitude": center[1],
                },
                "radius": radius_km * 1000.0,
            }
        }

    async with httpx.AsyncClient(timeout=15.0) as client:
        resp = await client.post(PLACES_SEARCH_URL, headers=headers, json=body)

    if resp.status_code != 200:
        logger.error("Google Places API error %s: %s", resp.status_code, resp.text)
        raise RuntimeError(f"Google Places API returned {resp.status_code}")

    data = resp.json()
    places = data.get("places", [])

    return [_transform_place(place, center) for place in places]


def _transform_place(
    place: dict,
    search_center: tuple[float, float] | None = None,
) -> dict:
    """Convert a Google Places API response into our internal format."""
    name = place.get("displayName", {}).get("text", "Unknown")
    address = place.get("formattedAddress", "")
    rating = place.get("rating", 0.0)
    maps_url = place.get("googleMapsUri", "")

    # Extract review texts
    raw_reviews = place.get("reviews", [])
    reviews = []
    for r in raw_reviews:
        text = r.get("text", {}).get("text", "")
        if text:
            reviews.append(text)

    # Photo
    photos = place.get("photos", [])
    photo_name = photos[0].get("name", "") if photos else ""

    # Distance calculation
    distance_km: float | None = None
    location = place.get("location", {})
    place_lat = location.get("latitude")
    place_lng = location.get("longitude")
    if search_center and place_lat is not None and place_lng is not None:
        distance_km = round(
            _haversine_km(search_center[0], search_center[1], place_lat, place_lng),
            1,
        )

    return {
        "name": name,
        "address": address,
        "global_rating": rating,
        "reviews": reviews,
        "photo_name": photo_name,
        "maps_url": maps_url,
        "distance_km": distance_km,
        "lat": place_lat,
        "lng": place_lng,
    }
