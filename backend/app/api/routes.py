import os

from fastapi import APIRouter, HTTPException
from fastapi.responses import Response

from app.models.schemas import SearchRequest, SearchResponse, BusinessResult
from app.core.scoring import rank_businesses
from app.data.mock_data import get_businesses_by_category, get_all_categories

router = APIRouter()


def _is_google_enabled() -> bool:
    return bool(os.environ.get("GOOGLE_API_KEY"))


@router.post("/search", response_model=SearchResponse)
async def search(req: SearchRequest):
    if _is_google_enabled():
        from app.services.google_maps import search_places, geocode

        # Geocode location if provided
        center = None
        if req.location:
            center = await geocode(req.location)

        query = f"{req.service} {req.keyword}"
        if req.location:
            query = f"{req.service} {req.keyword} {req.location}"

        try:
            businesses = await search_places(
                query=query,
                center=center,
                radius_km=req.radius_km if center else None,
            )
        except RuntimeError as e:
            raise HTTPException(status_code=502, detail=str(e))

        if not businesses:
            raise HTTPException(
                status_code=404,
                detail=f"No results found for '{query}'.",
            )
    else:
        businesses = get_businesses_by_category(req.service)
        if not businesses:
            available = get_all_categories()
            raise HTTPException(
                status_code=404,
                detail=f"No mock data for '{req.service}'. Available: {available}",
            )

    ranked = rank_businesses(businesses, req.keyword, req.synonyms or None)
    return SearchResponse(
        service=req.service,
        keyword=req.keyword,
        results=[BusinessResult(**r) for r in ranked],
    )


@router.get("/photo")
async def photo_proxy(ref: str):
    """
    Proxy endpoint for Google Places photos.
    Keeps the API key server-side so it's never exposed to the frontend.
    """
    if not ref or not _is_google_enabled():
        raise HTTPException(status_code=404, detail="Photo not available")

    from app.services.google_maps import fetch_photo_bytes

    try:
        image_bytes, content_type = await fetch_photo_bytes(ref)
    except RuntimeError:
        raise HTTPException(status_code=502, detail="Failed to fetch photo")

    return Response(
        content=image_bytes,
        media_type=content_type,
        headers={"Cache-Control": "public, max-age=86400"},
    )


@router.get("/reverse-geocode")
async def reverse_geocode_endpoint(lat: float, lng: float):
    """Convert lat/lng to a readable city name."""
    if not _is_google_enabled():
        return {"location": f"{lat:.4f}, {lng:.4f}"}

    from app.services.google_maps import reverse_geocode

    name = await reverse_geocode(lat, lng)
    return {"location": name}


@router.get("/categories")
async def categories():
    return {
        "categories": get_all_categories(),
        "google_enabled": _is_google_enabled(),
    }
