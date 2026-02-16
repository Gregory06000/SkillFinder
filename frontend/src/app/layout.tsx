import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/lib/AuthContext";
import I18nProvider from "@/lib/I18nProvider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SkillFinder — Trouvez le meilleur professionnel près de chez vous",
    template: "%s — SkillFinder",
  },
  description:
    "Comparez les professionnels près de chez vous grâce à l'analyse IA des avis clients. Classement sur mesure par critère, vérification communautaire.",
  metadataBase: new URL("https://skillfinder.fr"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "SkillFinder",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans">
        <I18nProvider>
          <AuthProvider>{children}</AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
