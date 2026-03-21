"use client";

import { useState, useRef, useEffect } from "react";
import type { RewardsData, UserRank } from "@/lib/gamification";
import { TIERS, getUserRank, getLevel } from "@/lib/gamification";
import { computeBadges } from "@/lib/badges";
import { fetchNotificationPrefs, updateNotificationPrefs, getSharingStatus, toggleSharingFavorites, syncFavorites, type NotificationPrefs } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { useT } from "@/lib/i18n";
import FriendsPanel from "./FriendsPanel";
import Mascot from "./Mascot";
import MascotCustomizer from "./MascotCustomizer";
import type { MascotCustomization } from "@/lib/mascotItems";
import { loadMascotCustomization, saveMascotCustomization } from "@/lib/mascotItems";

interface ProfilePanelProps {
  rewards: RewardsData;
  onClose: () => void;
  onPseudoChange: (pseudo: string) => void;
  favorites?: unknown[];
  onMascotChange?: (custom: MascotCustomization) => void;
}

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

export function getAvatarData(): ProfileData {
  return loadProfile();
}

export default function ProfilePanel({
  rewards,
  onClose,
  onPseudoChange,
  favorites = [],
  onMascotChange,
}: ProfilePanelProps) {
  const { t } = useT();
  const rank: UserRank = getUserRank(rewards.points);
  const level = getLevel(rewards.points);
  const panelRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<ProfileData>(loadProfile);
  const [editingPseudo, setEditingPseudo] = useState(false);
  const [pseudoInput, setPseudoInput] = useState(rewards.pseudo);
  const { user, getAccessToken } = useAuth();
  const [notifPrefs, setNotifPrefs] = useState<NotificationPrefs>({ email_badges: true, email_weekly: true });
  const [sharingFavs, setSharingFavs] = useState(false);
  const [mascotCustom, setMascotCustom] = useState<MascotCustomization>(loadMascotCustomization);
  const [showCustomizer, setShowCustomizer] = useState(false);

  useEffect(() => {
    if (user) {
      getAccessToken().then((token) => {
        if (token) {
          fetchNotificationPrefs(token).then(setNotifPrefs);
          getSharingStatus(token).then(setSharingFavs);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("[data-no-panel-close]")) return;
      if (panelRef.current && !panelRef.current.contains(target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleColorChange(color: string) {
    const updated = { ...profile, avatarColor: color };
    setProfile(updated);
    saveProfile(updated);
  }

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert(t("profile.photoTooBig"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const updated = { ...profile, avatarPhoto: reader.result as string };
      setProfile(updated);
      saveProfile(updated);
    };
    reader.readAsDataURL(file);
  }

  function handleRemovePhoto() {
    const updated = { ...profile, avatarPhoto: null };
    setProfile(updated);
    saveProfile(updated);
  }

  function handlePseudoSave() {
    const trimmed = pseudoInput.trim();
    if (trimmed) {
      onPseudoChange(trimmed);
    }
    setEditingPseudo(false);
  }

  function handleMascotChange(custom: MascotCustomization) {
    setMascotCustom(custom);
    saveMascotCustomization(custom);
    onMascotChange?.(custom);
  }

  const allTiers = TIERS;

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-[calc(100vw-24px)] sm:w-[420px] bg-sf-card border border-sf-border
                 rounded-sf-lg shadow-sf-lg z-[200] overflow-hidden animate-fade-in-up"
      style={{ animationDuration: "0.2s" }}
    >
      {/* Header — Mascot + Info side by side */}
      <div
        className="p-5 pb-4"
        style={{ background: "linear-gradient(135deg, var(--sf-gold-light), var(--sf-accent-pale))" }}
      >
        <div className="flex items-start gap-4">
          {/* Mascot (clickable to toggle customizer) */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            <button
              onClick={() => setShowCustomizer(!showCustomizer)}
              className="relative group rounded-xl p-1 transition-all hover:bg-white/30"
              title={t("mascot.customize")}
            >
              <Mascot size={100} customization={mascotCustom} />
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-sf-accent text-white
                              flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
            </button>
          </div>

          {/* Right side: avatar + pseudo + rank */}
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center gap-2.5 mb-1">
              {/* Small avatar */}
              <div className="relative group flex-shrink-0">
                {profile.avatarPhoto ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img src={profile.avatarPhoto} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center
                                text-white text-base font-bold border-2 border-white shadow-md"
                    style={{ background: profile.avatarColor }}
                  >
                    {rewards.pseudo.charAt(0).toUpperCase()}
                  </div>
                )}
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40
                             flex items-center justify-center opacity-0 group-hover:opacity-100
                             transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </button>
                <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </div>

              {/* Pseudo */}
              <div className="flex-1 min-w-0">
                {editingPseudo ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={pseudoInput}
                      onChange={(e) => setPseudoInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handlePseudoSave()}
                      aria-label="Pseudo"
                      className="text-base font-semibold text-sf-text bg-sf-card/80 border border-sf-border
                                 rounded-sf-sm px-2 py-0.5 outline-none focus:border-sf-accent w-full"
                      autoFocus
                    />
                    <button onClick={handlePseudoSave} className="text-sf-accent hover:text-sf-accent-light transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingPseudo(true)}
                    className="text-base font-semibold text-sf-text hover:text-sf-accent
                               transition-colors text-left flex items-center gap-1.5"
                  >
                    {rewards.pseudo}
                    <svg className="w-3 h-3 text-sf-text-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="text-sm text-sf-gold font-semibold">{t(rank.titleKey)}</div>
            <div className="text-xs text-sf-text-secondary">
              {t("stats.tier", { palier: rank.palier })} &middot; {t("stats.level", { level: rank.level })} &middot;{" "}
              {t("nav.pts", { pts: rewards.points })}
            </div>

            {/* Photo actions + Color picker inline */}
            <div className="flex items-center gap-2 mt-2">
              {profile.avatarPhoto && (
                <button onClick={handleRemovePhoto} className="text-[10px] text-sf-text-light hover:text-red-500 transition-colors">
                  {t("profile.removePhoto")}
                </button>
              )}
            </div>
            <div className="mt-2">
              <div className="text-[9px] font-semibold uppercase tracking-wider text-sf-text-light mb-1">
                {t("profile.colorLabel")}
              </div>
              <div className="flex gap-1.5">
                {AVATAR_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110
                               ${profile.avatarColor === color ? "border-sf-text scale-110" : "border-transparent"}`}
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mascot Customizer (collapsible) */}
        {showCustomizer && (
          <div className="mt-4 pt-3 border-t border-white/30">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light mb-2">
              {t("mascot.customize")}
            </div>
            <MascotCustomizer
              customization={mascotCustom}
              userTier={rank.palier}
              onChange={handleMascotChange}
            />
          </div>
        )}
      </div>

      {/* Badges + Tiers */}
      <div className="p-5 pt-4 max-h-[400px] overflow-y-auto">
        {/* Badges */}
        {(() => {
          const badges = computeBadges(rewards.points);
          const unlocked = badges.filter((b) => b.unlocked).length;
          return (
            <div className="mb-5">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light mb-2.5">
                {t("badge.title", { unlocked, total: badges.length })}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`relative rounded-sf-sm p-2.5 text-center transition-all
                               ${badge.unlocked
                                 ? "bg-sf-accent-pale border border-sf-accent/20"
                                 : "bg-sf-bg border border-sf-border opacity-50"
                               }`}
                    title={badge.unlocked ? t(badge.descKey) : t("badge.locked")}
                  >
                    <div className={`text-xl ${badge.unlocked ? "" : "grayscale"}`}>{badge.emoji}</div>
                    <div className={`text-[10px] font-medium mt-1 leading-tight
                                    ${badge.unlocked ? "text-sf-text" : "text-sf-text-light"}`}>
                      {t(badge.titleKey)}
                    </div>
                    {!badge.unlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-4 h-4 text-sf-text-light/40" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Friends */}
        {user && (
          <div className="mb-5">
            <FriendsPanel />
          </div>
        )}

        {/* Tiers progression */}
        <div className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light mb-3">
          {t("profile.tierProgress")}
        </div>

        <div className="space-y-1">
          {allTiers.map((tier) => {
            const isCompleted = level > tier.maxLevel;
            const isCurrent = level >= tier.minLevel && level <= tier.maxLevel;
            const isLocked = level < tier.minLevel;

            let tierProgress = 0;
            if (isCompleted) tierProgress = 100;
            else if (isCurrent) {
              const range = tier.maxLevel - tier.minLevel + 1;
              tierProgress = Math.round(((level - tier.minLevel) / range) * 100);
            }

            return (
              <div
                key={tier.palier}
                className={`rounded-sf-sm p-3 transition-colors
                           ${isCurrent ? "bg-sf-accent-pale border border-sf-accent/20" : ""}
                           ${isLocked ? "opacity-50" : ""}`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                               text-[11px] font-bold
                               ${isCompleted ? "bg-sf-success text-white" : ""}
                               ${isCurrent ? "bg-sf-accent text-white" : ""}
                               ${isLocked ? "bg-sf-border text-sf-text-light" : ""}`}
                  >
                    {isCompleted ? (
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      tier.palier
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[13px] font-semibold truncate
                                       ${isCurrent ? "text-sf-accent" : "text-sf-text"}`}>
                        {t(tier.titleKey)}
                      </span>
                      <span className="text-[10px] text-sf-text-light flex-shrink-0">
                        {t("profile.levelRange", { min: tier.minLevel, max: tier.maxLevel })}
                      </span>
                    </div>
                    {(isCurrent || isCompleted) && (
                      <div className="mt-1.5 h-1 bg-sf-border rounded-full overflow-hidden">
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Sharing & Notification preferences */}
      {user && (
        <div className="px-5 py-3 border-t border-sf-border">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light mb-2.5">
            {t("profile.sharing")}
          </div>
          <div className="mb-4">
            <label className="flex items-center justify-between gap-2 cursor-pointer">
              <span className="text-xs text-sf-text-secondary">{t("profile.shareFavorites")}</span>
              <button
                onClick={() => {
                  const newVal = !sharingFavs;
                  setSharingFavs(newVal);
                  getAccessToken().then((token) => {
                    if (token) {
                      toggleSharingFavorites(token, newVal);
                      if (newVal && favorites.length > 0) {
                        syncFavorites(token, favorites);
                      }
                    }
                  });
                }}
                className={`relative w-9 h-5 rounded-full transition-colors
                           ${sharingFavs ? "bg-sf-accent" : "bg-sf-border"}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform
                                 ${sharingFavs ? "left-[18px]" : "left-0.5"}`} />
              </button>
            </label>
            {sharingFavs && (
              <p className="text-[10px] text-sf-text-light mt-1">{t("profile.shareFavoritesHint")}</p>
            )}
          </div>

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
                      if (token) updateNotificationPrefs(token, updated);
                    });
                  }}
                  className={`relative w-9 h-5 rounded-full transition-colors
                             ${notifPrefs[key] ? "bg-sf-accent" : "bg-sf-border"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform
                                   ${notifPrefs[key] ? "left-[18px]" : "left-0.5"}`} />
                </button>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Footer stats */}
      <div className="px-5 py-3 border-t border-sf-border bg-sf-bg/50 flex items-center justify-between text-[11px] text-sf-text-light">
        <span>{t("profile.weekStats", { pts: rewards.weeklyPoints })}</span>
        {rewards.city && <span>{rewards.city}</span>}
      </div>
    </div>
  );
}
