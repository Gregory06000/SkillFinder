"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/AuthContext";

interface ConversionModalProps {
  onClose: () => void;
  variant?: "milestone" | "login";
  rankTitle?: string;
}

export default function ConversionModal({ onClose, variant = "milestone", rankTitle = "Éclaireur Urbain" }: ConversionModalProps) {
  const { signInWithGoogle, signUpWithEmail, signInWithEmail } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"choice" | "signup" | "login">("choice");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Click outside to close
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  // Escape to close
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  async function handleGoogleSignIn() {
    await signInWithGoogle();
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result =
      mode === "signup"
        ? await signUpWithEmail(email, password)
        : await signInWithEmail(email, password);

    setSubmitting(false);
    if (result.error) {
      setError(result.error);
    } else {
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        {/* Header gradient */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 p-6 text-center text-white">
          {variant === "milestone" ? (
            <>
              <div className="text-5xl mb-2">&#127942;</div>
              <h2 className="text-2xl font-extrabold">Félicitations !</h2>
              <p className="text-white/90 text-sm mt-1">
                Vous êtes un <strong>{rankTitle}</strong>
              </p>
            </>
          ) : (
            <>
              <div className="text-5xl mb-2">&#128075;</div>
              <h2 className="text-2xl font-extrabold">Bienvenue !</h2>
              <p className="text-white/90 text-sm mt-1">
                Connectez-vous pour suivre votre progression
              </p>
            </>
          )}
        </div>

        {/* Body */}
        <div className="p-6 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            {mode === "choice"
              ? variant === "milestone"
                ? "Créez votre compte pour sauvegarder votre progression et apparaître dans le classement."
                : "Sauvegardez votre progression et apparaissez dans le classement de votre ville."
              : mode === "signup"
                ? "Créez votre compte avec votre email."
                : "Connectez-vous à votre compte."}
          </p>

          <div className="mt-6 space-y-3">
            {mode === "choice" && (
              <>
                {/* Google Sign-in */}
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3
                             rounded-xl border border-gray-200 bg-white
                             hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continuer avec Google
                </button>

                {/* Email signup */}
                <button
                  onClick={() => setMode("signup")}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3
                             rounded-xl bg-sf-dark text-white
                             hover:bg-sf-dark/90 transition-colors text-sm font-medium"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  S&apos;inscrire avec email
                </button>

                <button
                  onClick={() => setMode("login")}
                  className="text-xs text-sf-accent hover:text-sf-accent-light transition-colors"
                >
                  Déjà un compte ? Se connecter
                </button>
              </>
            )}

            {(mode === "signup" || mode === "login") && (
              <form onSubmit={handleEmailSubmit} className="space-y-3 text-left">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm
                             focus:outline-none focus:ring-2 focus:ring-sf-accent/30 focus:border-sf-accent"
                  required
                  autoFocus
                />
                <input
                  type="password"
                  placeholder={mode === "signup" ? "Mot de passe (6+ caractères)" : "Mot de passe"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm
                             focus:outline-none focus:ring-2 focus:ring-sf-accent/30 focus:border-sf-accent"
                  minLength={6}
                  required
                />
                {error && (
                  <p className="text-red-500 text-xs px-1">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 rounded-xl bg-sf-accent text-white text-sm font-medium
                             hover:bg-sf-accent-light disabled:opacity-50 transition-colors"
                >
                  {submitting
                    ? "Chargement..."
                    : mode === "signup"
                      ? "Créer mon compte"
                      : "Se connecter"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("choice");
                    setError(null);
                  }}
                  className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Retour
                </button>
              </form>
            )}
          </div>

          {mode === "choice" && (
            <button
              onClick={onClose}
              className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Peut-être plus tard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
