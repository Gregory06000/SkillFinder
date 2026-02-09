import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillFinder",
  description: "Find businesses by what they're actually good at",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen">
        <header className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-xl font-bold text-brand-700 tracking-tight">
              SkillFinder
            </h1>
            <p className="text-sm text-gray-500">
              Trouvez le meilleur pour ce qui compte vraiment
            </p>
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
