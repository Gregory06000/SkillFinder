import os
import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.api.routes import router

logger = logging.getLogger("skillfinder")

# ── Rate Limiter ──────────────────────────────

limiter = Limiter(key_func=get_remote_address, default_limits=["60/minute"])

app = FastAPI(
    title="SkillFinder API",
    description="Rank businesses by keyword-specific review sentiment",
    version="0.2.0",
)

app.state.limiter = limiter


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"detail": "Trop de requêtes. Réessayez dans quelques instants."},
    )


# ── CORS ──────────────────────────────────────

allowed_origins = [
    "http://localhost:3000",
]
# In production, add your Vercel URL
extra_origin = os.environ.get("FRONTEND_URL")
if extra_origin:
    allowed_origins.append(extra_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

app.include_router(router, prefix="/api")


# ── Startup validation ────────────────────────

@app.on_event("startup")
async def validate_environment():
    """Log which external services are configured at startup."""
    google = bool(os.environ.get("GOOGLE_API_KEY"))
    gemini = bool(os.environ.get("GEMINI_API_KEY"))
    supabase = bool(os.environ.get("SUPABASE_URL") and os.environ.get("SUPABASE_KEY"))
    frontend = os.environ.get("FRONTEND_URL", "")

    logger.info("── SkillFinder startup ──")
    logger.info("  Google Places API : %s", "OK" if google else "MISSING")
    logger.info("  Gemini API        : %s", "OK" if gemini else "MISSING (lexicon fallback)")
    logger.info("  Supabase          : %s", "OK" if supabase else "DISABLED")
    logger.info("  Frontend URL      : %s", frontend or "localhost only")

    if not google:
        logger.warning(
            "GOOGLE_API_KEY not set — search will use mock data only."
        )


# ── Health check ──────────────────────────────

@app.get("/health")
async def health():
    return {
        "status": "ok",
        "services": {
            "google": bool(os.environ.get("GOOGLE_API_KEY")),
            "gemini": bool(os.environ.get("GEMINI_API_KEY")),
            "supabase": bool(os.environ.get("SUPABASE_URL")),
        },
    }
