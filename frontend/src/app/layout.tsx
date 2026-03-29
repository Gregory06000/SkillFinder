import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import ConditionalAnalytics from "@/components/ConditionalAnalytics";
import { AuthProvider } from "@/lib/AuthContext";
import I18nProvider from "@/lib/I18nProvider";
import { ToastProvider } from "@/lib/ToastContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import CookieBanner from "@/components/CookieBanner";
import PwaInstallBanner from "@/components/PwaInstallBanner";
import Footer from "@/components/Footer";
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
  manifest: "/manifest.json",
  themeColor: "#C45D3E",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SkillFinder",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/icons/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://skillfinder.fr",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "SkillFinder",
  },
};

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${playfair.variable}`}>
      <head>
        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen font-sans flex flex-col">
        <I18nProvider>
          <ToastProvider>
            <AuthProvider>
              <ErrorBoundary>
                <div className="flex-1">{children}</div>
                <Footer />
                <CookieBanner />
                <PwaInstallBanner />
              </ErrorBoundary>
            </AuthProvider>
          </ToastProvider>
        </I18nProvider>
        <ConditionalAnalytics />
      </body>
    </html>
  );
}
