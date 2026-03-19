-- Table de préférences de notification
-- A exécuter dans le SQL Editor de Supabase

CREATE TABLE IF NOT EXISTS notification_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email_badges BOOLEAN NOT NULL DEFAULT TRUE,
  email_weekly BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- L'utilisateur peut lire ses propres préférences
CREATE POLICY "Users can read own notification preferences"
  ON notification_preferences FOR SELECT
  USING (auth.uid() = user_id);

-- L'utilisateur peut modifier ses propres préférences
CREATE POLICY "Users can upsert own notification preferences"
  ON notification_preferences FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_notification_preferences_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_notification_preferences_updated_at
  BEFORE UPDATE ON notification_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_notification_preferences_timestamp();
