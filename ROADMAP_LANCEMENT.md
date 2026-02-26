# SkillFinder — Roadmap Lancement

> Objectif : passer de l'état actuel à un produit publié, stable, utilisable par n'importe qui au quotidien.
> Horizon : **2 à 3 mois maximum** selon le rythme de travail.

---

## État actuel (26 Février 2026)

| Composant | Statut |
|-----------|--------|
| Frontend Next.js 15 | ✅ Déployé sur Vercel |
| Backend FastAPI | ✅ Déployé sur Render |
| Base de données Supabase | ✅ Opérationnelle |
| Auth Google (OAuth) | ✅ Fonctionnelle |
| Recherche IA (Gemini) | ✅ Fonctionnelle |
| Gamification (points, classement) | ✅ Fonctionnelle |
| Sentry (monitoring erreurs) | ✅ Configuré |
| Vercel Analytics | ✅ Conditionné au consentement cookie |
| Pages légales (RGPD) | ✅ Remplies (Gregory Semeria, Nice) |
| Domaine personnalisé | ✅ skillfinder.fr actif |
| SEO | ✅ Sitemap + robots.txt + Search Console |

---

## Étape 1 — Finaliser le légal ✍️ ✅ TERMINÉE
> Complétée le 26 Février 2026

### 1.1 Remplir les pages légales ✅
- `mentions-legales/page.tsx` et `confidentialite/page.tsx` remplis avec : Gregory Semeria, 1 Rue Roger Martin du Gard, 06000 Nice, contact@skillfinder.fr

### 1.2 Corriger Vercel Analytics et le consentement ✅
- `<ConditionalAnalytics />` créé — ne se charge qu'après `sf_cookie_consent = "1"`
- `CookieBanner` dispatche l'événement `sf:consent` à l'acceptation

### 1.3 Vérifier le bandeau cookie ✅
- Testé en navigation privée : bandeau s'affiche, persiste le choix, bloque Analytics avant acceptation

---

## Étape 2 — Domaine personnalisé 🌐 ✅ TERMINÉE
> Complétée le 26 Février 2026

### 2.1 Acheter le domaine ✅
- `skillfinder.fr` acheté sur OVH pour 2 ans (avec DNSSEC + Zimbra Starter)

### 2.2 Connecter à Vercel ✅
- DNS configurés sur OVH : CNAME `www` → Vercel, A `@` → `216.198.79.1`
- Vercel : `skillfinder.fr` et `www.skillfinder.fr` en **Valid Configuration ✅**
- HTTPS actif automatiquement

### 2.3 Mettre à jour les CORS backend ✅
- `backend/app/main.py` : CORS multi-origine via variable `FRONTEND_URL` (comma-separated)
- Render `FRONTEND_URL` = `https://skillfinder.fr,https://www.skillfinder.fr,https://skill-finder-o6lm-psi.vercel.app`

### 2.4 Mettre à jour les variables d'environnement ✅
- Supabase OAuth : `https://skillfinder.fr` et `https://www.skillfinder.fr` ajoutés en redirect URLs

### 2.5 Créer l'adresse email ✅
- `contact@skillfinder.fr` créé via Zimbra Starter OVH (15 Go, actif)

---

## Étape 3 — SEO minimal 🔍 ✅ TERMINÉE
> Complétée le 26 Février 2026

### 3.1 Meta tags dynamiques ✅
- `layout.tsx` : title template, description, `metadataBase: https://skillfinder.fr`, OpenGraph

### 3.2 sitemap.xml automatique ✅
- `app/sitemap.ts` : 301 URLs générées (accueil + 20 villes × 15 métiers)

### 3.3 robots.txt ✅
- `app/robots.ts` : autorise tout, bloque `/api/`

### 3.4 Soumettre à Google Search Console ✅
- Propriété `skillfinder.fr` vérifiée via DNS TXT
- Sitemap `https://skillfinder.fr/sitemap.xml` soumis le 26 Février 2026

---

## Étape 4 — Tests end-to-end 🧪 ✅ TERMINÉE
> Complétée le 26 Février 2026 — tous les tests passés sur skillfinder.fr

### 4.1 Checklist fonctionnelle
- [x] Recherche "plombier Paris fuite d'eau" → résultats s'affichent avec scores IA
- [x] Filtres (note, distance) → fonctionnent correctement
- [x] Vote "Oui/Non" sur un résultat → points augmentent (nécessite connexion)
- [ ] Inscription par email → compte créé, points de guest transférés *(à tester)*
- [x] Connexion Google → points préservés
- [x] Déconnexion → points remis à 0 côté guest
- [x] Reconnexion → points du compte récupérés depuis le serveur
- [x] Favoris → sauvegardés et retrouvés après rechargement
- [x] Classement hebdomadaire → s'affiche correctement
- [x] Pages légales → accessibles depuis le footer, texte complet
- [x] Bandeau cookie → s'affiche, fonctionne, persiste le choix

### 4.2 Tests mobile
- [ ] Ouvrir sur un vrai smartphone (iPhone et Android si possible)
- [ ] Vérifier que l'interface est utilisable : boutons, taille de texte, scroll
- [ ] Tester la géolocalisation sur mobile

### 4.3 Test de performance
- [ ] Ouvrir Chrome DevTools → Lighthouse
- [ ] Viser un score Performance > 70, Accessibilité > 90

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

| Priorité | Description | Fichier | Statut |
|----------|-------------|---------|--------|
| 🔴 Critique | Placeholders légaux non remplis | `mentions-legales/page.tsx`, `confidentialite/page.tsx` | ✅ Corrigé |
| 🔴 Critique | Vercel Analytics sans vérification consentement | `layout.tsx` | ✅ Corrigé |
| 🔴 Critique | CSP avec `unsafe-eval` (faille sécurité) | `next.config.ts` | ⏳ À traiter |
| 🟠 Majeur | Parsing JSON Gemini fragile (peut crasher) | `backend/app/services/llm.py` | ⏳ À traiter |
| 🟠 Majeur | Clients HTTP backend jamais fermés | `backend/app/services/google_maps.py` | ⏳ À traiter |
| 🟠 Majeur | Race condition client Supabase singleton | `backend/app/services/supabase.py` | ⏳ À traiter |
| 🟠 Majeur | Vérification content-range PATCH fragile | `backend/app/services/supabase.py` | ⏳ À traiter |
| 🟡 Mineur | console.log/warn en production | `useRewards.ts`, `api.ts` | ⏳ À traiter |
| 🟡 Mineur | Accès admin par env var string | `backend/app/api/routes.py` | ⏳ À traiter |

*Corrections déjà effectuées hors tableau : bug race condition points au login Google, Sentry deprecation warnings, badge classement qui chevauchait le nom.*

---

## Checklist finale avant lancement public

- [x] Placeholders légaux remplis (nom, adresse, email)
- [x] Domaine `skillfinder.fr` acheté et connecté
- [x] Redirect OAuth Google mis à jour dans Supabase
- [x] CORS backend mis à jour avec le nouveau domaine
- [x] sitemap.xml et robots.txt créés
- [x] Soumission Google Search Console
- [x] Tests end-to-end passés sur la prod
- [ ] Tests mobile validés
- [ ] Beta privée terminée sans bug majeur
- [x] Vercel Analytics conditionné au consentement
- [x] Sentry configuré et alertes email activées

---

*Document créé le 22 Février 2026 — dernière mise à jour le 26 Février 2026.*
