"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useT } from "@/lib/i18n";
import {
  searchUsers,
  sendFriendRequest,
  respondFriendRequest,
  fetchFriends,
  fetchPendingRequests,
  removeFriend,
  type Friend,
  type PendingRequest,
  type FriendUser,
} from "@/lib/api";
import { getUserRank } from "@/lib/gamification";

export default function FriendsPanel() {
  const { t } = useT();
  const { user, getAccessToken } = useAuth();

  const [friends, setFriends] = useState<Friend[]>([]);
  const [pending, setPending] = useState<PendingRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FriendUser[]>([]);
  const [searching, setSearching] = useState(false);
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [showSearch, setShowSearch] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Load friends and pending requests
  useEffect(() => {
    if (!user) return;
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function loadData() {
    const token = await getAccessToken();
    if (!token) return;
    const [f, p] = await Promise.all([
      fetchFriends(token),
      fetchPendingRequests(token),
    ]);
    setFriends(f);
    setPending(p);
  }

  // Search with debounce
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      const token = await getAccessToken();
      if (token) {
        const results = await searchUsers(searchQuery, token);
        setSearchResults(results);
      }
      setSearching(false);
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  async function handleSendRequest(userId: string) {
    const token = await getAccessToken();
    if (!token) return;
    const ok = await sendFriendRequest(userId, token);
    if (ok) {
      setSentIds((prev) => new Set(prev).add(userId));
    }
  }

  async function handleRespond(friendshipId: string, accept: boolean) {
    const token = await getAccessToken();
    if (!token) return;
    const ok = await respondFriendRequest(friendshipId, accept, token);
    if (ok) {
      setPending((prev) => prev.filter((p) => p.friendship_id !== friendshipId));
      if (accept) loadData();
    }
  }

  async function handleRemove(friendshipId: string) {
    const token = await getAccessToken();
    if (!token) return;
    const ok = await removeFriend(friendshipId, token);
    if (ok) {
      setFriends((prev) => prev.filter((f) => f.friendship_id !== friendshipId));
    }
  }

  if (!user) return null;

  return (
    <div>
      {/* Header with friend count + add button */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light">
          {t("friends.title", { count: friends.length })}
        </div>
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="text-xs text-sf-accent hover:text-sf-accent-light transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            {showSearch ? (
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            )}
          </svg>
          {showSearch ? t("friends.close") : t("friends.add")}
        </button>
      </div>

      {/* Pending requests */}
      {pending.length > 0 && (
        <div className="mb-3">
          <div className="text-[10px] font-medium text-sf-gold mb-1.5">
            {t("friends.pending", { count: pending.length })}
          </div>
          <div className="space-y-1.5">
            {pending.map((req) => (
              <div
                key={req.friendship_id}
                className="flex items-center justify-between p-2 rounded-sf-sm bg-sf-gold-light border border-sf-gold/20"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-sf-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {req.pseudo.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-sf-text truncate">{req.pseudo}</div>
                    <div className="text-[10px] text-sf-text-light">
                      {getUserRank(req.total_points).palier > 1
                        ? t(`tier.${getUserRank(req.total_points).palier}`)
                        : `${req.total_points} pts`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleRespond(req.friendship_id, true)}
                    className="w-7 h-7 rounded-full bg-sf-success text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                    title={t("friends.accept")}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleRespond(req.friendship_id, false)}
                    className="w-7 h-7 rounded-full bg-sf-border text-sf-text-light flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition-colors"
                    title={t("friends.reject")}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search box */}
      {showSearch && (
        <div className="mb-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("friends.searchPlaceholder")}
            className="w-full text-xs bg-sf-bg border border-sf-border rounded-sf-sm px-3 py-2
                       outline-none focus:border-sf-accent text-sf-text placeholder:text-sf-text-light"
            autoFocus
          />
          {searching && (
            <div className="text-[10px] text-sf-text-light mt-1">{t("friends.searching")}</div>
          )}
          {searchResults.length > 0 && (
            <div className="mt-1.5 space-y-1">
              {searchResults.map((u) => {
                const alreadyFriend = friends.some((f) => f.user_id === u.user_id);
                const alreadySent = sentIds.has(u.user_id);
                return (
                  <div
                    key={u.user_id}
                    className="flex items-center justify-between p-2 rounded-sf-sm bg-sf-bg border border-sf-border"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-sf-accent-light flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {u.pseudo.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-sf-text truncate">{u.pseudo}</div>
                        <div className="text-[10px] text-sf-text-light">
                          {u.city ? `${u.city} - ` : ""}{u.total_points} pts
                        </div>
                      </div>
                    </div>
                    {alreadyFriend ? (
                      <span className="text-[10px] text-sf-success font-medium">{t("friends.alreadyFriend")}</span>
                    ) : alreadySent ? (
                      <span className="text-[10px] text-sf-text-light">{t("friends.requestSent")}</span>
                    ) : (
                      <button
                        onClick={() => handleSendRequest(u.user_id)}
                        className="text-[10px] text-sf-accent hover:text-sf-accent-light font-medium transition-colors"
                      >
                        {t("friends.addBtn")}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {searchQuery.length >= 2 && !searching && searchResults.length === 0 && (
            <div className="text-[10px] text-sf-text-light mt-1.5">{t("friends.noResults")}</div>
          )}
        </div>
      )}

      {/* Friends list */}
      {friends.length === 0 ? (
        <div className="text-xs text-sf-text-light text-center py-3">
          {t("friends.empty")}
        </div>
      ) : (
        <div className="space-y-1.5">
          {friends.map((friend) => (
            <div
              key={friend.friendship_id}
              className="flex items-center justify-between p-2 rounded-sf-sm hover:bg-sf-bg transition-colors group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-sf-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {friend.pseudo.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-sf-text truncate">{friend.pseudo}</div>
                  <div className="text-[10px] text-sf-text-light">
                    {friend.city ? `${friend.city} - ` : ""}{friend.total_points} pts
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemove(friend.friendship_id)}
                className="opacity-0 group-hover:opacity-100 text-sf-text-light hover:text-red-500 transition-all"
                title={t("friends.remove")}
              >
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
