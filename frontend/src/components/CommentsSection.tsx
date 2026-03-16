"use client";

import { useState, useEffect, useCallback } from "react";
import type { User } from "@supabase/supabase-js";
import { fetchComments, postComment, deleteComment, reportComment, type SkillComment } from "@/lib/api";
import { useT } from "@/lib/i18n";

const MAX_CHARS = 280;
const DISPLAY_LIMIT = 20;

function timeAgo(dateStr: string, t: (k: string, v?: Record<string, string | number>) => string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return t("comments.justNow");
  if (mins < 60) return t("comments.minutesAgo", { count: mins });
  const hours = Math.floor(mins / 60);
  if (hours < 24) return t("comments.hoursAgo", { count: hours });
  const days = Math.floor(hours / 24);
  return t("comments.daysAgo", { count: days });
}

interface CommentsSectionProps {
  placeId: string;
  keyword: string;
  user: User | null;
  pseudo: string;
  getAccessToken: () => Promise<string | null>;
  userId?: string;
}

export default function CommentsSection({
  placeId,
  keyword,
  user,
  pseudo,
  getAccessToken,
  userId,
}: CommentsSectionProps) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<SkillComment[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [reported, setReported] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  // The current user's own comment (if any)
  const myComment = userId ? comments.find((c) => c.user_id === userId) : undefined;

  const load = useCallback(async () => {
    setLoading(true);
    const { comments: data, has_more } = await fetchComments(placeId, keyword, 0);
    setComments(data);
    setHasMore(has_more);
    setOffset(data.length);
    setLoading(false);
  }, [placeId, keyword]);

  // Load on mount so the toggle button shows the correct count immediately
  useEffect(() => {
    load();
  }, [load]);

  // Pre-fill the textarea with the user's existing comment when found
  useEffect(() => {
    if (myComment) {
      setDraft(myComment.content);
    }
  }, [myComment?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleLoadMore() {
    setLoadingMore(true);
    const { comments: more, has_more } = await fetchComments(placeId, keyword, offset);
    setComments((prev) => [...prev, ...more]);
    setHasMore(has_more);
    setOffset((o) => o + more.length);
    setLoadingMore(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    const token = await getAccessToken();
    if (!token) {
      setError(t("comments.authError"));
      setSubmitting(false);
      return;
    }
    const created = await postComment(placeId, keyword, draft.trim(), token);
    if (!created) {
      setError(t("comments.submitError"));
    } else {
      setComments((prev) => [created, ...prev.filter((c) => c.user_id !== userId)]);
      setOffset((o) => o + (myComment ? 0 : 1));
    }
    setSubmitting(false);
  }

  async function handleDelete(commentId: string) {
    setDeleting(commentId);
    const token = await getAccessToken();
    if (!token) { setDeleting(null); return; }
    const ok = await deleteComment(commentId, token);
    if (ok) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setOffset((o) => Math.max(0, o - 1));
      setDraft("");
    }
    setDeleting(null);
  }

  async function handleReport(commentId: string) {
    const token = await getAccessToken();
    if (!token) return;
    const ok = await reportComment(commentId, token);
    if (ok) setReported((prev) => new Set(prev).add(commentId));
  }

  // Sorted list: own comment first, then others
  const sortedComments = myComment
    ? [myComment, ...comments.filter((c) => c.user_id !== userId)]
    : comments;

  const charsLeft = MAX_CHARS - draft.length;
  const isEditing = !!myComment;

  return (
    <div className="mt-3" onClick={(e) => e.stopPropagation()}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-[12px] text-sf-text-light hover:text-sf-accent transition-colors"
      >
        <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        <span>
          {t("comments.toggle", { count: comments.length })}
          {hasMore && <span className="text-[10px] text-sf-text-light">+</span>}
        </span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="mt-2 space-y-3">
          {/* Write / edit form — logged in users */}
          {user ? (
            <form onSubmit={handleSubmit} className="space-y-1.5">
              {isEditing && (
                <p className="text-[10px] text-sf-text-light italic flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  {t("comments.editHint")}
                </p>
              )}
              <div className="relative">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value.slice(0, MAX_CHARS))}
                  placeholder={t("comments.placeholder", { keyword })}
                  aria-label={t("comments.placeholder", { keyword })}
                  rows={2}
                  className="w-full text-[12px] border border-sf-border rounded-sf-sm px-3 py-2
                             outline-none focus:border-sf-accent/50 resize-none
                             placeholder:text-sf-text-light/60 text-sf-text"
                />
                <span className={`absolute bottom-2 right-2 text-[10px] ${charsLeft < 30 ? "text-orange-400" : "text-sf-text-light"}`}>
                  {charsLeft}
                </span>
              </div>
              {error && <p className="text-[11px] text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={!draft.trim() || submitting}
                className="text-[11px] font-semibold px-3 py-1 rounded-full bg-sf-accent text-white
                           hover:bg-sf-accent-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting
                  ? t("comments.sending")
                  : isEditing
                    ? t("comments.update")
                    : t("comments.submit")}
              </button>
            </form>
          ) : (
            <p className="text-[11px] text-sf-text-light italic">
              {t("comments.loginPrompt")}
            </p>
          )}

          {/* Comments list */}
          {loading ? (
            <p className="text-[11px] text-sf-text-light">{t("comments.loading")}</p>
          ) : sortedComments.length === 0 ? (
            <p className="text-[11px] text-sf-text-light italic">{t("comments.empty")}</p>
          ) : (
            <>
              <ul className={`space-y-2 ${sortedComments.length > 5 ? "max-h-64 overflow-y-auto pr-1" : ""}`}>
                {sortedComments.map((c) => {
                  const isMine = c.user_id === userId;
                  return (
                    <li
                      key={c.id}
                      className={`rounded-sf-sm px-3 py-2 ${isMine ? "bg-sf-accent-pale border border-sf-accent/20" : "bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-[11px] font-semibold ${isMine ? "text-sf-accent" : "text-sf-text"}`}>
                          {c.pseudo}
                          {isMine && (
                            <span className="ml-1.5 text-[9px] font-normal opacity-70">
                              {t("comments.myComment")}
                            </span>
                          )}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-sf-text-light">{timeAgo(c.created_at, t)}</span>
                          {isMine ? (
                            <button
                              onClick={() => handleDelete(c.id)}
                              disabled={deleting === c.id}
                              aria-label={t("comments.delete")}
                              className="text-sf-text-light hover:text-red-500 transition-colors disabled:opacity-40"
                            >
                              {deleting === c.id ? (
                                <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                </svg>
                              ) : (
                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                  <path d="M10 11v6M14 11v6" />
                                  <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                </svg>
                              )}
                            </button>
                          ) : user && (
                            <button
                              onClick={() => handleReport(c.id)}
                              disabled={reported.has(c.id)}
                              aria-label={t("comments.report")}
                              className={`transition-colors ${reported.has(c.id) ? "text-orange-400 cursor-default" : "text-sf-text-light hover:text-orange-500"}`}
                              title={reported.has(c.id) ? t("comments.reported") : t("comments.report")}
                            >
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                                <line x1="4" y1="22" x2="4" y2="15" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-[12px] text-sf-text-secondary leading-relaxed">{c.content}</p>
                    </li>
                  );
                })}
              </ul>
              {hasMore && (
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="w-full text-[11px] text-sf-text-light hover:text-sf-accent transition-colors
                             py-1 border border-sf-border rounded-sf-sm hover:border-sf-accent/30
                             disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loadingMore ? t("comments.loading") : t("comments.loadMore")}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
