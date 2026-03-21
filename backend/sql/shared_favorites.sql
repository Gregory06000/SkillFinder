-- =============================================
-- Table: shared_favorites
-- Partage de favoris entre amis SkillFinder
-- =============================================

CREATE TABLE IF NOT EXISTS shared_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL DEFAULT '',
  match_score REAL NOT NULL DEFAULT 0,
  global_rating REAL NOT NULL DEFAULT 0,
  photo_name TEXT DEFAULT '',
  maps_url TEXT DEFAULT '',
  added_at BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, name)
);

CREATE INDEX IF NOT EXISTS idx_shared_favorites_user ON shared_favorites(user_id);

ALTER TABLE shared_favorites ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut voir les favoris partages (filtrage par amitie cote backend)
CREATE POLICY "Shared favorites are viewable"
  ON shared_favorites FOR SELECT
  USING (true);

-- Un utilisateur ne peut gerer que ses propres favoris
CREATE POLICY "Users can insert own favorites"
  ON shared_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own favorites"
  ON shared_favorites FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON shared_favorites FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- Colonne sharing_favorites dans user_profiles
-- =============================================

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS sharing_favorites BOOLEAN NOT NULL DEFAULT false;
