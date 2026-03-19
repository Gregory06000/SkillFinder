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


# ── Email templates ──────────────────────────────

def _base_template(content: str) -> str:
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
        Pour ne plus recevoir ces emails,
        <a href="https://skillfinder.fr?notifications=off" style="color: #C45D3E;">cliquez ici</a>.
      </div>
    </div>
    """


NotificationType = Literal["badge_unlocked", "weekly_summary", "welcome"]


def build_welcome_email(pseudo: str) -> tuple[str, str]:
    """Returns (subject, html) for welcome email."""
    subject = f"Bienvenue sur SkillFinder, {pseudo} !"
    content = f"""
    <h2 style="color: #1A1714; font-size: 22px; margin-bottom: 8px;">
      Bienvenue, {pseudo} !
    </h2>
    <p style="color: #6B6560; font-size: 14px; line-height: 1.6;">
      Votre compte SkillFinder est prêt. Vous pouvez maintenant :
    </p>
    <ul style="color: #6B6560; font-size: 14px; line-height: 1.8; padding-left: 20px;">
      <li>Voter sur les commerces et gagner des points</li>
      <li>Laisser des avis communautaires</li>
      <li>Apparaître dans le classement de votre ville</li>
      <li>Débloquer des badges</li>
    </ul>
    <div style="text-align: center; margin-top: 24px;">
      <a href="https://skillfinder.fr" style="display: inline-block; background: #C45D3E; color: white;
         font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 14px; text-decoration: none;">
        Commencer
      </a>
    </div>
    """
    return subject, _base_template(content)


def build_badge_email(pseudo: str, badge_name: str, badge_emoji: str) -> tuple[str, str]:
    """Returns (subject, html) for badge unlock notification."""
    subject = f"Nouveau badge débloqué : {badge_name} !"
    content = f"""
    <div style="text-align: center; margin-bottom: 16px;">
      <span style="font-size: 48px;">{badge_emoji}</span>
    </div>
    <h2 style="color: #1A1714; font-size: 20px; text-align: center; margin-bottom: 8px;">
      Bravo {pseudo} !
    </h2>
    <p style="color: #6B6560; font-size: 14px; text-align: center; line-height: 1.6;">
      Vous avez débloqué le badge <strong style="color: #C45D3E;">{badge_name}</strong>.
      Continuez à contribuer pour en débloquer d'autres !
    </p>
    <div style="text-align: center; margin-top: 24px;">
      <a href="https://skillfinder.fr" style="display: inline-block; background: #C45D3E; color: white;
         font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 14px; text-decoration: none;">
        Voir mes badges
      </a>
    </div>
    """
    return subject, _base_template(content)


def build_weekly_summary(pseudo: str, weekly_points: int, rank_position: int, city: str) -> tuple[str, str]:
    """Returns (subject, html) for weekly summary email."""
    subject = f"Votre semaine sur SkillFinder — +{weekly_points} pts"
    content = f"""
    <h2 style="color: #1A1714; font-size: 20px; margin-bottom: 8px;">
      Résumé de la semaine
    </h2>
    <p style="color: #6B6560; font-size: 14px; margin-bottom: 16px;">
      Bonjour {pseudo}, voici votre activité cette semaine :
    </p>
    <div style="background: #FDF0EC; border-radius: 14px; padding: 20px; text-align: center; margin-bottom: 16px;">
      <div style="font-size: 32px; font-weight: bold; color: #C45D3E;">+{weekly_points}</div>
      <div style="font-size: 12px; color: #6B6560; text-transform: uppercase; letter-spacing: 1px;">points cette semaine</div>
    </div>
    <p style="color: #6B6560; font-size: 14px; line-height: 1.6;">
      {"Vous êtes <strong>#" + str(rank_position) + "</strong> à <strong>" + city + "</strong> cette semaine." if city else "Continuez à voter pour apparaître dans le classement !"}
    </p>
    <div style="text-align: center; margin-top: 24px;">
      <a href="https://skillfinder.fr" style="display: inline-block; background: #C45D3E; color: white;
         font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 14px; text-decoration: none;">
        Voir le classement
      </a>
    </div>
    """
    return subject, _base_template(content)
