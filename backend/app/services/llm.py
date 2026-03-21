"""
Gemini LLM integration for SkillFinder.

Provides:
- Intent-based review scoring (search relevance)
- Comparative analysis between two businesses

Uses GEMINI_API_KEY (from Google AI Studio).
"""

import os
import re
import json
import logging

import httpx

logger = logging.getLogger(__name__)

GEMINI_URL = (
    "https://generativelanguage.googleapis.com/v1beta/"
    "models/gemini-2.0-flash:generateContent"
)

# Singleton client — reuse TCP connections across Gemini calls
_gemini_client: httpx.AsyncClient | None = None


def _get_gemini_client() -> httpx.AsyncClient:
    global _gemini_client
    if _gemini_client is None or _gemini_client.is_closed:
        _gemini_client = httpx.AsyncClient(timeout=45.0)
    return _gemini_client


# Locale → language name mapping for multilingual prompts
_LOCALE_NAMES: dict[str, str] = {
    "fr": "French",
    "en": "English",
    "es": "Spanish",
    "de": "German",
    "pt": "Portuguese",
    "it": "Italian",
    "nl": "Dutch",
}


def _lang(locale: str) -> str:
    """Return the full language name for a locale code."""
    return _LOCALE_NAMES.get(locale, "French")


_INJECTION_PATTERNS = [
    re.compile(r"(?i)ignore\s+(all\s+)?previous\s+instructions"),
    re.compile(r"(?i)ignore\s+the\s+above"),
    re.compile(r"(?i)system\s*:"),
    re.compile(r"(?i)assistant\s*:"),
    re.compile(r"(?i)user\s*:"),
    re.compile(r"(?i)you\s+are\s+now"),
    re.compile(r"(?i)new\s+instructions?\s*:"),
    re.compile(r"(?i)forget\s+(everything|all)"),
]


def _sanitize(text: str) -> str:
    """Strip characters and patterns that could enable prompt injection."""
    # Remove control characters except space/newline/tab
    text = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", text)
    # Remove curly braces (prevent JSON/template confusion)
    text = text.replace("{", "").replace("}", "")
    # Remove backticks (prevent code block escapes)
    text = text.replace("`", "")
    # Strip known prompt injection patterns
    for pattern in _INJECTION_PATTERNS:
        text = pattern.sub("", text)
    # Collapse whitespace and truncate
    return re.sub(r"\s+", " ", text).strip()[:200]


def _get_api_key() -> str:
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        raise RuntimeError("GEMINI_API_KEY is not set.")
    return key


def _parse_gemini_json(text: str) -> dict | list | None:
    """
    Robustly parse JSON from a Gemini response text.

    Strips markdown code fences (```json ... ``` or ``` ... ```) before
    attempting to parse, and returns None on any parse error instead of raising.
    """
    text = text.strip()
    # Strip opening fence (```json or ```)
    if text.startswith("```"):
        # Remove the first line (the fence opener)
        text = re.sub(r"^```[a-zA-Z]*\n?", "", text)
        # Remove the closing fence
        text = re.sub(r"```\s*$", "", text)
        text = text.strip()
    try:
        return json.loads(text)
    except (json.JSONDecodeError, ValueError):
        return None


# ---------------------------------------------------------------------------
# Synonym expansion — enrich keyword with related terms
# ---------------------------------------------------------------------------

async def generate_synonyms(service: str, keyword: str, locale: str = "fr") -> list[str]:
    """
    Ask Gemini for 5-10 synonyms / related terms that a reviewer might use
    when talking about the concept behind *keyword* in the context of *service*.

    Returns a list of lowercase terms in the target language.  Fast call (~100 tokens out).
    """
    api_key = _get_api_key()
    service = _sanitize(service)
    keyword = _sanitize(keyword)
    lang = _lang(locale)

    prompt = f"""You are a linguistic expert specializing in customer reviews.

Context: a user searches for "{keyword}" in the "{service}" category.

Give me 5 to 10 short words or expressions that a CUSTOMER would use in a GOOGLE REVIEW
to talk about the same thing, even indirectly.

Rules:
- Include direct synonyms, spelling variants, colloquial terms
- Include physical descriptions someone would use in a review
- DO NOT repeat the original word "{keyword}"
- NO long sentences, just words or 2-3 word groups
- Include terms in BOTH the local language ({lang}) AND common international terms
- Respond ONLY in JSON: {{"synonyms": ["word1", "word2", ...]}}

Examples:
- "Permanente" (Hairdresser) → boucles, frisé, ondulation, bouclé, curly, waves
- "Thin crust" (Pizzeria) → fine, croustillante, crispy, light, napolitaine, thin crust
- "Overcooked baguette" (Bakery) → well done, golden crust, crunchy, crusty, dark crust"""

    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 256,
            "responseMimeType": "application/json",
        },
    }

    client = _get_gemini_client()
    resp = await client.post(GEMINI_URL, headers={"x-goog-api-key": api_key}, json=body)

    if resp.status_code != 200:
        logger.warning("Synonym generation failed (%s)", resp.status_code)
        return []

    data = resp.json()
    try:
        text = data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError):
        return []

    result = _parse_gemini_json(text)
    if not isinstance(result, dict):
        return []
    synonyms = result.get("synonyms", [])
    return [s.strip().lower() for s in synonyms if isinstance(s, str) and s.strip()]


## ---------------------------------------------------------------------------
# Intent-based review scoring
# ---------------------------------------------------------------------------

def _build_scoring_prompt(
    service: str,
    keyword: str,
    synonyms: list[str] | None,
    businesses: list[dict],
    locale: str = "fr",
) -> str:
    service = _sanitize(service)
    keyword = _sanitize(keyword)

    synonym_hint = ""
    if synonyms:
        synonym_hint = (
            f"\nSynonymes possibles du critère : {', '.join(synonyms)}"
        )

    lang = _lang(locale)

    biz_sections = []
    for i, biz in enumerate(businesses):
        reviews = biz.get("reviews", [])[:5]
        if not reviews:
            review_lines = "  (no reviews)"
        else:
            review_lines = "\n".join(
                f'  {j + 1}. "{r}"' for j, r in enumerate(reviews)
            )
        biz_sections.append(
            f'[Business {i}] "{biz["name"]}"\nReviews:\n{review_lines}'
        )

    businesses_text = "\n\n".join(biz_sections)
    count = len(businesses)

    return f"""You are an expert in customer review analysis for a local search engine.
You must understand the user's REAL DESIRE, not just search for keywords.

## User search
- Service: "{service}"
- Specific criteria: "{keyword}"{synonym_hint}

## Understanding the desire
Do NOT search for exact words. Understand the INTENTION behind the search.
Examples:
- "overcooked baguette" → the user wants: well done, dark crust, golden, crispy
- "thin crust pizza" → they want: thin, crispy, light, neapolitan
- "natural hair color" → they want: natural, subtle, luminous, successful balayage

## Scoring rules (CRITICAL)
1. Score from 0.0 to 5.0 the relevance of reviews to the user's DESIRE
2. Extract up to 2 EXACT sentences from reviews that justify your score
3. If NO sentence truly matches the intention → score MUST be 0.0 and evidence MUST be []
4. Negative sentiment about SERVICE (slow, rude) does NOT affect the PRODUCT/SKILL score
5. A "negative" word describing a WANTED physical characteristic is POSITIVE
   Ex: "overcooked" is positive if the user searches for "overcooked baguette"
6. Sentences matching the AMBIANCE / VIBE of the search get a bonus
7. It is better to give 0 than to give a false positive — QUALITY over quantity

## Businesses to analyze

{businesses_text}

## Response format (strict JSON)
{{
  "businesses": [
    {{
      "index": 0,
      "relevance_score": 4.2,
      "mentions": 3,
      "evidence": ["exact sentence 1 from reviews", "exact sentence 2 from reviews"],
      "reasoning": "Short explanation of why this score was given"
    }}
  ]
}}

IMPORTANT:
- evidence = EXACT QUOTES from reviews, not paraphrases.
- reasoning = 1 sentence explaining the semantic link between the user's desire and the reviews.
- If no real match → relevance_score = 0.0, evidence = [], reasoning explains why.
- Include all {count} businesses in your response (index 0 to {count - 1}).
- **MANDATORY**: The "reasoning" field MUST be written in {lang}. Do NOT write reasoning in any other language."""


async def score_reviews_batch(
    service: str,
    keyword: str,
    synonyms: list[str] | None,
    businesses: list[dict],
    locale: str = "fr",
) -> list[dict]:
    """
    Use Gemini to score each business's reviews for relevance to the user's intent.

    Returns a list of dicts with keys: index, relevance_score, mentions, evidence.
    Raises RuntimeError if the API key is missing or the call fails.
    """
    api_key = _get_api_key()
    prompt = _build_scoring_prompt(service, keyword, synonyms, businesses, locale)

    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0,
            "maxOutputTokens": 4096,
            "responseMimeType": "application/json",
        },
    }

    client = _get_gemini_client()
    resp = await client.post(GEMINI_URL, headers={"x-goog-api-key": api_key}, json=body)

    if resp.status_code != 200:
        logger.error("Gemini scoring error %s: %s", resp.status_code, resp.text)
        raise RuntimeError("Gemini scoring failed")

    data = resp.json()

    try:
        text = data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError) as e:
        logger.error("Unexpected Gemini scoring response: %s", data)
        raise RuntimeError("Unexpected Gemini scoring response.") from e

    result = _parse_gemini_json(text)
    if not isinstance(result, dict):
        logger.error("Gemini scoring returned invalid JSON: %s", text[:500])
        raise RuntimeError("Gemini scoring returned invalid JSON.")

    return result.get("businesses", [])


# ---------------------------------------------------------------------------
# Comparative analysis
# ---------------------------------------------------------------------------

def _build_prompt(
    biz1_name: str,
    biz1_reviews: list[str],
    biz2_name: str,
    biz2_reviews: list[str],
    keyword: str,
    locale: str = "fr",
) -> str:
    keyword = _sanitize(keyword)
    biz1_name = _sanitize(biz1_name)
    biz2_name = _sanitize(biz2_name)
    lang = _lang(locale)

    reviews_1 = "\n".join(f'- "{r}"' for r in biz1_reviews[:10]) or "- (no reviews)"
    reviews_2 = "\n".join(f'- "{r}"' for r in biz2_reviews[:10]) or "- (no reviews)"

    return f"""You are an expert in comparative analysis of local businesses.
Analyze the customer reviews of these two businesses for the criteria "{keyword}".

### Business A: {biz1_name}
Reviews:
{reviews_1}

### Business B: {biz2_name}
Reviews:
{reviews_2}

Respond ONLY in valid JSON with this exact structure:
{{
  "business_1": {{
    "strengths": ["strength 1", "strength 2"],
    "weaknesses": ["weakness 1"],
    "price_range": "€" or "€€" or "€€€" or null,
    "vibe": "short atmosphere description",
    "service_speed": "fast" or "medium" or "slow" or null
  }},
  "business_2": {{
    "strengths": ["strength 1", "strength 2"],
    "weaknesses": ["weakness 1"],
    "price_range": "€" or "€€" or "€€€" or null,
    "vibe": "short atmosphere description",
    "service_speed": "fast" or "medium" or "slow" or null
  }},
  "verdict": "One sentence summary of who is the best for '{keyword}' and why"
}}

Rules:
- Base your analysis ONLY on the provided reviews.
- **MANDATORY**: ALL text fields (strengths, weaknesses, vibe, service_speed, verdict) MUST be written in {lang}. Do NOT write in any other language.
- If information is not mentioned in reviews, use null.
- 2 to 4 strengths/weaknesses maximum per business.
- Be concise and factual."""


async def compare_businesses(
    biz1_name: str,
    biz1_reviews: list[str],
    biz2_name: str,
    biz2_reviews: list[str],
    keyword: str,
    locale: str = "fr",
) -> dict:
    """
    Call Gemini to generate a structured comparison of two businesses.
    Returns a dict with keys: business_1, business_2, verdict.
    """
    api_key = _get_api_key()
    prompt = _build_prompt(biz1_name, biz1_reviews, biz2_name, biz2_reviews, keyword, locale)

    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 1024,
            "responseMimeType": "application/json",
        },
    }

    client = _get_gemini_client()
    resp = await client.post(GEMINI_URL, headers={"x-goog-api-key": api_key}, json=body)

    if resp.status_code != 200:
        logger.error("Gemini API error %s: %s", resp.status_code, resp.text)
        raise RuntimeError("Gemini comparison failed")

    data = resp.json()

    try:
        text = data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError) as e:
        logger.error("Unexpected Gemini response structure: %s", data)
        raise RuntimeError("Unexpected response from Gemini API.") from e

    # Clean potential markdown code block wrapping and parse
    result = _parse_gemini_json(text)
    if not isinstance(result, dict):
        logger.error("Gemini returned invalid JSON: %s", text[:500])
        raise RuntimeError("Gemini returned invalid JSON.")
    return result
