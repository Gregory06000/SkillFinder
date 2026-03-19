import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <Image
        src="/mascot-sad.svg"
        alt="Findy triste"
        width={150}
        height={150}
        className="mb-4"
      />
      <p className="text-7xl font-bold text-sf-accent">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-sf-text">
        Page introuvable
      </h1>
      <p className="mt-2 text-sf-text-secondary max-w-md">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-sf-md bg-sf-accent text-white font-medium hover:bg-sf-accent-light transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
        </svg>
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
