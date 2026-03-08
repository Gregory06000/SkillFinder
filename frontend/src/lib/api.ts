export interface SkillComment {
  id: string;
  pseudo: string;
  content: string;
  created_at: string;
}

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

// Retry helper: retries on network errors or 5xx, not on 4xx (client errors)
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 1,
): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, options);
      // Don't retry on client errors (4xx) — those are intentional responses
      if (res.ok || (res.status >= 400 && res.status < 500)) return res;
      // Server error (5xx) — retry if attempts remain
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }
      return res;
    } catch {
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }
      throw new Error("Impossible de joindre le serveur. Vérifiez votre connexion.");
    }
  }
  throw new Error("Impossible de joindre le serveur.");
}

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
  synonyms: string[] = [],
  locale: string = "fr"
): Promise<SearchResponse> {
  const res = await fetchWithRetry(`${API_BASE}/api/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service,
      keyword,
      synonyms,
      location,
      radius_km: radiusKm,
      locale,
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
  biz2: BusinessResult,
  locale: string = "fr"
): Promise<CompareResponse> {
  const res = await fetchWithRetry(`${API_BASE}/api/compare`, {
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
      locale,
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
  vote: "yes" | "no",
  token?: string | null,
): Promise<{ success: boolean; message: string }> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}/api/verify`, {
    method: "POST",
    headers,
    body: JSON.stringify({ place_id: placeId, vote }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json();
}

export async function fetchMyVotes(placeIds: string[], token: string): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE}/api/votes/mine`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ place_ids: placeIds }),
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export interface UserProfile {
  found: boolean;
  pseudo?: string;
  total_points?: number;
  weekly_points?: number;
  city?: string;
}

export async function fetchUserProfile(token: string): Promise<UserProfile> {
  const res = await fetch(`${API_BASE}/api/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return { found: false };
  return res.json();
}

export async function updateLeaderboard(
  pseudo: string,
  city: string,
  weeklyPoints: number,
  totalPoints: number,
  token?: string | null,
): Promise<{ success: boolean }> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const params = new URLSearchParams({
    pseudo,
    city,
    weekly_points: String(weeklyPoints),
    total_points: String(totalPoints),
  });

  const res = await fetch(`${API_BASE}/api/leaderboard?${params}`, {
    method: "POST",
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
    console.warn("Leaderboard sync failed:", err.detail || res.status, { pseudo, city, weeklyPoints, totalPoints });
    return { success: false };
  }
  return res.json();
}

export async function fetchComments(placeId: string, keyword: string): Promise<SkillComment[]> {
  try {
    const params = new URLSearchParams({ place_id: placeId, keyword });
    const res = await fetch(`${API_BASE}/api/comments?${params}`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function postComment(
  placeId: string,
  keyword: string,
  content: string,
  token: string,
): Promise<SkillComment | null> {
  try {
    const res = await fetch(`${API_BASE}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ place_id: placeId, keyword, content }),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
