-- SkillFinder: Add authentication support to leaderboard
-- Run this in Supabase SQL Editor AFTER enabling Auth in the dashboard.

-- 1. Add user_id column to leaderboard (nullable to preserve existing rows)
ALTER TABLE leaderboard ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_user ON leaderboard (user_id);

-- 2. Enable RLS on leaderboard
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Anyone can read the leaderboard
CREATE POLICY "leaderboard_select_all" ON leaderboard
    FOR SELECT USING (true);

-- Authenticated users can only insert their own rows
CREATE POLICY "leaderboard_insert_own" ON leaderboard
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Authenticated users can only update their own rows
CREATE POLICY "leaderboard_update_own" ON leaderboard
    FOR UPDATE USING (auth.uid() = user_id);

-- 3. Enable RLS on verifications
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;

-- Anyone can insert votes (tracked by auth on the API level)
CREATE POLICY "verifications_insert_all" ON verifications
    FOR INSERT WITH CHECK (true);

-- Anyone can read verification stats
CREATE POLICY "verifications_select_all" ON verifications
    FOR SELECT USING (true);
