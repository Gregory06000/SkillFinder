import os

from fastapi import APIRouter, HTTPException
from fastapi.responses import Response

from app.models.schemas import (
    SearchRequest, SearchResponse, BusinessResult,
    CompareRequest, CompareResponse, BusinessAnalysis,
    VerifyRequest, VerifyResponse,
)
from app.core.scoring import rank_businesses
from app.data.mock_data import get_businesses_by_category, get_all_categories

router = APIRouter()


def _is_google_enabled() -> bool:
    return bool(os.environ.get("GOOGLE_API_KEY"))


@router.post("/search", response_model=SearchResponse)
async def search(req: SearchRequest):
    center = None

    if _is_google_enabled():
        from app.services.google_maps import search_places, geocode

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
    results = [BusinessResult(**r) for r in ranked]

    # Merge community verification stats if Supabase is configured
    from app.services.supabase import is_enabled as supabase_enabled, get_stats
    if supabase_enabled():
        place_ids = [r.name for r in results]
        try:
            stats = await get_stats(place_ids)
            for r in results:
                s = stats.get(r.name)
                if s:
                    r.verification_yes = s["yes"]
                    r.verification_no = s["no"]
                    r.verification_last = s.get("last_vote")
        except Exception:
            pass  # Verification stats are non-critical

    return SearchResponse(
        service=req.service,
        keyword=req.keyword,
        results=results,
        center_lat=center[0] if center else None,
        center_lng=center[1] if center else None,
        radius_km=req.radius_km if center else None,
    )


@router.post("/compare", response_model=CompareResponse)
async def compare(req: CompareRequest):
    """Compare two businesses using Gemini LLM analysis."""
    if not _is_google_enabled():
        raise HTTPException(
            status_code=400,
            detail="La comparaison nécessite une clé API Google.",
        )

    from app.services.llm import compare_businesses

    try:
        analysis = await compare_businesses(
            biz1_name=req.business_1.name,
            biz1_reviews=req.business_1.reviews,
            biz2_name=req.business_2.name,
            biz2_reviews=req.business_2.reviews,
            keyword=req.keyword,
        )
    except RuntimeError as e:
        raise HTTPException(status_code=502, detail=str(e))

    biz1 = analysis.get("business_1", {})
    biz2 = analysis.get("business_2", {})

    return CompareResponse(
        business_1_name=req.business_1.name,
        business_1_analysis=BusinessAnalysis(
            strengths=biz1.get("strengths", []),
            weaknesses=biz1.get("weaknesses", []),
            price_range=biz1.get("price_range"),
            vibe=biz1.get("vibe"),
            service_speed=biz1.get("service_speed"),
        ),
        business_1_match_score=req.business_1.match_score,
        business_2_name=req.business_2.name,
        business_2_analysis=BusinessAnalysis(
            strengths=biz2.get("strengths", []),
            weaknesses=biz2.get("weaknesses", []),
            price_range=biz2.get("price_range"),
            vibe=biz2.get("vibe"),
            service_speed=biz2.get("service_speed"),
        ),
        business_2_match_score=req.business_2.match_score,
        verdict=analysis.get("verdict", ""),
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


@router.post("/verify", response_model=VerifyResponse)
async def verify(req: VerifyRequest):
    """Community verification: record a yes/no vote for a business."""
    if req.vote not in ("yes", "no"):
        raise HTTPException(status_code=400, detail="Vote must be 'yes' or 'no'")

    from app.services.supabase import is_enabled as supabase_enabled, add_vote

    if not supabase_enabled():
        raise HTTPException(
            status_code=503,
            detail="Le système de vérification n'est pas configuré.",
        )

    try:
        await add_vote(req.place_id, req.vote)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Erreur base de données: {e}")

    return VerifyResponse(success=True, message="Vote enregistré !")


@router.get("/categories")
async def categories():
    return {
        "categories": get_all_categories(),
        "google_enabled": _is_google_enabled(),
    }
