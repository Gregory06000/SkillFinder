"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

interface AdminStats {
  total_votes: number;
  active_users_week: number;
  top_cities: { city: string; contributors: number; points: number }[];
  top_contributors: { pseudo: string; city: string; weekly_points: number; total_points: number }[];
  recent_votes: { place_id: string; vote: string; created_at: string }[];
}

export default function AdminPage() {
  const { user, session } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    if (!session?.access_token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
        throw new Error(data.detail || `HTTP ${res.status}`);
      }
      setStats(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, [session?.access_token]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès restreint</h1>
          <p className="text-gray-500 mb-4">Connectez-vous pour accéder au dashboard admin.</p>
          <Link href="/" className="text-[#C45D3E] hover:underline">Retour à l&apos;accueil</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
            <span className="text-xs bg-gray-900 text-white px-2 py-0.5 rounded-full font-medium">
              Admin
            </span>
          </div>
          <button
            onClick={fetchStats}
            disabled={loading}
            className="px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors
                       disabled:opacity-50 flex items-center gap-1.5"
          >
            <svg className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
            Actualiser
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {loading && !stats ? (
          <div className="text-center py-20 text-gray-400">Chargement des statistiques...</div>
        ) : stats ? (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <KPICard
                label="Votes totaux"
                value={stats.total_votes}
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                }
                color="bg-green-500"
              />
              <KPICard
                label="Utilisateurs actifs (semaine)"
                value={stats.active_users_week}
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                }
                color="bg-blue-500"
              />
              <KPICard
                label="Villes actives"
                value={stats.top_cities.length}
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                }
                color="bg-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Cities */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">Villes les plus actives</h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {stats.top_cities.length === 0 ? (
                    <div className="p-5 text-center text-sm text-gray-400">Aucune donnée</div>
                  ) : (
                    stats.top_cities.map((c, i) => (
                      <div key={c.city} className="flex items-center gap-3 px-5 py-3">
                        <span className="w-6 h-6 rounded-full bg-gray-100 text-xs font-bold flex items-center justify-center text-gray-600">
                          {i + 1}
                        </span>
                        <span className="flex-1 text-sm font-medium text-gray-800">{c.city}</span>
                        <span className="text-xs text-gray-400">{c.contributors} contrib.</span>
                        <span className="text-sm font-semibold text-gray-900">{c.points} pts</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Top Contributors */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">Top contributeurs (semaine)</h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {stats.top_contributors.length === 0 ? (
                    <div className="p-5 text-center text-sm text-gray-400">Aucune donnée</div>
                  ) : (
                    stats.top_contributors.map((c, i) => (
                      <div key={`${c.pseudo}-${i}`} className="flex items-center gap-3 px-5 py-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white
                          ${i === 0 ? "bg-amber-500" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-amber-700" : "bg-gray-200 text-gray-600"}`}>
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-800 truncate">{c.pseudo}</div>
                          <div className="text-xs text-gray-400">{c.city}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">{c.weekly_points} pts</div>
                          <div className="text-[10px] text-gray-400">Total: {c.total_points}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Recent Votes */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden lg:col-span-2">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">Votes récents</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
                        <th className="px-5 py-2.5">Lieu</th>
                        <th className="px-5 py-2.5">Vote</th>
                        <th className="px-5 py-2.5">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {stats.recent_votes.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-5 py-8 text-center text-gray-400">Aucun vote</td>
                        </tr>
                      ) : (
                        stats.recent_votes.map((v, i) => (
                          <tr key={`${v.place_id}-${i}`} className="hover:bg-gray-50">
                            <td className="px-5 py-2.5 font-medium text-gray-800 max-w-[200px] truncate">
                              {v.place_id}
                            </td>
                            <td className="px-5 py-2.5">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                                ${v.vote === "yes" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                {v.vote === "yes" ? "Oui" : "Non"}
                              </span>
                            </td>
                            <td className="px-5 py-2.5 text-gray-400">
                              {formatDate(v.created_at)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}

function KPICard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-lg ${color} text-white flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 tabular-nums">{value.toLocaleString("fr-FR")}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
