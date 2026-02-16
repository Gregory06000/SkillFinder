import type { Metadata } from "next";
import Link from "next/link";

// ── SEO data for common services ──────────────────
const SERVICE_META: Record<string, { fr: string; en: string; emoji: string; description: string }> = {
  coiffeur:     { fr: "Coiffeur", en: "Hairdresser", emoji: "💇", description: "salons de coiffure" },
  dentiste:     { fr: "Dentiste", en: "Dentist", emoji: "🦷", description: "cabinets dentaires" },
  plombier:     { fr: "Plombier", en: "Plumber", emoji: "🔧", description: "plombiers" },
  electricien:  { fr: "Électricien", en: "Electrician", emoji: "⚡", description: "électriciens" },
  restaurant:   { fr: "Restaurant", en: "Restaurant", emoji: "🍽️", description: "restaurants" },
  boulangerie:  { fr: "Boulangerie", en: "Bakery", emoji: "🥖", description: "boulangeries" },
  garagiste:    { fr: "Garagiste", en: "Mechanic", emoji: "🚗", description: "garages automobiles" },
  veterinaire:  { fr: "Vétérinaire", en: "Veterinarian", emoji: "🐾", description: "vétérinaires" },
  opticien:     { fr: "Opticien", en: "Optician", emoji: "👓", description: "opticiens" },
  pharmacie:    { fr: "Pharmacie", en: "Pharmacy", emoji: "💊", description: "pharmacies" },
  avocat:       { fr: "Avocat", en: "Lawyer", emoji: "⚖️", description: "avocats" },
  osteopathe:   { fr: "Ostéopathe", en: "Osteopath", emoji: "🦴", description: "ostéopathes" },
  kinesitherapeute: { fr: "Kinésithérapeute", en: "Physiotherapist", emoji: "💪", description: "kinésithérapeutes" },
  serrurier:    { fr: "Serrurier", en: "Locksmith", emoji: "🔑", description: "serruriers" },
  peintre:      { fr: "Peintre", en: "Painter", emoji: "🎨", description: "peintres en bâtiment" },
};

function formatCityName(slug: string): string {
  return decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getServiceLabel(slug: string): string {
  return SERVICE_META[slug]?.fr ?? formatCityName(slug);
}

// ── Generate dynamic metadata ─────────────────────
interface PageParams {
  params: Promise<{ city: string; service: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { city, service } = await params;
  const cityName = formatCityName(city);
  const serviceLabel = getServiceLabel(service);
  const meta = SERVICE_META[service];

  const title = `Meilleur ${serviceLabel} à ${cityName} — SkillFinder`;
  const description = meta
    ? `Trouvez et comparez les meilleurs ${meta.description} à ${cityName}. Classement basé sur l'analyse IA des avis clients réels.`
    : `Trouvez et comparez les meilleurs ${serviceLabel.toLowerCase()} à ${cityName}. Classement basé sur l'analyse IA des avis clients.`;

  const url = `https://skillfinder.fr/ville/${city}/${service}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "SkillFinder",
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ── JSON-LD Structured Data ───────────────────────
function buildJsonLd(city: string, service: string) {
  const cityName = formatCityName(city);
  const serviceLabel = getServiceLabel(service);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Meilleur ${serviceLabel} à ${cityName}`,
    description: `Comparez les ${serviceLabel.toLowerCase()} à ${cityName} grâce à l'IA.`,
    url: `https://skillfinder.fr/ville/${city}/${service}`,
    isPartOf: {
      "@type": "WebSite",
      name: "SkillFinder",
      url: "https://skillfinder.fr",
    },
    about: {
      "@type": "Service",
      name: serviceLabel,
      areaServed: {
        "@type": "City",
        name: cityName,
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://skillfinder.fr" },
        { "@type": "ListItem", position: 2, name: cityName, item: `https://skillfinder.fr/ville/${city}` },
        { "@type": "ListItem", position: 3, name: serviceLabel },
      ],
    },
  };
}

// ── Popular criteria for each service ─────────────
const POPULAR_CRITERIA: Record<string, string[]> = {
  coiffeur:     ["Balayage", "Coupe homme", "Coloration", "Mèches", "Lissage brésilien"],
  dentiste:     ["Implant", "Blanchiment", "Orthodontie", "Détartrage", "Couronne"],
  plombier:     ["Urgence", "Chauffe-eau", "Débouchage", "Fuite", "Installation"],
  electricien:  ["Mise aux normes", "Tableau électrique", "Dépannage", "Installation"],
  restaurant:   ["Brunch", "Terrasse", "Menu végétarien", "Pizza", "Sushi"],
  boulangerie:  ["Pain au levain", "Croissant", "Pain sans gluten", "Viennoiserie"],
  garagiste:    ["Révision", "Freins", "Pneus", "Climatisation", "Diagnostic"],
  veterinaire:  ["Vaccination", "Stérilisation", "Urgence", "NAC", "Détartrage"],
  opticien:     ["Lentilles", "Verres progressifs", "Lunettes de soleil", "Enfant"],
  pharmacie:    ["Garde", "Homéopathie", "Dermocosmetique", "Parapharmacie"],
  avocat:       ["Droit du travail", "Divorce", "Immobilier", "Pénal", "Droit des affaires"],
  osteopathe:   ["Dos", "Sport", "Bébé", "Femme enceinte", "Migraine"],
  kinesitherapeute: ["Sport", "Rééducation", "Massage", "Posture", "Post-opératoire"],
  serrurier:    ["Urgence", "Blindage", "Double de clé", "Serrure connectée"],
  peintre:      ["Intérieur", "Extérieur", "Ravalement", "Décoratif"],
};

// ── Page Component (Server Component) ─────────────
export default async function VilleServicePage({ params }: PageParams) {
  const { city, service } = await params;
  const cityName = formatCityName(city);
  const serviceLabel = getServiceLabel(service);
  const meta = SERVICE_META[service];
  const criteria = POPULAR_CRITERIA[service] || [];

  const searchUrl = `/?service=${encodeURIComponent(serviceLabel)}&city=${encodeURIComponent(cityName)}`;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(city, service)) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#FBF5E6] via-white to-white">
        {/* Header */}
        <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #C45D3E, #E8805F)" }}
              >
                SF
              </div>
              <span className="font-bold text-lg text-gray-900 group-hover:text-[#C45D3E] transition-colors">
                SkillFinder
              </span>
            </Link>
            <Link
              href={searchUrl}
              className="px-4 py-2 bg-[#C45D3E] text-white rounded-lg text-sm font-medium
                         hover:bg-[#E8805F] transition-colors"
            >
              Rechercher
            </Link>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav className="max-w-5xl mx-auto px-4 pt-6 pb-2">
          <ol className="flex items-center gap-1.5 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-[#C45D3E] transition-colors">Accueil</Link>
            </li>
            <li>/</li>
            <li className="text-gray-500">{cityName}</li>
            <li>/</li>
            <li className="text-gray-700 font-medium">{serviceLabel}</li>
          </ol>
        </nav>

        {/* Hero section */}
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            {meta && <div className="text-5xl mb-4">{meta.emoji}</div>}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Meilleur {serviceLabel} à {cityName}
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Comparez les {meta?.description ?? serviceLabel.toLowerCase()} à {cityName} grâce
              à notre analyse IA des avis clients réels. Trouvez le professionnel qui correspond
              exactement à vos besoins.
            </p>
          </div>

          {/* CTA Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Lancez votre recherche personnalisée
            </h2>
            <p className="text-gray-500 mb-6">
              Précisez un critère (ex : technique, spécialité, urgence) pour obtenir un classement sur mesure.
            </p>
            <Link
              href={searchUrl}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C45D3E] text-white rounded-xl
                         text-base font-semibold hover:bg-[#E8805F] transition-colors shadow-md"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Trouver un {serviceLabel.toLowerCase()} à {cityName}
            </Link>
          </div>

          {/* Popular criteria */}
          {criteria.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recherches populaires : {serviceLabel} à {cityName}
              </h2>
              <div className="flex flex-wrap gap-2">
                {criteria.map((keyword) => (
                  <Link
                    key={keyword}
                    href={`/?service=${encodeURIComponent(serviceLabel)}&keyword=${encodeURIComponent(keyword)}&city=${encodeURIComponent(cityName)}`}
                    className="px-4 py-2 bg-white rounded-full border border-gray-200
                               text-sm text-gray-700 hover:border-[#C45D3E] hover:text-[#C45D3E]
                               transition-colors shadow-sm"
                  >
                    {serviceLabel} · {keyword}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* How it works */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Comment SkillFinder trouve le meilleur {serviceLabel.toLowerCase()} ?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🔍",
                  title: "Analyse des avis",
                  desc: `Notre IA lit et analyse les avis clients de tous les ${meta?.description ?? serviceLabel.toLowerCase()} à ${cityName} pour identifier les points forts de chacun.`,
                },
                {
                  icon: "🎯",
                  title: "Classement sur mesure",
                  desc: "Précisez votre critère (technique, spécialité, style) et obtenez un classement adapté à votre besoin exact.",
                },
                {
                  icon: "✅",
                  title: "Vérification communautaire",
                  desc: "La communauté vote pour confirmer la pertinence des résultats. Plus un résultat est vérifié, plus il est fiable.",
                },
              ].map((step) => (
                <div key={step.title} className="bg-white rounded-xl border border-gray-100 p-6">
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related services */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Autres services à {cityName}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Object.entries(SERVICE_META)
                .filter(([slug]) => slug !== service)
                .slice(0, 8)
                .map(([slug, info]) => (
                  <Link
                    key={slug}
                    href={`/ville/${city}/${slug}`}
                    className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-gray-100
                               hover:border-[#C45D3E] transition-colors text-sm text-gray-700"
                  >
                    <span>{info.emoji}</span>
                    <span>{info.fr}</span>
                  </Link>
                ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-gray-400">
            <p>
              SkillFinder — Trouvez le meilleur pour ce qui compte vraiment.
            </p>
            <p className="mt-1">
              {serviceLabel} à {cityName} · Classement basé sur l&apos;analyse IA des avis clients.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
