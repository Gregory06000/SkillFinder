import os

from fastapi import APIRouter, HTTPException

from app.models.schemas import SearchRequest, SearchResponse, BusinessResult
from app.core.scoring import rank_businesses
from app.data.mock_data import get_businesses_by_category, get_all_categories

router = APIRouter()


def _is_google_enabled() -> bool:
    return bool(os.environ.get("GOOGLE_API_KEY"))


@router.post("/search", response_model=SearchResponse)
async def search(req: SearchRequest):
    if _is_google_enabled():
        # Real data from Google Places API
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
        # Fallback to mock data
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


@router.get("/categories")
async def categories():
    return {
        "categories": get_all_categories(),
        "google_enabled": _is_google_enabled(),
    }
