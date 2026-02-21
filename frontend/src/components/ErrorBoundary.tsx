"use client";

import { Component, type ReactNode } from "react";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("[ErrorBoundary]", error);
    Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-6">⚠️</div>
            <h1 className="text-2xl font-bold text-[#1A1A1A] mb-3">
              Une erreur est survenue
            </h1>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Quelque chose s&apos;est mal passé. Rechargez la page pour continuer.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#C45D3E] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#a84c32] transition-colors"
            >
              Recharger la page
            </button>
            <div className="mt-4">
              <Link href="/" className="text-sm text-gray-400 hover:text-[#C45D3E] transition-colors">
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
