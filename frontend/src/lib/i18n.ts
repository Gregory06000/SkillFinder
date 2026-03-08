"use client";

import { createContext, useContext } from "react";

// ── Supported locales ─────────────────────────
export type Locale = "fr" | "en";

const LOCALE_KEY = "sf_locale";

export function loadLocale(): Locale {
  if (typeof window === "undefined") return "fr";
  const saved = localStorage.getItem(LOCALE_KEY);
  if (saved === "en" || saved === "fr") return saved;
  // Auto-detect from browser
  const lang = navigator.language?.slice(0, 2);
  return lang === "en" ? "en" : "fr";
}

export function saveLocale(locale: Locale): void {
  localStorage.setItem(LOCALE_KEY, locale);
}

// ── Translation dictionaries ──────────────────

type Dict = Record<string, string>;

const fr: Dict = {
  // ── Navbar ──
  "nav.leaderboard": "Classement",
  "nav.logout": "Déconnexion",
  "nav.login": "Connexion",
  "nav.tier": "Palier {palier}",
  "nav.pts": "{pts} pts",
  "nav.ariaLabel": "Navigation principale",
  "nav.profileAria": "Profil de {pseudo}",

  // ── Hero ──
  "hero.title1": "Trouvez le meilleur pour",
  "hero.title2": "ce qui compte",
  "hero.title3": "vraiment",
  "hero.subtitle": "Comparez les professionnels près de chez vous selon vos critères précis.",

  // ── SearchBar ──
  "search.service": "Service",
  "search.servicePlaceholder": "Ex: Coiffeur, Dentiste...",
  "search.keyword": "Critère spécifique (optionnel)",
  "search.keywordPlaceholder": "Ex: Balayage, Implant...",
  "search.city": "Ville / Adresse",
  "search.cityPlaceholder": "Ville ou adresse précise...",
  "search.geoTitle": "Utiliser ma position",
  "search.radius": "Rayon",
  "search.submit": "Rechercher",
  "search.geoUnsupported": "La géolocalisation n'est pas supportée par votre navigateur.",
  "search.geoError": "Impossible d'obtenir votre position.",

  // ── History ──
  "history.title": "Recherches récentes",
  "history.clear": "Effacer",

  // ── Favorites ──
  "fav.title": "Mes favoris ({count})",
  "fav.clearAll": "Tout supprimer",
  "fav.remove": "Supprimer des favoris",

  // ── Results ──
  "results.count": "{count} résultat{plural}",
  "results.for": "pour",
  "results.in": "dans",
  "results.filtered": "({count} filtrés)",
  "results.sortMatch": "Meilleur match",
  "results.sortDistance": "Distance",
  "results.sortRating": "Note",
  "results.aiToggle": "IA",
  "results.aiTitle": "Afficher le raisonnement IA",
  "results.list": "Liste",
  "results.map": "Carte",
  "results.showMore": "Voir plus ({count} restants)",
  "results.loading": "Analyse des avis en cours...",
  "results.loadingExplore": "Recherche des meilleurs établissements...",
  "results.noResultsExplore": "Aucun établissement trouvé dans cette zone.",
  "results.mapLoading": "Chargement de la carte...",
  "results.noResults": "Aucun résultat trouvé pour",
  "results.tryOther": "Essayez un autre mot-clé ou une autre catégorie.",
  "results.ariaRegion": "Résultats de recherche",
  "results.ariaList": "Liste des résultats",

  // ── Filters ──
  "filters.label": "Filtres",
  "filters.clear": "Effacer les filtres",

  // ── Compare ──
  "compare.btn": "Comparer ({count}/2)",
  "compare.btnReady": "Comparer ces 2 commerces",
  "compare.title": "Analyse comparative",
  "compare.loading": "Analyse IA en cours...",
  "compare.winner": "Gagnant",
  "compare.strengths": "Points forts",
  "compare.weaknesses": "Points d'attention",
  "compare.notIdentified": "Non identifié",
  "compare.none": "Aucun",
  "compare.price": "Prix",
  "compare.vibe": "Ambiance",
  "compare.speed": "Rapidité",
  "compare.verdict": "Verdict IA",
  "compare.selected": "Sélectionné pour comparaison",
  "compare.select": "Comparer",

  // ── ResultCard ──
  "card.bestMatch": "Meilleur match",
  "card.verified": "Vérifié",
  "card.contested": "Contesté",
  "card.match": "Match",
  "card.reviews": "{count} avis",
  "card.mention": "{count} mention{plural}",
  "card.stillTrue": "Toujours vrai ?",
  "card.thankVote": "Merci pour votre vote !",
  "card.yes": "Oui",
  "card.no": "Non",
  "card.viewProfile": "Voir le profil",
  "card.addFav": "Ajouter aux favoris",
  "card.removeFav": "Retirer des favoris",
  "card.share": "Partager",
  "card.timeMinutes": "il y a quelques minutes",
  "card.timeHours": "il y a {count}h",
  "card.timeDays": "il y a {count}j",
  "card.timeMonths": "il y a {count} mois",

  // ── Comments ──
  "comments.toggle": "Avis SkillFinder ({count})",
  "comments.placeholder": "Votre expérience avec « {keyword} » dans cet établissement...",
  "comments.submit": "Publier",
  "comments.sending": "Envoi...",
  "comments.loading": "Chargement...",
  "comments.empty": "Aucun avis SkillFinder pour le moment. Soyez le premier !",
  "comments.loginPrompt": "Connectez-vous pour laisser un avis SkillFinder.",
  "comments.authError": "Erreur d'authentification. Reconnectez-vous.",
  "comments.submitError": "Erreur lors de l'envoi. Réessayez.",
  "comments.justNow": "à l'instant",
  "comments.minutesAgo": "il y a {count} min",
  "comments.hoursAgo": "il y a {count}h",
  "comments.daysAgo": "il y a {count}j",
  "comments.hasMore": "Affichage des {limit} avis les plus récents.",

  // ── UserStats ──
  "stats.tier": "Palier {palier}",
  "stats.maxLevel": "Niveau maximum atteint",
  "stats.nextTier": "Prochain palier : niveau {threshold}",
  "stats.level": "Niveau {level}",
  "stats.weeklyPts": "+ {pts} pts cette semaine",

  // ── ProfilePanel ──
  "profile.photoTooBig": "Image trop lourde (max 2 Mo)",
  "profile.removePhoto": "Supprimer la photo",
  "profile.colorLabel": "Couleur du profil",
  "profile.tierProgress": "Progression des paliers",
  "profile.levelRange": "Niv. {min}–{max}",
  "profile.weekStats": "Cette semaine : +{pts} pts",

  // ── TierUp Modal ──
  "tierUp.title": "Nouveau palier !",
  "tierUp.tierLevel": "Palier {palier} · Niveau {level}",
  "tierUp.maxReached": "Niveau maximum atteint ! Vous êtes une légende.",
  "tierUp.nextAt": "Prochain palier à {threshold} points",
  "tierUp.continue": "Continuer",

  // ── Conversion / Login Modal ──
  "conv.congrats": "Félicitations !",
  "conv.youAre": "Vous êtes un {rank}",
  "conv.loginRequired": "Connexion requise",
  "conv.loginToVote": "Connectez-vous pour voter et gagner des points",
  "conv.welcome": "Bienvenue !",
  "conv.loginToTrack": "Connectez-vous pour suivre votre progression",
  "conv.milestoneDesc": "Créez votre compte pour sauvegarder votre progression et apparaître dans le classement.",
  "conv.voteDesc": "Pour voter et contribuer à la communauté, vous devez être connecté.",
  "conv.loginDesc": "Sauvegardez votre progression et apparaissez dans le classement de votre ville.",
  "conv.signupDesc": "Créez votre compte avec votre email.",
  "conv.loginFormDesc": "Connectez-vous à votre compte.",
  "conv.google": "Continuer avec Google",
  "conv.emailSignup": "S'inscrire avec email",
  "conv.hasAccount": "Déjà un compte ? Se connecter",
  "conv.email": "Email",
  "conv.passwordSignup": "Mot de passe (6+ caractères)",
  "conv.password": "Mot de passe",
  "conv.submitting": "Chargement...",
  "conv.createAccount": "Créer mon compte",
  "conv.signIn": "Se connecter",
  "conv.back": "Retour",
  "conv.later": "Peut-être plus tard",

  // ── Leaderboard ──
  "lb.weekTitle": "Classement de la semaine",
  "lb.weekSubtitle": "Découvrez les meilleurs contributeurs de votre ville",
  "lb.searchPlaceholder": "Rechercher une ville...",
  "lb.search": "Rechercher",
  "lb.loading": "Chargement du classement...",
  "lb.noCitySelected": "Recherchez une ville pour voir son classement",
  "lb.noContributors": "Aucun contributeur cette semaine à",
  "lb.beFirst": "Soyez le premier à voter !",
  "lb.contributors": "{count} contributeur{plural}",
  "lb.thisWeek": "Cette semaine",
  "lb.player": "Joueur",
  "lb.week": "Semaine",
  "lb.total": "Total",
  "lb.you": "Vous",
  "lb.level": "Niveau",
  "lb.tierLabel": "Palier",
  "lb.titleLabel": "Titre",
  "lb.totalPoints": "Points totaux",
  "lb.localTitle": "Classement {city}",
  "lb.noContribShort": "Aucun contributeur cette semaine.",

  // ── Tier titles ──
  "tier.1": "Apprenti Dénicheur",
  "tier.2": "Éclaireur Urbain",
  "tier.3": "Guide Certifié",
  "tier.4": "Expert Local",
  "tier.5": "Maître de la Ville",
  "tier.6": "Légende Vivante",
  "tier.7": "Gardien du Temple",
  "tier.8": "Oracle des Quartiers",
  "tier.9": "Architecte du Savoir",
  "tier.10": "Divinité Suprême",

  // ── Cookie banner ──
  "cookie.label": "Bandeau cookies",
  "cookie.message": "Ce site utilise le stockage local de votre navigateur pour la gamification et Google Maps pour la cartographie.",
  "cookie.policy": "Politique de confidentialité",
  "cookie.accept": "J'accepte",

  // ── Footer ──
  "footer.privacy": "Confidentialité",
  "footer.legal": "Mentions légales",
  "footer.rights": "Tous droits réservés",
};

const en: Dict = {
  // ── Navbar ──
  "nav.leaderboard": "Leaderboard",
  "nav.logout": "Logout",
  "nav.login": "Login",
  "nav.tier": "Tier {palier}",
  "nav.pts": "{pts} pts",
  "nav.ariaLabel": "Main navigation",
  "nav.profileAria": "{pseudo}'s profile",

  // ── Hero ──
  "hero.title1": "Find the best for",
  "hero.title2": "what truly",
  "hero.title3": "matters",
  "hero.subtitle": "Compare professionals near you based on your specific criteria.",

  // ── SearchBar ──
  "search.service": "Service",
  "search.servicePlaceholder": "e.g. Hairdresser, Dentist...",
  "search.keyword": "Specific criteria (optional)",
  "search.keywordPlaceholder": "e.g. Highlights, Implant...",
  "search.city": "City / Address",
  "search.cityPlaceholder": "City or precise address...",
  "search.geoTitle": "Use my location",
  "search.radius": "Radius",
  "search.submit": "Search",
  "search.geoUnsupported": "Geolocation is not supported by your browser.",
  "search.geoError": "Unable to get your position.",

  // ── History ──
  "history.title": "Recent searches",
  "history.clear": "Clear",

  // ── Favorites ──
  "fav.title": "My favorites ({count})",
  "fav.clearAll": "Remove all",
  "fav.remove": "Remove from favorites",

  // ── Results ──
  "results.count": "{count} result{plural}",
  "results.for": "for",
  "results.in": "in",
  "results.filtered": "({count} filtered)",
  "results.sortMatch": "Best match",
  "results.sortDistance": "Distance",
  "results.sortRating": "Rating",
  "results.aiToggle": "AI",
  "results.aiTitle": "Show AI reasoning",
  "results.list": "List",
  "results.map": "Map",
  "results.showMore": "Show more ({count} remaining)",
  "results.loading": "Analyzing reviews...",
  "results.loadingExplore": "Finding the best places...",
  "results.noResultsExplore": "No places found in this area.",
  "results.mapLoading": "Loading map...",
  "results.noResults": "No results found for",
  "results.tryOther": "Try a different keyword or category.",
  "results.ariaRegion": "Search results",
  "results.ariaList": "Results list",

  // ── Filters ──
  "filters.label": "Filters",
  "filters.clear": "Clear filters",

  // ── Compare ──
  "compare.btn": "Compare ({count}/2)",
  "compare.btnReady": "Compare these 2 businesses",
  "compare.title": "Comparative analysis",
  "compare.loading": "AI analysis in progress...",
  "compare.winner": "Winner",
  "compare.strengths": "Strengths",
  "compare.weaknesses": "Weaknesses",
  "compare.notIdentified": "Not identified",
  "compare.none": "None",
  "compare.price": "Price",
  "compare.vibe": "Vibe",
  "compare.speed": "Speed",
  "compare.verdict": "AI Verdict",
  "compare.selected": "Selected for comparison",
  "compare.select": "Compare",

  // ── ResultCard ──
  "card.bestMatch": "Best match",
  "card.verified": "Verified",
  "card.contested": "Contested",
  "card.match": "Match",
  "card.reviews": "{count} reviews",
  "card.mention": "{count} mention{plural}",
  "card.stillTrue": "Still accurate?",
  "card.thankVote": "Thanks for your vote!",
  "card.yes": "Yes",
  "card.no": "No",
  "card.viewProfile": "View profile",
  "card.addFav": "Add to favorites",
  "card.removeFav": "Remove from favorites",
  "card.share": "Share",
  "card.timeMinutes": "a few minutes ago",
  "card.timeHours": "{count}h ago",
  "card.timeDays": "{count}d ago",
  "card.timeMonths": "{count} months ago",

  // ── Comments ──
  "comments.toggle": "SkillFinder reviews ({count})",
  "comments.placeholder": "Your experience with \"{keyword}\" at this place...",
  "comments.submit": "Post",
  "comments.sending": "Sending...",
  "comments.loading": "Loading...",
  "comments.empty": "No SkillFinder reviews yet. Be the first!",
  "comments.loginPrompt": "Log in to leave a SkillFinder review.",
  "comments.authError": "Authentication error. Please log in again.",
  "comments.submitError": "Error while posting. Please try again.",
  "comments.justNow": "just now",
  "comments.minutesAgo": "{count} min ago",
  "comments.hoursAgo": "{count}h ago",
  "comments.daysAgo": "{count}d ago",
  "comments.hasMore": "Showing the {limit} most recent reviews.",

  // ── UserStats ──
  "stats.tier": "Tier {palier}",
  "stats.maxLevel": "Max level reached",
  "stats.nextTier": "Next tier: level {threshold}",
  "stats.level": "Level {level}",
  "stats.weeklyPts": "+ {pts} pts this week",

  // ── ProfilePanel ──
  "profile.photoTooBig": "Image too large (max 2 MB)",
  "profile.removePhoto": "Remove photo",
  "profile.colorLabel": "Profile color",
  "profile.tierProgress": "Tier progression",
  "profile.levelRange": "Lvl. {min}–{max}",
  "profile.weekStats": "This week: +{pts} pts",

  // ── TierUp Modal ──
  "tierUp.title": "New tier!",
  "tierUp.tierLevel": "Tier {palier} · Level {level}",
  "tierUp.maxReached": "Max level reached! You are a legend.",
  "tierUp.nextAt": "Next tier at {threshold} points",
  "tierUp.continue": "Continue",

  // ── Conversion / Login Modal ──
  "conv.congrats": "Congratulations!",
  "conv.youAre": "You are a {rank}",
  "conv.loginRequired": "Login required",
  "conv.loginToVote": "Sign in to vote and earn points",
  "conv.welcome": "Welcome!",
  "conv.loginToTrack": "Sign in to track your progress",
  "conv.milestoneDesc": "Create your account to save your progress and appear on the leaderboard.",
  "conv.voteDesc": "To vote and contribute to the community, you must be signed in.",
  "conv.loginDesc": "Save your progress and appear on your city's leaderboard.",
  "conv.signupDesc": "Create your account with your email.",
  "conv.loginFormDesc": "Sign in to your account.",
  "conv.google": "Continue with Google",
  "conv.emailSignup": "Sign up with email",
  "conv.hasAccount": "Already have an account? Sign in",
  "conv.email": "Email",
  "conv.passwordSignup": "Password (6+ characters)",
  "conv.password": "Password",
  "conv.submitting": "Loading...",
  "conv.createAccount": "Create my account",
  "conv.signIn": "Sign in",
  "conv.back": "Back",
  "conv.later": "Maybe later",

  // ── Leaderboard ──
  "lb.weekTitle": "Weekly leaderboard",
  "lb.weekSubtitle": "Discover the top contributors in your city",
  "lb.searchPlaceholder": "Search a city...",
  "lb.search": "Search",
  "lb.loading": "Loading leaderboard...",
  "lb.noCitySelected": "Search a city to see its leaderboard",
  "lb.noContributors": "No contributors this week in",
  "lb.beFirst": "Be the first to vote!",
  "lb.contributors": "{count} contributor{plural}",
  "lb.thisWeek": "This week",
  "lb.player": "Player",
  "lb.week": "Week",
  "lb.total": "Total",
  "lb.you": "You",
  "lb.level": "Level",
  "lb.tierLabel": "Tier",
  "lb.titleLabel": "Title",
  "lb.totalPoints": "Total points",
  "lb.localTitle": "Leaderboard {city}",
  "lb.noContribShort": "No contributors this week.",

  // ── Tier titles ──
  "tier.1": "Apprentice Scout",
  "tier.2": "Urban Explorer",
  "tier.3": "Certified Guide",
  "tier.4": "Local Expert",
  "tier.5": "City Master",
  "tier.6": "Living Legend",
  "tier.7": "Temple Guardian",
  "tier.8": "District Oracle",
  "tier.9": "Knowledge Architect",
  "tier.10": "Supreme Deity",

  // ── Cookie banner ──
  "cookie.label": "Cookie notice",
  "cookie.message": "This site uses your browser's local storage for gamification and Google Maps for mapping.",
  "cookie.policy": "Privacy policy",
  "cookie.accept": "Accept",

  // ── Footer ──
  "footer.privacy": "Privacy",
  "footer.legal": "Legal notice",
  "footer.rights": "All rights reserved",
};

const dictionaries: Record<Locale, Dict> = { fr, en };

// ── Translation function ─────────────────────

export function t(locale: Locale, key: string, vars?: Record<string, string | number>): string {
  let str = dictionaries[locale]?.[key] ?? dictionaries.fr[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replaceAll(`{${k}}`, String(v));
    }
  }
  return str;
}

// ── React Context ─────────────────────────────

export interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

export const I18nContext = createContext<I18nContextValue>({
  locale: "fr",
  setLocale: () => {},
  t: (key) => key,
});

export function useT() {
  return useContext(I18nContext);
}
