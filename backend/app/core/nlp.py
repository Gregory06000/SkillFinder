"""
NLP utilities for SkillFinder.

Lightweight sentiment analysis using a French sentiment lexicon.
No heavy ML model needed — runs within 512 MB RAM (Render free tier).
"""

import re

# French sentiment lexicon: common positive and negative words found in reviews.
# Score from -1.0 (very negative) to +1.0 (very positive).
POSITIVE_WORDS = {
    # Strong positive
    "incroyable": 1.0, "extraordinaire": 1.0, "exceptionnel": 1.0,
    "parfait": 1.0, "parfaite": 1.0, "magnifique": 1.0, "excellent": 1.0,
    "excellente": 1.0, "fantastique": 1.0, "merveilleux": 1.0,
    "chef-d'œuvre": 1.0, "divin": 1.0, "divine": 1.0,
    # Positive
    "superbe": 0.8, "délicieux": 0.8, "délicieuse": 0.8, "ravie": 0.8,
    "ravi": 0.8, "adore": 0.8, "j'adore": 0.8, "impeccable": 0.8,
    "meilleur": 0.8, "meilleure": 0.8, "top": 0.8, "régal": 0.8,
    "délice": 0.8, "sublime": 0.8, "formidable": 0.8,
    # Moderate positive
    "bien": 0.5, "bon": 0.5, "bonne": 0.5, "agréable": 0.5,
    "sympa": 0.5, "correct": 0.4, "correcte": 0.4, "satisfait": 0.5,
    "satisfaite": 0.5, "professionnel": 0.6, "recommande": 0.7,
    "efficace": 0.5, "naturel": 0.5, "naturelles": 0.5, "lumineuses": 0.6,
    "chaleureux": 0.5, "croustillante": 0.7, "croustillant": 0.7,
    "fondante": 0.6, "authentique": 0.6, "légère": 0.5, "léger": 0.5,
    "plaisir": 0.6, "artiste": 0.6, "spécialité": 0.5,
}

NEGATIVE_WORDS = {
    # Strong negative
    "horrible": -1.0, "terrible": -1.0, "catastrophe": -1.0,
    "nul": -1.0, "nulle": -1.0, "affreux": -1.0, "affreuse": -1.0,
    "dégoûtant": -1.0, "imangeable": -1.0, "honteux": -1.0,
    # Negative
    "mauvais": -0.8, "mauvaise": -0.8, "déçu": -0.8, "déçue": -0.8,
    "décevant": -0.8, "décevante": -0.8, "médiocre": -0.7,
    "cher": -0.3, "lent": -0.5, "longue": -0.3, "bruyant": -0.3,
    # Moderate negative
    "moyen": -0.4, "moyenne": -0.4, "passable": -0.3, "ordinaire": -0.2,
    "petit": -0.1, "élevé": -0.2,
}

# Negation words that flip sentiment
NEGATIONS = {"ne", "n'", "pas", "plus", "jamais", "rien", "aucun", "aucune", "sans"}


def split_sentences(text: str) -> list[str]:
    """Split text into sentences, handling French punctuation."""
    sentences = re.split(r'(?<=[.!?…])\s+', text.strip())
    return [s.strip() for s in sentences if s.strip()]


def analyze_sentiment(text: str) -> float:
    """
    Return a sentiment score from 1.0 to 5.0 for the given text.
    Uses a French lexicon-based approach.
    """
    words = re.findall(r"[\w''-]+", text.lower())
    if not words:
        return 3.0  # neutral

    scores = []
    negate_next = False

    for word in words:
        if word in NEGATIONS:
            negate_next = True
            continue

        score = POSITIVE_WORDS.get(word) or NEGATIVE_WORDS.get(word)
        if score is not None:
            if negate_next:
                score = -score * 0.5  # negation flips but dampens
            scores.append(score)
            negate_next = False
        else:
            negate_next = False

    if not scores:
        return 3.0  # neutral

    # Average sentiment: -1..+1 → map to 1..5
    avg = sum(scores) / len(scores)
    return round(max(1.0, min(5.0, (avg + 1) * 2 + 1)), 2)


def find_keyword_sentences(
    text: str,
    keyword: str,
    synonyms: list[str] | None = None,
) -> list[str]:
    """Extract sentences that mention the keyword or any of its synonyms."""
    terms = [keyword.lower()]
    if synonyms:
        terms.extend(s.lower() for s in synonyms)

    sentences = split_sentences(text)
    matches = []
    for sentence in sentences:
        lower = sentence.lower()
        if any(term in lower for term in terms):
            matches.append(sentence)
    return matches


def highlight_keyword(text: str, keyword: str, synonyms: list[str] | None = None) -> str:
    """Wrap keyword occurrences in **bold** markers for display."""
    terms = [keyword]
    if synonyms:
        terms.extend(synonyms)

    result = text
    for term in terms:
        pattern = re.compile(re.escape(term), re.IGNORECASE)
        result = pattern.sub(lambda m: f"**{m.group()}**", result)
    return result
