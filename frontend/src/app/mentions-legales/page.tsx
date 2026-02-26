import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de SkillFinder.",
  robots: { index: false },
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-sm text-[#C45D3E] hover:underline mb-8 inline-block"
        >
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-10">
          Mentions légales
        </h1>

        <div className="space-y-8 text-[#1A1A1A]">

          <section>
            <h2 className="text-xl font-semibold mb-3">Éditeur du site</h2>
            <div className="text-gray-700 leading-relaxed space-y-1">
              <p><strong>Nom / Raison sociale :</strong> Gregory Semeria</p>
              <p><strong>Adresse :</strong> 1 Rue Roger Martin du Gard, 06000 Nice</p>
              <p><strong>E-mail :</strong>{" "}
                <a href="mailto:contact@skillfinder.fr" className="text-[#C45D3E] hover:underline">
                  contact@skillfinder.fr
                </a>
              </p>
              <p><strong>Directeur de la publication :</strong> Gregory Semeria</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Hébergement</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <div>
                <p className="font-medium">Frontend — Vercel Inc.</p>
                <p>440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
                <p>
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#C45D3E] hover:underline">
                    vercel.com
                  </a>
                </p>
              </div>
              <div>
                <p className="font-medium">Backend — Render Services, Inc.</p>
                <p>525 Brannan Street, Suite 300, San Francisco, CA 94107, USA</p>
                <p>
                  <a href="https://render.com" target="_blank" rel="noopener noreferrer" className="text-[#C45D3E] hover:underline">
                    render.com
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Propriété intellectuelle</h2>
            <p className="text-gray-700 leading-relaxed">
              L&apos;ensemble des éléments constituant le site SkillFinder (textes, graphismes, logiciels, marques, logos)
              est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation,
              modification ou exploitation, totale ou partielle, sans autorisation préalable écrite de l&apos;éditeur,
              est strictement interdite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Données tierces</h2>
            <p className="text-gray-700 leading-relaxed">
              Les informations sur les établissements (noms, adresses, avis, photos) proviennent de{" "}
              <strong>Google Places API</strong> et sont la propriété de leurs auteurs respectifs.
              SkillFinder n&apos;est pas responsable du contenu des avis affichés, qui sont des données publiques
              issues de Google Maps.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Limitation de responsabilité</h2>
            <p className="text-gray-700 leading-relaxed">
              SkillFinder fournit un outil d&apos;aide à la décision basé sur l&apos;analyse automatique des avis publics.
              Les scores et classements ne constituent pas des recommandations professionnelles certifiées.
              L&apos;éditeur décline toute responsabilité quant aux décisions prises sur la base des informations affichées.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Droit applicable</h2>
            <p className="text-gray-700 leading-relaxed">
              Le présent site est soumis au droit français. En cas de litige, les tribunaux compétents sont ceux du
              ressort du siège social de l&apos;éditeur.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/confidentialite" className="text-sm text-[#C45D3E] hover:underline">
            Politique de confidentialité →
          </Link>
        </div>
      </div>
    </main>
  );
}
