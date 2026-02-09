"""Tests for the attribute scoring algorithm."""

from app.core.nlp import split_sentences, find_keyword_sentences, highlight_keyword
from app.core.scoring import calculate_attribute_score, rank_businesses


def test_split_sentences():
    text = "Première phrase. Deuxième phrase ! Troisième ?"
    sentences = split_sentences(text)
    assert len(sentences) == 3


def test_find_keyword_sentences():
    text = "La permanente était superbe. La coupe est moyenne. J'adore ma permanente !"
    matches = find_keyword_sentences(text, "permanente")
    assert len(matches) == 2
    assert all("permanente" in m.lower() for m in matches)


def test_find_keyword_with_synonyms():
    text = "Le lissage est top. La perm tient bien. Rien à signaler."
    matches = find_keyword_sentences(text, "permanente", synonyms=["perm", "lissage"])
    assert len(matches) == 2


def test_highlight_keyword():
    text = "La permanente était superbe"
    result = highlight_keyword(text, "permanente")
    assert "**permanente**" in result


def test_calculate_attribute_score_no_mentions():
    reviews = ["Très bon salon, coupe parfaite.", "Service rapide et efficace."]
    result = calculate_attribute_score(reviews, "permanente")
    assert result["frequency"] == 0
    assert result["weighted_score"] == 0.0
    assert result["best_snippet"] == ""


def test_calculate_attribute_score_with_mentions():
    reviews = [
        "La permanente était excellente, résultat parfait.",
        "Mauvaise expérience, rien à voir avec la permanente.",
    ]
    result = calculate_attribute_score(reviews, "permanente")
    assert result["frequency"] == 2
    assert 0 < result["weighted_score"] <= 5.0
    assert result["best_snippet"] != ""


def test_rank_businesses():
    businesses = [
        {
            "name": "Salon A",
            "global_rating": 4.0,
            "reviews": ["La permanente est moyenne."],
        },
        {
            "name": "Salon B",
            "global_rating": 3.5,
            "reviews": [
                "Superbe permanente !",
                "La permanente ici est la meilleure.",
            ],
        },
    ]
    ranked = rank_businesses(businesses, "permanente")
    assert len(ranked) == 2
    # Salon B should rank higher (more + positive mentions)
    assert ranked[0]["name"] == "Salon B"
