# SkillFinder — Roadmap Business Plan

> Ce document s'active **après** le lancement public réussi (voir `ROADMAP_LANCEMENT.md`).
> La monétisation n'a de sens que lorsqu'une base d'utilisateurs réels existe.
> Horizon : **6 mois à 2 ans après le lancement**.

---

## Principe directeur

> Ne pas monétiser trop tôt. Les 6 premiers mois post-lancement, l'unique objectif est d'acquérir des utilisateurs réels qui reviennent. Un outil que les gens utilisent vaut infiniment plus qu'un outil qui essaie de se vendre avant d'être utile.

---

## Les 5 modèles de revenus identifiés

---

### 💼 Modèle A — Abonnement Professionnel (B2B SaaS)
**Le plus prometteur à court terme**

**Concept :** Les professionnels locaux paient pour apparaître en avant et gérer leur réputation.

| Offre | Prix | Ce qu'elle inclut |
|-------|------|-------------------|
| Gratuit | 0€ | Apparaît dans les résultats (données Google publiques), aucune interaction |
| Pro | 19€/mois | Réclamer son profil, répondre aux avis, ajouter photos/description, badge "Vérifié" |
| Premium | 49€/mois | Tout Pro + position boostée dans les résultats, statistiques de visibilité, bouton "Contacter directement" |

**Pourquoi ça marche :** Un plombier qui facture 500-2000€/intervention investira volontiers 19€/mois pour apparaître en premier résultat dans sa ville.

**Projections :**
- 50 pros abonnés × 19€ = **950€/mois** (objectif 12 mois)
- 200 pros × 30€ moyen = **6 000€/mois** (objectif 18 mois)
- 500 pros × 35€ moyen = **17 500€/mois** (objectif 24 mois)

**Prérequis technique :** Fonctionnalité "Réclamer mon profil" à développer.

---

### 🎯 Modèle B — Pay-per-Lead (Commission à la mise en relation)
**Le plus scalable**

**Concept :** Gratuit pour tous, SkillFinder facture uniquement les mises en contact réussies.

**Fonctionnement :**
- Ajouter un bouton **"Demander un devis"** sur chaque fiche professionnelle
- Quand un utilisateur envoie une demande → le pro reçoit le contact
- SkillFinder facture **3 à 8€ par lead qualifié** transmis
- Option abonnement : le pro achète un quota de leads/mois (ex: 10 leads pour 29€)

**Modèle utilisé par :** Bark.com, Thumbtack, Houzz — prouve que c'est viable.

**Projections :**
- 20 leads/jour × 5€ = **3 000€/mois** (objectif 18 mois)
- 100 leads/jour × 5€ = **15 000€/mois** (objectif 24 mois)

**Prérequis technique :** Système de messagerie entre utilisateur et pro, suivi des leads.

---

### 📊 Modèle C — Dashboard Réputation pour Entreprises
**Tickets les plus élevés**

**Concept :** Vendre des données analytiques aux professionnels et aux franchises.

**Offre Indépendant (29€/mois) :**
- Score IA comparé aux 5 concurrents directs dans sa zone
- Évolution hebdomadaire de sa réputation
- Mots-clés pour lesquels il performe vs. ceux qu'il doit améliorer
- Alertes si un concurrent le dépasse

**Offre Franchise / Réseau (199€/mois) :**
- Tableau de bord de tous les établissements du réseau
- Scoring comparatif entre agences/franchisés
- Rapport mensuel automatisé
- API d'accès aux données

**Pourquoi ça marche :** Les réseaux de plomberie, serrurerie, déménagement ont des budgets marketing et cherchent des données compétitives locales.

**Projections :**
- 10 franchises × 199€ = **1 990€/mois** (objectif 18 mois)
- 30 franchises + 100 indépendants = **8 870€/mois** (objectif 24 mois)

**Prérequis technique :** API analytique, exports PDF/CSV, système de rapports.

---

### 🤝 Modèle D — Affiliation & Partenariats
**Revenus passifs**

**Concept :** Diriger du trafic qualifié vers des partenaires et toucher une commission.

**Partenariats cibles :**
- **Matériaux / Outillage :** ManoMano, Leroy Merlin → "Commander les matériaux" = commission 3-8%
- **Assurances :** Maif, Macif, Allianz → "Ce pro est assuré chez notre partenaire" = commission par souscription
- **Plateformes de réservation :** intégration avec des outils de prise de rendez-vous
- **Formations pro :** liens vers des certifications (QualiPV, RGE...) = commission d'affiliation

**Avantage :** Aucune friction pour l'utilisateur, revenus entièrement passifs une fois les partenariats signés.

**Projections :**
- Démarrage : **500-1 000€/mois** dès 5 000 utilisateurs actifs
- Scale : **3 000-5 000€/mois** avec 20 000+ utilisateurs actifs

**Prérequis :** Base d'utilisateurs suffisante pour intéresser les partenaires (minimum 2 000-3 000 utilisateurs actifs/mois).

---

### 👤 Modèle E — Freemium Utilisateur (B2C)
**Complément à long terme**

**Concept :** Les utilisateurs particuliers paient pour des fonctionnalités premium.

**SkillFinder+ à 4,99€/mois :**
- Recherches IA illimitées (vs. quota gratuit)
- Historique complet de toutes les recherches
- Alertes personnalisées ("Notifie-moi si un électricien > 4.5★ s'installe à Lyon")
- Export PDF de comparatifs
- Interface sans publicités
- Priorité dans le support

**Pourquoi c'est difficile :** Les utilisateurs résistent à payer pour de la recherche. Ce modèle ne fonctionne qu'avec une base fidèle et accro au produit.

**À envisager seulement à partir de :** 5 000 utilisateurs actifs/mois et un NPS (recommandation) élevé.

**Projections :** 1% de conversion = 50 abonnés × 4,99€ = 250€/mois — peu rentable seul, mais complément valide.

---

## Stratégie recommandée : le modèle hybride progressif

```
PHASE 0 — Gratuit total (Mois 1 à 6 post-lancement)
│
│  Objectif : 500 utilisateurs actifs/mois
│  Pas de monétisation
│  Focus : product-market fit, retours utilisateurs, itérations rapides
│  Indicateurs à surveiller :
│    - Nombre de recherches/jour
│    - Taux de retour (reviennent-ils ?)
│    - Taux de vote par recherche
│    - Nombre d'inscriptions
│
▼

PHASE 1 — Premiers revenus B2B (Mois 6 à 12)
│
│  Lancer : Modèle A (Abonnement Pro) en beta fermée
│  Contacter manuellement 20-30 pros qui apparaissent souvent dans les résultats
│  Leur proposer l'abonnement Pro à prix réduit (9€/mois au lieu de 19€)
│  Objectif : 50 pros abonnés = ~950€/mois récurrents
│
│  En parallèle : signer 1-2 partenariats d'affiliation (Modèle D)
│  Objectif revenus phase 1 : 1 500€/mois
│
▼

PHASE 2 — Scaler (Mois 12 à 18)
│
│  Lancer : Pay-per-Lead (Modèle B) pour les pros qui préfèrent payer à la performance
│  Lancer : Dashboard basique pour indépendants (Modèle C — offre 29€/mois)
│  Objectif : 2 000 utilisateurs actifs/mois
│  Objectif revenus phase 2 : 5 000€/mois
│
▼

PHASE 3 — Croissance (Mois 18 à 24)
│
│  Approcher les franchises et réseaux (Modèle C — offre 199€/mois)
│  Multiplier les partenariats d'affiliation
│  Envisager SkillFinder+ si la base utilisateur le justifie (Modèle E)
│  Étendre à d'autres catégories métier (médecins, avocats, coachs...)
│  Objectif revenus phase 3 : 10 000-20 000€/mois
│
▼

PHASE 4 — Expansion (Au-delà de 24 mois)
   Expansion géographique (Belgique, Suisse, Canada francophone)
   Levée de fonds si croissance validée
   Recrutement premier employé (commercial B2B)
```

---

## Indicateurs clés de succès (KPIs)

### Côté utilisateurs (B2C)
| Indicateur | Objectif 6 mois | Objectif 12 mois | Objectif 24 mois |
|------------|----------------|-----------------|-----------------|
| Utilisateurs actifs/mois | 500 | 2 000 | 10 000 |
| Recherches/jour | 100 | 500 | 2 500 |
| Taux de retour (J+7) | > 20% | > 30% | > 40% |
| Inscriptions (comptes) | 200 | 1 000 | 5 000 |

### Côté revenus (B2B)
| Indicateur | Objectif 12 mois | Objectif 18 mois | Objectif 24 mois |
|------------|-----------------|-----------------|-----------------|
| Pros abonnés | 50 | 150 | 400 |
| MRR (revenus récurrents/mois) | 950€ | 5 000€ | 15 000€ |
| ARR (revenus annuels) | 11 400€ | 60 000€ | 180 000€ |
| Leads vendus/mois | 0 | 200 | 1 000 |

---

## Ce qu'il faut développer pour monétiser

Par ordre chronologique de développement :

### Pour lancer le Modèle A (Abonnement Pro)
- [ ] Page "Réclamer mon profil" — formulaire de vérification d'identité du pro
- [ ] Dashboard pro — gérer ses infos, photos, réponses aux avis
- [ ] Système de paiement — Stripe (abonnement mensuel/annuel)
- [ ] Badge "Profil vérifié" sur les fiches
- [ ] Email automatique aux pros qui apparaissent fréquemment dans les résultats

### Pour lancer le Modèle B (Pay-per-Lead)
- [ ] Bouton "Demander un devis" sur les fiches
- [ ] Formulaire de demande utilisateur (besoin, date, budget estimé)
- [ ] Système de transmission du lead au pro (email + dashboard)
- [ ] Facturation à la lead (Stripe)
- [ ] Dashboard de suivi des leads pour les pros

### Pour lancer le Modèle C (Dashboard Analytics)
- [ ] API analytique interne (agréger les données de recherche par pro)
- [ ] Interface dashboard avec graphiques (Chart.js ou Recharts)
- [ ] Export PDF automatisé
- [ ] Système de comparaison avec concurrents directs

---

## Risques et comment les mitiger

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Google change son API Places et coupe l'accès | Moyen | Critique | Diversifier les sources de données (TripAdvisor, Yelp API) |
| Peu de traction utilisateurs malgré le lancement | Élevé | Majeur | Focus SEO local, partenariats avec associations de quartier |
| Les pros refusent de payer | Moyen | Majeur | Proposer du freemium d'abord, passer premium une fois la valeur prouvée |
| Concurrent majeur copie le concept | Faible | Moyen | Avance technique (IA) + communauté fidèle = meilleur rempart |
| Coûts API Google trop élevés à l'échelle | Moyen | Majeur | Cache agressif des résultats, limites de requêtes par utilisateur |

---

## Ressources et outils pour la croissance

**Paiement :**
- [Stripe](https://stripe.com/fr) — abonnements, facturation, pay-per-lead

**Email marketing :**
- [Brevo (ex-Sendinblue)](https://www.brevo.com/fr/) — gratuit jusqu'à 300 emails/jour, RGPD, français

**CRM léger :**
- [Notion](https://notion.so) ou spreadsheet Google Sheets pour gérer les pros contactés

**Acquisition B2B :**
- LinkedIn pour approcher les gestionnaires de franchises
- Annuaires professionnels (CAPEB, FFB) pour trouver des artisans

---

*Document créé le 22 Février 2026 — à mettre à jour trimestriellement selon les résultats réels.*
*Ce document est confidentiel — ne pas partager publiquement.*
