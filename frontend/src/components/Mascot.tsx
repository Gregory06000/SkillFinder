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
// ── Hair Variants ──
// ══════════════════════════════════════════════

function HairShortMessy() {
  return (
    <g>
      {/* Messy tufts of hair on top/sides of head */}
      <path d="M60 80 Q55 60 65 50 Q75 42 85 48 Q80 55 68 65 Q62 72 60 80Z" fill="#6B4226"/>
      <path d="M80 50 Q85 35 100 32 Q105 38 95 48 Q88 52 80 50Z" fill="#7A5232"/>
      <path d="M95 34 Q110 28 125 35 Q130 42 120 48 Q110 44 100 38Z" fill="#6B4226"/>
      <path d="M120 40 Q135 38 142 52 Q145 65 140 78 Q138 68 132 58 Q126 48 120 40Z" fill="#7A5232"/>
      {/* Highlight streaks */}
      <path d="M70 55 Q75 45 85 42" fill="none" stroke="#8B6B4F" strokeWidth="1.5" opacity="0.4"/>
      <path d="M105 35 Q115 32 125 38" fill="none" stroke="#8B6B4F" strokeWidth="1.5" opacity="0.4"/>
    </g>
  );
}

function HairBuzzCut() {
  return (
    <g>
      {/* Very short hair — subtle texture over the head */}
      <ellipse cx="100" cy="72" rx="46" ry="30" fill="#5A3A1A" opacity="0.6"/>
      {/* Stubble texture dots */}
      <g fill="#4A2E1A" opacity="0.3">
        <circle cx="70" cy="65" r="0.8"/><circle cx="78" cy="58" r="0.8"/><circle cx="86" cy="54" r="0.8"/>
        <circle cx="95" cy="52" r="0.8"/><circle cx="105" cy="52" r="0.8"/><circle cx="114" cy="54" r="0.8"/>
        <circle cx="122" cy="58" r="0.8"/><circle cx="130" cy="65" r="0.8"/><circle cx="90" cy="56" r="0.8"/>
        <circle cx="110" cy="56" r="0.8"/><circle cx="100" cy="50" r="0.8"/>
      </g>
    </g>
  );
}

function HairSpiky() {
  return (
    <g>
      {/* Spiky upward tufts */}
      <path d="M68 68 Q62 40 72 30 Q78 42 75 60Z" fill="#5A3A1A"/>
      <path d="M80 58 Q78 28 88 18 Q92 32 86 52Z" fill="#6B4226"/>
      <path d="M92 52 Q94 20 104 12 Q108 26 100 48Z" fill="#5A3A1A"/>
      <path d="M108 52 Q112 22 120 16 Q122 32 114 50Z" fill="#6B4226"/>
      <path d="M122 58 Q128 34 136 30 Q134 48 128 62Z" fill="#5A3A1A"/>
      {/* Hair base */}
      <path d="M58 78 Q60 60 68 55 Q80 48 100 46 Q120 48 132 55 Q140 60 142 78 Q130 72 100 70 Q70 72 58 78Z" fill="#5A3A1A"/>
      {/* Highlight */}
      <path d="M90 20 Q95 14 104 12" fill="none" stroke="#8B6B4F" strokeWidth="1" opacity="0.5"/>
    </g>
  );
}

function HairSidePart() {
  return (
    <g>
      {/* Neat side-parted hair */}
      <path d="M55 82 Q54 60 62 50 Q72 40 90 38 Q80 42 70 52 Q60 62 58 82Z" fill="#4A2E1A"/>
      <path d="M90 38 Q110 36 130 42 Q142 50 145 70 Q144 80 142 85 Q140 70 132 58 Q120 46 100 42 Q92 40 90 38Z" fill="#5A3A1A"/>
      {/* Part line */}
      <path d="M90 38 Q88 50 85 65" fill="none" stroke="#3A1E0A" strokeWidth="1" opacity="0.5"/>
      {/* Hair volume on the right side */}
      <path d="M130 42 Q145 55 148 75 Q147 82 144 85" fill="none" stroke="#4A2E1A" strokeWidth="8" strokeLinecap="round" opacity="0.4"/>
    </g>
  );
}

function HairCurly() {
  return (
    <g>
      {/* Bouncy curly hair made of overlapping circles */}
      <circle cx="68" cy="60" r="12" fill="#5A3A1A"/><circle cx="82" cy="50" r="13" fill="#6B4226"/>
      <circle cx="100" cy="46" r="14" fill="#5A3A1A"/><circle cx="118" cy="50" r="13" fill="#6B4226"/>
      <circle cx="132" cy="60" r="12" fill="#5A3A1A"/>
      <circle cx="60" cy="72" r="10" fill="#6B4226"/><circle cx="140" cy="72" r="10" fill="#6B4226"/>
      {/* Highlight curls */}
      <circle cx="80" cy="48" r="4" fill="#8B6B4F" opacity="0.25"/>
      <circle cx="105" cy="44" r="4" fill="#8B6B4F" opacity="0.25"/>
    </g>
  );
}

function HairPonytail() {
  return (
    <g>
      {/* Hair on top, pulled back */}
      <path d="M58 80 Q56 58 68 48 Q82 38 100 36 Q118 38 132 48 Q144 58 142 80 Q130 72 100 68 Q70 72 58 80Z" fill="#6B4226"/>
      {/* Ponytail hanging behind — rendered as a tail in back */}
      <path d="M120 55 Q135 60 140 80 Q142 110 135 140 Q130 155 125 150 Q132 130 134 105 Q136 80 125 62Z" fill="#6B4226"/>
      <path d="M130 80 Q133 100 130 130" fill="none" stroke="#5A3A1A" strokeWidth="2" opacity="0.4"/>
      {/* Hair tie */}
      <ellipse cx="130" cy="65" rx="5" ry="4" fill="#C45D3E"/>
    </g>
  );
}

function HairMohawk() {
  return (
    <g>
      {/* Shaved sides */}
      <path d="M56 85 Q55 70 62 62 Q70 56 80 54" fill="none" stroke="#3A1E0A" strokeWidth="3" opacity="0.3"/>
      <path d="M144 85 Q145 70 138 62 Q130 56 120 54" fill="none" stroke="#3A1E0A" strokeWidth="3" opacity="0.3"/>
      {/* Tall mohawk ridge */}
      <path d="M82 54 Q84 20 90 8 Q100 2 110 8 Q116 20 118 54 Q110 50 100 48 Q90 50 82 54Z" fill="#C45D3E"/>
      {/* Mohawk highlight */}
      <path d="M92 12 Q100 6 108 12 Q105 10 100 8 Q95 10 92 12Z" fill="#E87060" opacity="0.5"/>
      {/* Texture lines */}
      <path d="M90 30 Q100 26 110 30" fill="none" stroke="#A03828" strokeWidth="1" opacity="0.5"/>
      <path d="M88 42 Q100 38 112 42" fill="none" stroke="#A03828" strokeWidth="1" opacity="0.5"/>
    </g>
  );
}

function HairBobCut() {
  return (
    <g>
      {/* Full bob cut around head */}
      <path d="M52 95 Q48 60 62 45 Q80 32 100 30 Q120 32 138 45 Q152 60 148 95 Q145 110 140 115 Q138 100 140 80 Q140 60 130 50 Q118 40 100 38 Q82 40 70 50 Q60 60 60 80 Q62 100 55 115 Q52 110 52 95Z" fill="#2D2D2D"/>
      {/* Hair volume highlight */}
      <path d="M62 55 Q70 42 85 36 Q80 44 72 56 Q66 65 62 75Z" fill="#404040" opacity="0.4"/>
      {/* Ends curl inward */}
      <path d="M55 110 Q52 115 55 118 Q58 115 56 110Z" fill="#2D2D2D"/>
      <path d="M145 110 Q148 115 145 118 Q142 115 144 110Z" fill="#2D2D2D"/>
    </g>
  );
}

function HairLongStraight() {
  return (
    <g>
      {/* Long straight hair flowing down */}
      <path d="M52 85 Q48 55 65 42 Q82 32 100 30 Q118 32 135 42 Q152 55 148 85 Q148 140 145 165 Q142 175 138 170 Q140 145 142 100 Q142 70 132 55 Q120 42 100 38 Q80 42 68 55 Q58 70 58 100 Q60 145 55 170 Q52 175 50 165 Q48 140 52 85Z" fill="#6B4226"/>
      {/* Highlight */}
      <path d="M65 50 Q75 38 90 34" fill="none" stroke="#8B6B4F" strokeWidth="2" opacity="0.35"/>
      {/* Hair strand lines */}
      <path d="M60 90 Q58 130 55 160" fill="none" stroke="#5A3A1A" strokeWidth="0.8" opacity="0.3"/>
      <path d="M140 90 Q142 130 142 160" fill="none" stroke="#5A3A1A" strokeWidth="0.8" opacity="0.3"/>
    </g>
  );
}

function HairAfro() {
  return (
    <g>
      {/* Big voluminous afro */}
      <ellipse cx="100" cy="62" rx="58" ry="48" fill="#2D2D2D"/>
      {/* Texture - small curly lines */}
      <g stroke="#404040" strokeWidth="1.2" fill="none" opacity="0.4">
        <path d="M60 50 Q63 46 66 50"/><path d="M72 38 Q75 34 78 38"/>
        <path d="M88 32 Q91 28 94 32"/><path d="M106 30 Q109 26 112 30"/>
        <path d="M122 34 Q125 30 128 34"/><path d="M134 44 Q137 40 140 44"/>
        <path d="M50 65 Q53 61 56 65"/><path d="M144 62 Q147 58 150 62"/>
        <path d="M55 78 Q58 74 61 78"/><path d="M139 76 Q142 72 145 76"/>
      </g>
      {/* Shine spot */}
      <ellipse cx="82" cy="42" rx="8" ry="6" fill="#404040" opacity="0.2"/>
    </g>
  );
}

function HairBraids() {
  return (
    <g>
      {/* Hair base on top */}
      <path d="M55 80 Q54 58 66 48 Q80 38 100 36 Q120 38 134 48 Q146 58 145 80 Q132 72 100 68 Q68 72 55 80Z" fill="#2D2D2D"/>
      {/* Left braid */}
      <g>
        <ellipse cx="62" cy="90" rx="5" ry="6" fill="#2D2D2D"/>
        <ellipse cx="60" cy="102" rx="4.5" ry="5.5" fill="#333"/>
        <ellipse cx="62" cy="114" rx="4" ry="5" fill="#2D2D2D"/>
        <ellipse cx="60" cy="125" rx="3.5" ry="4.5" fill="#333"/>
        <ellipse cx="62" cy="135" rx="3" ry="4" fill="#2D2D2D"/>
        <circle cx="61" cy="142" r="3" fill="#D4A853"/>
      </g>
      {/* Right braid */}
      <g>
        <ellipse cx="138" cy="90" rx="5" ry="6" fill="#2D2D2D"/>
        <ellipse cx="140" cy="102" rx="4.5" ry="5.5" fill="#333"/>
        <ellipse cx="138" cy="114" rx="4" ry="5" fill="#2D2D2D"/>
        <ellipse cx="140" cy="125" rx="3.5" ry="4.5" fill="#333"/>
        <ellipse cx="138" cy="135" rx="3" ry="4" fill="#2D2D2D"/>
        <circle cx="139" cy="142" r="3" fill="#D4A853"/>
      </g>
    </g>
  );
}

function HairSamuraiBun() {
  return (
    <g>
      {/* Slicked back hair */}
      <path d="M56 82 Q54 58 66 48 Q82 38 100 36 Q118 38 134 48 Q146 58 144 82 Q130 72 100 68 Q70 72 56 82Z" fill="#1A1A2E"/>
      {/* Top-knot bun */}
      <ellipse cx="100" cy="30" rx="14" ry="12" fill="#1A1A2E"/>
      <ellipse cx="100" cy="28" rx="10" ry="8" fill="#2D2D3D"/>
      {/* Hair tie */}
      <rect x="94" y="38" width="12" height="5" rx="2" fill="#C45D3E"/>
      {/* Shine */}
      <path d="M92 25 Q100 20 108 25" fill="none" stroke="#404050" strokeWidth="1" opacity="0.4"/>
    </g>
  );
}

function HairPigtails() {
  return (
    <g>
      {/* Hair on top */}
      <path d="M56 82 Q54 58 66 48 Q82 38 100 36 Q118 38 134 48 Q146 58 144 82 Q130 72 100 68 Q70 72 56 82Z" fill="#D4A853"/>
      {/* Center part */}
      <line x1="100" y1="36" x2="100" y2="68" stroke="#B8860B" strokeWidth="1" opacity="0.4"/>
      {/* Left pigtail */}
      <path d="M62 72 Q48 80 45 100 Q44 120 48 135 Q50 140 52 135 Q50 118 50 100 Q52 85 62 78Z" fill="#D4A853"/>
      <circle cx="48" cy="138" r="4" fill="#EC4899"/>
      {/* Right pigtail */}
      <path d="M138 72 Q152 80 155 100 Q156 120 152 135 Q150 140 148 135 Q150 118 150 100 Q148 85 138 78Z" fill="#D4A853"/>
      <circle cx="152" cy="138" r="4" fill="#EC4899"/>
    </g>
  );
}

function HairWavy() {
  return (
    <g>
      {/* Wavy medium-length hair */}
      <path d="M52 90 Q48 60 65 45 Q82 34 100 32 Q118 34 135 45 Q152 60 148 90 Q146 110 142 120 Q140 110 142 90 Q142 65 130 52 Q118 42 100 40 Q82 42 70 52 Q58 65 58 90 Q60 110 55 120 Q52 110 52 90Z" fill="#8B5E3C"/>
      {/* Wave lines */}
      <path d="M58 95 Q55 105 58 115" fill="none" stroke="#6B4226" strokeWidth="1.5" opacity="0.4"/>
      <path d="M142 95 Q145 105 142 115" fill="none" stroke="#6B4226" strokeWidth="1.5" opacity="0.4"/>
      {/* Highlight */}
      <path d="M68 50 Q78 38 92 35" fill="none" stroke="#A67B4F" strokeWidth="2" opacity="0.3"/>
    </g>
  );
}

function HairFlame() {
  return (
    <g>
      {/* Flame-shaped hair */}
      <path d="M55 85 Q50 60 60 45 Q70 30 80 25 Q75 40 72 55 Q70 70 68 80Z" fill="#FF6347" className="anim-flicker"/>
      <path d="M75 70 Q70 40 80 20 Q90 5 100 0 Q95 20 92 40 Q90 55 88 65Z" fill="#FF4500" className="anim-flicker"/>
      <path d="M90 60 Q88 30 98 10 Q108 0 115 5 Q108 20 105 40 Q102 55 100 62Z" fill="#FFD700" className="anim-flicker"/>
      <path d="M110 65 Q112 35 122 20 Q130 10 135 18 Q128 35 125 50 Q122 60 118 68Z" fill="#FF6347" className="anim-flicker"/>
      <path d="M128 75 Q132 55 140 42 Q148 35 150 45 Q145 58 140 70 Q136 78 132 82Z" fill="#FF4500" className="anim-flicker"/>
      {/* Base */}
      <path d="M55 85 Q60 75 70 72 Q85 68 100 66 Q115 68 130 72 Q140 75 145 85 Q130 78 100 76 Q70 78 55 85Z" fill="#CC3700"/>
    </g>
  );
}

function HairGalaxy() {
  return (
    <g>
      {/* Galaxy-themed hair */}
      <path d="M52 90 Q48 55 65 42 Q82 32 100 30 Q118 32 135 42 Q152 55 148 90 Q146 115 142 130 Q140 115 142 85 Q142 60 130 50 Q118 40 100 38 Q82 40 70 50 Q58 60 58 85 Q60 115 55 130 Q52 115 52 90Z" fill="#1A1A3E"/>
      {/* Nebula swirls */}
      <ellipse cx="80" cy="50" rx="12" ry="8" fill="#7C3AED" opacity="0.4"/>
      <ellipse cx="120" cy="55" rx="10" ry="7" fill="#4F46E5" opacity="0.35"/>
      <ellipse cx="100" cy="40" rx="8" ry="5" fill="#EC4899" opacity="0.3"/>
      {/* Stars */}
      <circle cx="75" cy="45" r="1.2" fill="white" className="anim-galaxy-1"/>
      <circle cx="90" cy="38" r="1" fill="white" className="anim-galaxy-2"/>
      <circle cx="110" cy="36" r="1.2" fill="white" className="anim-galaxy-3"/>
      <circle cx="125" cy="48" r="0.8" fill="white" className="anim-galaxy-1"/>
      <circle cx="68" cy="60" r="0.8" fill="white" className="anim-galaxy-2"/>
      <circle cx="132" cy="62" r="1" fill="white" className="anim-galaxy-3"/>
    </g>
  );
}

function HairRainbow() {
  return (
    <g>
      {/* Rainbow layered hair */}
      <path d="M52 90 Q48 55 65 42 Q82 32 100 30 Q118 32 135 42 Q152 55 148 90 Q146 110 142 120 Q140 105 142 80 Q142 60 130 50 Q118 40 100 38 Q82 40 70 50 Q58 60 58 80 Q60 105 55 120 Q52 110 52 90Z" fill="#EF4444"/>
      {/* Stripes */}
      <path d="M56 85 Q58 65 70 54 Q85 44 100 42 Q115 44 130 54 Q142 65 144 85" fill="none" stroke="#F97316" strokeWidth="4" opacity="0.7"/>
      <path d="M54 78 Q58 58 72 48 Q87 38 100 36 Q113 38 128 48 Q142 58 146 78" fill="none" stroke="#EAB308" strokeWidth="4" opacity="0.7"/>
      <path d="M56 70 Q62 50 76 42 Q90 34 100 32 Q110 34 124 42 Q138 50 144 70" fill="none" stroke="#22C55E" strokeWidth="4" opacity="0.7"/>
      <path d="M60 62 Q68 44 80 38 Q92 32 100 30 Q108 32 120 38 Q132 44 140 62" fill="none" stroke="#3B82F6" strokeWidth="4" opacity="0.7"/>
      <path d="M66 55 Q76 40 88 35 Q96 32 100 30 Q104 32 112 35 Q124 40 134 55" fill="none" stroke="#8B5CF6" strokeWidth="4" opacity="0.7"/>
    </g>
  );
}

function renderHair(hairId: string) {
  switch (hairId) {
    case "short_messy": return <HairShortMessy />;
    case "buzz_cut": return <HairBuzzCut />;
    case "spiky": return <HairSpiky />;
    case "side_part": return <HairSidePart />;
    case "curly": return <HairCurly />;
    case "ponytail": return <HairPonytail />;
    case "mohawk": return <HairMohawk />;
    case "bob_cut": return <HairBobCut />;
    case "long_straight": return <HairLongStraight />;
    case "afro": return <HairAfro />;
    case "braids": return <HairBraids />;
    case "samurai_bun": return <HairSamuraiBun />;
    case "pigtails": return <HairPigtails />;
    case "wavy": return <HairWavy />;
    case "flame_hair": return <HairFlame />;
    case "galaxy_hair": return <HairGalaxy />;
    case "rainbow_hair": return <HairRainbow />;
    default: return null;
  }
}

// ══════════════════════════════════════════════
// ── Hat Variants ──
// ══════════════════════════════════════════════

function HatExplorer() {
  return (
    <g>
      {/* Brim shadow */}
      <ellipse cx="100" cy="66" rx="55" ry="11" fill="#5A3A1A" opacity="0.3"/>
      {/* Brim bottom */}
      <ellipse cx="100" cy="64" rx="54" ry="11" fill="#6B4226"/>
      {/* Brim top */}
      <ellipse cx="100" cy="63" rx="54" ry="10" fill="#8B5E3C"/>
      {/* Brim highlight */}
      <ellipse cx="90" cy="62" rx="30" ry="6" fill="#A67B4F" opacity="0.25"/>
      {/* Crown */}
      <path d="M58 64 Q60 28 80 18 Q100 12 120 18 Q140 28 142 64" fill="#7A5232"/>
      {/* Crown lighter side */}
      <path d="M62 64 Q64 32 82 22 Q100 16 118 22 Q136 32 138 64" fill="#8B5E3C"/>
      {/* Crown highlight */}
      <path d="M70 60 Q72 36 88 26 Q100 22 105 24 Q95 30 80 50 Q74 58 70 60" fill="#A67B4F" opacity="0.3"/>
      {/* Crown dent */}
      <path d="M78 22 Q90 28 100 26 Q110 28 122 22 Q115 18 100 16 Q85 18 78 22Z" fill="#6B4226" opacity="0.35"/>
      {/* Leather band */}
      <rect x="60" y="54" width="80" height="9" rx="2" fill="#4A2E1A"/>
      {/* Band stitching */}
      <line x1="65" y1="58.5" x2="135" y2="58.5" stroke="#3A1E0A" strokeWidth="0.5" strokeDasharray="3,2" opacity="0.5"/>
      {/* Band highlight */}
      <rect x="60" y="54" width="80" height="3" rx="1" fill="#5C3820" opacity="0.4"/>
      {/* Band buckle */}
      <rect x="108" y="54" width="10" height="9" rx="1.5" fill="#D4A853"/>
      <rect x="110" y="56" width="6" height="5" rx="1" fill="#4A2E1A"/>
      {/* Feather */}
      <g transform="translate(130, 42) rotate(25)">
        <path d="M0 0 Q-2 -12 -1 -25 Q0 -28 1 -25 Q2 -12 0 0Z" fill="#8B6B4F"/>
        <path d="M0 -5 Q-3 -15 -2 -24" fill="none" stroke="#6B4226" strokeWidth="0.5" opacity="0.6"/>
        <path d="M0 0 Q2 -10 1 -25" fill="none" stroke="#A67B4F" strokeWidth="0.4" opacity="0.4"/>
        {/* Feather barbs */}
        <path d="M-1 -20 Q-4 -22 -5 -21" fill="none" stroke="#8B6B4F" strokeWidth="0.5"/>
        <path d="M-1 -16 Q-5 -17 -6 -16" fill="none" stroke="#8B6B4F" strokeWidth="0.5"/>
        <path d="M0 -12 Q-4 -13 -5 -12" fill="none" stroke="#8B6B4F" strokeWidth="0.5"/>
        <path d="M1 -20 Q4 -21 5 -20" fill="none" stroke="#A67B4F" strokeWidth="0.4"/>
        <path d="M1 -16 Q4 -17 5 -16" fill="none" stroke="#A67B4F" strokeWidth="0.4"/>
      </g>
    </g>
  );
}

function HatBeret() {
  return (
    <g>
      {/* Shadow under beret */}
      <ellipse cx="100" cy="67" rx="44" ry="8" fill="#1A0A0A" opacity="0.25"/>
      {/* Beret base band - dark rim sitting on head */}
      <ellipse cx="100" cy="66" rx="42" ry="7" fill="#3D1A1A"/>
      <ellipse cx="100" cy="65" rx="42" ry="6" fill="#5A2020"/>
      {/* Beret main body - droops to the right naturally */}
      <path d="M60 65 Q58 50 62 38 Q70 20 100 18 Q130 18 138 38 Q144 52 140 65" fill="#C45D3E"/>
      {/* Droop to right side - natural beret shape */}
      <path d="M100 18 Q122 16 136 28 Q148 40 144 62 Q142 66 140 65 Q144 52 138 38 Q130 18 100 18Z" fill="#B04030" opacity="0.5"/>
      {/* Highlight on upper left */}
      <path d="M65 55 Q63 40 72 28 Q82 18 100 18 Q88 22 78 34 Q68 46 66 58Z" fill="#E87060" opacity="0.35"/>
      {/* Fabric texture ridges */}
      <path d="M68 50 Q85 44 102 46 Q120 44 134 50" fill="none" stroke="#A03828" strokeWidth="0.8" opacity="0.5"/>
      <path d="M66 57 Q83 51 102 53 Q122 51 136 57" fill="none" stroke="#A03828" strokeWidth="0.8" opacity="0.5"/>
      <path d="M70 43 Q86 37 102 39 Q118 37 130 43" fill="none" stroke="#D05040" strokeWidth="0.7" opacity="0.35"/>
      <path d="M74 36 Q88 31 102 33 Q114 31 124 36" fill="none" stroke="#D05040" strokeWidth="0.7" opacity="0.35"/>
      {/* Dark shadow crease on right droop */}
      <path d="M118 22 Q132 30 138 50 Q140 58 138 65" fill="none" stroke="#8B2A1A" strokeWidth="2" opacity="0.4"/>
      {/* Band stitching detail */}
      <line x1="60" y1="63" x2="140" y2="63" stroke="#8B2A1A" strokeWidth="0.6" strokeDasharray="3,2.5" opacity="0.5"/>
      {/* Beret button/stem on top */}
      <circle cx="112" cy="22" r="5" fill="#A03828"/>
      <circle cx="112" cy="22" r="3" fill="#C45D3E"/>
      <circle cx="112" cy="22" r="1.5" fill="#D47060"/>
    </g>
  );
}

function HatBandana() {
  return (
    <g>
      {/* Shadow on head */}
      <ellipse cx="100" cy="70" rx="48" ry="7" fill="#1A0A0A" opacity="0.2"/>
      {/* Main bandana body */}
      <path d="M54 70 Q56 50 100 43 Q144 50 146 70" fill="#C45D3E"/>
      {/* Front fold lighter area */}
      <path d="M58 70 Q60 54 100 47 Q140 54 142 70" fill="#E06050" opacity="0.4"/>
      {/* Top fold crease */}
      <path d="M60 58 Q80 52 100 50 Q120 52 140 58" fill="none" stroke="#A03020" strokeWidth="1.2" opacity="0.6"/>
      {/* Fabric wrinkles / texture lines */}
      <path d="M62 64 Q80 60 100 58 Q120 60 138 64" fill="none" stroke="#B04030" strokeWidth="0.8" opacity="0.5"/>
      <path d="M64 68 Q82 64 100 62 Q118 64 136 68" fill="none" stroke="#B04030" strokeWidth="0.8" opacity="0.5"/>
      {/* Diagonal wrinkle lines for fabric feel */}
      <path d="M75 48 Q72 56 70 66" fill="none" stroke="#A03020" strokeWidth="0.7" opacity="0.35"/>
      <path d="M90 46 Q88 55 87 66" fill="none" stroke="#A03020" strokeWidth="0.7" opacity="0.35"/>
      <path d="M110 46 Q112 55 113 66" fill="none" stroke="#A03020" strokeWidth="0.7" opacity="0.35"/>
      <path d="M125 48 Q128 56 130 66" fill="none" stroke="#A03020" strokeWidth="0.7" opacity="0.35"/>
      {/* Pattern dots on bandana */}
      <circle cx="80" cy="54" r="1.5" fill="#E88060" opacity="0.5"/>
      <circle cx="100" cy="52" r="1.5" fill="#E88060" opacity="0.5"/>
      <circle cx="120" cy="54" r="1.5" fill="#E88060" opacity="0.5"/>
      <circle cx="90" cy="58" r="1" fill="#E88060" opacity="0.4"/>
      <circle cx="110" cy="58" r="1" fill="#E88060" opacity="0.4"/>
      {/* Knot tails hanging on the right side at back */}
      <path d="M138 58 Q152 62 156 70 Q158 74 155 78" fill="#C45D3E" stroke="#A03020" strokeWidth="0.5"/>
      <path d="M142 60 Q154 64 156 72 Q157 76 155 78" fill="#A03828" opacity="0.6"/>
      <path d="M140 60 Q156 66 158 74 Q159 78 155 80" fill="#C45D3E" stroke="#A03020" strokeWidth="0.5"/>
      {/* Knot bump detail */}
      <ellipse cx="140" cy="58" rx="6" ry="4" fill="#B04030" transform="rotate(-20 140 58)"/>
      <ellipse cx="140" cy="58" rx="4" ry="2.5" fill="#D06050" opacity="0.5" transform="rotate(-20 140 58)"/>
      {/* Lower edge shadow */}
      <path d="M54 70 Q80 76 100 74 Q120 76 146 70" fill="#8B2A1A" opacity="0.3"/>
    </g>
  );
}

function HatCap() {
  return (
    <g>
      {/* Shadow under cap base */}
      <ellipse cx="100" cy="68" rx="47" ry="7" fill="#1A2A40" opacity="0.3"/>
      {/* Cap crown - main body */}
      <path d="M57 66 Q60 40 100 32 Q140 40 143 66" fill="#4A7FC4"/>
      {/* Panel seams - 6 panel cap */}
      <path d="M100 32 Q102 48 100 66" fill="none" stroke="#3A6BA8" strokeWidth="1" opacity="0.7"/>
      <path d="M100 32 Q82 42 74 62" fill="none" stroke="#3A6BA8" strokeWidth="1" opacity="0.6"/>
      <path d="M100 32 Q118 42 126 62" fill="none" stroke="#3A6BA8" strokeWidth="1" opacity="0.6"/>
      {/* Highlight on left panel */}
      <path d="M60 62 Q62 44 76 36 Q88 30 98 32 Q86 36 74 48 Q64 58 62 64Z" fill="#6A9FE4" opacity="0.3"/>
      {/* Sweatband at base */}
      <ellipse cx="100" cy="65" rx="43" ry="6" fill="#3A6BA8"/>
      <ellipse cx="100" cy="64" rx="43" ry="5.5" fill="#4A7FC4" opacity="0.5"/>
      {/* Stitching on sweatband */}
      <line x1="58" y1="64" x2="142" y2="64" stroke="#2A5A90" strokeWidth="0.6" strokeDasharray="3,2" opacity="0.6"/>
      {/* Button on top */}
      <circle cx="100" cy="33" r="4" fill="#3A6BA8"/>
      <circle cx="100" cy="33" r="2.5" fill="#5A8FC4"/>
      <circle cx="99" cy="32" r="1" fill="#8ABFE8" opacity="0.6"/>
      {/* Visor - curved */}
      <path d="M58 66 Q54 68 48 68 Q40 68 36 72 Q38 76 46 76 Q60 74 72 70 Q80 68 90 67" fill="#3A6BA8"/>
      {/* Visor underside shadow */}
      <path d="M58 66 Q54 70 48 70 Q40 70 36 73 Q38 76 46 76 Q60 74 72 70 Q80 68 90 67" fill="#2A5080" opacity="0.5"/>
      {/* Visor top highlight */}
      <path d="M58 66 Q54 67 48 67 Q42 67 38 70 Q40 68 48 68 Q60 66 76 67" fill="#6A9FE4" opacity="0.4"/>
      {/* Visor stitching */}
      <path d="M42 72 Q54 70 72 68 Q84 67 90 67" fill="none" stroke="#2A5080" strokeWidth="0.8" strokeDasharray="2.5,2" opacity="0.6"/>
      {/* Logo patch */}
      <rect x="86" y="38" width="28" height="16" rx="3" fill="#D4A853"/>
      <rect x="88" y="40" width="24" height="12" rx="2" fill="#B8860B"/>
      <text x="100" y="49" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="bold" fill="#FFD700" textAnchor="middle">SF</text>
      <rect x="87" y="38" width="26" height="3" rx="1.5" fill="#E8C060" opacity="0.5"/>
    </g>
  );
}

function HatBeanie() {
  return (
    <g>
      {/* Shadow underneath */}
      <ellipse cx="100" cy="67" rx="45" ry="7" fill="#0A1A10" opacity="0.25"/>
      {/* Beanie main body */}
      <path d="M58 65 Q60 30 100 22 Q140 30 142 65" fill="#3A7D5C"/>
      {/* Left shadow side */}
      <path d="M58 65 Q60 30 74 24 Q62 32 60 50 Q59 58 58 65Z" fill="#2A6040" opacity="0.4"/>
      {/* Right highlight side */}
      <path d="M110 24 Q128 30 140 50 Q142 58 142 65 Q130 54 118 40 Q112 30 110 24Z" fill="#4A9D70" opacity="0.3"/>
      {/* Knit V-pattern texture rows */}
      <path d="M65 58 Q68 54 72 58 Q75 54 78 58 Q81 54 84 58 Q87 54 90 58 Q93 54 96 58 Q99 54 102 58 Q105 54 108 58 Q111 54 114 58 Q117 54 120 58 Q123 54 126 58 Q129 54 132 58 Q135 54 138 58" fill="none" stroke="#2A6040" strokeWidth="1.2" opacity="0.7"/>
      <path d="M63 50 Q66 46 70 50 Q73 46 76 50 Q79 46 82 50 Q85 46 88 50 Q91 46 94 50 Q97 46 100 50 Q103 46 106 50 Q109 46 112 50 Q115 46 118 50 Q121 46 124 50 Q127 46 130 50 Q133 46 136 50" fill="none" stroke="#2A6040" strokeWidth="1.2" opacity="0.6"/>
      <path d="M64 42 Q67 38 71 42 Q74 38 77 42 Q80 38 83 42 Q86 38 89 42 Q92 38 95 42 Q98 38 101 42 Q104 38 107 42 Q110 38 113 42 Q116 38 119 42 Q122 38 125 42 Q128 38 131 42" fill="none" stroke="#2A6040" strokeWidth="1.1" opacity="0.55"/>
      <path d="M66 34 Q69 30 72 34 Q75 30 78 34 Q81 30 84 34 Q87 30 90 34 Q93 30 96 34 Q99 30 102 34 Q105 30 108 34 Q111 30 114 34 Q117 30 120 34 Q123 30 126 34" fill="none" stroke="#2A6040" strokeWidth="1" opacity="0.5"/>
      {/* Ribbed cuff band at bottom */}
      <rect x="58" y="55" width="84" height="13" rx="2" fill="#2A6040"/>
      {/* Rib vertical lines */}
      <line x1="62" y1="55" x2="62" y2="68" stroke="#3A7D5C" strokeWidth="1.5" opacity="0.6"/>
      <line x1="66" y1="55" x2="66" y2="68" stroke="#1E4A30" strokeWidth="1" opacity="0.4"/>
      <line x1="70" y1="55" x2="70" y2="68" stroke="#3A7D5C" strokeWidth="1.5" opacity="0.6"/>
      <line x1="74" y1="55" x2="74" y2="68" stroke="#1E4A30" strokeWidth="1" opacity="0.4"/>
      <line x1="78" y1="55" x2="78" y2="68" stroke="#3A7D5C" strokeWidth="1.5" opacity="0.6"/>
      <line x1="82" y1="55" x2="82" y2="68" stroke="#1E4A30" strokeWidth="1" opacity="0.4"/>
      <line x1="86" y1="55" x2="86" y2="68" stroke="#3A7D5C" strokeWidth="1.5" opacity="0.6"/>
      <line x1="90" y1="55" x2="90" y2="68" stroke="#1E4A30" strokeWidth="1" opacity="0.4"/>
      <line x1="94" y1="55" x2="94" y2="68" stroke="#3A7D5C" strokeWidth="1.5" opacity="0.6"/>
      <line x1="98" y1="55" x2="98" y2="68" stroke="#1E4A30" strokeWidth="1" opacity="0.4"/>
      <line x1="102" y1="55" x2="102" y2="68" stroke="#3A7D5C" strokeWidth="1.5" opacity="0.6"/>
      <line x1="106" y1="55" x2="106" y2="68" stroke="#1E4A30" strokeWidth="1" opacity="0.4"/>
      <line x1="110" y1="55" x2="110" y2="68" stroke="#3A7D5C" strokeWidth="1.5" opacity="0.6"/>
      <line x1="114" y1="55" x2="114" y2="68" stroke="#1E4A30" strokeWidth="1" opacity="0.4"/>
      <line x1="118" y1="55" x2="118" y2="68" stroke="#3A7D5C" strokeWidth="1.5" opacity="0.6"/>
      <line x1="122" y1="55" x2="122" y2="68" stroke="#1E4A30" strokeWidth="1" opacity="0.4"/>
      <line x1="126" y1="55" x2="126" y2="68" stroke="#3A7D5C" strokeWidth="1.5" opacity="0.6"/>
      <line x1="130" y1="55" x2="130" y2="68" stroke="#1E4A30" strokeWidth="1" opacity="0.4"/>
      <line x1="134" y1="55" x2="134" y2="68" stroke="#3A7D5C" strokeWidth="1.5" opacity="0.6"/>
      <line x1="138" y1="55" x2="138" y2="68" stroke="#1E4A30" strokeWidth="1" opacity="0.4"/>
      {/* Cuff highlight top edge */}
      <rect x="58" y="55" width="84" height="2.5" rx="1" fill="#4A9D70" opacity="0.4"/>
      {/* Pompom stem */}
      <line x1="100" y1="22" x2="100" y2="16" stroke="#3A7D5C" strokeWidth="2"/>
      {/* Pompom ball */}
      <circle cx="100" cy="13" r="8" fill="#3A7D5C"/>
      <circle cx="97" cy="11" r="3" fill="#4A9D6C" opacity="0.6"/>
      <circle cx="103" cy="9" r="2.5" fill="#2A6040" opacity="0.4"/>
      <circle cx="100" cy="16" r="2" fill="#4A9D6C" opacity="0.5"/>
      <circle cx="96" cy="14" r="1.5" fill="#5ABD80" opacity="0.4"/>
      <circle cx="104" cy="13" r="1.5" fill="#2A6040" opacity="0.5"/>
    </g>
  );
}

function HatChef() {
  return (
    <g>
      {/* Shadow underneath toque */}
      <ellipse cx="100" cy="63" rx="43" ry="7" fill="#808080" opacity="0.2"/>
      {/* Pleated base band */}
      <rect x="62" y="56" width="76" height="10" rx="2" fill="#DCDCDC"/>
      {/* Pleat vertical lines on band */}
      <line x1="68" y1="56" x2="68" y2="66" stroke="#C8C8C8" strokeWidth="1" opacity="0.8"/>
      <line x1="74" y1="56" x2="74" y2="66" stroke="#E8E8E8" strokeWidth="0.8" opacity="0.6"/>
      <line x1="80" y1="56" x2="80" y2="66" stroke="#C8C8C8" strokeWidth="1" opacity="0.8"/>
      <line x1="86" y1="56" x2="86" y2="66" stroke="#E8E8E8" strokeWidth="0.8" opacity="0.6"/>
      <line x1="92" y1="56" x2="92" y2="66" stroke="#C8C8C8" strokeWidth="1" opacity="0.8"/>
      <line x1="98" y1="56" x2="98" y2="66" stroke="#E8E8E8" strokeWidth="0.8" opacity="0.6"/>
      <line x1="104" y1="56" x2="104" y2="66" stroke="#C8C8C8" strokeWidth="1" opacity="0.8"/>
      <line x1="110" y1="56" x2="110" y2="66" stroke="#E8E8E8" strokeWidth="0.8" opacity="0.6"/>
      <line x1="116" y1="56" x2="116" y2="66" stroke="#C8C8C8" strokeWidth="1" opacity="0.8"/>
      <line x1="122" y1="56" x2="122" y2="66" stroke="#E8E8E8" strokeWidth="0.8" opacity="0.6"/>
      <line x1="128" y1="56" x2="128" y2="66" stroke="#C8C8C8" strokeWidth="1" opacity="0.8"/>
      <line x1="134" y1="56" x2="134" y2="66" stroke="#E8E8E8" strokeWidth="0.8" opacity="0.6"/>
      {/* Band highlight top edge */}
      <rect x="62" y="56" width="76" height="2" rx="1" fill="white" opacity="0.7"/>
      {/* Toque puff body - main */}
      <path d="M63 58 Q60 20 80 8 Q95 2 100 4 Q105 2 120 8 Q140 20 137 58" fill="#F5F5F5"/>
      {/* Puff folds - the characteristic toque pleating */}
      <path d="M63 58 Q62 36 66 22 Q68 14 72 10" fill="none" stroke="#D8D8D8" strokeWidth="2" opacity="0.7"/>
      <path d="M69 57 Q68 34 72 20 Q74 12 78 8" fill="none" stroke="#EBEBEB" strokeWidth="1.5" opacity="0.6"/>
      <path d="M76 56 Q75 32 78 18 Q80 10 84 7" fill="none" stroke="#D8D8D8" strokeWidth="1.5" opacity="0.6"/>
      <path d="M83 56 Q83 30 85 16 Q86 8 90 5" fill="none" stroke="#EBEBEB" strokeWidth="1.5" opacity="0.55"/>
      <path d="M100 56 Q100 28 100 12 Q100 5 100 4" fill="none" stroke="#D8D8D8" strokeWidth="1.5" opacity="0.6"/>
      <path d="M107 56 Q108 30 107 16 Q107 8 110 5" fill="none" stroke="#EBEBEB" strokeWidth="1.5" opacity="0.55"/>
      <path d="M114 56 Q116 32 116 18 Q117 10 120 7" fill="none" stroke="#D8D8D8" strokeWidth="1.5" opacity="0.6"/>
      <path d="M121 56 Q124 34 124 20 Q126 12 128 9" fill="none" stroke="#EBEBEB" strokeWidth="1.5" opacity="0.6"/>
      <path d="M128 57 Q132 36 132 22 Q133 14 130 10" fill="none" stroke="#D8D8D8" strokeWidth="2" opacity="0.7"/>
      {/* Horizontal puff bulge lines */}
      <path d="M64 42 Q80 36 100 35 Q120 36 136 42" fill="none" stroke="#E0E0E0" strokeWidth="1.5" opacity="0.6"/>
      <path d="M63 50 Q80 44 100 43 Q120 44 137 50" fill="none" stroke="#E0E0E0" strokeWidth="1.5" opacity="0.6"/>
      <path d="M65 30 Q80 24 100 22 Q120 24 135 30" fill="none" stroke="#E8E8E8" strokeWidth="1.2" opacity="0.5"/>
      {/* Left shadow */}
      <path d="M63 58 Q60 38 66 18 Q72 8 80 6 Q70 14 68 36 Q66 48 64 56Z" fill="#C8C8C8" opacity="0.35"/>
      {/* Top highlight */}
      <path d="M90 6 Q100 2 110 5 Q106 4 100 4 Q94 4 90 6Z" fill="white" opacity="0.8"/>
      <ellipse cx="100" cy="10" rx="12" ry="5" fill="white" opacity="0.5"/>
    </g>
  );
}

function HatCowboy() {
  return (
    <g>
      {/* Brim shadow cast on head */}
      <ellipse cx="100" cy="67" rx="58" ry="9" fill="#3A1A0A" opacity="0.3"/>
      {/* Brim bottom */}
      <ellipse cx="100" cy="66" rx="57" ry="10" fill="#7A4E2C"/>
      {/* Brim main top */}
      <ellipse cx="100" cy="64" rx="57" ry="9" fill="#A67B4F"/>
      {/* Brim upward curve at sides - right side */}
      <path d="M100 64 Q130 62 157 58 Q158 62 157 66 Q130 68 100 66Z" fill="#8B5E3C"/>
      {/* Brim upward curve at sides - left side */}
      <path d="M100 64 Q70 62 43 58 Q42 62 43 66 Q70 68 100 66Z" fill="#8B5E3C"/>
      {/* Brim edge stitching */}
      <ellipse cx="100" cy="64" rx="57" ry="9" fill="none" stroke="#6B4226" strokeWidth="1" strokeDasharray="4,3" opacity="0.5"/>
      {/* Brim highlight */}
      <ellipse cx="85" cy="63" rx="30" ry="5" fill="#C49A70" opacity="0.25"/>
      {/* Crown - main shape with center dent */}
      <path d="M63 64 Q65 34 80 26 Q90 34 100 32 Q110 34 120 26 Q135 34 137 64" fill="#8B5E3C"/>
      {/* Crown lighter front face */}
      <path d="M65 64 Q67 38 82 30 Q90 36 100 34 Q110 36 118 30 Q133 38 135 64" fill="#A67B4F" opacity="0.5"/>
      {/* Center dent shadow */}
      <path d="M90 34 Q95 28 100 32 Q105 28 110 34 Q105 38 100 36 Q95 38 90 34Z" fill="#6B4226" opacity="0.5"/>
      {/* Crown left shadow */}
      <path d="M63 64 Q65 42 72 32 Q66 40 64 56Z" fill="#6B4226" opacity="0.4"/>
      {/* Crown right shadow */}
      <path d="M137 64 Q135 42 128 32 Q134 40 136 56Z" fill="#6B4226" opacity="0.3"/>
      {/* Leather hat band */}
      <rect x="64" y="55" width="72" height="9" rx="2" fill="#5A3015"/>
      {/* Tooled leather pattern on band */}
      <path d="M68 59 Q72 57 76 59 Q80 57 84 59 Q88 57 92 59 Q96 57 100 59 Q104 57 108 59 Q112 57 116 59 Q120 57 124 59 Q128 57 132 59" fill="none" stroke="#8B5E3C" strokeWidth="0.8" opacity="0.6"/>
      <path d="M68 62 Q72 60 76 62 Q80 60 84 62 Q88 60 92 62 Q96 60 100 62 Q104 60 108 62 Q112 60 116 62 Q120 60 124 62 Q128 60 132 62" fill="none" stroke="#8B5E3C" strokeWidth="0.8" opacity="0.6"/>
      {/* Band edge stitching */}
      <line x1="65" y1="56" x2="135" y2="56" stroke="#7A4A25" strokeWidth="0.5" strokeDasharray="2.5,2" opacity="0.7"/>
      <line x1="65" y1="63" x2="135" y2="63" stroke="#7A4A25" strokeWidth="0.5" strokeDasharray="2.5,2" opacity="0.7"/>
      {/* Buckle */}
      <rect x="94" y="55" width="12" height="9" rx="1.5" fill="#D4A853"/>
      <rect x="96" y="57" width="8" height="5" rx="1" fill="#8B5E3C"/>
      <circle cx="100" cy="59.5" r="1.5" fill="#D4A853"/>
      {/* Band highlight */}
      <rect x="64" y="55" width="72" height="2.5" rx="1" fill="#7A4530" opacity="0.5"/>
    </g>
  );
}

function HatFedora() {
  return (
    <g>
      {/* Brim shadow */}
      <ellipse cx="100" cy="67" rx="54" ry="9" fill="#1A1A1A" opacity="0.35"/>
      {/* Brim bottom face */}
      <ellipse cx="100" cy="65" rx="53" ry="9" fill="#3A3A3A"/>
      {/* Brim top face */}
      <ellipse cx="100" cy="64" rx="53" ry="8.5" fill="#525252"/>
      {/* Brim highlight */}
      <ellipse cx="88" cy="62" rx="28" ry="5" fill="#6A6A6A" opacity="0.3"/>
      {/* Brim edge stitching */}
      <ellipse cx="100" cy="64" rx="52" ry="8" fill="none" stroke="#2A2A2A" strokeWidth="0.8" strokeDasharray="4,3" opacity="0.5"/>
      {/* Crown main body */}
      <path d="M60 64 Q62 32 100 22 Q138 32 140 64" fill="#4A4A4A"/>
      {/* Crown lighter front */}
      <path d="M62 64 Q64 36 100 26 Q136 36 138 64" fill="#5E5E5E" opacity="0.5"/>
      {/* Crown left shadow */}
      <path d="M60 64 Q62 40 68 28 Q62 40 60 56Z" fill="#2A2A2A" opacity="0.5"/>
      {/* Crown right shadow */}
      <path d="M140 64 Q138 40 132 28 Q138 40 140 56Z" fill="#2A2A2A" opacity="0.4"/>
      {/* Pinched crown crease - center top */}
      <path d="M88 24 Q94 20 100 22 Q106 20 112 24 Q106 26 100 24 Q94 26 88 24Z" fill="#2A2A2A" opacity="0.5"/>
      {/* Silk sheen line on crown */}
      <path d="M72 58 Q80 42 88 32 Q94 26 98 24" fill="none" stroke="#707070" strokeWidth="1.5" opacity="0.4"/>
      <path d="M76 60 Q84 46 92 36 Q96 30 100 26" fill="none" stroke="#606060" strokeWidth="1" opacity="0.3"/>
      {/* Grosgrain ribbon band */}
      <rect x="62" y="55" width="76" height="9" rx="2" fill="#1A1A1A"/>
      {/* Ribbon texture - diagonal weave */}
      <line x1="62" y1="55" x2="75" y2="64" stroke="#2A2A2A" strokeWidth="1.5" opacity="0.5"/>
      <line x1="68" y1="55" x2="81" y2="64" stroke="#2A2A2A" strokeWidth="1.5" opacity="0.5"/>
      <line x1="74" y1="55" x2="87" y2="64" stroke="#2A2A2A" strokeWidth="1.5" opacity="0.5"/>
      <line x1="80" y1="55" x2="93" y2="64" stroke="#2A2A2A" strokeWidth="1.5" opacity="0.5"/>
      <line x1="86" y1="55" x2="99" y2="64" stroke="#2A2A2A" strokeWidth="1.5" opacity="0.5"/>
      <line x1="92" y1="55" x2="105" y2="64" stroke="#2A2A2A" strokeWidth="1.5" opacity="0.5"/>
      <line x1="98" y1="55" x2="111" y2="64" stroke="#2A2A2A" strokeWidth="1.5" opacity="0.5"/>
      <line x1="104" y1="55" x2="117" y2="64" stroke="#2A2A2A" strokeWidth="1.5" opacity="0.5"/>
      <line x1="110" y1="55" x2="123" y2="64" stroke="#2A2A2A" strokeWidth="1.5" opacity="0.5"/>
      <line x1="116" y1="55" x2="129" y2="64" stroke="#2A2A2A" strokeWidth="1.5" opacity="0.5"/>
      <line x1="122" y1="55" x2="135" y2="64" stroke="#2A2A2A" strokeWidth="1.5" opacity="0.5"/>
      <line x1="128" y1="55" x2="138" y2="64" stroke="#2A2A2A" strokeWidth="1.5" opacity="0.5"/>
      {/* Ribbon top/bottom edges */}
      <line x1="62" y1="55.5" x2="138" y2="55.5" stroke="#404040" strokeWidth="0.8" opacity="0.7"/>
      <line x1="62" y1="63.5" x2="138" y2="63.5" stroke="#0A0A0A" strokeWidth="0.8" opacity="0.7"/>
      {/* Ribbon accent color stripe */}
      <rect x="62" y="58" width="76" height="2" rx="0.5" fill="#C45D3E" opacity="0.85"/>
      {/* Ribbon highlight */}
      <rect x="62" y="55" width="76" height="2" rx="1" fill="#303030" opacity="0.6"/>
    </g>
  );
}

function HatCrown() {
  return (
    <g>
      {/* Shadow underneath */}
      <ellipse cx="100" cy="69" rx="44" ry="7" fill="#5A4000" opacity="0.3"/>
      {/* Crown main body */}
      <path d="M60 68 L65 36 L80 52 L100 28 L120 52 L135 36 L140 68 Z" fill="#D4A853"/>
      {/* Crown metalwork shading - left face */}
      <path d="M60 68 L65 36 L74 46 L70 68Z" fill="#B8860B" opacity="0.5"/>
      {/* Crown metalwork shading - right face */}
      <path d="M140 68 L135 36 L126 46 L130 68Z" fill="#B8860B" opacity="0.5"/>
      {/* Crown highlight - front face left */}
      <path d="M65 36 L72 42 L80 52 Q74 50 68 44Z" fill="#F0C040" opacity="0.5"/>
      {/* Crown highlight - front face right */}
      <path d="M135 36 L128 42 L120 52 Q126 50 132 44Z" fill="#F0C040" opacity="0.5"/>
      {/* Ornate metalwork filigree along edges */}
      <path d="M60 68 L65 36" fill="none" stroke="#E8C060" strokeWidth="1.5" opacity="0.6"/>
      <path d="M140 68 L135 36" fill="none" stroke="#E8C060" strokeWidth="1.5" opacity="0.6"/>
      <path d="M80 52 L65 36" fill="none" stroke="#C8A030" strokeWidth="1" opacity="0.5"/>
      <path d="M80 52 L100 28" fill="none" stroke="#C8A030" strokeWidth="1" opacity="0.5"/>
      <path d="M120 52 L100 28" fill="none" stroke="#C8A030" strokeWidth="1" opacity="0.5"/>
      <path d="M120 52 L135 36" fill="none" stroke="#C8A030" strokeWidth="1" opacity="0.5"/>
      {/* Base band */}
      <rect x="60" y="61" width="80" height="9" rx="2" fill="#B8860B"/>
      {/* Velvet interior band */}
      <rect x="62" y="63" width="76" height="6" rx="1.5" fill="#6B0F1A"/>
      <rect x="63" y="63.5" width="74" height="4" rx="1" fill="#8B1A28" opacity="0.6"/>
      {/* Band gold trim top and bottom */}
      <line x1="60" y1="61.5" x2="140" y2="61.5" stroke="#E8C060" strokeWidth="1.2" opacity="0.8"/>
      <line x1="60" y1="69.5" x2="140" y2="69.5" stroke="#E8C060" strokeWidth="1.2" opacity="0.8"/>
      {/* Pearl dots on band */}
      <circle cx="70" cy="65.5" r="2" fill="#F0E8D0"/>
      <circle cx="70" cy="65.5" r="1" fill="white" opacity="0.7"/>
      <circle cx="130" cy="65.5" r="2" fill="#F0E8D0"/>
      <circle cx="130" cy="65.5" r="1" fill="white" opacity="0.7"/>
      <circle cx="100" cy="65.5" r="2" fill="#F0E8D0"/>
      <circle cx="100" cy="65.5" r="1" fill="white" opacity="0.7"/>
      {/* Left gem - ruby with facets */}
      <circle cx="80" cy="44" r="5" fill="#C00020"/>
      <path d="M80 40 L84 44 L80 48 L76 44Z" fill="#FF2040" opacity="0.5"/>
      <path d="M77 41 L80 40 L83 41" fill="none" stroke="#FF6080" strokeWidth="0.8" opacity="0.7"/>
      <circle cx="78" cy="42" r="1.5" fill="white" opacity="0.5"/>
      {/* Center gem - sapphire with facets */}
      <circle cx="100" cy="30" r="6" fill="#1A3A9A"/>
      <path d="M100 25 L105 30 L100 35 L95 30Z" fill="#4060CC" opacity="0.5"/>
      <path d="M96 26 L100 25 L104 26" fill="none" stroke="#80A0FF" strokeWidth="0.8" opacity="0.7"/>
      <circle cx="97" cy="27" r="2" fill="white" opacity="0.45"/>
      {/* Right gem - emerald with facets */}
      <circle cx="120" cy="44" r="5" fill="#0A6020"/>
      <path d="M120 40 L124 44 L120 48 L116 44Z" fill="#20A040" opacity="0.5"/>
      <path d="M117 41 L120 40 L123 41" fill="none" stroke="#40E060" strokeWidth="0.8" opacity="0.7"/>
      <circle cx="118" cy="42" r="1.5" fill="white" opacity="0.5"/>
      {/* Small accent gems on side points */}
      <circle cx="65" cy="38" r="3" fill="#D4A853"/>
      <circle cx="65" cy="38" r="1.5" fill="#F0C040"/>
      <circle cx="65" cy="38" r="0.7" fill="white" opacity="0.6"/>
      <circle cx="135" cy="38" r="3" fill="#D4A853"/>
      <circle cx="135" cy="38" r="1.5" fill="#F0C040"/>
      <circle cx="135" cy="38" r="0.7" fill="white" opacity="0.6"/>
    </g>
  );
}

function HatSailor() {
  return (
    <g>
      {/* Shadow underneath cap */}
      <ellipse cx="100" cy="67" rx="46" ry="7" fill="#101830" opacity="0.3"/>
      {/* Cap crown - white officer cap */}
      <path d="M58 64 Q60 36 100 28 Q140 36 142 64" fill="white"/>
      {/* Crown shadow left */}
      <path d="M58 64 Q60 42 68 32 Q62 42 60 56Z" fill="#C8CCE0" opacity="0.5"/>
      {/* Crown highlight right */}
      <path d="M118 30 Q132 38 140 58 Q132 48 124 38 Q118 32 118 30Z" fill="#F0F2FF" opacity="0.4"/>
      {/* Crown panel seam */}
      <path d="M100 28 Q100 46 100 64" fill="none" stroke="#D8DCF0" strokeWidth="0.8" opacity="0.5"/>
      {/* Dark navy visor band */}
      <rect x="58" y="55" width="84" height="10" rx="2" fill="#2C3E6B"/>
      {/* Gold braiding on visor band top */}
      <line x1="58" y1="55.5" x2="142" y2="55.5" stroke="#D4A853" strokeWidth="1.5" opacity="0.9"/>
      {/* Braid pattern */}
      <path d="M60 57 Q65 56 70 57 Q75 56 80 57 Q85 56 90 57 Q95 56 100 57 Q105 56 110 57 Q115 56 120 57 Q125 56 130 57 Q135 56 140 57" fill="none" stroke="#D4A853" strokeWidth="0.8" opacity="0.6"/>
      {/* Gold braiding bottom */}
      <line x1="58" y1="64.5" x2="142" y2="64.5" stroke="#D4A853" strokeWidth="1.5" opacity="0.9"/>
      {/* Band highlight */}
      <rect x="58" y="55" width="84" height="2.5" rx="1" fill="#3A5080" opacity="0.5"/>
      {/* Visor peak - extends forward left */}
      <path d="M58 65 Q54 67 42 68 Q36 70 34 74 Q38 78 50 76 Q62 74 70 70 Q78 68 90 66" fill="#2C3E6B"/>
      {/* Visor underside darker */}
      <path d="M58 65 Q54 68 44 69 Q38 71 36 74 Q40 78 50 76 Q64 74 72 70 Q80 68 90 66" fill="#1A2A50" opacity="0.5"/>
      {/* Visor gold edge braid */}
      <path d="M42 68 Q54 67 70 67 Q80 67 90 66" fill="none" stroke="#D4A853" strokeWidth="1.5" opacity="0.8"/>
      {/* Visor top sheen */}
      <path d="M58 65 Q54 66 46 67 Q40 68 38 71 Q42 68 52 67 Q62 66 78 65" fill="#3A4E7A" opacity="0.4"/>
      {/* Anchor emblem circle on front */}
      <circle cx="100" cy="38" r="11" fill="#2C3E6B"/>
      <circle cx="100" cy="38" r="9" fill="#1E2E56"/>
      {/* Anchor shape */}
      <line x1="100" y1="30" x2="100" y2="46" stroke="#D4A853" strokeWidth="2"/>
      <line x1="95" y1="33" x2="105" y2="33" stroke="#D4A853" strokeWidth="1.5"/>
      <path d="M94 46 Q100 49 106 46" fill="none" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="100" cy="30" r="2.5" fill="#D4A853"/>
      {/* Rope circle around anchor */}
      <circle cx="100" cy="38" r="7" fill="none" stroke="#D4A853" strokeWidth="0.8" opacity="0.6"/>
      {/* Emblem highlight */}
      <circle cx="97" cy="35" r="3" fill="white" opacity="0.1"/>
    </g>
  );
}

function HatWizard() {
  return (
    <g>
      {/* Shadow underneath */}
      <ellipse cx="100" cy="69" rx="50" ry="8" fill="#1A1050" opacity="0.35"/>
      {/* Hat brim */}
      <ellipse cx="100" cy="67" rx="48" ry="8" fill="#3730A3"/>
      <ellipse cx="100" cy="66" rx="48" ry="7.5" fill="#4F46E5"/>
      {/* Brim highlight */}
      <ellipse cx="88" cy="65" rx="26" ry="4" fill="#6366F1" opacity="0.4"/>
      {/* Brim edge */}
      <ellipse cx="100" cy="66" rx="47" ry="7" fill="none" stroke="#3730A3" strokeWidth="1" strokeDasharray="4,3" opacity="0.5"/>
      {/* Hat cone main body */}
      <path d="M58 66 Q76 30 100 -8 Q124 30 142 66" fill="#4F46E5"/>
      {/* Hat cone left shadow */}
      <path d="M58 66 Q70 40 84 16 Q74 38 64 58Z" fill="#2E27A8" opacity="0.5"/>
      {/* Hat cone right highlight */}
      <path d="M118 14 Q130 38 142 66 Q134 52 126 34 Q120 20 118 14Z" fill="#6366F1" opacity="0.4"/>
      {/* Flowing curved tip */}
      <path d="M95 -8 Q98 -18 100 -22 Q102 -18 105 -8" fill="#4F46E5"/>
      <path d="M100 -22 Q104 -18 108 -8" fill="#3730A3" opacity="0.5"/>
      {/* Stars with glow */}
      {/* Star 1 */}
      <circle cx="82" cy="38" r="5" fill="#D4A853" opacity="0.2"/>
      <circle cx="82" cy="38" r="3" fill="#D4A853" opacity="0.4"/>
      <polygon points="82,32 83.5,37 89,37 84.5,40 86,45 82,42 78,45 79.5,40 75,37 80.5,37" fill="#FFD700" opacity="0.9"/>
      <circle cx="80" cy="36" r="1" fill="white" opacity="0.7"/>
      {/* Star 2 */}
      <circle cx="112" cy="24" r="4" fill="#D4A853" opacity="0.2"/>
      <circle cx="112" cy="24" r="2.5" fill="#D4A853" opacity="0.4"/>
      <polygon points="112,19 113.2,23 118,23 114.4,25.5 115.6,30 112,27.5 108.4,30 109.6,25.5 106,23 110.8,23" fill="#FFD700" opacity="0.9"/>
      <circle cx="110" cy="22" r="0.8" fill="white" opacity="0.7"/>
      {/* Star 3 small */}
      <polygon points="93,50 93.8,53 97,53 94.6,54.5 95.4,57.5 93,56 90.6,57.5 91.4,54.5 89,53 92.2,53" fill="#FFD700" opacity="0.8"/>
      {/* Moon crescent */}
      <path d="M118 46 Q124 40 122 34 Q130 36 130 44 Q130 52 122 54 Q124 48 118 46Z" fill="#FFD700" opacity="0.85"/>
      <circle cx="126" cy="44" r="5" fill="#4F46E5" opacity="0.7"/>
      {/* Mystical sparkles */}
      <line x1="96" y1="14" x2="96" y2="18" stroke="#C0B0FF" strokeWidth="1" opacity="0.7"/>
      <line x1="94" y1="16" x2="98" y2="16" stroke="#C0B0FF" strokeWidth="1" opacity="0.7"/>
      <line x1="106" y1="44" x2="106" y2="47" stroke="#FFD700" strokeWidth="0.8" opacity="0.6"/>
      <line x1="104.5" y1="45.5" x2="107.5" y2="45.5" stroke="#FFD700" strokeWidth="0.8" opacity="0.6"/>
      <line x1="72" y1="54" x2="72" y2="57" stroke="#C0B0FF" strokeWidth="0.8" opacity="0.6"/>
      <line x1="70.5" y1="55.5" x2="73.5" y2="55.5" stroke="#C0B0FF" strokeWidth="0.8" opacity="0.6"/>
      {/* Brim band */}
      <rect x="58" y="61" width="84" height="7" rx="2" fill="#3730A3"/>
      {/* Band shimmer */}
      <rect x="60" y="61" width="80" height="2.5" rx="1" fill="#6366F1" opacity="0.4"/>
    </g>
  );
}

function HatTophat() {
  return (
    <g>
      {/* Brim shadow underneath */}
      <ellipse cx="100" cy="64" rx="54" ry="9" fill="#0A0A0A" opacity="0.4"/>
      {/* Brim bottom face */}
      <ellipse cx="100" cy="63" rx="53" ry="8.5" fill="#121212"/>
      {/* Brim top face */}
      <ellipse cx="100" cy="62" rx="53" ry="8" fill="#2A2A2A"/>
      {/* Brim highlight sheen */}
      <ellipse cx="86" cy="60" rx="26" ry="4.5" fill="#404040" opacity="0.4"/>
      {/* Brim silk edge */}
      <ellipse cx="100" cy="62" rx="52" ry="7.5" fill="none" stroke="#3A3A3A" strokeWidth="1.5" opacity="0.6"/>
      {/* Top hat cylinder body */}
      <rect x="68" y="13" width="64" height="50" rx="4" fill="#1E1E1E"/>
      {/* Silk sheen left edge highlight */}
      <rect x="68" y="13" width="10" height="50" rx="4" fill="#2E2E2E" opacity="0.0"/>
      <path d="M68 13 Q72 20 72 38 Q72 52 70 62 Q68 50 68 38 Q68 22 68 13Z" fill="#383838" opacity="0.5"/>
      {/* Silk sheen right edge shadow */}
      <path d="M132 13 Q130 24 130 40 Q130 54 132 62 Q132 50 132 36 Q132 22 132 13Z" fill="#0A0A0A" opacity="0.4"/>
      {/* Silk sheen diagonal highlight streaks */}
      <path d="M74 14 Q76 30 76 50" fill="none" stroke="#404040" strokeWidth="2" opacity="0.5"/>
      <path d="M80 13 Q82 28 82 52" fill="none" stroke="#3A3A3A" strokeWidth="1.5" opacity="0.35"/>
      <path d="M88 13 Q90 28 90 52" fill="none" stroke="#3A3A3A" strokeWidth="1" opacity="0.25"/>
      {/* Top of hat */}
      <ellipse cx="100" cy="14" rx="32" ry="5.5" fill="#252525"/>
      <ellipse cx="100" cy="13.5" rx="31" ry="5" fill="#2E2E2E"/>
      {/* Top highlight */}
      <ellipse cx="92" cy="13" rx="18" ry="3" fill="#404040" opacity="0.45"/>
      {/* Grosgrain ribbon band */}
      <rect x="68" y="52" width="64" height="10" rx="2" fill="#0A0A0A"/>
      {/* Ribbon weave texture */}
      <line x1="68" y1="52" x2="80" y2="62" stroke="#181818" strokeWidth="2" opacity="0.6"/>
      <line x1="74" y1="52" x2="86" y2="62" stroke="#181818" strokeWidth="2" opacity="0.6"/>
      <line x1="80" y1="52" x2="92" y2="62" stroke="#181818" strokeWidth="2" opacity="0.6"/>
      <line x1="86" y1="52" x2="98" y2="62" stroke="#181818" strokeWidth="2" opacity="0.6"/>
      <line x1="92" y1="52" x2="104" y2="62" stroke="#181818" strokeWidth="2" opacity="0.6"/>
      <line x1="98" y1="52" x2="110" y2="62" stroke="#181818" strokeWidth="2" opacity="0.6"/>
      <line x1="104" y1="52" x2="116" y2="62" stroke="#181818" strokeWidth="2" opacity="0.6"/>
      <line x1="110" y1="52" x2="122" y2="62" stroke="#181818" strokeWidth="2" opacity="0.6"/>
      <line x1="116" y1="52" x2="128" y2="62" stroke="#181818" strokeWidth="2" opacity="0.6"/>
      <line x1="122" y1="52" x2="132" y2="62" stroke="#181818" strokeWidth="2" opacity="0.6"/>
      {/* Ribbon gold accent stripe */}
      <rect x="68" y="56" width="64" height="2" rx="0.5" fill="#D4A853" opacity="0.9"/>
      {/* Ribbon highlight */}
      <rect x="68" y="52" width="64" height="2" rx="1" fill="#1E1E1E" opacity="0.7"/>
      <rect x="68" y="60" width="64" height="2" rx="0" fill="#050505" opacity="0.7"/>
    </g>
  );
}

function HatViking() {
  return (
    <g>
      {/* Shadow underneath helmet */}
      <ellipse cx="100" cy="68" rx="48" ry="8" fill="#2A1A0A" opacity="0.3"/>
      {/* Helmet bowl main body */}
      <path d="M56 65 Q58 34 100 26 Q142 34 144 65" fill="#8B5E3C"/>
      {/* Leather texture - horizontal bands */}
      <path d="M59 55 Q80 50 100 49 Q120 50 141 55" fill="none" stroke="#6B4226" strokeWidth="1.5" opacity="0.6"/>
      <path d="M60 46 Q80 40 100 39 Q120 40 140 46" fill="none" stroke="#6B4226" strokeWidth="1.2" opacity="0.5"/>
      <path d="M63 38 Q80 33 100 32 Q120 33 137 38" fill="none" stroke="#6B4226" strokeWidth="1" opacity="0.45"/>
      {/* Leather texture - vertical seams */}
      <path d="M100 26 Q100 46 100 65" fill="none" stroke="#7A4E2A" strokeWidth="1" opacity="0.4"/>
      <path d="M79 28 Q76 46 74 65" fill="none" stroke="#7A4E2A" strokeWidth="1" opacity="0.35"/>
      <path d="M121 28 Q124 46 126 65" fill="none" stroke="#7A4E2A" strokeWidth="1" opacity="0.35"/>
      {/* Left face shadow */}
      <path d="M56 65 Q58 44 66 32 Q60 44 58 58Z" fill="#6B4226" opacity="0.4"/>
      {/* Right face highlight */}
      <path d="M128 28 Q138 42 144 60 Q136 48 130 34Z" fill="#C49A6C" opacity="0.3"/>
      {/* Nasal guard - front strip */}
      <rect x="97" y="48" width="6" height="20" rx="2" fill="#7A4E2A"/>
      <rect x="98" y="49" width="4" height="18" rx="1.5" fill="#A67B4F" opacity="0.4"/>
      {/* Metal rivets */}
      <circle cx="72" cy="42" r="3" fill="#C49A6C"/>
      <circle cx="72" cy="42" r="1.5" fill="#E0C090" opacity="0.7"/>
      <circle cx="128" cy="42" r="3" fill="#C49A6C"/>
      <circle cx="128" cy="42" r="1.5" fill="#E0C090" opacity="0.7"/>
      <circle cx="100" cy="30" r="3" fill="#C49A6C"/>
      <circle cx="100" cy="30" r="1.5" fill="#E0C090" opacity="0.7"/>
      <circle cx="80" cy="57" r="2.5" fill="#C49A6C"/>
      <circle cx="80" cy="57" r="1.2" fill="#E0C090" opacity="0.7"/>
      <circle cx="120" cy="57" r="2.5" fill="#C49A6C"/>
      <circle cx="120" cy="57" r="1.2" fill="#E0C090" opacity="0.7"/>
      {/* Bottom rim band */}
      <rect x="56" y="57" width="88" height="10" rx="2" fill="#5A3215"/>
      {/* Rim rivets */}
      <circle cx="68" cy="62" r="2.5" fill="#C49A6C"/>
      <circle cx="68" cy="62" r="1.2" fill="#E0C090" opacity="0.7"/>
      <circle cx="84" cy="62" r="2.5" fill="#C49A6C"/>
      <circle cx="84" cy="62" r="1.2" fill="#E0C090" opacity="0.7"/>
      <circle cx="100" cy="62" r="2.5" fill="#C49A6C"/>
      <circle cx="100" cy="62" r="1.2" fill="#E0C090" opacity="0.7"/>
      <circle cx="116" cy="62" r="2.5" fill="#C49A6C"/>
      <circle cx="116" cy="62" r="1.2" fill="#E0C090" opacity="0.7"/>
      <circle cx="132" cy="62" r="2.5" fill="#C49A6C"/>
      <circle cx="132" cy="62" r="1.2" fill="#E0C090" opacity="0.7"/>
      {/* Rim highlight */}
      <rect x="56" y="57" width="88" height="3" rx="1.5" fill="#8B5E3C" opacity="0.4"/>
      {/* LEFT HORN */}
      {/* Horn base */}
      <path d="M56 58 Q44 50 36 38 Q30 28 30 18 Q34 14 36 16 Q36 26 42 36 Q50 48 58 56Z" fill="#EDE8DC"/>
      {/* Horn main curve */}
      <path d="M56 56 Q42 44 36 30 Q32 20 33 14 Q36 14 38 18 Q36 28 42 40 Q50 50 58 56Z" fill="#F5F2EA"/>
      {/* Horn ridges */}
      <path d="M52 55 Q40 44 36 32 Q34 24 34 18" fill="none" stroke="#D0C8B0" strokeWidth="1.5" opacity="0.7"/>
      <path d="M48 54 Q38 44 36 34 Q34 26 35 20" fill="none" stroke="#D0C8B0" strokeWidth="1.2" opacity="0.6"/>
      <path d="M54 53 Q44 46 40 36 Q37 28 37 22" fill="none" stroke="#E8E0C8" strokeWidth="1" opacity="0.5"/>
      {/* Horn tip */}
      <path d="M33 14 Q32 10 34 8 Q36 10 37 14Z" fill="#E0D8C0"/>
      {/* Horn shadow right face */}
      <path d="M56 56 Q44 46 38 32 Q34 22 34 14 Q36 22 36 32 Q40 46 52 54Z" fill="#C8C0A8" opacity="0.35"/>
      {/* RIGHT HORN */}
      {/* Horn base */}
      <path d="M144 58 Q156 50 164 38 Q170 28 170 18 Q166 14 164 16 Q164 26 158 36 Q150 48 142 56Z" fill="#EDE8DC"/>
      {/* Horn main curve */}
      <path d="M144 56 Q158 44 164 30 Q168 20 167 14 Q164 14 162 18 Q164 28 158 40 Q150 50 142 56Z" fill="#F5F2EA"/>
      {/* Horn ridges */}
      <path d="M148 55 Q160 44 164 32 Q166 24 166 18" fill="none" stroke="#D0C8B0" strokeWidth="1.5" opacity="0.7"/>
      <path d="M152 54 Q162 44 164 34 Q166 26 165 20" fill="none" stroke="#D0C8B0" strokeWidth="1.2" opacity="0.6"/>
      <path d="M146 53 Q156 46 160 36 Q163 28 163 22" fill="none" stroke="#E8E0C8" strokeWidth="1" opacity="0.5"/>
      {/* Horn tip */}
      <path d="M167 14 Q168 10 166 8 Q164 10 163 14Z" fill="#E0D8C0"/>
      {/* Horn highlight left face */}
      <path d="M144 56 Q156 48 162 34 Q166 24 166 16 Q162 24 160 34 Q154 48 144 54Z" fill="white" opacity="0.2"/>
    </g>
  );
}

function HatSheriff() {
  return (
    <g>
      {/* Brim shadow */}
      <ellipse cx="100" cy="67" rx="56" ry="9" fill="#4A2A10" opacity="0.3"/>
      {/* Brim bottom */}
      <ellipse cx="100" cy="66" rx="55" ry="9.5" fill="#A67B4F"/>
      {/* Brim top */}
      <ellipse cx="100" cy="64" rx="55" ry="9" fill="#C49A6C"/>
      {/* Brim upturned sides */}
      <path d="M100 64 Q128 62 154 56 Q155 60 154 64 Q128 68 100 66Z" fill="#B08050"/>
      <path d="M100 64 Q72 62 46 56 Q45 60 46 64 Q72 68 100 66Z" fill="#B08050"/>
      {/* Brim highlight */}
      <ellipse cx="86" cy="63" rx="28" ry="5" fill="#D4B880" opacity="0.3"/>
      {/* Brim stitching edge */}
      <ellipse cx="100" cy="64" rx="54" ry="8.5" fill="none" stroke="#8B6030" strokeWidth="0.8" strokeDasharray="3,2.5" opacity="0.6"/>
      {/* Crown body */}
      <path d="M62 64 Q64 32 100 24 Q136 32 138 64" fill="#B08A50"/>
      {/* Crown highlight */}
      <path d="M64 64 Q66 36 100 28 Q134 36 136 64" fill="#C49A6C" opacity="0.5"/>
      {/* Crown left shadow */}
      <path d="M62 64 Q64 42 70 30 Q64 42 62 58Z" fill="#8B6030" opacity="0.4"/>
      {/* Crown right shadow */}
      <path d="M138 64 Q136 42 130 30 Q136 42 138 58Z" fill="#8B6030" opacity="0.35"/>
      {/* Center dent on top */}
      <path d="M88 26 Q94 22 100 24 Q106 22 112 26 Q106 30 100 28 Q94 30 88 26Z" fill="#8B6030" opacity="0.45"/>
      {/* Leather hat band */}
      <rect x="63" y="56" width="74" height="9" rx="2" fill="#7A5030"/>
      {/* Leather tooling on band - decorative swirls */}
      <path d="M68 60 Q71 58 74 60 Q77 58 80 60" fill="none" stroke="#A07850" strokeWidth="0.8" opacity="0.6"/>
      <path d="M85 60 Q88 58 91 60 Q94 58 97 60" fill="none" stroke="#A07850" strokeWidth="0.8" opacity="0.6"/>
      <path d="M103 60 Q106 58 109 60 Q112 58 115 60" fill="none" stroke="#A07850" strokeWidth="0.8" opacity="0.6"/>
      <path d="M120 60 Q123 58 126 60 Q129 58 132 60" fill="none" stroke="#A07850" strokeWidth="0.8" opacity="0.6"/>
      {/* Band stitching */}
      <line x1="64" y1="57" x2="136" y2="57" stroke="#8B6030" strokeWidth="0.5" strokeDasharray="2.5,2" opacity="0.7"/>
      <line x1="64" y1="64" x2="136" y2="64" stroke="#8B6030" strokeWidth="0.5" strokeDasharray="2.5,2" opacity="0.7"/>
      {/* Hat cord */}
      <path d="M74 56 Q78 46 76 38" fill="none" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="76" cy="37" r="2.5" fill="#D4A853"/>
      {/* Star badge - detailed 6-pointed sheriff star */}
      {/* Star glow */}
      <circle cx="100" cy="38" r="14" fill="#D4A853" opacity="0.15"/>
      {/* Star back plate */}
      <polygon points="100,26 103.5,35 113,35 106,41 109,50 100,45 91,50 94,41 87,35 96.5,35" fill="#D4A853"/>
      {/* Star center circle */}
      <circle cx="100" cy="38" r="6" fill="#B8860B"/>
      <circle cx="100" cy="38" r="4.5" fill="#D4A853"/>
      {/* Star facets / detail lines */}
      <line x1="100" y1="27" x2="100" y2="32" stroke="#F0C040" strokeWidth="1" opacity="0.7"/>
      <line x1="108" y1="36" x2="104" y2="38" stroke="#F0C040" strokeWidth="1" opacity="0.6"/>
      <line x1="106" y1="48" x2="103" y2="44" stroke="#F0C040" strokeWidth="1" opacity="0.6"/>
      <line x1="92" y1="48" x2="95" y2="44" stroke="#F0C040" strokeWidth="1" opacity="0.6"/>
      <line x1="92" y1="36" x2="96" y2="38" stroke="#F0C040" strokeWidth="1" opacity="0.6"/>
      {/* Star outline */}
      <polygon points="100,26 103.5,35 113,35 106,41 109,50 100,45 91,50 94,41 87,35 96.5,35" fill="none" stroke="#B8860B" strokeWidth="1"/>
      {/* Star highlight */}
      <circle cx="98" cy="36" r="2" fill="white" opacity="0.3"/>
    </g>
  );
}

function HatTurban() {
  return (
    <g>
      {/* Shadow under turban */}
      <ellipse cx="100" cy="70" rx="50" ry="8" fill="#1A1200" opacity="0.25"/>
      {/* Turban base layer - innermost wrap */}
      <path d="M58 68 Q60 35 100 26 Q140 35 142 68" fill="#E8E0D0"/>
      {/* Second wrap layer */}
      <path d="M56 66 Q58 32 100 22 Q142 32 144 66" fill="#F0E8D8"/>
      {/* Left wrap shadow */}
      <path d="M56 66 Q58 40 66 28 Q60 40 58 56Z" fill="#C8C0A8" opacity="0.4"/>
      {/* Right wrap highlight */}
      <path d="M128 24 Q140 36 144 58 Q136 44 128 30Z" fill="white" opacity="0.25"/>
      {/* Diagonal wrap lines - defining the fabric layers */}
      <path d="M58 62 Q75 55 100 54 Q125 55 142 62" fill="none" stroke="#D8D0B8" strokeWidth="2.5" opacity="0.7"/>
      <path d="M57 54 Q74 48 100 47 Q126 48 143 54" fill="none" stroke="#D8D0B8" strokeWidth="2" opacity="0.65"/>
      <path d="M58 46 Q74 40 100 39 Q126 40 142 46" fill="none" stroke="#D8D0B8" strokeWidth="2" opacity="0.6"/>
      <path d="M60 38 Q76 32 100 31 Q124 32 140 38" fill="none" stroke="#D8D0B8" strokeWidth="1.5" opacity="0.55"/>
      {/* Fabric wrinkle folds */}
      <path d="M72 65 Q74 58 73 50 Q72 44 74 38" fill="none" stroke="#C8C0A8" strokeWidth="1" opacity="0.4"/>
      <path d="M88 66 Q90 59 89 51 Q88 44 89 38" fill="none" stroke="#C8C0A8" strokeWidth="1" opacity="0.35"/>
      <path d="M112 66 Q110 59 111 51 Q112 44 111 38" fill="none" stroke="#C8C0A8" strokeWidth="1" opacity="0.35"/>
      <path d="M128 65 Q126 58 127 50 Q128 44 126 38" fill="none" stroke="#C8C0A8" strokeWidth="1" opacity="0.4"/>
      {/* Gold filigree brooch backing */}
      <ellipse cx="100" cy="32" rx="16" ry="13" fill="#D4A853"/>
      {/* Filigree pattern */}
      <ellipse cx="100" cy="32" rx="14" ry="11" fill="#B8860B"/>
      {/* Filigree decorative ring */}
      <ellipse cx="100" cy="32" rx="13" ry="10" fill="none" stroke="#E8C040" strokeWidth="1.5" opacity="0.8"/>
      <ellipse cx="100" cy="32" rx="10" ry="7.5" fill="none" stroke="#E8C040" strokeWidth="1" opacity="0.7"/>
      {/* Filigree spokes */}
      <line x1="100" y1="22" x2="100" y2="42" stroke="#E8C040" strokeWidth="0.8" opacity="0.6"/>
      <line x1="87" y1="32" x2="113" y2="32" stroke="#E8C040" strokeWidth="0.8" opacity="0.6"/>
      <line x1="91" y1="23" x2="109" y2="41" stroke="#E8C040" strokeWidth="0.7" opacity="0.5"/>
      <line x1="109" y1="23" x2="91" y2="41" stroke="#E8C040" strokeWidth="0.7" opacity="0.5"/>
      {/* Central gemstone - ruby */}
      <circle cx="100" cy="32" r="6" fill="#CC1030"/>
      {/* Gem facets */}
      <path d="M100 26 L103 32 L100 38 L97 32Z" fill="#FF2050" opacity="0.5"/>
      <path d="M94 32 L100 29 L106 32 L100 35Z" fill="#FF4060" opacity="0.4"/>
      <circle cx="98" cy="29" r="2" fill="white" opacity="0.4"/>
      {/* Gold filigree corner decorations */}
      <circle cx="88" cy="24" r="2.5" fill="#D4A853"/>
      <circle cx="112" cy="24" r="2.5" fill="#D4A853"/>
      <circle cx="88" cy="40" r="2.5" fill="#D4A853"/>
      <circle cx="112" cy="40" r="2.5" fill="#D4A853"/>
    </g>
  );
}

function HatSombrero() {
  return (
    <g>
      {/* Wide brim shadow */}
      <ellipse cx="100" cy="68" rx="63" ry="11" fill="#5A3A00" opacity="0.3"/>
      {/* Brim bottom face */}
      <ellipse cx="100" cy="66" rx="62" ry="11" fill="#B8860B"/>
      {/* Brim main top face */}
      <ellipse cx="100" cy="64" rx="62" ry="10.5" fill="#D4A853"/>
      {/* Brim outer highlight ring */}
      <ellipse cx="100" cy="64" rx="60" ry="9.5" fill="none" stroke="#E8C060" strokeWidth="1.5" opacity="0.6"/>
      {/* Brim embroidery band - outer */}
      <ellipse cx="100" cy="64" rx="58" ry="9" fill="none" stroke="#C45D3E" strokeWidth="2" opacity="0.7"/>
      <ellipse cx="100" cy="64" rx="56" ry="8.5" fill="none" stroke="#3A7D5C" strokeWidth="1.5" opacity="0.7"/>
      <ellipse cx="100" cy="64" rx="54" ry="8" fill="none" stroke="#E8C060" strokeWidth="1" opacity="0.6"/>
      {/* Decorative embroidery flowers on brim */}
      <circle cx="48" cy="62" r="4" fill="#C45D3E" opacity="0.7"/>
      <circle cx="48" cy="62" r="2" fill="#FFD700" opacity="0.8"/>
      <circle cx="152" cy="62" r="4" fill="#C45D3E" opacity="0.7"/>
      <circle cx="152" cy="62" r="2" fill="#FFD700" opacity="0.8"/>
      <circle cx="72" cy="58" r="3" fill="#3A7D5C" opacity="0.7"/>
      <circle cx="72" cy="58" r="1.5" fill="#FFD700" opacity="0.8"/>
      <circle cx="128" cy="58" r="3" fill="#3A7D5C" opacity="0.7"/>
      <circle cx="128" cy="58" r="1.5" fill="#FFD700" opacity="0.8"/>
      {/* Brim top highlight */}
      <ellipse cx="86" cy="62" rx="28" ry="6" fill="#E8C060" opacity="0.2"/>
      {/* Crown body */}
      <path d="M66 64 Q68 30 100 22 Q132 30 134 64" fill="#C49A44"/>
      {/* Crown highlight */}
      <path d="M68 64 Q70 34 100 26 Q130 34 132 64" fill="#D4A853" opacity="0.5"/>
      {/* Crown left shadow */}
      <path d="M66 64 Q68 42 74 30 Q68 42 66 56Z" fill="#9A7030" opacity="0.4"/>
      {/* Crown right shadow */}
      <path d="M134 64 Q132 42 126 30 Q132 42 134 56Z" fill="#9A7030" opacity="0.35"/>
      {/* Crown embroidery band */}
      <rect x="66" y="55" width="68" height="9" rx="2" fill="#9A6A20"/>
      {/* Embroidery pattern on band */}
      <path d="M70 59 Q73 57 76 59 Q79 57 82 59 Q85 57 88 59 Q91 57 94 59 Q97 57 100 59 Q103 57 106 59 Q109 57 112 59 Q115 57 118 59 Q121 57 124 59 Q127 57 130 59" fill="none" stroke="#E8C060" strokeWidth="1" opacity="0.8"/>
      <path d="M70 62 Q73 60 76 62 Q79 60 82 62 Q85 60 88 62 Q91 60 94 62 Q97 60 100 62 Q103 60 106 62 Q109 60 112 62 Q115 60 118 62 Q121 60 124 62 Q127 60 130 62" fill="none" stroke="#C45D3E" strokeWidth="1" opacity="0.7"/>
      {/* Band color accents */}
      <line x1="66" y1="55.5" x2="134" y2="55.5" stroke="#E8C060" strokeWidth="1.2" opacity="0.8"/>
      <line x1="66" y1="63.5" x2="134" y2="63.5" stroke="#E8C060" strokeWidth="1.2" opacity="0.8"/>
      {/* Tassels hanging from brim */}
      {/* Left tassel */}
      <line x1="52" y1="68" x2="52" y2="80" stroke="#D4A853" strokeWidth="1.5"/>
      <line x1="50" y1="68" x2="50" y2="79" stroke="#C45D3E" strokeWidth="1"/>
      <line x1="54" y1="68" x2="54" y2="81" stroke="#3A7D5C" strokeWidth="1"/>
      <circle cx="52" cy="81" r="2.5" fill="#D4A853"/>
      <circle cx="50" cy="80" r="2" fill="#C45D3E"/>
      <circle cx="54" cy="82" r="2" fill="#3A7D5C"/>
      {/* Right tassel */}
      <line x1="148" y1="68" x2="148" y2="80" stroke="#D4A853" strokeWidth="1.5"/>
      <line x1="146" y1="68" x2="146" y2="79" stroke="#C45D3E" strokeWidth="1"/>
      <line x1="150" y1="68" x2="150" y2="81" stroke="#3A7D5C" strokeWidth="1"/>
      <circle cx="148" cy="81" r="2.5" fill="#D4A853"/>
      <circle cx="146" cy="80" r="2" fill="#C45D3E"/>
      <circle cx="150" cy="82" r="2" fill="#3A7D5C"/>
    </g>
  );
}

function HatAviator() {
  return (
    <g>
      {/* Shadow underneath */}
      <ellipse cx="100" cy="68" rx="46" ry="7" fill="#1A0A00" opacity="0.3"/>
      {/* Leather cap main body */}
      <path d="M58 65 Q60 36 100 28 Q140 36 142 65" fill="#6B4226"/>
      {/* Leather texture - horizontal grain lines */}
      <path d="M60 55 Q80 50 100 49 Q120 50 140 55" fill="none" stroke="#5A3218" strokeWidth="1.2" opacity="0.6"/>
      <path d="M61 46 Q80 41 100 40 Q120 41 139 46" fill="none" stroke="#5A3218" strokeWidth="1" opacity="0.5"/>
      <path d="M63 38 Q80 33 100 32 Q120 33 137 38" fill="none" stroke="#5A3218" strokeWidth="0.8" opacity="0.45"/>
      {/* Left side shadow */}
      <path d="M58 65 Q60 42 68 30 Q62 42 60 57Z" fill="#4A2010" opacity="0.4"/>
      {/* Right side highlight */}
      <path d="M122 30 Q136 42 142 60 Q134 48 126 36Z" fill="#8B6040" opacity="0.3"/>
      {/* Ear flap left */}
      <path d="M58 58 Q52 64 50 72 Q52 78 58 76 Q62 72 62 65Z" fill="#6B4226"/>
      <path d="M58 58 Q54 64 52 71 Q54 76 58 74 Q60 70 61 64Z" fill="#8B5E3C" opacity="0.4"/>
      {/* Ear flap right */}
      <path d="M142 58 Q148 64 150 72 Q148 78 142 76 Q138 72 138 65Z" fill="#6B4226"/>
      <path d="M142 58 Q146 64 148 71 Q146 76 142 74 Q140 70 139 64Z" fill="#4A2010" opacity="0.4"/>
      {/* Fleece lining visible on ear flap edges */}
      <path d="M50 72 Q52 78 58 76" fill="none" stroke="#E8DDD0" strokeWidth="3" strokeLinecap="round"/>
      <path d="M150 72 Q148 78 142 76" fill="none" stroke="#E8DDD0" strokeWidth="3" strokeLinecap="round"/>
      {/* Fleece lining dots texture */}
      <circle cx="53" cy="73" r="1.5" fill="#D8CCC0" opacity="0.7"/>
      <circle cx="55" cy="76" r="1.2" fill="#D8CCC0" opacity="0.6"/>
      <circle cx="147" cy="73" r="1.5" fill="#D8CCC0" opacity="0.7"/>
      <circle cx="145" cy="76" r="1.2" fill="#D8CCC0" opacity="0.6"/>
      {/* Bottom rim band - darker leather */}
      <rect x="58" y="57" width="84" height="10" rx="2" fill="#4A2E1A"/>
      {/* Fleece lining at bottom rim */}
      <rect x="60" y="62" width="80" height="5" rx="2" fill="#E8DDD0"/>
      {/* Fleece texture dots */}
      <circle cx="68" cy="64.5" r="1.5" fill="#D0C4B8" opacity="0.7"/>
      <circle cx="76" cy="64" r="1.2" fill="#D0C4B8" opacity="0.6"/>
      <circle cx="84" cy="64.5" r="1.5" fill="#D0C4B8" opacity="0.7"/>
      <circle cx="92" cy="64" r="1.2" fill="#D0C4B8" opacity="0.6"/>
      <circle cx="100" cy="64.5" r="1.5" fill="#D0C4B8" opacity="0.7"/>
      <circle cx="108" cy="64" r="1.2" fill="#D0C4B8" opacity="0.6"/>
      <circle cx="116" cy="64.5" r="1.5" fill="#D0C4B8" opacity="0.7"/>
      <circle cx="124" cy="64" r="1.2" fill="#D0C4B8" opacity="0.6"/>
      <circle cx="132" cy="64.5" r="1.5" fill="#D0C4B8" opacity="0.7"/>
      {/* Goggle frames - thick brass/metal */}
      <ellipse cx="81" cy="48" rx="14" ry="10" fill="#D4A853"/>
      <ellipse cx="119" cy="48" rx="14" ry="10" fill="#D4A853"/>
      {/* Goggle frame inner dark ring */}
      <ellipse cx="81" cy="48" rx="12" ry="8.5" fill="#3A2010"/>
      <ellipse cx="119" cy="48" rx="12" ry="8.5" fill="#3A2010"/>
      {/* Goggle lens - tinted glass */}
      <ellipse cx="81" cy="48" rx="10" ry="7" fill="#6AAEC0"/>
      <ellipse cx="81" cy="48" rx="10" ry="7" fill="#1A3A50" opacity="0.3"/>
      <ellipse cx="119" cy="48" rx="10" ry="7" fill="#6AAEC0"/>
      <ellipse cx="119" cy="48" rx="10" ry="7" fill="#1A3A50" opacity="0.3"/>
      {/* Goggle lens glass reflections */}
      <ellipse cx="77" cy="45" rx="4" ry="2.5" fill="white" opacity="0.35"/>
      <ellipse cx="115" cy="45" rx="4" ry="2.5" fill="white" opacity="0.35"/>
      <ellipse cx="78" cy="51" rx="2" ry="1" fill="white" opacity="0.2"/>
      <ellipse cx="116" cy="51" rx="2" ry="1" fill="white" opacity="0.2"/>
      {/* Goggle frame screw details */}
      <circle cx="69" cy="40" r="2" fill="#C49A44"/>
      <circle cx="93" cy="40" r="2" fill="#C49A44"/>
      <circle cx="107" cy="40" r="2" fill="#C49A44"/>
      <circle cx="131" cy="40" r="2" fill="#C49A44"/>
      <circle cx="69" cy="56" r="2" fill="#C49A44"/>
      <circle cx="93" cy="56" r="2" fill="#C49A44"/>
      <circle cx="107" cy="56" r="2" fill="#C49A44"/>
      <circle cx="131" cy="56" r="2" fill="#C49A44"/>
      {/* Center nose bridge */}
      <rect x="93" y="45" width="14" height="6" rx="2.5" fill="#D4A853"/>
      <rect x="94" y="46" width="12" height="4" rx="2" fill="#B8860B"/>
      {/* Bridge highlight */}
      <rect x="95" y="45" width="10" height="2" rx="1" fill="#E8C060" opacity="0.6"/>
    </g>
  );
}

function HatSamurai() {
  return (
    <g>
      {/* Kabuto dome */}
      <path d="M52 66 Q55 35 100 24 Q145 35 148 66" fill="#2D2D2D"/>
      <path d="M54 66 Q57 38 100 28 Q143 38 146 66" fill="#3D3D3D" opacity="0.5"/>
      {/* Plate segments */}
      <path d="M100 24 L100 66" stroke="#1A1A1A" strokeWidth="0.8" opacity="0.4"/>
      <path d="M76 30 L68 66" stroke="#1A1A1A" strokeWidth="0.6" opacity="0.3"/>
      <path d="M124 30 L132 66" stroke="#1A1A1A" strokeWidth="0.6" opacity="0.3"/>
      {/* Rivets along plates */}
      <circle cx="72" cy="50" r="1.2" fill="#D4A853"/>
      <circle cx="85" cy="42" r="1.2" fill="#D4A853"/>
      <circle cx="115" cy="42" r="1.2" fill="#D4A853"/>
      <circle cx="128" cy="50" r="1.2" fill="#D4A853"/>
      {/* Maedate crest */}
      <path d="M92 28 Q96 12 100 -2 Q104 12 108 28" fill="#C45D3E"/>
      <path d="M94 28 Q97 14 100 2 Q103 14 106 28" fill="#E85D3E" opacity="0.4"/>
      <path d="M96 20 L100 0 L104 20" fill="#D4A853" opacity="0.5"/>
      {/* Mon (crest emblem) */}
      <circle cx="100" cy="36" r="7" fill="#D4A853" stroke="#B8860B" strokeWidth="1"/>
      <circle cx="100" cy="36" r="5" fill="#2D2D2D"/>
      <path d="M97 33 L100 30 L103 33 M97 39 L100 42 L103 39" stroke="#D4A853" strokeWidth="1" fill="none"/>
      {/* Shikoro (neck guard) */}
      <rect x="50" y="58" width="100" height="4" rx="1" fill="#1A1A1A"/>
      <rect x="48" y="62" width="104" height="3" rx="1" fill="#2D2D2D"/>
      <rect x="46" y="65" width="108" height="3" rx="1" fill="#3D3D3D"/>
      <rect x="44" y="68" width="112" height="3" rx="1" fill="#4D4D4D"/>
      {/* Shikoro lacing */}
      <g stroke="#C45D3E" strokeWidth="0.8" opacity="0.6">
        <line x1="60" y1="59" x2="60" y2="71"/><line x1="75" y1="59" x2="75" y2="71"/>
        <line x1="90" y1="59" x2="90" y2="71"/><line x1="110" y1="59" x2="110" y2="71"/>
        <line x1="125" y1="59" x2="125" y2="71"/><line x1="140" y1="59" x2="140" y2="71"/>
      </g>
      {/* Fukikaeshi (side wings) */}
      <path d="M50 60 Q42 55 38 60 Q40 65 48 62" fill="#C45D3E"/>
      <path d="M150 60 Q158 55 162 60 Q160 65 152 62" fill="#C45D3E"/>
    </g>
  );
}

function HatPharaoh() {
  return (
    <g>
      {/* Nemes cloth main */}
      <path d="M55 72 Q58 25 100 12 Q142 25 145 72" fill="#D4A853"/>
      <path d="M57 72 Q60 28 100 16 Q140 28 143 72" fill="#E8C860" opacity="0.5"/>
      {/* Horizontal stripes */}
      <g stroke="#B8860B" strokeWidth="1.5" opacity="0.4">
        <path d="M62 32 Q100 26 138 32"/><path d="M58 42 Q100 36 142 42"/>
        <path d="M56 52 Q100 46 144 52"/><path d="M55 62 Q100 56 145 62"/>
      </g>
      {/* Side lappets - shorter, stop above eyes */}
      <path d="M55 72 Q53 76 52 82 Q51 84 54 84 Q57 82 58 76" fill="#D4A853" stroke="#B8860B" strokeWidth="0.8"/>
      <path d="M145 72 Q147 76 148 82 Q149 84 146 84 Q143 82 142 76" fill="#D4A853" stroke="#B8860B" strokeWidth="0.8"/>
      {/* Lappet stripes */}
      <line x1="53" y1="77" x2="57" y2="77" stroke="#B8860B" strokeWidth="1"/>
      <line x1="52" y1="81" x2="56" y2="81" stroke="#B8860B" strokeWidth="1"/>
      <line x1="143" y1="77" x2="147" y2="77" stroke="#B8860B" strokeWidth="1"/>
      <line x1="144" y1="81" x2="148" y2="81" stroke="#B8860B" strokeWidth="1"/>
      {/* Crown band */}
      <rect x="56" y="62" width="88" height="8" rx="2" fill="#B8860B"/>
      <rect x="56" y="63" width="88" height="6" rx="1" fill="#D4A853"/>
      {/* Band pattern */}
      <g fill="#B8860B" opacity="0.5">
        <rect x="62" y="64" width="3" height="4" rx="0.5"/>
        <rect x="72" y="64" width="3" height="4" rx="0.5"/>
        <rect x="82" y="64" width="3" height="4" rx="0.5"/>
        <rect x="92" y="64" width="3" height="4" rx="0.5"/>
        <rect x="112" y="64" width="3" height="4" rx="0.5"/>
        <rect x="122" y="64" width="3" height="4" rx="0.5"/>
        <rect x="132" y="64" width="3" height="4" rx="0.5"/>
      </g>
      {/* Uraeus (cobra) */}
      <path d="M98 18 Q100 8 102 18" fill="#3A7D5C" stroke="#2E6A4A" strokeWidth="1"/>
      <path d="M96 22 Q98 12 100 4 Q102 12 104 22" fill="#3A7D5C"/>
      <path d="M94 18 Q100 16 106 18" fill="#3A7D5C" opacity="0.6"/>
      <circle cx="99" cy="10" r="1.2" fill="#E85D3E"/>
      <circle cx="101" cy="10" r="1.2" fill="#E85D3E"/>
      <circle cx="100" cy="4" r="1.5" fill="#D4A853"/>
    </g>
  );
}

function HatKnight() {
  return (
    <g>
      {/* Helmet dome */}
      <path d="M56 66 Q58 28 100 16 Q142 28 144 66" fill="#A8A8B0"/>
      <path d="M58 66 Q60 32 100 20 Q140 32 142 66" fill="#C0C0C8" opacity="0.35"/>
      {/* Metal plate lines */}
      <path d="M100 16 L100 66" stroke="#808088" strokeWidth="1" opacity="0.3"/>
      <path d="M80 22 L74 66" stroke="#808088" strokeWidth="0.6" opacity="0.25"/>
      <path d="M120 22 L126 66" stroke="#808088" strokeWidth="0.6" opacity="0.25"/>
      {/* Highlight sheen */}
      <path d="M75 30 Q85 26 90 40 Q88 55 80 62" fill="white" opacity="0.12"/>
      {/* Rivets */}
      <circle cx="70" cy="55" r="1.5" fill="#808088" stroke="#606068" strokeWidth="0.5"/>
      <circle cx="130" cy="55" r="1.5" fill="#808088" stroke="#606068" strokeWidth="0.5"/>
      <circle cx="100" cy="22" r="1.5" fill="#808088" stroke="#606068" strokeWidth="0.5"/>
      {/* Brow guard */}
      <rect x="54" y="58" width="92" height="10" rx="2" fill="#808088"/>
      <rect x="56" y="59" width="88" height="3" rx="1" fill="#909098" opacity="0.4"/>
      {/* Visor slit */}
      <rect x="68" y="70" width="64" height="4" rx="1" fill="#404048"/>
      <rect x="70" y="71" width="60" height="2" rx="0.5" fill="#2D2D2D"/>
      {/* Nasal guard */}
      <rect x="97" y="64" width="6" height="12" rx="1" fill="#909098"/>
      <rect x="98" y="65" width="4" height="10" rx="0.5" fill="#A8A8B0" opacity="0.5"/>
      {/* Plume */}
      <path d="M100 16 Q95 5 92 -8 Q100 -2 105 -10 Q108 0 115 -8 Q110 5 105 16" fill="#C45D3E"/>
      <path d="M100 16 Q97 8 95 -4 Q100 2 103 -5 Q106 3 108 -4 Q105 8 103 16" fill="#E85D3E" opacity="0.4"/>
      {/* Plume texture lines */}
      <path d="M96 4 Q100 0 104 4" stroke="#A83E2E" strokeWidth="0.5" fill="none" opacity="0.5"/>
      <path d="M94 -2 Q100 -5 106 -2" stroke="#A83E2E" strokeWidth="0.5" fill="none" opacity="0.5"/>
    </g>
  );
}

function HatAstronaut() {
  return (
    <g>
      {/* Helmet shell */}
      <path d="M50 72 Q48 30 100 14 Q152 30 150 72" fill="#E8E8E8"/>
      <path d="M52 72 Q50 34 100 18 Q150 34 148 72" fill="#F5F5F5" opacity="0.5"/>
      {/* Panel lines */}
      <path d="M100 14 L100 72" stroke="#D0D0D0" strokeWidth="0.8" opacity="0.4"/>
      <path d="M75 20 L65 72" stroke="#D0D0D0" strokeWidth="0.6" opacity="0.3"/>
      <path d="M125 20 L135 72" stroke="#D0D0D0" strokeWidth="0.6" opacity="0.3"/>
      {/* Highlight */}
      <path d="M68 32 Q78 26 82 40 Q80 55 72 65" fill="white" opacity="0.15"/>
      {/* Ear pads */}
      <circle cx="52" cy="60" r="8" fill="#D0D0D0"/>
      <circle cx="52" cy="60" r="5" fill="#E0E0E0"/>
      <circle cx="52" cy="60" r="2" fill="#B0B0B0"/>
      <circle cx="148" cy="60" r="8" fill="#D0D0D0"/>
      <circle cx="148" cy="60" r="5" fill="#E0E0E0"/>
      <circle cx="148" cy="60" r="2" fill="#B0B0B0"/>
      {/* Visor */}
      <path d="M64 68 Q100 54 136 68" fill="#87CEEB" opacity="0.5" stroke="#B0B0B0" strokeWidth="2"/>
      <path d="M68 67 Q100 56 132 67" fill="white" opacity="0.15"/>
      {/* Visor frame */}
      <rect x="52" y="64" width="96" height="10" rx="3" fill="#D0D0D8"/>
      <rect x="54" y="65" width="92" height="3" rx="1" fill="#E0E0E0" opacity="0.5"/>
      {/* Antenna */}
      <line x1="140" y1="28" x2="155" y2="12" stroke="#B0B0B0" strokeWidth="2"/>
      <circle cx="156" cy="10" r="3" fill="#FF4444" opacity="0.8"/>
      <circle cx="156" cy="10" r="1.5" fill="#FF8888" opacity="0.6"/>
      {/* Flag patch */}
      <rect x="56" y="40" width="10" height="7" rx="1" fill="#C45D3E" opacity="0.6"/>
      <line x1="56" y1="42" x2="66" y2="42" stroke="white" strokeWidth="0.8" opacity="0.5"/>
    </g>
  );
}

function HatDragon() {
  return (
    <g>
      {/* Helmet base */}
      <path d="M54 68 Q56 32 100 20 Q144 32 146 68" fill="#8B1A1A"/>
      <path d="M56 68 Q58 36 100 24 Q142 36 144 68" fill="#DC2626" opacity="0.6"/>
      {/* Scales texture */}
      <g fill="#991B1B" opacity="0.4">
        <path d="M72 40 Q80 36 88 40 Q80 44 72 40Z"/>
        <path d="M88 36 Q96 32 104 36 Q96 40 88 36Z"/>
        <path d="M104 40 Q112 36 120 40 Q112 44 104 40Z"/>
        <path d="M80 48 Q88 44 96 48 Q88 52 80 48Z"/>
        <path d="M96 48 Q104 44 112 48 Q104 52 96 48Z"/>
        <path d="M112 52 Q120 48 128 52 Q120 56 112 52Z"/>
      </g>
      {/* Spikes - layered */}
      <path d="M73 30 L80 10 L87 30" fill="#DC2626" stroke="#991B1B" strokeWidth="0.8"/>
      <path d="M75 30 L80 14 L85 30" fill="#EF4444" opacity="0.4"/>
      <path d="M91 26 L100 2 L109 26" fill="#DC2626" stroke="#991B1B" strokeWidth="0.8"/>
      <path d="M93 26 L100 6 L107 26" fill="#EF4444" opacity="0.4"/>
      <path d="M113 30 L120 10 L127 30" fill="#DC2626" stroke="#991B1B" strokeWidth="0.8"/>
      <path d="M115 30 L120 14 L125 30" fill="#EF4444" opacity="0.4"/>
      {/* Brow guard */}
      <rect x="54" y="60" width="92" height="10" rx="2" fill="#991B1B"/>
      <rect x="56" y="61" width="88" height="3" rx="1" fill="#B82020" opacity="0.4"/>
      {/* Dragon eyes */}
      <ellipse cx="80" cy="52" rx="6" ry="5" fill="#1A1A1A"/>
      <ellipse cx="80" cy="52" rx="5" ry="4" fill="#FBBF24"/>
      <ellipse cx="80" cy="52" rx="2" ry="4" fill="#1A1A1A"/>
      <circle cx="78" cy="50" r="1" fill="white" opacity="0.6"/>
      <ellipse cx="120" cy="52" rx="6" ry="5" fill="#1A1A1A"/>
      <ellipse cx="120" cy="52" rx="5" ry="4" fill="#FBBF24"/>
      <ellipse cx="120" cy="52" rx="2" ry="4" fill="#1A1A1A"/>
      <circle cx="118" cy="50" r="1" fill="white" opacity="0.6"/>
      {/* Nostrils */}
      <circle cx="92" cy="62" r="2" fill="#4A0000" opacity="0.5"/>
      <circle cx="108" cy="62" r="2" fill="#4A0000" opacity="0.5"/>
    </g>
  );
}

function HatSpartan() {
  return (
    <g>
      {/* Helmet dome */}
      <path d="M56 66 Q58 32 100 20 Q142 32 144 66" fill="#CD7F32"/>
      <path d="M58 66 Q60 36 100 24 Q140 36 142 66" fill="#D4A853" opacity="0.35"/>
      {/* Metal sheen */}
      <path d="M72 34 Q82 28 88 42 Q86 54 78 62" fill="white" opacity="0.1"/>
      {/* Face guard */}
      <path d="M70 66 L70 82 Q72 86 78 86 Q82 86 82 82 L82 66" fill="#CD7F32" stroke="#8B6914" strokeWidth="0.8"/>
      <path d="M118 66 L118 82 Q120 86 126 86 Q130 86 130 82 L130 66" fill="#CD7F32" stroke="#8B6914" strokeWidth="0.8"/>
      {/* Nasal guard */}
      <rect x="96" y="60" width="8" height="18" rx="1.5" fill="#B8860B"/>
      <rect x="97" y="61" width="6" height="16" rx="1" fill="#CD7F32" opacity="0.5"/>
      {/* Eye slits */}
      <rect x="82" y="70" width="14" height="3" rx="1" fill="#2D2D2D"/>
      <rect x="104" y="70" width="14" height="3" rx="1" fill="#2D2D2D"/>
      {/* Crest - large mohawk */}
      <path d="M88 22 Q94 -15 100 -20 Q106 -15 112 22" fill="#C45D3E"/>
      <path d="M90 22 Q95 -10 100 -16 Q105 -10 110 22" fill="#E85D3E" opacity="0.4"/>
      {/* Crest hair texture */}
      <g stroke="#A83E2E" strokeWidth="0.6" fill="none" opacity="0.5">
        <path d="M94 10 Q100 6 106 10"/><path d="M92 0 Q100 -4 108 0"/>
        <path d="M93 -8 Q100 -12 107 -8"/>
      </g>
      {/* Brow band */}
      <rect x="54" y="58" width="92" height="8" rx="2" fill="#8B6914"/>
      <rect x="56" y="59" width="88" height="3" rx="1" fill="#B8860B" opacity="0.4"/>
      {/* Rivets */}
      <circle cx="64" cy="62" r="1.5" fill="#D4A853"/><circle cx="80" cy="62" r="1.5" fill="#D4A853"/>
      <circle cx="120" cy="62" r="1.5" fill="#D4A853"/><circle cx="136" cy="62" r="1.5" fill="#D4A853"/>
    </g>
  );
}

function HatDivine() {
  return (
    <g>
      {/* Glow effect - pulsing */}
      <ellipse cx="100" cy="45" rx="55" ry="35" fill="#FBBF24" className="anim-halo"/>
      <ellipse cx="100" cy="45" rx="45" ry="28" fill="#FDE68A" className="anim-pulse-soft"/>
      {/* Crown base */}
      <path d="M58 68 Q60 28 100 14 Q140 28 142 68" fill="#FBBF24"/>
      <path d="M60 68 Q62 32 100 18 Q138 32 140 68" fill="#FDE68A" opacity="0.5"/>
      {/* Engraved pattern */}
      <path d="M72 40 Q86 34 100 38 Q114 34 128 40" fill="none" stroke="#D4A853" strokeWidth="1" opacity="0.5"/>
      <path d="M68 50 Q84 44 100 48 Q116 44 132 50" fill="none" stroke="#D4A853" strokeWidth="1" opacity="0.5"/>
      {/* Band */}
      <rect x="58" y="60" width="84" height="8" rx="2" fill="#D4A853"/>
      <rect x="60" y="61" width="80" height="6" rx="1" fill="#E8C860" opacity="0.4"/>
      {/* Gems on band */}
      <circle cx="75" cy="64" r="2.5" fill="#E85D3E" opacity="0.8"/><circle cx="75" cy="63.5" r="1" fill="white" opacity="0.3"/>
      <circle cx="100" cy="64" r="2.5" fill="#4A7FC4" opacity="0.8"/><circle cx="100" cy="63.5" r="1" fill="white" opacity="0.3"/>
      <circle cx="125" cy="64" r="2.5" fill="#3A7D5C" opacity="0.8"/><circle cx="125" cy="63.5" r="1" fill="white" opacity="0.3"/>
      {/* Rays of light - pulsing */}
      <g stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" className="anim-pulse">
        <line x1="100" y1="14" x2="100" y2="-2"/><line x1="80" y1="20" x2="68" y2="6"/>
        <line x1="120" y1="20" x2="132" y2="6"/><line x1="70" y1="32" x2="56" y2="22"/>
        <line x1="130" y1="32" x2="144" y2="22"/>
      </g>
      {/* Ray tips */}
      <circle cx="100" cy="-4" r="2" fill="#FDE68A" className="anim-sparkle-1"/>
      <circle cx="67" cy="4" r="1.5" fill="#FDE68A" className="anim-sparkle-2"/>
      <circle cx="133" cy="4" r="1.5" fill="#FDE68A" className="anim-sparkle-3"/>
    </g>
  );
}

function HatHalo() {
  return (
    <g>
      {/* Outer glow */}
      <ellipse cx="100" cy="42" rx="38" ry="12" fill="#FBBF24" className="anim-halo"/>
      <ellipse cx="100" cy="42" rx="35" ry="10" fill="#FDE68A" className="anim-pulse-soft"/>
      {/* Main ring */}
      <ellipse cx="100" cy="42" rx="32" ry="8" fill="none" stroke="#FBBF24" strokeWidth="5"/>
      <ellipse cx="100" cy="42" rx="32" ry="8" fill="none" stroke="#FDE68A" strokeWidth="2" opacity="0.6"/>
      {/* Inner glow */}
      <ellipse cx="100" cy="42" rx="28" ry="5" fill="#FDE68A" className="anim-pulse-soft"/>
      {/* Sparkle highlights */}
      <circle cx="72" cy="40" r="1.5" fill="white" className="anim-sparkle-1"/>
      <circle cx="128" cy="40" r="1.5" fill="white" className="anim-sparkle-2"/>
      <circle cx="100" cy="34" r="1" fill="white" className="anim-sparkle-3"/>
      {/* Light particles */}
      <circle cx="80" cy="32" r="1" fill="#FBBF24" className="anim-sparkle-2"/>
      <circle cx="120" cy="32" r="1" fill="#FBBF24" className="anim-sparkle-3"/>
    </g>
  );
}

function HatLaurel() {
  return (
    <g>
      {/* Left branch stem */}
      <path d="M95 68 Q70 55 62 40 Q58 30 62 18 Q60 12 68 8" fill="none" stroke="#2E6A4A" strokeWidth="2.5"/>
      {/* Left leaves - with veins */}
      <ellipse cx="62" cy="48" rx="10" ry="5" fill="#3A7D5C" transform="rotate(-25 62 48)"/>
      <path d="M56 48 L68 48" stroke="#2E6A4A" strokeWidth="0.5" opacity="0.5"/>
      <ellipse cx="60" cy="36" rx="9" ry="4.5" fill="#3A7D5C" transform="rotate(-35 60 36)"/>
      <path d="M54 36 L66 36" stroke="#2E6A4A" strokeWidth="0.5" opacity="0.5"/>
      <ellipse cx="62" cy="24" rx="8" ry="4" fill="#3A7D5C" transform="rotate(-40 62 24)"/>
      <path d="M57 24 L67 24" stroke="#2E6A4A" strokeWidth="0.5" opacity="0.5"/>
      <ellipse cx="66" cy="14" rx="7" ry="3.5" fill="#3A7D5C" transform="rotate(-45 66 14)"/>
      {/* Left leaf highlights */}
      <ellipse cx="62" cy="47" rx="6" ry="2.5" fill="#4ADE80" opacity="0.2" transform="rotate(-25 62 47)"/>
      <ellipse cx="60" cy="35" rx="5" ry="2" fill="#4ADE80" opacity="0.2" transform="rotate(-35 60 35)"/>
      {/* Right branch stem */}
      <path d="M105 68 Q130 55 138 40 Q142 30 138 18 Q140 12 132 8" fill="none" stroke="#2E6A4A" strokeWidth="2.5"/>
      {/* Right leaves - with veins */}
      <ellipse cx="138" cy="48" rx="10" ry="5" fill="#3A7D5C" transform="rotate(25 138 48)"/>
      <path d="M132 48 L144 48" stroke="#2E6A4A" strokeWidth="0.5" opacity="0.5"/>
      <ellipse cx="140" cy="36" rx="9" ry="4.5" fill="#3A7D5C" transform="rotate(35 140 36)"/>
      <path d="M134 36 L146 36" stroke="#2E6A4A" strokeWidth="0.5" opacity="0.5"/>
      <ellipse cx="138" cy="24" rx="8" ry="4" fill="#3A7D5C" transform="rotate(40 138 24)"/>
      <path d="M133 24 L143 24" stroke="#2E6A4A" strokeWidth="0.5" opacity="0.5"/>
      <ellipse cx="134" cy="14" rx="7" ry="3.5" fill="#3A7D5C" transform="rotate(45 134 14)"/>
      {/* Right leaf highlights */}
      <ellipse cx="138" cy="47" rx="6" ry="2.5" fill="#4ADE80" opacity="0.2" transform="rotate(25 138 47)"/>
      <ellipse cx="140" cy="35" rx="5" ry="2" fill="#4ADE80" opacity="0.2" transform="rotate(35 140 35)"/>
      {/* Berries */}
      <circle cx="72" cy="10" r="2" fill="#C45D3E" opacity="0.7"/>
      <circle cx="128" cy="10" r="2" fill="#C45D3E" opacity="0.7"/>
      <circle cx="70" cy="8" r="1" fill="#E85D3E" opacity="0.4"/>
      <circle cx="130" cy="8" r="1" fill="#E85D3E" opacity="0.4"/>
    </g>
  );
}

function HatCosmic() {
  return (
    <g>
      {/* Outer glow */}
      <ellipse cx="100" cy="42" rx="55" ry="30" fill="#312E81" opacity="0.1"/>
      {/* Helmet dome */}
      <path d="M54 68 Q56 22 100 8 Q144 22 146 68" fill="#1E1B4B"/>
      <path d="M56 68 Q58 26 100 12 Q142 26 144 68" fill="#312E81" opacity="0.5"/>
      {/* Nebula swirl */}
      <path d="M70 35 Q85 25 100 35 Q115 45 130 35" fill="none" stroke="#6366F1" strokeWidth="2" opacity="0.2"/>
      <path d="M65 48 Q85 38 105 48 Q125 58 140 48" fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.15"/>
      {/* Stars - twinkling */}
      <circle cx="78" cy="32" r="2.5" fill="white" className="anim-galaxy-1"/>
      <circle cx="78" cy="32" r="1" fill="white"/>
      <circle cx="118" cy="28" r="2" fill="white" className="anim-galaxy-2"/>
      <circle cx="118" cy="28" r="0.8" fill="white"/>
      <circle cx="95" cy="22" r="1.5" fill="#FBBF24" className="anim-galaxy-3"/>
      <circle cx="130" cy="40" r="1.5" fill="white" className="anim-galaxy-1"/>
      <circle cx="70" cy="50" r="1" fill="white" className="anim-galaxy-2"/>
      <circle cx="110" cy="48" r="1.2" fill="#87CEEB" className="anim-galaxy-3"/>
      {/* Shooting star */}
      <line x1="85" y1="40" x2="75" y2="44" stroke="white" strokeWidth="0.8" className="anim-shimmer"/>
      <circle cx="85" cy="40" r="1.5" fill="white" className="anim-sparkle-1"/>
      {/* Constellation lines */}
      <g stroke="white" strokeWidth="0.4" opacity="0.25">
        <line x1="78" y1="32" x2="95" y2="22"/><line x1="95" y1="22" x2="118" y2="28"/>
        <line x1="118" y1="28" x2="130" y2="40"/>
      </g>
      {/* Band */}
      <rect x="54" y="60" width="92" height="8" rx="2" fill="#1E1B4B"/>
      <rect x="56" y="61" width="88" height="3" rx="1" fill="#312E81" opacity="0.4"/>
      {/* Galaxy swirl emblem */}
      <circle cx="100" cy="64" r="3" fill="#6366F1" opacity="0.6"/>
      <circle cx="100" cy="64" r="1.5" fill="white" opacity="0.4"/>
    </g>
  );
}

function HatPhoenix() {
  return (
    <g>
      {/* Heat glow */}
      <ellipse cx="100" cy="30" rx="45" ry="30" fill="#F97316" opacity="0.06"/>
      {/* Helmet */}
      <path d="M56 68 Q58 28 100 14 Q142 28 144 68" fill="#DC2626"/>
      <path d="M58 68 Q60 32 100 18 Q140 32 142 68" fill="#EF4444" opacity="0.4"/>
      {/* Feather texture */}
      <g fill="#B91C1C" opacity="0.3">
        <path d="M68 42 Q80 36 92 42 L80 46Z"/>
        <path d="M82 36 Q94 30 106 36 L94 40Z"/>
        <path d="M108 42 Q120 36 132 42 L120 46Z"/>
        <path d="M76 52 Q88 46 100 52 L88 56Z"/>
        <path d="M100 52 Q112 46 124 52 L112 56Z"/>
      </g>
      {/* Flames - multilayer animated */}
      <g className="anim-flicker">
        <path d="M75 20 Q70 2 78 -12 Q75 5 85 14" fill="#F97316" opacity="0.8"/>
        <path d="M92 16 Q88 -5 96 -18 Q94 0 102 12" fill="#F97316" opacity="0.9"/>
        <path d="M108 18 Q112 0 120 -10 Q115 8 108 16" fill="#F97316" opacity="0.8"/>
      </g>
      <g className="anim-flicker-delayed">
        <path d="M77 18 Q73 5 80 -8 Q78 8 86 16" fill="#FBBF24" opacity="0.5"/>
        <path d="M94 14 Q91 -2 97 -14 Q96 2 103 12" fill="#FDE68A" opacity="0.5"/>
        <path d="M110 16 Q113 4 118 -6 Q114 10 109 16" fill="#FBBF24" opacity="0.5"/>
      </g>
      {/* Ember particles - rising */}
      <circle cx="70" cy="5" r="1.5" fill="#FBBF24" className="anim-ember-1"/>
      <circle cx="130" cy="2" r="1" fill="#F97316" className="anim-ember-2"/>
      <circle cx="100" cy="-15" r="1.5" fill="#FDE68A" className="anim-ember-3"/>
      {/* Beak emblem */}
      <path d="M95 56 L100 48 L105 56" fill="#D4A853" stroke="#B8860B" strokeWidth="0.8"/>
      {/* Band */}
      <rect x="54" y="60" width="92" height="8" rx="2" fill="#991B1B"/>
      <rect x="56" y="61" width="88" height="3" rx="1" fill="#B82020" opacity="0.3"/>
    </g>
  );
}

function HatInfinity() {
  return (
    <g>
      {/* Aura glow */}
      <ellipse cx="100" cy="40" rx="50" ry="30" fill="#7C3AED" opacity="0.08"/>
      {/* Dome */}
      <path d="M54 68 Q56 22 100 8 Q144 22 146 68" fill="#7C3AED"/>
      <path d="M56 68 Q58 26 100 12 Q142 26 144 68" fill="#8B5CF6" opacity="0.45"/>
      {/* Mystic pattern */}
      <path d="M70 40 Q85 30 100 40 Q115 50 130 40" fill="none" stroke="#A78BFA" strokeWidth="1.5" opacity="0.3"/>
      <path d="M65 52 Q82 42 100 52 Q118 62 135 52" fill="none" stroke="#A78BFA" strokeWidth="1" opacity="0.2"/>
      {/* Infinity symbol - detailed */}
      <path d="M80 38 Q68 26 68 38 Q68 50 80 38 Q92 26 104 38 Q116 50 116 38 Q116 26 104 38 Q92 50 80 38" fill="none" stroke="#FBBF24" strokeWidth="3" opacity="0.8"/>
      <path d="M80 38 Q68 26 68 38 Q68 50 80 38 Q92 26 104 38 Q116 50 116 38 Q116 26 104 38 Q92 50 80 38" fill="none" stroke="#FDE68A" strokeWidth="1.5" opacity="0.5"/>
      {/* Glow nodes - pulsing */}
      <circle cx="68" cy="38" r="3" fill="#FBBF24" className="anim-pulse"/>
      <circle cx="92" cy="38" r="3" fill="#FBBF24" className="anim-pulse-delayed"/>
      <circle cx="116" cy="38" r="3" fill="#FBBF24" className="anim-pulse"/>
      {/* Sparkles */}
      <circle cx="75" cy="30" r="1" fill="white" className="anim-sparkle-1"/>
      <circle cx="109" cy="30" r="1" fill="white" className="anim-sparkle-2"/>
      <circle cx="92" cy="46" r="1" fill="white" className="anim-sparkle-3"/>
      {/* Band */}
      <rect x="54" y="60" width="92" height="8" rx="2" fill="#5B21B6"/>
      <rect x="56" y="61" width="88" height="3" rx="1" fill="#7C3AED" opacity="0.4"/>
      {/* Band gems */}
      <circle cx="80" cy="64" r="2" fill="#FBBF24" opacity="0.6"/>
      <circle cx="100" cy="64" r="2" fill="#FBBF24" opacity="0.6"/>
      <circle cx="120" cy="64" r="2" fill="#FBBF24" opacity="0.6"/>
    </g>
  );
}

function HatPirate() {
  return (
    <g>
      {/* Hat body */}
      <path d="M46 72 Q52 28 100 14 Q148 28 154 72" fill="#1A1A1A"/>
      <path d="M48 72 Q54 32 100 18 Q146 32 152 72" fill="#2D2D2D" opacity="0.5"/>
      {/* Tri-corner folds */}
      <path d="M50 72 Q48 68 52 64 Q70 58 100 56 Q130 58 148 64 Q152 68 150 72" fill="#1A1A1A"/>
      {/* Brim */}
      <ellipse cx="100" cy="70" rx="56" ry="8" fill="#1A1A1A"/>
      <ellipse cx="100" cy="69" rx="54" ry="6" fill="#2D2D2D" opacity="0.3"/>
      {/* Gold trim */}
      <path d="M54 68 Q100 62 146 68" fill="none" stroke="#D4A853" strokeWidth="2"/>
      <rect x="58" y="64" width="84" height="4" rx="1" fill="#D4A853" opacity="0.3"/>
      {/* Skull */}
      <ellipse cx="100" cy="44" rx="10" ry="11" fill="#F5F5F0"/>
      <ellipse cx="100" cy="42" rx="9" ry="9" fill="#FAFAFA"/>
      {/* Skull eyes */}
      <ellipse cx="95" cy="42" rx="3" ry="3.5" fill="#1A1A1A"/>
      <ellipse cx="105" cy="42" rx="3" ry="3.5" fill="#1A1A1A"/>
      <circle cx="94" cy="41" r="0.8" fill="#333"/>
      <circle cx="104" cy="41" r="0.8" fill="#333"/>
      {/* Skull nose */}
      <path d="M99 46 L100.5 44 L101.5 46" fill="#D0D0D0"/>
      {/* Skull teeth */}
      <path d="M95 49 L96 52 L98 49 L100 52 L102 49 L104 52 L105 49" fill="none" stroke="#E0E0E0" strokeWidth="1"/>
      {/* Crossbones */}
      <path d="M84 54 L116 34" stroke="#F5F5F0" strokeWidth="3" strokeLinecap="round"/>
      <path d="M116 54 L84 34" stroke="#F5F5F0" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="84" cy="54" r="2" fill="#F5F5F0"/><circle cx="84" cy="34" r="2" fill="#F5F5F0"/>
      <circle cx="116" cy="54" r="2" fill="#F5F5F0"/><circle cx="116" cy="34" r="2" fill="#F5F5F0"/>
      {/* Feather */}
      <path d="M130 60 Q145 50 150 30 Q148 35 142 40 Q148 30 146 20" fill="#C45D3E" opacity="0.7"/>
      <path d="M132 58 Q144 48 148 32" fill="none" stroke="#A83E2E" strokeWidth="0.5" opacity="0.5"/>
    </g>
  );
}

function HatSanta() {
  return (
    <g>
      {/* Fur trim base */}
      <ellipse cx="100" cy="68" rx="50" ry="10" fill="#F0F0F0"/>
      <ellipse cx="100" cy="68" rx="50" ry="8" fill="white" opacity="0.6"/>
      {/* Fur texture dots */}
      <g fill="#E0E0E0" opacity="0.5">
        <circle cx="60" cy="66" r="1.5"/><circle cx="70" cy="68" r="1.2"/><circle cx="80" cy="66" r="1.5"/>
        <circle cx="90" cy="68" r="1.2"/><circle cx="110" cy="66" r="1.5"/><circle cx="120" cy="68" r="1.2"/>
        <circle cx="130" cy="66" r="1.5"/><circle cx="140" cy="68" r="1.2"/>
      </g>
      {/* Hat body */}
      <path d="M54 68 Q60 32 100 22 Q118 26 128 44 Q142 52 152 32" fill="#C45D3E"/>
      <path d="M56 68 Q62 36 100 26 Q116 30 126 46 Q140 52 150 34" fill="#E85D3E" opacity="0.3"/>
      {/* Fabric folds */}
      <path d="M70 50 Q80 46 90 50" fill="none" stroke="#A83E2E" strokeWidth="1" opacity="0.3"/>
      <path d="M105 38 Q115 34 125 42" fill="none" stroke="#A83E2E" strokeWidth="1" opacity="0.3"/>
      {/* Pompom */}
      <circle cx="155" cy="28" r="11" fill="#F0F0F0"/>
      <circle cx="155" cy="28" r="9" fill="white" opacity="0.6"/>
      <circle cx="152" cy="25" r="3" fill="#F5F5F5" opacity="0.5"/>
      <circle cx="158" cy="30" r="2.5" fill="#E8E8E8" opacity="0.4"/>
      <circle cx="154" cy="32" r="2" fill="#F0F0F0" opacity="0.5"/>
    </g>
  );
}

// ── Premium Hat SVGs ──

function HatDemon() {
  return (
    <g>
      {/* Horn left */}
      <path d="M62 68 Q58 45 65 30 Q68 18 64 6" fill="#4A0000"/>
      <path d="M66 68 Q62 45 68 30 Q70 20 68 10" fill="#8B0000" opacity="0.6"/>
      <path d="M64 30 Q67 22 66 8" fill="none" stroke="#FF4500" strokeWidth="1" opacity="0.4"/>
      {/* Horn right */}
      <path d="M138 68 Q142 45 135 30 Q132 18 136 6" fill="#4A0000"/>
      <path d="M134 68 Q138 45 132 30 Q130 20 132 10" fill="#8B0000" opacity="0.6"/>
      <path d="M136 30 Q133 22 134 8" fill="none" stroke="#FF4500" strokeWidth="1" opacity="0.4"/>
      {/* Horn ridges */}
      <g stroke="#660000" strokeWidth="0.8" opacity="0.4">
        <path d="M60 50 Q65 48 68 50"/><path d="M61 40 Q66 38 69 40"/><path d="M63 30 Q67 28 70 30"/>
        <path d="M140 50 Q135 48 132 50"/><path d="M139 40 Q134 38 131 40"/><path d="M137 30 Q133 28 130 30"/>
      </g>
      {/* Skull cap */}
      <ellipse cx="100" cy="72" rx="44" ry="10" fill="#2D0000"/>
      <path d="M58 72 Q62 52 100 45 Q138 52 142 72" fill="#4A0000"/>
      <path d="M60 72 Q64 54 100 48 Q136 54 140 72" fill="#660000" opacity="0.3"/>
      {/* Ember glow - pulsing */}
      <circle cx="78" cy="58" r="4" fill="#FF4500" className="anim-pulse"/>
      <circle cx="78" cy="58" r="2" fill="#FFD700" className="anim-pulse-delayed"/>
      <circle cx="122" cy="58" r="4" fill="#FF4500" className="anim-pulse-delayed"/>
      <circle cx="122" cy="58" r="2" fill="#FFD700" className="anim-pulse"/>
      {/* Cracks - flickering */}
      <path d="M90 55 L95 60 L92 68" stroke="#FF4500" strokeWidth="0.8" fill="none" className="anim-shimmer"/>
      <path d="M110 55 L105 60 L108 68" stroke="#FF4500" strokeWidth="0.8" fill="none" className="anim-shimmer-delayed"/>
    </g>
  );
}

function HatAngel() {
  return (
    <g>
      {/* Outer glow */}
      <ellipse cx="100" cy="40" rx="42" ry="14" fill="#FFD700" className="anim-halo"/>
      <ellipse cx="100" cy="40" rx="38" ry="11" fill="#FDE68A" className="anim-pulse-soft"/>
      {/* Main halo ring */}
      <ellipse cx="100" cy="40" rx="34" ry="8" fill="none" stroke="#FFD700" strokeWidth="4"/>
      <ellipse cx="100" cy="40" rx="34" ry="8" fill="none" stroke="#FFF8DC" strokeWidth="2" opacity="0.6"/>
      {/* Inner glow */}
      <ellipse cx="100" cy="40" rx="30" ry="5" fill="#FFD700" className="anim-pulse-soft"/>
      {/* Sparkle highlights */}
      <circle cx="70" cy="38" r="2" fill="white" className="anim-sparkle-1"/>
      <circle cx="130" cy="38" r="2" fill="white" className="anim-sparkle-2"/>
      <circle cx="100" cy="32" r="1.5" fill="white" className="anim-sparkle-3"/>
      {/* Floating light particles */}
      <circle cx="82" cy="30" r="1" fill="#FFD700" className="anim-sparkle-2"/>
      <circle cx="118" cy="30" r="1" fill="#FFD700" className="anim-sparkle-3"/>
      <circle cx="90" cy="26" r="0.8" fill="#FDE68A" className="anim-sparkle-1"/>
      <circle cx="110" cy="26" r="0.8" fill="#FDE68A" className="anim-sparkle-2"/>
    </g>
  );
}

function HatNinja() {
  return (
    <g>
      {/* Hood */}
      <path d="M52 82 Q52 48 100 40 Q148 48 148 82" fill="#1A1A2E"/>
      <path d="M54 82 Q54 52 100 44 Q146 52 146 82" fill="#252540" opacity="0.5"/>
      {/* Hood folds */}
      <path d="M70 55 Q80 50 90 55" fill="none" stroke="#101020" strokeWidth="0.8" opacity="0.4"/>
      <path d="M110 55 Q120 50 130 55" fill="none" stroke="#101020" strokeWidth="0.8" opacity="0.4"/>
      <path d="M80 65 Q100 58 120 65" fill="none" stroke="#101020" strokeWidth="0.6" opacity="0.3"/>
      {/* Headband wraps */}
      <rect x="50" y="70" width="100" height="6" rx="1" fill="#2D2D44"/>
      <rect x="50" y="76" width="100" height="5" rx="1" fill="#252540"/>
      <rect x="52" y="71" width="96" height="2" rx="0.5" fill="#383858" opacity="0.3"/>
      {/* Wrap folds */}
      <path d="M65 71 L65 80" stroke="#1A1A2E" strokeWidth="0.5" opacity="0.3"/>
      <path d="M80 71 L80 80" stroke="#1A1A2E" strokeWidth="0.5" opacity="0.3"/>
      <path d="M120 71 L120 80" stroke="#1A1A2E" strokeWidth="0.5" opacity="0.3"/>
      <path d="M135 71 L135 80" stroke="#1A1A2E" strokeWidth="0.5" opacity="0.3"/>
      {/* Tail strands */}
      <path d="M148 74 Q158 72 168 76 Q172 80 176 78" fill="none" stroke="#2D2D44" strokeWidth="5" strokeLinecap="round"/>
      <path d="M148 76 Q156 74 166 78 Q170 82 174 80" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round"/>
      <path d="M148 78 Q154 78 162 82" fill="none" stroke="#2D2D44" strokeWidth="4" strokeLinecap="round"/>
      {/* Metal plate emblem */}
      <rect x="92" y="72" width="16" height="8" rx="2" fill="#404060"/>
      <rect x="93" y="73" width="14" height="6" rx="1.5" fill="#505078" opacity="0.4"/>
      <text x="100" y="79" fontFamily="Arial,sans-serif" fontSize="5" fontWeight="bold" fill="#A0A0C0" textAnchor="middle">忍</text>
    </g>
  );
}

function HatUnicorn() {
  return (
    <g>
      {/* Sparkle glow */}
      <ellipse cx="100" cy="35" rx="40" ry="25" fill="#E8D5FF" opacity="0.1"/>
      {/* Mane base */}
      <ellipse cx="100" cy="68" rx="44" ry="10" fill="#F0E6FF"/>
      <path d="M56 68 Q62 48 100 40 Q138 48 144 68" fill="#E8D5FF"/>
      <path d="M58 68 Q64 50 100 44 Q136 50 142 68" fill="#F0E6FF" opacity="0.5"/>
      {/* Mane waves */}
      <path d="M62 58 Q72 52 82 58" fill="none" stroke="#D8C0F0" strokeWidth="1.5" opacity="0.5"/>
      <path d="M78 52 Q88 46 98 52" fill="none" stroke="#FFB7C5" strokeWidth="1" opacity="0.4"/>
      <path d="M102 52 Q112 46 122 52" fill="none" stroke="#87CEEB" strokeWidth="1" opacity="0.4"/>
      <path d="M118 58 Q128 52 138 58" fill="none" stroke="#D8C0F0" strokeWidth="1.5" opacity="0.5"/>
      {/* Horn - spiral */}
      <defs>
        <linearGradient id="unicornGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#E8D5FF"/><stop offset="33%" stopColor="#FFB7C5"/>
          <stop offset="66%" stopColor="#87CEEB"/><stop offset="100%" stopColor="#FFD700"/>
        </linearGradient>
      </defs>
      <path d="M96 40 L94 8 L100 2 L106 8 L104 40Z" fill="url(#unicornGrad)"/>
      <path d="M96 36 L98 8" stroke="#D8C0F0" strokeWidth="0.8" opacity="0.6"/>
      <path d="M97 30 L102 14" stroke="#D8C0F0" strokeWidth="0.6" opacity="0.5"/>
      <path d="M98 22 L104 10" stroke="#D8C0F0" strokeWidth="0.5" opacity="0.4"/>
      {/* Horn tip glow */}
      <circle cx="100" cy="2" r="4" fill="#FFD700" opacity="0.3"/>
      <circle cx="100" cy="2" r="2" fill="#FFD700" opacity="0.6"/>
      {/* Ear flowers */}
      <circle cx="70" cy="56" r="4" fill="#FFB7C5" opacity="0.5"/>
      <circle cx="70" cy="56" r="2" fill="#FF8FA8" opacity="0.4"/>
      <circle cx="130" cy="56" r="4" fill="#87CEEB" opacity="0.5"/>
      <circle cx="130" cy="56" r="2" fill="#5BB5D4" opacity="0.4"/>
      {/* Sparkles */}
      <circle cx="80" cy="30" r="1" fill="white" opacity="0.7"/>
      <circle cx="120" cy="28" r="1" fill="white" opacity="0.6"/>
      <circle cx="105" cy="18" r="0.8" fill="#FFD700" opacity="0.5"/>
    </g>
  );
}

function HatRobot() {
  return (
    <g>
      {/* Main chassis */}
      <rect x="60" y="48" width="80" height="27" rx="5" fill="#808088"/>
      <rect x="62" y="50" width="76" height="23" rx="4" fill="#A8A8B0"/>
      {/* Top plate */}
      <rect x="60" y="48" width="80" height="8" rx="3" fill="#606068"/>
      <rect x="62" y="49" width="76" height="3" rx="1" fill="#909098" opacity="0.3"/>
      {/* Raised module */}
      <rect x="82" y="36" width="36" height="16" rx="4" fill="#909098"/>
      <rect x="84" y="38" width="32" height="12" rx="3" fill="#B0B0B8" opacity="0.5"/>
      {/* Central eye/sensor */}
      <circle cx="100" cy="44" r="6" fill="#1A1A2E"/>
      <circle cx="100" cy="44" r="5" fill="#00FFFF" opacity="0.7"/>
      <circle cx="100" cy="44" r="3" fill="#00FFFF" opacity="0.4"/>
      <circle cx="98" cy="42" r="1.5" fill="white" opacity="0.5"/>
      {/* Antenna */}
      <rect x="98" y="26" width="4" height="12" rx="2" fill="#A8A8B0"/>
      <circle cx="100" cy="24" r="4" fill="#FF4444" opacity="0.7"/>
      <circle cx="100" cy="24" r="2.5" fill="#FF6666" opacity="0.5"/>
      <circle cx="99" cy="23" r="1" fill="white" opacity="0.3"/>
      {/* LED strips */}
      <g opacity="0.7">
        <rect x="66" y="55" width="6" height="3" rx="1" fill="#00FF00"/>
        <rect x="74" y="55" width="6" height="3" rx="1" fill="#00FF00"/>
        <rect x="82" y="55" width="6" height="3" rx="1" fill="#00FF00" opacity="0.5"/>
        <rect x="112" y="55" width="6" height="3" rx="1" fill="#00FF00" opacity="0.5"/>
        <rect x="120" y="55" width="6" height="3" rx="1" fill="#00FF00"/>
        <rect x="128" y="55" width="6" height="3" rx="1" fill="#00FF00"/>
      </g>
      {/* Side vents */}
      <g stroke="#606068" strokeWidth="0.8" opacity="0.4">
        <line x1="64" y1="60" x2="64" y2="68"/><line x1="67" y1="60" x2="67" y2="68"/>
        <line x1="133" y1="60" x2="133" y2="68"/><line x1="136" y1="60" x2="136" y2="68"/>
      </g>
      {/* Bolts */}
      <circle cx="66" cy="52" r="1.5" fill="#606068"/><circle cx="134" cy="52" r="1.5" fill="#606068"/>
      <circle cx="66" cy="72" r="1.5" fill="#606068"/><circle cx="134" cy="72" r="1.5" fill="#606068"/>
    </g>
  );
}

function HatAlien() {
  return (
    <g>
      {/* UFO dome glow */}
      <ellipse cx="100" cy="55" rx="54" ry="22" fill="#ADFF2F" opacity="0.05"/>
      {/* Saucer brim */}
      <ellipse cx="100" cy="62" rx="56" ry="10" fill="#3A5731"/>
      <ellipse cx="100" cy="61" rx="54" ry="8" fill="#4A6741" opacity="0.6"/>
      {/* Saucer edge lights */}
      <g opacity="0.6">
        <circle cx="60" cy="62" r="2" fill="#ADFF2F"/><circle cx="80" cy="60" r="2" fill="#ADFF2F"/>
        <circle cx="100" cy="59" r="2" fill="#ADFF2F"/><circle cx="120" cy="60" r="2" fill="#ADFF2F"/>
        <circle cx="140" cy="62" r="2" fill="#ADFF2F"/>
      </g>
      {/* Glass dome */}
      <path d="M60 62 Q60 30 100 20 Q140 30 140 62" fill="#5C8A50" opacity="0.6"/>
      <path d="M65 62 Q65 35 100 25 Q135 35 135 62" fill="#6CA060" opacity="0.3"/>
      {/* Dome glass reflection */}
      <path d="M72 38 Q82 30 88 42 Q86 52 78 58" fill="white" opacity="0.08"/>
      {/* Alien eyes */}
      <ellipse cx="82" cy="42" rx="7" ry="5" fill="#1A1A1A" opacity="0.6"/>
      <ellipse cx="82" cy="42" rx="6" ry="4" fill="#ADFF2F" opacity="0.5"/>
      <ellipse cx="82" cy="42" rx="3" ry="4" fill="#7CFC00" opacity="0.3"/>
      <ellipse cx="118" cy="42" rx="7" ry="5" fill="#1A1A1A" opacity="0.6"/>
      <ellipse cx="118" cy="42" rx="6" ry="4" fill="#ADFF2F" opacity="0.5"/>
      <ellipse cx="118" cy="42" rx="3" ry="4" fill="#7CFC00" opacity="0.3"/>
      {/* Center brain */}
      <circle cx="100" cy="34" r="4" fill="#ADFF2F" opacity="0.25"/>
      <circle cx="100" cy="34" r="2" fill="#ADFF2F" opacity="0.15"/>
      {/* Bottom ring */}
      <ellipse cx="100" cy="66" rx="48" ry="4" fill="#2E4A26" opacity="0.4"/>
    </g>
  );
}

function HatSteampunk() {
  return (
    <g>
      {/* Hat brim */}
      <ellipse cx="100" cy="68" rx="54" ry="10" fill="#3A2010"/>
      <ellipse cx="100" cy="67" rx="52" ry="8" fill="#4A2E1A" opacity="0.6"/>
      {/* Hat body */}
      <path d="M54 68 Q58 38 100 28 Q142 38 146 68" fill="#6B4226"/>
      <path d="M56 68 Q60 42 100 32 Q140 42 144 68" fill="#8B5E3C" opacity="0.4"/>
      {/* Leather texture */}
      <path d="M70 50 Q80 46 90 50" fill="none" stroke="#4A2E1A" strokeWidth="0.6" opacity="0.3"/>
      <path d="M110 48 Q120 44 130 48" fill="none" stroke="#4A2E1A" strokeWidth="0.6" opacity="0.3"/>
      {/* Buckle band */}
      <rect x="58" y="58" width="84" height="8" rx="2" fill="#4A2E1A"/>
      <rect x="60" y="59" width="80" height="3" rx="1" fill="#6B4226" opacity="0.3"/>
      {/* Goggles strap */}
      <path d="M68 50 L132 50" stroke="#6B4226" strokeWidth="3"/>
      <path d="M68 50 L132 50" stroke="#8B5E3C" strokeWidth="1.5" opacity="0.3"/>
      {/* Left goggle */}
      <circle cx="78" cy="50" r="12" fill="#4A2E1A"/>
      <circle cx="78" cy="50" r="10" fill="#2D2D2D"/>
      <circle cx="78" cy="50" r="8" fill="#87CEEB" opacity="0.4"/>
      <circle cx="78" cy="50" r="8" fill="none" stroke="#CD7F32" strokeWidth="2"/>
      <circle cx="75" cy="47" r="2" fill="white" opacity="0.2"/>
      {/* Right goggle */}
      <circle cx="122" cy="50" r="12" fill="#4A2E1A"/>
      <circle cx="122" cy="50" r="10" fill="#2D2D2D"/>
      <circle cx="122" cy="50" r="8" fill="#87CEEB" opacity="0.4"/>
      <circle cx="122" cy="50" r="8" fill="none" stroke="#CD7F32" strokeWidth="2"/>
      <circle cx="119" cy="47" r="2" fill="white" opacity="0.2"/>
      {/* Bridge between goggles */}
      <rect x="90" y="47" width="20" height="6" rx="2" fill="#4A2E1A"/>
      <rect x="92" y="48" width="16" height="4" rx="1" fill="#6B4226" opacity="0.3"/>
      {/* Main gear */}
      <circle cx="140" cy="42" r="14" fill="none" stroke="#CD7F32" strokeWidth="3"/>
      <circle cx="140" cy="42" r="10" fill="none" stroke="#B8860B" strokeWidth="2"/>
      <circle cx="140" cy="42" r="3" fill="#CD7F32"/>
      {/* Gear teeth */}
      <g fill="#CD7F32">
        <rect x="138" y="26" width="4" height="5" rx="1"/><rect x="138" y="53" width="4" height="5" rx="1"/>
        <rect x="124" y="40" width="5" height="4" rx="1"/><rect x="151" y="40" width="5" height="4" rx="1"/>
      </g>
      {/* Clock hands */}
      <line x1="140" y1="42" x2="140" y2="34" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="140" y1="42" x2="146" y2="38" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round"/>
      {/* Small gear */}
      <circle cx="155" cy="55" r="6" fill="none" stroke="#B8860B" strokeWidth="2"/>
      <circle cx="155" cy="55" r="2" fill="#B8860B"/>
      {/* Pipes */}
      <path d="M60 42 Q55 38 52 42 Q50 48 55 50" fill="none" stroke="#CD7F32" strokeWidth="2.5" strokeLinecap="round"/>
    </g>
  );
}

function HatEmperor() {
  return (
    <g>
      {/* Velvet base */}
      <ellipse cx="100" cy="65" rx="42" ry="10" fill="#6B0015"/>
      <path d="M60 65 Q60 38 75 32 L80 18 L90 30 L100 12 L110 30 L120 18 L125 32 Q140 38 140 65" fill="#8B0020"/>
      <path d="M62 65 Q62 40 76 34 L81 20 L90 31 L100 15 L110 31 L119 20 L124 34 Q138 40 138 65" fill="#A8002A" opacity="0.3"/>
      {/* Velvet sheen */}
      <path d="M72 40 Q82 34 92 42 Q86 52 78 58" fill="white" opacity="0.05"/>
      <path d="M108 40 Q118 34 128 42 Q122 52 114 58" fill="white" opacity="0.05"/>
      {/* Ermine fur trim */}
      <rect x="58" y="60" width="84" height="8" rx="2" fill="#B8860B"/>
      <rect x="60" y="61" width="80" height="6" rx="1" fill="#D4A853"/>
      <rect x="60" y="62" width="80" height="4" rx="1" fill="#E8C860" opacity="0.3"/>
      {/* Gems on band */}
      <circle cx="72" cy="64" r="2.5" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5"/>
      <circle cx="72" cy="63.5" r="1" fill="white" opacity="0.3"/>
      <circle cx="86" cy="64" r="3" fill="#E0115F" stroke="#B8002A" strokeWidth="0.5"/>
      <circle cx="86" cy="63" r="1.2" fill="white" opacity="0.3"/>
      <circle cx="100" cy="64" r="3" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5"/>
      <circle cx="100" cy="63" r="1.2" fill="white" opacity="0.3"/>
      <circle cx="114" cy="64" r="3" fill="#4169E1" stroke="#2850A0" strokeWidth="0.5"/>
      <circle cx="114" cy="63" r="1.2" fill="white" opacity="0.3"/>
      <circle cx="128" cy="64" r="2.5" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5"/>
      <circle cx="128" cy="63.5" r="1" fill="white" opacity="0.3"/>
      {/* Cross orb at top */}
      <circle cx="100" cy="12" r="5" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
      <circle cx="100" cy="12" r="3" fill="#E8C860" opacity="0.4"/>
      <rect x="98" y="4" width="4" height="12" rx="1" fill="#FFD700"/>
      <rect x="95" y="8" width="10" height="3" rx="1" fill="#FFD700"/>
      {/* Point gems */}
      <circle cx="80" cy="18" r="3.5" fill="#E0115F" stroke="#B8002A" strokeWidth="0.8"/>
      <circle cx="80" cy="17" r="1.2" fill="white" opacity="0.3"/>
      <circle cx="120" cy="18" r="3.5" fill="#4169E1" stroke="#2850A0" strokeWidth="0.8"/>
      <circle cx="120" cy="17" r="1.2" fill="white" opacity="0.3"/>
      {/* Arch detail */}
      <path d="M80 20 Q90 10 100 14" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.4"/>
      <path d="M120 20 Q110 10 100 14" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.4"/>
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
      {/* Shoulder strap — dark leather base then lighter overlay */}
      <path d="M118 153 Q128 162 135 172" fill="none" stroke="#5A3518" strokeWidth="5.5" strokeLinecap="round"/>
      <path d="M118 153 Q128 162 135 172" fill="none" stroke="#7A4A22" strokeWidth="3" strokeLinecap="round"/>
      {/* Strap highlight */}
      <path d="M119 154 Q129 163 135 171" fill="none" stroke="#9A6030" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      {/* Strap adjustment holes punched into leather */}
      <ellipse cx="122.5" cy="157.5" rx="1.1" ry="1.7" fill="#3A1E0A" opacity="0.85"/>
      <ellipse cx="126" cy="161.5" rx="1.1" ry="1.7" fill="#3A1E0A" opacity="0.85"/>
      <ellipse cx="129.5" cy="165.5" rx="1.1" ry="1.7" fill="#3A1E0A" opacity="0.85"/>
      {/* Satchel body shadow */}
      <rect x="130" y="173" width="30" height="24" rx="4" fill="#3A1E0A" opacity="0.2"/>
      {/* Satchel body */}
      <rect x="129" y="171" width="30" height="24" rx="4" fill="#7A4A22"/>
      {/* Leather lighter face */}
      <rect x="130" y="172" width="28" height="22" rx="3" fill="#8B5E3C" opacity="0.6"/>
      {/* Leather grain lines */}
      <path d="M131 176 Q144 174 158 176" fill="none" stroke="#A07040" strokeWidth="0.7" opacity="0.5"/>
      <path d="M131 181 Q144 179 158 181" fill="none" stroke="#9A6838" strokeWidth="0.6" opacity="0.4"/>
      <path d="M131 186 Q144 184 158 186" fill="none" stroke="#9A6838" strokeWidth="0.6" opacity="0.35"/>
      <path d="M131 191 Q144 189 157 191" fill="none" stroke="#9A6838" strokeWidth="0.6" opacity="0.3"/>
      {/* Corner wear marks */}
      <path d="M131 173 Q129 175 130 178" fill="none" stroke="#5A3518" strokeWidth="1" opacity="0.55"/>
      <path d="M157 173 Q159 175 158 178" fill="none" stroke="#5A3518" strokeWidth="1" opacity="0.55"/>
      <path d="M131 191 Q129 193 130 194" fill="none" stroke="#5A3518" strokeWidth="0.8" opacity="0.4"/>
      {/* Flap */}
      <path d="M129 171 Q144 168 159 171 L159 182 Q144 185 129 182 Z" fill="#6B4226"/>
      {/* Flap highlight top edge */}
      <path d="M129 171 Q144 168 159 171 L159 173.5 Q144 170.5 129 173.5 Z" fill="#8B5E3C" opacity="0.4"/>
      {/* Flap stitching along bottom edge */}
      <path d="M131 180.5 Q144 183 157 180.5" fill="none" stroke="#4A2E1A" strokeWidth="0.7" strokeDasharray="2,1.5" opacity="0.8"/>
      {/* Body perimeter stitching */}
      <rect x="129" y="171" width="30" height="24" rx="4" fill="none" stroke="#4A2E1A" strokeWidth="0.7" strokeDasharray="3,2.5" opacity="0.45"/>
      {/* Brass buckle clasp */}
      <rect x="137.5" y="179.5" width="13" height="6" rx="1.8" fill="#D4A853"/>
      <rect x="137.5" y="179.5" width="13" height="6" rx="1.8" fill="none" stroke="#B8860B" strokeWidth="0.8"/>
      {/* Buckle inner bar and prong */}
      <rect x="139.5" y="180.8" width="9" height="3.4" rx="0.8" fill="#5A3518"/>
      <line x1="144" y1="180.8" x2="144" y2="184.2" stroke="#D4A853" strokeWidth="1"/>
      {/* Buckle shine */}
      <rect x="138.5" y="180" width="4" height="1.5" rx="0.5" fill="#F0C060" opacity="0.6"/>
      {/* Brass D-ring at strap attachment */}
      <path d="M134 173 Q131 171 133 169 Q136 168 137 171 L135 172 Q134 170.5 133.5 171.5 Q133 172.5 134 173Z" fill="#D4A853"/>
      {/* Brass rivet on flap */}
      <circle cx="144" cy="173" r="1.5" fill="#D4A853"/>
      <circle cx="144" cy="173" r="0.8" fill="#F0C060"/>
    </g>
  );
}

function AccessoryCompass() {
  return (
    <g>
      {/* Chain links from hand */}
      <path d="M116 157 Q124 163 130 170" fill="none" stroke="#B8860B" strokeWidth="1.5" strokeDasharray="3,2" strokeLinecap="round"/>
      {/* Outer brass case */}
      <circle cx="143" cy="182" r="14" fill="#D4A853" stroke="#B8860B" strokeWidth="2"/>
      {/* Engraving ring */}
      <circle cx="143" cy="182" r="13" fill="none" stroke="#B8860B" strokeWidth="0.6" opacity="0.5"/>
      {/* Case highlight — curved glint */}
      <path d="M133 173 Q138 170 144 171" fill="none" stroke="#F0C060" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      {/* Glass cover */}
      <circle cx="143" cy="182" r="11" fill="#EEF4F0" opacity="0.92"/>
      {/* Compass rose cardinal tick marks */}
      <line x1="143" y1="171.5" x2="143" y2="174" stroke="#333" strokeWidth="1.2"/>
      <line x1="143" y1="190" x2="143" y2="192.5" stroke="#333" strokeWidth="1.2"/>
      <line x1="132" y1="182" x2="134.5" y2="182" stroke="#333" strokeWidth="1.2"/>
      <line x1="151.5" y1="182" x2="154" y2="182" stroke="#333" strokeWidth="1.2"/>
      {/* Intercardinal smaller ticks */}
      <line x1="135.2" y1="174.2" x2="136.6" y2="175.6" stroke="#666" strokeWidth="0.7"/>
      <line x1="149.4" y1="174.2" x2="148" y2="175.6" stroke="#666" strokeWidth="0.7"/>
      <line x1="135.2" y1="189.8" x2="136.6" y2="188.4" stroke="#666" strokeWidth="0.7"/>
      <line x1="149.4" y1="189.8" x2="148" y2="188.4" stroke="#666" strokeWidth="0.7"/>
      {/* Cardinal letters N S E W */}
      <text x="143" y="174.5" fontFamily="serif" fontSize="3.5" fontWeight="bold" fill="#1A1A1A" textAnchor="middle">N</text>
      <text x="143" y="192" fontFamily="serif" fontSize="3" fill="#444" textAnchor="middle">S</text>
      <text x="153.5" y="183" fontFamily="serif" fontSize="3" fill="#444" textAnchor="middle">E</text>
      <text x="132.5" y="183" fontFamily="serif" fontSize="3" fill="#444" textAnchor="middle">W</text>
      {/* Compass needle — North red, South blue */}
      <path d="M143 174 L141.5 182 L143 183 L144.5 182 Z" fill="#C45D3E"/>
      <path d="M143 190 L141.5 182 L143 181 L144.5 182 Z" fill="#4A7FC4"/>
      {/* Needle pivot */}
      <circle cx="143" cy="182" r="1.8" fill="#2A2A2A"/>
      <circle cx="143" cy="182" r="0.9" fill="#E0E0E0"/>
      {/* Glass reflection */}
      <ellipse cx="138" cy="176" rx="3.5" ry="2" fill="white" opacity="0.25" transform="rotate(-25 138 176)"/>
      {/* Hinge/crown at top */}
      <rect x="141" y="168" width="4" height="2.5" rx="1" fill="#D4A853" stroke="#B8860B" strokeWidth="0.6"/>
      {/* Chain ring */}
      <circle cx="143" cy="168" r="1.5" fill="none" stroke="#B8860B" strokeWidth="1.2"/>
    </g>
  );
}

function AccessoryBinoculars() {
  return (
    <g>
      {/* Neck strap going up to left hand */}
      <path d="M113 153 Q126 163 133 174" fill="none" stroke="#4A2E1A" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M113 153 Q126 163 133 174" fill="none" stroke="#6B4226" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Left barrel body */}
      <rect x="122" y="174" width="16" height="18" rx="7" fill="#3A2A1A"/>
      {/* Right barrel body */}
      <rect x="139" y="174" width="16" height="18" rx="7" fill="#3A2A1A"/>
      {/* Rubber grip texture left barrel */}
      <rect x="123" y="177" width="14" height="3" rx="1" fill="#2A1A0A" opacity="0.5"/>
      <rect x="123" y="181" width="14" height="3" rx="1" fill="#2A1A0A" opacity="0.5"/>
      <rect x="123" y="185" width="14" height="3" rx="1" fill="#2A1A0A" opacity="0.5"/>
      {/* Rubber grip texture right barrel */}
      <rect x="140" y="177" width="14" height="3" rx="1" fill="#2A1A0A" opacity="0.5"/>
      <rect x="140" y="181" width="14" height="3" rx="1" fill="#2A1A0A" opacity="0.5"/>
      <rect x="140" y="185" width="14" height="3" rx="1" fill="#2A1A0A" opacity="0.5"/>
      {/* Central focus wheel bridge */}
      <rect x="136" y="176" width="5" height="10" rx="1" fill="#2A1A0A"/>
      <circle cx="138.5" cy="181" r="4" fill="#4A3A2A" stroke="#2A1A0A" strokeWidth="0.8"/>
      <circle cx="138.5" cy="181" r="2.5" fill="#5A4A3A"/>
      {/* Focus wheel ridges */}
      <line x1="134.5" y1="181" x2="136" y2="181" stroke="#1A0A00" strokeWidth="0.7"/>
      <line x1="141" y1="181" x2="142.5" y2="181" stroke="#1A0A00" strokeWidth="0.7"/>
      {/* Left lens — blue-tinted coating */}
      <circle cx="130" cy="183" r="6.5" fill="#1A1A2A" stroke="#4A4A5A" strokeWidth="1"/>
      <circle cx="130" cy="183" r="5" fill="#2244AA" opacity="0.35"/>
      <circle cx="130" cy="183" r="5" fill="#87CEEB" opacity="0.15"/>
      {/* Right lens */}
      <circle cx="147" cy="183" r="6.5" fill="#1A1A2A" stroke="#4A4A5A" strokeWidth="1"/>
      <circle cx="147" cy="183" r="5" fill="#2244AA" opacity="0.35"/>
      <circle cx="147" cy="183" r="5" fill="#87CEEB" opacity="0.15"/>
      {/* Lens flare/glint */}
      <ellipse cx="127.5" cy="180.5" rx="2" ry="1.2" fill="white" opacity="0.3" transform="rotate(-20 127.5 180.5)"/>
      <ellipse cx="144.5" cy="180.5" rx="2" ry="1.2" fill="white" opacity="0.3" transform="rotate(-20 144.5 180.5)"/>
      {/* Eyecup rims */}
      <circle cx="130" cy="183" r="6.5" fill="none" stroke="#3A2A1A" strokeWidth="1.5"/>
      <circle cx="147" cy="183" r="6.5" fill="none" stroke="#3A2A1A" strokeWidth="1.5"/>
    </g>
  );
}

function AccessoryWhistle() {
  return (
    <g>
      {/* Lanyard cord from neck - braided look */}
      <path d="M93 143 Q97 146 100 149 Q105 148 109 148" fill="none" stroke="#C45D3E" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M93 143 Q97 145 100 148" fill="none" stroke="#A03828" strokeWidth="0.6" strokeDasharray="2,2" opacity="0.5"/>
      {/* Shadow under whistle */}
      <ellipse cx="120" cy="153" rx="14" ry="2" fill="#000" opacity="0.08"/>
      {/* Whistle body — polished metal */}
      <rect x="107" y="143" width="22" height="9" rx="3.5" fill="#C8C8D4" stroke="#9090A0" strokeWidth="0.5"/>
      {/* Metal shading */}
      <rect x="107" y="143" width="22" height="4" rx="3" fill="#E0E0EC" opacity="0.5"/>
      <rect x="107" y="148" width="22" height="4" rx="3" fill="#9090A0" opacity="0.4"/>
      {/* Polished highlight streak */}
      <rect x="110" y="144" width="14" height="1.5" rx="0.7" fill="white" opacity="0.55"/>
      {/* Engraved line detail */}
      <line x1="112" y1="150" x2="126" y2="150" stroke="#808088" strokeWidth="0.4" opacity="0.5"/>
      {/* Pea chamber bump */}
      <ellipse cx="118" cy="147.5" rx="4" ry="3" fill="#B0B0BC" stroke="#9090A0" strokeWidth="0.7"/>
      <ellipse cx="118" cy="147.5" rx="2" ry="1.5" fill="#D0D0DC" opacity="0.5"/>
      <ellipse cx="117" cy="146.5" rx="1" ry="0.6" fill="white" opacity="0.3"/>
      {/* Mouthpiece — narrowed end */}
      <rect x="129" y="144.5" width="6" height="7" rx="2" fill="#A0A0AC" stroke="#808088" strokeWidth="0.4"/>
      <rect x="129" y="144.5" width="6" height="2.5" rx="1" fill="#C8C8D4" opacity="0.5"/>
      {/* Mouthpiece opening */}
      <ellipse cx="135" cy="148" rx="1" ry="2.5" fill="#707078"/>
      {/* Lanyard ring at end */}
      <circle cx="108.5" cy="147.5" r="3" fill="none" stroke="#B8860B" strokeWidth="1.4"/>
      <circle cx="108.5" cy="147.5" r="1.5" fill="none" stroke="#D4A853" strokeWidth="0.8"/>
      <circle cx="107.5" cy="146.5" r="0.5" fill="#F0C060" opacity="0.5"/>
      {/* Sound waves hint */}
      <path d="M137 143.5 Q140 147.5 137 151.5" fill="none" stroke="#A8A8B0" strokeWidth="0.8" opacity="0.4"/>
      <path d="M139.5 142 Q144 147.5 139.5 153" fill="none" stroke="#A8A8B0" strokeWidth="0.7" opacity="0.25"/>
      <path d="M142 140.5 Q147 147.5 142 154.5" fill="none" stroke="#A8A8B0" strokeWidth="0.5" opacity="0.15"/>
      {/* Air holes */}
      <ellipse cx="114" cy="147.5" rx="1" ry="2" fill="#9090A0" opacity="0.6"/>
      <ellipse cx="122" cy="147.5" rx="0.8" ry="1.5" fill="#9090A0" opacity="0.4"/>
    </g>
  );
}

function AccessoryBadge() {
  return (
    <g>
      {/* Pin clasp at top of body */}
      <line x1="83" y1="161" x2="87" y2="161" stroke="#A8A8B0" strokeWidth="1.2"/>
      <circle cx="83" cy="161" r="1.2" fill="#D4A853"/>
      {/* Badge body — shield shape */}
      <path d="M76 163 L76 177 Q82 184 88 177 L88 163 Q82 160 76 163 Z" fill="#D4A853"/>
      <path d="M76 163 L76 177 Q82 184 88 177 L88 163 Q82 160 76 163 Z" fill="none" stroke="#B8860B" strokeWidth="1.5"/>
      {/* Inner shield lighter */}
      <path d="M77.5 164.5 L77.5 176 Q82 181.5 86.5 176 L86.5 164.5 Q82 162 77.5 164.5Z" fill="#E8C040" opacity="0.4"/>
      {/* Wreath leaves left */}
      <ellipse cx="75.5" cy="168.5" rx="1.5" ry="2.5" fill="#3A7D5C" opacity="0.8" transform="rotate(20 75.5 168.5)"/>
      <ellipse cx="75" cy="172" rx="1.5" ry="2.5" fill="#3A7D5C" opacity="0.8"/>
      <ellipse cx="75.5" cy="175.5" rx="1.5" ry="2.5" fill="#3A7D5C" opacity="0.8" transform="rotate(-20 75.5 175.5)"/>
      {/* Wreath leaves right */}
      <ellipse cx="88.5" cy="168.5" rx="1.5" ry="2.5" fill="#3A7D5C" opacity="0.8" transform="rotate(-20 88.5 168.5)"/>
      <ellipse cx="89" cy="172" rx="1.5" ry="2.5" fill="#3A7D5C" opacity="0.8"/>
      <ellipse cx="88.5" cy="175.5" rx="1.5" ry="2.5" fill="#3A7D5C" opacity="0.8" transform="rotate(20 88.5 175.5)"/>
      {/* Star in center top */}
      <path d="M82 165 L82.4 166.3 L83.8 166.3 L82.7 167.1 L83.1 168.4 L82 167.6 L80.9 168.4 L81.3 167.1 L80.2 166.3 L81.6 166.3 Z" fill="white"/>
      {/* Cross/emblem below star */}
      <rect x="81.3" y="169" width="1.4" height="5" rx="0.5" fill="white" opacity="0.9"/>
      <rect x="79.5" y="170.5" width="5" height="1.4" rx="0.5" fill="white" opacity="0.9"/>
      {/* Enamel color fill in quadrants */}
      <rect x="79.5" y="169" width="1.8" height="1.5" rx="0.3" fill="#C45D3E" opacity="0.7"/>
      <rect x="82.7" y="169" width="1.8" height="1.5" rx="0.3" fill="#4A7FC4" opacity="0.7"/>
      <rect x="79.5" y="171.9" width="1.8" height="1.5" rx="0.3" fill="#4A7FC4" opacity="0.7"/>
      <rect x="82.7" y="171.9" width="1.8" height="1.5" rx="0.3" fill="#C45D3E" opacity="0.7"/>
      {/* Badge shine */}
      <path d="M78 164 Q80 162.5 83 163" fill="none" stroke="#F5D060" strokeWidth="0.8" opacity="0.6"/>
    </g>
  );
}

function AccessoryBowtie() {
  return (
    <g>
      {/* Left wing — fabric with pleat fold lines */}
      <path d="M87 145 L78 137.5 Q77 141 78 145 Q77 149 78 152.5 Z" fill="#D4A853"/>
      {/* Left wing inner pleat shadow */}
      <path d="M87 145 L80 139 L79 142 L80 145" fill="#B8860B" opacity="0.35"/>
      <path d="M87 145 L80 151 L79 148 L80 145" fill="#B8860B" opacity="0.25"/>
      {/* Left wing pleat lines */}
      <line x1="83" y1="139.5" x2="87" y2="144" stroke="#9A6B00" strokeWidth="0.6" opacity="0.5"/>
      <line x1="82" y1="142" x2="87" y2="145" stroke="#9A6B00" strokeWidth="0.5" opacity="0.4"/>
      <line x1="83" y1="150.5" x2="87" y2="146" stroke="#9A6B00" strokeWidth="0.6" opacity="0.5"/>
      {/* Right wing */}
      <path d="M113 145 L122 137.5 Q123 141 122 145 Q123 149 122 152.5 Z" fill="#D4A853"/>
      {/* Right wing pleat shadow */}
      <path d="M113 145 L120 139 L121 142 L120 145" fill="#B8860B" opacity="0.35"/>
      <path d="M113 145 L120 151 L121 148 L120 145" fill="#B8860B" opacity="0.25"/>
      {/* Right wing pleat lines */}
      <line x1="117" y1="139.5" x2="113" y2="144" stroke="#9A6B00" strokeWidth="0.6" opacity="0.5"/>
      <line x1="118" y1="142" x2="113" y2="145" stroke="#9A6B00" strokeWidth="0.5" opacity="0.4"/>
      <line x1="117" y1="150.5" x2="113" y2="146" stroke="#9A6B00" strokeWidth="0.6" opacity="0.5"/>
      {/* Center knot — slightly irregular for realism */}
      <ellipse cx="100" cy="145" rx="4.5" ry="4" fill="#B8860B"/>
      <ellipse cx="100" cy="145" rx="3" ry="2.5" fill="#D4A853" opacity="0.6"/>
      {/* Knot crease lines */}
      <line x1="97" y1="143" x2="103" y2="143.5" stroke="#9A6B00" strokeWidth="0.6" opacity="0.5"/>
      <line x1="97" y1="147" x2="103" y2="146.5" stroke="#9A6B00" strokeWidth="0.6" opacity="0.5"/>
      {/* Slight asymmetry highlight */}
      <ellipse cx="99" cy="144" rx="1.5" ry="1" fill="#F0C060" opacity="0.3"/>
      {/* Band connecting knot to wings */}
      <rect x="87" y="143.5" width="13" height="3" rx="1" fill="#C4960A" opacity="0.5"/>
      <rect x="100" y="143.5" width="13" height="3" rx="1" fill="#C4960A" opacity="0.5"/>
    </g>
  );
}

function AccessoryMedal() {
  return (
    <g>
      {/* Ribbon — two-tone stripes pinned at chest */}
      <path d="M95.5 144 L92 163 L100 157.5 L108 163 L104.5 144 Z" fill="#C45D3E"/>
      {/* Ribbon stripe detail */}
      <line x1="95.8" y1="144" x2="93.2" y2="160" stroke="#A03828" strokeWidth="1.5" opacity="0.5"/>
      <line x1="97.5" y1="144" x2="95.5" y2="158" stroke="#E8804A" strokeWidth="1" opacity="0.4"/>
      <line x1="104.2" y1="144" x2="106.8" y2="160" stroke="#A03828" strokeWidth="1.5" opacity="0.5"/>
      <line x1="102.5" y1="144" x2="104.5" y2="158" stroke="#E8804A" strokeWidth="1" opacity="0.4"/>
      {/* Blue stripe through ribbon center */}
      <line x1="99.5" y1="144" x2="100" y2="157" stroke="#4A7FC4" strokeWidth="2" opacity="0.55"/>
      {/* Ribbon fold chevron at bottom */}
      <path d="M92 163 L96 160 L100 163 L104 160 L108 163 L104 166 L100 163 L96 166 Z" fill="#A03828" opacity="0.5"/>
      {/* Ribbon pin at top */}
      <rect x="96" y="143" width="8" height="2" rx="1" fill="#D4A853"/>
      {/* Medal ring */}
      <circle cx="100" cy="171.5" r="2.5" fill="none" stroke="#B8860B" strokeWidth="1.5"/>
      {/* Medal disc — outer brass */}
      <circle cx="100" cy="180" r="11" fill="#D4A853" stroke="#B8860B" strokeWidth="1.8"/>
      {/* Medal disc inner circle */}
      <circle cx="100" cy="180" r="9" fill="#E8C040" opacity="0.4"/>
      {/* Relief design: wreath ring */}
      <circle cx="100" cy="180" r="8" fill="none" stroke="#B8860B" strokeWidth="0.8" opacity="0.6"/>
      {/* Left laurel leaves on medal */}
      <ellipse cx="93.5" cy="178" rx="1.2" ry="2.2" fill="#3A7D5C" opacity="0.7" transform="rotate(25 93.5 178)"/>
      <ellipse cx="92.8" cy="181.5" rx="1.2" ry="2.2" fill="#3A7D5C" opacity="0.7" transform="rotate(10 92.8 181.5)"/>
      {/* Right laurel leaves on medal */}
      <ellipse cx="106.5" cy="178" rx="1.2" ry="2.2" fill="#3A7D5C" opacity="0.7" transform="rotate(-25 106.5 178)"/>
      <ellipse cx="107.2" cy="181.5" rx="1.2" ry="2.2" fill="#3A7D5C" opacity="0.7" transform="rotate(-10 107.2 181.5)"/>
      {/* Star in center of medal */}
      <path d="M100 174 L101 177.5 L104.7 177.5 L101.8 179.7 L102.9 183.2 L100 181 L97.1 183.2 L98.2 179.7 L95.3 177.5 L99 177.5 Z" fill="#B8860B"/>
      <path d="M100 175.2 L100.8 177.8 L103.6 177.8 L101.4 179.4 L102.2 182 L100 180.4 L97.8 182 L98.6 179.4 L96.4 177.8 L99.2 177.8 Z" fill="#F0D060"/>
      {/* Medal shine */}
      <ellipse cx="96" cy="175" rx="3" ry="1.5" fill="white" opacity="0.22" transform="rotate(-30 96 175)"/>
    </g>
  );
}

function AccessoryMap() {
  return (
    <g>
      {/* Arm/hand holding map */}
      <path d="M122 158 Q133 165 140 175" fill="none" stroke="#6B4226" strokeWidth="4" strokeLinecap="round"/>
      {/* Parchment background — aged warm color */}
      <rect x="135" y="172" width="28" height="22" rx="2" fill="#EDD99A"/>
      {/* Parchment texture overlay */}
      <rect x="135" y="172" width="28" height="22" rx="2" fill="#C4A860" opacity="0.2"/>
      <rect x="135" y="172" width="14" height="22" fill="#D4B870" opacity="0.15"/>
      {/* Torn/rough right edge */}
      <path d="M163 172 Q164 174 163 176 Q164.5 178 163 180 Q164 182 163 184 Q164 186 163 188 Q164 190 163 192 L163 172Z" fill="#F0DDA0"/>
      {/* Fold crease — vertical center */}
      <line x1="149" y1="172" x2="149" y2="194" stroke="#B09060" strokeWidth="0.8" opacity="0.5"/>
      {/* Fold crease — horizontal center */}
      <line x1="135" y1="183" x2="163" y2="183" stroke="#B09060" strokeWidth="0.8" opacity="0.4"/>
      {/* Route lines */}
      <path d="M139 176 Q143 179 141 183 Q145 186 149 184 Q153 188 157 186" fill="none" stroke="#8B5E3C" strokeWidth="0.9" strokeDasharray="2,1.5" opacity="0.7"/>
      {/* Compass rose in bottom-left */}
      <circle cx="140" cy="189" r="3.5" fill="none" stroke="#8B5E3C" strokeWidth="0.6" opacity="0.5"/>
      <line x1="140" y1="185.5" x2="140" y2="192.5" stroke="#8B5E3C" strokeWidth="0.7" opacity="0.6"/>
      <line x1="136.5" y1="189" x2="143.5" y2="189" stroke="#8B5E3C" strokeWidth="0.7" opacity="0.6"/>
      <text x="140" y="185" fontFamily="serif" fontSize="2.8" fill="#8B5E3C" textAnchor="middle" opacity="0.7">N</text>
      {/* X marks the spot */}
      <line x1="154" y1="177" x2="158" y2="181" stroke="#C45D3E" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="158" y1="177" x2="154" y2="181" stroke="#C45D3E" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="156" cy="179" r="3" fill="none" stroke="#C45D3E" strokeWidth="0.8" opacity="0.6"/>
      {/* Small dots as towns along route */}
      <circle cx="141" cy="177" r="1" fill="#8B5E3C" opacity="0.6"/>
      <circle cx="148" cy="185" r="1" fill="#8B5E3C" opacity="0.6"/>
      {/* Border of map */}
      <rect x="135" y="172" width="28" height="22" rx="2" fill="none" stroke="#B09060" strokeWidth="0.8" strokeDasharray="3,2"/>
      {/* Map text lines */}
      <line x1="137" y1="175" x2="145" y2="175" stroke="#9A7840" strokeWidth="0.5" opacity="0.5"/>
      <line x1="137" y1="177" x2="142" y2="177" stroke="#9A7840" strokeWidth="0.5" opacity="0.4"/>
    </g>
  );
}

function AccessoryTrophy() {
  return (
    <g>
      {/* Arm to trophy */}
      <path d="M122 157 Q134 165 140 177" fill="none" stroke="#6B4226" strokeWidth="4" strokeLinecap="round"/>
      {/* Trophy base plinth */}
      <rect x="138" y="197" width="16" height="5" rx="1.5" fill="#B8860B"/>
      <rect x="136" y="201" width="20" height="3" rx="1" fill="#9A6B00"/>
      {/* Engraved plaque on base */}
      <rect x="140" y="198" width="12" height="3" rx="0.8" fill="#D4A853"/>
      <text x="146" y="200.5" fontFamily="serif" fontSize="2" fill="#8B6B00" textAnchor="middle">WINNER</text>
      {/* Trophy stem */}
      <rect x="143.5" y="191" width="5" height="7" rx="1.5" fill="#D4A853"/>
      <rect x="144" y="191" width="4" height="7" rx="1" fill="#F0C060" opacity="0.4"/>
      {/* Trophy cup */}
      <path d="M136 191 Q137 178 146 175 Q155 178 156 191 Z" fill="#D4A853"/>
      {/* Cup inner shadow */}
      <path d="M138 191 Q139 180 146 177.5 Q153 180 154 191 Z" fill="#F0C060" opacity="0.35"/>
      {/* Cup shine */}
      <path d="M139 184 Q140 179 144 177" fill="none" stroke="#F8E070" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <path d="M153 184 Q153 180 151 178" fill="none" stroke="#B8860B" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      {/* Cup rim */}
      <path d="M136 191 Q146 193 156 191" fill="none" stroke="#B8860B" strokeWidth="1.5"/>
      {/* Left handle with scrollwork */}
      <path d="M136 186 Q130 184 131 188 Q130 192 136 190" fill="none" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M131 187 Q129 188 130 190" fill="none" stroke="#F0C060" strokeWidth="0.8" opacity="0.5"/>
      {/* Right handle with scrollwork */}
      <path d="M156 186 Q162 184 161 188 Q162 192 156 190" fill="none" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M161 187 Q163 188 162 190" fill="none" stroke="#F0C060" strokeWidth="0.8" opacity="0.5"/>
      {/* Laurel leaves on cup */}
      <path d="M140 183 Q142 180 144 183" fill="none" stroke="#3A7D5C" strokeWidth="1.2" opacity="0.6"/>
      <path d="M143 181 Q146 178 149 181" fill="none" stroke="#3A7D5C" strokeWidth="1.2" opacity="0.6"/>
      <path d="M148 183 Q150 180 152 183" fill="none" stroke="#3A7D5C" strokeWidth="1.2" opacity="0.6"/>
      {/* Star on cup front */}
      <path d="M146 184 L146.5 186 L148.5 186 L147 187.2 L147.5 189.2 L146 188 L144.5 189.2 L145 187.2 L143.5 186 L145.5 186 Z" fill="#F8E070" opacity="0.7"/>
    </g>
  );
}

function AccessoryShield() {
  return (
    <g>
      {/* Arm holding shield */}
      <path d="M122 156 Q135 164 138 177" fill="none" stroke="#6B4226" strokeWidth="4" strokeLinecap="round"/>
      {/* Shield wood back peek at edge */}
      <path d="M131 171 L131 200 Q140 207 149 200 L149 171 Q140 168 131 171Z" fill="#8B5E3C"/>
      {/* Shield main face */}
      <path d="M133 172 L133 199 Q140 205 147 199 L147 172 Q140 169 133 172Z" fill="#4A7FC4"/>
      {/* Metallic border */}
      <path d="M133 172 L133 199 Q140 205 147 199 L147 172 Q140 169 133 172Z" fill="none" stroke="#2C3E6B" strokeWidth="2"/>
      {/* Shield quartered design — dividing lines */}
      <line x1="140" y1="170" x2="140" y2="205" stroke="#2C3E6B" strokeWidth="1.2"/>
      <line x1="133" y1="187" x2="147" y2="187" stroke="#2C3E6B" strokeWidth="1.2"/>
      {/* Quadrant colors */}
      <path d="M134 173 L134 186 L139.5 186 L139.5 173 Q137 171 134 173Z" fill="#C45D3E" opacity="0.7"/>
      <path d="M140.5 173 L140.5 186 L146 186 L146 173 Q143 171 140.5 173Z" fill="#F5E6C8" opacity="0.7"/>
      <path d="M134 188 L134 199 Q137 203 139.5 204 L139.5 188Z" fill="#F5E6C8" opacity="0.7"/>
      <path d="M140.5 188 L140.5 204 Q143 203 146 199 L146 188Z" fill="#C45D3E" opacity="0.7"/>
      {/* Center emblem boss */}
      <circle cx="140" cy="187" r="4" fill="#D4A853" stroke="#B8860B" strokeWidth="1"/>
      <circle cx="140" cy="187" r="2.5" fill="#F0C060" opacity="0.5"/>
      {/* Star on boss */}
      <path d="M140 184.5 L140.4 185.7 L141.7 185.7 L140.7 186.5 L141.1 187.7 L140 187 L138.9 187.7 L139.3 186.5 L138.3 185.7 L139.6 185.7 Z" fill="white"/>
      {/* Rivets along border */}
      <circle cx="134" cy="174" r="1.2" fill="#D4A853"/>
      <circle cx="146" cy="174" r="1.2" fill="#D4A853"/>
      <circle cx="134" cy="198" r="1.2" fill="#D4A853"/>
      <circle cx="146" cy="198" r="1.2" fill="#D4A853"/>
      <circle cx="133.5" cy="186" r="1.2" fill="#D4A853"/>
      <circle cx="146.5" cy="186" r="1.2" fill="#D4A853"/>
      {/* Shield highlight */}
      <path d="M135 173 Q137 171.5 140 172" fill="none" stroke="#7BA0D4" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
    </g>
  );
}

function AccessoryScroll() {
  return (
    <g>
      {/* Arm to scroll */}
      <path d="M122 156 Q135 166 138 177" fill="none" stroke="#6B4226" strokeWidth="4" strokeLinecap="round"/>
      {/* Scroll parchment body */}
      <rect x="133" y="177" width="24" height="24" rx="1" fill="#EDD99A"/>
      {/* Parchment aged texture */}
      <rect x="133" y="177" width="24" height="24" rx="1" fill="#C4A860" opacity="0.18"/>
      <rect x="133" y="177" width="12" height="24" fill="#D4B870" opacity="0.12"/>
      {/* Top rolled end */}
      <ellipse cx="145" cy="177" rx="12" ry="3.5" fill="#D4A853"/>
      <ellipse cx="145" cy="177" rx="10" ry="2.5" fill="#E8C468" opacity="0.5"/>
      <ellipse cx="145" cy="177" rx="12" ry="3.5" fill="none" stroke="#B8860B" strokeWidth="0.8"/>
      {/* Top roll shadow line */}
      <path d="M133 178 Q145 181 157 178" fill="none" stroke="#9A7020" strokeWidth="0.7" opacity="0.4"/>
      {/* Bottom rolled end */}
      <ellipse cx="145" cy="201" rx="12" ry="3.5" fill="#D4A853"/>
      <ellipse cx="145" cy="201" rx="10" ry="2.5" fill="#E8C468" opacity="0.5"/>
      <ellipse cx="145" cy="201" rx="12" ry="3.5" fill="none" stroke="#B8860B" strokeWidth="0.8"/>
      {/* Wax seal */}
      <circle cx="145" cy="189" r="4.5" fill="#C45D3E"/>
      <circle cx="145" cy="189" r="4.5" fill="none" stroke="#A03020" strokeWidth="0.8"/>
      {/* Seal emblem */}
      <path d="M145 186 L145.5 187.7 L147.2 187.7 L145.9 188.7 L146.4 190.4 L145 189.4 L143.6 190.4 L144.1 188.7 L142.8 187.7 L144.5 187.7 Z" fill="#F0A0A0" opacity="0.7"/>
      {/* Ribbon tie across scroll */}
      <line x1="133" y1="186" x2="157" y2="186" stroke="#C45D3E" strokeWidth="2"/>
      <path d="M145 186 Q142 184 141 186 Q142 188 145 186" fill="#C45D3E"/>
      <path d="M145 186 Q148 184 149 186 Q148 188 145 186" fill="#C45D3E"/>
      {/* Visible text lines on parchment */}
      <line x1="136" y1="181" x2="153" y2="181" stroke="#9A7840" strokeWidth="0.7" opacity="0.55"/>
      <line x1="136" y1="184" x2="151" y2="184" stroke="#9A7840" strokeWidth="0.6" opacity="0.45"/>
      <line x1="136" y1="194" x2="153" y2="194" stroke="#9A7840" strokeWidth="0.7" opacity="0.55"/>
      <line x1="136" y1="197" x2="150" y2="197" stroke="#9A7840" strokeWidth="0.6" opacity="0.45"/>
    </g>
  );
}

function AccessoryCape() {
  return (
    <g>
      {/* Cape back layer — darker, furthest */}
      <path d="M75 156 Q65 200 58 252 Q100 262 142 252 Q136 200 126 156" fill="#9A3020" opacity="0.5"/>
      {/* Cape main body */}
      <path d="M73 155 Q62 200 56 250 Q100 261 144 250 Q139 200 127 155" fill="#C45D3E" opacity="0.85"/>
      {/* Cape inner lining — lighter warm tone */}
      <path d="M77 157 Q68 198 63 246 Q100 254 137 246 Q133 198 124 157" fill="#E87A5A" opacity="0.2"/>
      {/* Fabric fold lines — left side */}
      <path d="M73 155 Q66 185 62 220 Q60 235 61 250" fill="none" stroke="#A03020" strokeWidth="1.2" opacity="0.45"/>
      <path d="M79 156 Q74 190 72 225 Q71 240 73 250" fill="none" stroke="#E87060" strokeWidth="0.8" opacity="0.3"/>
      {/* Fabric fold lines — right side */}
      <path d="M127 155 Q133 185 137 220 Q139 235 138 250" fill="none" stroke="#A03020" strokeWidth="1.2" opacity="0.45"/>
      <path d="M121 156 Q126 190 128 225 Q129 240 127 250" fill="none" stroke="#E87060" strokeWidth="0.8" opacity="0.3"/>
      {/* Center drape fold */}
      <path d="M100 158 Q97 200 96 250" fill="none" stroke="#A03020" strokeWidth="0.8" opacity="0.3"/>
      {/* Wind/movement billow — left edge flare */}
      <path d="M56 240 Q50 245 54 252 Q57 250 56 240Z" fill="#C45D3E" opacity="0.5"/>
      {/* Wind billow — right edge flare */}
      <path d="M144 240 Q150 245 146 252 Q143 250 144 240Z" fill="#C45D3E" opacity="0.5"/>
      {/* Clasp at left shoulder */}
      <circle cx="73" cy="157" r="4" fill="#D4A853" stroke="#B8860B" strokeWidth="1"/>
      <circle cx="73" cy="157" r="2.2" fill="#F0C060" opacity="0.5"/>
      {/* Clasp at right shoulder */}
      <circle cx="127" cy="157" r="4" fill="#D4A853" stroke="#B8860B" strokeWidth="1"/>
      <circle cx="127" cy="157" r="2.2" fill="#F0C060" opacity="0.5"/>
      {/* Collar/shoulder band */}
      <path d="M73 157 Q100 148 127 157" fill="none" stroke="#A03020" strokeWidth="3" strokeLinecap="round"/>
      <path d="M73 157 Q100 148 127 157" fill="none" stroke="#E87060" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      {/* Hem decorative trim at bottom */}
      <path d="M58 250 Q100 262 142 250" fill="none" stroke="#B8860B" strokeWidth="1" strokeDasharray="3,2" opacity="0.5"/>
    </g>
  );
}

function AccessorySword() {
  return (
    <g>
      {/* Blade — angled from body down-right */}
      {/* Fuller groove (blood groove) — center of blade */}
      <path d="M141 156 L162 213" fill="none" stroke="#888898" strokeWidth="7" strokeLinecap="round"/>
      {/* Blade face */}
      <path d="M138 156 L159 213" fill="none" stroke="#C0C0CC" strokeWidth="4" strokeLinecap="round"/>
      {/* Blade edge — bright gleam */}
      <path d="M140 156 L161 213" fill="none" stroke="#E8E8F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
      {/* Fuller groove */}
      <path d="M141.5 158 L161 210" fill="none" stroke="#9898AA" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      {/* Tip taper */}
      <path d="M159 209 L163 216 L161 213Z" fill="#C0C0CC"/>
      {/* Crossguard — brass scrollwork ends */}
      <rect x="131" y="153" width="18" height="5" rx="2" fill="#D4A853"/>
      <rect x="131" y="153" width="18" height="5" rx="2" fill="none" stroke="#B8860B" strokeWidth="0.8"/>
      {/* Crossguard scroll left */}
      <path d="M131 155.5 Q128 153 127 155.5 Q128 158 131 155.5" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round"/>
      {/* Crossguard scroll right */}
      <path d="M149 155.5 Q152 153 153 155.5 Q152 158 149 155.5" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round"/>
      {/* Grip — wrapped leather */}
      <rect x="136.5" y="143" width="5" height="11" rx="1.5" fill="#6B4226"/>
      {/* Grip wrap lines */}
      <line x1="136.5" y1="145" x2="141.5" y2="145" stroke="#4A2E1A" strokeWidth="0.9" opacity="0.7"/>
      <line x1="136.5" y1="147" x2="141.5" y2="147" stroke="#4A2E1A" strokeWidth="0.9" opacity="0.7"/>
      <line x1="136.5" y1="149" x2="141.5" y2="149" stroke="#4A2E1A" strokeWidth="0.9" opacity="0.7"/>
      <line x1="136.5" y1="151" x2="141.5" y2="151" stroke="#4A2E1A" strokeWidth="0.9" opacity="0.7"/>
      {/* Grip highlight */}
      <rect x="137.5" y="143.5" width="2" height="10" rx="1" fill="#8B5E3C" opacity="0.35"/>
      {/* Pommel — rounded disc */}
      <ellipse cx="139" cy="142" rx="5" ry="3.5" fill="#D4A853"/>
      <ellipse cx="139" cy="142" rx="5" ry="3.5" fill="none" stroke="#B8860B" strokeWidth="0.8"/>
      <ellipse cx="139" cy="141.5" rx="3.5" ry="2" fill="#F0C060" opacity="0.35"/>
      {/* Pommel center stud */}
      <circle cx="139" cy="142" r="1.5" fill="#B8860B"/>
    </g>
  );
}

function AccessoryLantern() {
  return (
    <g>
      {/* Arm to lantern */}
      <path d="M122 158 Q135 167 142 178" fill="none" stroke="#6B4226" strokeWidth="4" strokeLinecap="round"/>
      {/* Handle hook above lantern */}
      <path d="M146 174 Q150 171 152 174" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round"/>
      <path d="M145 175 Q149 172 153 175" fill="none" stroke="#B8860B" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
      {/* Top cap */}
      <path d="M138 178 Q146 175 154 178 L153 181 Q146 178 139 181 Z" fill="#D4A853"/>
      <path d="M138 178 Q146 175 154 178" fill="none" stroke="#B8860B" strokeWidth="0.8"/>
      {/* Flame glow behind glass */}
      <ellipse cx="146" cy="191" rx="7" ry="9" fill="#F97316" opacity="0.25"/>
      {/* Glass panes */}
      <rect x="139" y="181" width="14" height="18" rx="1.5" fill="#FFF8E0" opacity="0.35"/>
      {/* Brass frame — vertical struts */}
      <line x1="139" y1="181" x2="139" y2="199" stroke="#D4A853" strokeWidth="1.5"/>
      <line x1="153" y1="181" x2="153" y2="199" stroke="#D4A853" strokeWidth="1.5"/>
      <line x1="146" y1="181" x2="146" y2="199" stroke="#D4A853" strokeWidth="0.8" opacity="0.5"/>
      {/* Brass frame — horizontal bands */}
      <rect x="139" y="181" width="14" height="2" rx="0.5" fill="#D4A853"/>
      <rect x="139" y="189" width="14" height="1.5" rx="0.5" fill="#D4A853" opacity="0.6"/>
      <rect x="139" y="197" width="14" height="2" rx="0.5" fill="#D4A853"/>
      {/* Flame */}
      <path d="M146 195 Q143 191 144.5 186 Q146 183.5 147.5 186 Q149 191 146 195Z" fill="#FBBF24"/>
      <path d="M146 193.5 Q144 190 145 186.5 Q146 184.5 147 186.5 Q148 190 146 193.5Z" fill="#FDE68A"/>
      <path d="M146 191 Q145 188.5 146 187 Q147 188.5 146 191Z" fill="white" opacity="0.5"/>
      {/* Glass reflections */}
      <rect x="140" y="183" width="3" height="8" rx="1" fill="white" opacity="0.12"/>
      <rect x="150" y="183" width="2" height="5" rx="1" fill="white" opacity="0.1"/>
      {/* Base */}
      <path d="M139 199 Q146 202 153 199 L152 201 Q146 204 140 201 Z" fill="#D4A853"/>
      <rect x="141" y="200" width="10" height="2" rx="0.8" fill="#B8860B" opacity="0.5"/>
      {/* Outer glow effect */}
      <ellipse cx="146" cy="191" rx="9" ry="11" fill="#F97316" opacity="0.06"/>
    </g>
  );
}

function AccessoryGuitar() {
  return (
    <g>
      {/* Neck — angled from upper body to body */}
      <path d="M118 152 L148 200" fill="none" stroke="#6B4226" strokeWidth="5" strokeLinecap="round"/>
      <path d="M118 152 L148 200" fill="none" stroke="#8B5E3C" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Frets on neck */}
      <line x1="122" y1="157" x2="126" y2="163" stroke="#D4A853" strokeWidth="1.2"/>
      <line x1="126" y1="163" x2="130" y2="169" stroke="#D4A853" strokeWidth="1.2"/>
      <line x1="130" y1="169" x2="134" y2="175" stroke="#D4A853" strokeWidth="1.2"/>
      <line x1="134" y1="175" x2="138" y2="181" stroke="#D4A853" strokeWidth="1.2"/>
      <line x1="138" y1="181" x2="142" y2="187" stroke="#D4A853" strokeWidth="1.2"/>
      {/* Nut at top of neck */}
      <line x1="119.5" y1="153.5" x2="124" y2="160" stroke="#E0D0B0" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Headstock */}
      <ellipse cx="116" cy="150" rx="5" ry="3" fill="#6B4226" transform="rotate(-30 116 150)"/>
      {/* Tuning pegs */}
      <circle cx="113" cy="148" r="1.5" fill="#D4A853" stroke="#B8860B" strokeWidth="0.5"/>
      <circle cx="115" cy="151" r="1.5" fill="#D4A853" stroke="#B8860B" strokeWidth="0.5"/>
      <circle cx="117" cy="154" r="1.5" fill="#D4A853" stroke="#B8860B" strokeWidth="0.5"/>
      {/* Guitar body — upper bout */}
      <ellipse cx="153" cy="200" rx="10" ry="7" fill="#8B5E3C"/>
      {/* Guitar body — lower bout */}
      <ellipse cx="156" cy="214" rx="13" ry="10" fill="#8B5E3C"/>
      {/* Waist between bouts */}
      <path d="M143 200 Q146 207 143 214" fill="none" stroke="#6B4226" strokeWidth="2" strokeLinecap="round"/>
      <path d="M163 200 Q167 207 169 214" fill="none" stroke="#6B4226" strokeWidth="2" strokeLinecap="round"/>
      {/* Wood grain on body */}
      <path d="M146 198 Q153 196 160 198" fill="none" stroke="#6B4226" strokeWidth="0.7" opacity="0.4"/>
      <path d="M144 203 Q153 200 162 203" fill="none" stroke="#6B4226" strokeWidth="0.7" opacity="0.4"/>
      <path d="M144 210 Q155 207 166 210" fill="none" stroke="#6B4226" strokeWidth="0.7" opacity="0.35"/>
      <path d="M145 217 Q156 214 167 217" fill="none" stroke="#6B4226" strokeWidth="0.7" opacity="0.35"/>
      {/* Body binding edge */}
      <ellipse cx="153" cy="200" rx="10" ry="7" fill="none" stroke="#C49A6C" strokeWidth="1"/>
      <ellipse cx="156" cy="214" rx="13" ry="10" fill="none" stroke="#C49A6C" strokeWidth="1"/>
      {/* Soundhole with rosette */}
      <circle cx="155" cy="208" r="4.5" fill="#3A2010"/>
      <circle cx="155" cy="208" r="4.5" fill="none" stroke="#C49A6C" strokeWidth="1"/>
      {/* Rosette detail rings */}
      <circle cx="155" cy="208" r="5.5" fill="none" stroke="#D4A853" strokeWidth="0.7" opacity="0.6"/>
      <circle cx="155" cy="208" r="6.2" fill="none" stroke="#8B5E3C" strokeWidth="0.5" opacity="0.4"/>
      {/* Pickguard */}
      <path d="M158 208 Q161 210 162 215 Q160 218 157 216 Q155 213 157 210 Z" fill="#2A1A0A" opacity="0.6"/>
      {/* Strings — 6 strings */}
      <line x1="148.5" y1="198" x2="148.5" y2="224" stroke="#D4D4D0" strokeWidth="0.4" opacity="0.8"/>
      <line x1="150.5" y1="197" x2="151" y2="224" stroke="#D4D4D0" strokeWidth="0.4" opacity="0.8"/>
      <line x1="152.5" y1="196" x2="153.5" y2="224" stroke="#D4D4D0" strokeWidth="0.4" opacity="0.8"/>
      <line x1="154.5" y1="196" x2="156" y2="224" stroke="#C0C0B8" strokeWidth="0.5" opacity="0.8"/>
      <line x1="156.5" y1="196" x2="158.5" y2="224" stroke="#C0C0B8" strokeWidth="0.6" opacity="0.8"/>
      <line x1="158.5" y1="197" x2="161" y2="224" stroke="#C0C0B8" strokeWidth="0.7" opacity="0.8"/>
      {/* Bridge */}
      <rect x="148" y="221" width="16" height="3" rx="1" fill="#4A2E1A"/>
      <rect x="148" y="221" width="16" height="1.5" rx="0.5" fill="#6B4226" opacity="0.5"/>
      {/* Bridge saddle */}
      <rect x="149" y="221.5" width="14" height="1" rx="0.3" fill="#E0D0B0"/>
    </g>
  );
}

function AccessoryCamera() {
  return (
    <g>
      {/* Leather strap from shoulder to camera */}
      <path d="M108 152 Q116 157 122 163" fill="none" stroke="#5C3820" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M108 152 Q116 157 122 163" fill="none" stroke="#A07848" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      {/* Strap buckle hardware */}
      <rect x="120" y="161" width="4" height="3" rx="0.5" fill="#C8A050"/>
      {/* Camera body outer shell */}
      <rect x="117" y="163" width="31" height="23" rx="3" fill="#3A2A18"/>
      {/* Leather body panel */}
      <rect x="118" y="164" width="29" height="21" rx="2" fill="#4E3820"/>
      {/* Leather texture stitching lines */}
      <line x1="119" y1="168" x2="146" y2="168" stroke="#3A2A18" strokeWidth="0.5" opacity="0.6"/>
      <line x1="119" y1="172" x2="146" y2="172" stroke="#3A2A18" strokeWidth="0.5" opacity="0.6"/>
      <line x1="119" y1="176" x2="146" y2="176" stroke="#3A2A18" strokeWidth="0.5" opacity="0.6"/>
      <line x1="119" y1="180" x2="146" y2="180" stroke="#3A2A18" strokeWidth="0.5" opacity="0.6"/>
      {/* Top body highlight sheen */}
      <rect x="118" y="164" width="29" height="4" rx="2" fill="#7A5A30" opacity="0.35"/>
      {/* Top panel */}
      <rect x="119" y="158" width="27" height="6" rx="2" fill="#2A1E10"/>
      {/* Shutter button chrome */}
      <circle cx="143" cy="161" r="2.2" fill="#C8A050"/>
      <circle cx="143" cy="161" r="1.2" fill="#EED080"/>
      {/* Viewfinder eyepiece */}
      <rect x="121" y="159" width="7" height="4" rx="1" fill="#1A1A2E"/>
      <rect x="122" y="159.5" width="5" height="2.5" rx="0.5" fill="#3A5A9A" opacity="0.75"/>
      <circle cx="124" cy="160.8" r="0.8" fill="white" opacity="0.3"/>
      {/* Flash unit on top-left */}
      <rect x="117" y="157" width="9" height="5" rx="1.5" fill="#909098"/>
      <rect x="118" y="157.5" width="7" height="3" rx="0.5" fill="#D8D8E8" opacity="0.75"/>
      {/* Lens barrel outer ring */}
      <circle cx="132" cy="174" r="9" fill="#181818"/>
      <circle cx="132" cy="174" r="8.2" fill="#222218"/>
      <circle cx="132" cy="174" r="8.2" fill="none" stroke="#C8A050" strokeWidth="1"/>
      {/* Lens focus ring */}
      <circle cx="132" cy="174" r="6.5" fill="none" stroke="#A08030" strokeWidth="0.7"/>
      {/* Lens inner barrel */}
      <circle cx="132" cy="174" r="5" fill="#0E0E18"/>
      {/* Lens glass element */}
      <circle cx="132" cy="174" r="4.6" fill="#1A2A4E" opacity="0.9"/>
      <circle cx="130" cy="172" r="1.8" fill="white" opacity="0.22"/>
      <circle cx="133.5" cy="176" r="0.8" fill="white" opacity="0.1"/>
      {/* Chrome dial top */}
      <circle cx="146" cy="167" r="2.5" fill="#C8A050"/>
      <circle cx="146" cy="167" r="1.6" fill="#EED080"/>
      <line x1="144.2" y1="167" x2="147.8" y2="167" stroke="#8A6820" strokeWidth="0.7"/>
      <line x1="146" y1="165.2" x2="146" y2="168.8" stroke="#8A6820" strokeWidth="0.7"/>
      {/* Chrome dial bottom */}
      <circle cx="146" cy="175" r="2.2" fill="#B09040"/>
      <circle cx="146" cy="175" r="1.3" fill="#D4A853"/>
      {/* Corner rivets */}
      <circle cx="120" cy="184" r="1.1" fill="#C8A050"/>
      <circle cx="146" cy="184" r="1.1" fill="#C8A050"/>
      {/* Film advance knob */}
      <rect x="141" y="163" width="5" height="2" rx="0.5" fill="#A08030"/>
      <line x1="142" y1="164" x2="145" y2="164" stroke="#EED080" strokeWidth="0.5" opacity="0.7"/>
    </g>
  );
}

function AccessoryTelescope() {
  return (
    <g>
      {/* Leather grip wrap on near section */}
      <rect x="119" y="154" width="13" height="7" rx="1.5" fill="#5C3820"/>
      <line x1="120" y1="155.5" x2="131" y2="155.5" stroke="#8B5E3C" strokeWidth="0.6" opacity="0.6"/>
      <line x1="120" y1="157.5" x2="131" y2="157.5" stroke="#8B5E3C" strokeWidth="0.6" opacity="0.6"/>
      <line x1="120" y1="159.5" x2="131" y2="159.5" stroke="#8B5E3C" strokeWidth="0.6" opacity="0.6"/>
      {/* Large near section barrel */}
      <line x1="125" y1="158" x2="148" y2="178" stroke="#D4A853" strokeWidth="7" strokeLinecap="round"/>
      <line x1="125" y1="158" x2="148" y2="178" stroke="#E8C860" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      {/* Engraving bands on near section */}
      <line x1="128" y1="160" x2="130" y2="162" stroke="#B8860B" strokeWidth="1.5"/>
      <line x1="132" y1="163" x2="134" y2="165" stroke="#B8860B" strokeWidth="1.5"/>
      <line x1="136" y1="167" x2="138" y2="169" stroke="#B8860B" strokeWidth="1.5"/>
      {/* Middle extending section */}
      <line x1="147" y1="178" x2="163" y2="192" stroke="#C8941A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="147" y1="178" x2="163" y2="192" stroke="#E8C860" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
      {/* Section join ring 1 */}
      <ellipse cx="148" cy="178" rx="4" ry="2.5" fill="#B8860B" transform="rotate(-45 148 178)"/>
      <ellipse cx="148" cy="178" rx="3" ry="1.8" fill="#D4A853" transform="rotate(-45 148 178)"/>
      {/* Far small section */}
      <line x1="162" y1="192" x2="174" y2="202" stroke="#B87800" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Section join ring 2 */}
      <ellipse cx="163" cy="192" rx="3.2" ry="2" fill="#B8860B" transform="rotate(-45 163 192)"/>
      <ellipse cx="163" cy="192" rx="2.2" ry="1.4" fill="#D4A853" transform="rotate(-45 163 192)"/>
      {/* Eyepiece end cap */}
      <circle cx="125" cy="158" r="5.5" fill="#B8860B"/>
      <circle cx="125" cy="158" r="4.5" fill="#D4A853"/>
      <circle cx="125" cy="158" r="3" fill="#3A2010"/>
      <circle cx="124" cy="157" r="1" fill="white" opacity="0.2"/>
      {/* Objective lens end */}
      <circle cx="174" cy="202" r="5" fill="#B8860B"/>
      <circle cx="174" cy="202" r="4" fill="#1A2A3A"/>
      <circle cx="174" cy="202" r="3" fill="#2A4A6A" opacity="0.9"/>
      <circle cx="173" cy="201" r="1.2" fill="white" opacity="0.3"/>
      {/* Decorative engraved line */}
      <path d="M133 165 Q137 168 141 172" fill="none" stroke="#F5D070" strokeWidth="0.7" opacity="0.6"/>
      {/* Focus ring knurl */}
      <rect x="156" y="188" width="5" height="3" rx="1" fill="#C8941A" transform="rotate(-45 158 190)"/>
    </g>
  );
}

function AccessoryCrystal() {
  return (
    <g>
      {/* Hanging cord with chain links */}
      <path d="M115 158 Q130 166 135 175" fill="none" stroke="#7A5A3A" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2,1.5"/>
      <circle cx="120" cy="161" r="1.2" fill="none" stroke="#C8A050" strokeWidth="0.8"/>
      <circle cx="125" cy="165" r="1.2" fill="none" stroke="#C8A050" strokeWidth="0.8"/>
      <circle cx="130" cy="169" r="1.2" fill="none" stroke="#C8A050" strokeWidth="0.8"/>
      {/* Gold setting cap at top */}
      <path d="M132 177 L137 175 L143 177 L141 180 L134 180 Z" fill="#D4A853"/>
      <path d="M133 178 L140 178 L141 180 L134 180 Z" fill="#B8860B"/>
      {/* Crystal outer facets */}
      <polygon points="137,180 148,188 145,205 130,205 127,188" fill="#7C3AED" opacity="0.85" stroke="#6D28D9" strokeWidth="0.8"/>
      {/* Left facet face */}
      <polygon points="137,180 127,188 130,205" fill="#8B5CF6" opacity="0.7"/>
      {/* Right facet face */}
      <polygon points="137,180 148,188 145,205" fill="#6D28D9" opacity="0.75"/>
      {/* Top facet face */}
      <polygon points="137,180 148,188 137,186 127,188" fill="#A78BFA" opacity="0.6"/>
      {/* Inner bright highlight */}
      <polygon points="137,182 144,188 137,193 130,188" fill="#DDD6FE" opacity="0.35"/>
      {/* Prismatic color reflection pink */}
      <polygon points="130,192 134,198 130,205" fill="#EC4899" opacity="0.25"/>
      {/* Prismatic color reflection cyan */}
      <polygon points="144,192 141,198 145,205" fill="#22D3EE" opacity="0.2"/>
      {/* Inner glow */}
      <ellipse cx="137" cy="192" rx="4" ry="6" fill="#F5F3FF" opacity="0.2"/>
      {/* Top sparkle cross */}
      <line x1="137" y1="175" x2="137" y2="179" stroke="#FDE68A" strokeWidth="1" opacity="0.8"/>
      <line x1="135" y1="177" x2="139" y2="177" stroke="#FDE68A" strokeWidth="1" opacity="0.8"/>
      <circle cx="137" cy="177" r="0.8" fill="white" opacity="0.9"/>
    </g>
  );
}

function AccessoryScepter() {
  return (
    <g>
      {/* Base finial */}
      <ellipse cx="148" cy="216" rx="5" ry="3" fill="#B8860B"/>
      <ellipse cx="148" cy="216" rx="3.5" ry="2" fill="#D4A853"/>
      {/* Shaft left edge */}
      <path d="M146 213 L142 160" stroke="#D4A853" strokeWidth="4" strokeLinecap="round"/>
      {/* Shaft right edge twisted look */}
      <path d="M150 213 L146 160" stroke="#D4A853" strokeWidth="4" strokeLinecap="round"/>
      {/* Twist highlight on shaft */}
      <path d="M147 210 Q144 200 146 190 Q148 180 145 170 Q142 160 144 155" fill="none" stroke="#EED080" strokeWidth="1.2" opacity="0.6"/>
      {/* Filigree band 1 */}
      <rect x="143" y="200" width="7" height="4" rx="1" fill="#B8860B"/>
      <rect x="144" y="201" width="5" height="2" rx="0.5" fill="#EED080" opacity="0.6"/>
      <line x1="144" y1="202" x2="149" y2="202" stroke="#D4A853" strokeWidth="0.5" strokeDasharray="1,1"/>
      {/* Filigree band 2 */}
      <rect x="143" y="185" width="7" height="4" rx="1" fill="#B8860B"/>
      <rect x="144" y="186" width="5" height="2" rx="0.5" fill="#EED080" opacity="0.6"/>
      {/* Filigree band 3 */}
      <rect x="143" y="170" width="7" height="3" rx="1" fill="#B8860B"/>
      <rect x="144" y="171" width="5" height="1.5" rx="0.5" fill="#EED080" opacity="0.6"/>
      {/* Crown-shaped ornate head */}
      <path d="M136 160 L136 154 L139 158 L144 148 L148 158 L151 154 L154 160 Z" fill="#D4A853"/>
      <path d="M137 160 L137 156 L140 159 L144 151 L148 159 L151 156 L153 160 Z" fill="#EED080" opacity="0.5"/>
      {/* Gem setting prong lines */}
      <line x1="138" y1="160" x2="137" y2="156" stroke="#B8860B" strokeWidth="1"/>
      <line x1="150" y1="160" x2="151" y2="156" stroke="#B8860B" strokeWidth="1"/>
      {/* Central gem */}
      <circle cx="144" cy="156" r="7" fill="#7C3AED"/>
      <circle cx="144" cy="156" r="6" fill="#8B5CF6"/>
      <circle cx="144" cy="156" r="4" fill="#A78BFA"/>
      <circle cx="144" cy="156" r="2.5" fill="#DDD6FE" opacity="0.7"/>
      <circle cx="142" cy="154" r="1.2" fill="white" opacity="0.5"/>
      {/* Gem outer glow */}
      <circle cx="144" cy="156" r="9" fill="#8B5CF6" opacity="0.08"/>
      {/* Side gem accents */}
      <circle cx="136" cy="157" r="2.5" fill="#FBBF24"/>
      <circle cx="136" cy="157" r="1.5" fill="#FDE68A"/>
      <circle cx="152" cy="157" r="2.5" fill="#FBBF24"/>
      <circle cx="152" cy="157" r="1.5" fill="#FDE68A"/>
    </g>
  );
}

function AccessoryStaff() {
  return (
    <g>
      {/* Staff wood gnarled slightly curved shaft */}
      <path d="M143 222 Q146 200 144 180 Q142 160 140 145" stroke="#6B4226" strokeWidth="7" fill="none" strokeLinecap="round"/>
      {/* Wood grain */}
      <path d="M144 220 Q147 198 145 178 Q143 158 141 145" stroke="#8B5E3C" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M142 218 Q144 196 143 176" stroke="#5A3218" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
      {/* Knot 1 */}
      <ellipse cx="143" cy="195" rx="5" ry="3" fill="#5A3218" opacity="0.5" transform="rotate(-10 143 195)"/>
      <ellipse cx="143" cy="195" rx="3" ry="2" fill="#7A4A28" opacity="0.4" transform="rotate(-10 143 195)"/>
      {/* Knot 2 */}
      <ellipse cx="142" cy="175" rx="4" ry="2.5" fill="#5A3218" opacity="0.45" transform="rotate(5 142 175)"/>
      {/* Leather grip wrap */}
      <rect x="138" y="200" width="10" height="18" rx="2" fill="#4A2E1A"/>
      <line x1="139" y1="202" x2="147" y2="202" stroke="#6B4226" strokeWidth="0.7" opacity="0.7"/>
      <line x1="139" y1="205" x2="147" y2="205" stroke="#6B4226" strokeWidth="0.7" opacity="0.7"/>
      <line x1="139" y1="208" x2="147" y2="208" stroke="#6B4226" strokeWidth="0.7" opacity="0.7"/>
      <line x1="139" y1="211" x2="147" y2="211" stroke="#6B4226" strokeWidth="0.7" opacity="0.7"/>
      <line x1="139" y1="214" x2="147" y2="214" stroke="#6B4226" strokeWidth="0.7" opacity="0.7"/>
      {/* Grip end rings */}
      <rect x="137" y="199" width="12" height="3" rx="1" fill="#8B5E3C"/>
      <rect x="137" y="218" width="12" height="3" rx="1" fill="#8B5E3C"/>
      {/* Orb socket collar at top */}
      <circle cx="140" cy="147" r="9" fill="#3A2A10"/>
      <circle cx="140" cy="147" r="9" fill="none" stroke="#C8A050" strokeWidth="1.2"/>
      {/* Glowing orb layers */}
      <circle cx="140" cy="145" r="10" fill="#1A3A2A" opacity="0.4"/>
      <circle cx="140" cy="145" r="8" fill="#1E5A3C"/>
      <circle cx="140" cy="145" r="7" fill="#2E7A50"/>
      <circle cx="140" cy="145" r="5.5" fill="#3ADE80" opacity="0.7"/>
      <circle cx="140" cy="145" r="4" fill="#86EFAC" opacity="0.6"/>
      <circle cx="138" cy="143" r="2" fill="white" opacity="0.4"/>
      {/* Magical swirls inside orb */}
      <path d="M136 145 Q138 142 141 144 Q143 146 141 148" fill="none" stroke="#BBFFD6" strokeWidth="0.8" opacity="0.6"/>
      <path d="M138 148 Q140 145 143 146" fill="none" stroke="#BBFFD6" strokeWidth="0.6" opacity="0.4"/>
      {/* Outer orb glow rings */}
      <circle cx="140" cy="145" r="12" fill="#4ADE80" opacity="0.08"/>
      <circle cx="140" cy="145" r="15" fill="#4ADE80" opacity="0.05"/>
      {/* Floating magical sparkles */}
      <circle cx="129" cy="140" r="1" fill="#86EFAC" opacity="0.7"/>
      <circle cx="152" cy="143" r="0.8" fill="#86EFAC" opacity="0.6"/>
      <circle cx="133" cy="133" r="0.7" fill="#4ADE80" opacity="0.5"/>
      <circle cx="148" cy="136" r="0.9" fill="#4ADE80" opacity="0.5"/>
    </g>
  );
}

function AccessoryArmor() {
  return (
    <g>
      {/* Chain mail underlay left */}
      <path d="M68 158 Q63 170 64 190" fill="none" stroke="#808888" strokeWidth="6" strokeLinecap="round" opacity="0.5"/>
      {/* Chain mail dots left */}
      <circle cx="66" cy="162" r="1" fill="#606868" opacity="0.6"/>
      <circle cx="69" cy="165" r="1" fill="#606868" opacity="0.6"/>
      <circle cx="66" cy="168" r="1" fill="#606868" opacity="0.6"/>
      <circle cx="69" cy="171" r="1" fill="#606868" opacity="0.6"/>
      <circle cx="66" cy="174" r="1" fill="#606868" opacity="0.6"/>
      <circle cx="69" cy="177" r="1" fill="#606868" opacity="0.6"/>
      {/* Chain mail underlay right */}
      <path d="M132 158 Q137 170 136 190" fill="none" stroke="#808888" strokeWidth="6" strokeLinecap="round" opacity="0.5"/>
      {/* Chain mail dots right */}
      <circle cx="134" cy="162" r="1" fill="#606868" opacity="0.6"/>
      <circle cx="131" cy="165" r="1" fill="#606868" opacity="0.6"/>
      <circle cx="134" cy="168" r="1" fill="#606868" opacity="0.6"/>
      <circle cx="131" cy="171" r="1" fill="#606868" opacity="0.6"/>
      <circle cx="134" cy="174" r="1" fill="#606868" opacity="0.6"/>
      <circle cx="131" cy="177" r="1" fill="#606868" opacity="0.6"/>
      {/* Left pauldron bottom plate */}
      <path d="M60 175 Q58 182 60 192 Q66 198 75 196 Q80 186 78 175 Z" fill="#6A6A72"/>
      <path d="M61 176 Q59 183 61 191 Q66 196 74 195 Q79 185 77 176 Z" fill="#A0A0A8" opacity="0.5"/>
      {/* Left pauldron middle plate */}
      <path d="M60 165 Q57 172 60 180 Q68 186 78 182 Q82 173 80 164 Z" fill="#8888A0"/>
      <path d="M61 166 Q58 173 61 179 Q68 184 77 181 Q81 172 79 165 Z" fill="#C0C0D0" opacity="0.4"/>
      {/* Left pauldron top shoulder cap */}
      <path d="M62 155 Q58 162 60 170 Q70 176 82 170 Q86 160 83 152 Z" fill="#A8A8B8"/>
      <path d="M63 156 Q59 163 61 169 Q70 174 81 169 Q85 159 82 153 Z" fill="#D0D0E0" opacity="0.35"/>
      {/* Left cap sheen */}
      <path d="M65 155 Q70 152 80 155 Q84 158 82 162 Q75 158 65 158 Z" fill="white" opacity="0.18"/>
      {/* Left rivets */}
      <circle cx="64" cy="160" r="1.5" fill="#C8C8D8"/>
      <circle cx="78" cy="157" r="1.5" fill="#C8C8D8"/>
      <circle cx="64" cy="170" r="1.5" fill="#C8C8D8"/>
      <circle cx="79" cy="168" r="1.5" fill="#C8C8D8"/>
      {/* Left scratch marks */}
      <line x1="67" y1="158" x2="72" y2="164" stroke="#50505A" strokeWidth="0.6" opacity="0.5"/>
      <line x1="70" y1="156" x2="74" y2="161" stroke="#50505A" strokeWidth="0.5" opacity="0.4"/>
      {/* Right pauldron bottom plate */}
      <path d="M140 175 Q142 182 140 192 Q134 198 125 196 Q120 186 122 175 Z" fill="#6A6A72"/>
      <path d="M139 176 Q141 183 139 191 Q134 196 126 195 Q121 185 123 176 Z" fill="#A0A0A8" opacity="0.5"/>
      {/* Right pauldron middle plate */}
      <path d="M140 165 Q143 172 140 180 Q132 186 122 182 Q118 173 120 164 Z" fill="#8888A0"/>
      <path d="M139 166 Q142 173 139 179 Q132 184 123 181 Q119 172 121 165 Z" fill="#C0C0D0" opacity="0.4"/>
      {/* Right pauldron top shoulder cap */}
      <path d="M138 155 Q142 162 140 170 Q130 176 118 170 Q114 160 117 152 Z" fill="#A8A8B8"/>
      <path d="M137 156 Q141 163 139 169 Q130 174 119 169 Q115 159 118 153 Z" fill="#D0D0E0" opacity="0.35"/>
      {/* Right cap sheen */}
      <path d="M135 155 Q130 152 120 155 Q116 158 118 162 Q125 158 135 158 Z" fill="white" opacity="0.18"/>
      {/* Right rivets */}
      <circle cx="136" cy="160" r="1.5" fill="#C8C8D8"/>
      <circle cx="122" cy="157" r="1.5" fill="#C8C8D8"/>
      <circle cx="136" cy="170" r="1.5" fill="#C8C8D8"/>
      <circle cx="121" cy="168" r="1.5" fill="#C8C8D8"/>
      {/* Right scratch marks */}
      <line x1="133" y1="158" x2="128" y2="164" stroke="#50505A" strokeWidth="0.6" opacity="0.5"/>
      <line x1="130" y1="156" x2="126" y2="161" stroke="#50505A" strokeWidth="0.5" opacity="0.4"/>
      {/* Gorget neck guard across top */}
      <rect x="72" y="150" width="56" height="9" rx="3" fill="#9090A0"/>
      <rect x="73" y="151" width="54" height="7" rx="2" fill="#B8B8C8" opacity="0.4"/>
      {/* Gorget top highlight */}
      <rect x="73" y="151" width="54" height="3" rx="2" fill="white" opacity="0.15"/>
      {/* Gorget rivets */}
      <circle cx="78" cy="154.5" r="1.2" fill="#D0D0E0"/>
      <circle cx="100" cy="154.5" r="1.2" fill="#D0D0E0"/>
      <circle cx="122" cy="154.5" r="1.2" fill="#D0D0E0"/>
    </g>
  );
}

function AccessoryFlag() {
  return (
    <g>
      {/* Pole shadow */}
      <line x1="153" y1="146" x2="153" y2="219" stroke="#000" strokeWidth="2" opacity="0.08"/>
      {/* Pole wooden with grain texture */}
      <line x1="152" y1="145" x2="152" y2="218" stroke="#5A3820" strokeWidth="4" strokeLinecap="round"/>
      <line x1="153" y1="145" x2="153" y2="218" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      {/* Wood grain lines */}
      <line x1="151" y1="160" x2="151" y2="180" stroke="#4A2E1A" strokeWidth="0.4" opacity="0.3"/>
      <line x1="153" y1="190" x2="153" y2="210" stroke="#4A2E1A" strokeWidth="0.3" opacity="0.25"/>
      {/* Pole bands */}
      <rect x="149.5" y="165" width="5" height="2" rx="0.5" fill="#D4A853" opacity="0.6"/>
      <rect x="149.5" y="200" width="5" height="2" rx="0.5" fill="#D4A853" opacity="0.6"/>
      {/* Pole finial spear tip */}
      <polygon points="152,138 148,148 152,146 156,148" fill="#D4A853" stroke="#B8860B" strokeWidth="0.5"/>
      <polygon points="152,138 151,145 153,145" fill="#F0C060" opacity="0.6"/>
      {/* Rope tie at flag base */}
      <circle cx="152" cy="152" r="2" fill="#A07840"/>
      <circle cx="152" cy="155" r="1.5" fill="#A07840"/>
      <path d="M152 152 Q149 153 150 156" fill="none" stroke="#C8A060" strokeWidth="0.8"/>
      <path d="M152 155 Q150 157 151 159" fill="none" stroke="#C8A060" strokeWidth="0.6" opacity="0.5"/>
      {/* Flag rippling pennant */}
      <path d="M152 150 Q162 152 172 150 Q178 154 175 158 Q168 156 162 158 Q168 161 178 162 Q180 167 172 167 Q162 164 152 166 Z" fill="#C45D3E" stroke="#A03828" strokeWidth="0.5"/>
      {/* Mid-ripple shadow */}
      <path d="M162 150 Q168 152 172 150 Q175 154 172 156 Q168 154 162 152 Z" fill="#A03828" opacity="0.4"/>
      <path d="M162 158 Q168 160 178 162 Q178 165 174 166 Q168 163 162 163 Z" fill="#A03828" opacity="0.35"/>
      {/* Top edge highlight */}
      <path d="M152 150 Q162 149 172 150 Q175 151 174 152 Q164 151 152 152 Z" fill="#E87060" opacity="0.4"/>
      {/* Bottom edge highlight */}
      <path d="M152 164 Q162 166 172 167 Q170 165.5 168 165" fill="none" stroke="#E87060" strokeWidth="0.5" opacity="0.3"/>
      {/* Fabric texture lines */}
      <path d="M156 152 Q164 154 170 152" fill="none" stroke="#B04030" strokeWidth="0.4" opacity="0.3"/>
      <path d="M155 156 Q162 157 168 156" fill="none" stroke="#B04030" strokeWidth="0.4" opacity="0.25"/>
      <path d="M156 161 Q164 162 174 163" fill="none" stroke="#B04030" strokeWidth="0.4" opacity="0.25"/>
      {/* Star emblem on flag */}
      <polygon points="164,153 165,156 168,156 165.5,158 166.5,161 164,159.5 161.5,161 162.5,158 160,156 163,156" fill="#FDE68A" opacity="0.85"/>
      <polygon points="164,154 164.6,155.8 166.8,155.8 165.1,157 165.7,159 164,158 162.3,159 162.9,157 161.2,155.8 163.4,155.8" fill="#FFF8DC" opacity="0.4"/>
      {/* Rope fringe at back */}
      <line x1="152" y1="150" x2="150" y2="153" stroke="#8B3020" strokeWidth="0.8" opacity="0.7"/>
      <line x1="152" y1="155" x2="150" y2="158" stroke="#8B3020" strokeWidth="0.8" opacity="0.7"/>
      <line x1="152" y1="160" x2="150" y2="163" stroke="#8B3020" strokeWidth="0.8" opacity="0.7"/>
      <line x1="152" y1="164" x2="150" y2="167" stroke="#8B3020" strokeWidth="0.6" opacity="0.5"/>
    </g>
  );
}

function AccessoryBanner() {
  return (
    <g>
      {/* Pole ornate dark wood */}
      <line x1="152" y1="143" x2="152" y2="218" stroke="#4A2E1A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="153.5" y1="143" x2="153.5" y2="218" stroke="#8B5E3C" strokeWidth="1.8" strokeLinecap="round" opacity="0.35"/>
      {/* Pole finial decorative sphere */}
      <circle cx="152" cy="141" r="5" fill="#D4A853"/>
      <circle cx="152" cy="141" r="3.5" fill="#EED080"/>
      <circle cx="151" cy="140" r="1.5" fill="white" opacity="0.3"/>
      {/* Crossbar */}
      <line x1="138" y1="150" x2="166" y2="150" stroke="#4A2E1A" strokeWidth="4" strokeLinecap="round"/>
      <line x1="138" y1="150" x2="166" y2="150" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
      {/* Crossbar end knobs */}
      <circle cx="138" cy="150" r="3" fill="#D4A853"/>
      <circle cx="138" cy="150" r="2" fill="#EED080"/>
      <circle cx="166" cy="150" r="3" fill="#D4A853"/>
      <circle cx="166" cy="150" r="2" fill="#EED080"/>
      {/* Rope ties at crossbar */}
      <path d="M140 150 Q141 153 140 155" fill="none" stroke="#C8A060" strokeWidth="1"/>
      <path d="M164 150 Q163 153 164 155" fill="none" stroke="#C8A060" strokeWidth="1"/>
      {/* Banner fabric hanging rectangle */}
      <rect x="139" y="153" width="26" height="30" rx="1" fill="#4F46E5"/>
      {/* Fabric left edge shading */}
      <rect x="139" y="153" width="5" height="30" rx="1" fill="#3730A3" opacity="0.5"/>
      {/* Fabric right edge highlight */}
      <rect x="158" y="153" width="7" height="30" rx="1" fill="#818CF8" opacity="0.3"/>
      {/* Top decorative band */}
      <rect x="139" y="153" width="26" height="5" rx="1" fill="#D4A853"/>
      <line x1="140" y1="156" x2="164" y2="156" stroke="#B8860B" strokeWidth="0.5" opacity="0.7"/>
      {/* Bottom decorative band */}
      <rect x="139" y="178" width="26" height="5" rx="1" fill="#D4A853"/>
      {/* Emblem background */}
      <rect x="143" y="160" width="18" height="16" rx="2" fill="#6366F1" opacity="0.5"/>
      {/* Shield emblem outline */}
      <path d="M152 162 L157 164 L157 171 L152 174 L147 171 L147 164 Z" fill="none" stroke="#D4A853" strokeWidth="0.8" opacity="0.7"/>
      {/* SF initials */}
      <text x="152" y="170" fontFamily="serif" fontSize="7" fontWeight="bold" fill="#FDE68A" textAnchor="middle" opacity="0.9">SF</text>
      {/* Left tassel */}
      <line x1="140" y1="183" x2="138" y2="192" stroke="#D4A853" strokeWidth="1.5"/>
      <line x1="141" y1="183" x2="139" y2="192" stroke="#B8860B" strokeWidth="0.8" opacity="0.6"/>
      <ellipse cx="138.5" cy="193" rx="2" ry="1" fill="#D4A853"/>
      {/* Right tassel */}
      <line x1="164" y1="183" x2="166" y2="192" stroke="#D4A853" strokeWidth="1.5"/>
      <line x1="163" y1="183" x2="165" y2="192" stroke="#B8860B" strokeWidth="0.8" opacity="0.6"/>
      <ellipse cx="165.5" cy="193" rx="2" ry="1" fill="#D4A853"/>
    </g>
  );
}

function AccessoryLightning() {
  return (
    <g className="anim-lightning">
      {/* Outermost glow halo */}
      <polygon points="96,152 87,174 97,173 84,202 115,168 103,169 112,152" fill="#FEF08A" opacity="0.15"/>
      {/* Mid glow layer */}
      <polygon points="96,153 88,173 97,172 85,200 113,169 102,170 111,153" fill="#FDE047" opacity="0.25"/>
      {/* Main bolt shape */}
      <polygon points="96,155 89,174 97,173 86,199 111,170 101,170 109,155" fill="#FBBF24" stroke="#F59E0B" strokeWidth="0.8"/>
      {/* Inner bright highlight */}
      <polygon points="98,157 92,172 99,171 90,194 107,172 100,172 106,157" fill="#FEF9C3" opacity="0.6"/>
      {/* Branch bolt upper-left */}
      <path d="M96 160 Q88 163 84 158 Q88 162 85 167" fill="none" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      {/* Branch bolt lower-right */}
      <path d="M100 180 Q108 183 112 179 Q108 183 110 188" fill="none" stroke="#FDE047" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      {/* Small upper branch */}
      <path d="M104 158 Q110 154 113 157" fill="none" stroke="#FEF08A" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      {/* Energy crackling sparks */}
      <circle cx="96" cy="155" r="2.5" fill="#FEF9C3" className="anim-sparkle-1"/>
      <circle cx="86" cy="199" r="2" fill="#FEF9C3" className="anim-sparkle-2"/>
      <circle cx="97" cy="173" r="1.5" fill="white" className="anim-sparkle-3"/>
      {/* Glow end dots */}
      <circle cx="84" cy="158" r="1.2" fill="#FDE047" className="anim-sparkle-2"/>
      <circle cx="112" cy="179" r="1" fill="#FDE047" className="anim-sparkle-3"/>
    </g>
  );
}

function AccessoryAura() {
  return (
    <g>
      {/* Outermost faint ring */}
      <ellipse cx="100" cy="192" rx="62" ry="66" fill="none" stroke="#FBBF24" strokeWidth="1" className="anim-pulse-soft"/>
      {/* Outer energy ring */}
      <ellipse cx="100" cy="192" rx="57" ry="61" fill="none" stroke="#FBBF24" strokeWidth="1.5" className="anim-pulse"/>
      {/* Middle ring */}
      <ellipse cx="100" cy="192" rx="52" ry="56" fill="none" stroke="#F59E0B" strokeWidth="2" className="anim-pulse-delayed"/>
      {/* Inner bright ring */}
      <ellipse cx="100" cy="192" rx="47" ry="51" fill="none" stroke="#FDE68A" strokeWidth="2.5" className="anim-pulse"/>
      {/* Innermost glow fill ring */}
      <ellipse cx="100" cy="192" rx="42" ry="46" fill="#FBBF24" fillOpacity="0.04" stroke="#FBBF24" strokeWidth="1.5" className="anim-pulse-delayed"/>
      {/* Warm ground glow */}
      <ellipse cx="100" cy="215" rx="30" ry="18" fill="#FBBF24" opacity="0.06"/>
      {/* Floating light motes large */}
      <circle cx="52" cy="172" r="2.5" fill="#FDE68A" className="anim-sparkle-1"/>
      <circle cx="148" cy="168" r="2" fill="#FDE68A" className="anim-sparkle-2"/>
      <circle cx="46" cy="205" r="2" fill="#FDE68A" className="anim-sparkle-3"/>
      <circle cx="154" cy="210" r="2.5" fill="#FDE68A" className="anim-sparkle-1"/>
      <circle cx="50" cy="188" r="1.5" fill="#FBBF24" className="anim-sparkle-2"/>
      <circle cx="150" cy="192" r="1.5" fill="#FBBF24" className="anim-sparkle-3"/>
      {/* Floating motes small */}
      <circle cx="60" cy="155" r="1.2" fill="#FEF9C3" className="anim-sparkle-3"/>
      <circle cx="140" cy="155" r="1" fill="#FEF9C3" className="anim-sparkle-1"/>
      <circle cx="44" cy="220" r="1.2" fill="#FEF9C3" className="anim-sparkle-2"/>
      <circle cx="156" cy="225" r="1" fill="#FEF9C3" className="anim-sparkle-3"/>
      {/* Top particle sparkle */}
      <g className="anim-shimmer">
        <line x1="100" y1="137" x2="100" y2="141" stroke="#FDE68A" strokeWidth="1.2" opacity="0.4"/>
        <line x1="97" y1="138" x2="103" y2="138" stroke="#FDE68A" strokeWidth="1.2" opacity="0.4"/>
      </g>
      {/* Energy arc left */}
      <path d="M50 175 Q44 185 48 196" fill="none" stroke="#FBBF24" strokeWidth="1" opacity="0.25" strokeDasharray="3,2" className="anim-shimmer"/>
      {/* Energy arc right */}
      <path d="M150 175 Q156 185 152 196" fill="none" stroke="#FBBF24" strokeWidth="1" opacity="0.25" strokeDasharray="3,2" className="anim-shimmer-delayed"/>
    </g>
  );
}

function AccessoryStardust() {
  return (
    <g>
      {/* 4-point star large left */}
      <path d="M55 160 L56.2 157 L57.4 160 L60 158.8 L57.4 160 L56.2 163 L55 160 L52.4 158.8 Z" fill="#FDE68A" className="anim-sparkle-1"/>
      {/* 4-point star large right */}
      <path d="M145 162 L146.2 159 L147.4 162 L150 160.8 L147.4 162 L146.2 165 L145 162 L142.4 160.8 Z" fill="#FDE68A" className="anim-sparkle-2"/>
      {/* 4-point star bottom-left */}
      <path d="M60 220 L61.2 217 L62.4 220 L65 218.8 L62.4 220 L61.2 223 L60 220 L57.4 218.8 Z" fill="#FBBF24" className="anim-sparkle-3"/>
      {/* 4-point star bottom-right */}
      <path d="M140 230 L141.2 227 L142.4 230 L145 228.8 L142.4 230 L141.2 233 L140 230 L137.4 228.8 Z" fill="#FDE68A" className="anim-sparkle-1"/>
      {/* 6-point star left mid */}
      <path d="M50 185 L51 183 L52 185 L54 185 L52 187 L53 189 L51 188 L49 189 L50 187 L48 185 Z" fill="#FEF9C3" className="anim-sparkle-2"/>
      {/* 6-point star right mid */}
      <path d="M150 180 L151 178 L152 180 L154 180 L152 182 L153 184 L151 183 L149 184 L150 182 L148 180 Z" fill="#FEF9C3" className="anim-sparkle-3"/>
      {/* Small sparkle dots */}
      <circle cx="65" cy="175" r="1.5" fill="#FBBF24" className="anim-sparkle-3"/>
      <circle cx="135" cy="172" r="1.2" fill="#FBBF24" className="anim-sparkle-1"/>
      <circle cx="48" cy="200" r="1.8" fill="#FDE68A" className="anim-sparkle-2"/>
      <circle cx="152" cy="198" r="1.5" fill="#FDE68A" className="anim-sparkle-3"/>
      <circle cx="70" cy="235" r="1.2" fill="#FBBF24" className="anim-sparkle-1"/>
      <circle cx="130" cy="240" r="1.5" fill="#FBBF24" className="anim-sparkle-2"/>
      {/* Trailing sparkle streaks */}
      <path d="M55 162 Q60 160 65 162" fill="none" stroke="#FDE68A" strokeWidth="0.8" className="anim-shimmer"/>
      <path d="M145 164 Q140 162 135 164" fill="none" stroke="#FDE68A" strokeWidth="0.8" className="anim-shimmer-delayed"/>
      <path d="M50 188 Q52 184 55 186" fill="none" stroke="#FEF9C3" strokeWidth="0.7" className="anim-shimmer"/>
      <path d="M150 183 Q148 179 145 181" fill="none" stroke="#FEF9C3" strokeWidth="0.7" className="anim-shimmer-delayed"/>
      {/* Tiny glints */}
      <circle cx="58" cy="196" r="0.8" fill="white" className="anim-sparkle-1"/>
      <circle cx="142" cy="190" r="0.8" fill="white" className="anim-sparkle-2"/>
      <circle cx="63" cy="210" r="0.7" fill="white" className="anim-sparkle-3"/>
      <circle cx="137" cy="215" r="0.7" fill="white" className="anim-sparkle-1"/>
      <circle cx="55" cy="155" r="0.7" fill="white" className="anim-sparkle-2"/>
      <circle cx="145" cy="155" r="0.7" fill="white" className="anim-sparkle-3"/>
    </g>
  );
}

function AccessoryCosmicAura() {
  return (
    <g>
      {/* Outer nebula ring */}
      <ellipse cx="100" cy="192" rx="62" ry="66" fill="none" stroke="#4F46E5" strokeWidth="1" className="anim-pulse-soft"/>
      <ellipse cx="100" cy="192" rx="57" ry="61" fill="none" stroke="#6366F1" strokeWidth="1.5" className="anim-pulse"/>
      <ellipse cx="100" cy="192" rx="52" ry="56" fill="none" stroke="#8B5CF6" strokeWidth="2" className="anim-pulse-delayed"/>
      <ellipse cx="100" cy="192" rx="47" ry="51" fill="none" stroke="#A78BFA" strokeWidth="2" className="anim-pulse"/>
      {/* Nebula swirl hints */}
      <path d="M50 175 Q60 168 75 175 Q85 182 70 190" fill="none" stroke="#818CF8" strokeWidth="1.5" className="anim-shimmer"/>
      <path d="M130 178 Q140 170 150 178 Q145 188 135 185" fill="none" stroke="#818CF8" strokeWidth="1.5" className="anim-shimmer-delayed"/>
      {/* Stars */}
      <circle cx="52" cy="170" r="2" fill="white" className="anim-galaxy-1"/>
      <circle cx="52" cy="170" r="0.8" fill="white"/>
      <circle cx="148" cy="175" r="1.5" fill="white" className="anim-galaxy-2"/>
      <circle cx="58" cy="210" r="1.5" fill="white" className="anim-galaxy-3"/>
      <circle cx="142" cy="220" r="2" fill="white" className="anim-galaxy-1"/>
      <circle cx="142" cy="220" r="0.8" fill="white"/>
      <circle cx="45" cy="195" r="1" fill="#87CEEB" className="anim-galaxy-2"/>
      <circle cx="155" cy="198" r="1.2" fill="#87CEEB" className="anim-galaxy-3"/>
      {/* Constellation lines */}
      <g stroke="white" strokeWidth="0.3" className="anim-shimmer">
        <line x1="52" y1="170" x2="58" y2="210"/>
        <line x1="148" y1="175" x2="142" y2="220"/>
      </g>
      {/* Stardust particles */}
      <circle cx="65" cy="160" r="0.8" fill="#C4B5FD" className="anim-sparkle-1"/>
      <circle cx="135" cy="158" r="0.7" fill="#C4B5FD" className="anim-sparkle-2"/>
      <circle cx="48" cy="225" r="0.9" fill="#DDD6FE" className="anim-sparkle-3"/>
      <circle cx="152" cy="230" r="0.8" fill="#DDD6FE" className="anim-sparkle-1"/>
    </g>
  );
}

function AccessoryHaloAcc() {
  return (
    <g>
      {/* Outer glow */}
      <ellipse cx="100" cy="148" rx="34" ry="10" fill="#FBBF24" className="anim-halo"/>
      {/* Main ring */}
      <ellipse cx="100" cy="148" rx="28" ry="6" fill="none" stroke="#FBBF24" strokeWidth="4"/>
      <ellipse cx="100" cy="148" rx="28" ry="6" fill="none" stroke="#FDE68A" strokeWidth="1.5" opacity="0.6"/>
      {/* Inner glow */}
      <ellipse cx="100" cy="148" rx="24" ry="4" fill="#FDE68A" className="anim-pulse-soft"/>
      {/* Sparkle highlights */}
      <circle cx="76" cy="146" r="1.5" fill="white" className="anim-sparkle-1"/>
      <circle cx="124" cy="146" r="1.5" fill="white" className="anim-sparkle-2"/>
      <circle cx="100" cy="142" r="1" fill="white" className="anim-sparkle-3"/>
      {/* Light particles */}
      <circle cx="85" cy="140" r="0.8" fill="#FBBF24" className="anim-sparkle-2"/>
      <circle cx="115" cy="140" r="0.8" fill="#FBBF24" className="anim-sparkle-3"/>
    </g>
  );
}

function AccessoryPhoenixWings() {
  return (
    <g>
      {/* Left wing */}
      <g className="anim-wing-l">
        <path d="M55 170 Q25 135 10 150 Q5 168 28 180 Q15 158 40 166" fill="#DC2626" opacity="0.6"/>
        <path d="M55 172 Q30 142 18 158 Q14 174 36 184" fill="#F97316" opacity="0.6"/>
        <path d="M55 175 Q38 152 28 168 Q24 180 42 188" fill="#FBBF24" opacity="0.45"/>
        <path d="M20 158 Q30 160 40 168" fill="none" stroke="#C45D3E" strokeWidth="0.8" opacity="0.3"/>
        <path d="M25 165 Q35 167 45 172" fill="none" stroke="#D97706" strokeWidth="0.6" opacity="0.25"/>
        <circle cx="18" cy="148" r="1.5" fill="#FBBF24" className="anim-ember-1"/>
        <circle cx="12" cy="162" r="1" fill="#F97316" className="anim-ember-2"/>
      </g>
      {/* Right wing */}
      <g className="anim-wing-r">
        <path d="M145 170 Q175 135 190 150 Q195 168 172 180 Q185 158 160 166" fill="#DC2626" opacity="0.6"/>
        <path d="M145 172 Q170 142 182 158 Q186 174 164 184" fill="#F97316" opacity="0.6"/>
        <path d="M145 175 Q162 152 172 168 Q176 180 158 188" fill="#FBBF24" opacity="0.45"/>
        <path d="M180 158 Q170 160 160 168" fill="none" stroke="#C45D3E" strokeWidth="0.8" opacity="0.3"/>
        <path d="M175 165 Q165 167 155 172" fill="none" stroke="#D97706" strokeWidth="0.6" opacity="0.25"/>
        <circle cx="182" cy="148" r="1.5" fill="#FBBF24" className="anim-ember-1"/>
        <circle cx="188" cy="162" r="1" fill="#F97316" className="anim-ember-3"/>
      </g>
    </g>
  );
}

function AccessoryWings() {
  return (
    <g>
      {/* Left wing */}
      <g className="anim-wing-l">
        <path d="M55 168 Q22 132 12 155 Q8 172 32 184 Q18 160 42 168" fill="#E0E0FF" opacity="0.7"/>
        <path d="M55 172 Q30 145 20 163 Q16 178 38 188" fill="#C8C8F0" opacity="0.5"/>
        <path d="M55 176 Q38 155 28 170 Q25 182 44 190" fill="#D8D8FF" opacity="0.35"/>
        <path d="M18 158 Q28 162 38 170" fill="none" stroke="#A0A0D0" strokeWidth="0.8" opacity="0.4"/>
        <path d="M22 168 Q32 170 42 176" fill="none" stroke="#B0B0E0" strokeWidth="0.6" opacity="0.3"/>
        <path d="M16 148 Q24 152 32 160" fill="none" stroke="#9090C0" strokeWidth="0.5" opacity="0.3"/>
        <circle cx="20" cy="150" r="1" fill="white" className="anim-sparkle-1"/>
        <circle cx="15" cy="165" r="0.8" fill="white" className="anim-sparkle-2"/>
      </g>
      {/* Right wing */}
      <g className="anim-wing-r">
        <path d="M145 168 Q178 132 188 155 Q192 172 168 184 Q182 160 158 168" fill="#E0E0FF" opacity="0.7"/>
        <path d="M145 172 Q170 145 180 163 Q184 178 162 188" fill="#C8C8F0" opacity="0.5"/>
        <path d="M145 176 Q162 155 172 170 Q175 182 156 190" fill="#D8D8FF" opacity="0.35"/>
        <path d="M182 158 Q172 162 162 170" fill="none" stroke="#A0A0D0" strokeWidth="0.8" opacity="0.4"/>
        <path d="M178 168 Q168 170 158 176" fill="none" stroke="#B0B0E0" strokeWidth="0.6" opacity="0.3"/>
        <path d="M184 148 Q176 152 168 160" fill="none" stroke="#9090C0" strokeWidth="0.5" opacity="0.3"/>
        <circle cx="180" cy="150" r="1" fill="white" className="anim-sparkle-2"/>
        <circle cx="185" cy="165" r="0.8" fill="white" className="anim-sparkle-3"/>
      </g>
    </g>
  );
}

// ── Premium Accessory SVGs ──

function AccessoryDemonWings() {
  return (
    <g>
      {/* Left wing */}
      <g className="anim-wing-l">
        {/* Membrane */}
        <path d="M50 130 Q22 108 12 85 Q16 98 28 104 Q20 82 22 65 Q28 88 38 98 Q32 76 36 60 Q40 82 46 102" fill="#3A0000" opacity="0.8"/>
        <path d="M50 130 Q26 112 16 90" fill="none" stroke="#660000" strokeWidth="1.5" opacity="0.5"/>
        {/* Bones */}
        <path d="M50 130 Q30 105 18 80" fill="none" stroke="#5A0000" strokeWidth="2" opacity="0.6"/>
        <path d="M46 120 Q32 98 26 72" fill="none" stroke="#4A0000" strokeWidth="1.5" opacity="0.5"/>
        {/* Membrane veins */}
        <path d="M35 95 Q38 100 42 108" fill="none" stroke="#660000" strokeWidth="0.6" opacity="0.4"/>
        <path d="M25 80 Q30 90 36 102" fill="none" stroke="#660000" strokeWidth="0.5" opacity="0.3"/>
        <path d="M30 88 Q34 94 38 104" fill="none" stroke="#550000" strokeWidth="0.4" opacity="0.25"/>
        {/* Wing claw at tip */}
        <path d="M12 85 Q10 80 8 82 Q11 84 12 85" fill="#5A0000" opacity="0.7"/>
        {/* Holes/tears */}
        <circle cx="30" cy="95" r="2" fill="#1A0000" opacity="0.3"/>
        <circle cx="24" cy="78" r="1.2" fill="#1A0000" opacity="0.2"/>
        {/* Ember glow */}
        <circle cx="12" cy="85" r="2" fill="#FF4500" className="anim-ember-1"/>
      </g>
      {/* Right wing */}
      <g className="anim-wing-r">
        {/* Membrane */}
        <path d="M150 130 Q178 108 188 85 Q184 98 172 104 Q180 82 178 65 Q172 88 162 98 Q168 76 164 60 Q160 82 154 102" fill="#3A0000" opacity="0.8"/>
        <path d="M150 130 Q174 112 184 90" fill="none" stroke="#660000" strokeWidth="1.5" opacity="0.5"/>
        {/* Bones */}
        <path d="M150 130 Q170 105 182 80" fill="none" stroke="#5A0000" strokeWidth="2" opacity="0.6"/>
        <path d="M154 120 Q168 98 174 72" fill="none" stroke="#4A0000" strokeWidth="1.5" opacity="0.5"/>
        {/* Membrane veins */}
        <path d="M165 95 Q162 100 158 108" fill="none" stroke="#660000" strokeWidth="0.6" opacity="0.4"/>
        <path d="M175 80 Q170 90 164 102" fill="none" stroke="#660000" strokeWidth="0.5" opacity="0.3"/>
        <path d="M170 88 Q166 94 162 104" fill="none" stroke="#550000" strokeWidth="0.4" opacity="0.25"/>
        {/* Wing claw at tip */}
        <path d="M188 85 Q190 80 192 82 Q189 84 188 85" fill="#5A0000" opacity="0.7"/>
        {/* Holes */}
        <circle cx="170" cy="95" r="2" fill="#1A0000" opacity="0.3"/>
        <circle cx="176" cy="78" r="1.2" fill="#1A0000" opacity="0.2"/>
        {/* Ember glow */}
        <circle cx="188" cy="85" r="2" fill="#FF4500" className="anim-ember-2"/>
      </g>
    </g>
  );
}

function AccessoryKatana() {
  return (
    <g>
      {/* Blade shadow */}
      <line x1="133" y1="103" x2="173" y2="56" stroke="#000" strokeWidth="3" opacity="0.06"/>
      {/* Blade - back edge */}
      <line x1="132" y1="102" x2="172" y2="55" stroke="#808088" strokeWidth="4" strokeLinecap="round"/>
      {/* Blade - face */}
      <line x1="132" y1="102" x2="172" y2="55" stroke="#C0C0C8" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Blade edge gleam */}
      <line x1="133" y1="101" x2="172" y2="56" stroke="#E8E8F0" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
      {/* Hamon line (temper pattern) - wavy */}
      <path d="M138 98 Q141 95 143 92 Q146 89 148 86 Q151 83 154 80 Q157 77 160 74 Q163 70 166 66 Q169 62 171 58" fill="none" stroke="#D0D0D8" strokeWidth="0.8" opacity="0.4"/>
      <path d="M139 97 Q143 94 146 90 Q150 86 153 82 Q157 78 161 73 Q165 69 168 64" fill="none" stroke="#E0E0E8" strokeWidth="0.4" opacity="0.25"/>
      {/* Blade tip - kissaki */}
      <path d="M170 58 L175 50 L172 55" fill="#E0E0E8" stroke="#A0A0A8" strokeWidth="0.5"/>
      <path d="M171 56 L173 52" stroke="white" strokeWidth="0.3" opacity="0.4"/>
      {/* Habaki (blade collar) */}
      <rect x="129" y="100" width="6" height="4" rx="1" fill="#D4A853" transform="rotate(-40 132 102)" opacity="0.7"/>
      {/* Tsuba (hand guard) */}
      <ellipse cx="132" cy="104" rx="8" ry="4" fill="#2D2D2D" transform="rotate(-40 132 104)"/>
      <ellipse cx="132" cy="104" rx="6" ry="3" fill="#3D3D3D" transform="rotate(-40 132 104)" opacity="0.5"/>
      {/* Tsuba pattern - dragon swirl */}
      <circle cx="132" cy="104" r="2" fill="none" stroke="#D4A853" strokeWidth="0.5" opacity="0.5"/>
      <path d="M130 103 Q132 101 134 103" fill="none" stroke="#D4A853" strokeWidth="0.4" opacity="0.4"/>
      <path d="M130 105 Q132 107 134 105" fill="none" stroke="#D4A853" strokeWidth="0.4" opacity="0.4"/>
      {/* Tsuka (handle) - wrapped */}
      <line x1="126" y1="110" x2="116" y2="125" stroke="#2D2D2D" strokeWidth="5" strokeLinecap="round"/>
      <line x1="126" y1="110" x2="116" y2="125" stroke="#4A2E1A" strokeWidth="4" strokeLinecap="round"/>
      {/* Handle wrapping diamonds (ito) */}
      <g stroke="#D4A853" strokeWidth="0.6" opacity="0.6" fill="none">
        <path d="M124 112 L122 115 L120 112 L122 109Z"/>
        <path d="M121 116 L119 119 L117 116 L119 113Z"/>
        <path d="M118 120 L116 123 L114 120 L116 117Z"/>
      </g>
      {/* Menuki (handle ornament) */}
      <ellipse cx="121" cy="116" rx="1.5" ry="1" fill="#D4A853" transform="rotate(-40 121 116)" opacity="0.5"/>
      {/* Kashira (pommel cap) */}
      <ellipse cx="115" cy="126" rx="3.5" ry="2" fill="#D4A853" transform="rotate(-40 115 126)"/>
      <ellipse cx="115" cy="126" rx="2" ry="1.2" fill="#E8C860" transform="rotate(-40 115 126)" opacity="0.5"/>
      {/* Kashira detail */}
      <ellipse cx="114.5" cy="125.5" rx="1" ry="0.6" fill="#F0C060" transform="rotate(-40 114.5 125.5)" opacity="0.3"/>
    </g>
  );
}

function AccessoryTrident() {
  return (
    <g>
      {/* Shaft - held at right hand y~115, extends down to ~145 */}
      <line x1="155" y1="145" x2="155" y2="68" stroke="#6B4226" strokeWidth="5" strokeLinecap="round"/>
      <line x1="155" y1="145" x2="155" y2="68" stroke="#8B5E3C" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      {/* Shaft bands */}
      <rect x="151" y="120" width="8" height="4" rx="1" fill="#D4A853"/>
      <rect x="151" y="135" width="8" height="4" rx="1" fill="#D4A853"/>
      {/* Center prong */}
      <line x1="155" y1="68" x2="155" y2="40" stroke="#FFD700" strokeWidth="4" strokeLinecap="round"/>
      <line x1="155" y1="68" x2="155" y2="40" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M152 44 L155 34 L158 44" fill="#FFD700"/>
      {/* Left prong */}
      <path d="M148 70 Q142 60 140 47" stroke="#FFD700" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M138 50 L140 40 L142 50" fill="#FFD700"/>
      {/* Right prong */}
      <path d="M162 70 Q168 60 170 47" stroke="#FFD700" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M168 50 L170 40 L172 50" fill="#FFD700"/>
      {/* Cross guard */}
      <rect x="144" y="66" width="22" height="5" rx="2" fill="#B8860B"/>
      <rect x="146" y="67" width="18" height="3" rx="1" fill="#D4A853" opacity="0.4"/>
      {/* Prong highlights */}
      <line x1="155" y1="42" x2="155" y2="63" stroke="#FEF9C3" strokeWidth="0.8" opacity="0.3"/>
      {/* Gem on shaft */}
      <circle cx="155" cy="72" r="3" fill="#4A7FC4" stroke="#2C3E6B" strokeWidth="0.8"/>
      <circle cx="154" cy="71" r="1" fill="white" opacity="0.3"/>
    </g>
  );
}

function AccessoryMagicWand() {
  return (
    <g>
      {/* Wand shaft - held at right hand y~115 */}
      <line x1="132" y1="122" x2="155" y2="62" stroke="#4A2E1A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="132" y1="122" x2="155" y2="62" stroke="#6B4226" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
      {/* Shaft spiral detail */}
      <path d="M134 118 Q137 112 135 106 Q133 100 136 94 Q139 88 137 82 Q135 76 138 72" fill="none" stroke="#8B5E3C" strokeWidth="0.8" opacity="0.4"/>
      {/* Handle grip */}
      <line x1="130" y1="126" x2="132" y2="122" stroke="#D4A853" strokeWidth="6" strokeLinecap="round"/>
      <line x1="130" y1="126" x2="132" y2="122" stroke="#E8C860" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
      {/* Star ornament at tip - pulsing glow */}
      <circle cx="156" cy="60" r="8" fill="#9370DB" className="anim-pulse-soft"/>
      <circle cx="156" cy="60" r="6" fill="#9370DB"/>
      <circle cx="156" cy="60" r="4.5" fill="#A78BFA"/>
      <circle cx="156" cy="60" r="3" fill="#C4B5FD" opacity="0.7"/>
      <circle cx="154" cy="58" r="1.5" fill="white" opacity="0.4"/>
      {/* Magic sparkles - animated */}
      <circle cx="162" cy="52" r="2.5" fill="#FFD700" className="anim-sparkle-1"/>
      <circle cx="162" cy="52" r="1" fill="#FEF9C3" className="anim-sparkle-1"/>
      <circle cx="148" cy="54" r="2" fill="#FFD700" className="anim-sparkle-2"/>
      <circle cx="148" cy="54" r="0.8" fill="#FEF9C3" className="anim-sparkle-2"/>
      <circle cx="164" cy="62" r="1.5" fill="#FFD700" className="anim-sparkle-3"/>
      <circle cx="152" cy="48" r="1" fill="#FDE68A" className="anim-sparkle-1"/>
      {/* Trailing sparkle particles */}
      <circle cx="160" cy="46" r="0.8" fill="white" className="anim-sparkle-3"/>
      <circle cx="166" cy="56" r="0.6" fill="white" className="anim-sparkle-2"/>
      <circle cx="146" cy="50" r="0.7" fill="white" className="anim-sparkle-1"/>
    </g>
  );
}

function AccessoryDragonPet() {
  return (
    <g>
      {/* Tail */}
      <path d="M145 172 Q136 180 130 176 Q126 172 128 168" fill="none" stroke="#1B7A1B" strokeWidth="3" strokeLinecap="round"/>
      <path d="M128 168 L125 164 L131 168" fill="#228B22"/>
      {/* Body */}
      <ellipse cx="155" cy="168" rx="14" ry="11" fill="#228B22"/>
      <ellipse cx="155" cy="168" rx="12" ry="9" fill="#2E8B57" opacity="0.5"/>
      {/* Belly */}
      <ellipse cx="155" cy="172" rx="8" ry="5" fill="#90EE90" opacity="0.3"/>
      {/* Back spines */}
      <path d="M146 160 L148 155 L150 160" fill="#1B7A1B"/>
      <path d="M152 158 L154 152 L156 158" fill="#1B7A1B"/>
      <path d="M158 160 L160 155 L162 160" fill="#1B7A1B"/>
      {/* Head */}
      <ellipse cx="162" cy="156" rx="9" ry="8" fill="#2E8B57"/>
      <ellipse cx="162" cy="156" rx="7" ry="6" fill="#32A060" opacity="0.4"/>
      {/* Eyes */}
      <ellipse cx="158" cy="154" rx="2.5" ry="3" fill="#1A1A1A"/>
      <ellipse cx="158" cy="154" rx="2" ry="2.5" fill="#FFD700"/>
      <ellipse cx="158" cy="154" rx="1" ry="2.5" fill="#1A1A1A"/>
      <circle cx="157" cy="153" r="0.5" fill="white" opacity="0.5"/>
      <ellipse cx="165" cy="154" rx="2.5" ry="3" fill="#1A1A1A"/>
      <ellipse cx="165" cy="154" rx="2" ry="2.5" fill="#FFD700"/>
      <ellipse cx="165" cy="154" rx="1" ry="2.5" fill="#1A1A1A"/>
      <circle cx="164" cy="153" r="0.5" fill="white" opacity="0.5"/>
      {/* Snout */}
      <ellipse cx="166" cy="158" rx="4" ry="2.5" fill="#2E8B57"/>
      <circle cx="164" cy="158" r="0.8" fill="#1A5A1A"/>
      <circle cx="168" cy="158" r="0.8" fill="#1A5A1A"/>
      {/* Tiny horns */}
      <path d="M155 148 Q153 143 155 140" fill="none" stroke="#228B22" strokeWidth="2" strokeLinecap="round"/>
      <path d="M169 148 Q171 143 169 140" fill="none" stroke="#228B22" strokeWidth="2" strokeLinecap="round"/>
      {/* Small wings */}
      <path d="M148 162 Q138 152 140 145 Q144 152 150 158" fill="#1B7A1B" opacity="0.6"/>
      <path d="M148 163 Q140 155 142 150" fill="none" stroke="#155A15" strokeWidth="0.5" opacity="0.4"/>
      {/* Fire breath - animated */}
      <g className="anim-dragon-breath">
        <path d="M170 157 Q176 155 180 158 Q178 160 175 159" fill="#F97316" opacity="0.5"/>
        <path d="M172 157 Q176 156 178 158" fill="#FBBF24" opacity="0.4"/>
      </g>
    </g>
  );
}

function AccessoryFloatingOrbs() {
  return (
    <g>
      {/* Red orb - top left */}
      <g className="anim-orbit-1">
        <circle cx="55" cy="100" r="8" fill="#FF4444" opacity="0.15" className="anim-pulse"/>
        <circle cx="55" cy="100" r="6" fill="#FF4444" opacity="0.6"/>
        <circle cx="55" cy="100" r="4.5" fill="#FF6666" opacity="0.5"/>
        <circle cx="55" cy="100" r="2.5" fill="#FF8888" opacity="0.6"/>
        <circle cx="53" cy="98" r="1.5" fill="white" opacity="0.3"/>
      </g>
      {/* Blue orb - top right */}
      <g className="anim-orbit-2">
        <circle cx="145" cy="95" r="8" fill="#4444FF" opacity="0.15" className="anim-pulse-delayed"/>
        <circle cx="145" cy="95" r="6" fill="#4444FF" opacity="0.6"/>
        <circle cx="145" cy="95" r="4.5" fill="#6666FF" opacity="0.5"/>
        <circle cx="145" cy="95" r="2.5" fill="#8888FF" opacity="0.6"/>
        <circle cx="143" cy="93" r="1.5" fill="white" opacity="0.3"/>
      </g>
      {/* Green orb - mid left */}
      <g className="anim-float">
        <circle cx="48" cy="142" r="7" fill="#44FF44" opacity="0.12" className="anim-pulse"/>
        <circle cx="48" cy="142" r="5" fill="#44FF44" opacity="0.6"/>
        <circle cx="48" cy="142" r="3.5" fill="#66FF66" opacity="0.5"/>
        <circle cx="48" cy="142" r="2" fill="#88FF88" opacity="0.6"/>
        <circle cx="46" cy="140" r="1.2" fill="white" opacity="0.3"/>
      </g>
      {/* Gold orb - mid right */}
      <g className="anim-float-delayed">
        <circle cx="152" cy="145" r="7" fill="#FFD700" opacity="0.12" className="anim-pulse-delayed"/>
        <circle cx="152" cy="145" r="5" fill="#FFD700" opacity="0.6"/>
        <circle cx="152" cy="145" r="3.5" fill="#FFE44D" opacity="0.5"/>
        <circle cx="152" cy="145" r="2" fill="#FFF088" opacity="0.6"/>
        <circle cx="150" cy="143" r="1.2" fill="white" opacity="0.3"/>
      </g>
      {/* Energy arcs between orbs */}
      <path d="M55 106 Q50 120 48 136" fill="none" stroke="#44FF44" strokeWidth="0.5" opacity="0.2" strokeDasharray="2,2" className="anim-shimmer"/>
      <path d="M145 101 Q150 120 152 139" fill="none" stroke="#FFD700" strokeWidth="0.5" opacity="0.2" strokeDasharray="2,2" className="anim-shimmer-delayed"/>
      {/* Tiny orbit particles */}
      <circle cx="62" cy="98" r="0.8" fill="#FF8888" className="anim-sparkle-1"/>
      <circle cx="138" cy="92" r="0.8" fill="#8888FF" className="anim-sparkle-2"/>
      <circle cx="42" cy="138" r="0.7" fill="#88FF88" className="anim-sparkle-3"/>
      <circle cx="158" cy="148" r="0.7" fill="#FFE44D" className="anim-sparkle-1"/>
    </g>
  );
}

function AccessoryFlamingSword() {
  return (
    <g>
      {/* Blade back - from crossguard up */}
      <line x1="138" y1="108" x2="158" y2="48" stroke="#707078" strokeWidth="5"/>
      {/* Blade face */}
      <line x1="138" y1="108" x2="158" y2="48" stroke="#A8A8B0" strokeWidth="3.5"/>
      {/* Blade edge */}
      <line x1="139" y1="107" x2="159" y2="49" stroke="#D0D0D8" strokeWidth="1.5" opacity="0.6"/>
      {/* Fuller groove */}
      <line x1="140" y1="104" x2="157" y2="54" stroke="#606068" strokeWidth="1" opacity="0.4"/>
      {/* Blade tip */}
      <path d="M157 50 L161 42 L159 48" fill="#C0C0C8" stroke="#A0A0A8" strokeWidth="0.5"/>
      {/* Crossguard */}
      <rect x="126" y="106" width="18" height="6" rx="2" fill="#8B6914"/>
      <rect x="128" y="107" width="14" height="4" rx="1" fill="#B8860B" opacity="0.4"/>
      {/* Handle - held at right hand y~115 */}
      <line x1="134" y1="112" x2="130" y2="128" stroke="#4A2E1A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="134" y1="112" x2="130" y2="128" stroke="#6B4226" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
      {/* Handle wrapping */}
      <g stroke="#D4A853" strokeWidth="0.6" opacity="0.5">
        <line x1="133" y1="116" x2="137" y2="116"/>
        <line x1="132" y1="120" x2="136" y2="120"/>
        <line x1="131" y1="124" x2="135" y2="124"/>
      </g>
      {/* Pommel */}
      <circle cx="129" cy="130" r="3" fill="#8B6914"/>
      <circle cx="129" cy="130" r="2" fill="#D4A853" opacity="0.5"/>
      {/* Fire effect - multilayer animated */}
      <g className="anim-flicker">
        <path d="M155 52 Q165 36 161 16 Q157 30 153 34 Q161 20 157 5" fill="#FF4500" opacity="0.6"/>
        <path d="M153 54 Q161 38 157 23 Q154 33 151 36" fill="#FBBF24" opacity="0.5"/>
      </g>
      <g className="anim-flicker-delayed">
        <path d="M157 48 Q167 30 163 10 Q159 24 155 28 Q163 14 159 0" fill="#FF6B00" opacity="0.45"/>
        <path d="M156 50 Q163 36 160 18 Q157 28 154 32" fill="#FDE68A" opacity="0.3"/>
      </g>
      {/* Ember particles - rising */}
      <circle cx="167" cy="20" r="1.5" fill="#FF4500" className="anim-ember-1"/>
      <circle cx="152" cy="8" r="1" fill="#FBBF24" className="anim-ember-2"/>
      <circle cx="163" cy="3" r="1.2" fill="#FF6B00" className="anim-ember-3"/>
    </g>
  );
}

function AccessoryGalaxyCloak() {
  return (
    <g>
      {/* Cloak outer layer - flows behind and wider */}
      <path d="M62 152 Q50 180 42 220 Q45 240 55 252 Q78 260 100 262 Q122 260 145 252 Q155 240 158 220 Q150 180 138 152" fill="#0F0F2E" opacity="0.85"/>
      {/* Cloak inner layer */}
      <path d="M65 155 Q54 182 46 218 Q50 238 58 250 Q80 256 100 258 Q120 256 142 250 Q150 238 154 218 Q146 182 135 155" fill="#1A1A4E" opacity="0.6"/>
      {/* Cloak flowing bottom edge */}
      <path d="M42 220 Q55 225 62 218 Q72 225 82 218 Q92 225 100 218 Q108 225 118 218 Q128 225 138 218 Q145 225 158 220" fill="none" stroke="#2D2D6B" strokeWidth="1.5" opacity="0.3"/>
      {/* Nebula swirls */}
      <path d="M58 185 Q72 176 86 188 Q80 200 66 196" fill="#4F46E5" opacity="0.15"/>
      <path d="M112 195 Q126 186 140 198 Q134 210 120 206" fill="#7C3AED" opacity="0.12"/>
      <path d="M80 215 Q94 208 108 220 Q102 232 88 228" fill="#6366F1" opacity="0.1"/>
      <path d="M95 170 Q108 164 118 175 Q112 184 100 180" fill="#312E81" opacity="0.1"/>
      {/* Stars - bright with glow - twinkling */}
      <circle cx="62" cy="188" r="2" fill="white" className="anim-galaxy-1"/>
      <circle cx="62" cy="188" r="0.8" fill="white"/>
      <circle cx="92" cy="208" r="2" fill="white" className="anim-galaxy-2"/>
      <circle cx="92" cy="208" r="0.8" fill="white"/>
      <circle cx="135" cy="204" r="1.8" fill="white" className="anim-galaxy-3"/>
      <circle cx="135" cy="204" r="0.7" fill="white"/>
      <circle cx="108" cy="178" r="1.5" fill="white" className="anim-galaxy-1"/>
      <circle cx="108" cy="178" r="0.6" fill="white"/>
      {/* Stars - medium colored */}
      <circle cx="75" cy="172" r="1.2" fill="#FFD700" className="anim-galaxy-2"/>
      <circle cx="128" cy="220" r="1" fill="#7B68EE" className="anim-galaxy-3"/>
      <circle cx="118" cy="170" r="1" fill="#87CEEB" className="anim-galaxy-1"/>
      <circle cx="100" cy="232" r="1.2" fill="white" className="anim-galaxy-2"/>
      <circle cx="56" cy="210" r="1" fill="#A78BFA" className="anim-galaxy-3"/>
      <circle cx="145" cy="228" r="1" fill="#87CEEB" className="anim-galaxy-1"/>
      {/* Stars - small */}
      <circle cx="68" cy="200" r="0.7" fill="white" className="anim-sparkle-1"/>
      <circle cx="140" cy="195" r="0.7" fill="white" className="anim-sparkle-2"/>
      <circle cx="80" cy="238" r="0.6" fill="white" className="anim-sparkle-3"/>
      <circle cx="120" cy="240" r="0.8" fill="#C4B5FD" className="anim-sparkle-1"/>
      <circle cx="52" cy="230" r="0.5" fill="white" className="anim-sparkle-2"/>
      <circle cx="148" cy="238" r="0.6" fill="white" opacity="0.3"/>
      {/* Shooting star */}
      <line x1="110" y1="185" x2="102" y2="190" stroke="white" strokeWidth="0.7" opacity="0.4"/>
      <circle cx="110" cy="185" r="1.2" fill="white" opacity="0.6"/>
      {/* Constellation lines */}
      <g stroke="white" strokeWidth="0.3" opacity="0.12">
        <line x1="62" y1="188" x2="75" y2="172"/>
        <line x1="92" y1="208" x2="108" y2="178"/>
        <line x1="108" y1="178" x2="135" y2="204"/>
      </g>
    </g>
  );
}

function AccessoryRoyalScepter() {
  return (
    <g>
      {/* Shaft */}
      <defs>
        <linearGradient id="scepterGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#8B6914"/>
          <stop offset="100%" stopColor="#FFD700"/>
        </linearGradient>
      </defs>
      <line x1="150" y1="140" x2="150" y2="68" stroke="url(#scepterGrad)" strokeWidth="6" strokeLinecap="round"/>
      <line x1="150" y1="140" x2="150" y2="68" stroke="#E8C860" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
      {/* Shaft filigree bands */}
      <rect x="146" y="120" width="8" height="4" rx="1" fill="#B8860B"/>
      <rect x="147" y="121" width="6" height="2" rx="0.5" fill="#E8C860" opacity="0.5"/>
      <rect x="146" y="132" width="8" height="4" rx="1" fill="#B8860B"/>
      <rect x="147" y="133" width="6" height="2" rx="0.5" fill="#E8C860" opacity="0.5"/>
      {/* Bottom finial */}
      <ellipse cx="150" cy="142" rx="5" ry="3" fill="#B8860B"/>
      <ellipse cx="150" cy="142" rx="3.5" ry="2" fill="#D4A853" opacity="0.5"/>
      {/* Crown ornament base */}
      <path d="M140 70 L140 64 L143 68 L146 60 L150 66 L154 60 L157 68 L160 64 L160 70 Z" fill="#D4A853"/>
      <path d="M141 70 L141 65 L144 68 L147 62 L150 67 L153 62 L156 68 L159 65 L159 70 Z" fill="#E8C860" opacity="0.4"/>
      {/* Main gem setting */}
      <circle cx="150" cy="60" r="10" fill="#D4A853" stroke="#B8860B" strokeWidth="1.5"/>
      <circle cx="150" cy="60" r="8" fill="#E8C860" opacity="0.3"/>
      {/* Central ruby */}
      <circle cx="150" cy="60" r="7" fill="#E0115F"/>
      <circle cx="150" cy="60" r="5.5" fill="#FF2050" opacity="0.6"/>
      <circle cx="150" cy="60" r="3.5" fill="#FF6B81" opacity="0.5"/>
      <circle cx="148" cy="58" r="2" fill="white" opacity="0.25"/>
      {/* Gem glow */}
      <circle cx="150" cy="60" r="13" fill="#E0115F" opacity="0.08"/>
      {/* Cross on top */}
      <rect x="148" y="46" width="4" height="10" rx="1" fill="#FFD700"/>
      <rect x="145" y="50" width="10" height="3" rx="1" fill="#FFD700"/>
      {/* Side gems */}
      <circle cx="140" cy="64" r="3" fill="#4169E1" stroke="#2850A0" strokeWidth="0.8"/>
      <circle cx="139" cy="63" r="1" fill="white" opacity="0.25"/>
      <circle cx="160" cy="64" r="3" fill="#3A7D5C" stroke="#2E6A4A" strokeWidth="0.8"/>
      <circle cx="159" cy="63" r="1" fill="white" opacity="0.25"/>
      {/* Filigree scrolls near crown */}
      <path d="M138 70 Q136 74 138 78" fill="none" stroke="#D4A853" strokeWidth="1" opacity="0.5"/>
      <path d="M162 70 Q164 74 162 78" fill="none" stroke="#D4A853" strokeWidth="1" opacity="0.5"/>
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
// ── Outfit Variants ──
// ══════════════════════════════════════════════

// helper: darken/lighten hex color
function adjustColor(hex: string, amt: number) {
  const n = parseInt(hex.replace("#",""), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amt));
  const b = Math.max(0, Math.min(255, (n & 0xff) + amt));
  return `#${(r<<16|g<<8|b).toString(16).padStart(6,"0")}`;
}

function OutfitBase({ main, accent, hasCollar = true, hasButtons = true, hasPockets = false, hasBelt = true }: {
  main: string; accent: string; hasCollar?: boolean; hasButtons?: boolean; hasPockets?: boolean; hasBelt?: boolean;
}) {
  const dark = adjustColor(main, -30);
  const light = adjustColor(main, 25);
  return (
    <g>
      {/* Body base */}
      <ellipse cx="100" cy="190" rx="44" ry="48" fill={dark}/>
      <ellipse cx="100" cy="190" rx="40" ry="44" fill={main}/>
      {/* Highlight */}
      <path d="M65 175 Q70 160 85 155 Q90 165 80 185 Q72 195 65 195Z" fill={light} opacity="0.3"/>
      {/* Collar */}
      {hasCollar && <>
        <path d="M70 148 Q75 142 85 140 L85 152 Q78 154 72 155Z" fill={accent}/>
        <path d="M130 148 Q125 142 115 140 L115 152 Q122 154 128 155Z" fill={accent}/>
      </>}
      {/* Center seam */}
      <line x1="100" y1="148" x2="100" y2="210" stroke={dark} strokeWidth="0.8" opacity="0.4"/>
      {/* Buttons */}
      {hasButtons && <>
        <circle cx="100" cy="162" r="2.5" fill={accent} stroke={dark} strokeWidth="0.8"/>
        <circle cx="100" cy="175" r="2.5" fill={accent} stroke={dark} strokeWidth="0.8"/>
        <circle cx="100" cy="188" r="2.5" fill={accent} stroke={dark} strokeWidth="0.8"/>
        <circle cx="100" cy="200" r="2.5" fill={accent} stroke={dark} strokeWidth="0.8"/>
      </>}
      {/* Pockets */}
      {hasPockets && <>
        <rect x="72" y="166" width="18" height="16" rx="2" fill={accent} stroke={dark} strokeWidth="0.8"/>
        <path d="M71 166 L91 166 L91 171 Q82 173 71 171Z" fill={dark} stroke={dark} strokeWidth="0.5"/>
        <rect x="110" y="166" width="18" height="16" rx="2" fill={accent} stroke={dark} strokeWidth="0.8"/>
        <path d="M109 166 L129 166 L129 171 Q120 173 109 171Z" fill={dark} stroke={dark} strokeWidth="0.5"/>
      </>}
      {/* Belt */}
      {hasBelt && <>
        <rect x="60" y="207" width="80" height="9" rx="3" fill="#6B4226"/>
        <line x1="64" y1="209" x2="136" y2="209" stroke="#4A2E1A" strokeWidth="0.4" strokeDasharray="2,1.5" opacity="0.5"/>
        <rect x="92" y="206" width="16" height="11" rx="2" fill="#D4A853" stroke="#B8860B" strokeWidth="1"/>
        <rect x="95" y="208" width="10" height="7" rx="1" fill="#6B4226"/>
        <line x1="100" y1="207" x2="100" y2="216" stroke="#D4A853" strokeWidth="1.2"/>
      </>}
    </g>
  );
}

function OutfitTshirt() {
  return <OutfitBase main="#4A7FC4" accent="#3A6FB4" hasCollar={false} hasButtons={false} hasBelt={false} />;
}

function OutfitHoodie() {
  return (
    <g>
      <OutfitBase main="#6B7280" accent="#4B5563" hasButtons={false} hasBelt={false} />
      {/* Hood */}
      <path d="M68 148 Q72 132 85 128 Q100 125 115 128 Q128 132 132 148" fill="#4B5563"/>
      <path d="M72 148 Q76 136 88 133 Q100 130 112 133 Q124 136 128 148" fill="#6B7280"/>
      {/* Drawstrings */}
      <line x1="92" y1="148" x2="90" y2="168" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round"/>
      <line x1="108" y1="148" x2="110" y2="168" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round"/>
      {/* Kangaroo pocket */}
      <path d="M78 188 Q78 195 85 198 Q100 202 115 198 Q122 195 122 188" fill="none" stroke="#4B5563" strokeWidth="1.5"/>
    </g>
  );
}

function OutfitPolo() {
  return (
    <g>
      <OutfitBase main="#FEFCE8" accent="#EAB308" hasButtons={false} hasPockets={false} hasBelt={false} />
      {/* Polo collar */}
      <path d="M75 145 Q80 138 90 142 L90 150 Q82 150 76 150Z" fill="#EAB308"/>
      <path d="M125 145 Q120 138 110 142 L110 150 Q118 150 124 150Z" fill="#EAB308"/>
      {/* 2-button placket */}
      <rect x="97" y="148" width="6" height="22" rx="1" fill="#F3F4F6"/>
      <circle cx="100" cy="155" r="1.5" fill="#EAB308"/>
      <circle cx="100" cy="164" r="1.5" fill="#EAB308"/>
    </g>
  );
}

function OutfitSweater() {
  return (
    <g>
      <OutfitBase main="#7C3AED" accent="#6D28D9" hasCollar={false} hasButtons={false} hasBelt={false} />
      {/* Ribbed texture */}
      <g stroke="#6D28D9" strokeWidth="0.6" opacity="0.3">
        <line x1="65" y1="160" x2="135" y2="160"/><line x1="64" y1="166" x2="136" y2="166"/>
        <line x1="63" y1="172" x2="137" y2="172"/><line x1="62" y1="178" x2="138" y2="178"/>
        <line x1="62" y1="184" x2="138" y2="184"/><line x1="63" y1="190" x2="137" y2="190"/>
        <line x1="64" y1="196" x2="136" y2="196"/><line x1="65" y1="202" x2="135" y2="202"/>
      </g>
      {/* Crew neck */}
      <ellipse cx="100" cy="147" rx="18" ry="6" fill="#6D28D9"/>
      <ellipse cx="100" cy="146" rx="15" ry="4" fill="#7C3AED"/>
    </g>
  );
}

function OutfitVest() {
  return (
    <g>
      <OutfitBase main="#F97316" accent="#EA580C" hasButtons={false} hasBelt={false} />
      {/* Vest front panels */}
      <path d="M65 150 L65 210 Q80 218 100 220 L100 148 L85 140 Q72 142 65 150Z" fill="#EA580C"/>
      <path d="M135 150 L135 210 Q120 218 100 220 L100 148 L115 140 Q128 142 135 150Z" fill="#EA580C"/>
      {/* Zipper */}
      <line x1="100" y1="148" x2="100" y2="218" stroke="#D4A853" strokeWidth="2"/>
      <rect x="97" y="155" width="6" height="5" rx="1" fill="#D4A853"/>
    </g>
  );
}

function OutfitLeatherJacket() {
  return (
    <g>
      <OutfitBase main="#2D2D2D" accent="#1A1A1A" hasCollar={true} hasButtons={false} hasPockets={true} hasBelt={true} />
      {/* Lapels */}
      <path d="M72 148 L85 140 L100 160 L88 158Z" fill="#3D3D3D"/>
      <path d="M128 148 L115 140 L100 160 L112 158Z" fill="#3D3D3D"/>
      {/* Diagonal zipper */}
      <line x1="100" y1="148" x2="80" y2="207" stroke="#C0C0C0" strokeWidth="1.5"/>
      {/* Studs */}
      <circle cx="75" cy="152" r="1" fill="#C0C0C0"/><circle cx="125" cy="152" r="1" fill="#C0C0C0"/>
    </g>
  );
}

function OutfitLabCoat() {
  return (
    <g>
      <OutfitBase main="#F8FAFC" accent="#E2E8F0" hasCollar={true} hasButtons={true} hasPockets={true} hasBelt={false} />
      {/* Lapels */}
      <path d="M72 148 L85 140 L88 155 L76 155Z" fill="#E2E8F0"/>
      <path d="M128 148 L115 140 L112 155 L124 155Z" fill="#E2E8F0"/>
      {/* Pen in pocket */}
      <rect x="122" y="162" width="2" height="12" rx="0.5" fill="#3B82F6"/>
      <rect x="121.5" y="163" width="3" height="2" rx="0.5" fill="#D4A853"/>
    </g>
  );
}

function OutfitDenimJacket() {
  return (
    <g>
      <OutfitBase main="#4A6FA5" accent="#3B5E94" hasCollar={true} hasButtons={true} hasPockets={true} hasBelt={false} />
      {/* Denim stitching */}
      <line x1="72" y1="150" x2="72" y2="215" stroke="#6B8FC4" strokeWidth="0.5" strokeDasharray="2,1.5" opacity="0.5"/>
      <line x1="128" y1="150" x2="128" y2="215" stroke="#6B8FC4" strokeWidth="0.5" strokeDasharray="2,1.5" opacity="0.5"/>
    </g>
  );
}

function OutfitSuit() {
  return (
    <g>
      <OutfitBase main="#1E293B" accent="#0F172A" hasCollar={false} hasButtons={true} hasPockets={false} hasBelt={false} />
      {/* Suit lapels */}
      <path d="M70 148 L88 140 L95 165 L80 160Z" fill="#334155"/>
      <path d="M130 148 L112 140 L105 165 L120 160Z" fill="#334155"/>
      {/* Shirt collar & tie */}
      <path d="M88 140 L100 148 L112 140 L108 145 L100 150 L92 145Z" fill="white"/>
      <path d="M97 148 L100 150 L103 148 L102 180 Q100 183 98 180Z" fill="#DC2626"/>
      {/* Tie knot */}
      <circle cx="100" cy="150" r="2.5" fill="#DC2626"/>
      {/* Breast pocket square */}
      <path d="M74 164 L78 160 L82 164Z" fill="white" opacity="0.8"/>
    </g>
  );
}

function OutfitKimono() {
  return (
    <g>
      {/* Base */}
      <ellipse cx="100" cy="190" rx="44" ry="48" fill="#5B1A1A"/>
      <ellipse cx="100" cy="190" rx="40" ry="44" fill="#8B2252"/>
      {/* Wrap-over front */}
      <path d="M100 145 L65 160 L60 215 L100 225 L140 215 L135 160Z" fill="#8B2252"/>
      <path d="M100 145 L70 158 L68 210 L100 218" fill="#9B3262"/>
      {/* Obi belt */}
      <rect x="58" y="190" width="84" height="18" rx="3" fill="#D4A853"/>
      <rect x="90" y="188" width="20" height="22" rx="3" fill="#B8860B"/>
      {/* Flower pattern */}
      <circle cx="78" cy="170" r="3" fill="#EC4899" opacity="0.5"/>
      <circle cx="120" cy="175" r="2.5" fill="#EC4899" opacity="0.4"/>
      <circle cx="85" cy="200" r="2" fill="#EC4899" opacity="0.3"/>
    </g>
  );
}

function OutfitSportJersey() {
  return (
    <g>
      <OutfitBase main="#DC2626" accent="#B91C1C" hasCollar={false} hasButtons={false} hasBelt={false} />
      {/* V-neck */}
      <path d="M88 144 L100 158 L112 144" fill="none" stroke="white" strokeWidth="2"/>
      {/* Number */}
      <text x="100" y="190" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="sans-serif" opacity="0.9">7</text>
      {/* Stripe on shoulders */}
      <path d="M62 155 Q62 150 70 148" fill="none" stroke="white" strokeWidth="3"/>
      <path d="M138 155 Q138 150 130 148" fill="none" stroke="white" strokeWidth="3"/>
    </g>
  );
}

function OutfitTrenchCoat() {
  return (
    <g>
      <OutfitBase main="#B89A72" accent="#9A8060" hasCollar={true} hasButtons={true} hasPockets={true} hasBelt={true} />
      {/* Double-breasted buttons */}
      <circle cx="92" cy="162" r="2" fill="#D4A853"/><circle cx="108" cy="162" r="2" fill="#D4A853"/>
      <circle cx="92" cy="178" r="2" fill="#D4A853"/><circle cx="108" cy="178" r="2" fill="#D4A853"/>
      {/* Shoulder epaulettes */}
      <rect x="58" y="150" width="12" height="5" rx="1" fill="#9A8060"/>
      <rect x="130" y="150" width="12" height="5" rx="1" fill="#9A8060"/>
    </g>
  );
}

function OutfitPirateCoat() {
  return (
    <g>
      <OutfitBase main="#4A2E1A" accent="#6B4226" hasCollar={true} hasButtons={true} hasPockets={false} hasBelt={true} />
      {/* Gold trim */}
      <path d="M70 148 L70 218" fill="none" stroke="#D4A853" strokeWidth="2"/>
      <path d="M130 148 L130 218" fill="none" stroke="#D4A853" strokeWidth="2"/>
      {/* Gold buttons */}
      <circle cx="100" cy="162" r="3" fill="#D4A853"/><circle cx="100" cy="178" r="3" fill="#D4A853"/>
      <circle cx="100" cy="194" r="3" fill="#D4A853"/>
      {/* Skull crossbones on belt */}
      <circle cx="100" cy="212" r="4" fill="#E8E8E8"/>
      <circle cx="98" cy="211" r="1" fill="#333"/><circle cx="102" cy="211" r="1" fill="#333"/>
    </g>
  );
}

function OutfitMilitary() {
  return (
    <g>
      <OutfitBase main="#556B2F" accent="#3E4F22" hasCollar={true} hasButtons={true} hasPockets={true} hasBelt={true} />
      {/* Shoulder patches */}
      <rect x="60" y="150" width="10" height="8" rx="1" fill="#3E4F22"/>
      <rect x="130" y="150" width="10" height="8" rx="1" fill="#3E4F22"/>
      {/* Medal ribbons */}
      <rect x="75" y="158" width="4" height="6" rx="0.5" fill="#DC2626"/>
      <rect x="80" y="158" width="4" height="6" rx="0.5" fill="#3B82F6"/>
      <rect x="85" y="158" width="4" height="6" rx="0.5" fill="#22C55E"/>
    </g>
  );
}

function OutfitRoyalRobe() {
  return (
    <g>
      {/* Rich purple robe */}
      <ellipse cx="100" cy="190" rx="48" ry="52" fill="#4C1D95"/>
      <ellipse cx="100" cy="190" rx="44" ry="48" fill="#6D28D9"/>
      {/* Ermine trim */}
      <path d="M60 155 Q62 150 70 148 L85 140 Q100 136 115 140 L130 148 Q138 150 140 155" fill="none" stroke="#F5F5F0" strokeWidth="8"/>
      <g fill="#1A1A1A" opacity="0.6">
        <circle cx="65" cy="153" r="1.5"/><circle cx="78" cy="148" r="1.5"/><circle cx="92" cy="144" r="1.5"/>
        <circle cx="108" cy="144" r="1.5"/><circle cx="122" cy="148" r="1.5"/><circle cx="135" cy="153" r="1.5"/>
      </g>
      {/* Gold chain */}
      <path d="M72 155 Q100 170 128 155" fill="none" stroke="#D4A853" strokeWidth="2"/>
      {/* Central gem */}
      <circle cx="100" cy="164" r="5" fill="#DC2626"/><circle cx="100" cy="164" r="3" fill="#EF4444"/>
      <circle cx="99" cy="163" r="1" fill="white" opacity="0.5"/>
      {/* Gold belt/sash */}
      <rect x="58" y="205" width="84" height="10" rx="3" fill="#D4A853"/>
      <rect x="92" y="204" width="16" height="12" rx="2" fill="#B8860B"/>
    </g>
  );
}

function OutfitSpaceSuit() {
  return (
    <g>
      {/* White suit base */}
      <ellipse cx="100" cy="190" rx="46" ry="50" fill="#D0D0D8"/>
      <ellipse cx="100" cy="190" rx="42" ry="46" fill="#E8E8F0"/>
      {/* Panel lines */}
      <line x1="100" y1="148" x2="100" y2="220" stroke="#B0B0B8" strokeWidth="1" opacity="0.5"/>
      <line x1="70" y1="170" x2="130" y2="170" stroke="#B0B0B8" strokeWidth="1" opacity="0.5"/>
      {/* Chest panel */}
      <rect x="82" y="155" width="36" height="22" rx="3" fill="#C0C0C8"/>
      <rect x="85" y="158" width="10" height="5" rx="1" fill="#3B82F6"/><rect x="97" y="158" width="10" height="5" rx="1" fill="#EF4444"/>
      <rect x="85" y="165" width="10" height="5" rx="1" fill="#22C55E"/><rect x="97" y="165" width="10" height="5" rx="1" fill="#EAB308"/>
      {/* NASA-style logo circle */}
      <circle cx="78" cy="165" r="6" fill="#1E40AF"/><circle cx="78" cy="165" r="4" fill="#3B82F6"/>
      {/* Flag patch */}
      <rect x="118" y="160" width="10" height="7" rx="1" fill="#DC2626"/>
      <rect x="118" y="160" width="5" height="4" rx="0.5" fill="#1E3A8A"/>
    </g>
  );
}

function OutfitSamuraiArmor() {
  return (
    <g>
      {/* Do (chest armor) */}
      <ellipse cx="100" cy="190" rx="46" ry="50" fill="#4A2E1A"/>
      <ellipse cx="100" cy="190" rx="42" ry="46" fill="#8B0000"/>
      {/* Laced plates (kusazuri) */}
      <g>
        <rect x="62" y="195" width="18" height="20" rx="2" fill="#6B0000" stroke="#D4A853" strokeWidth="0.5"/>
        <rect x="82" y="195" width="16" height="22" rx="2" fill="#8B0000" stroke="#D4A853" strokeWidth="0.5"/>
        <rect x="100" y="195" width="16" height="22" rx="2" fill="#6B0000" stroke="#D4A853" strokeWidth="0.5"/>
        <rect x="118" y="195" width="18" height="20" rx="2" fill="#8B0000" stroke="#D4A853" strokeWidth="0.5"/>
      </g>
      {/* Shoulder guards (sode) */}
      <path d="M55 155 Q50 160 48 172 Q50 178 55 180 L68 175 L65 152Z" fill="#8B0000" stroke="#D4A853" strokeWidth="0.8"/>
      <path d="M145 155 Q150 160 152 172 Q150 178 145 180 L132 175 L135 152Z" fill="#8B0000" stroke="#D4A853" strokeWidth="0.8"/>
      {/* Chest emblem */}
      <circle cx="100" cy="172" r="8" fill="#D4A853" opacity="0.8"/>
      <circle cx="100" cy="172" r="5" fill="#8B0000"/>
      <path d="M97 172 L100 168 L103 172 L100 176Z" fill="#D4A853"/>
    </g>
  );
}

function renderOutfit(outfitId: string) {
  switch (outfitId) {
    case "explorer_jacket": return null; // default jacket is drawn inline
    case "tshirt": return <OutfitTshirt />;
    case "hoodie": return <OutfitHoodie />;
    case "polo": return <OutfitPolo />;
    case "sweater": return <OutfitSweater />;
    case "vest": return <OutfitVest />;
    case "leather_jacket": return <OutfitLeatherJacket />;
    case "lab_coat": return <OutfitLabCoat />;
    case "denim_jacket": return <OutfitDenimJacket />;
    case "suit": return <OutfitSuit />;
    case "kimono": return <OutfitKimono />;
    case "sport_jersey": return <OutfitSportJersey />;
    case "trench_coat": return <OutfitTrenchCoat />;
    case "pirate_coat": return <OutfitPirateCoat />;
    case "military": return <OutfitMilitary />;
    case "royal_robe": return <OutfitRoyalRobe />;
    case "space_suit": return <OutfitSpaceSuit />;
    case "samurai_armor": return <OutfitSamuraiArmor />;
    default: return null;
  }
}

// ══════════════════════════════════════════════
// ── Background Variants ──
// ══════════════════════════════════════════════

function BgMeadow() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#E8F5E9"/>
      {/* Sky gradient */}
      <rect x="0" y="0" width="200" height="140" rx="12" fill="#B3E5FC" opacity="0.5"/>
      {/* Rolling hills */}
      <path d="M0 250 Q50 230 100 240 Q150 250 200 235 L200 280 L0 280Z" fill="#81C784" opacity="0.4"/>
      <path d="M0 260 Q60 245 120 255 Q170 260 200 250 L200 280 L0 280Z" fill="#66BB6A" opacity="0.3"/>
      {/* Small flowers */}
      <circle cx="30" cy="255" r="2" fill="#F48FB1" opacity="0.6"/>
      <circle cx="85" cy="248" r="2" fill="#FFD54F" opacity="0.6"/>
      <circle cx="155" cy="252" r="2" fill="#CE93D8" opacity="0.6"/>
    </g>
  );
}

function BgSky() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#87CEEB"/>
      {/* Clouds */}
      <g opacity="0.6" fill="white">
        <ellipse cx="40" cy="40" rx="20" ry="10"/><ellipse cx="55" cy="38" rx="15" ry="8"/>
        <ellipse cx="150" cy="60" rx="25" ry="12"/><ellipse cx="170" cy="58" rx="18" ry="9"/>
        <ellipse cx="90" cy="25" rx="18" ry="8"/>
      </g>
      {/* Sun */}
      <circle cx="165" cy="30" r="15" fill="#FFD54F" opacity="0.7"/>
      <circle cx="165" cy="30" r="10" fill="#FFEB3B" opacity="0.5"/>
    </g>
  );
}

function BgForest() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#2E7D32"/>
      {/* Dark canopy */}
      <rect x="0" y="0" width="200" height="100" rx="12" fill="#1B5E20" opacity="0.6"/>
      {/* Trees silhouettes */}
      <path d="M10 260 L20 180 L30 260Z" fill="#1B5E20" opacity="0.5"/>
      <path d="M40 260 L55 160 L70 260Z" fill="#2E7D32" opacity="0.4"/>
      <path d="M130 260 L145 170 L160 260Z" fill="#1B5E20" opacity="0.5"/>
      <path d="M170 260 L180 190 L190 260Z" fill="#2E7D32" opacity="0.4"/>
      {/* Light rays */}
      <path d="M80 0 L90 140 L100 0Z" fill="#FFEB3B" opacity="0.05"/>
      <path d="M110 0 L115 120 L120 0Z" fill="#FFEB3B" opacity="0.04"/>
    </g>
  );
}

function BgBeach() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#87CEEB"/>
      {/* Ocean */}
      <path d="M0 140 Q50 135 100 140 Q150 145 200 140 L200 210 Q150 205 100 210 Q50 215 0 210Z" fill="#4FC3F7" opacity="0.5"/>
      <path d="M0 160 Q60 155 120 160 Q180 165 200 158 L200 210 L0 210Z" fill="#29B6F6" opacity="0.4"/>
      {/* Sand */}
      <path d="M0 210 Q50 205 100 210 Q150 215 200 210 L200 280 L0 280Z" fill="#FFE082"/>
      {/* Waves */}
      <path d="M0 208 Q25 202 50 208 Q75 214 100 208 Q125 202 150 208 Q175 214 200 208" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5"/>
      {/* Sun */}
      <circle cx="160" cy="35" r="18" fill="#FFD54F" opacity="0.6"/>
    </g>
  );
}

function BgMountain() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#90CAF9"/>
      {/* Mountains */}
      <path d="M-10 200 L50 80 L110 200Z" fill="#78909C"/>
      <path d="M80 200 L140 60 L200 200Z" fill="#607D8B"/>
      <path d="M150 200 L190 100 L220 200Z" fill="#78909C"/>
      {/* Snow caps */}
      <path d="M35 100 L50 80 L65 100 Q50 110 35 100Z" fill="white" opacity="0.8"/>
      <path d="M125 80 L140 60 L155 80 Q140 90 125 80Z" fill="white" opacity="0.8"/>
      {/* Ground */}
      <path d="M0 230 Q100 220 200 230 L200 280 L0 280Z" fill="#4CAF50" opacity="0.3"/>
    </g>
  );
}

function BgCity() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#263238"/>
      {/* Sky gradient */}
      <rect x="0" y="0" width="200" height="120" rx="12" fill="#37474F"/>
      {/* Buildings */}
      <rect x="10" y="100" width="25" height="160" fill="#455A64"/>
      <rect x="40" y="80" width="20" height="180" fill="#546E7A"/>
      <rect x="65" y="120" width="30" height="140" fill="#37474F"/>
      <rect x="100" y="70" width="22" height="190" fill="#455A64"/>
      <rect x="128" y="90" width="28" height="170" fill="#546E7A"/>
      <rect x="162" y="110" width="25" height="150" fill="#37474F"/>
      {/* Windows */}
      <g fill="#FFEB3B" opacity="0.4">
        <rect x="14" y="110" width="4" height="4" rx="0.5"/><rect x="22" y="115" width="4" height="4" rx="0.5"/>
        <rect x="44" y="90" width="4" height="4" rx="0.5"/><rect x="50" y="100" width="4" height="4" rx="0.5"/>
        <rect x="104" y="80" width="4" height="4" rx="0.5"/><rect x="112" y="90" width="4" height="4" rx="0.5"/>
        <rect x="134" y="100" width="4" height="4" rx="0.5"/><rect x="145" y="110" width="4" height="4" rx="0.5"/>
        <rect x="166" y="120" width="4" height="4" rx="0.5"/>
      </g>
    </g>
  );
}

function BgDesert() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#FFE0B2"/>
      {/* Hot sky */}
      <rect x="0" y="0" width="200" height="150" rx="12" fill="#FF8A65" opacity="0.3"/>
      {/* Sun */}
      <circle cx="150" cy="40" r="20" fill="#FF7043" opacity="0.5"/>
      {/* Sand dunes */}
      <path d="M0 200 Q50 170 100 190 Q150 210 200 185 L200 280 L0 280Z" fill="#FFCC80" opacity="0.6"/>
      <path d="M0 220 Q70 200 130 215 Q180 225 200 210 L200 280 L0 280Z" fill="#FFB74D" opacity="0.5"/>
      {/* Cactus */}
      <rect x="40" y="200" width="6" height="30" rx="3" fill="#66BB6A" opacity="0.5"/>
      <path d="M43 210 Q50 208 50 200 Q50 196 48 198" fill="none" stroke="#66BB6A" strokeWidth="4" opacity="0.5" strokeLinecap="round"/>
    </g>
  );
}

function BgUnderwater() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#0277BD"/>
      {/* Light rays from above */}
      <path d="M60 0 L70 100 L80 0Z" fill="white" opacity="0.05"/>
      <path d="M120 0 L125 80 L130 0Z" fill="white" opacity="0.04"/>
      {/* Bubbles */}
      <g fill="white" opacity="0.2">
        <circle cx="30" cy="50" r="4"/><circle cx="35" cy="80" r="2.5"/>
        <circle cx="160" cy="40" r="3"/><circle cx="155" cy="70" r="2"/>
        <circle cx="80" cy="30" r="2.5"/><circle cx="120" cy="55" r="3"/>
      </g>
      {/* Seaweed */}
      <path d="M20 280 Q15 250 22 230 Q28 210 20 190" fill="none" stroke="#4CAF50" strokeWidth="4" opacity="0.4"/>
      <path d="M175 280 Q180 255 173 235 Q168 215 175 195" fill="none" stroke="#66BB6A" strokeWidth="3" opacity="0.35"/>
      {/* Sandy bottom */}
      <path d="M0 265 Q50 260 100 265 Q150 270 200 265 L200 280 L0 280Z" fill="#FFE082" opacity="0.3"/>
    </g>
  );
}

function BgVolcano() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#4E342E"/>
      {/* Red sky */}
      <rect x="0" y="0" width="200" height="140" rx="12" fill="#BF360C" opacity="0.4"/>
      {/* Volcano */}
      <path d="M40 260 L85 100 L115 100 L160 260Z" fill="#5D4037"/>
      {/* Crater */}
      <ellipse cx="100" cy="100" rx="18" ry="8" fill="#BF360C"/>
      {/* Lava glow */}
      <ellipse cx="100" cy="98" rx="12" ry="5" fill="#FF6D00" opacity="0.7"/>
      {/* Lava streams */}
      <path d="M95 108 Q88 160 80 220" fill="none" stroke="#FF6D00" strokeWidth="3" opacity="0.5"/>
      <path d="M105 108 Q112 170 120 230" fill="none" stroke="#FF3D00" strokeWidth="2" opacity="0.4"/>
      {/* Ground */}
      <path d="M0 250 L200 250 L200 280 L0 280Z" fill="#3E2723" opacity="0.5"/>
    </g>
  );
}

function BgAurora() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#1A237E"/>
      {/* Aurora bands */}
      <path d="M0 40 Q50 20 100 50 Q150 80 200 40 L200 100 Q150 130 100 90 Q50 60 0 100Z" fill="#00E676" opacity="0.2"/>
      <path d="M0 60 Q60 30 120 70 Q170 100 200 60 L200 110 Q160 140 110 100 Q50 65 0 110Z" fill="#69F0AE" opacity="0.15"/>
      <path d="M0 50 Q40 80 80 40 Q130 10 200 70 L200 90 Q140 30 90 60 Q40 90 0 70Z" fill="#7C4DFF" opacity="0.12"/>
      {/* Stars */}
      <g fill="white" opacity="0.5">
        <circle cx="20" cy="20" r="1"/><circle cx="60" cy="15" r="0.8"/>
        <circle cx="140" cy="25" r="1"/><circle cx="180" cy="18" r="0.8"/>
        <circle cx="100" cy="10" r="1.2"/><circle cx="30" cy="120" r="0.8"/>
        <circle cx="170" cy="110" r="1"/>
      </g>
      {/* Snow ground */}
      <path d="M0 255 Q100 248 200 255 L200 280 L0 280Z" fill="white" opacity="0.2"/>
    </g>
  );
}

function BgCherryBlossom() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#FCE4EC"/>
      {/* Sky */}
      <rect x="0" y="0" width="200" height="140" rx="12" fill="#F8BBD0" opacity="0.3"/>
      {/* Tree trunk */}
      <path d="M155 280 Q150 220 148 180 Q145 140 155 120 Q158 110 162 120 Q165 140 160 180 Q158 220 160 280Z" fill="#795548"/>
      {/* Branches */}
      <path d="M155 140 Q130 120 110 125" fill="none" stroke="#795548" strokeWidth="3"/>
      <path d="M158 160 Q135 150 115 155" fill="none" stroke="#795548" strokeWidth="2.5"/>
      {/* Blossoms clusters */}
      <g fill="#F48FB1" opacity="0.6">
        <circle cx="108" cy="122" r="6"/><circle cx="115" cy="118" r="5"/><circle cx="105" cy="128" r="4"/>
        <circle cx="112" cy="152" r="5"/><circle cx="118" cy="148" r="4"/>
        <circle cx="155" cy="115" r="5"/><circle cx="148" cy="120" r="4"/>
      </g>
      {/* Falling petals */}
      <ellipse cx="40" cy="80" rx="3" ry="1.5" fill="#F48FB1" opacity="0.4" transform="rotate(30 40 80)"/>
      <ellipse cx="80" cy="50" rx="2.5" ry="1.2" fill="#F48FB1" opacity="0.35" transform="rotate(-15 80 50)"/>
      <ellipse cx="60" cy="180" rx="2" ry="1" fill="#F48FB1" opacity="0.3" transform="rotate(45 60 180)"/>
    </g>
  );
}

function BgStorm() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#37474F"/>
      {/* Dark clouds */}
      <g fill="#263238" opacity="0.6">
        <ellipse cx="50" cy="35" rx="40" ry="20"/><ellipse cx="100" cy="30" rx="45" ry="22"/>
        <ellipse cx="150" cy="38" rx="38" ry="18"/>
      </g>
      {/* Lightning bolt */}
      <path d="M105 55 L95 85 L108 82 L92 120" fill="none" stroke="#FFEB3B" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
      {/* Rain */}
      <g stroke="#90CAF9" strokeWidth="1" opacity="0.3">
        <line x1="20" y1="60" x2="18" y2="80"/><line x1="45" y1="50" x2="43" y2="70"/>
        <line x1="70" y1="65" x2="68" y2="85"/><line x1="130" y1="55" x2="128" y2="75"/>
        <line x1="160" y1="60" x2="158" y2="80"/><line x1="180" y1="50" x2="178" y2="70"/>
      </g>
    </g>
  );
}

function BgSunset() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#4A148C"/>
      {/* Gradient sky bands */}
      <rect x="0" y="100" width="200" height="60" fill="#E65100" opacity="0.5"/>
      <rect x="0" y="80" width="200" height="40" fill="#FF6F00" opacity="0.3"/>
      <rect x="0" y="140" width="200" height="40" fill="#880E4F" opacity="0.3"/>
      {/* Sun */}
      <circle cx="100" cy="140" r="25" fill="#FF8F00" opacity="0.6"/>
      <circle cx="100" cy="140" r="18" fill="#FFB300" opacity="0.4"/>
      {/* Water reflection */}
      <rect x="0" y="160" width="200" height="120" fill="#0D47A1" opacity="0.3"/>
      <path d="M0 170 Q50 165 100 170 Q150 175 200 170" fill="none" stroke="#FF8F00" strokeWidth="1" opacity="0.3"/>
      <path d="M0 185 Q50 180 100 185 Q150 190 200 185" fill="none" stroke="#FF8F00" strokeWidth="0.8" opacity="0.2"/>
    </g>
  );
}

function BgStarfield() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#0D1B2A"/>
      {/* Stars of various sizes */}
      <g fill="white">
        <circle cx="15" cy="20" r="1.5" opacity="0.7"/><circle cx="45" cy="50" r="1" opacity="0.5"/>
        <circle cx="80" cy="15" r="1.2" opacity="0.6"/><circle cx="120" cy="35" r="0.8" opacity="0.4"/>
        <circle cx="160" cy="20" r="1.5" opacity="0.7"/><circle cx="185" cy="55" r="1" opacity="0.5"/>
        <circle cx="30" cy="90" r="0.8" opacity="0.4"/><circle cx="70" cy="70" r="1.2" opacity="0.6"/>
        <circle cx="140" cy="80" r="1" opacity="0.5"/><circle cx="175" cy="100" r="1.3" opacity="0.6"/>
        <circle cx="25" cy="130" r="0.8" opacity="0.4"/><circle cx="55" cy="110" r="1" opacity="0.5"/>
        <circle cx="100" cy="90" r="1.5" opacity="0.7"/><circle cx="155" cy="130" r="0.8" opacity="0.4"/>
      </g>
      {/* Shooting star */}
      <line x1="150" y1="30" x2="120" y2="50" stroke="white" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
    </g>
  );
}

function BgGalaxy() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#0D1B2A"/>
      {/* Nebula */}
      <ellipse cx="100" cy="100" rx="80" ry="50" fill="#4A148C" opacity="0.3"/>
      <ellipse cx="80" cy="80" rx="50" ry="35" fill="#7C4DFF" opacity="0.15"/>
      <ellipse cx="130" cy="120" rx="40" ry="30" fill="#E040FB" opacity="0.1"/>
      {/* Spiral arms hint */}
      <path d="M40 60 Q80 40 120 70 Q160 100 140 140" fill="none" stroke="#7C4DFF" strokeWidth="8" opacity="0.1"/>
      {/* Stars */}
      <g fill="white">
        <circle cx="20" cy="25" r="1" opacity="0.6"/><circle cx="50" cy="40" r="1.5" opacity="0.7" className="anim-galaxy-1"/>
        <circle cx="90" cy="20" r="1" opacity="0.5"/><circle cx="150" cy="50" r="1.2" opacity="0.6" className="anim-galaxy-2"/>
        <circle cx="175" cy="30" r="0.8" opacity="0.4"/><circle cx="30" cy="100" r="1.2" opacity="0.6" className="anim-galaxy-3"/>
        <circle cx="170" cy="90" r="1" opacity="0.5" className="anim-galaxy-1"/>
        <circle cx="60" cy="130" r="1.5" opacity="0.7"/><circle cx="140" cy="140" r="0.8" opacity="0.4"/>
      </g>
    </g>
  );
}

function BgNeonCity() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#1A1A2E"/>
      {/* Buildings */}
      <rect x="5" y="100" width="28" height="160" fill="#16213E"/>
      <rect x="38" y="75" width="22" height="185" fill="#0F3460"/>
      <rect x="65" y="110" width="30" height="150" fill="#16213E"/>
      <rect x="100" y="65" width="25" height="195" fill="#0F3460"/>
      <rect x="130" y="85" width="30" height="175" fill="#16213E"/>
      <rect x="165" y="95" width="28" height="165" fill="#0F3460"/>
      {/* Neon signs */}
      <rect x="10" y="120" width="18" height="3" rx="1" fill="#E040FB" opacity="0.8"/>
      <rect x="42" y="95" width="14" height="3" rx="1" fill="#00E5FF" opacity="0.8"/>
      <rect x="105" y="85" width="16" height="3" rx="1" fill="#FF4081" opacity="0.8"/>
      <rect x="135" y="105" width="20" height="3" rx="1" fill="#76FF03" opacity="0.8"/>
      {/* Window glow */}
      <g fill="#00E5FF" opacity="0.2">
        <rect x="12" y="130" width="4" height="5"/><rect x="20" y="140" width="4" height="5"/>
        <rect x="44" y="100" width="4" height="5"/><rect x="106" y="92" width="4" height="5"/>
        <rect x="140" y="115" width="4" height="5"/><rect x="172" y="110" width="4" height="5"/>
      </g>
      {/* Wet ground reflection */}
      <rect x="0" y="258" width="200" height="22" fill="#E040FB" opacity="0.05"/>
    </g>
  );
}

function BgEnchanted() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="280" rx="12" fill="#1B5E20"/>
      {/* Magical mist */}
      <ellipse cx="100" cy="200" rx="100" ry="60" fill="#00E676" opacity="0.08"/>
      {/* Tree trunks */}
      <rect x="15" y="80" width="10" height="180" rx="3" fill="#4E342E"/>
      <rect x="175" y="90" width="10" height="170" rx="3" fill="#3E2723"/>
      <rect x="5" y="120" width="8" height="140" rx="2" fill="#5D4037"/>
      <rect x="185" y="110" width="8" height="150" rx="2" fill="#4E342E"/>
      {/* Canopy */}
      <ellipse cx="20" cy="80" rx="25" ry="20" fill="#2E7D32" opacity="0.6"/>
      <ellipse cx="180" cy="90" rx="22" ry="18" fill="#388E3C" opacity="0.5"/>
      {/* Glowing mushrooms */}
      <circle cx="30" cy="245" r="5" fill="#76FF03" opacity="0.3"/>
      <rect x="28" y="248" width="4" height="8" rx="1" fill="#795548" opacity="0.5"/>
      <circle cx="170" cy="250" r="4" fill="#00E5FF" opacity="0.25"/>
      <rect x="168" y="252" width="4" height="7" rx="1" fill="#795548" opacity="0.5"/>
      {/* Floating sparkles */}
      <circle cx="50" cy="150" r="1.5" fill="#FFEB3B" opacity="0.4" className="anim-sparkle-1"/>
      <circle cx="100" cy="120" r="1.2" fill="#FFEB3B" opacity="0.3" className="anim-sparkle-2"/>
      <circle cx="150" cy="160" r="1.5" fill="#FFEB3B" opacity="0.4" className="anim-sparkle-3"/>
      {/* Fireflies */}
      <circle cx="70" cy="180" r="2" fill="#FFEB3B" opacity="0.5" className="anim-sparkle-2"/>
      <circle cx="130" cy="170" r="1.8" fill="#FFEB3B" opacity="0.4" className="anim-sparkle-1"/>
    </g>
  );
}

function renderBackground(bgId: string) {
  switch (bgId) {
    case "meadow": return <BgMeadow />;
    case "sky": return <BgSky />;
    case "forest_bg": return <BgForest />;
    case "beach": return <BgBeach />;
    case "mountain": return <BgMountain />;
    case "city": return <BgCity />;
    case "desert": return <BgDesert />;
    case "underwater": return <BgUnderwater />;
    case "volcano": return <BgVolcano />;
    case "aurora_bg": return <BgAurora />;
    case "cherry_blossom": return <BgCherryBlossom />;
    case "storm": return <BgStorm />;
    case "sunset": return <BgSunset />;
    case "starfield": return <BgStarfield />;
    case "galaxy_bg": return <BgGalaxy />;
    case "neon_city": return <BgNeonCity />;
    case "enchanted": return <BgEnchanted />;
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
  const hasCape = c.accessory === "cape" || c.accessory === "galaxy_cloak";
  const hasWings = c.accessory === "wings" || c.accessory === "phoenix_wings" || c.accessory === "demon_wings";
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
      {/* ── Background ── */}
      {c.background && c.background !== "none_bg" ? (
        renderBackground(c.background)
      ) : (
        <>
          {/* Default antique map background */}
          <defs>
            <radialGradient id="mapBg" cx="50%" cy="45%" r="70%">
              <stop offset="0%" stopColor="#F5ECD7"/>
              <stop offset="100%" stopColor="#E8DCC8"/>
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="200" height="280" fill="url(#mapBg)"/>
          {/* Map decorative lines */}
          <g opacity="0.08" stroke="#8B7355" fill="none">
            <path d="M0 60 Q50 55 100 60 Q150 65 200 60" strokeWidth="0.5"/>
            <path d="M0 120 Q60 115 120 120 Q160 125 200 118" strokeWidth="0.5"/>
            <path d="M0 180 Q40 175 100 180 Q160 185 200 178" strokeWidth="0.5"/>
            <path d="M50 0 Q48 70 52 140 Q50 210 48 280" strokeWidth="0.5"/>
            <path d="M150 0 Q152 70 148 140 Q150 210 152 280" strokeWidth="0.5"/>
            <path d="M15 40 Q25 35 35 42 Q40 50 32 55 Q20 52 15 40Z" strokeWidth="0.8" fill="#D4C4A8" opacity="0.5"/>
            <path d="M160 30 Q175 25 185 35 Q180 48 170 45 Q162 40 160 30Z" strokeWidth="0.8" fill="#D4C4A8" opacity="0.5"/>
            <g transform="translate(175, 25)" strokeWidth="0.6">
              <circle r="10"/>
              <line x1="0" y1="-12" x2="0" y2="12"/>
              <line x1="-12" y1="0" x2="12" y2="0"/>
              <line x1="-8" y1="-8" x2="8" y2="8" strokeWidth="0.3"/>
              <line x1="8" y1="-8" x2="-8" y2="8" strokeWidth="0.3"/>
              <text x="0" y="-14" fontSize="4" textAnchor="middle" fill="#8B7355" opacity="1">N</text>
            </g>
          </g>
          <rect x="0" y="0" width="200" height="280" fill="none" stroke="#C4B498" strokeWidth="1" opacity="0.3" rx="4"/>
        </>
      )}

      {/* ── Sandy ground ── */}
      <g>
        {/* Sand base */}
        <path d="M0 258 Q20 254 50 256 Q80 260 120 255 Q160 258 200 254 L200 280 L0 280Z" fill="#D4BC8A"/>
        {/* Sand lighter layer */}
        <path d="M0 262 Q30 258 70 261 Q110 265 150 259 Q180 262 200 258 L200 280 L0 280Z" fill="#E0CCA0" opacity="0.6"/>
        {/* Sand texture dots */}
        <g fill="#C4A870" opacity="0.4">
          <circle cx="25" cy="268" r="0.8"/>
          <circle cx="45" cy="265" r="0.6"/>
          <circle cx="70" cy="270" r="0.7"/>
          <circle cx="95" cy="266" r="0.5"/>
          <circle cx="115" cy="272" r="0.8"/>
          <circle cx="140" cy="267" r="0.6"/>
          <circle cx="165" cy="270" r="0.7"/>
          <circle cx="185" cy="265" r="0.5"/>
        </g>
        {/* Small pebbles */}
        <ellipse cx="35" cy="269" rx="3" ry="1.5" fill="#A89878" opacity="0.5"/>
        <ellipse cx="130" cy="271" rx="2" ry="1" fill="#B0A080" opacity="0.4"/>
        <ellipse cx="165" cy="268" rx="2.5" ry="1.2" fill="#9A8868" opacity="0.45"/>
        {/* Pottery shard */}
        <path d="M170 264 Q173 260 176 264 Q174 268 170 264Z" fill="#B87050" opacity="0.35"/>
        {/* Small coin */}
        <circle cx="55" cy="267" r="2" fill="#D4A853" opacity="0.3"/>
        <circle cx="55" cy="267" r="1.2" fill="#C49840" opacity="0.25"/>
      </g>

      {/* ── Shadow ── */}
      <ellipse cx="100" cy="258" rx="45" ry="6" fill="#1A1714" opacity="0.1"/>

      {/* ── Aura effects (behind everything) ── */}
      {hasAura && !isSad && renderAccessory(c.accessory, isSad)}

      {/* ── Wings (behind body) ── */}
      {hasWings && !isSad && renderAccessory(c.accessory, isSad)}

      {/* ── Cape / Cloak (behind body) ── */}
      {hasCape && !isSad && renderAccessory(c.accessory, isSad)}

      {/* ── Legs / Boots ── */}
      {(() => {
        const bm = bootColor.main;
        const bs = bootColor.sole;
        // Darken helper for boot shading
        const bDarken = (hex: string, amt: number) => {
          const n = parseInt(hex.replace("#",""), 16);
          const r = Math.max(0, Math.min(255, (n >> 16) - amt));
          const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) - amt));
          const b = Math.max(0, Math.min(255, (n & 0xff) - amt));
          return `#${(r<<16|g<<8|b).toString(16).padStart(6,"0")}`;
        };
        const bShadow = bDarken(bm, 30);
        const bHighlight = bDarken(bm, -20);
        return (
          <g>
            {/* Left boot */}
            <g>
              {/* Boot shaft */}
              <path d="M72 218 L72 248 Q72 258 82 258 Q92 258 92 248 L92 218Z" fill={bm}/>
              {/* Boot toe */}
              <path d="M68 248 Q68 260 82 260 Q96 260 96 248 L92 248 Q92 256 82 256 Q72 256 72 248Z" fill={bm}/>
              {/* Sole */}
              <path d="M66 256 Q66 264 82 264 Q98 264 98 256 Q96 260 82 260 Q68 260 66 256Z" fill={bs}/>
              {/* Heel */}
              <rect x="68" y="258" width="8" height="5" rx="1" fill={bs}/>
              {/* Boot shaft highlight */}
              <path d="M74 220 L74 246 Q74 248 76 248 L76 220Z" fill={bHighlight} opacity="0.25"/>
              {/* Lace holes + laces */}
              <circle cx="78" cy="226" r="1" fill={bShadow}/>
              <circle cx="86" cy="226" r="1" fill={bShadow}/>
              <line x1="78" y1="226" x2="86" y2="226" stroke={bShadow} strokeWidth="0.7"/>
              <circle cx="78" cy="232" r="1" fill={bShadow}/>
              <circle cx="86" cy="232" r="1" fill={bShadow}/>
              <line x1="78" y1="232" x2="86" y2="232" stroke={bShadow} strokeWidth="0.7"/>
              <circle cx="78" cy="238" r="1" fill={bShadow}/>
              <circle cx="86" cy="238" r="1" fill={bShadow}/>
              <line x1="78" y1="238" x2="86" y2="238" stroke={bShadow} strokeWidth="0.7"/>
              <circle cx="78" cy="244" r="1" fill={bShadow}/>
              <circle cx="86" cy="244" r="1" fill={bShadow}/>
              <line x1="78" y1="244" x2="86" y2="244" stroke={bShadow} strokeWidth="0.7"/>
              {/* Boot top rim */}
              <rect x="70" y="217" width="24" height="4" rx="2" fill={bShadow}/>
            </g>
            {/* Right boot */}
            <g>
              <path d="M108 218 L108 248 Q108 258 118 258 Q128 258 128 248 L128 218Z" fill={bm}/>
              <path d="M104 248 Q104 260 118 260 Q132 260 132 248 L128 248 Q128 256 118 256 Q108 256 108 248Z" fill={bm}/>
              <path d="M102 256 Q102 264 118 264 Q134 264 134 256 Q132 260 118 260 Q104 260 102 256Z" fill={bs}/>
              <rect x="124" y="258" width="8" height="5" rx="1" fill={bs}/>
              <path d="M110 220 L110 246 Q110 248 112 248 L112 220Z" fill={bHighlight} opacity="0.25"/>
              <circle cx="114" cy="226" r="1" fill={bShadow}/>
              <circle cx="122" cy="226" r="1" fill={bShadow}/>
              <line x1="114" y1="226" x2="122" y2="226" stroke={bShadow} strokeWidth="0.7"/>
              <circle cx="114" cy="232" r="1" fill={bShadow}/>
              <circle cx="122" cy="232" r="1" fill={bShadow}/>
              <line x1="114" y1="232" x2="122" y2="232" stroke={bShadow} strokeWidth="0.7"/>
              <circle cx="114" cy="238" r="1" fill={bShadow}/>
              <circle cx="122" cy="238" r="1" fill={bShadow}/>
              <line x1="114" y1="238" x2="122" y2="238" stroke={bShadow} strokeWidth="0.7"/>
              <circle cx="114" cy="244" r="1" fill={bShadow}/>
              <circle cx="122" cy="244" r="1" fill={bShadow}/>
              <line x1="114" y1="244" x2="122" y2="244" stroke={bShadow} strokeWidth="0.7"/>
              <rect x="106" y="217" width="24" height="4" rx="2" fill={bShadow}/>
            </g>
          </g>
        );
      })()}

      {/* ── Body / Outfit ── */}
      {c.outfit === "explorer_jacket" ? (
        <g>
          {/* Default Explorer Jacket */}
          <ellipse cx="100" cy="190" rx="44" ry="48" fill="#A89070"/>
          <ellipse cx="100" cy="190" rx="40" ry="44" fill="#C4AC8A"/>
          <path d="M65 175 Q70 160 85 155 Q90 165 80 185 Q72 195 65 195Z" fill="#D4BC9A" opacity="0.3"/>
          <path d="M70 148 Q75 142 85 140 L85 152 Q78 154 72 155Z" fill="#B89A72"/>
          <path d="M130 148 Q125 142 115 140 L115 152 Q122 154 128 155Z" fill="#B89A72"/>
          <path d="M72 150 Q80 145 85 143 L85 148 Q80 150 74 153Z" fill="#9A8060" opacity="0.3"/>
          <path d="M128 150 Q120 145 115 143 L115 148 Q120 150 126 153Z" fill="#9A8060" opacity="0.3"/>
          <line x1="100" y1="148" x2="100" y2="210" stroke="#9A8060" strokeWidth="0.8" opacity="0.4"/>
          <circle cx="100" cy="162" r="2.5" fill="#B89A72" stroke="#8A7252" strokeWidth="0.8"/>
          <circle cx="100" cy="175" r="2.5" fill="#B89A72" stroke="#8A7252" strokeWidth="0.8"/>
          <circle cx="100" cy="188" r="2.5" fill="#B89A72" stroke="#8A7252" strokeWidth="0.8"/>
          <circle cx="100" cy="200" r="2.5" fill="#B89A72" stroke="#8A7252" strokeWidth="0.8"/>
          <rect x="72" y="166" width="18" height="16" rx="2" fill="#B89A72" stroke="#9A8060" strokeWidth="0.8"/>
          <path d="M71 166 L91 166 L91 171 Q82 173 71 171Z" fill="#A89070" stroke="#9A8060" strokeWidth="0.5"/>
          <circle cx="81" cy="169" r="1.2" fill="#8A7252"/>
          <circle cx="81" cy="177" r="4" fill="#D4A853" stroke="#B8860B" strokeWidth="0.8"/>
          <circle cx="81" cy="177" r="2" fill="#E8D5B8"/>
          <line x1="81" y1="175" x2="81" y2="177" stroke="#C45D3E" strokeWidth="0.6"/>
          <line x1="81" y1="177" x2="82.5" y2="178" stroke="#333" strokeWidth="0.5"/>
          <rect x="110" y="166" width="18" height="16" rx="2" fill="#B89A72" stroke="#9A8060" strokeWidth="0.8"/>
          <path d="M109 166 L129 166 L129 171 Q120 173 109 171Z" fill="#A89070" stroke="#9A8060" strokeWidth="0.5"/>
          <circle cx="119" cy="169" r="1.2" fill="#8A7252"/>
          <rect x="122" y="162" width="2" height="12" rx="0.5" fill="#2D2D2D"/>
          <polygon points="122,174 124,174 123,177" fill="#C0C0C0"/>
          <rect x="121.5" y="163" width="3" height="2" rx="0.5" fill="#D4A853"/>
          <rect x="60" y="207" width="80" height="9" rx="3" fill="#6B4226"/>
          <line x1="64" y1="209" x2="136" y2="209" stroke="#4A2E1A" strokeWidth="0.4" strokeDasharray="2,1.5" opacity="0.5"/>
          <line x1="64" y1="214" x2="136" y2="214" stroke="#4A2E1A" strokeWidth="0.4" strokeDasharray="2,1.5" opacity="0.5"/>
          <rect x="92" y="206" width="16" height="11" rx="2" fill="#D4A853" stroke="#B8860B" strokeWidth="1"/>
          <rect x="95" y="208" width="10" height="7" rx="1" fill="#6B4226"/>
          <line x1="100" y1="207" x2="100" y2="216" stroke="#D4A853" strokeWidth="1.2"/>
          <rect x="60" y="207" width="80" height="3" rx="1.5" fill="#8B5E3C" opacity="0.3"/>
          <path d="M62 158 Q65 155 70 155" fill="none" stroke="#9A8060" strokeWidth="0.8" opacity="0.5"/>
          <path d="M138 158 Q135 155 130 155" fill="none" stroke="#9A8060" strokeWidth="0.8" opacity="0.5"/>
        </g>
      ) : (
        renderOutfit(c.outfit)
      )}

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

      {/* ── Left Arm ── */}
      <g>
        {/* Sleeve */}
        <path
          d={isSad ? "M60 162 Q44 185 48 210" : "M60 162 Q44 178 46 200"}
          fill="none" stroke="#B89A72" strokeWidth="16" strokeLinecap="round"
        />
        {/* Sleeve highlight */}
        <path
          d={isSad ? "M60 162 Q46 183 50 205" : "M60 162 Q46 176 48 196"}
          fill="none" stroke="#C4AC8A" strokeWidth="6" strokeLinecap="round" opacity="0.4"
        />
        {/* Sleeve cuff */}
        {!isSad && (
          <g>
            <circle cx="46" cy="200" r="9" fill="#A89070"/>
            <circle cx="46" cy="200" r="8" fill="#B89A72"/>
          </g>
        )}
        {isSad && (
          <g>
            <circle cx="48" cy="210" r="9" fill="#A89070"/>
            <circle cx="48" cy="210" r="8" fill="#B89A72"/>
          </g>
        )}
        {/* Hand */}
        {!isSad && <circle cx="45" cy="208" r="8" fill="#FDDCBD"/>}
        {!isSad && <circle cx="45" cy="208" r="8" fill="#F5C4A5" opacity="0.3"/>}
        {isSad && <circle cx="48" cy="218" r="8" fill="#FDDCBD"/>}
        {isSad && <circle cx="48" cy="218" r="8" fill="#F5C4A5" opacity="0.3"/>}
        {/* Fingers hint */}
        {!isSad && (
          <g opacity="0.4">
            <path d="M40 212 Q38 215 39 217" fill="none" stroke="#E0B898" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M43 213 Q42 216 42 218" fill="none" stroke="#E0B898" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
        )}
      </g>

      {/* ── Held accessories (satchel, compass, etc.) ── */}
      {!["bowtie", "medal", "badge_acc", "whistle", "cape", "galaxy_cloak", "wings", "phoenix_wings",
         "demon_wings", "aura", "cosmic_aura", "stardust", "lightning", "armor", "halo_acc",
         "none_acc"].includes(c.accessory) && !isSad && renderAccessory(c.accessory, isSad)}

      {/* ── Lightning (over body) ── */}
      {hasLightning && !isSad && <AccessoryLightning />}

      {/* ── Halo accessory ── */}
      {c.accessory === "halo_acc" && !isSad && <AccessoryHaloAcc />}

      {/* Sad right arm */}
      {isSad && (
        <g>
          {/* Sleeve */}
          <path d="M140 162 Q156 185 152 210" fill="none" stroke="#B89A72" strokeWidth="16" strokeLinecap="round"/>
          <path d="M140 162 Q154 183 150 205" fill="none" stroke="#C4AC8A" strokeWidth="6" strokeLinecap="round" opacity="0.4"/>
          {/* Cuff */}
          <circle cx="152" cy="210" r="9" fill="#A89070"/>
          <circle cx="152" cy="210" r="8" fill="#B89A72"/>
          {/* Hand */}
          <circle cx="152" cy="218" r="8" fill="#FDDCBD"/>
          {/* Dropped magnifying glass */}
          <line x1="152" y1="218" x2="155" y2="233" stroke="#8B6B4F" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
          <circle cx="158" cy="243" r="12" fill="none" stroke="#C4A050" strokeWidth="3.5" opacity="0.4"/>
          <circle cx="158" cy="243" r="12" fill="#E8F4FF" opacity="0.08"/>
        </g>
      )}

      {/* ── Head ── */}
      <g>
        {/* Head base */}
        <ellipse cx="100" cy="100" rx="48" ry="52" fill="#FDDCBD"/>
        {/* Head shading — left */}
        <path d="M52 100 Q54 70 70 55 Q60 70 56 100 Q54 120 60 140" fill="#F0C8A0" opacity="0.3"/>
        {/* Head shading — right */}
        <path d="M148 100 Q146 70 130 55 Q140 70 144 100 Q146 120 140 140" fill="#F0C8A0" opacity="0.3"/>
        {/* Head highlight */}
        <ellipse cx="90" cy="80" rx="20" ry="15" fill="white" opacity="0.08"/>
      </g>

      {/* ── Ears ── */}
      <g>
        {/* Left ear */}
        <circle cx="54" cy="105" r="11" fill="#FDDCBD"/>
        <circle cx="54" cy="105" r="7" fill="#F5C4A5"/>
        <circle cx="54" cy="105" r="4" fill="#F0B898" opacity="0.4"/>
        {/* Right ear */}
        <circle cx="146" cy="105" r="11" fill="#FDDCBD"/>
        <circle cx="146" cy="105" r="7" fill="#F5C4A5"/>
        <circle cx="146" cy="105" r="4" fill="#F0B898" opacity="0.4"/>
      </g>

      {/* ── Eyebrows ── */}
      {isSad ? (
        <>
          <path d="M72 85 Q80 80 90 87" fill="none" stroke="#7A5A3A" strokeWidth="2.8" strokeLinecap="round"/>
          <path d="M110 87 Q120 80 128 85" fill="none" stroke="#7A5A3A" strokeWidth="2.8" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <path d="M73 85 Q81 78 92 83" fill="none" stroke="#7A5A3A" strokeWidth="2.8" strokeLinecap="round"/>
          <path d="M108 83 Q119 78 127 85" fill="none" stroke="#7A5A3A" strokeWidth="2.8" strokeLinecap="round"/>
        </>
      )}

      {/* ── Eyes ── */}
      <g className="mascot-eyes">
        {/* Left eye */}
        <ellipse cx="84" cy="100" rx="13" ry="14" fill="white"/>
        <ellipse cx="84" cy="100" rx="13" ry="14" fill="none" stroke="#DDBFA0" strokeWidth="1.2"/>
        <g className="mascot-pupils">
          {/* Iris */}
          <circle cx={isSearch ? "88" : "85"} cy={isSearch ? "101" : "100"} r="8" fill="#6B4226"/>
          {/* Pupil */}
          <circle cx={isSearch ? "88" : "85"} cy={isSearch ? "101" : "100"} r="4.5" fill="#3D2314"/>
          {/* Iris ring detail */}
          <circle cx={isSearch ? "88" : "85"} cy={isSearch ? "101" : "100"} r="7" fill="none" stroke="#8B5E3C" strokeWidth="0.5" opacity="0.5"/>
          {/* Catchlight big */}
          <circle cx={isSearch ? "89.5" : "86.5"} cy={isSearch ? "97" : "96"} r="3" fill="white" opacity="0.9"/>
          {/* Catchlight small */}
          <circle cx={isSearch ? "86" : "83"} cy={isSearch ? "103" : "102"} r="1.5" fill="white" opacity="0.5"/>
        </g>
        {/* Right eye */}
        <ellipse cx="116" cy="100" rx="13" ry="14" fill="white"/>
        <ellipse cx="116" cy="100" rx="13" ry="14" fill="none" stroke="#DDBFA0" strokeWidth="1.2"/>
        <g className="mascot-pupils">
          <circle cx={isSearch ? "120" : "117"} cy={isSearch ? "101" : "100"} r="8" fill="#6B4226"/>
          <circle cx={isSearch ? "120" : "117"} cy={isSearch ? "101" : "100"} r="4.5" fill="#3D2314"/>
          <circle cx={isSearch ? "120" : "117"} cy={isSearch ? "101" : "100"} r="7" fill="none" stroke="#8B5E3C" strokeWidth="0.5" opacity="0.5"/>
          <circle cx={isSearch ? "121.5" : "118.5"} cy={isSearch ? "97" : "96"} r="3" fill="white" opacity="0.9"/>
          <circle cx={isSearch ? "118" : "115"} cy={isSearch ? "103" : "102"} r="1.5" fill="white" opacity="0.5"/>
        </g>
      </g>

      {/* ── Nose ── */}
      <ellipse cx="100" cy="112" rx="4.5" ry="3.5" fill="#F0B898"/>
      <ellipse cx="99" cy="111" rx="2" ry="1.5" fill="#FDDCBD" opacity="0.4"/>

      {/* ── Mouth ── */}
      {isSad ? (
        <path d="M90 123 Q100 117 110 123" fill="none" stroke="#7A5A3A" strokeWidth="2.2" strokeLinecap="round"/>
      ) : (
        <>
          <path d="M87 120 Q100 131 113 120" fill="none" stroke="#7A5A3A" strokeWidth="2.2" strokeLinecap="round"/>
          {/* Smile fill */}
          <path d="M89 121 Q100 129 111 121" fill="#E88080" opacity="0.15"/>
        </>
      )}

      {/* ── Cheeks ── */}
      <ellipse cx="68" cy="114" rx="9" ry="6" fill="#F5A5A5" opacity="0.35"/>
      <ellipse cx="132" cy="114" rx="9" ry="6" fill="#F5A5A5" opacity="0.35"/>

      {/* ── Freckles ── */}
      <g opacity="0.2" fill="#C49A6C">
        <circle cx="66" cy="108" r="1"/>
        <circle cx="71" cy="106" r="1"/>
        <circle cx="69" cy="111" r="0.8"/>
        <circle cx="130" cy="108" r="1"/>
        <circle cx="135" cy="106" r="1"/>
        <circle cx="132" cy="111" r="0.8"/>
      </g>

      {/* ── Hair ── */}
      {c.hair && c.hair !== "none_hair" && renderHair(c.hair)}

      {/* ── Hat ── */}
      {renderHat(c.hat)}

      {/* ── Right arm + loupe (rendered LAST = on top) ── */}
      {!isSad && (
        <g className="mascot-right-arm">
          {/* Sleeve */}
          <path d="M140 162 Q160 145 158 120" fill="none" stroke="#B89A72" strokeWidth="16" strokeLinecap="round"/>
          <path d="M140 162 Q158 147 156 124" fill="none" stroke="#C4AC8A" strokeWidth="6" strokeLinecap="round" opacity="0.4"/>
          {/* Cuff */}
          <circle cx="158" cy="120" r="9" fill="#A89070"/>
          <circle cx="158" cy="120" r="8" fill="#B89A72"/>
          {/* Hand */}
          <circle cx="158" cy="120" r="8" fill="#FDDCBD"/>
          <circle cx="158" cy="120" r="7" fill="#F5C4A5" opacity="0.2"/>
          {/* Magnifying glass handle — wood */}
          <line x1="158" y1="120" x2="168" y2="98" stroke="#6B4226" strokeWidth="6" strokeLinecap="round"/>
          <line x1="158" y1="120" x2="168" y2="98" stroke="#8B5E3C" strokeWidth="3" strokeLinecap="round"/>
          {/* Handle grain */}
          <line x1="160" y1="116" x2="164" y2="106" stroke="#5A3A1A" strokeWidth="0.5" opacity="0.3"/>
          <line x1="161" y1="117" x2="165" y2="107" stroke="#A67B4F" strokeWidth="0.4" opacity="0.3"/>
          {/* Handle ferrule (brass joint) */}
          <circle cx="168" cy="98" r="4" fill="#C4A050"/>
          <circle cx="168" cy="98" r="3" fill="#D4A853"/>
          {/* Brass ring — outer */}
          <circle cx="175" cy="84" r="21" fill="none" stroke="#A08030" strokeWidth="2"/>
          {/* Brass ring — main */}
          <circle cx="175" cy="84" r="20" fill="none" stroke="#C4A050" strokeWidth="5"/>
          {/* Brass ring — inner highlight */}
          <circle cx="175" cy="84" r="18" fill="none" stroke="#D4B860" strokeWidth="1" opacity="0.5"/>
          {/* Ring detail — rivet dots */}
          <circle cx="157" cy="78" r="1.2" fill="#A08030" opacity="0.6"/>
          <circle cx="159" cy="92" r="1.2" fill="#A08030" opacity="0.6"/>
          <circle cx="193" cy="78" r="1.2" fill="#A08030" opacity="0.6"/>
          <circle cx="191" cy="92" r="1.2" fill="#A08030" opacity="0.6"/>
          {/* Glass fill */}
          <circle cx="175" cy="84" r="17" fill="#D8ECFA" opacity="0.3"/>
          {/* Glass reflection — arc */}
          <path d="M164 76 Q168 70 175 68" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
          {/* Glass reflection — small spot */}
          <circle cx="167" cy="78" r="2" fill="white" opacity="0.5"/>
          {/* Glass subtle tint */}
          <circle cx="180" cy="90" r="8" fill="#B8D8F0" opacity="0.12"/>
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

        /* ── Item Animations ── */

        @keyframes flicker {
          0%, 100% { opacity: 0.6; transform: translateY(0px) scaleY(1); }
          25% { opacity: 0.8; transform: translateY(-1px) scaleY(1.04); }
          50% { opacity: 0.5; transform: translateY(0.5px) scaleY(0.97); }
          75% { opacity: 0.75; transform: translateY(-0.5px) scaleY(1.02); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes orbit-1 {
          0% { transform: translate(0px, 0px); }
          25% { transform: translate(2px, -2px); }
          50% { transform: translate(0px, -3px); }
          75% { transform: translate(-2px, -1px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes orbit-2 {
          0% { transform: translate(0px, 0px); }
          25% { transform: translate(-2px, 1px); }
          50% { transform: translate(0px, 3px); }
          75% { transform: translate(2px, 1px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes wing-left {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-4deg); }
        }
        @keyframes wing-right {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes lightning-flash {
          0%, 18%, 22%, 100% { opacity: 1; }
          20% { opacity: 0.4; }
          90% { opacity: 1; }
          92% { opacity: 0.5; }
          94% { opacity: 1; }
        }
        @keyframes dragon-breathe {
          0%, 100% { opacity: 0.5; transform: scaleX(1); }
          50% { opacity: 0.8; transform: scaleX(1.3); }
        }
        @keyframes galaxy-twinkle {
          0%, 100% { opacity: 0.5; }
          30% { opacity: 1; }
          60% { opacity: 0.3; }
        }
        @keyframes halo-glow {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.15; }
        }
        @keyframes ember-rise {
          0% { opacity: 0.5; transform: translateY(0px); }
          100% { opacity: 0; transform: translateY(-8px); }
        }

        .anim-flicker { animation: flicker 1.5s ease-in-out infinite; }
        .anim-flicker-delayed { animation: flicker 1.8s ease-in-out 0.4s infinite; }
        .anim-pulse { animation: pulse-glow 2s ease-in-out infinite; }
        .anim-pulse-delayed { animation: pulse-glow 2s ease-in-out 0.7s infinite; }
        .anim-pulse-soft { animation: pulse-soft 3s ease-in-out infinite; }
        .anim-float { animation: float-y 3s ease-in-out infinite; }
        .anim-float-delayed { animation: float-y 3s ease-in-out 1s infinite; }
        .anim-orbit-1 { animation: orbit-1 4s ease-in-out infinite; }
        .anim-orbit-2 { animation: orbit-2 4s ease-in-out infinite; }
        .anim-shimmer { animation: shimmer 2s ease-in-out infinite; }
        .anim-shimmer-delayed { animation: shimmer 2s ease-in-out 0.5s infinite; }
        .anim-sparkle-1 { animation: sparkle 2s ease-in-out infinite; }
        .anim-sparkle-2 { animation: sparkle 2s ease-in-out 0.6s infinite; }
        .anim-sparkle-3 { animation: sparkle 2s ease-in-out 1.2s infinite; }
        .anim-wing-l { animation: wing-left 2s ease-in-out infinite; transform-origin: 100px 152px; }
        .anim-wing-r { animation: wing-right 2s ease-in-out infinite; transform-origin: 100px 152px; }
        .anim-rotate-slow { animation: rotate-slow 20s linear infinite; transform-origin: center; }
        .anim-lightning { animation: lightning-flash 3s ease-in-out infinite; }
        .anim-dragon-breath { animation: dragon-breathe 2s ease-in-out infinite; transform-origin: 170px 157px; }
        .anim-galaxy-1 { animation: galaxy-twinkle 3s ease-in-out infinite; }
        .anim-galaxy-2 { animation: galaxy-twinkle 3s ease-in-out 1s infinite; }
        .anim-galaxy-3 { animation: galaxy-twinkle 3s ease-in-out 2s infinite; }
        .anim-halo { animation: halo-glow 3s ease-in-out infinite; }
        .anim-ember-1 { animation: ember-rise 2s ease-out infinite; }
        .anim-ember-2 { animation: ember-rise 2.5s ease-out 0.5s infinite; }
        .anim-ember-3 { animation: ember-rise 1.8s ease-out 1s infinite; }
      `}</style>
    </svg>
  );
}
