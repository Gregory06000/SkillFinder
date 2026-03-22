"use client";

import type { MascotCustomization } from "@/lib/mascotItems";
import { SCARF_COLORS, BOOT_COLORS, DEFAULT_CUSTOMIZATION } from "@/lib/mascotItems";

export type MascotPose = "default" | "search" | "sad" | "wave";

interface MascotProps {
  pose?: MascotPose;
  size?: number;
  className?: string;
  animate?: boolean;
  customization?: MascotCustomization;
}

// ══════════════════════════════════════════════
// ── Hat Variants ──
// ══════════════════════════════════════════════

function HatExplorer() {
  return (
    <g>
      <ellipse cx="100" cy="62" rx="52" ry="10" fill="#6B4226"/>
      <ellipse cx="100" cy="61" rx="52" ry="10" fill="#8B5E3C"/>
      <path d="M56 62 Q58 22 100 15 Q142 22 144 62" fill="#8B5E3C"/>
      <path d="M58 62 Q60 24 100 18 Q140 24 142 62" fill="#A67B4F" opacity="0.4"/>
      <rect x="62" y="52" width="76" height="10" rx="2" fill="#4A2E1A"/>
      <ellipse cx="86" cy="50" rx="10" ry="7" fill="#4A2E1A" stroke="#D4A853" strokeWidth="1.5"/>
      <ellipse cx="86" cy="50" rx="7" ry="5" fill="#8BAEC4" opacity="0.5"/>
      <ellipse cx="114" cy="50" rx="10" ry="7" fill="#4A2E1A" stroke="#D4A853" strokeWidth="1.5"/>
      <ellipse cx="114" cy="50" rx="7" ry="5" fill="#8BAEC4" opacity="0.5"/>
      <path d="M96 50 L104 50" stroke="#D4A853" strokeWidth="2"/>
      <text x="100" y="60" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="bold" fill="#D4A853" textAnchor="middle">SF</text>
    </g>
  );
}

function HatBeret() {
  return (
    <g>
      <ellipse cx="100" cy="66" rx="42" ry="8" fill="#2D2D2D"/>
      <path d="M60 66 Q65 35 100 28 Q135 35 140 66" fill="#C45D3E"/>
      <path d="M62 66 Q67 38 100 32 Q133 38 138 66" fill="#E85D3E" opacity="0.3"/>
      <circle cx="100" cy="28" r="4" fill="#C45D3E"/>
    </g>
  );
}

function HatBandana() {
  return (
    <g>
      <path d="M54 72 Q60 50 100 45 Q140 50 146 72" fill="#C45D3E"/>
      <path d="M56 72 Q62 52 100 48 Q138 52 144 72" fill="#E85D3E" opacity="0.5"/>
      <path d="M62 68 L138 68" stroke="#8B2020" strokeWidth="1.5" opacity="0.4"/>
      <path d="M130 55 Q145 60 148 78" fill="none" stroke="#C45D3E" strokeWidth="6" strokeLinecap="round"/>
      <path d="M132 57 Q147 62 150 80" fill="none" stroke="#A63030" strokeWidth="3" strokeLinecap="round"/>
    </g>
  );
}

function HatCap() {
  return (
    <g>
      <path d="M56 72 Q60 40 100 32 Q140 40 144 72" fill="#4A7FC4"/>
      <path d="M58 72 Q62 44 100 36 Q138 44 142 72" fill="#5B8FD4" opacity="0.4"/>
      <ellipse cx="100" cy="70" rx="46" ry="6" fill="#3A6BA8"/>
      <path d="M50 72 Q48 68 52 62 Q70 56 100 54" fill="#3A6BA8"/>
      <rect x="88" y="36" width="24" height="14" rx="3" fill="#D4A853" opacity="0.8"/>
      <text x="100" y="47" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">SF</text>
    </g>
  );
}

function HatBeanie() {
  return (
    <g>
      <ellipse cx="100" cy="66" rx="44" ry="8" fill="#3A7D5C"/>
      <path d="M58 66 Q60 30 100 22 Q140 30 142 66" fill="#3A7D5C"/>
      <path d="M60 66 Q62 34 100 26 Q138 34 140 66" fill="#4A9D6C" opacity="0.3"/>
      <rect x="58" y="56" width="84" height="12" rx="2" fill="#2E6A4A"/>
      <rect x="58" y="60" width="84" height="4" rx="1" fill="#3A7D5C"/>
      <circle cx="100" cy="20" r="6" fill="#3A7D5C"/>
    </g>
  );
}

function HatChef() {
  return (
    <g>
      <ellipse cx="100" cy="62" rx="42" ry="8" fill="#E8E8E8"/>
      <path d="M62 62 Q60 20 80 10 Q95 5 100 8 Q105 5 120 10 Q140 20 138 62" fill="#F5F5F5"/>
      <path d="M65 62 Q63 25 82 15 Q95 10 100 13 Q105 10 118 15 Q137 25 135 62" fill="white" opacity="0.6"/>
      <rect x="62" y="58" width="76" height="6" rx="2" fill="#E0E0E0"/>
    </g>
  );
}

function HatCowboy() {
  return (
    <g>
      <ellipse cx="100" cy="65" rx="56" ry="10" fill="#8B5E3C"/>
      <ellipse cx="100" cy="64" rx="56" ry="10" fill="#A67B4F"/>
      <path d="M62 64 Q65 30 80 25 Q100 38 120 25 Q135 30 138 64" fill="#8B5E3C"/>
      <path d="M64 64 Q67 34 82 29 Q100 40 118 29 Q133 34 136 64" fill="#A67B4F" opacity="0.4"/>
      <rect x="65" y="56" width="70" height="8" rx="2" fill="#6B4226"/>
      <rect x="92" y="56" width="16" height="8" rx="2" fill="#D4A853"/>
    </g>
  );
}

function HatFedora() {
  return (
    <g>
      <ellipse cx="100" cy="65" rx="52" ry="9" fill="#4A4A4A"/>
      <ellipse cx="100" cy="64" rx="52" ry="9" fill="#5A5A5A"/>
      <path d="M58 64 Q60 30 100 22 Q140 30 142 64" fill="#5A5A5A"/>
      <path d="M60 64 Q62 34 100 26 Q138 34 140 64" fill="#6A6A6A" opacity="0.4"/>
      <path d="M65 64 Q70 58 100 56 Q130 58 135 64" fill="#4A4A4A"/>
      <rect x="62" y="56" width="76" height="6" rx="2" fill="#3A3A3A"/>
      <rect x="62" y="57" width="76" height="4" rx="1" fill="#C45D3E"/>
    </g>
  );
}

function HatCrown() {
  return (
    <g>
      <path d="M60 68 L65 35 L80 52 L100 28 L120 52 L135 35 L140 68 Z" fill="#D4A853"/>
      <path d="M62 68 L67 38 L80 52 L100 32 L120 52 L133 38 L138 68 Z" fill="#E8C860" opacity="0.5"/>
      <rect x="60" y="62" width="80" height="8" rx="2" fill="#B8860B"/>
      <circle cx="80" cy="40" r="3.5" fill="#E85D3E"/>
      <circle cx="100" cy="32" r="3.5" fill="#4A7FC4"/>
      <circle cx="120" cy="40" r="3.5" fill="#3A7D5C"/>
    </g>
  );
}

function HatSailor() {
  return (
    <g>
      <ellipse cx="100" cy="66" rx="44" ry="8" fill="white"/>
      <path d="M58 66 Q60 38 100 30 Q140 38 142 66" fill="white"/>
      <path d="M60 66 Q62 42 100 34 Q138 42 140 66" fill="#F0F0FF" opacity="0.4"/>
      <rect x="58" y="56" width="84" height="10" rx="2" fill="#2C3E6B"/>
      <circle cx="100" cy="36" r="8" fill="#2C3E6B"/>
      <path d="M96 34 L100 28 L104 34" fill="none" stroke="white" strokeWidth="1.5"/>
      <circle cx="100" cy="36" r="2" fill="white"/>
    </g>
  );
}

function HatWizard() {
  return (
    <g>
      <ellipse cx="100" cy="68" rx="48" ry="8" fill="#4F46E5"/>
      <path d="M58 68 Q75 30 100 -5 Q125 30 142 68" fill="#4F46E5"/>
      <path d="M60 68 Q77 34 100 0 Q123 34 140 68" fill="#6366F1" opacity="0.3"/>
      <circle cx="85" cy="42" r="3" fill="#D4A853"/>
      <circle cx="110" cy="28" r="2.5" fill="#D4A853"/>
      <circle cx="95" cy="55" r="2" fill="#D4A853"/>
      <circle cx="120" cy="50" r="2.5" fill="#D4A853"/>
      <rect x="58" y="62" width="84" height="8" rx="2" fill="#3730A3"/>
    </g>
  );
}

function HatTophat() {
  return (
    <g>
      <ellipse cx="100" cy="62" rx="52" ry="8" fill="#1A1A1A"/>
      <rect x="68" y="15" width="64" height="48" rx="6" fill="#2D2D2D"/>
      <rect x="70" y="17" width="60" height="46" rx="5" fill="#363636" opacity="0.5"/>
      <rect x="68" y="52" width="64" height="8" rx="2" fill="#1A1A1A"/>
      <rect x="72" y="54" width="56" height="4" rx="1.5" fill="#D4A853"/>
    </g>
  );
}

function HatViking() {
  return (
    <g>
      <ellipse cx="100" cy="66" rx="46" ry="10" fill="#8B5E3C"/>
      <path d="M56 66 Q60 35 100 28 Q140 35 144 66" fill="#A67B4F"/>
      <path d="M58 66 Q62 38 100 32 Q138 38 142 66" fill="#C49A6C" opacity="0.3"/>
      <rect x="56" y="58" width="88" height="10" rx="2" fill="#6B4226"/>
      {/* Horns */}
      <path d="M56 56 Q40 35 35 15" fill="none" stroke="#F5F5F0" strokeWidth="6" strokeLinecap="round"/>
      <path d="M144 56 Q160 35 165 15" fill="none" stroke="#F5F5F0" strokeWidth="6" strokeLinecap="round"/>
    </g>
  );
}

function HatSheriff() {
  return (
    <g>
      <ellipse cx="100" cy="65" rx="54" ry="10" fill="#C49A6C"/>
      <ellipse cx="100" cy="64" rx="54" ry="10" fill="#D4A853"/>
      <path d="M60 64 Q62 32 100 24 Q138 32 140 64" fill="#C49A6C"/>
      <path d="M62 64 Q64 36 100 28 Q136 36 138 64" fill="#D4A853" opacity="0.4"/>
      <rect x="62" y="56" width="76" height="8" rx="2" fill="#A67B4F"/>
      {/* Star */}
      <polygon points="100,30 103,38 112,38 105,44 108,52 100,47 92,52 95,44 88,38 97,38" fill="#D4A853" stroke="#B8860B" strokeWidth="1"/>
    </g>
  );
}

function HatTurban() {
  return (
    <g>
      <path d="M56 72 Q58 30 100 20 Q142 30 144 72" fill="#F5F5F0"/>
      <path d="M58 72 Q60 34 100 24 Q140 34 142 72" fill="white" opacity="0.5"/>
      <path d="M60 55 Q80 48 100 50 Q120 48 140 55" fill="none" stroke="#E8E8E0" strokeWidth="3"/>
      <path d="M60 65 Q80 58 100 60 Q120 58 140 65" fill="none" stroke="#E8E8E0" strokeWidth="3"/>
      <ellipse cx="100" cy="30" rx="12" ry="10" fill="#D4A853"/>
      <circle cx="100" cy="30" r="4" fill="#E85D3E"/>
    </g>
  );
}

function HatSombrero() {
  return (
    <g>
      <ellipse cx="100" cy="65" rx="60" ry="12" fill="#D4A853"/>
      <ellipse cx="100" cy="64" rx="60" ry="12" fill="#E8C860"/>
      <path d="M65 64 Q68 30 100 22 Q132 30 135 64" fill="#D4A853"/>
      <path d="M67 64 Q70 34 100 26 Q130 34 133 64" fill="#E8C860" opacity="0.4"/>
      <rect x="65" y="56" width="70" height="8" rx="2" fill="#B8860B"/>
      <path d="M70 58 Q85 54 100 56 Q115 54 130 58" fill="none" stroke="#C45D3E" strokeWidth="2"/>
      <path d="M72 62 Q87 58 100 60 Q113 58 128 62" fill="none" stroke="#3A7D5C" strokeWidth="2"/>
    </g>
  );
}

function HatAviator() {
  return (
    <g>
      <ellipse cx="100" cy="66" rx="44" ry="8" fill="#6B4226"/>
      <path d="M58 66 Q60 38 100 30 Q140 38 142 66" fill="#6B4226"/>
      <path d="M60 66 Q62 42 100 34 Q138 42 140 66" fill="#8B5E3C" opacity="0.4"/>
      <rect x="58" y="58" width="84" height="10" rx="2" fill="#4A2E1A"/>
      {/* Goggles on top */}
      <ellipse cx="82" cy="50" rx="12" ry="8" fill="#4A2E1A" stroke="#D4A853" strokeWidth="1.5"/>
      <ellipse cx="82" cy="50" rx="9" ry="6" fill="#87CEEB" opacity="0.6"/>
      <ellipse cx="118" cy="50" rx="12" ry="8" fill="#4A2E1A" stroke="#D4A853" strokeWidth="1.5"/>
      <ellipse cx="118" cy="50" rx="9" ry="6" fill="#87CEEB" opacity="0.6"/>
      <rect x="93" y="48" width="14" height="4" rx="1" fill="#4A2E1A"/>
    </g>
  );
}

function HatSamurai() {
  return (
    <g>
      <ellipse cx="100" cy="66" rx="50" ry="8" fill="#2D2D2D"/>
      <path d="M52 66 Q55 40 100 30 Q145 40 148 66" fill="#2D2D2D"/>
      <path d="M54 66 Q57 44 100 34 Q143 44 146 66" fill="#3D3D3D" opacity="0.4"/>
      {/* Crest */}
      <path d="M92 30 L100 5 L108 30" fill="#C45D3E"/>
      <circle cx="100" cy="35" r="6" fill="#D4A853"/>
      <circle cx="100" cy="35" r="3" fill="#C45D3E"/>
      <rect x="52" y="58" width="96" height="8" rx="2" fill="#1A1A1A"/>
    </g>
  );
}

function HatPharaoh() {
  return (
    <g>
      <path d="M55 72 Q58 25 100 15 Q142 25 145 72" fill="#D4A853"/>
      <path d="M57 72 Q60 30 100 20 Q140 30 143 72" fill="#E8C860" opacity="0.4"/>
      {/* Side flaps */}
      <path d="M55 72 Q50 85 48 100" fill="none" stroke="#D4A853" strokeWidth="12" strokeLinecap="round"/>
      <path d="M145 72 Q150 85 152 100" fill="none" stroke="#D4A853" strokeWidth="12" strokeLinecap="round"/>
      <rect x="58" y="62" width="84" height="8" rx="2" fill="#B8860B"/>
      {/* Cobra */}
      <path d="M96 20 Q100 5 104 20" fill="#3A7D5C" stroke="#2E6A4A" strokeWidth="1"/>
      <circle cx="100" cy="18" r="2" fill="#E85D3E"/>
    </g>
  );
}

function HatKnight() {
  return (
    <g>
      <ellipse cx="100" cy="66" rx="46" ry="10" fill="#808088"/>
      <path d="M56 66 Q58 30 100 20 Q142 30 144 66" fill="#A8A8B0"/>
      <path d="M58 66 Q60 34 100 24 Q140 34 142 66" fill="#C0C0C8" opacity="0.3"/>
      <rect x="56" y="58" width="88" height="10" rx="2" fill="#808088"/>
      {/* Visor slit */}
      <rect x="72" y="70" width="56" height="4" rx="1" fill="#404048"/>
      {/* Plume */}
      <path d="M100 20 Q110 0 120 -10 Q115 5 108 18" fill="#C45D3E" opacity="0.8"/>
    </g>
  );
}

function HatAstronaut() {
  return (
    <g>
      <circle cx="100" cy="58" r="48" fill="none" stroke="#E8E8E8" strokeWidth="4"/>
      <path d="M54 66 Q56 30 100 18 Q144 30 146 66" fill="#F0F0F0"/>
      <path d="M56 66 Q58 34 100 22 Q142 34 144 66" fill="white" opacity="0.5"/>
      {/* Visor */}
      <path d="M70 62 Q100 52 130 62" fill="#87CEEB" opacity="0.4" stroke="#D0D0D0" strokeWidth="2"/>
      <rect x="54" y="58" width="92" height="10" rx="3" fill="#E0E0E0"/>
    </g>
  );
}

function HatDragon() {
  return (
    <g>
      <path d="M56 68 Q58 35 100 25 Q142 35 144 68" fill="#DC2626"/>
      <path d="M58 68 Q60 38 100 28 Q140 38 142 68" fill="#EF4444" opacity="0.4"/>
      {/* Spikes */}
      <path d="M75 30 L80 15 L85 30" fill="#DC2626"/>
      <path d="M93 26 L100 8 L107 26" fill="#DC2626"/>
      <path d="M115 30 L120 15 L125 30" fill="#DC2626"/>
      <rect x="56" y="60" width="88" height="10" rx="2" fill="#991B1B"/>
      {/* Eyes */}
      <circle cx="82" cy="50" r="4" fill="#FBBF24"/>
      <circle cx="82" cy="50" r="2" fill="#1A1A1A"/>
      <circle cx="118" cy="50" r="4" fill="#FBBF24"/>
      <circle cx="118" cy="50" r="2" fill="#1A1A1A"/>
    </g>
  );
}

function HatSpartan() {
  return (
    <g>
      <ellipse cx="100" cy="66" rx="46" ry="10" fill="#B8860B"/>
      <path d="M56 66 Q58 35 100 25 Q142 35 144 66" fill="#CD7F32"/>
      <path d="M58 66 Q60 38 100 28 Q140 38 142 66" fill="#D4A853" opacity="0.3"/>
      {/* Crest/Mohawk */}
      <path d="M90 26 Q100 -10 110 26" fill="#C45D3E"/>
      <path d="M88 30 Q100 -5 112 30" fill="#E85D3E" opacity="0.4"/>
      <rect x="56" y="58" width="88" height="10" rx="2" fill="#8B6914"/>
    </g>
  );
}

function HatDivine() {
  return (
    <g>
      <path d="M58 68 Q60 30 100 18 Q140 30 142 68" fill="#FBBF24"/>
      <path d="M60 68 Q62 34 100 22 Q138 34 140 68" fill="#FDE68A" opacity="0.5"/>
      <rect x="58" y="60" width="84" height="8" rx="2" fill="#D4A853"/>
      {/* Rays */}
      <line x1="100" y1="18" x2="100" y2="5" stroke="#FBBF24" strokeWidth="2" opacity="0.6"/>
      <line x1="80" y1="25" x2="72" y2="12" stroke="#FBBF24" strokeWidth="2" opacity="0.6"/>
      <line x1="120" y1="25" x2="128" y2="12" stroke="#FBBF24" strokeWidth="2" opacity="0.6"/>
    </g>
  );
}

function HatHalo() {
  return (
    <g>
      <ellipse cx="100" cy="42" rx="32" ry="8" fill="none" stroke="#FBBF24" strokeWidth="4"/>
      <ellipse cx="100" cy="42" rx="32" ry="8" fill="#FDE68A" opacity="0.3"/>
    </g>
  );
}

function HatLaurel() {
  return (
    <g>
      {/* Left branch */}
      <path d="M60 68 Q55 50 65 40 Q60 35 68 28 Q63 22 74 18" fill="none" stroke="#3A7D5C" strokeWidth="3"/>
      <ellipse cx="65" cy="40" rx="8" ry="5" fill="#3A7D5C" transform="rotate(-20 65 40)"/>
      <ellipse cx="68" cy="28" rx="7" ry="4" fill="#3A7D5C" transform="rotate(-30 68 28)"/>
      <ellipse cx="74" cy="18" rx="6" ry="4" fill="#3A7D5C" transform="rotate(-40 74 18)"/>
      {/* Right branch */}
      <path d="M140 68 Q145 50 135 40 Q140 35 132 28 Q137 22 126 18" fill="none" stroke="#3A7D5C" strokeWidth="3"/>
      <ellipse cx="135" cy="40" rx="8" ry="5" fill="#3A7D5C" transform="rotate(20 135 40)"/>
      <ellipse cx="132" cy="28" rx="7" ry="4" fill="#3A7D5C" transform="rotate(30 132 28)"/>
      <ellipse cx="126" cy="18" rx="6" ry="4" fill="#3A7D5C" transform="rotate(40 126 18)"/>
    </g>
  );
}

function HatCosmic() {
  return (
    <g>
      <path d="M56 68 Q58 25 100 12 Q142 25 144 68" fill="#1E1B4B"/>
      <path d="M58 68 Q60 28 100 16 Q140 28 142 68" fill="#312E81" opacity="0.5"/>
      <circle cx="80" cy="35" r="2" fill="white" opacity="0.8"/>
      <circle cx="115" cy="30" r="1.5" fill="white" opacity="0.6"/>
      <circle cx="95" cy="45" r="1" fill="white" opacity="0.7"/>
      <circle cx="120" cy="48" r="1.5" fill="white" opacity="0.5"/>
      <circle cx="85" cy="55" r="1" fill="white" opacity="0.6"/>
      <circle cx="105" cy="25" r="2" fill="#FBBF24" opacity="0.8"/>
      <rect x="56" y="60" width="88" height="8" rx="2" fill="#1E1B4B"/>
    </g>
  );
}

function HatPhoenix() {
  return (
    <g>
      <path d="M56 68 Q58 30 100 18 Q142 30 144 68" fill="#DC2626"/>
      <path d="M58 68 Q60 34 100 22 Q140 34 142 68" fill="#EF4444" opacity="0.4"/>
      {/* Flames */}
      <path d="M80 22 Q75 5 85 -5 Q80 10 90 18" fill="#F97316" opacity="0.8"/>
      <path d="M95 18 Q92 -2 100 -10 Q98 5 105 16" fill="#FBBF24" opacity="0.8"/>
      <path d="M110 20 Q115 0 120 -5 Q115 10 108 18" fill="#F97316" opacity="0.8"/>
      <rect x="56" y="60" width="88" height="8" rx="2" fill="#991B1B"/>
    </g>
  );
}

function HatInfinity() {
  return (
    <g>
      <path d="M56 68 Q58 25 100 12 Q142 25 144 68" fill="#7C3AED"/>
      <path d="M58 68 Q60 28 100 16 Q140 28 142 68" fill="#8B5CF6" opacity="0.4"/>
      {/* Infinity symbol */}
      <path d="M82 38 Q70 28 70 38 Q70 48 82 38 Q94 28 106 38 Q118 48 118 38 Q118 28 106 38 Q94 48 82 38" fill="none" stroke="#FBBF24" strokeWidth="2.5"/>
      <rect x="56" y="60" width="88" height="8" rx="2" fill="#5B21B6"/>
    </g>
  );
}

function HatPirate() {
  return (
    <g>
      <path d="M48 72 Q55 30 100 18 Q145 30 152 72" fill="#1A1A1A"/>
      <path d="M50 72 Q57 34 100 22 Q143 34 150 72" fill="#2D2D2D" opacity="0.4"/>
      <ellipse cx="100" cy="70" rx="54" ry="8" fill="#1A1A1A"/>
      <rect x="60" y="64" width="80" height="4" rx="1" fill="#D4A853"/>
      <circle cx="100" cy="46" r="9" fill="#F5F5F5"/>
      <circle cx="96" cy="44" r="2" fill="#1A1A1A"/>
      <circle cx="104" cy="44" r="2" fill="#1A1A1A"/>
      <path d="M96 50 L98 52 L100 50 L102 52 L104 50" fill="none" stroke="#1A1A1A" strokeWidth="1.2"/>
      <rect x="94" y="55" width="4" height="6" rx="1" fill="#F5F5F5"/>
      <rect x="102" y="55" width="4" height="6" rx="1" fill="#F5F5F5"/>
    </g>
  );
}

function HatSanta() {
  return (
    <g>
      <ellipse cx="100" cy="68" rx="48" ry="10" fill="white"/>
      <path d="M56 68 Q65 30 100 20 Q120 25 130 45 Q145 55 155 30" fill="#C45D3E"/>
      <path d="M58 68 Q67 34 100 24 Q118 28 128 46 Q142 54 152 34" fill="#E85D3E" opacity="0.3"/>
      <circle cx="155" cy="28" r="10" fill="white"/>
      <ellipse cx="100" cy="68" rx="48" ry="7" fill="#F0F0F0"/>
    </g>
  );
}

// ── Premium Hat SVGs ──

function HatDemon() {
  return (
    <g>
      <path d="M60 72 Q65 50 75 45 Q80 30 70 15" fill="#8B0000" stroke="#FF4500" strokeWidth="2"/>
      <path d="M140 72 Q135 50 125 45 Q120 30 130 15" fill="#8B0000" stroke="#FF4500" strokeWidth="2"/>
      <ellipse cx="100" cy="72" rx="42" ry="10" fill="#2D0000"/>
      <path d="M58 72 Q65 55 100 50 Q135 55 142 72" fill="#4A0000"/>
      <circle cx="75" cy="58" r="3" fill="#FF4500" opacity="0.8"/>
      <circle cx="125" cy="58" r="3" fill="#FF4500" opacity="0.8"/>
    </g>
  );
}

function HatAngel() {
  return (
    <g>
      <ellipse cx="100" cy="42" rx="30" ry="6" fill="none" stroke="#FFD700" strokeWidth="3" opacity="0.9"/>
      <ellipse cx="100" cy="42" rx="30" ry="6" fill="none" stroke="#FFF8DC" strokeWidth="1.5" opacity="0.5"/>
      <ellipse cx="100" cy="42" rx="26" ry="4" fill="#FFD700" opacity="0.15"/>
    </g>
  );
}

function HatNinja() {
  return (
    <g>
      <path d="M55 82 Q55 55 100 50 Q145 55 145 82" fill="#1A1A2E"/>
      <rect x="52" y="72" width="96" height="12" rx="2" fill="#2D2D44"/>
      <path d="M145 76 Q160 74 170 80" fill="none" stroke="#2D2D44" strokeWidth="6" strokeLinecap="round"/>
      <path d="M145 78 Q158 76 168 82" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round"/>
    </g>
  );
}

function HatUnicorn() {
  return (
    <g>
      <ellipse cx="100" cy="68" rx="42" ry="10" fill="#F0E6FF"/>
      <path d="M58 68 Q65 50 100 45 Q135 50 142 68" fill="#E8D5FF"/>
      <path d="M100 45 L96 10 L104 10 Z" fill="url(#unicornGrad)"/>
      <defs>
        <linearGradient id="unicornGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#E8D5FF"/>
          <stop offset="33%" stopColor="#FFB7C5"/>
          <stop offset="66%" stopColor="#87CEEB"/>
          <stop offset="100%" stopColor="#FFD700"/>
        </linearGradient>
      </defs>
      <circle cx="100" cy="10" r="3" fill="#FFD700"/>
      <ellipse cx="80" cy="62" rx="5" ry="3" fill="#FFB7C5" opacity="0.5"/>
      <ellipse cx="120" cy="62" rx="5" ry="3" fill="#87CEEB" opacity="0.5"/>
    </g>
  );
}

function HatRobot() {
  return (
    <g>
      <rect x="62" y="50" width="76" height="25" rx="4" fill="#A8A8B0"/>
      <rect x="62" y="50" width="76" height="8" rx="3" fill="#71797E"/>
      <rect x="85" y="40" width="30" height="14" rx="3" fill="#B0B0B8"/>
      <circle cx="100" cy="47" r="4" fill="#00FFFF" opacity="0.8"/>
      <rect x="90" y="32" width="4" height="10" rx="2" fill="#A8A8B0"/>
      <circle cx="92" cy="30" r="3" fill="#FF4444" opacity="0.7"/>
      <rect x="66" y="55" width="8" height="4" rx="1" fill="#00FF00" opacity="0.6"/>
      <rect x="78" y="55" width="8" height="4" rx="1" fill="#00FF00" opacity="0.6"/>
      <rect x="114" y="55" width="8" height="4" rx="1" fill="#00FF00" opacity="0.6"/>
      <rect x="126" y="55" width="8" height="4" rx="1" fill="#00FF00" opacity="0.6"/>
    </g>
  );
}

function HatAlien() {
  return (
    <g>
      <ellipse cx="100" cy="58" rx="50" ry="18" fill="#4A6741"/>
      <path d="M55 58 Q55 30 100 25 Q145 30 145 58" fill="#5C8A50"/>
      <ellipse cx="100" cy="58" rx="50" ry="8" fill="#3A5731" opacity="0.5"/>
      <circle cx="80" cy="42" r="5" fill="#ADFF2F" opacity="0.5"/>
      <circle cx="120" cy="42" r="5" fill="#ADFF2F" opacity="0.5"/>
      <circle cx="100" cy="36" r="3" fill="#ADFF2F" opacity="0.3"/>
    </g>
  );
}

function HatSteampunk() {
  return (
    <g>
      <ellipse cx="100" cy="68" rx="52" ry="10" fill="#4A2E1A"/>
      <path d="M55 68 Q60 42 100 35 Q140 42 145 68" fill="#6B4226"/>
      <rect x="70" y="42" width="60" height="8" rx="2" fill="#8B5E3C"/>
      <circle cx="130" cy="50" r="12" fill="none" stroke="#CD7F32" strokeWidth="3"/>
      <circle cx="130" cy="50" r="6" fill="none" stroke="#B8860B" strokeWidth="2"/>
      <line x1="130" y1="44" x2="130" y2="50" stroke="#CD7F32" strokeWidth="2"/>
      <line x1="130" y1="50" x2="135" y2="48" stroke="#CD7F32" strokeWidth="1.5"/>
      <rect x="72" y="46" width="20" height="3" rx="1" fill="#CD7F32"/>
    </g>
  );
}

function HatEmperor() {
  return (
    <g>
      <ellipse cx="100" cy="65" rx="40" ry="10" fill="#8B0000"/>
      <path d="M62 65 Q62 40 75 35 L80 20 L90 32 L100 15 L110 32 L120 20 L125 35 Q138 40 138 65" fill="#C41E3A"/>
      <path d="M80 20 L90 32 L100 15 L110 32 L120 20" fill="#FFD700" opacity="0.3"/>
      <circle cx="100" cy="15" r="4" fill="#FFD700"/>
      <circle cx="80" cy="20" r="3" fill="#E0115F"/>
      <circle cx="120" cy="20" r="3" fill="#4169E1"/>
      <ellipse cx="100" cy="65" rx="40" ry="6" fill="#FFD700" opacity="0.4"/>
      <rect x="62" y="61" width="76" height="6" rx="2" fill="#B8860B"/>
      <circle cx="85" cy="64" r="2" fill="#FFD700"/>
      <circle cx="100" cy="64" r="2" fill="#E0115F"/>
      <circle cx="115" cy="64" r="2" fill="#FFD700"/>
    </g>
  );
}

function renderHat(hatId: string) {
  switch (hatId) {
    case "explorer": return <HatExplorer />;
    case "beret": return <HatBeret />;
    case "bandana": return <HatBandana />;
    case "cap": return <HatCap />;
    case "beanie": return <HatBeanie />;
    case "chef": return <HatChef />;
    case "cowboy": return <HatCowboy />;
    case "fedora": return <HatFedora />;
    case "crown": return <HatCrown />;
    case "sailor": return <HatSailor />;
    case "wizard": return <HatWizard />;
    case "tophat": return <HatTophat />;
    case "viking": return <HatViking />;
    case "sheriff": return <HatSheriff />;
    case "turban": return <HatTurban />;
    case "sombrero": return <HatSombrero />;
    case "aviator": return <HatAviator />;
    case "samurai": return <HatSamurai />;
    case "pharaoh": return <HatPharaoh />;
    case "knight": return <HatKnight />;
    case "astronaut": return <HatAstronaut />;
    case "dragon": return <HatDragon />;
    case "spartan": return <HatSpartan />;
    case "divine": return <HatDivine />;
    case "halo_hat": return <HatHalo />;
    case "laurel": return <HatLaurel />;
    case "cosmic": return <HatCosmic />;
    case "phoenix": return <HatPhoenix />;
    case "infinity": return <HatInfinity />;
    case "pirate": return <HatPirate />;
    case "santa": return <HatSanta />;
    case "demon": return <HatDemon />;
    case "angel": return <HatAngel />;
    case "ninja": return <HatNinja />;
    case "unicorn": return <HatUnicorn />;
    case "robot": return <HatRobot />;
    case "alien": return <HatAlien />;
    case "steampunk": return <HatSteampunk />;
    case "emperor": return <HatEmperor />;
    default: return null;
  }
}

// ══════════════════════════════════════════════
// ── Accessory Variants ──
// ══════════════════════════════════════════════

function AccessorySatchel() {
  return (
    <g>
      <path d="M120 155 Q135 165 140 180" fill="none" stroke="#6B4226" strokeWidth="4" strokeLinecap="round"/>
      <rect x="132" y="175" width="22" height="18" rx="4" fill="#8B5E3C"/>
      <rect x="132" y="175" width="22" height="6" rx="3" fill="#6B4226"/>
      <circle cx="143" cy="184" r="2" fill="#D4A853"/>
    </g>
  );
}

function AccessoryCompass() {
  return (
    <g>
      <circle cx="145" cy="185" r="12" fill="#D4A853" stroke="#B8860B" strokeWidth="1.5"/>
      <circle cx="145" cy="185" r="9" fill="#F5F5F0"/>
      <line x1="145" y1="177" x2="145" y2="193" stroke="#C45D3E" strokeWidth="1.5"/>
      <line x1="137" y1="185" x2="153" y2="185" stroke="#4A7FC4" strokeWidth="1.5"/>
      <circle cx="145" cy="185" r="2" fill="#1A1A1A"/>
      <path d="M120 160 Q135 170 140 178" fill="none" stroke="#6B4226" strokeWidth="3" strokeLinecap="round"/>
    </g>
  );
}

function AccessoryBinoculars() {
  return (
    <g>
      <path d="M115 155 Q130 165 135 175" fill="none" stroke="#4A2E1A" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="132" cy="182" r="8" fill="#4A2E1A"/>
      <circle cx="146" cy="182" r="8" fill="#4A2E1A"/>
      <rect x="138" y="178" width="6" height="8" rx="1" fill="#3A2010"/>
      <circle cx="132" cy="182" r="5" fill="#87CEEB" opacity="0.5"/>
      <circle cx="146" cy="182" r="5" fill="#87CEEB" opacity="0.5"/>
    </g>
  );
}

function AccessoryWhistle() {
  return (
    <g>
      <path d="M95 145 Q100 150 110 148" fill="none" stroke="#A8A8B0" strokeWidth="2"/>
      <rect x="108" y="143" width="18" height="8" rx="3" fill="#D0D0D8"/>
      <circle cx="126" cy="147" r="3" fill="#A8A8B0"/>
    </g>
  );
}

function AccessoryBadge() {
  return (
    <g>
      <circle cx="85" cy="172" r="10" fill="#D4A853" stroke="#B8860B" strokeWidth="1.5"/>
      <text x="85" y="176" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">SF</text>
    </g>
  );
}

function AccessoryBowtie() {
  return (
    <g>
      <path d="M88 145 L80 138 L80 152 Z" fill="#D4A853"/>
      <path d="M112 145 L120 138 L120 152 Z" fill="#D4A853"/>
      <circle cx="100" cy="145" r="4" fill="#B8860B"/>
    </g>
  );
}

function AccessoryMedal() {
  return (
    <g>
      <path d="M95 145 L92 165 L100 160 L108 165 L105 145" fill="#C45D3E"/>
      <circle cx="100" cy="172" r="9" fill="#D4A853" stroke="#B8860B" strokeWidth="1.5"/>
      <text x="100" y="176" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">1</text>
    </g>
  );
}

function AccessoryMap() {
  return (
    <g>
      <path d="M125 160 Q140 165 148 180" fill="none" stroke="#6B4226" strokeWidth="3" strokeLinecap="round"/>
      <rect x="138" y="176" width="22" height="16" rx="2" fill="#F5E6C8" stroke="#D4A853" strokeWidth="1"/>
      <line x1="142" y1="180" x2="156" y2="180" stroke="#C49A6C" strokeWidth="0.8"/>
      <line x1="142" y1="184" x2="156" y2="184" stroke="#C49A6C" strokeWidth="0.8"/>
      <line x1="142" y1="188" x2="150" y2="188" stroke="#C49A6C" strokeWidth="0.8"/>
      <circle cx="152" cy="186" r="2" fill="#C45D3E" opacity="0.6"/>
    </g>
  );
}

function AccessoryTrophy() {
  return (
    <g>
      <path d="M125 160 Q140 168 143 178" fill="none" stroke="#6B4226" strokeWidth="3" strokeLinecap="round"/>
      <rect x="140" y="192" width="12" height="4" rx="1" fill="#B8860B"/>
      <rect x="143" y="186" width="6" height="6" rx="1" fill="#D4A853"/>
      <path d="M138 186 Q139 175 146 172 Q153 175 154 186" fill="#D4A853"/>
      <path d="M136 180 Q132 178 134 184" fill="none" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M156 180 Q160 178 158 184" fill="none" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round"/>
    </g>
  );
}

function AccessoryShield() {
  return (
    <g>
      <path d="M125 158 Q138 165 140 178" fill="none" stroke="#6B4226" strokeWidth="3" strokeLinecap="round"/>
      <path d="M132 172 L132 198 Q140 204 148 198 L148 172 Z" fill="#4A7FC4" stroke="#2C3E6B" strokeWidth="1.5"/>
      <path d="M136 176 L136 194 Q140 198 144 194 L144 176 Z" fill="#5B8FD4" opacity="0.3"/>
      <text x="140" y="190" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">SF</text>
    </g>
  );
}

function AccessoryScroll() {
  return (
    <g>
      <path d="M125 158 Q138 168 140 178" fill="none" stroke="#6B4226" strokeWidth="3" strokeLinecap="round"/>
      <rect x="136" y="175" width="18" height="22" rx="2" fill="#F5E6C8"/>
      <circle cx="136" cy="175" r="3" fill="#D4A853"/>
      <circle cx="154" cy="175" r="3" fill="#D4A853"/>
      <line x1="140" y1="181" x2="150" y2="181" stroke="#C49A6C" strokeWidth="0.8"/>
      <line x1="140" y1="185" x2="150" y2="185" stroke="#C49A6C" strokeWidth="0.8"/>
      <line x1="140" y1="189" x2="148" y2="189" stroke="#C49A6C" strokeWidth="0.8"/>
    </g>
  );
}

function AccessoryCape() {
  return (
    <g>
      <path d="M72 155 Q60 200 55 250 Q100 260 145 250 Q140 200 128 155" fill="#C45D3E" opacity="0.7"/>
      <path d="M74 155 Q62 200 58 248 Q100 256 142 248 Q138 200 126 155" fill="#E85D3E" opacity="0.2"/>
    </g>
  );
}

function AccessorySword() {
  return (
    <g>
      <line x1="140" y1="155" x2="160" y2="210" stroke="#A8A8B0" strokeWidth="3" strokeLinecap="round"/>
      <line x1="140" y1="155" x2="160" y2="210" stroke="#D0D0D8" strokeWidth="1.5"/>
      <rect x="133" y="152" width="14" height="5" rx="1" fill="#D4A853"/>
      <rect x="138" y="145" width="4" height="8" rx="1" fill="#6B4226"/>
    </g>
  );
}

function AccessoryLantern() {
  return (
    <g>
      <path d="M125 160 Q140 168 145 178" fill="none" stroke="#6B4226" strokeWidth="3" strokeLinecap="round"/>
      <rect x="138" y="178" width="14" height="3" rx="1" fill="#D4A853"/>
      <rect x="140" y="181" width="10" height="14" rx="2" fill="#F97316" opacity="0.6"/>
      <rect x="140" y="181" width="10" height="14" rx="2" fill="none" stroke="#D4A853" strokeWidth="1"/>
      <circle cx="145" cy="188" r="3" fill="#FBBF24" opacity="0.8"/>
      <rect x="138" y="195" width="14" height="3" rx="1" fill="#D4A853"/>
    </g>
  );
}

function AccessoryGuitar() {
  return (
    <g>
      <line x1="120" y1="155" x2="155" y2="210" stroke="#6B4226" strokeWidth="3"/>
      <ellipse cx="155" cy="210" rx="10" ry="14" fill="#8B5E3C" stroke="#6B4226" strokeWidth="1.5"/>
      <ellipse cx="155" cy="210" rx="4" ry="5" fill="#4A2E1A"/>
      <line x1="152" y1="196" x2="152" y2="224" stroke="#D4A853" strokeWidth="0.5"/>
      <line x1="155" y1="196" x2="155" y2="224" stroke="#D4A853" strokeWidth="0.5"/>
      <line x1="158" y1="196" x2="158" y2="224" stroke="#D4A853" strokeWidth="0.5"/>
    </g>
  );
}

function AccessoryCamera() {
  return (
    <g>
      <path d="M110 148 Q120 155 125 160" fill="none" stroke="#2D2D2D" strokeWidth="2.5"/>
      <rect x="120" y="158" width="22" height="16" rx="3" fill="#2D2D2D"/>
      <rect x="126" y="155" width="10" height="4" rx="1" fill="#404040"/>
      <circle cx="131" cy="166" r="5" fill="#404040" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="131" cy="166" r="3" fill="#87CEEB" opacity="0.5"/>
    </g>
  );
}

function AccessoryTelescope() {
  return (
    <g>
      <line x1="125" y1="158" x2="165" y2="195" stroke="#D4A853" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="165" cy="195" r="6" fill="#D4A853" stroke="#B8860B" strokeWidth="1"/>
      <circle cx="165" cy="195" r="3.5" fill="#87CEEB" opacity="0.5"/>
      <circle cx="125" cy="158" r="4" fill="#D4A853"/>
    </g>
  );
}

function AccessoryCrystal() {
  return (
    <g>
      <path d="M125 160 Q138 168 140 178" fill="none" stroke="#6B4226" strokeWidth="3" strokeLinecap="round"/>
      <polygon points="145,175 155,190 145,205 135,190" fill="#8B5CF6" opacity="0.7" stroke="#7C3AED" strokeWidth="1.5"/>
      <polygon points="145,180 150,190 145,200 140,190" fill="white" opacity="0.2"/>
    </g>
  );
}

function AccessoryScepter() {
  return (
    <g>
      <line x1="135" y1="155" x2="150" y2="215" stroke="#D4A853" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="135" cy="155" r="8" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="1.5"/>
      <circle cx="135" cy="155" r="4" fill="#FBBF24" opacity="0.6"/>
    </g>
  );
}

function AccessoryStaff() {
  return (
    <g>
      <line x1="140" y1="145" x2="155" y2="225" stroke="#6B4226" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="140" cy="145" r="6" fill="#3A7D5C" stroke="#2E6A4A" strokeWidth="1.5"/>
      <circle cx="140" cy="145" r="3" fill="#4ADE80" opacity="0.6"/>
    </g>
  );
}

function AccessoryArmor() {
  return (
    <g>
      <path d="M70 155 Q65 175 68 195" fill="none" stroke="#A8A8B0" strokeWidth="8" strokeLinecap="round"/>
      <path d="M130 155 Q135 175 132 195" fill="none" stroke="#A8A8B0" strokeWidth="8" strokeLinecap="round"/>
      <rect x="68" y="150" width="64" height="8" rx="2" fill="#808088"/>
    </g>
  );
}

function AccessoryFlag() {
  return (
    <g>
      <line x1="155" y1="145" x2="155" y2="215" stroke="#6B4226" strokeWidth="3" strokeLinecap="round"/>
      <path d="M155 148 L180 155 L155 165" fill="#C45D3E"/>
      <text x="167" y="160" fontFamily="Arial,sans-serif" fontSize="6" fontWeight="bold" fill="white" textAnchor="middle">SF</text>
    </g>
  );
}

function AccessoryBanner() {
  return (
    <g>
      <line x1="155" y1="145" x2="155" y2="215" stroke="#6B4226" strokeWidth="3" strokeLinecap="round"/>
      <rect x="155" y="148" width="25" height="22" fill="#4F46E5"/>
      <rect x="155" y="148" width="25" height="5" fill="#D4A853"/>
      <text x="167" y="165" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">SF</text>
    </g>
  );
}

function AccessoryLightning() {
  return (
    <g>
      <polygon points="95,155 88,175 96,175 85,200 110,170 100,170 108,155" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1"/>
    </g>
  );
}

function AccessoryAura() {
  return (
    <g>
      <ellipse cx="100" cy="195" rx="55" ry="58" fill="none" stroke="#FBBF24" strokeWidth="2" opacity="0.3"/>
      <ellipse cx="100" cy="195" rx="50" ry="53" fill="none" stroke="#FBBF24" strokeWidth="1.5" opacity="0.2"/>
      <ellipse cx="100" cy="195" rx="60" ry="63" fill="none" stroke="#FBBF24" strokeWidth="1" opacity="0.15"/>
    </g>
  );
}

function AccessoryStardust() {
  return (
    <g>
      <circle cx="55" cy="160" r="2" fill="#FBBF24" opacity="0.7"/>
      <circle cx="145" cy="165" r="1.5" fill="#FBBF24" opacity="0.6"/>
      <circle cx="60" cy="200" r="1.5" fill="#FBBF24" opacity="0.5"/>
      <circle cx="140" cy="210" r="2" fill="#FBBF24" opacity="0.7"/>
      <circle cx="50" cy="180" r="1" fill="#FBBF24" opacity="0.4"/>
      <circle cx="150" cy="185" r="1.5" fill="#FBBF24" opacity="0.6"/>
      <circle cx="65" cy="220" r="1" fill="#FBBF24" opacity="0.5"/>
      <circle cx="135" cy="235" r="1.5" fill="#FBBF24" opacity="0.4"/>
    </g>
  );
}

function AccessoryCosmicAura() {
  return (
    <g>
      <ellipse cx="100" cy="195" rx="55" ry="58" fill="none" stroke="#6366F1" strokeWidth="2" opacity="0.3"/>
      <ellipse cx="100" cy="195" rx="50" ry="53" fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.25"/>
      <ellipse cx="100" cy="195" rx="60" ry="63" fill="none" stroke="#4F46E5" strokeWidth="1" opacity="0.15"/>
      <circle cx="55" cy="170" r="1.5" fill="white" opacity="0.5"/>
      <circle cx="145" cy="175" r="1" fill="white" opacity="0.4"/>
      <circle cx="60" cy="210" r="1" fill="white" opacity="0.3"/>
      <circle cx="140" cy="220" r="1.5" fill="white" opacity="0.5"/>
    </g>
  );
}

function AccessoryHaloAcc() {
  return (
    <g>
      <ellipse cx="100" cy="148" rx="28" ry="6" fill="none" stroke="#FBBF24" strokeWidth="3"/>
      <ellipse cx="100" cy="148" rx="28" ry="6" fill="#FDE68A" opacity="0.2"/>
    </g>
  );
}

function AccessoryPhoenixWings() {
  return (
    <g>
      <path d="M58 170 Q30 140 15 155 Q10 170 30 182 Q20 162 42 168" fill="#F97316" opacity="0.7"/>
      <path d="M58 175 Q35 150 22 165 Q18 178 38 186" fill="#FBBF24" opacity="0.4"/>
      <path d="M142 170 Q170 140 185 155 Q190 170 170 182 Q180 162 158 168" fill="#F97316" opacity="0.7"/>
      <path d="M142 175 Q165 150 178 165 Q182 178 162 186" fill="#FBBF24" opacity="0.4"/>
    </g>
  );
}

function AccessoryWings() {
  return (
    <g>
      <path d="M58 170 Q30 140 20 160 Q15 175 35 185 Q25 165 45 170" fill="#E8E8FF" opacity="0.7"/>
      <path d="M58 175 Q35 150 25 168 Q20 180 40 188" fill="#D0D0FF" opacity="0.4"/>
      <path d="M142 170 Q170 140 180 160 Q185 175 165 185 Q175 165 155 170" fill="#E8E8FF" opacity="0.7"/>
      <path d="M142 175 Q165 150 175 168 Q180 180 160 188" fill="#D0D0FF" opacity="0.4"/>
    </g>
  );
}

// ── Premium Accessory SVGs ──

function AccessoryDemonWings() {
  return (
    <g>
      <path d="M45 130 Q20 110 15 90 Q18 100 30 105 Q22 85 25 70 Q30 90 40 100 Q35 80 40 65 Q42 85 48 105" fill="#4A0000" opacity="0.8"/>
      <path d="M155 130 Q180 110 185 90 Q182 100 170 105 Q178 85 175 70 Q170 90 160 100 Q165 80 160 65 Q158 85 152 105" fill="#4A0000" opacity="0.8"/>
      <path d="M45 130 Q25 115 20 95" fill="none" stroke="#8B0000" strokeWidth="1.5" opacity="0.6"/>
      <path d="M155 130 Q175 115 180 95" fill="none" stroke="#8B0000" strokeWidth="1.5" opacity="0.6"/>
    </g>
  );
}

function AccessoryKatana() {
  return (
    <g>
      <line x1="135" y1="100" x2="170" y2="60" stroke="#B0B0B8" strokeWidth="3" strokeLinecap="round"/>
      <line x1="135" y1="100" x2="170" y2="60" stroke="#E8E8E8" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="130" y="97" width="12" height="5" rx="1" fill="#2D2D2D" transform="rotate(-40 136 100)"/>
      <line x1="128" y1="104" x2="120" y2="118" stroke="#4A2E1A" strokeWidth="4" strokeLinecap="round"/>
      <path d="M118 116 L122 120 L126 116" fill="#D4A853" stroke="#B8860B" strokeWidth="0.5"/>
    </g>
  );
}

function AccessoryTrident() {
  return (
    <g>
      <line x1="155" y1="185" x2="155" y2="80" stroke="#8B6914" strokeWidth="4" strokeLinecap="round"/>
      <path d="M145 85 L155 65 L165 85" fill="none" stroke="#FFD700" strokeWidth="3" strokeLinejoin="round"/>
      <line x1="155" y1="65" x2="155" y2="55" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
      <line x1="143" y1="80" x2="140" y2="60" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="167" y1="80" x2="170" y2="60" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round"/>
    </g>
  );
}

function AccessoryMagicWand() {
  return (
    <g>
      <line x1="130" y1="170" x2="155" y2="100" stroke="#6B4226" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="155" cy="98" r="6" fill="#9370DB"/>
      <circle cx="155" cy="98" r="3" fill="#E0B0FF" opacity="0.8"/>
      <circle cx="160" cy="90" r="2" fill="#FFD700" opacity="0.6"/>
      <circle cx="148" cy="92" r="1.5" fill="#FFD700" opacity="0.5"/>
      <circle cx="162" cy="96" r="1" fill="#FFD700" opacity="0.4"/>
    </g>
  );
}

function AccessoryDragonPet() {
  return (
    <g>
      <ellipse cx="155" cy="165" rx="12" ry="10" fill="#228B22"/>
      <ellipse cx="160" cy="155" rx="8" ry="7" fill="#2E8B57"/>
      <circle cx="157" cy="153" r="2" fill="#FFD700"/>
      <circle cx="163" cy="153" r="2" fill="#FFD700"/>
      <path d="M152 150 Q148 145 150 140" fill="none" stroke="#228B22" strokeWidth="2"/>
      <path d="M168 150 Q172 145 170 140" fill="none" stroke="#228B22" strokeWidth="2"/>
      <path d="M145 170 Q140 175 138 172 Q142 168 145 170Z" fill="#228B22"/>
      <path d="M167 165 Q175 168 178 165 Q175 162 167 165Z" fill="#228B22"/>
    </g>
  );
}

function AccessoryFloatingOrbs() {
  return (
    <g>
      <circle cx="55" cy="100" r="6" fill="#FF4444" opacity="0.7"/>
      <circle cx="55" cy="100" r="3" fill="#FF8888" opacity="0.5"/>
      <circle cx="145" cy="95" r="6" fill="#4444FF" opacity="0.7"/>
      <circle cx="145" cy="95" r="3" fill="#8888FF" opacity="0.5"/>
      <circle cx="50" cy="140" r="5" fill="#44FF44" opacity="0.7"/>
      <circle cx="50" cy="140" r="2.5" fill="#88FF88" opacity="0.5"/>
      <circle cx="150" cy="145" r="5" fill="#FFD700" opacity="0.7"/>
      <circle cx="150" cy="145" r="2.5" fill="#FFED88" opacity="0.5"/>
    </g>
  );
}

function AccessoryFlamingSword() {
  return (
    <g>
      <line x1="135" y1="175" x2="160" y2="95" stroke="#A8A8B0" strokeWidth="4"/>
      <line x1="135" y1="175" x2="160" y2="95" stroke="#E0E0E0" strokeWidth="2"/>
      <rect x="128" y="172" width="16" height="6" rx="2" fill="#8B6914"/>
      <path d="M155 100 Q165 80 160 60 Q155 75 150 80 Q160 65 155 50" fill="#FF4500" opacity="0.7"/>
      <path d="M158 95 Q170 75 165 55 Q160 70 155 75" fill="#FFD700" opacity="0.5"/>
    </g>
  );
}

function AccessoryGalaxyCloak() {
  return (
    <g>
      <path d="M60 120 Q55 140 50 180 Q70 185 100 190 Q130 185 150 180 Q145 140 140 120" fill="#1A1A4E" opacity="0.8"/>
      <path d="M65 125 Q60 145 55 178 Q75 183 100 186 Q125 183 145 178 Q140 145 135 125" fill="#2D2D6B" opacity="0.6"/>
      <circle cx="70" cy="150" r="1" fill="white" opacity="0.7"/>
      <circle cx="90" cy="165" r="1.5" fill="white" opacity="0.8"/>
      <circle cx="110" cy="155" r="1" fill="#FFD700" opacity="0.7"/>
      <circle cx="130" cy="170" r="1.5" fill="white" opacity="0.6"/>
      <circle cx="80" cy="175" r="1" fill="#7B68EE" opacity="0.8"/>
      <circle cx="120" cy="145" r="1" fill="#87CEEB" opacity="0.7"/>
    </g>
  );
}

function AccessoryRoyalScepter() {
  return (
    <g>
      <line x1="150" y1="185" x2="150" y2="75" stroke="url(#scepterGrad)" strokeWidth="5" strokeLinecap="round"/>
      <defs>
        <linearGradient id="scepterGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#8B6914"/>
          <stop offset="100%" stopColor="#FFD700"/>
        </linearGradient>
      </defs>
      <circle cx="150" cy="73" r="10" fill="#FFD700"/>
      <circle cx="150" cy="73" r="6" fill="#E0115F"/>
      <circle cx="150" cy="73" r="3" fill="#FF6B81" opacity="0.6"/>
      <circle cx="150" cy="60" r="3" fill="#FFD700" opacity="0.6"/>
      <circle cx="140" cy="67" r="2.5" fill="#FFD700" opacity="0.5"/>
      <circle cx="160" cy="67" r="2.5" fill="#FFD700" opacity="0.5"/>
    </g>
  );
}

function renderAccessory(accId: string, isSad: boolean) {
  if (isSad) return null;
  switch (accId) {
    case "satchel": return <AccessorySatchel />;
    case "compass": return <AccessoryCompass />;
    case "binoculars": return <AccessoryBinoculars />;
    case "whistle": return <AccessoryWhistle />;
    case "badge_acc": return <AccessoryBadge />;
    case "bowtie": return <AccessoryBowtie />;
    case "medal": return <AccessoryMedal />;
    case "map_acc": return <AccessoryMap />;
    case "trophy": return <AccessoryTrophy />;
    case "shield": return <AccessoryShield />;
    case "scroll": return <AccessoryScroll />;
    case "cape": return <AccessoryCape />;
    case "sword": return <AccessorySword />;
    case "lantern": return <AccessoryLantern />;
    case "guitar": return <AccessoryGuitar />;
    case "camera": return <AccessoryCamera />;
    case "telescope": return <AccessoryTelescope />;
    case "crystal": return <AccessoryCrystal />;
    case "scepter": return <AccessoryScepter />;
    case "staff": return <AccessoryStaff />;
    case "armor": return <AccessoryArmor />;
    case "flag": return <AccessoryFlag />;
    case "banner": return <AccessoryBanner />;
    case "lightning": return <AccessoryLightning />;
    case "aura": return <AccessoryAura />;
    case "stardust": return <AccessoryStardust />;
    case "cosmic_aura": return <AccessoryCosmicAura />;
    case "halo_acc": return <AccessoryHaloAcc />;
    case "phoenix_wings": return <AccessoryPhoenixWings />;
    case "wings": return <AccessoryWings />;
    case "demon_wings": return <AccessoryDemonWings />;
    case "katana": return <AccessoryKatana />;
    case "trident": return <AccessoryTrident />;
    case "magic_wand": return <AccessoryMagicWand />;
    case "dragon_pet": return <AccessoryDragonPet />;
    case "floating_orbs": return <AccessoryFloatingOrbs />;
    case "flaming_sword": return <AccessoryFlamingSword />;
    case "galaxy_cloak": return <AccessoryGalaxyCloak />;
    case "royal_scepter": return <AccessoryRoyalScepter />;
    default: return null;
  }
}

// ══════════════════════════════════════════════
// ── Main Component ──
// ══════════════════════════════════════════════

export default function Mascot({
  pose = "default",
  size = 120,
  className = "",
  animate = false,
  customization,
}: MascotProps) {
  const isSad = pose === "sad";
  const isSearch = pose === "search";
  const c = customization || DEFAULT_CUSTOMIZATION;

  const scarfColor = SCARF_COLORS[c.scarf] || SCARF_COLORS.red;
  const bootColor = BOOT_COLORS[c.boots] || BOOT_COLORS.brown;
  const hasCape = c.accessory === "cape";
  const hasWings = c.accessory === "wings" || c.accessory === "phoenix_wings";
  const hasAura = c.accessory === "aura" || c.accessory === "cosmic_aura" || c.accessory === "stardust";
  const hasLightning = c.accessory === "lightning";

  return (
    <svg
      viewBox="0 0 200 280"
      width={size}
      height={size}
      className={`mascot-svg ${animate ? "animate-bounce-slow" : ""} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Findy, mascotte SkillFinder"
    >
      {/* ── Shadow ── */}
      <ellipse cx="100" cy="272" rx="45" ry="7" fill="#1A1714" opacity="0.07"/>

      {/* ── Aura effects (behind everything) ── */}
      {hasAura && !isSad && renderAccessory(c.accessory, isSad)}

      {/* ── Wings (behind body) ── */}
      {hasWings && !isSad && renderAccessory(c.accessory, isSad)}

      {/* ── Cape (behind body) ── */}
      {hasCape && !isSad && <AccessoryCape />}

      {/* ── Legs ── */}
      <rect x="72" y="218" width="20" height="38" rx="10" fill={bootColor.main}/>
      <rect x="108" y="218" width="20" height="38" rx="10" fill={bootColor.main}/>
      <ellipse cx="82" cy="256" rx="14" ry="7" fill={bootColor.sole}/>
      <ellipse cx="118" cy="256" rx="14" ry="7" fill={bootColor.sole}/>

      {/* ── Body ── */}
      <ellipse cx="100" cy="195" rx="42" ry="45" fill="#C49A6C"/>
      <ellipse cx="100" cy="195" rx="38" ry="41" fill="#E8D5B8"/>
      <rect x="62" y="210" width="76" height="8" rx="4" fill="#6B4226"/>
      <rect x="95" y="208" width="10" height="12" rx="2" fill="#D4A853"/>
      <rect x="72" y="188" width="16" height="14" rx="3" fill="#C49A6C" stroke="#A67B4F" strokeWidth="1"/>
      <rect x="112" y="188" width="16" height="14" rx="3" fill="#C49A6C" stroke="#A67B4F" strokeWidth="1"/>
      <rect x="72" y="188" width="16" height="5" rx="2" fill="#A67B4F"/>
      <rect x="112" y="188" width="16" height="5" rx="2" fill="#A67B4F"/>

      {/* ── Bow tie / Medal / Badge / Whistle (on body, before scarf) ── */}
      {["bowtie", "medal", "badge_acc", "whistle"].includes(c.accessory) && !isSad && renderAccessory(c.accessory, isSad)}

      {/* ── Armor (on body) ── */}
      {c.accessory === "armor" && !isSad && <AccessoryArmor />}

      {/* ── Scarf ── */}
      {c.scarf !== "none_scarf" && (() => {
        const sc = scarfColor;
        // Darken color for shading
        const darken = (hex: string, amt: number) => {
          const n = parseInt(hex.replace("#",""), 16);
          const r = Math.max(0, (n >> 16) - amt);
          const g = Math.max(0, ((n >> 8) & 0xff) - amt);
          const b = Math.max(0, (n & 0xff) - amt);
          return `#${(r<<16|g<<8|b).toString(16).padStart(6,"0")}`;
        };
        const shadow = darken(sc, 35);
        const highlight = darken(sc, -20);
        return (
          <g>
            {/* Main wrap around neck */}
            <path d="M70 138 Q72 132 82 130 Q100 126 118 130 Q128 132 130 138 Q128 148 122 152 Q100 158 78 152 Q72 148 70 138Z" fill={sc}/>
            {/* Top fold / overlap */}
            <path d="M74 136 Q78 130 90 128 Q100 127 110 128 Q122 130 126 136 Q122 142 110 144 Q100 145 90 144 Q78 142 74 136Z" fill={highlight} opacity="0.4"/>
            {/* Shadow under chin */}
            <path d="M82 132 Q100 128 118 132 Q116 138 100 140 Q84 138 82 132Z" fill={shadow} opacity="0.3"/>
            {/* Knot at front-right */}
            <ellipse cx="118" cy="148" rx="8" ry="6" fill={sc}/>
            <ellipse cx="118" cy="148" rx="5" ry="4" fill={shadow} opacity="0.3"/>
            {/* Hanging end - front piece */}
            <path d="M114 152 Q116 168 120 180 Q122 186 118 188 Q114 186 112 180 Q110 170 112 152Z" fill={sc}/>
            <path d="M114 152 Q115 168 118 180 Q116 184 114 180 Q112 170 113 152Z" fill={shadow} opacity="0.25"/>
            {/* Hanging end - back piece */}
            <path d="M122 150 Q126 164 130 176 Q132 182 128 184 Q124 182 123 176 Q120 164 120 150Z" fill={sc}/>
            <path d="M123 150 Q126 162 129 174 Q128 178 126 174 Q124 162 122 150Z" fill={shadow} opacity="0.25"/>
            {/* Fringe / tassels on ends */}
            <line x1="115" y1="187" x2="114" y2="193" stroke={sc} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="118" y1="188" x2="118" y2="194" stroke={sc} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="121" y1="187" x2="122" y2="193" stroke={sc} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="126" y1="183" x2="125" y2="189" stroke={sc} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="129" y1="184" x2="129" y2="190" stroke={sc} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="132" y1="183" x2="133" y2="189" stroke={sc} strokeWidth="1.5" strokeLinecap="round"/>
            {/* Knit texture lines */}
            <path d="M78 138 Q90 134 100 135 Q110 134 122 138" fill="none" stroke={shadow} strokeWidth="0.6" opacity="0.3"/>
            <path d="M76 142 Q90 138 100 139 Q110 138 124 142" fill="none" stroke={shadow} strokeWidth="0.6" opacity="0.3"/>
            <path d="M78 146 Q90 142 100 143 Q110 142 122 146" fill="none" stroke={shadow} strokeWidth="0.6" opacity="0.3"/>
          </g>
        );
      })()}

      {/* ── Arms ── */}
      <path
        d={isSad ? "M58 170 Q42 195 48 220" : "M58 170 Q42 185 45 210"}
        fill="none" stroke="#E8D5B8" strokeWidth="14" strokeLinecap="round"
      />
      {!isSad && <circle cx="45" cy="210" r="9" fill="#FDDCBD"/>}
      {isSad && <circle cx="48" cy="220" r="9" fill="#FDDCBD"/>}

      {/* ── Held accessories (satchel, compass, etc.) ── */}
      {!["bowtie", "medal", "badge_acc", "whistle", "cape", "wings", "phoenix_wings",
         "aura", "cosmic_aura", "stardust", "lightning", "armor", "halo_acc",
         "none_acc"].includes(c.accessory) && !isSad && renderAccessory(c.accessory, isSad)}

      {/* ── Lightning (over body) ── */}
      {hasLightning && !isSad && <AccessoryLightning />}

      {/* ── Halo accessory ── */}
      {c.accessory === "halo_acc" && !isSad && <AccessoryHaloAcc />}

      {/* Sad right arm */}
      {isSad && (
        <g>
          <path d="M142 170 Q158 195 152 220" fill="none" stroke="#E8D5B8" strokeWidth="14" strokeLinecap="round"/>
          <circle cx="152" cy="220" r="9" fill="#FDDCBD"/>
          <line x1="152" y1="220" x2="155" y2="235" stroke="#D4A853" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
          <circle cx="158" cy="245" r="12" fill="none" stroke="#D4A853" strokeWidth="3.5" opacity="0.4"/>
        </g>
      )}

      {/* ── Head ── */}
      <ellipse cx="100" cy="100" rx="48" ry="52" fill="#FDDCBD"/>

      {/* ── Ears ── */}
      <circle cx="54" cy="105" r="10" fill="#FDDCBD"/>
      <circle cx="54" cy="105" r="6" fill="#F5C4A5"/>
      <circle cx="146" cy="105" r="10" fill="#FDDCBD"/>
      <circle cx="146" cy="105" r="6" fill="#F5C4A5"/>

      {/* ── Eyebrows ── */}
      {isSad ? (
        <>
          <path d="M72 86 Q80 82 90 88" fill="none" stroke="#8B6B4F" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M110 88 Q120 82 128 86" fill="none" stroke="#8B6B4F" strokeWidth="2.5" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <path d="M74 86 Q82 80 92 84" fill="none" stroke="#8B6B4F" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M108 84 Q118 80 126 86" fill="none" stroke="#8B6B4F" strokeWidth="2.5" strokeLinecap="round"/>
        </>
      )}

      {/* ── Eyes ── */}
      <g className="mascot-eyes">
        <ellipse cx="84" cy="100" rx="12" ry="13" fill="white"/>
        <ellipse cx="84" cy="100" rx="12" ry="13" fill="none" stroke="#DDBFA0" strokeWidth="1"/>
        <g className="mascot-pupils">
          <circle cx={isSearch ? "88" : "85"} cy={isSearch ? "101" : "100"} r="7" fill="#3D2314"/>
          <circle cx={isSearch ? "89.5" : "86.5"} cy={isSearch ? "98" : "97"} r="2.5" fill="white"/>
        </g>
        <ellipse cx="116" cy="100" rx="12" ry="13" fill="white"/>
        <ellipse cx="116" cy="100" rx="12" ry="13" fill="none" stroke="#DDBFA0" strokeWidth="1"/>
        <g className="mascot-pupils">
          <circle cx={isSearch ? "120" : "117"} cy={isSearch ? "101" : "100"} r="7" fill="#3D2314"/>
          <circle cx={isSearch ? "121.5" : "118.5"} cy={isSearch ? "98" : "97"} r="2.5" fill="white"/>
        </g>
      </g>

      {/* ── Nose ── */}
      <ellipse cx="100" cy="112" rx="4" ry="3" fill="#F5C4A5"/>

      {/* ── Mouth ── */}
      {isSad ? (
        <path d="M90 122 Q100 117 110 122" fill="none" stroke="#8B6B4F" strokeWidth="2" strokeLinecap="round"/>
      ) : (
        <path d="M88 120 Q100 130 112 120" fill="none" stroke="#8B6B4F" strokeWidth="2" strokeLinecap="round"/>
      )}

      {/* ── Cheeks ── */}
      <circle cx="70" cy="114" r="7" fill="#F5A5A5" opacity="0.35"/>
      <circle cx="130" cy="114" r="7" fill="#F5A5A5" opacity="0.35"/>

      {/* ── Hat ── */}
      {renderHat(c.hat)}

      {/* ── Right arm + loupe (rendered LAST = on top) ── */}
      {!isSad && (
        <g className="mascot-right-arm">
          <path d="M142 170 Q162 150 158 125" fill="none" stroke="#E8D5B8" strokeWidth="14" strokeLinecap="round"/>
          <circle cx="158" cy="125" r="9" fill="#FDDCBD"/>
          <line x1="158" y1="125" x2="168" y2="100" stroke="#D4A853" strokeWidth="5" strokeLinecap="round"/>
          <circle cx="174" cy="88" r="20" fill="none" stroke="#D4A853" strokeWidth="4.5"/>
          <circle cx="174" cy="88" r="20" fill="#E8F4FF" opacity="0.25"/>
          <path d="M165 80 Q168 76 173 74" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        </g>
      )}

      {/* ── Hover CSS ── */}
      <style>{`
        .mascot-svg .mascot-right-arm {
          transform-origin: 142px 170px;
          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .mascot-svg:hover .mascot-right-arm {
          transform: rotate(-45deg) translate(0px, 14px);
        }
        .mascot-svg .mascot-pupils {
          transition: transform 0.35s ease;
        }
        .mascot-svg:hover .mascot-pupils {
          transform: translate(5px, 0px);
        }
      `}</style>
    </svg>
  );
}
