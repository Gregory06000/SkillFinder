"""
Gemini LLM integration for SkillFinder comparative analysis.

Uses GEMINI_API_KEY (from Google AI Studio).
"""

import os
import json
import logging

import httpx

logger = logging.getLogger(__name__)

GEMINI_URL = (
    "https://generativelanguage.googleapis.com/v1beta/"
    "models/gemini-2.0-flash:generateContent"
)


def _get_api_key() -> str:
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        raise RuntimeError("GEMINI_API_KEY is not set.")
    return key


def _build_prompt(
    biz1_name: str,
    biz1_reviews: list[str],
    biz2_name: str,
    biz2_reviews: list[str],
    keyword: str,
) -> str:
    reviews_1 = "\n".join(f'- "{r}"' for r in biz1_reviews[:10]) or "- (aucun avis)"
    reviews_2 = "\n".join(f'- "{r}"' for r in biz2_reviews[:10]) or "- (aucun avis)"

    return f"""Tu es un expert en analyse comparative de commerces locaux.
Analyse les avis clients de ces deux établissements pour le critère « {keyword} ».

### Établissement A : {biz1_name}
Avis :
{reviews_1}

### Établissement B : {biz2_name}
Avis :
{reviews_2}

Réponds UNIQUEMENT en JSON valide avec cette structure exacte :
{{
  "business_1": {{
    "strengths": ["point fort 1", "point fort 2"],
    "weaknesses": ["point faible 1"],
    "price_range": "€" ou "€€" ou "€€€" ou null,
    "vibe": "description courte de l'ambiance",
    "service_speed": "rapide" ou "moyen" ou "lent" ou null
  }},
  "business_2": {{
    "strengths": ["point fort 1", "point fort 2"],
    "weaknesses": ["point faible 1"],
    "price_range": "€" ou "€€" ou "€€€" ou null,
    "vibe": "description courte de l'ambiance",
    "service_speed": "rapide" ou "moyen" ou "lent" ou null
  }},
  "verdict": "Résumé en une phrase de qui est le meilleur pour '{keyword}' et pourquoi"
}}

Règles :
- Base ton analyse UNIQUEMENT sur les avis fournis.
- Réponds en français.
- Si une information n'est pas mentionnée dans les avis, mets null.
- 2 à 4 points forts/faibles maximum par établissement.
- Sois concis et factuel."""


async def compare_businesses(
    biz1_name: str,
    biz1_reviews: list[str],
    biz2_name: str,
    biz2_reviews: list[str],
    keyword: str,
) -> dict:
    """
    Call Gemini to generate a structured comparison of two businesses.
    Returns a dict with keys: business_1, business_2, verdict.
    """
    api_key = _get_api_key()
    prompt = _build_prompt(biz1_name, biz1_reviews, biz2_name, biz2_reviews, keyword)

    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 1024,
            "responseMimeType": "application/json",
        },
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post(f"{GEMINI_URL}?key={api_key}", json=body)

    if resp.status_code != 200:
        logger.error("Gemini API error %s: %s", resp.status_code, resp.text)
        raise RuntimeError(
            f"Gemini API returned {resp.status_code}. "
            "Vérifiez que l'API 'Generative Language' est activée dans Google Cloud Console."
        )

    data = resp.json()

    try:
        text = data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError) as e:
        logger.error("Unexpected Gemini response structure: %s", data)
        raise RuntimeError("Unexpected response from Gemini API.") from e

    # Clean potential markdown code block wrapping
    text = text.strip()
    if text.startswith("```"):
        text = text.split("\n", 1)[1]
        text = text.rsplit("```", 1)[0]

    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        logger.error("Gemini returned invalid JSON: %s", text[:500])
        raise RuntimeError("Gemini returned invalid JSON.") from e
