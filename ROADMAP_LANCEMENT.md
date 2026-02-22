# SkillFinder — Roadmap Lancement

> Objectif : passer de l'état actuel à un produit publié, stable, utilisable par n'importe qui au quotidien.
> Horizon : **2 à 3 mois maximum** selon le rythme de travail.

---

## État actuel (Février 2026)

| Composant | Statut |
|-----------|--------|
| Frontend Next.js 15 | ✅ Déployé sur Vercel |
| Backend FastAPI | ✅ Déployé sur Render |
| Base de données Supabase | ✅ Opérationnelle |
| Auth Google (OAuth) | ✅ Fonctionnelle |
| Recherche IA (Gemini) | ✅ Fonctionnelle |
| Gamification (points, classement) | ✅ Fonctionnelle |
| Sentry (monitoring erreurs) | ✅ Configuré |
| Vercel Analytics | ✅ Actif |
| Pages légales (RGPD) | ⚠️ Placeholders à remplir |
| Domaine personnalisé | ❌ À acheter |
| SEO | ❌ À faire |

---

## Étape 1 — Finaliser le légal ✍️
> Durée estimée : 1-2 heures | Priorité : CRITIQUE (obligation légale)

### 1.1 Remplir les pages légales
Dans `frontend/src/app/mentions-legales/page.tsx` et `frontend/src/app/confidentialite/page.tsx`, remplacer :
- `[VOTRE NOM / SOCIÉTÉ]` → ton nom complet ou le nom de ta société
- `[ADRESSE COMPLÈTE]` → ton adresse postale (obligatoire légalement)
- `[VOTRE NOM]` → ton nom en tant que directeur de publication
- `contact@skillfinder.fr` → ton adresse email réelle (ou créer cette adresse)

### 1.2 Corriger Vercel Analytics et le consentement
Vercel Analytics se charge actuellement sans vérifier si l'utilisateur a accepté les cookies.
- Conditionner `<Analytics />` dans `layout.tsx` au consentement cookie de l'utilisateur

### 1.3 Vérifier le bandeau cookie
- S'assurer que le bandeau cookie bloque bien les analytics jusqu'à l'acceptation
- Tester le flux complet : refuser → accepter → vérifier que les données ne partent qu'après acceptation

---

## Étape 2 — Domaine personnalisé 🌐
> Durée estimée : 1 soirée | Priorité : HAUTE (image professionnelle)

### 2.1 Acheter le domaine
- Aller sur **OVH.com**, **Namecheap.com** ou **Cloudflare.com**
- Acheter `skillfinder.fr` (~10€/an) ou `skillfinder.app` (~14€/an)
- Vérifier la disponibilité avant d'acheter

### 2.2 Connecter à Vercel (frontend)
1. Dashboard Vercel → ton projet → **Settings → Domains**
2. Ajouter `skillfinder.fr` et `www.skillfinder.fr`
3. Vercel te donne un enregistrement DNS à copier
4. Chez ton registrar : ajouter l'enregistrement CNAME/A fourni
5. Attendre la propagation DNS (5 min à 48h)
6. Le certificat HTTPS est généré automatiquement par Vercel

### 2.3 Mettre à jour les CORS backend (Render)
Dans `backend/app/main.py`, ajouter `https://skillfinder.fr` et `https://www.skillfinder.fr` aux origines CORS autorisées, puis redéployer.

### 2.4 Mettre à jour les variables d'environnement
- Vercel : mettre à jour `NEXT_PUBLIC_APP_URL` si elle existe
- Supabase : dans **Authentication → URL Configuration**, ajouter `https://skillfinder.fr` comme URL autorisée pour le redirect OAuth Google

### 2.5 Créer l'adresse email
- Créer `contact@skillfinder.fr` (via OVH Mail, Zoho Mail gratuit, ou Google Workspace)
- Mettre à jour cette adresse dans les pages légales

---

## Étape 3 — SEO minimal 🔍
> Durée estimée : 2-3 heures | Priorité : HAUTE (visibilité Google)

Sans SEO, Google met des semaines à trouver le site et il n'apparaîtra pas dans les résultats de recherche.

### 3.1 Meta tags dynamiques
- Ajouter un `<title>` et `<description>` pertinents dans `layout.tsx`
- Exemple : `"SkillFinder — Trouvez le meilleur professionnel près de chez vous"`

### 3.2 sitemap.xml automatique
- Next.js 15 gère les sitemaps nativement via `app/sitemap.ts`
- Créer ce fichier pour lister les pages principales du site
- Google utilisera ce fichier pour indexer toutes les pages

### 3.3 robots.txt
- Créer `app/robots.ts` pour indiquer à Google quelles pages indexer
- Bloquer les pages internes (`/admin`, `/api/...`)

### 3.4 Soumettre à Google Search Console
1. Aller sur [search.google.com/search-console](https://search.google.com/search-console)
2. Ajouter ton domaine `skillfinder.fr`
3. Vérifier la propriété (via DNS ou fichier HTML)
4. Soumettre le sitemap
5. Google commencera à indexer le site dans les jours suivants

---

## Étape 4 — Tests end-to-end 🧪
> Durée estimée : 1-2 heures | Priorité : HAUTE (fiabilité)

Tester **sur la production** (pas en local) tous les scénarios critiques.

### 4.1 Checklist fonctionnelle
- [ ] Recherche "plombier Paris" → résultats s'affichent avec scores IA
- [ ] Filtres (note, distance) → fonctionnent correctement
- [ ] Vote "Oui/Non" sur un résultat → points augmentent
- [ ] Inscription par email → compte créé, points de guest transférés
- [ ] Connexion Google → points préservés (bug corrigé, à vérifier)
- [ ] Déconnexion → points remis à 0 côté guest
- [ ] Reconnexion → points du compte récupérés depuis le serveur
- [ ] Favoris → sauvegardés et retrouvés après rechargement
- [ ] Classement hebdomadaire → s'affiche correctement
- [ ] Pages légales → accessibles depuis le footer, texte complet (sans placeholders)
- [ ] Bandeau cookie → s'affiche, fonctionne, persiste le choix

### 4.2 Tests mobile
- Ouvrir sur un vrai smartphone (iPhone et Android si possible)
- Vérifier que l'interface est utilisable : boutons, taille de texte, scroll
- Tester la géolocalisation sur mobile

### 4.3 Test de performance
- Ouvrir Chrome DevTools → Lighthouse
- Viser un score Performance > 70, Accessibilité > 90
- Corriger les problèmes remontés si critiques

---

## Étape 5 — Lancement beta privée 👥
> Durée estimée : 1 semaine | Priorité : VALIDATION

Avant d'annoncer publiquement, tester avec un cercle restreint.

### 5.1 Inviter 20-50 personnes de confiance
- Famille, amis, collègues
- Leur demander de :
  - Faire une vraie recherche (un professionnel qu'ils ont besoin)
  - Voter sur des résultats
  - S'inscrire et observer si les points sont préservés
  - Signaler tout ce qui est bloquant ou confus

### 5.2 Observer les données
- Sentry : y a-t-il des erreurs inconnues qui remontent ?
- Vercel Analytics : quelles pages sont visitées ? Où les gens abandonnent-ils ?
- Demander des retours directs à quelques testeurs

### 5.3 Itérer rapidement
- Corriger les bugs bloquants en priorité
- Ne pas chercher à tout perfectionner — viser le "suffisamment bon pour fonctionner"

---

## Étape 6 — Lancement public 🚀
> Quand : une fois l'étape 5 validée sans bug majeur

### 6.1 Annonce
- Partager sur LinkedIn, Twitter/X avec une démonstration vidéo courte (30 sec)
- Publier sur des communautés : Reddit (r/france, r/entrepreneur), IndieHackers, ProductHunt
- Contacter des blogueurs ou journalistes spécialisés artisanat/services locaux

### 6.2 Référencement local
- Créer une fiche Google My Business pour SkillFinder
- Soumettre le site à des annuaires (Yelp FR, Trustpilot...)

### 6.3 Surveiller après le lancement
- Vérifier Sentry chaque jour la première semaine
- Répondre aux premiers retours utilisateurs rapidement (< 24h)
- Suivre les métriques : nombre de recherches, votes, inscriptions

---

## Anomalies techniques à corriger (issues connues)

Issues identifiées lors de l'audit code — à traiter par ordre de priorité :

| Priorité | Description | Fichier |
|----------|-------------|---------|
| 🔴 Critique | Placeholders légaux non remplis | `mentions-legales/page.tsx`, `confidentialite/page.tsx` |
| 🔴 Critique | Vercel Analytics sans vérification consentement | `layout.tsx` |
| 🔴 Critique | CSP avec `unsafe-eval` (faille sécurité) | `next.config.ts` |
| 🟠 Majeur | Parsing JSON Gemini fragile (peut crasher) | `backend/app/services/llm.py` |
| 🟠 Majeur | Clients HTTP backend jamais fermés | `backend/app/services/google_maps.py` |
| 🟠 Majeur | Race condition client Supabase singleton | `backend/app/services/supabase.py` |
| 🟠 Majeur | Vérification content-range PATCH fragile | `backend/app/services/supabase.py` |
| 🟡 Mineur | console.log/warn en production | `useRewards.ts`, `api.ts` |
| 🟡 Mineur | Accès admin par env var string | `backend/app/api/routes.py` |

---

## Checklist finale avant lancement public

- [ ] Placeholders légaux remplis (nom, adresse, email)
- [ ] Domaine `skillfinder.fr` acheté et connecté
- [ ] Redirect OAuth Google mis à jour dans Supabase
- [ ] CORS backend mis à jour avec le nouveau domaine
- [ ] sitemap.xml et robots.txt créés
- [ ] Soumission Google Search Console
- [ ] Tests end-to-end passés sur la prod
- [ ] Tests mobile validés
- [ ] Beta privée terminée sans bug majeur
- [ ] Vercel Analytics conditionné au consentement
- [ ] Sentry configuré et alertes email activées

---

*Document créé le 22 Février 2026 — à mettre à jour au fur et à mesure de l'avancement.*
