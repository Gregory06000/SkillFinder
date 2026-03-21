-- Add locale column to notification_preferences
-- Run this in Supabase SQL Editor

ALTER TABLE notification_preferences
ADD COLUMN IF NOT EXISTS locale TEXT NOT NULL DEFAULT 'fr';
