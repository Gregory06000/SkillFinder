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

## 3. ~~Système d'amis entre utilisateurs~~ ✅ Implémenté — mars 2026

**Description**
Pouvoir chercher d'autres utilisateurs SkillFinder et les ajouter en amis, créant ainsi un réseau social minimal autour des recommandations locales.

**Ce qui a été fait**
- Backend : table `friendships` avec RLS (requester/addressee), table `user_profiles` pour données publiques
- Supabase : fonctions `search_users`, `send_friend_request`, `respond_friend_request`, `get_friends`, `get_pending_requests`, `remove_friend`
- API : 6 endpoints (`GET /friends/search`, `POST /friends/request`, `POST /friends/respond`, `GET /friends`, `GET /friends/pending`, `DELETE /friends/:id`)
- Frontend : composant `FriendsPanel` intégré dans le ProfilePanel (recherche, demandes en attente, liste d'amis, ajout/suppression)
- Recherche d'utilisateurs par pseudo avec debounce 400ms
- Système demande/acceptation/refus avec feedback visuel
- Traductions FR/EN complètes
- SQL fourni dans `backend/sql/friendships.sql`

**Pour activer** : exécuter `backend/sql/friendships.sql` dans Supabase SQL Editor.

| Complexité | Impact utilisateur | Statut |
|---|---|---|
| 🔴 Élevée | ⭐⭐⭐ Modéré | ✅ Livré |

---

## 4. ~~Partage de la liste de favoris aux amis~~ ✅ Implémenté — mars 2026

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

## 8. ~~Mascotte SkillFinder~~ ✅ Implémenté — mars 2026

**Description**
Créer une mascotte officielle SkillFinder qui servirait d'identité visuelle au logo et à l'interface. Personnage emblématique de la marque, cohérent avec l'univers des services locaux.

**Ce qui a été fait**
- Mascotte "Findy" : personnage rond et sympathique avec béret d'explorateur doré et loupe, aux couleurs terracotta de la marque
- 4 poses SVG : default (neutre), wave (accueil/hero), search (chargement), sad (404/aucun résultat)
- Composant React `Mascot` réutilisable avec props : pose, size, className, animate (bounce lent)
- Intégration : hero section (Findy fait coucou), chargement des résultats (Findy cherche), aucun résultat (Findy triste), page 404 (Findy triste)
- Animation CSS `bounce-slow` pour les états actifs

| Complexité | Impact utilisateur | Statut |
|---|---|---|
| 🟡 Moyenne (design) | ⭐⭐⭐⭐ Élevé (branding) | ✅ Livré |

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

## 10. ~~Partage par lien (sans système d'amis)~~ ✅ Implémenté — mars 2026

**Description**
Permettre de partager un commerce ou un résultat de recherche via un lien unique. Le lien affiche une page avec le score, les infos clés et une preview OpenGraph (titre, image, score) pour un rendu propre sur les réseaux sociaux et messageries.

**Ce qui a été fait**
- Page `/share` avec métadonnées OpenGraph dynamiques (titre, description, image)
- Bouton partage génère un lien SkillFinder (au lieu de Google Maps)
- Web Share API sur mobile, copie dans le presse-papiers sur desktop
- Feedback visuel "Lien copié !" avec icône check verte
- Page de partage avec carte commerce, score, CTA "Rechercher sur SkillFinder"

| Complexité | Impact utilisateur | Statut |
|---|---|---|
| 🟢 Faible | ⭐⭐⭐⭐⭐ Très élevé (croissance organique) | ✅ Livré |

---

## 11. ~~Historique de recherche~~ ✅ Implémenté — mars 2026

**Description**
Sauvegarder automatiquement les dernières recherches de l'utilisateur dans le localStorage. Afficher un historique cliquable sous le formulaire de recherche.

**Ce qui a été fait**
- Historique des 10 dernières recherches dans localStorage (useSearch hook)
- Boutons cliquables sous le formulaire pour relancer une recherche en un clic
- Bouton "Effacer" pour vider l'historique
- Dédoublonnage automatique des recherches identiques

| Complexité | Impact utilisateur | Statut |
|---|---|---|
| 🟢 Très faible | ⭐⭐⭐⭐ Élevé (rétention) | ✅ Livré |

---

## 12. ~~Mode carte (résultats sur Google Maps)~~ ✅ Implémenté — mars 2026

**Description**
Afficher les résultats de recherche sur une carte Google Maps interactive. Chaque commerce apparaît comme un marqueur cliquable avec son score et ses infos principales.

**Ce qui a été fait**
- Composant ResultsMap avec @vis.gl/react-google-maps
- Marqueurs colorés par score (vert ≥4, jaune ≥3, orange ≥2, rouge <2)
- InfoWindow popup avec nom, adresse, score, note, lien Maps
- Cercle de rayon de recherche (bleu transparent)
- Auto-zoom pour inclure tous les marqueurs
- Toggle Liste/Carte sur mobile, vue 2 colonnes sur desktop
- Carte sticky en desktop, 400px sur mobile

| Complexité | Impact utilisateur | Statut |
|---|---|---|
| 🟡 Moyenne | ⭐⭐⭐⭐⭐ Très élevé | ✅ Livré |

---

## 13. ~~Badges utilisateur~~ ✅ Implémenté — mars 2026

**Description**
Attribuer des badges visuels aux utilisateurs en fonction de leur activité. Les badges sont affichés dans le panneau de profil.

**Ce qui a été fait**
- 9 badges : Premier vote, Explorateur, Éclaireur, Guide Certifié, Expert Local, Marathonien, Vétéran, Maître, Divinité
- Conditions basées sur les points et le nombre de votes
- Grille 3x3 dans le ProfilePanel avec emojis, noms et statut (débloqué/verrouillé)
- Badges verrouillés grisés avec icône cadenas
- Tooltip avec description de la condition de déblocage
- Compteur "X/9 badges débloqués"
- Traductions FR/EN

| Complexité | Impact utilisateur | Statut |
|---|---|---|
| 🟡 Moyenne | ⭐⭐⭐⭐ Élevé (engagement) | ✅ Livré |

---

## 14. ~~Mode sombre~~ ✅ Implémenté — mars 2026

**Description**
Proposer un thème sombre complet pour l'interface SkillFinder, activable manuellement ou automatiquement selon les préférences système.

**Ce qui a été fait**
- Variables CSS pour toutes les couleurs sf-* (`:root` light, `.dark` dark)
- Hook useTheme avec persistance localStorage + détection préférence système
- Toggle soleil/lune dans la navbar (desktop + mobile)
- Tous les composants migrés de `bg-white` → `bg-sf-card`, `bg-gray-50` → `bg-sf-bg`
- Inline styles convertis en variables CSS (navbar, profil)
- Palette sombre cohérente : fond #141211, cartes #1E1C1A, accent #E8805F

| Complexité | Impact utilisateur | Statut |
|---|---|---|
| 🟢 Faible | ⭐⭐⭐ Modéré (confort) | ✅ Livré |

---

## 15. ~~Notifications email~~ ✅ Infrastructure prête — mars 2026

**Description**
Envoyer des emails aux utilisateurs pour des événements clés : badge débloqué, résumé hebdomadaire. Service d'envoi via Resend, préférences opt-in RGPD.

**Ce qui a été fait**
- Backend : service `email.py` avec intégration Resend API (activé par `RESEND_API_KEY`)
- Templates HTML : email de bienvenue, badge débloqué, résumé hebdomadaire
- Endpoints : GET/POST `/notifications/preferences` (authentifié)
- Table Supabase `notification_preferences` avec RLS (SQL fourni)
- Frontend : toggles on/off dans le ProfilePanel (badges + résumé hebdo)
- API functions : `fetchNotificationPrefs` / `updateNotificationPrefs`
- Traductions FR/EN

**Pour activer** : configurer `RESEND_API_KEY` dans les variables d'environnement Render + exécuter le SQL dans Supabase.

| Complexité | Impact utilisateur | Statut |
|---|---|---|
| 🔴 Élevée | ⭐⭐⭐⭐ Élevé | ✅ Infrastructure prête (activer Resend) |

---

## Synthèse et ordre de priorité suggéré

| # | Fonctionnalité | Statut |
|---|---|---|
| 1 | ~~Recherche sans critère obligatoire~~ | ✅ Livré |
| 5 | ~~Commentaires SkillFinder~~ | ✅ Livré |
| 10 | ~~Partage par lien~~ | ✅ Livré |
| 11 | ~~Historique de recherche~~ | ✅ Livré |
| 12 | ~~Mode carte (Google Maps)~~ | ✅ Livré |
| 13 | ~~Badges utilisateur~~ | ✅ Livré |
| 14 | ~~Mode sombre~~ | ✅ Livré |
| 15 | ~~Notifications email~~ | ✅ Infrastructure prête |
| 8 | ~~Mascotte SkillFinder~~ | ✅ Livré |
| 3 | ~~Système d'amis~~ | ✅ Livré |
| 4 | ~~Partage des favoris aux amis~~ ✅ | 📆 Long terme (après #3) |
| 9 | Micro-transactions (personnalisation mascotte) | 📆 Long terme |
| 7 | Suggestions intelligentes (favoris) | 📆 Long terme |
| 6 | Application mobile native | 📆 Long terme |
