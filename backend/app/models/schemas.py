from typing import Literal

from pydantic import BaseModel, Field, field_validator


class SearchRequest(BaseModel):
    service: str = Field(..., min_length=1, max_length=100)
    keyword: str = Field(default="", max_length=100)
    synonyms: list[str] = Field(default=[])
    location: str = Field(default="", max_length=200)
    radius_km: int = Field(default=10, ge=1, le=50)
    locale: str = Field(default="fr", pattern=r"^(fr|en|es|de|pt|it|nl)$")

    @field_validator("synonyms")
    @classmethod
    def limit_synonyms(cls, v: list[str]) -> list[str]:
        if len(v) > 20:
            raise ValueError("Maximum 20 synonymes autorisés")
        return v


class BusinessResult(BaseModel):
    name: str
    address: str
    global_rating: float
    review_count: int = 0
    match_score: float
    raw_score: float
    frequency: int
    best_snippet: str
    snippets: list[str] = []
    photo_name: str = ""
    maps_url: str = ""
    distance_km: float | None = None
    lat: float | None = None
    lng: float | None = None
    reviews: list[str] = []
    # AI transparency
    reasoning: str = ""
    # Community verification
    verification_yes: int = 0
    verification_no: int = 0
    verification_last: str | None = None


class SearchResponse(BaseModel):
    service: str
    keyword: str
    results: list[BusinessResult]
    center_lat: float | None = None
    center_lng: float | None = None
    radius_km: int | None = None


# --- Comparison ---

class CompareBusinessInput(BaseModel):
    name: str = Field(..., max_length=200)
    reviews: list[str] = Field(default=[], max_length=50)
    match_score: float
    global_rating: float

    @field_validator("reviews")
    @classmethod
    def limit_review_size(cls, v: list[str]) -> list[str]:
        return [r[:2000] for r in v]


class CompareRequest(BaseModel):
    keyword: str
    business_1: CompareBusinessInput
    business_2: CompareBusinessInput
    locale: str = Field(default="fr", pattern=r"^(fr|en|es|de|pt|it|nl)$")


class BusinessAnalysis(BaseModel):
    strengths: list[str] = []
    weaknesses: list[str] = []
    price_range: str | None = None
    vibe: str | None = None
    service_speed: str | None = None


class CompareResponse(BaseModel):
    business_1_name: str
    business_1_analysis: BusinessAnalysis
    business_1_match_score: float
    business_2_name: str
    business_2_analysis: BusinessAnalysis
    business_2_match_score: float
    verdict: str


# --- Comments ---

class CommentOut(BaseModel):
    id: str
    user_id: str
    pseudo: str
    content: str
    created_at: str


class CommentsResponse(BaseModel):
    comments: list[CommentOut]
    has_more: bool = False


class CommentRequest(BaseModel):
    place_id: str = Field(..., min_length=1, max_length=500)
    keyword: str = Field(..., min_length=1, max_length=100)
    content: str = Field(..., min_length=1, max_length=280)


class ReportRequest(BaseModel):
    comment_id: str = Field(..., min_length=1, max_length=100)
    reason: str = Field(default="inappropriate", max_length=200)


# --- Community verification ---

class VerifyRequest(BaseModel):
    place_id: str = Field(..., min_length=1, max_length=500)
    vote: Literal["yes", "no"]

class VerifyResponse(BaseModel):
    success: bool
    message: str


# --- Friends ---

class FriendRequestBody(BaseModel):
    addressee_id: str = Field(..., min_length=1, max_length=100)

class FriendRespondBody(BaseModel):
    friendship_id: str = Field(..., min_length=1, max_length=100)
    accept: bool
