export interface BusinessResult {
  name: string;
  address: string;
  global_rating: number;
  review_count: number;
  match_score: number;
  raw_score: number;
  frequency: number;
  best_snippet: string;
  snippets: string[];
  photo_name: string;
  maps_url: string;
  distance_km: number | null;
  lat: number | null;
  lng: number | null;
  reviews: string[];
  // AI transparency
  reasoning: string;
  // Community verification
  verification_yes: number;
  verification_no: number;
  verification_last: string | null;
}

export interface SearchResponse {
  service: string;
  keyword: string;
  results: BusinessResult[];
  center_lat: number | null;
  center_lng: number | null;
  radius_km: number | null;
}

export interface BusinessAnalysis {
  strengths: string[];
  weaknesses: string[];
  price_range: string | null;
  vibe: string | null;
  service_speed: string | null;
}

export interface CompareResponse {
  business_1_name: string;
  business_1_analysis: BusinessAnalysis;
  business_1_match_score: number;
  business_2_name: string;
  business_2_analysis: BusinessAnalysis;
  business_2_match_score: number;
  verdict: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export function getPhotoUrl(photoName: string): string {
  return `${API_BASE}/api/photo?ref=${encodeURIComponent(photoName)}`;
}

export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const res = await fetch(
    `${API_BASE}/api/reverse-geocode?lat=${lat}&lng=${lng}`
  );
  if (!res.ok) return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  const data = await res.json();
  return data.location || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

export async function searchBusinesses(
  service: string,
  keyword: string,
  location: string = "",
  radiusKm: number = 10,
  synonyms: string[] = []
): Promise<SearchResponse> {
  const res = await fetch(`${API_BASE}/api/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service,
      keyword,
      synonyms,
      location,
      radius_km: radiusKm,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json();
}

export async function compareBusinesses(
  keyword: string,
  biz1: BusinessResult,
  biz2: BusinessResult
): Promise<CompareResponse> {
  const res = await fetch(`${API_BASE}/api/compare`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      keyword,
      business_1: {
        name: biz1.name,
        reviews: biz1.reviews,
        match_score: biz1.match_score,
        global_rating: biz1.global_rating,
      },
      business_2: {
        name: biz2.name,
        reviews: biz2.reviews,
        match_score: biz2.match_score,
        global_rating: biz2.global_rating,
      },
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json();
}

export async function verifyBusiness(
  placeId: string,
  vote: "yes" | "no"
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/api/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ place_id: placeId, vote }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json();
}
