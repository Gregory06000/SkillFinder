"""
Attribute Scoring Algorithm for SkillFinder.

Ranks businesses by the sentiment specifically associated with
a keyword within their reviews, rather than by global rating.
"""

import math

from app.core.nlp import (
    analyze_sentiment,
    find_keyword_sentences,
    highlight_keyword,
)

MAX_SNIPPETS = 3


def calculate_attribute_score(
    reviews: list[str],
    keyword: str,
    synonyms: list[str] | None = None,
) -> dict:
    """
    Calculate a keyword-specific sentiment score from a list of reviews.

    Returns up to MAX_SNIPPETS highlighted review excerpts, sorted by
    sentiment (best first) to showcase the strongest evidence.
    """
    all_matched: list[str] = []
    for review in reviews:
        matched = find_keyword_sentences(review, keyword, synonyms)
        all_matched.extend(matched)

    frequency = len(all_matched)

    if frequency == 0:
        return {
            "raw_score": 0.0,
            "weighted_score": 0.0,
            "frequency": 0,
            "snippets": [],
            "best_snippet": "",
        }

    # Sentiment analysis on each matched sentence
    scores = [analyze_sentiment(sentence) for sentence in all_matched]

    raw_score = sum(scores) / len(scores)

    # Confidence weight: log-based curve that rewards more mentions
    # but saturates. 1 mention = ~0.6x, 3 = ~0.8x, 7+ = ~1.0x
    confidence = min(1.0, math.log(frequency + 1) / math.log(8))
    weighted_score = round(raw_score * confidence, 2)

    # Sort sentences by sentiment (best first), pick top N, deduplicate
    scored_pairs = sorted(
        zip(scores, all_matched), key=lambda x: x[0], reverse=True
    )
    seen = set()
    snippets = []
    for _, sentence in scored_pairs:
        normalized = sentence.strip().lower()
        if normalized not in seen:
            seen.add(normalized)
            snippets.append(highlight_keyword(sentence, keyword, synonyms))
            if len(snippets) >= MAX_SNIPPETS:
                break

    return {
        "raw_score": round(raw_score, 2),
        "weighted_score": weighted_score,
        "frequency": frequency,
        "snippets": snippets,
        "best_snippet": snippets[0] if snippets else "",
    }


def rank_businesses(
    businesses: list[dict],
    keyword: str,
    synonyms: list[str] | None = None,
) -> list[dict]:
    """
    Score and rank a list of businesses by keyword-specific sentiment.

    Each business dict must have:
        - "name": str
        - "global_rating": float
        - "reviews": list[str]
    Optional:
        - "photo_name": str
        - "maps_url": str

    Returns a sorted list (top 10) by weighted_score descending.
    """
    results = []
    for biz in businesses:
        score_data = calculate_attribute_score(biz["reviews"], keyword, synonyms)
        results.append({
            "name": biz["name"],
            "address": biz.get("address", ""),
            "global_rating": biz.get("global_rating", 0),
            "match_score": score_data["weighted_score"],
            "raw_score": score_data["raw_score"],
            "frequency": score_data["frequency"],
            "best_snippet": score_data["best_snippet"],
            "snippets": score_data["snippets"],
            "photo_name": biz.get("photo_name", ""),
            "maps_url": biz.get("maps_url", ""),
            "distance_km": biz.get("distance_km"),
        })

    results.sort(key=lambda x: x["match_score"], reverse=True)
    return results[:10]
