"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { useT } from "@/lib/i18n";
import { getUserRank, getLevel, TIERS, type UserRank } from "@/lib/gamification";
import { computeBadges, type Badge } from "@/lib/badges";
import {
  fetchUserProfile,
  fetchNotificationPrefs,
  updateNotificationPrefs,
  getSharingStatus,
  toggleSharingFavorites,
  saveMascotCustom,
  fetchMascotCustom,
  saveAvatarColor,
  fetchFriends,
  fetchPendingRequests,
  fetchFriendCode,
  searchUsers,
  sendFriendRequest,
  respondFriendRequest,
  removeFriend,
  type NotificationPrefs,
  type Friend,
  type PendingRequest,
  type FriendUser,
} from "@/lib/api";
import Mascot from "@/components/Mascot";
import MascotCustomizer from "@/components/MascotCustomizer";
import type { MascotCustomization, ItemCategory } from "@/lib/mascotItems";
import { loadMascotCustomization, saveMascotCustomization, getItemsByTier, isItemUnlocked } from "@/lib/mascotItems";

type Tab = "findy" | "tiers" | "badges" | "friends";

const CATEGORY_ICONS: Record<ItemCategory, string> = { hair: "💇", hat: "🎩", outfit: "👕", scarf: "🧣", accessory: "🎒", boots: "👢", background: "🖼️" };
const CATEGORY_KEYS: Record<ItemCategory, string> = { hair: "mascot.cat.hair", hat: "mascot.cat.hat", outfit: "mascot.cat.outfit", scarf: "mascot.cat.scarf", accessory: "mascot.cat.accessory", boots: "mascot.cat.boots", background: "mascot.cat.background" };

const AVATAR_COLORS = [
  "#C45D3E", "#D4A853", "#3A7D5C", "#5B7FC7",
  "#8B5CF6", "#E8805F", "#1A1714", "#9C9690",
];

const PROFILE_KEY = "sf_profile";

interface ProfileData {
  avatarColor: string;
  avatarPhoto: string | null;
}

function loadProfile(): ProfileData {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { avatarColor: "#C45D3E", avatarPhoto: null };
}

function saveProfile(data: ProfileData): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
}

// Badge condition descriptions
function getBadgeCondition(badge: Badge, t: (key: string, vars?: Record<string, string | number>) => string): string {
  switch (badge.id) {
    case "newcomer": return t("profilePage.badgeCondition.points", { n: 1 });
    case "first_vote": return t("profilePage.badgeCondition.points", { n: 10 });
    case "contributor": return t("profilePage.badgeCondition.votes", { n: 5 });
    case "explorer": return t("profilePage.badgeCondition.points", { n: 50 });
    case "enthusiast": return t("profilePage.badgeCondition.points", { n: 100 });
    case "scout": return t("profilePage.badgeCondition.votes", { n: 10 });
    case "adventurer": return t("profilePage.badgeCondition.tier", { n: 2 });
    case "certified": return t("profilePage.badgeCondition.tier", { n: 3 });
    case "sage": return t("profilePage.badgeCondition.tier", { n: 4 });
    case "expert": return t("profilePage.badgeCondition.tier", { n: 5 });
    case "globe_trotter": return t("profilePage.badgeCondition.votes", { n: 25 });
    case "champion": return t("profilePage.badgeCondition.points", { n: 250 });
    case "legend": return t("profilePage.badgeCondition.tier", { n: 6 });
    case "marathon": return t("profilePage.badgeCondition.votes", { n: 50 });
    case "titan": return t("profilePage.badgeCondition.points", { n: 500 });
    case "veteran": return t("profilePage.badgeCondition.tier", { n: 7 });
    case "oracle": return t("profilePage.badgeCondition.tier", { n: 8 });
    case "master": return t("profilePage.badgeCondition.tier", { n: 9 });
    case "deity": return t("profilePage.badgeCondition.points", { n: 1000 });
    case "centurion": return t("profilePage.badgeCondition.votes", { n: 100 });
    default: return "";
  }
}

// Badge progress calculation
function getBadgeProgress(badge: Badge, points: number, votedCount: number): { current: number; target: number } {
  switch (badge.id) {
    case "newcomer": return { current: Math.min(points, 1), target: 1 };
    case "first_vote": return { current: Math.min(points, 10), target: 10 };
    case "contributor": return { current: Math.min(votedCount, 5), target: 5 };
    case "explorer": return { current: Math.min(points, 50), target: 50 };
    case "enthusiast": return { current: Math.min(points, 100), target: 100 };
    case "scout": return { current: Math.min(votedCount, 10), target: 10 };
    case "adventurer": return { current: Math.min(getUserRank(points).palier, 2), target: 2 };
    case "certified": return { current: Math.min(getUserRank(points).palier, 3), target: 3 };
    case "sage": return { current: Math.min(getUserRank(points).palier, 4), target: 4 };
    case "expert": return { current: Math.min(getUserRank(points).palier, 5), target: 5 };
    case "globe_trotter": return { current: Math.min(votedCount, 25), target: 25 };
    case "champion": return { current: Math.min(points, 250), target: 250 };
    case "legend": return { current: Math.min(getUserRank(points).palier, 6), target: 6 };
    case "marathon": return { current: Math.min(votedCount, 50), target: 50 };
    case "titan": return { current: Math.min(points, 500), target: 500 };
    case "veteran": return { current: Math.min(getUserRank(points).palier, 7), target: 7 };
    case "oracle": return { current: Math.min(getUserRank(points).palier, 8), target: 8 };
    case "master": return { current: Math.min(getUserRank(points).palier, 9), target: 9 };
    case "deity": return { current: Math.min(points, 1000), target: 1000 };
    case "centurion": return { current: Math.min(votedCount, 100), target: 100 };
    default: return { current: 0, target: 1 };
  }
}

function getVotedCount(): number {
  try {
    const raw = localStorage.getItem("sf_voted_places");
    if (!raw) return 0;
    return (JSON.parse(raw) as string[]).length;
  } catch {
    return 0;
  }
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, getAccessToken } = useAuth();
  const { t, locale } = useT();

  const [tab, setTab] = useState<Tab>("findy");
  const [profile, setProfile] = useState<ProfileData>({ avatarColor: "#C45D3E", avatarPhoto: null });
  const [mascotCustom, setMascotCustom] = useState<MascotCustomization>(loadMascotCustomization);
  const [previewCustom, setPreviewCustom] = useState<MascotCustomization | null>(null);
  const [pseudo, setPseudo] = useState("Guest");
  const [points, setPoints] = useState(0);
  const [weeklyPoints, setWeeklyPoints] = useState(0);
  const [city, setCity] = useState("");
  const [notifPrefs, setNotifPrefs] = useState<NotificationPrefs>({ email_badges: true, email_weekly: true });
  const [sharingFavs, setSharingFavs] = useState(false);

  // Friends state
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pending, setPending] = useState<PendingRequest[]>([]);
  const [friendCode, setFriendCode] = useState<string | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [searchResult, setSearchResult] = useState<FriendUser | null>(null);
  const [searchError, setSearchError] = useState("");
  const [searching, setSearching] = useState(false);
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());

  // Friend profile view
  const [viewingFriend, setViewingFriend] = useState<Friend | null>(null);

  const rank: UserRank = getUserRank(points);
  const level = getLevel(points);
  const votedCount = typeof window !== "undefined" ? getVotedCount() : 0;

  // Load profile data
  useEffect(() => {
    setProfile(loadProfile());
    const rewards = localStorage.getItem("sf_rewards");
    if (rewards) {
      try {
        const data = JSON.parse(rewards);
        setPseudo(data.pseudo || "Guest");
        setPoints(data.points || 0);
        setWeeklyPoints(data.weeklyPoints || 0);
        setCity(data.city || "");
      } catch {}
    }
  }, []);

  // Load server data
  useEffect(() => {
    if (!user) return;
    (async () => {
      const token = await getAccessToken();
      if (!token) return;

      const [profileData, prefs, sharing, serverCustom, friendsList, pendingList, code] = await Promise.all([
        fetchUserProfile(token),
        fetchNotificationPrefs(token),
        getSharingStatus(token),
        fetchMascotCustom(token),
        fetchFriends(token),
        fetchPendingRequests(token),
        fetchFriendCode(token),
      ]);

      if (profileData.found) {
        if (profileData.pseudo) setPseudo(profileData.pseudo);
        if (profileData.total_points !== undefined) setPoints(profileData.total_points);
        if (profileData.weekly_points !== undefined) setWeeklyPoints(profileData.weekly_points);
        if (profileData.city) setCity(profileData.city);
      }

      setNotifPrefs(prefs);
      setSharingFavs(sharing);
      if (serverCustom) {
        const merged = { ...mascotCustom, ...serverCustom } as MascotCustomization;
        setMascotCustom(merged);
        saveMascotCustomization(merged);
      }
      setFriends(friendsList);
      setPending(pendingList);
      setFriendCode(code);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function handleColorChange(color: string) {
    const updated = { ...profile, avatarColor: color };
    setProfile(updated);
    saveProfile(updated);
    getAccessToken?.().then((token) => {
      if (token) saveAvatarColor(token, color);
    });
  }

  function handleMascotChange(custom: MascotCustomization) {
    setMascotCustom(custom);
    saveMascotCustomization(custom);
    if (user) {
      getAccessToken().then((token) => {
        if (token) saveMascotCustom(token, custom);
      });
    }
  }

  // Friends actions
  const loadFriendsData = useCallback(async () => {
    const token = await getAccessToken();
    if (!token) return;
    const [f, p, code] = await Promise.all([
      fetchFriends(token),
      fetchPendingRequests(token),
      fetchFriendCode(token),
    ]);
    setFriends(f);
    setPending(p);
    setFriendCode(code);
  }, [getAccessToken]);

  async function handleCopyCode() {
    if (!friendCode) return;
    await navigator.clipboard.writeText(friendCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  }

  async function handleSearchByCode() {
    const code = codeInput.trim().toUpperCase();
    if (code.length < 2) return;
    setSearching(true);
    setSearchError("");
    setSearchResult(null);
    const token = await getAccessToken();
    if (!token) { setSearching(false); return; }
    const results = await searchUsers(code, token);
    if (results.length > 0) setSearchResult(results[0]);
    else setSearchError(t("friends.codeNotFound"));
    setSearching(false);
  }

  async function handleSendRequest(userId: string) {
    const token = await getAccessToken();
    if (!token) return;
    const ok = await sendFriendRequest(userId, token);
    if (ok) setSentIds((prev) => new Set(prev).add(userId));
  }

  async function handleRespond(friendshipId: string, accept: boolean) {
    const token = await getAccessToken();
    if (!token) return;
    const ok = await respondFriendRequest(friendshipId, accept, token);
    if (ok) {
      setPending((prev) => prev.filter((p) => p.friendship_id !== friendshipId));
      if (accept) loadFriendsData();
    }
  }

  async function handleRemove(friendshipId: string) {
    const token = await getAccessToken();
    if (!token) return;
    const ok = await removeFriend(friendshipId, token);
    if (ok) setFriends((prev) => prev.filter((f) => f.friendship_id !== friendshipId));
  }

  const badges = computeBadges(points);
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const TABS: { key: Tab; labelKey: string; icon: string; count?: number }[] = [
    { key: "findy", labelKey: "profilePage.tab.findy", icon: "🦊" },
    { key: "tiers", labelKey: "profilePage.tab.tiers", icon: "⭐" },
    { key: "badges", labelKey: "profilePage.tab.badges", icon: "🏆", count: unlockedCount },
    { key: "friends", labelKey: "profilePage.tab.friends", icon: "👥", count: friends.length },
  ];

  // Next tier info
  const currentTier = TIERS.find((t) => level >= t.minLevel && level <= t.maxLevel);
  const nextTier = TIERS.find((t) => t.palier === rank.palier + 1);
  const ptsToNext = nextTier ? (nextTier.minLevel - level) : 0;

  return (
    <div className="min-h-screen bg-sf-bg">
      {/* Top bar */}
      <div className="bg-sf-card border-b border-sf-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm text-sf-text-secondary hover:text-sf-accent transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {t("profilePage.back")}
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            {profile.avatarPhoto ? (
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-sf-accent/20">
                <img src={profile.avatarPhoto} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-sf-accent/20"
                style={{ background: profile.avatarColor }}
              >
                {pseudo.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="text-sm font-semibold text-sf-text">{pseudo}</div>
              <div className="text-xs text-sf-gold font-medium">{t(rank.titleKey)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar (desktop) / Top tabs (mobile) */}
          <div className="md:w-[220px] flex-shrink-0">
            {/* Mobile: horizontal tabs */}
            <div className="flex md:hidden gap-1 bg-sf-card rounded-sf-md border border-sf-border p-1">
              {TABS.map((tabDef) => (
                <button
                  key={tabDef.key}
                  onClick={() => { setTab(tabDef.key); setViewingFriend(null); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-sf-sm text-xs font-semibold transition-colors
                    ${tab === tabDef.key ? "bg-sf-accent text-white" : "text-sf-text-secondary hover:bg-sf-bg"}`}
                >
                  <span>{tabDef.icon}</span>
                  <span>{t(tabDef.labelKey)}</span>
                  {tabDef.count !== undefined && (
                    <span className={`text-[10px] px-1.5 rounded-full ${tab === tabDef.key ? "bg-white/20" : "bg-sf-border"}`}>
                      {tabDef.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Desktop: vertical sidebar */}
            <div className="hidden md:flex flex-col gap-1 bg-sf-card rounded-sf-lg border border-sf-border p-2">
              {TABS.map((tabDef) => (
                <button
                  key={tabDef.key}
                  onClick={() => { setTab(tabDef.key); setViewingFriend(null); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-sf-sm text-sm font-medium transition-colors text-left
                    ${tab === tabDef.key ? "bg-sf-accent text-white" : "text-sf-text hover:bg-sf-bg"}`}
                >
                  <span className="text-base">{tabDef.icon}</span>
                  <span className="flex-1">{t(tabDef.labelKey)}</span>
                  {tabDef.count !== undefined && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${tab === tabDef.key ? "bg-white/20" : "bg-sf-border text-sf-text-light"}`}>
                      {tabDef.count}
                    </span>
                  )}
                </button>
              ))}

              {/* Stats card in sidebar */}
              <div className="mt-4 p-4 bg-sf-bg rounded-sf-sm">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light mb-3">
                  {t("profilePage.stats")}
                </div>
                <div className="space-y-2.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-sf-text-secondary">{t("profilePage.totalPoints")}</span>
                    <span className="font-bold text-sf-text">{points}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-sf-text-secondary">{t("profilePage.weeklyPoints")}</span>
                    <span className="font-bold text-sf-accent">+{weeklyPoints}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-sf-text-secondary">{t("profilePage.currentTier")}</span>
                    <span className="font-bold text-sf-gold">{rank.palier}</span>
                  </div>
                  {nextTier ? (
                    <div className="text-[10px] text-sf-text-light text-center pt-1">
                      {t("profilePage.nextTier", { pts: ptsToNext })}
                    </div>
                  ) : (
                    <div className="text-[10px] text-sf-gold text-center pt-1 font-semibold">
                      {t("profilePage.maxTier")}
                    </div>
                  )}
                </div>
              </div>

              {/* Settings in sidebar */}
              {user && (
                <div className="mt-2 p-4 bg-sf-bg rounded-sf-sm">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light mb-2.5">
                    {t("profile.sharing")}
                  </div>
                  <label className="flex items-center justify-between gap-2 cursor-pointer mb-3">
                    <span className="text-[11px] text-sf-text-secondary">{t("profile.shareFavorites")}</span>
                    <button
                      onClick={() => {
                        const newVal = !sharingFavs;
                        setSharingFavs(newVal);
                        getAccessToken().then((token) => {
                          if (token) toggleSharingFavorites(token, newVal);
                        });
                      }}
                      className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${sharingFavs ? "bg-sf-accent" : "bg-sf-border"}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${sharingFavs ? "left-[18px]" : "left-0.5"}`} />
                    </button>
                  </label>

                  <div className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light mb-2">
                    {t("profile.notifications")}
                  </div>
                  <div className="space-y-2">
                    {[
                      { key: "email_badges" as const, labelKey: "profile.notifBadges" },
                      { key: "email_weekly" as const, labelKey: "profile.notifWeekly" },
                    ].map(({ key, labelKey }) => (
                      <label key={key} className="flex items-center justify-between gap-2 cursor-pointer">
                        <span className="text-[11px] text-sf-text-secondary">{t(labelKey)}</span>
                        <button
                          onClick={() => {
                            const updated = { ...notifPrefs, [key]: !notifPrefs[key] };
                            setNotifPrefs(updated);
                            getAccessToken().then((token) => {
                              if (token) updateNotificationPrefs(token, updated, locale);
                            });
                          }}
                          className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${notifPrefs[key] ? "bg-sf-accent" : "bg-sf-border"}`}
                        >
                          <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notifPrefs[key] ? "left-[18px]" : "left-0.5"}`} />
                        </button>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* ═══ TAB: FINDY ═══ */}
            {tab === "findy" && (
              <div className="bg-sf-card rounded-sf-lg border border-sf-border overflow-hidden">
                {/* Mascot preview */}
                <div
                  className="p-8 flex flex-col items-center"
                  style={{ background: "linear-gradient(135deg, var(--sf-gold-light), var(--sf-accent-pale))" }}
                >
                  <Mascot size={180} customization={previewCustom || mascotCustom} pose={previewCustom ? "wink" : "default"} />
                  <div className="mt-3 text-sm font-semibold text-sf-text">{pseudo}</div>
                  <div className="text-xs text-sf-gold">{t(rank.titleKey)} &middot; {t("stats.tier", { palier: rank.palier })}</div>
                </div>

                {/* Color picker */}
                <div className="p-6 border-t border-sf-border">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light mb-3">
                    {t("profile.colorLabel")}
                  </div>
                  <div className="flex gap-2.5">
                    {AVATAR_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        className={`w-8 h-8 rounded-full border-3 transition-transform hover:scale-110
                          ${profile.avatarColor === color ? "border-sf-text scale-110 ring-2 ring-sf-accent/30" : "border-transparent"}`}
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Mascot customizer */}
                <div className="p-6 border-t border-sf-border">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light mb-4">
                    {t("mascot.customize")}
                  </div>
                  <MascotCustomizer
                    customization={mascotCustom}
                    userTier={rank.palier}
                    onChange={handleMascotChange}
                    onPreview={setPreviewCustom}
                  />
                </div>

                {/* Mobile-only settings */}
                {user && (
                  <div className="p-6 border-t border-sf-border md:hidden">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light mb-2.5">
                      {t("profile.sharing")}
                    </div>
                    <label className="flex items-center justify-between gap-2 cursor-pointer mb-4">
                      <span className="text-xs text-sf-text-secondary">{t("profile.shareFavorites")}</span>
                      <button
                        onClick={() => {
                          const newVal = !sharingFavs;
                          setSharingFavs(newVal);
                          getAccessToken().then((token) => {
                            if (token) toggleSharingFavorites(token, newVal);
                          });
                        }}
                        className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${sharingFavs ? "bg-sf-accent" : "bg-sf-border"}`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${sharingFavs ? "left-[18px]" : "left-0.5"}`} />
                      </button>
                    </label>

                    <div className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light mb-2.5">
                      {t("profile.notifications")}
                    </div>
                    <div className="space-y-2">
                      {[
                        { key: "email_badges" as const, labelKey: "profile.notifBadges" },
                        { key: "email_weekly" as const, labelKey: "profile.notifWeekly" },
                      ].map(({ key, labelKey }) => (
                        <label key={key} className="flex items-center justify-between gap-2 cursor-pointer">
                          <span className="text-xs text-sf-text-secondary">{t(labelKey)}</span>
                          <button
                            onClick={() => {
                              const updated = { ...notifPrefs, [key]: !notifPrefs[key] };
                              setNotifPrefs(updated);
                              getAccessToken().then((token) => {
                                if (token) updateNotificationPrefs(token, updated, locale);
                              });
                            }}
                            className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${notifPrefs[key] ? "bg-sf-accent" : "bg-sf-border"}`}
                          >
                            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notifPrefs[key] ? "left-[18px]" : "left-0.5"}`} />
                          </button>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ═══ TAB: TIERS ═══ */}
            {tab === "tiers" && (
              <div className="space-y-4">
                {TIERS.map((tier) => {
                  const isCompleted = level > tier.maxLevel;
                  const isCurrent = level >= tier.minLevel && level <= tier.maxLevel;
                  const isLocked = level < tier.minLevel;
                  let tierProgress = 0;
                  if (isCompleted) tierProgress = 100;
                  else if (isCurrent) {
                    const range = tier.maxLevel - tier.minLevel + 1;
                    tierProgress = Math.round(((level - tier.minLevel) / range) * 100);
                  }
                  const tierItems = getItemsByTier(tier.palier);
                  const categories: ItemCategory[] = ["hat", "scarf", "accessory", "boots"];

                  return (
                    <div
                      key={tier.palier}
                      className={`bg-sf-card rounded-sf-lg border overflow-hidden transition-all
                        ${isCurrent ? "border-sf-accent/30 ring-1 ring-sf-accent/10" : "border-sf-border"}
                        ${isLocked ? "opacity-60" : ""}`}
                    >
                      {/* Tier header */}
                      <div className={`px-5 py-3 flex items-center gap-3 ${isCurrent ? "bg-sf-accent-pale" : "bg-sf-bg"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold
                          ${isCompleted ? "bg-sf-success text-white" : ""}
                          ${isCurrent ? "bg-sf-accent text-white" : ""}
                          ${isLocked ? "bg-sf-border text-sf-text-light" : ""}`}
                        >
                          {isCompleted ? (
                            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : tier.palier}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-sm font-semibold ${isCurrent ? "text-sf-accent" : "text-sf-text"}`}>
                              {t(tier.titleKey)}
                            </span>
                            <span className="text-[10px] text-sf-text-light">
                              {t("profile.levelRange", { min: tier.minLevel, max: tier.maxLevel })}
                            </span>
                          </div>
                          {(isCurrent || isCompleted) && (
                            <div className="mt-1.5 h-1.5 bg-sf-border rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${tierProgress}%`,
                                  background: isCompleted ? "#3A7D5C" : "linear-gradient(90deg, #C45D3E, #E8805F)",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Items by category */}
                      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {categories.map((cat) => {
                          const items = tierItems.filter((i) => i.category === cat);
                          if (items.length === 0) return null;
                          return (
                            <div key={cat}>
                              <div className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light mb-2 flex items-center gap-1.5">
                                <span>{CATEGORY_ICONS[cat]}</span>
                                <span>{t(CATEGORY_KEYS[cat])}</span>
                              </div>
                              <div className="space-y-1">
                                {items.map((item) => {
                                  const unlocked = isItemUnlocked(item, rank.palier);
                                  return (
                                    <div
                                      key={item.id}
                                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-sf-sm text-xs
                                        ${unlocked ? "bg-sf-bg text-sf-text" : "bg-sf-bg/50 text-sf-text-light"}`}
                                    >
                                      <span className={`text-base ${unlocked ? "" : "grayscale opacity-50"}`}>{item.preview}</span>
                                      <span className={`truncate ${unlocked ? "font-medium" : ""}`}>{t(item.nameKey)}</span>
                                      {!unlocked && (
                                        <svg className="w-3 h-3 ml-auto flex-shrink-0 opacity-40" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ═══ TAB: BADGES ═══ */}
            {tab === "badges" && (
              <div className="bg-sf-card rounded-sf-lg border border-sf-border overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-sf-text">
                      {t("badge.title", { unlocked: unlockedCount, total: badges.length })}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {badges.map((badge) => {
                      const progress = getBadgeProgress(badge, points, votedCount);
                      const progressPct = badge.unlocked ? 100 : Math.round((progress.current / progress.target) * 100);

                      return (
                        <div
                          key={badge.id}
                          className={`rounded-sf-md p-4 transition-all border
                            ${badge.unlocked
                              ? "bg-sf-accent-pale border-sf-accent/20"
                              : "bg-sf-bg border-sf-border"}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`text-3xl flex-shrink-0 ${badge.unlocked ? "" : "grayscale opacity-50"}`}>
                              {badge.emoji}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm font-semibold ${badge.unlocked ? "text-sf-text" : "text-sf-text-light"}`}>
                                {t(badge.titleKey)}
                              </div>
                              <div className="text-[11px] text-sf-text-secondary mt-0.5">
                                {t(badge.descKey)}
                              </div>

                              {/* Progress bar */}
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-[10px] mb-1">
                                  <span className={badge.unlocked ? "text-sf-success font-semibold" : "text-sf-text-light"}>
                                    {badge.unlocked
                                      ? t("profilePage.badgeUnlocked")
                                      : getBadgeCondition(badge, t)}
                                  </span>
                                  {!badge.unlocked && (
                                    <span className="text-sf-text-light font-mono">
                                      {t("profilePage.badgeProgress", { current: progress.current, target: progress.target })}
                                    </span>
                                  )}
                                </div>
                                <div className="h-1.5 bg-sf-border rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                      width: `${progressPct}%`,
                                      background: badge.unlocked
                                        ? "#3A7D5C"
                                        : "linear-gradient(90deg, #C45D3E, #E8805F)",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ TAB: FRIENDS ═══ */}
            {tab === "friends" && !viewingFriend && (
              <div className="bg-sf-card rounded-sf-lg border border-sf-border overflow-hidden">
                <div className="p-6">
                  {/* Friend code */}
                  {friendCode && (
                    <div className="mb-5 p-4 rounded-sf-md bg-sf-bg border border-sf-border">
                      <div className="text-[10px] text-sf-text-light mb-1.5">{t("friends.myCode")}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-mono font-bold text-sf-accent tracking-wider">{friendCode}</span>
                        <button
                          onClick={handleCopyCode}
                          className="text-xs text-sf-text-light hover:text-sf-accent transition-colors flex items-center gap-1.5"
                        >
                          {codeCopied ? (
                            <>
                              <svg className="w-4 h-4 text-sf-success" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {t("friends.copied")}
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                              </svg>
                              {t("friends.copy")}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Search by code */}
                  <div className="mb-5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                        onKeyDown={(e) => e.key === "Enter" && handleSearchByCode()}
                        placeholder={t("friends.codePlaceholder")}
                        className="flex-1 text-sm font-mono bg-sf-bg border border-sf-border rounded-sf-sm px-4 py-2.5
                                   outline-none focus:border-sf-accent text-sf-text placeholder:text-sf-text-light tracking-wider"
                        maxLength={9}
                      />
                      <button
                        onClick={handleSearchByCode}
                        disabled={codeInput.trim().length < 2 || searching}
                        className="px-5 py-2.5 text-sm font-medium bg-sf-accent text-white rounded-sf-sm
                                   hover:bg-sf-accent-light transition-colors disabled:opacity-50"
                      >
                        {searching ? "..." : t("friends.search")}
                      </button>
                    </div>
                    {searchError && <div className="text-xs text-red-500 mt-2">{searchError}</div>}
                    {searchResult && (
                      <div className="mt-2 flex items-center justify-between p-3 rounded-sf-sm bg-sf-bg border border-sf-border">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-full bg-sf-accent-light flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {searchResult.pseudo.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-sf-text truncate">{searchResult.pseudo}</div>
                            <div className="text-xs text-sf-text-light">
                              {searchResult.city ? `${searchResult.city} - ` : ""}{searchResult.total_points} pts
                            </div>
                          </div>
                        </div>
                        {friends.some((f) => f.user_id === searchResult.user_id) ? (
                          <span className="text-xs text-sf-success font-medium">{t("friends.alreadyFriend")}</span>
                        ) : sentIds.has(searchResult.user_id) ? (
                          <span className="text-xs text-sf-text-light">{t("friends.requestSent")}</span>
                        ) : (
                          <button
                            onClick={() => handleSendRequest(searchResult.user_id)}
                            className="text-xs text-sf-accent hover:text-sf-accent-light font-medium transition-colors"
                          >
                            {t("friends.addBtn")}
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Pending requests */}
                  {pending.length > 0 && (
                    <div className="mb-5">
                      <div className="text-xs font-medium text-sf-gold mb-2">
                        {t("friends.pending", { count: pending.length, plural: pending.length > 1 ? "s" : "" })}
                      </div>
                      <div className="space-y-2">
                        {pending.map((req) => (
                          <div
                            key={req.friendship_id}
                            className="flex items-center justify-between p-3 rounded-sf-sm bg-sf-gold-light border border-sf-gold/20"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-full bg-sf-accent flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                {req.pseudo.charAt(0).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-semibold text-sf-text truncate">{req.pseudo}</div>
                                <div className="text-xs text-sf-text-light">{req.total_points} pts</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <button
                                onClick={() => handleRespond(req.friendship_id, true)}
                                className="w-8 h-8 rounded-full bg-sf-success text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                              >
                                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleRespond(req.friendship_id, false)}
                                className="w-8 h-8 rounded-full bg-sf-border text-sf-text-light flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition-colors"
                              >
                                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Friends list */}
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light mb-3">
                    {t("friends.title", { count: friends.length })}
                  </div>
                  {friends.length === 0 ? (
                    <div className="text-sm text-sf-text-light text-center py-8">
                      {t("friends.empty")}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {friends.map((friend) => (
                        <div
                          key={friend.friendship_id}
                          className="flex items-center justify-between p-3 rounded-sf-sm hover:bg-sf-bg transition-colors group cursor-pointer"
                          onClick={() => setViewingFriend(friend)}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-full bg-sf-accent flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                              {friend.pseudo.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-sf-text truncate">{friend.pseudo}</div>
                              <div className="text-xs text-sf-text-light">
                                {friend.city ? `${friend.city} - ` : ""}{friend.total_points} pts
                                <span className="ml-2 text-sf-gold">{t(getUserRank(friend.total_points).titleKey)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-sf-text-light opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleRemove(friend.friendship_id); }}
                              className="opacity-0 group-hover:opacity-100 text-sf-text-light hover:text-red-500 transition-all p-1"
                              title={t("friends.remove")}
                            >
                              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ═══ FRIEND PROFILE VIEW ═══ */}
            {tab === "friends" && viewingFriend && (
              <div className="bg-sf-card rounded-sf-lg border border-sf-border overflow-hidden">
                {/* Back button */}
                <div className="p-4 border-b border-sf-border">
                  <button
                    onClick={() => setViewingFriend(null)}
                    className="flex items-center gap-2 text-sm text-sf-text-secondary hover:text-sf-accent transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    {t("profilePage.back")}
                  </button>
                </div>

                {/* Friend header */}
                <div
                  className="p-8 flex flex-col items-center"
                  style={{ background: "linear-gradient(135deg, var(--sf-gold-light), var(--sf-accent-pale))" }}
                >
                  <div className="w-16 h-16 rounded-full bg-sf-accent flex items-center justify-center text-white text-2xl font-bold">
                    {viewingFriend.pseudo.charAt(0).toUpperCase()}
                  </div>
                  <div className="mt-3 text-lg font-semibold text-sf-text">{viewingFriend.pseudo}</div>
                  <div className="text-sm text-sf-gold">{t(getUserRank(viewingFriend.total_points).titleKey)}</div>
                  <div className="text-xs text-sf-text-secondary mt-1">
                    {viewingFriend.city ? `${viewingFriend.city} - ` : ""}{viewingFriend.total_points} pts
                  </div>
                </div>

                {/* Friend badges */}
                <div className="p-6">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light mb-4">
                    {t("profilePage.friendBadges", { pseudo: viewingFriend.pseudo })}
                  </div>
                  {(() => {
                    const friendBadges = computeBadges(viewingFriend.total_points);
                    const friendUnlocked = friendBadges.filter((b) => b.unlocked);
                    if (friendUnlocked.length === 0) {
                      return (
                        <div className="text-sm text-sf-text-light text-center py-6">
                          {t("profilePage.noBadgesYet")}
                        </div>
                      );
                    }
                    return (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {friendBadges.map((badge) => (
                          <div
                            key={badge.id}
                            className={`rounded-sf-sm p-3 text-center border transition-all
                              ${badge.unlocked
                                ? "bg-sf-accent-pale border-sf-accent/20"
                                : "bg-sf-bg border-sf-border opacity-40"}`}
                          >
                            <div className={`text-2xl ${badge.unlocked ? "" : "grayscale"}`}>{badge.emoji}</div>
                            <div className={`text-[11px] font-medium mt-1 ${badge.unlocked ? "text-sf-text" : "text-sf-text-light"}`}>
                              {t(badge.titleKey)}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
