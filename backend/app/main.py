import os
import logging

import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration
from sentry_sdk.integrations.starlette import StarletteIntegration

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.api.routes import router

logger = logging.getLogger("skillfinder")

# ── Sentry ────────────────────────────────────
_sentry_dsn = os.environ.get("SENTRY_DSN")
if _sentry_dsn:
    sentry_sdk.init(
        dsn=_sentry_dsn,
        integrations=[
            StarletteIntegration(transaction_style="endpoint"),
            FastApiIntegration(transaction_style="endpoint"),
        ],
        traces_sample_rate=0.1,
        # Don't send personally identifiable information
        send_default_pii=False,
    )

# ── Rate Limiter ──────────────────────────────

limiter = Limiter(key_func=get_remote_address, default_limits=["60/minute"])

# Disable API docs in production (FRONTEND_URL is only set in prod)
_is_prod = bool(os.environ.get("FRONTEND_URL"))

app = FastAPI(
    title="SkillFinder API",
    description="Rank businesses by keyword-specific review sentiment",
    version="0.2.0",
    docs_url=None if _is_prod else "/docs",
    redoc_url=None if _is_prod else "/redoc",
    openapi_url=None if _is_prod else "/openapi.json",
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
# In production, FRONTEND_URL can be a comma-separated list of allowed origins
# e.g. "https://skillfinder.fr,https://www.skillfinder.fr,https://skill-finder-o6lm-psi.vercel.app"
extra_origins = os.environ.get("FRONTEND_URL", "")
for origin in extra_origins.split(","):
    origin = origin.strip()
    if origin:
        allowed_origins.append(origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["GET", "POST", "DELETE"],
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

    sentry = bool(os.environ.get("SENTRY_DSN"))

    logger.info("── SkillFinder startup ──")
    logger.info("  Google Places API : %s", "OK" if google else "MISSING")
    logger.info("  Gemini API        : %s", "OK" if gemini else "MISSING (lexicon fallback)")
    logger.info("  Supabase          : %s", "OK" if supabase else "DISABLED")
    logger.info("  Sentry            : %s", "OK" if sentry else "DISABLED")
    logger.info("  Frontend URL      : %s", frontend or "localhost only")

    if not google:
        logger.warning(
            "GOOGLE_API_KEY not set — search will use mock data only."
        )


@app.on_event("shutdown")
async def close_http_clients():
    """Gracefully close all singleton httpx AsyncClients on shutdown."""
    import app.services.google_maps as gm
    import app.services.llm as llm

    for client in (gm._google_client, gm._photo_client, llm._gemini_client):
        if client is not None and not client.is_closed:
            await client.aclose()


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
