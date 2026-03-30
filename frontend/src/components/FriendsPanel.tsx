"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useT } from "@/lib/i18n";
import {
  fetchFriendCode,
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
  const [friendCode, setFriendCode] = useState<string | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [searchResult, setSearchResult] = useState<FriendUser | null>(null);
  const [searchError, setSearchError] = useState("");
  const [searching, setSearching] = useState(false);
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [showSearch, setShowSearch] = useState(false);

  // Load friends, pending requests, and friend code
  useEffect(() => {
    if (!user) return;
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function loadData() {
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
  }

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
    if (!token) {
      setSearching(false);
      return;
    }

    const results = await searchUsers(code, token);
    if (results.length > 0) {
      setSearchResult(results[0]);
    } else {
      setSearchError(t("friends.codeNotFound"));
    }
    setSearching(false);
  }

  async function handleSendRequest(userId: string) {
    const token = await getAccessToken();
    if (!token) return;
    const ok = await sendFriendRequest(userId, token);
    if (ok) {
      setSentIds((prev) => new Set(prev).add(userId));
      loadData();
    } else {
      setSearchError(t("friends.requestError"));
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
      {/* My friend code */}
      {friendCode && (
        <div className="mb-3 p-2.5 rounded-sf-sm bg-sf-bg border border-sf-border">
          <div className="text-[10px] text-sf-text-light mb-1">{t("friends.myCode")}</div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono font-bold text-sf-accent tracking-wider">{friendCode}</span>
            <button
              onClick={handleCopyCode}
              className="text-[10px] text-sf-text-light hover:text-sf-accent transition-colors flex items-center gap-1"
            >
              {codeCopied ? (
                <>
                  <svg className="w-3.5 h-3.5 text-sf-success" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t("friends.copied")}
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
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

      {/* Header with friend count + add button */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light">
          {t("friends.title", { count: friends.length })}
        </div>
        <button
          onClick={() => { setShowSearch(!showSearch); setSearchResult(null); setSearchError(""); setCodeInput(""); }}
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
            {t("friends.pending", { count: pending.length, plural: pending.length > 1 ? "s" : "" })}
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

      {/* Add friend by code */}
      {showSearch && (
        <div className="mb-3">
          <div className="flex gap-1.5">
            <input
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleSearchByCode()}
              placeholder={t("friends.codePlaceholder")}
              className="flex-1 text-xs font-mono bg-sf-bg border border-sf-border rounded-sf-sm px-3 py-2
                         outline-none focus:border-sf-accent text-sf-text placeholder:text-sf-text-light tracking-wider"
              autoFocus
              maxLength={9}
            />
            <button
              onClick={handleSearchByCode}
              disabled={codeInput.trim().length < 2 || searching}
              className="px-3 py-2 text-xs font-medium bg-sf-accent text-white rounded-sf-sm
                         hover:bg-sf-accent-light transition-colors disabled:opacity-50"
            >
              {searching ? "..." : t("friends.search")}
            </button>
          </div>

          {searchError && (
            <div className="text-[10px] text-red-500 mt-1.5">{searchError}</div>
          )}

          {searchResult && (
            <div className="mt-1.5 flex items-center justify-between p-2 rounded-sf-sm bg-sf-bg border border-sf-border">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-sf-accent-light flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {searchResult.pseudo.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-sf-text truncate">{searchResult.pseudo}</div>
                  <div className="text-[10px] text-sf-text-light">
                    {searchResult.city ? `${searchResult.city} - ` : ""}{searchResult.total_points} pts
                  </div>
                </div>
              </div>
              {friends.some((f) => f.user_id === searchResult.user_id) ? (
                <span className="text-[10px] text-sf-success font-medium">{t("friends.alreadyFriend")}</span>
              ) : sentIds.has(searchResult.user_id) ? (
                <span className="text-[10px] text-sf-text-light">{t("friends.requestSent")}</span>
              ) : (
                <button
                  onClick={() => handleSendRequest(searchResult.user_id)}
                  className="text-[10px] text-sf-accent hover:text-sf-accent-light font-medium transition-colors"
                >
                  {t("friends.addBtn")}
                </button>
              )}
            </div>
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
