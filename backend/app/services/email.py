"""
SkillFinder Email Notifications — Resend integration.

Set RESEND_API_KEY in environment to activate.
Emails are silently skipped when the key is missing.
"""

import os
import logging
from typing import Literal

import httpx

logger = logging.getLogger("skillfinder.email")

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
FROM_EMAIL = os.environ.get("EMAIL_FROM", "SkillFinder <noreply@skillfinder.fr>")
RESEND_URL = "https://api.resend.com/emails"


def is_enabled() -> bool:
    return bool(RESEND_API_KEY)


async def send_email(to: str, subject: str, html: str) -> bool:
    """Send an email via Resend API. Returns True on success."""
    if not RESEND_API_KEY:
        logger.debug("Email skipped (RESEND_API_KEY not set): %s -> %s", subject, to)
        return False

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.post(
                RESEND_URL,
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "from": FROM_EMAIL,
                    "to": [to],
                    "subject": subject,
                    "html": html,
                },
            )
            if resp.status_code in (200, 201):
                logger.info("Email sent: %s -> %s", subject, to)
                return True
            logger.warning("Resend error %s: %s", resp.status_code, resp.text)
            return False
    except Exception as e:
        logger.error("Email send failed: %s", e)
        return False


# ── Multilingual translations ──────────────────────────────

_TRANSLATIONS: dict[str, dict[str, str]] = {
    "fr": {
        "welcome_subject": "Bienvenue sur SkillFinder, {pseudo} !",
        "welcome_title": "Bienvenue, {pseudo} !",
        "welcome_intro": "Votre compte SkillFinder est prêt. Vous pouvez maintenant :",
        "welcome_vote": "Voter sur les commerces et gagner des points",
        "welcome_review": "Laisser des avis communautaires",
        "welcome_rank": "Apparaître dans le classement de votre ville",
        "welcome_badges": "Débloquer des badges",
        "welcome_cta": "Commencer",
        "badge_subject": "Nouveau badge débloqué : {badge_name} !",
        "badge_title": "Bravo {pseudo} !",
        "badge_text": "Vous avez débloqué le badge <strong style=\"color: #C45D3E;\">{badge_name}</strong>. Continuez à contribuer pour en débloquer d'autres !",
        "badge_cta": "Voir mes badges",
        "weekly_subject": "Votre semaine sur SkillFinder — +{weekly_points} pts",
        "weekly_title": "Résumé de la semaine",
        "weekly_intro": "Bonjour {pseudo}, voici votre activité cette semaine :",
        "weekly_points_label": "points cette semaine",
        "weekly_rank": "Vous êtes <strong>#{rank}</strong> à <strong>{city}</strong> cette semaine.",
        "weekly_no_city": "Continuez à voter pour apparaître dans le classement !",
        "weekly_cta": "Voir le classement",
        "footer_unsubscribe": "Pour ne plus recevoir ces emails,",
        "footer_click": "cliquez ici",
    },
    "en": {
        "welcome_subject": "Welcome to SkillFinder, {pseudo}!",
        "welcome_title": "Welcome, {pseudo}!",
        "welcome_intro": "Your SkillFinder account is ready. You can now:",
        "welcome_vote": "Vote on businesses and earn points",
        "welcome_review": "Leave community reviews",
        "welcome_rank": "Appear in your city's leaderboard",
        "welcome_badges": "Unlock badges",
        "welcome_cta": "Get started",
        "badge_subject": "New badge unlocked: {badge_name}!",
        "badge_title": "Well done {pseudo}!",
        "badge_text": "You unlocked the <strong style=\"color: #C45D3E;\">{badge_name}</strong> badge. Keep contributing to unlock more!",
        "badge_cta": "View my badges",
        "weekly_subject": "Your week on SkillFinder — +{weekly_points} pts",
        "weekly_title": "Weekly summary",
        "weekly_intro": "Hi {pseudo}, here's your activity this week:",
        "weekly_points_label": "points this week",
        "weekly_rank": "You are <strong>#{rank}</strong> in <strong>{city}</strong> this week.",
        "weekly_no_city": "Keep voting to appear in the leaderboard!",
        "weekly_cta": "View leaderboard",
        "footer_unsubscribe": "To stop receiving these emails,",
        "footer_click": "click here",
    },
    "es": {
        "welcome_subject": "Bienvenido a SkillFinder, {pseudo}!",
        "welcome_title": "Bienvenido, {pseudo}!",
        "welcome_intro": "Tu cuenta SkillFinder está lista. Ahora puedes:",
        "welcome_vote": "Votar negocios y ganar puntos",
        "welcome_review": "Dejar opiniones comunitarias",
        "welcome_rank": "Aparecer en la clasificación de tu ciudad",
        "welcome_badges": "Desbloquear insignias",
        "welcome_cta": "Empezar",
        "badge_subject": "Nueva insignia desbloqueada: {badge_name}!",
        "badge_title": "Bravo {pseudo}!",
        "badge_text": "Has desbloqueado la insignia <strong style=\"color: #C45D3E;\">{badge_name}</strong>. ¡Sigue contribuyendo para desbloquear más!",
        "badge_cta": "Ver mis insignias",
        "weekly_subject": "Tu semana en SkillFinder — +{weekly_points} pts",
        "weekly_title": "Resumen semanal",
        "weekly_intro": "Hola {pseudo}, aquí está tu actividad esta semana:",
        "weekly_points_label": "puntos esta semana",
        "weekly_rank": "Eres <strong>#{rank}</strong> en <strong>{city}</strong> esta semana.",
        "weekly_no_city": "¡Sigue votando para aparecer en la clasificación!",
        "weekly_cta": "Ver clasificación",
        "footer_unsubscribe": "Para dejar de recibir estos emails,",
        "footer_click": "haz clic aquí",
    },
    "de": {
        "welcome_subject": "Willkommen bei SkillFinder, {pseudo}!",
        "welcome_title": "Willkommen, {pseudo}!",
        "welcome_intro": "Dein SkillFinder-Konto ist bereit. Du kannst jetzt:",
        "welcome_vote": "Über Geschäfte abstimmen und Punkte sammeln",
        "welcome_review": "Community-Bewertungen abgeben",
        "welcome_rank": "In der Rangliste deiner Stadt erscheinen",
        "welcome_badges": "Abzeichen freischalten",
        "welcome_cta": "Loslegen",
        "badge_subject": "Neues Abzeichen freigeschaltet: {badge_name}!",
        "badge_title": "Bravo {pseudo}!",
        "badge_text": "Du hast das Abzeichen <strong style=\"color: #C45D3E;\">{badge_name}</strong> freigeschaltet. Mach weiter, um mehr freizuschalten!",
        "badge_cta": "Meine Abzeichen",
        "weekly_subject": "Deine Woche auf SkillFinder — +{weekly_points} Pkt",
        "weekly_title": "Wochenübersicht",
        "weekly_intro": "Hallo {pseudo}, hier ist deine Aktivität dieser Woche:",
        "weekly_points_label": "Punkte diese Woche",
        "weekly_rank": "Du bist <strong>#{rank}</strong> in <strong>{city}</strong> diese Woche.",
        "weekly_no_city": "Stimme weiter ab, um in der Rangliste zu erscheinen!",
        "weekly_cta": "Rangliste anzeigen",
        "footer_unsubscribe": "Um keine E-Mails mehr zu erhalten,",
        "footer_click": "hier klicken",
    },
    "pt": {
        "welcome_subject": "Bem-vindo ao SkillFinder, {pseudo}!",
        "welcome_title": "Bem-vindo, {pseudo}!",
        "welcome_intro": "Sua conta SkillFinder está pronta. Agora você pode:",
        "welcome_vote": "Votar em negócios e ganhar pontos",
        "welcome_review": "Deixar avaliações comunitárias",
        "welcome_rank": "Aparecer no ranking da sua cidade",
        "welcome_badges": "Desbloquear medalhas",
        "welcome_cta": "Começar",
        "badge_subject": "Nova medalha desbloqueada: {badge_name}!",
        "badge_title": "Parabéns {pseudo}!",
        "badge_text": "Você desbloqueou a medalha <strong style=\"color: #C45D3E;\">{badge_name}</strong>. Continue contribuindo para desbloquear mais!",
        "badge_cta": "Ver minhas medalhas",
        "weekly_subject": "Sua semana no SkillFinder — +{weekly_points} pts",
        "weekly_title": "Resumo semanal",
        "weekly_intro": "Olá {pseudo}, aqui está sua atividade desta semana:",
        "weekly_points_label": "pontos esta semana",
        "weekly_rank": "Você é <strong>#{rank}</strong> em <strong>{city}</strong> esta semana.",
        "weekly_no_city": "Continue votando para aparecer no ranking!",
        "weekly_cta": "Ver ranking",
        "footer_unsubscribe": "Para parar de receber estes emails,",
        "footer_click": "clique aqui",
    },
    "it": {
        "welcome_subject": "Benvenuto su SkillFinder, {pseudo}!",
        "welcome_title": "Benvenuto, {pseudo}!",
        "welcome_intro": "Il tuo account SkillFinder è pronto. Ora puoi:",
        "welcome_vote": "Votare le attività e guadagnare punti",
        "welcome_review": "Lasciare recensioni comunitarie",
        "welcome_rank": "Apparire nella classifica della tua città",
        "welcome_badges": "Sbloccare badge",
        "welcome_cta": "Inizia",
        "badge_subject": "Nuovo badge sbloccato: {badge_name}!",
        "badge_title": "Bravo {pseudo}!",
        "badge_text": "Hai sbloccato il badge <strong style=\"color: #C45D3E;\">{badge_name}</strong>. Continua a contribuire per sbloccarne altri!",
        "badge_cta": "Vedi i miei badge",
        "weekly_subject": "La tua settimana su SkillFinder — +{weekly_points} pts",
        "weekly_title": "Riepilogo settimanale",
        "weekly_intro": "Ciao {pseudo}, ecco la tua attività questa settimana:",
        "weekly_points_label": "punti questa settimana",
        "weekly_rank": "Sei <strong>#{rank}</strong> a <strong>{city}</strong> questa settimana.",
        "weekly_no_city": "Continua a votare per apparire nella classifica!",
        "weekly_cta": "Vedi classifica",
        "footer_unsubscribe": "Per non ricevere più queste email,",
        "footer_click": "clicca qui",
    },
    "nl": {
        "welcome_subject": "Welkom bij SkillFinder, {pseudo}!",
        "welcome_title": "Welkom, {pseudo}!",
        "welcome_intro": "Je SkillFinder-account is klaar. Je kunt nu:",
        "welcome_vote": "Stemmen op bedrijven en punten verdienen",
        "welcome_review": "Community-beoordelingen achterlaten",
        "welcome_rank": "Verschijnen in het klassement van je stad",
        "welcome_badges": "Badges ontgrendelen",
        "welcome_cta": "Aan de slag",
        "badge_subject": "Nieuwe badge ontgrendeld: {badge_name}!",
        "badge_title": "Goed gedaan {pseudo}!",
        "badge_text": "Je hebt de badge <strong style=\"color: #C45D3E;\">{badge_name}</strong> ontgrendeld. Blijf bijdragen om meer te ontgrendelen!",
        "badge_cta": "Mijn badges bekijken",
        "weekly_subject": "Je week op SkillFinder — +{weekly_points} pts",
        "weekly_title": "Weekoverzicht",
        "weekly_intro": "Hallo {pseudo}, hier is je activiteit deze week:",
        "weekly_points_label": "punten deze week",
        "weekly_rank": "Je bent <strong>#{rank}</strong> in <strong>{city}</strong> deze week.",
        "weekly_no_city": "Blijf stemmen om in het klassement te verschijnen!",
        "weekly_cta": "Klassement bekijken",
        "footer_unsubscribe": "Om deze e-mails niet meer te ontvangen,",
        "footer_click": "klik hier",
    },
}


def _t(locale: str, key: str) -> str:
    """Get a translation string for a given locale, falling back to French."""
    strings = _TRANSLATIONS.get(locale, _TRANSLATIONS["fr"])
    return strings.get(key, _TRANSLATIONS["fr"].get(key, key))


# ── Email templates ──────────────────────────────

def _base_template(content: str, locale: str = "fr") -> str:
    return f"""
    <div style="font-family: 'DM Sans', -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background: #C45D3E; color: white; font-weight: bold;
                    font-size: 14px; padding: 6px 10px; border-radius: 10px;">SF</div>
        <span style="font-size: 18px; font-weight: bold; color: #1A1714; margin-left: 8px; vertical-align: middle;">
          SkillFinder
        </span>
      </div>
      {content}
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E5E0D8;
                  text-align: center; font-size: 12px; color: #9C9690;">
        <a href="https://skillfinder.fr" style="color: #C45D3E; text-decoration: none;">skillfinder.fr</a>
        <br/>
        {_t(locale, "footer_unsubscribe")}
        <a href="https://skillfinder.fr?notifications=off" style="color: #C45D3E;">{_t(locale, "footer_click")}</a>.
      </div>
    </div>
    """


NotificationType = Literal["badge_unlocked", "weekly_summary", "welcome"]


def build_welcome_email(pseudo: str, locale: str = "fr") -> tuple[str, str]:
    """Returns (subject, html) for welcome email."""
    subject = _t(locale, "welcome_subject").format(pseudo=pseudo)
    content = f"""
    <h2 style="color: #1A1714; font-size: 22px; margin-bottom: 8px;">
      {_t(locale, "welcome_title").format(pseudo=pseudo)}
    </h2>
    <p style="color: #6B6560; font-size: 14px; line-height: 1.6;">
      {_t(locale, "welcome_intro")}
    </p>
    <ul style="color: #6B6560; font-size: 14px; line-height: 1.8; padding-left: 20px;">
      <li>{_t(locale, "welcome_vote")}</li>
      <li>{_t(locale, "welcome_review")}</li>
      <li>{_t(locale, "welcome_rank")}</li>
      <li>{_t(locale, "welcome_badges")}</li>
    </ul>
    <div style="text-align: center; margin-top: 24px;">
      <a href="https://skillfinder.fr" style="display: inline-block; background: #C45D3E; color: white;
         font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 14px; text-decoration: none;">
        {_t(locale, "welcome_cta")}
      </a>
    </div>
    """
    return subject, _base_template(content, locale)


def build_badge_email(pseudo: str, badge_name: str, badge_emoji: str, locale: str = "fr") -> tuple[str, str]:
    """Returns (subject, html) for badge unlock notification."""
    subject = _t(locale, "badge_subject").format(badge_name=badge_name)
    content = f"""
    <div style="text-align: center; margin-bottom: 16px;">
      <span style="font-size: 48px;">{badge_emoji}</span>
    </div>
    <h2 style="color: #1A1714; font-size: 20px; text-align: center; margin-bottom: 8px;">
      {_t(locale, "badge_title").format(pseudo=pseudo)}
    </h2>
    <p style="color: #6B6560; font-size: 14px; text-align: center; line-height: 1.6;">
      {_t(locale, "badge_text").format(badge_name=badge_name)}
    </p>
    <div style="text-align: center; margin-top: 24px;">
      <a href="https://skillfinder.fr" style="display: inline-block; background: #C45D3E; color: white;
         font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 14px; text-decoration: none;">
        {_t(locale, "badge_cta")}
      </a>
    </div>
    """
    return subject, _base_template(content, locale)


def build_weekly_summary(pseudo: str, weekly_points: int, rank_position: int, city: str, locale: str = "fr") -> tuple[str, str]:
    """Returns (subject, html) for weekly summary email."""
    subject = _t(locale, "weekly_subject").format(weekly_points=weekly_points)
    rank_text = (
        _t(locale, "weekly_rank").format(rank=rank_position, city=city)
        if city
        else _t(locale, "weekly_no_city")
    )
    content = f"""
    <h2 style="color: #1A1714; font-size: 20px; margin-bottom: 8px;">
      {_t(locale, "weekly_title")}
    </h2>
    <p style="color: #6B6560; font-size: 14px; margin-bottom: 16px;">
      {_t(locale, "weekly_intro").format(pseudo=pseudo)}
    </p>
    <div style="background: #FDF0EC; border-radius: 14px; padding: 20px; text-align: center; margin-bottom: 16px;">
      <div style="font-size: 32px; font-weight: bold; color: #C45D3E;">+{weekly_points}</div>
      <div style="font-size: 12px; color: #6B6560; text-transform: uppercase; letter-spacing: 1px;">{_t(locale, "weekly_points_label")}</div>
    </div>
    <p style="color: #6B6560; font-size: 14px; line-height: 1.6;">
      {rank_text}
    </p>
    <div style="text-align: center; margin-top: 24px;">
      <a href="https://skillfinder.fr" style="display: inline-block; background: #C45D3E; color: white;
         font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 14px; text-decoration: none;">
        {_t(locale, "weekly_cta")}
      </a>
    </div>
    """
    return subject, _base_template(content, locale)
