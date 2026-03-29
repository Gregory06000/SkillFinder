# SkillFinder — Prochaines Etapes

> Ou en est-on : produit complet, deploye sur skillfinder.fr, toutes les features prevues sont livrees.
> Ce qui manque : des utilisateurs reels et des donnees pour prendre des decisions.
> Date : 29 Mars 2026

---

## Situation actuelle

### Ce qui est fait (et qui fonctionne)
- Recherche IA avec scoring semantique (Gemini)
- Carte Google Maps interactive
- Systeme de vote, favoris, commentaires communautaires
- Gamification complete (points, tiers, badges, leaderboard)
- Mascotte Findy personnalisable (11 categories, 150+ items, animations)
- Systeme d'amis + partage de favoris
- Suggestions intelligentes
- Mode sombre, partage par lien, historique
- SEO de base (sitemap, robots.txt, Search Console)
- Domaine skillfinder.fr + HTTPS
- Notifications email (infrastructure prete)
- 7 langues (FR, EN, DE, ES, IT, NL, PT)

### Ce qui manque
- **Des utilisateurs** — sans trafic, rien d'autre ne compte
- **Des metriques** — on ne sait pas combien de gens utilisent l'app ni comment
- **La beta privee** — jamais faite (etape 5 de ROADMAP_LANCEMENT.md)

---

## Plan d'action — par ordre strict

### Etape 1 : Analytics (1-2h)
**Pourquoi en premier** : impossible de prendre une decision sans donnees.

- [ ] Verifier que Vercel Analytics fonctionne (il est conditionne au cookie consent)
- [ ] Ajouter des evenements cles dans le code :
  - Recherche lancee (service + ville)
  - Vote effectue
  - Favori ajoute
  - Inscription / connexion
  - Personnalisation mascotte
- [ ] Creer un dashboard simple (Vercel Analytics ou Plausible si besoin de plus)
- [ ] Documenter les metriques suivies

**Resultat** : tu sais combien de gens font quoi, chaque jour.

---

### Etape 2 : Beta privee (1 semaine)
**Pourquoi** : valider que le produit fonctionne pour de vrais utilisateurs avant de communiquer.

- [ ] Inviter 20-50 personnes (famille, amis, collegues, communautes Discord/Telegram)
- [ ] Leur donner une mission precise : "Cherche un coiffeur a Nice et dis-moi ce que tu en penses"
- [ ] Collecter les retours (formulaire Google Forms ou simple message)
- [ ] Corriger les bugs bloquants signales
- [ ] Observer les analytics : ou les gens abandonnent ?

**Resultat** : bugs critiques corriges, premiers retours reels, confiance pour communiquer.

---

### Etape 3 : SEO — Landing pages par ville/service (1-2 semaines)
**Pourquoi** : c'est le canal d'acquisition #1 pour un outil de recherche locale. Gratuit et durable.

- [ ] Creer des pages statiques `/[service]/[ville]` (ex: `/coiffeur/lyon`, `/plombier/paris`)
- [ ] 20 villes x 15 services = 300 pages indexables
- [ ] Contenu unique par page : titre, meta description, FAQ structuree (schema.org)
- [ ] Lien vers la recherche pre-remplie
- [ ] Soumettre le nouveau sitemap a Google Search Console
- [ ] Suivre l'indexation et les positions dans Search Console

**Resultat** : SkillFinder apparait dans Google quand quelqu'un cherche "meilleur coiffeur Lyon".

---

### Etape 4 : Onboarding premier utilisateur (2-3 jours)
**Pourquoi** : un visiteur qui ne comprend pas en 5 secondes part et ne revient jamais.

- [ ] Flow d'accueil pour les nouveaux : "Bienvenue ! Que cherchez-vous ?" → recherche guidee
- [ ] Popup d'installation PWA sur mobile ("Ajouter a l'ecran d'accueil")
- [ ] CTA clair sur la homepage pour les visiteurs non-connectes
- [ ] Tester avec 3-5 personnes qui ne connaissent pas l'app et observer

**Resultat** : meilleur taux de conversion visiteur → utilisateur actif.

---

### Etape 5 : Lancement public (quand les etapes 1-4 sont faites)
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
- **Developper l'app mobile native** — la PWA suffit largement pour les 10 000 premiers utilisateurs
- **Monétiser** — zero utilisateur = zero revenu. Focus acquisition d'abord
- **Refactorer le code** — il fonctionne, ne le touche pas tant qu'il n'y a pas de probleme reel
- **Ajouter d'autres langues** — 7 langues pour 0 utilisateur c'est deja beaucoup

---

## Documents existants

| Document | Contenu | Statut |
|---|---|---|
| `ROADMAP_LANCEMENT.md` | Etapes techniques pre-lancement | ✅ Etapes 1-4 terminees, etape 5 (beta) a faire |
| `ROADMAP_BUSINESS.md` | Modeles de revenus et strategie de monetisation | 📆 A activer apres 500 utilisateurs actifs/mois |
| `IDEES_FUTURES.md` | Idees de features | ✅ Tout livre — peut etre supprime |

---

*Cree le 29 Mars 2026. A relire apres chaque etape completee.*
