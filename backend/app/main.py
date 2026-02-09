import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router

app = FastAPI(
    title="SkillFinder API",
    description="Rank businesses by keyword-specific review sentiment",
    version="0.1.0",
)

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
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")


@app.get("/health")
async def health():
    return {"status": "ok"}
