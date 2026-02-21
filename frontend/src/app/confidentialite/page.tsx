import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données personnelles de SkillFinder.",
  robots: { index: false },
};

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-sm text-[#C45D3E] hover:underline mb-8 inline-block"
        >
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">
          Politique de confidentialité
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-[#1A1A1A]">

          <section>
            <h2 className="text-xl font-semibold mb-3">1. Responsable du traitement</h2>
            <p className="text-gray-700 leading-relaxed">
              SkillFinder est édité par <strong>[VOTRE NOM / SOCIÉTÉ]</strong>, dont le siège social est situé à <strong>[ADRESSE]</strong>.
              Pour toute question relative à vos données personnelles, vous pouvez nous contacter à l&apos;adresse suivante :{" "}
              <a href="mailto:contact@skillfinder.fr" className="text-[#C45D3E] hover:underline">
                contact@skillfinder.fr
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Données collectées</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              SkillFinder collecte les données suivantes selon votre utilisation du service :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
              <li>
                <strong>Données de compte (si vous créez un compte) :</strong> adresse e-mail, pseudo choisi, ville de recherche.
              </li>
              <li>
                <strong>Données de gamification :</strong> points accumulés, niveau, historique des votes.
              </li>
              <li>
                <strong>Données de navigation :</strong> recherches effectuées, historique local, favoris. Ces données sont stockées uniquement dans votre navigateur (localStorage) et ne sont pas transmises à nos serveurs sans votre consentement.
              </li>
              <li>
                <strong>Données de localisation :</strong> si vous activez la géolocalisation, votre position est utilisée uniquement pour centrer la recherche. Elle n&apos;est pas conservée.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Finalités du traitement</h2>
            <p className="text-gray-700 leading-relaxed mb-3">Vos données sont utilisées pour :</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
              <li>Fournir le service de recherche et de comparaison de professionnels</li>
              <li>Gérer votre compte et votre progression dans le système de gamification</li>
              <li>Afficher le classement hebdomadaire de votre ville</li>
              <li>Améliorer la pertinence des résultats grâce aux votes communautaires</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Base légale</h2>
            <p className="text-gray-700 leading-relaxed">
              Le traitement de vos données repose sur votre <strong>consentement</strong> (création de compte, géolocalisation)
              et sur l&apos;exécution du service que vous nous avez demandé (recherche, classement).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Durée de conservation</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
              <li>Données de compte : conservées tant que le compte est actif, ou jusqu&apos;à la suppression par l&apos;utilisateur.</li>
              <li>Données de gamification (localStorage) : conservées dans votre navigateur jusqu&apos;à effacement manuel.</li>
              <li>Données du classement (Supabase) : conservées pour la durée de vie du compte.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Partage des données</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Vos données ne sont pas vendues. Elles peuvent être partagées avec les sous-traitants suivants, dans le strict cadre de la fourniture du service :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
              <li><strong>Supabase</strong> (base de données et authentification) — USA / UE</li>
              <li><strong>Google Maps Platform</strong> (cartographie, géocodage, données d&apos;établissements) — USA</li>
              <li><strong>Google Gemini</strong> (analyse IA des avis) — aucune donnée personnelle transmise, uniquement des avis publics</li>
              <li><strong>Vercel</strong> (hébergement frontend) — USA</li>
              <li><strong>Render</strong> (hébergement backend) — USA</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Ces prestataires disposent de garanties appropriées (clauses contractuelles types) pour les transferts hors UE.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Cookies et stockage local</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              SkillFinder utilise le <strong>stockage local (localStorage)</strong> de votre navigateur, et non des cookies de tracking.
              Les données stockées incluent :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
              <li><code className="bg-gray-100 px-1 rounded">sf_rewards</code> — vos points et progression de gamification</li>
              <li><code className="bg-gray-100 px-1 rounded">sf_locale</code> — votre préférence de langue (fr/en)</li>
              <li><code className="bg-gray-100 px-1 rounded">sf_points_merged</code> — indicateur de synchronisation des points</li>
              <li><code className="bg-gray-100 px-1 rounded">sf_show_reasoning</code> — préférence d&apos;affichage du raisonnement IA</li>
              <li><code className="bg-gray-100 px-1 rounded">sf_cookie_consent</code> — votre consentement aux présentes conditions</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Google Maps peut déposer ses propres cookies lors de l&apos;utilisation de la carte interactive. Ces cookies sont soumis à la{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C45D3E] hover:underline"
              >
                politique de confidentialité de Google
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Vos droits</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
              <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données</li>
              <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
              <li><strong>Droit à l&apos;effacement</strong> : supprimer votre compte et vos données</li>
              <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
              <li><strong>Droit d&apos;opposition</strong> : vous opposer au traitement de vos données</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Pour exercer ces droits, contactez-nous à{" "}
              <a href="mailto:contact@skillfinder.fr" className="text-[#C45D3E] hover:underline">
                contact@skillfinder.fr
              </a>. Vous pouvez également introduire une réclamation auprès de la{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C45D3E] hover:underline"
              >
                CNIL
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Sécurité</h2>
            <p className="text-gray-700 leading-relaxed">
              Vos données sont transmises via HTTPS. Les mots de passe sont gérés par Supabase Auth (hachage bcrypt).
              Nous appliquons des mesures techniques appropriées pour protéger vos données contre tout accès non autorisé.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Modifications</h2>
            <p className="text-gray-700 leading-relaxed">
              Cette politique peut être mise à jour. En cas de modification substantielle, vous en serez informé par
              une notification sur le site. La date de dernière mise à jour est indiquée en haut de cette page.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/mentions-legales" className="text-sm text-[#C45D3E] hover:underline">
            Mentions légales →
          </Link>
        </div>
      </div>
    </main>
  );
}
