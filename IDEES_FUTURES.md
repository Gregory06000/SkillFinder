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

## Synthèse et ordre de priorité suggéré

| # | Fonctionnalité | Priorité |
|---|---|---|
| 1 | ~~Recherche sans critère obligatoire~~ | ✅ Livré |
| 5 | ~~Commentaires SkillFinder~~ | ✅ Livré |
| 3 | Système d'amis | 📆 Long terme |
| 4 | Partage des favoris aux amis | 📆 Long terme (après #3) |
| 7 | Suggestions intelligentes (favoris) | 📆 Long terme |
| 6 | Application mobile native | 📆 Long terme |
