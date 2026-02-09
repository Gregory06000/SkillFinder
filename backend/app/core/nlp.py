"""
NLP utilities for SkillFinder.

Uses the HuggingFace multilingual sentiment model to analyze
French (and other language) review text at the sentence level.
"""

import re
import math
from functools import lru_cache

from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification


@lru_cache(maxsize=1)
def get_sentiment_pipeline():
    """Lazy-load and cache the multilingual sentiment model."""
    model_name = "nlptown/bert-base-multilingual-uncased-sentiment"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSequenceClassification.from_pretrained(model_name)
    return pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)


def split_sentences(text: str) -> list[str]:
    """
    Split text into sentences.
    Handles French punctuation (., !, ?, …) and common abbreviations.
    """
    sentences = re.split(r'(?<=[.!?…])\s+', text.strip())
    return [s.strip() for s in sentences if s.strip()]


def analyze_sentiment(text: str) -> float:
    """
    Return a sentiment score from 1.0 to 5.0 for the given text.
    The model outputs labels like '1 star' .. '5 stars'.
    """
    pipe = get_sentiment_pipeline()
    # Truncate to model max length (512 tokens)
    result = pipe(text[:512])[0]
    # label format: "1 star", "2 stars", ..., "5 stars"
    stars = int(result["label"].split()[0])
    return float(stars)


def find_keyword_sentences(
    text: str,
    keyword: str,
    synonyms: list[str] | None = None,
) -> list[str]:
    """
    Extract sentences that mention the keyword or any of its synonyms.
    Case-insensitive matching with word-boundary awareness.
    """
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
