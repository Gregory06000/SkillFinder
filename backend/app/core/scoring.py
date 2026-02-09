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


def calculate_attribute_score(
    reviews: list[str],
    keyword: str,
    synonyms: list[str] | None = None,
) -> dict:
    """
    Calculate a keyword-specific sentiment score from a list of reviews.

    Algorithm:
      1. Extract all sentences mentioning the keyword (or synonyms).
      2. Run sentiment analysis on each matching sentence.
      3. Average the sentence-level scores → raw_score (1-5).
      4. Count total keyword mentions → frequency.
      5. Apply a confidence weight based on frequency so that
         businesses with more mentions get a boost, but it
         saturates (log scale) to avoid gaming.

    Returns:
        {
            "raw_score": float,        # average sentiment (1-5), 0 if no mentions
            "weighted_score": float,   # final score after confidence weighting (0-5)
            "frequency": int,          # total keyword mentions
            "matched_sentences": [...], # sentences that matched
            "best_snippet": str,       # highest-sentiment sentence (highlighted)
        }
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
            "matched_sentences": [],
            "best_snippet": "",
        }

    # Sentiment analysis on each matched sentence
    scores = [analyze_sentiment(sentence) for sentence in all_matched]

    raw_score = sum(scores) / len(scores)

    # Confidence weight: log-based curve that rewards more mentions
    # but saturates. 1 mention = ~0.6x, 3 = ~0.8x, 7+ = ~1.0x
    confidence = min(1.0, math.log(frequency + 1) / math.log(8))
    weighted_score = round(raw_score * confidence, 2)

    # Pick the sentence with the highest sentiment as the best snippet
    best_idx = scores.index(max(scores))
    best_snippet = highlight_keyword(all_matched[best_idx], keyword, synonyms)

    return {
        "raw_score": round(raw_score, 2),
        "weighted_score": weighted_score,
        "frequency": frequency,
        "matched_sentences": all_matched,
        "best_snippet": best_snippet,
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

    Returns a list of ranked results sorted by weighted_score descending.
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
        })

    results.sort(key=lambda x: x["match_score"], reverse=True)
    return results
