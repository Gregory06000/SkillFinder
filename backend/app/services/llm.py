"""
Gemini LLM integration for SkillFinder.

Provides:
- Intent-based review scoring (search relevance)
- Comparative analysis between two businesses

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


## ---------------------------------------------------------------------------
# Intent-based review scoring
# ---------------------------------------------------------------------------

def _build_scoring_prompt(
    service: str,
    keyword: str,
    synonyms: list[str] | None,
    businesses: list[dict],
) -> str:
    synonym_hint = ""
    if synonyms:
        synonym_hint = (
            f"\nSynonymes possibles du critère : {', '.join(synonyms)}"
        )

    biz_sections = []
    for i, biz in enumerate(businesses):
        reviews = biz.get("reviews", [])[:5]
        if not reviews:
            review_lines = "  (aucun avis)"
        else:
            review_lines = "\n".join(
                f'  {j + 1}. "{r}"' for j, r in enumerate(reviews)
            )
        biz_sections.append(
            f'[Établissement {i}] "{biz["name"]}"\nAvis :\n{review_lines}'
        )

    businesses_text = "\n\n".join(biz_sections)
    count = len(businesses)

    return f"""Tu es un expert en analyse d'avis clients pour un moteur de recherche local.
Tu dois comprendre le DÉSIR RÉEL de l'utilisateur, pas juste chercher des mots-clés.

## Recherche de l'utilisateur
- Service : « {service} »
- Critère spécifique : « {keyword} »{synonym_hint}

## Comment comprendre le désir
Ne cherche PAS les mots exacts. Comprends l'INTENTION derrière la recherche.
Exemples :
- « baguette trop cuite » → l'utilisateur veut : bien cuit, croûte sombre, dorée, croustillante
- « pizza pâte fine » → il veut : fine, croustillante, légère, napolitaine
- « coiffeur couleur naturelle » → il veut : naturel, subtil, lumineux, balayage réussi

## Règles de notation (CRITIQUES)
1. Note de 0.0 à 5.0 la pertinence des avis par rapport au DÉSIR de l'utilisateur
2. Extrais jusqu'à 2 phrases EXACTES des avis qui justifient ta note
3. Si AUCUNE phrase ne correspond vraiment à l'intention → note DOIT être 0.0 et evidence DOIT être []
4. Le sentiment négatif sur le SERVICE (lent, impoli) N'AFFECTE PAS la note du PRODUIT/COMPÉTENCE
5. Un mot « négatif » décrivant une caractéristique physique VOULUE est POSITIF
   Ex: « trop cuit » est positif si l'utilisateur cherche « baguette trop cuite »
6. Les phrases qui correspondent à l'AMBIANCE / VIBE de la recherche obtiennent un bonus
7. Il vaut mieux donner 0 que de donner un faux positif — QUALITÉ avant quantité

## Établissements à analyser

{businesses_text}

## Format de réponse (JSON strict)
{{
  "businesses": [
    {{
      "index": 0,
      "relevance_score": 4.2,
      "mentions": 3,
      "evidence": ["phrase exacte 1 tirée des avis", "phrase exacte 2 tirée des avis"],
      "reasoning": "Explication courte de pourquoi ce score a été attribué"
    }}
  ]
}}

IMPORTANT :
- evidence = CITATIONS EXACTES des avis, pas des paraphrases.
- reasoning = 1 phrase expliquant le lien sémantique entre le désir de l'utilisateur et les avis.
  Exemple : « L'avis mentionne 'croûte bien dorée' qui correspond au désir 'baguette trop cuite'. »
  Si score = 0 : reasoning = "Aucun avis ne correspond au critère recherché."
- Si aucune correspondance réelle → relevance_score = 0.0, evidence = [], reasoning explique pourquoi.
- Inclus les {count} établissements dans ta réponse (index 0 à {count - 1})."""


async def score_reviews_batch(
    service: str,
    keyword: str,
    synonyms: list[str] | None,
    businesses: list[dict],
) -> list[dict]:
    """
    Use Gemini to score each business's reviews for relevance to the user's intent.

    Returns a list of dicts with keys: index, relevance_score, mentions, evidence.
    Raises RuntimeError if the API key is missing or the call fails.
    """
    api_key = _get_api_key()
    prompt = _build_scoring_prompt(service, keyword, synonyms, businesses)

    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.1,
            "maxOutputTokens": 2048,
            "responseMimeType": "application/json",
        },
    }

    async with httpx.AsyncClient(timeout=45.0) as client:
        resp = await client.post(f"{GEMINI_URL}?key={api_key}", json=body)

    if resp.status_code != 200:
        logger.error("Gemini scoring error %s: %s", resp.status_code, resp.text)
        raise RuntimeError(f"Gemini scoring returned {resp.status_code}")

    data = resp.json()

    try:
        text = data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError) as e:
        logger.error("Unexpected Gemini scoring response: %s", data)
        raise RuntimeError("Unexpected Gemini scoring response.") from e

    text = text.strip()
    if text.startswith("```"):
        text = text.split("\n", 1)[1]
        text = text.rsplit("```", 1)[0]

    try:
        result = json.loads(text)
    except json.JSONDecodeError as e:
        logger.error("Gemini scoring returned invalid JSON: %s", text[:500])
        raise RuntimeError("Gemini scoring returned invalid JSON.") from e

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
