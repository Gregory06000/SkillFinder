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

# Max highlighted review excerpts per business. Capped at 3 to keep result
# cards concise while still showing enough evidence for the ranking.
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

    # Confidence weight using log-base-8 curve. Rewards multiple mentions
    # but saturates quickly to prevent gaming via keyword stuffing.
    #   1 mention  -> ~0.33 (low confidence, could be a fluke)
    #   3 mentions -> ~0.65 (moderate)
    #   7 mentions -> ~1.0  (full confidence)
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


def _biz_base(biz: dict) -> dict:
    """Extract the common business fields shared by both scoring paths."""
    return {
        "name": biz["name"],
        "address": biz.get("address", ""),
        "global_rating": biz.get("global_rating", 0),
        "review_count": biz.get("review_count", 0),
        "photo_name": biz.get("photo_name", ""),
        "maps_url": biz.get("maps_url", ""),
        "distance_km": biz.get("distance_km"),
        "lat": biz.get("lat"),
        "lng": biz.get("lng"),
        "reviews": biz.get("reviews", []),
    }


def rank_businesses(
    businesses: list[dict],
    keyword: str,
    synonyms: list[str] | None = None,
    llm_scores: list[dict] | None = None,
) -> list[dict]:
    """
    Score and rank a list of businesses by keyword-specific sentiment.

    When *llm_scores* is provided (from Gemini), it takes precedence over
    the local lexicon scorer.  Businesses that receive a relevance score
    of 0 from the LLM are excluded (quality gate).

    Returns a sorted list (top 10) by match_score descending.
    """
    # --- Mode exploration : aucun keyword, tri par note globale ---
    if not keyword or not keyword.strip():
        results = []
        for biz in businesses:
            entry = _biz_base(biz)
            entry.update({
                "match_score": round(biz.get("global_rating", 0), 2),
                "raw_score": round(biz.get("global_rating", 0), 2),
                "frequency": 0,
                "best_snippet": "",
                "snippets": [],
                "reasoning": "",
            })
            results.append(entry)
        results.sort(key=lambda x: x["match_score"], reverse=True)
        return results[:10]

    # Index LLM results by business position for O(1) lookup
    llm_map: dict[int, dict] = {}
    if llm_scores:
        for entry in llm_scores:
            idx = entry.get("index")
            if idx is not None:
                llm_map[idx] = entry

    results = []
    for i, biz in enumerate(businesses):
        llm = llm_map.get(i)

        if llm is not None:
            # ---- LLM-scored path ----
            score = llm.get("relevance_score", 0.0)
            if score <= 0:
                continue  # Quality gate: skip irrelevant businesses

            evidence = llm.get("evidence", [])
            mentions = llm.get("mentions", len(evidence))
            snippets = [
                highlight_keyword(s, keyword, synonyms) for s in evidence
            ]

            reasoning = llm.get("reasoning", "")
            if not reasoning:
                if evidence:
                    reasoning = f"Score {score:.1f}/5 basé sur {mentions} mention(s) dans les avis."
                else:
                    reasoning = f"Score IA : {score:.1f}/5."

            entry = _biz_base(biz)
            entry.update({
                "match_score": round(score, 2),
                "raw_score": round(score, 2),
                "frequency": mentions,
                "best_snippet": snippets[0] if snippets else "",
                "snippets": snippets,
                "reasoning": reasoning,
            })
            results.append(entry)

        elif not llm_scores:
            # ---- Lexicon fallback (no LLM available at all) ----
            score_data = calculate_attribute_score(
                biz["reviews"], keyword, synonyms
            )
            if score_data["weighted_score"] <= 0:
                continue  # Quality gate

            freq = score_data["frequency"]
            entry = _biz_base(biz)
            entry.update({
                "match_score": score_data["weighted_score"],
                "raw_score": score_data["raw_score"],
                "frequency": freq,
                "best_snippet": score_data["best_snippet"],
                "snippets": score_data["snippets"],
                "reasoning": f"Score {score_data['weighted_score']:.1f}/5 basé sur {freq} mention(s) dans les avis.",
            })
            results.append(entry)
        # else: LLM was used but didn't return this business → skip

    results.sort(key=lambda x: x["match_score"], reverse=True)
    return results[:10]
