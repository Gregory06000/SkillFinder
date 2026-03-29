# SkillFinder — Prochaines Etapes

> Ou en est-on : produit complet, deploye sur skillfinder.fr, toutes les features prevues sont livrees.
> Ce qui manque : des utilisateurs reels et des donnees pour prendre des decisions.
> Derniere mise a jour : 29 Mars 2026

---

## Situation actuelle

### Ce qui est fait (et qui fonctionne)
- Recherche IA avec scoring semantique (Gemini)
- Carte Google Maps interactive
- Systeme de vote, favoris, commentaires communautaires
- Gamification complete (points, tiers, badges, leaderboard)
- Mascotte Findy personnalisable (11 categories, 150+ items, animations idle)
- Couleur de peau (9 tons), lunettes (11 styles), pilosite (10 styles)
- Mini mascottes dans le leaderboard (visibilite sociale)
- Systeme d'amis + partage de favoris + badge notification demandes
- Suggestions intelligentes
- Mode sombre, partage par lien, historique
- SEO de base (sitemap, robots.txt, Search Console)
- 300 landing pages SEO `/ville/[city]/[service]` avec liens internes
- Domaine skillfinder.fr + HTTPS + redirect www → non-www (308)
- Notifications email (infrastructure prete)
- 7 langues (FR, EN, DE, ES, IT, NL, PT)
- Analytics Vercel (7 evenements : Search, Vote, Compare, Signup, Login, Favorite, MascotCustomize)
- Onboarding nouveaux visiteurs (quick-start chips + popup PWA install)

### Ce qui manque
- **Des utilisateurs** — sans trafic, rien d'autre ne compte
- **La beta elargie** — 5 retours positifs, a elargir a 20-30 personnes

---

## Plan d'action — par ordre strict

### Etape 1 : Analytics (1-2h) ✅ FAIT
- [x] Vercel Analytics active et fonctionnel
- [x] 7 evenements cles dans le code (Search, Vote, Compare, Signup, Login, Favorite, MascotCustomize)
- [x] Dashboard Vercel Analytics disponible

**Resultat** : 15 visiteurs / 87 pages vues / 33% bounce rate sur les 7 derniers jours.

---

### Etape 2 : Beta privee (1 semaine) — EN COURS
- [x] Inviter 5 personnes — retours positifs
- [ ] Elargir a 20-30 personnes (collegues, connaissances, groupes Discord/Telegram)
- [ ] Leur donner une mission precise : "Cherche un coiffeur a [ta ville] sur skillfinder.fr"
- [ ] Collecter les retours (formulaire Google Forms ou simple message)
- [ ] Corriger les bugs bloquants signales
- [ ] Observer les analytics : ou les gens abandonnent ?

**Resultat attendu** : bugs critiques corriges, premiers retours reels, confiance pour communiquer.

---

### Etape 3 : SEO — Landing pages par ville/service ✅ FAIT
- [x] 300 pages statiques `/ville/[city]/[service]` (20 villes x 15 services)
- [x] Contenu unique par page : titre, meta description, JSON-LD (schema.org)
- [x] Liens internes depuis la homepage (50 liens visibles + 300 en section depliable)
- [x] URL canonique sur la homepage (evite les doublons query params)
- [x] Redirect www → non-www configure (308 permanent)
- [x] Sitemap soumis a Google Search Console (301 URLs)
- [x] Indexation demandee manuellement pour 10 pages strategiques

**Etat indexation (24 mars 2026)** : 34 pages indexees, 285 en file d'attente (normal pour un site neuf).

---

### Etape 4 : Onboarding premier utilisateur ✅ FAIT
- [x] Quick-start chips pour les nouveaux visiteurs (5 recherches rapides)
- [x] Popup d'installation PWA sur mobile (beforeinstallprompt)
- [x] Traductions dans les 7 langues

---

### Etape 5 : Lancement public (quand la beta elargie est faite)
**Pourquoi** : communiquer avant d'etre pret = gaspiller son unique chance de premiere impression.

- [ ] Preparer une video demo courte (30-60 sec) montrant une recherche de A a Z
- [ ] Poster sur : LinkedIn, Twitter/X, Reddit (r/france, r/entrepreneur), IndieHackers
- [ ] Soumettre sur ProductHunt (preparer le lancement a l'avance)
- [ ] Contacter 5-10 blogueurs/journalistes specialises services locaux ou tech francaise
- [ ] Poster dans les groupes Facebook/Discord lies aux services locaux

**Resultat** : premiers vrais utilisateurs organiques.

---

### Etape 6 : Moderation & qualite (en parallele du lancement)
**Pourquoi** : les commentaires communautaires sont la feature la plus differenciante mais aussi la plus risquee.

- [ ] Systeme de signalement de commentaires (bouton "Signaler")
- [ ] Dashboard admin pour moderer les commentaires signales
- [ ] Filtrage basique des mots inappropries
- [ ] Politique d'utilisation visible

**Resultat** : confiance utilisateur, pas de contenu toxique.

---

## Apres le lancement — decisions basees sur les donnees

Une fois le trafic en place, les metriques te diront quoi faire :

| Si tu observes... | Alors fais... |
|---|---|
| Beaucoup de recherches mais peu de votes | Simplifier le flow de vote, le rendre plus visible |
| Les gens reviennent mais ne s'inscrivent pas | Ameliorer les incentives a l'inscription |
| Fort trafic sur certaines villes | Doubler le SEO sur ces villes, contacter les pros locaux |
| Les gens cherchent mais ne trouvent pas | Ameliorer la couverture des services, elargir les synonymes |
| Plus de 500 utilisateurs actifs/mois | Passer a la Phase 1 de ROADMAP_BUSINESS.md (contacter les pros) |

---

## Ce qu'il ne faut PAS faire maintenant

- **Ajouter des features** — le produit est complet, chaque feature ajoutee sans utilisateurs est du temps perdu
- **Implementer Stripe / les paiements** — les items premium sont visibles mais 0 utilisateur = 0 revenu. A faire quand 500+ utilisateurs actifs
- **Developper l'app mobile native** — la PWA suffit largement pour les 10 000 premiers utilisateurs
- **Refactorer le code** — il fonctionne, ne le touche pas tant qu'il n'y a pas de probleme reel
- **Ajouter d'autres langues** — 7 langues pour 0 utilisateur c'est deja beaucoup

---

## Documents existants

| Document | Contenu | Statut |
|---|---|---|
| `ROADMAP_BUSINESS.md` | Modeles de revenus et strategie de monetisation | A activer apres 500 utilisateurs actifs/mois |

---

*Cree le 29 Mars 2026. A relire apres chaque etape completee.*
