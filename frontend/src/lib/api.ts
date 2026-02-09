export interface BusinessResult {
  name: string;
  address: string;
  global_rating: number;
  match_score: number;
  raw_score: number;
  frequency: number;
  best_snippet: string;
}

export interface SearchResponse {
  service: string;
  keyword: string;
  results: BusinessResult[];
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export async function searchBusinesses(
  service: string,
  keyword: string,
  synonyms: string[] = []
): Promise<SearchResponse> {
  const res = await fetch(`${API_BASE}/api/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ service, keyword, synonyms }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json();
}
