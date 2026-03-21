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

// ── Hat Variants ──

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

function HatPirate() {
  return (
    <g>
      <path d="M48 72 Q55 30 100 18 Q145 30 152 72" fill="#1A1A1A"/>
      <path d="M50 72 Q57 34 100 22 Q143 34 150 72" fill="#2D2D2D" opacity="0.4"/>
      <ellipse cx="100" cy="70" rx="54" ry="8" fill="#1A1A1A"/>
      <rect x="60" y="64" width="80" height="4" rx="1" fill="#D4A853"/>
      {/* Skull */}
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

function renderHat(hatId: string) {
  switch (hatId) {
    case "explorer": return <HatExplorer />;
    case "bandana": return <HatBandana />;
    case "chef": return <HatChef />;
    case "crown": return <HatCrown />;
    case "tophat": return <HatTophat />;
    case "pirate": return <HatPirate />;
    case "santa": return <HatSanta />;
    default: return null;
  }
}

// ── Accessory Variants ──

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

function AccessoryBowtie() {
  return (
    <g>
      <path d="M88 145 L80 138 L80 152 Z" fill="#D4A853"/>
      <path d="M112 145 L120 138 L120 152 Z" fill="#D4A853"/>
      <circle cx="100" cy="145" r="4" fill="#B8860B"/>
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

function renderAccessory(accId: string, isSad: boolean) {
  if (isSad) return null;
  switch (accId) {
    case "satchel": return <AccessorySatchel />;
    case "bowtie": return <AccessoryBowtie />;
    case "cape": return <AccessoryCape />;
    case "wings": return <AccessoryWings />;
    default: return null;
  }
}

// ── Main Component ──

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
  const hasWings = c.accessory === "wings";

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

      {/* ── Wings (behind body) ── */}
      {hasWings && !isSad && <AccessoryWings />}

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

      {/* ── Bow tie (on body, before scarf) ── */}
      {c.accessory === "bowtie" && !isSad && <AccessoryBowtie />}

      {/* ── Scarf ── */}
      {c.scarf !== "none_scarf" && (
        <g>
          <path d="M78 142 Q100 155 122 142 Q120 150 115 155 L100 148 L85 155 Q80 150 78 142" fill={scarfColor}/>
          <path d="M85 155 Q82 168 78 175" fill="none" stroke={scarfColor} strokeWidth="5" strokeLinecap="round"/>
          <path d="M115 155 Q118 168 122 175" fill="none" stroke={scarfColor} strokeWidth="5" strokeLinecap="round"/>
        </g>
      )}

      {/* ── Arms ── */}
      <path
        d={isSad ? "M58 170 Q42 195 48 220" : "M58 170 Q42 185 45 210"}
        fill="none" stroke="#E8D5B8" strokeWidth="14" strokeLinecap="round"
      />
      {!isSad && <circle cx="45" cy="210" r="9" fill="#FDDCBD"/>}
      {isSad && <circle cx="48" cy="220" r="9" fill="#FDDCBD"/>}

      {/* ── Satchel strap ── */}
      {c.accessory === "satchel" && !isSad && <AccessorySatchel />}

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
