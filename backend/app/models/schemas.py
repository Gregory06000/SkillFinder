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


class SearchResponse(BaseModel):
    service: str
    keyword: str
    results: list[BusinessResult]
