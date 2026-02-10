from pydantic import BaseModel


class SearchRequest(BaseModel):
    service: str          # e.g. "Coiffeur", "Pizzeria"
    keyword: str          # e.g. "Permanente", "Pâte fine"
    synonyms: list[str] = []
    location: str = ""    # e.g. "Nice", "12 rue de la Paix, Paris"
    radius_km: int = 10   # search radius in km


class BusinessResult(BaseModel):
    name: str
    address: str
    global_rating: float
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
    name: str
    reviews: list[str]
    match_score: float
    global_rating: float


class CompareRequest(BaseModel):
    keyword: str
    business_1: CompareBusinessInput
    business_2: CompareBusinessInput


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


# --- Community verification ---

class VerifyRequest(BaseModel):
    place_id: str      # business name used as stable identifier
    vote: str          # "yes" or "no"

class VerifyResponse(BaseModel):
    success: bool
    message: str
