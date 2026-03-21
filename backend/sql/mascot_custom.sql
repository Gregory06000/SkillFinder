-- =============================================
-- Colonne mascot_custom dans user_profiles
-- Stocke la personnalisation de la mascotte (JSON)
-- =============================================

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS mascot_custom JSONB DEFAULT NULL;
