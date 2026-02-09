"""
Mock business data for MVP development.
Covers two categories: Coiffeurs (hairdressers) and Pizzerias.
Reviews are in French to validate multilingual NLP.
"""

MOCK_BUSINESSES: dict[str, list[dict]] = {
    "coiffeur": [
        {
            "name": "Salon Élégance",
            "address": "12 Rue de Rivoli, Paris",
            "global_rating": 4.8,
            "reviews": [
                "Le meilleur salon de Paris ! La coupe était parfaite et le brushing magnifique.",
                "J'ai fait une permanente ici et le résultat est incroyable. Mes boucles tiennent depuis 3 mois.",
                "La permanente était exactement ce que je voulais. Très professionnel.",
                "Accueil chaleureux, prix correct. La coloration est superbe.",
                "Ma permanente a tenu très longtemps, je suis ravie du résultat.",
            ],
        },
        {
            "name": "Coiff & Style",
            "address": "45 Avenue des Champs-Élysées, Paris",
            "global_rating": 4.2,
            "reviews": [
                "Bonne coupe, mais l'attente était longue. Ambiance sympa.",
                "La permanente n'a pas tenu plus de 2 semaines. Très déçue.",
                "Coloration parfaite, je recommande pour les mèches.",
                "Service rapide et efficace. Le lissage brésilien est top !",
                "J'ai essayé la permanente, résultat moyen pour le prix.",
            ],
        },
        {
            "name": "L'Atelier du Cheveu",
            "address": "8 Boulevard Saint-Germain, Paris",
            "global_rating": 4.9,
            "reviews": [
                "Le meilleur coiffeur de la rive gauche, sans hésitation.",
                "Superbe balayage, les couleurs sont naturelles et lumineuses.",
                "J'adore ce salon. La coupe est toujours impeccable.",
                "Très bon rapport qualité-prix pour le quartier.",
                "Le coiffeur est un artiste, chaque visite est un plaisir.",
            ],
        },
        {
            "name": "Boucles & Co",
            "address": "23 Rue du Faubourg, Paris",
            "global_rating": 3.9,
            "reviews": [
                "Spécialiste des cheveux bouclés. La permanente est leur spécialité !",
                "Incroyable permanente, mes cheveux n'ont jamais été aussi beaux.",
                "La permanente que j'ai faite ici est la meilleure de ma vie.",
                "Salon un peu petit mais le résultat est toujours au rendez-vous.",
                "La permanente tient parfaitement et les boucles sont naturelles.",
                "Prix un peu élevé mais la qualité de la permanente justifie le coût.",
            ],
        },
    ],
    "pizzeria": [
        {
            "name": "Pizza Napoli",
            "address": "5 Rue de la Paix, Lyon",
            "global_rating": 4.7,
            "reviews": [
                "La meilleure pizza de Lyon ! La pâte fine et croustillante est un régal.",
                "La pâte fine est parfaite, cuite au feu de bois. Un délice.",
                "Excellent choix de garnitures, la Margherita est authentique.",
                "La pâte fine ici est la meilleure que j'ai goûtée en France.",
                "Service un peu lent mais la qualité compense largement.",
            ],
        },
        {
            "name": "Chez Marco",
            "address": "18 Place Bellecour, Lyon",
            "global_rating": 4.5,
            "reviews": [
                "Bonne pizza, ambiance italienne authentique. Les desserts sont excellents.",
                "La calzone est énorme et délicieuse. Je recommande !",
                "La pâte fine est correcte mais pas exceptionnelle.",
                "Super rapport qualité-prix, surtout le menu du midi.",
                "Les pâtes sont meilleures que les pizzas ici.",
            ],
        },
        {
            "name": "La Tranche Dorée",
            "address": "7 Rue Mercière, Lyon",
            "global_rating": 3.8,
            "reviews": [
                "La pâte fine est extraordinaire, la meilleure de la ville !",
                "Chaque pizza avec pâte fine est un chef-d'œuvre. Croustillante et légère.",
                "Petit restaurant sans prétention mais la pâte fine est divine.",
                "La pâte fine croustillante avec la mozzarella fondante, c'est parfait.",
                "Un peu bruyant le soir mais on y revient pour la pâte fine.",
                "Je ne jure que par leur pâte fine. Impossible d'aller ailleurs maintenant.",
            ],
        },
    ],
}


def get_businesses_by_category(category: str) -> list[dict]:
    """Return mock businesses for a given category (case-insensitive)."""
    return MOCK_BUSINESSES.get(category.lower(), [])


def get_all_categories() -> list[str]:
    """Return all available mock categories."""
    return list(MOCK_BUSINESSES.keys())
