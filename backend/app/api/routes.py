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
        from app.services.google_maps import search_places

        query = f"{req.service} {req.keyword}"
        try:
            businesses = await search_places(query)
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
    Usage: /api/photo?ref=places/PLACE_ID/photos/PHOTO_REF
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


@router.get("/categories")
async def categories():
    return {
        "categories": get_all_categories(),
        "google_enabled": _is_google_enabled(),
    }
