# Idées futures SkillFinder

Document de réflexion sur les fonctionnalités potentielles à intégrer.
Légende complexité : 🟢 Faible · 🟡 Moyenne · 🔴 Élevée

---

## 1. ~~Recherche sans critère spécifique obligatoire~~ ✅ Implémenté — mars 2026

**Description**
Permettre de lancer une recherche en renseignant uniquement le service et la ville (sans remplir le champ "critère spécifique"). Le moteur renvoie les meilleures entreprises de la catégorie selon la note globale, sans scoring sémantique IA.

**Ce qui a été fait**
- Backend : `keyword` rendu optionnel dans `SearchRequest` ; mode exploration dans `rank_businesses()` (tri par `global_rating`) ; synonymes et LLM court-circuités si keyword vide
- Frontend : bouton de recherche débloqué sans keyword ; tri par défaut "Note" en mode exploration ; bouton IA et option "Meilleur match" masqués ; résumé, historique et messages adaptés ; label du champ mis à jour "(optionnel)"
- Bonus : clic sur le logo SkillFinder efface les champs service et critère

| Complexité | Impact utilisateur | Statut |
|---|---|---|
| 🟢 Faible | ⭐⭐⭐⭐⭐ Très élevé | ✅ Livré |

---

## 3. Système d'amis entre utilisateurs

**Description**
Pouvoir chercher d'autres utilisateurs SkillFinder et les ajouter en amis, créant ainsi un réseau social minimal autour des recommandations locales.

**Avis**
⚠️ Fonctionnalité structurante mais à fort risque de complexité. Elle nécessite une table `friendships` en base, une interface de recherche d'utilisateurs, un système de demande/acceptation, des notifications, et des règles de confidentialité. Le vrai danger est de créer une couche sociale qui ne sert à rien si la base d'utilisateurs est trop petite au départ. À réserver pour une phase de croissance plus avancée, après avoir validé l'usage des favoris et de la vérification communautaire.

| Complexité | Impact utilisateur | Priorité suggérée |
|---|---|---|
| 🔴 Élevée | ⭐⭐⭐ Modéré (conditionné à la masse critique d'utilisateurs) | 📆 Long terme |

---

## 4. Partage de la liste de favoris aux amis

**Description**
Donner la possibilité de rendre sa liste de favoris visible, en totalité ou en partie, à certains amis sélectionnés.

**Avis**
✅ Idée très pertinente et cohérente avec l'idée d'amis. C'est le cas d'usage "recommandation entre proches" qui est l'un des plus naturels pour SkillFinder. Dépend logiquement de la fonctionnalité #3. Si le système d'amis est implémenté, celle-ci est relativement simple à ajouter par-dessus (permission de visibilité sur une liste existante). À coupler avec la fonctionnalité #3 dans la même phase de développement.

| Complexité | Impact utilisateur | Priorité suggérée |
|---|---|---|
| 🟡 Moyenne (si #3 déjà en place) | ⭐⭐⭐⭐ Élevé | 📆 Long terme (après #3) |

---

## 5. ~~Commentaires SkillFinder (avis communautaires courts)~~ ✅ Implémenté — mars 2026

**Description**
En plus du vote Oui/Non sur le critère spécifique, les utilisateurs connectés pourraient écrire un commentaire court (ex. 280 caractères max) visible par tous, spécifiquement lié à la recherche en cours. Ces commentaires seraient distincts des avis Google et complémentaires : ils portent sur le critère recherché, pas sur l'entreprise en général.

**Avis**
✅✅ Excellente idée et probablement la plus différenciante de la liste. C'est ce qui ferait de SkillFinder une vraie plateforme communautaire et non un simple agrégateur Google. Le fait que les commentaires soient liés au critère de recherche (pas à l'établissement en général) est une vraie valeur ajoutée introuvable ailleurs. Risques à anticiper : modération du contenu, spam, commentaires hors sujet. À implémenter avec un système de signalement dès le départ.

**Ce qui a été fait**
- Backend : table Supabase `comments` (RLS par `user_id`) ; `get_comments()` et `add_comment()` dans supabase.py ; endpoints `GET /api/comments` et `POST /api/comments` avec auth JWT ; keyword normalisé en minuscules
- Frontend : interface `SkillComment` et fonctions `fetchComments()` / `postComment()` dans api.ts ; composant `CommentsSection` autonome (chargement lazy, compteur 280 chars, horodatage relatif) ; intégré dans `ResultCard` ; traductions FR/EN complètes

| Complexité | Impact utilisateur | Statut |
|---|---|---|
| 🟡 Moyenne | ⭐⭐⭐⭐⭐ Très élevé | ✅ Livré |

---

## 6. Application mobile native (iOS / Android)

**Description**
Développer SkillFinder comme une application mobile native ou hybride (React Native, Expo, etc.) pour une expérience optimisée sur smartphone.

**Avis**
⚠️ À ne pas confondre avec la priorité. SkillFinder est déjà une Progressive Web App (PWA) qui fonctionne sur mobile via le navigateur. Une app native apporte principalement : les notifications push, l'accès à la géolocalisation en arrière-plan, une icône sur l'écran d'accueil et une meilleure performance. Le coût de développement et de maintenance est significatif (deux codebase ou une refonte en React Native). À envisager sérieusement uniquement après avoir atteint ~1 000 utilisateurs actifs réguliers — avant, c'est prématuré. En attendant, optimiser la PWA (manifest, offline, install prompt).

| Complexité | Impact utilisateur | Priorité suggérée |
|---|---|---|
| 🔴 Très élevée | ⭐⭐⭐⭐ Élevé (à partir d'une certaine base) | 📆 Long terme |

---

## 7. Suggestions intelligentes basées sur les favoris

**Description**
Surveiller en arrière-plan les nouvelles entreprises référencées correspondant au profil des favoris d'un utilisateur. Si une nouvelle entreprise obtient un score supérieur à un favori existant sur le même critère et la même zone géographique, notifier l'utilisateur (email ou notification push).

**Avis**
✅✅ Idée ambitieuse et très séduisante — c'est la fonctionnalité "assistant proactif" qui ferait passer SkillFinder d'un outil de recherche à un vrai conseiller personnel. Le cas d'usage est excellent : "tu as mis en favori La Bonne Baguette pour sa baguette bien cuite, un nouveau boulanger vient d'ouvrir avec 15 avis qui le mentionnent — voilà son score." Techniquement, cela nécessite un job planifié (cron), un système de profils de favoris structurés, et les notifications. C'est une fonctionnalité à fort potentiel de rétention et de différenciation. À mettre sur la feuille de route moyen/long terme après avoir un volume suffisant de favoris enregistrés.

| Complexité | Impact utilisateur | Priorité suggérée |
|---|---|---|
| 🔴 Élevée | ⭐⭐⭐⭐⭐ Très élevé (rétention++) | 📆 Long terme |

---

## 8. Mascotte SkillFinder

**Description**
Créer une mascotte officielle SkillFinder qui servirait d'identité visuelle au logo et à l'interface. Personnage emblématique de la marque, cohérent avec l'univers des services locaux.

**Avis**
✅ Une mascotte forte est un vecteur de mémorabilité puissant (Duolingo, Clippy, Michelin). Elle humanise la marque et crée un attachement émotionnel. À définir soigneusement pour qu'elle reflète les valeurs de SkillFinder : confiance, expertise locale, proximité. Peut être déclinée sur tous les supports (logo, emails, appli, réseaux sociaux).

| Complexité | Impact utilisateur | Priorité suggérée |
|---|---|---|
| 🟡 Moyenne (design) | ⭐⭐⭐⭐ Élevé (branding) | 📆 Moyen terme |

---

## 9. Micro-transactions — Personnalisation de mascotte

**Description**
Chaque utilisateur possède une mascotte SkillFinder personnalisable avec des items cosmétiques. Deux types d'items :

**Items gratuits — débloqués par paliers de points :**
- 2-3 items par palier (récompense la fidélité et la participation)
- Exemples : chapeau, accessoire, couleur de fond à débloquer en atteignant 100 pts, 500 pts, 1 000 pts...

**Items payants :**
- **Achat unitaire** : 1,99€ l'item — items cosmétiques thématiques disponibles à la carte
- Catalogue renouvelé régulièrement (collections saisonnières : "Été", "Noël", "Artisan"...)

**Avis**
✅ Modèle de monétisation B2C simple et transparent (pas de loot boxes). Entièrement cosmétique, ne crée pas de déséquilibre. Les paliers gratuits incitent à voter/commenter davantage (engagement++). Les items payants à prix unique évitent tout problème réglementaire. Prend tout son sens une fois le système d'amis (#3) en place — les utilisateurs pourront voir la mascotte personnalisée de leurs amis. À intégrer dans le modèle Freemium (voir ROADMAP_BUSINESS.md, Modèle F).

| Complexité | Impact utilisateur | Priorité suggérée |
|---|---|---|
| 🟡 Moyenne | ⭐⭐⭐⭐ Élevé (engagement + revenus) | 📆 Long terme (après #3 et #8) |

---

## 10. Partage par lien (sans système d'amis)

**Description**
Permettre de partager un commerce ou un résultat de recherche via un lien unique (type `skillfinder.fr/share/place_id?keyword=xxx`). Le lien affiche une page avec le score, les infos clés et une preview OpenGraph (titre, image, score) pour un rendu propre sur les réseaux sociaux et messageries.

**Avis**
✅✅ Stratégiquement la fonctionnalité la plus importante à court terme. C'est du **marketing gratuit et viral** : un utilisateur trouve un bon artisan → partage le lien → son ami découvre SkillFinder. Aucune dépendance technique, pas besoin du système d'amis (#3). Faible complexité, fort effet levier sur la croissance organique. C'est aussi un accélérateur pour atteindre la masse critique d'utilisateurs nécessaire avant les fonctionnalités sociales (#3, #4, #9).

| Complexité | Impact utilisateur | Priorité suggérée |
|---|---|---|
| 🟢 Faible | ⭐⭐⭐⭐⭐ Très élevé (croissance organique) | 📆 Court terme |

---

## 11. Historique de recherche

**Description**
Sauvegarder automatiquement les dernières recherches de l'utilisateur (service, ville, critère) dans le `localStorage` du navigateur. Afficher un historique cliquable sous le formulaire de recherche ou dans le profil, permettant de relancer une recherche passée en un clic.

**Avis**
✅ Micro-fonctionnalité à très fort rapport effort/impact. Zéro backend, zéro base de données — tout côté client. Améliore l'expérience au quotidien et encourage le retour sur le site. L'utilisateur qui revient sur SkillFinder retrouve immédiatement ses recherches précédentes sans avoir à retaper les paramètres.

| Complexité | Impact utilisateur | Priorité suggérée |
|---|---|---|
| 🟢 Très faible | ⭐⭐⭐⭐ Élevé (rétention) | 📆 Court terme |

---

## 12. Mode carte (résultats sur Google Maps)

**Description**
Afficher les résultats de recherche sur une carte Google Maps interactive en plus de la liste actuelle. Chaque commerce apparaît comme un marqueur cliquable avec son score et ses infos principales. L'utilisateur peut basculer entre vue liste et vue carte.

**Avis**
✅✅ Fonctionnalité très naturelle pour un outil de recherche locale. Les données nécessaires (latitude, longitude) sont déjà présentes dans les résultats de la Places API. L'API Google Maps JS est déjà configurée (utilisée pour le geocoding). Fort impact visuel, aucune dépendance avec d'autres fonctionnalités. Seul point d'attention : le coût API Maps (chaque affichage consomme des requêtes Maps JS), à surveiller en cas de croissance.

| Complexité | Impact utilisateur | Priorité suggérée |
|---|---|---|
| 🟡 Moyenne | ⭐⭐⭐⭐⭐ Très élevé | 📆 Court/Moyen terme |

---

## 13. Badges utilisateur

**Description**
Attribuer des badges visuels aux utilisateurs en fonction de leur activité : "Premier commentaire", "10 vérifications", "Top 3 de ta ville", "Membre depuis 6 mois", etc. Les badges sont affichés sur le profil et à côté du pseudo dans les commentaires.

**Avis**
✅✅ Complément logique du système de points et du leaderboard existants. Les badges créent un cycle d'engagement vertueux : l'utilisateur veut le prochain badge → il vote/commente davantage → il gagne des points → il monte au leaderboard. Parfaitement synergique avec les idées prévues : la mascotte (#8) pourrait porter les badges, les micro-transactions (#9) pourraient inclure des cadres de badges premium, le système d'amis (#3) rendrait les badges visibles socialement. C'est le socle de la gamification — à implémenter avant ou en même temps que la mascotte.

| Complexité | Impact utilisateur | Priorité suggérée |
|---|---|---|
| 🟡 Moyenne | ⭐⭐⭐⭐ Élevé (engagement) | 📆 Moyen terme (avant #8) |

---

## 14. Mode sombre

**Description**
Proposer un thème sombre complet pour l'interface SkillFinder, activable manuellement ou automatiquement selon les préférences système de l'utilisateur. Le design system actuel (sf-cream, sf-accent terracotta) serait transposé en palette sombre cohérente.

**Avis**
✅ Fonctionnalité confort que les utilisateurs attendent de plus en plus, surtout sur mobile le soir. Avec Tailwind (déjà utilisé), le dark mode est relativement simple via le préfixe `dark:`. Aucune dépendance backend, aucun impact sur les autres fonctionnalités. Ne fait pas venir de nouveaux utilisateurs mais améliore le "polish" du produit. À faire quand il y a un creux dans le développement.

| Complexité | Impact utilisateur | Priorité suggérée |
|---|---|---|
| 🟢 Faible | ⭐⭐⭐ Modéré (confort) | 📆 Moyen terme |

---

## 15. Notifications email

**Description**
Envoyer des emails aux utilisateurs pour des événements clés : réponse à un commentaire, nouveau concurrent d'un favori, badge débloqué, résumé hebdomadaire d'activité. Nécessite un service d'envoi (Resend, SendGrid) et une page de préférences de notification (opt-in RGPD).

**Avis**
✅ Prérequis technique pour l'idée #7 (suggestions intelligentes basées sur les favoris). Sans notifications, impossible d'alerter l'utilisateur qu'un meilleur commerce est apparu. C'est un gros chantier (service email, templates, gestion opt-in/opt-out, RGPD) mais c'est un investissement structurant. Commencer par l'email uniquement — les notifications push viendront naturellement avec l'app native (#6) ou une PWA plus mature.

| Complexité | Impact utilisateur | Priorité suggérée |
|---|---|---|
| 🔴 Élevée | ⭐⭐⭐⭐ Élevé | 📆 Moyen terme |

---

## Synthèse et ordre de priorité suggéré

| # | Fonctionnalité | Priorité |
|---|---|---|
| 1 | ~~Recherche sans critère obligatoire~~ | ✅ Livré |
| 5 | ~~Commentaires SkillFinder~~ | ✅ Livré |
| 10 | Partage par lien | 📆 Court terme |
| 11 | Historique de recherche | 📆 Court terme |
| 12 | Mode carte (Google Maps) | 📆 Court/Moyen terme |
| 13 | Badges utilisateur | 📆 Moyen terme (avant #8) |
| 14 | Mode sombre | 📆 Moyen terme |
| 15 | Notifications email | 📆 Moyen terme |
| 8 | Mascotte SkillFinder | 📆 Moyen terme |
| 3 | Système d'amis | 📆 Long terme |
| 4 | Partage des favoris aux amis | 📆 Long terme (après #3) |
| 9 | Micro-transactions (personnalisation mascotte) | 📆 Long terme |
| 7 | Suggestions intelligentes (favoris) | 📆 Long terme |
| 6 | Application mobile native | 📆 Long terme |
