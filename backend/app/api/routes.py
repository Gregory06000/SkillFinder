from fastapi import APIRouter, HTTPException

from app.models.schemas import SearchRequest, SearchResponse, BusinessResult
from app.core.scoring import rank_businesses
from app.data.mock_data import get_businesses_by_category, get_all_categories

router = APIRouter()


@router.post("/search", response_model=SearchResponse)
async def search(req: SearchRequest):
    businesses = get_businesses_by_category(req.service)
    if not businesses:
        available = get_all_categories()
        raise HTTPException(
            status_code=404,
            detail=f"No data for service '{req.service}'. Available: {available}",
        )

    ranked = rank_businesses(businesses, req.keyword, req.synonyms or None)
    return SearchResponse(
        service=req.service,
        keyword=req.keyword,
        results=[BusinessResult(**r) for r in ranked],
    )


@router.get("/categories")
async def categories():
    return {"categories": get_all_categories()}
