-- =============================================
-- Colonne avatar_color dans user_profiles
-- Couleur d'avatar synchronisee depuis le profil
-- =============================================

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS avatar_color TEXT DEFAULT NULL;
