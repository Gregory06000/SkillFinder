"use client";

export type MascotPose = "default" | "search" | "sad" | "wave";

interface MascotProps {
  pose?: MascotPose;
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function Mascot({
  pose = "default",
  size = 120,
  className = "",
  animate = false,
}: MascotProps) {
  const isSad = pose === "sad";
  const isSearch = pose === "search";

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

      {/* ── Legs ── */}
      <rect x="72" y="218" width="20" height="38" rx="10" fill="#6B4226"/>
      <rect x="108" y="218" width="20" height="38" rx="10" fill="#6B4226"/>
      {/* Boots */}
      <ellipse cx="82" cy="256" rx="14" ry="7" fill="#4A2E1A"/>
      <ellipse cx="118" cy="256" rx="14" ry="7" fill="#4A2E1A"/>

      {/* ── Body ── */}
      <ellipse cx="100" cy="195" rx="42" ry="45" fill="#C49A6C"/>
      {/* Vest */}
      <ellipse cx="100" cy="195" rx="38" ry="41" fill="#E8D5B8"/>
      {/* Belt */}
      <rect x="62" y="210" width="76" height="8" rx="4" fill="#6B4226"/>
      <rect x="95" y="208" width="10" height="12" rx="2" fill="#D4A853"/>
      {/* Pockets */}
      <rect x="72" y="188" width="16" height="14" rx="3" fill="#C49A6C" stroke="#A67B4F" strokeWidth="1"/>
      <rect x="112" y="188" width="16" height="14" rx="3" fill="#C49A6C" stroke="#A67B4F" strokeWidth="1"/>
      {/* Pocket flaps */}
      <rect x="72" y="188" width="16" height="5" rx="2" fill="#A67B4F"/>
      <rect x="112" y="188" width="16" height="5" rx="2" fill="#A67B4F"/>

      {/* ── Scarf ── */}
      <path d="M78 142 Q100 155 122 142 Q120 150 115 155 L100 148 L85 155 Q80 150 78 142" fill="#C45D3E"/>
      <path d="M85 155 Q82 168 78 175" fill="none" stroke="#C45D3E" strokeWidth="5" strokeLinecap="round"/>
      <path d="M115 155 Q118 168 122 175" fill="none" stroke="#C45D3E" strokeWidth="5" strokeLinecap="round"/>

      {/* ── Arms ── */}
      {/* Left arm */}
      <path
        d={isSad ? "M58 170 Q42 195 48 220" : "M58 170 Q42 185 45 210"}
        fill="none" stroke="#E8D5B8" strokeWidth="14" strokeLinecap="round"
      />
      {/* Left hand */}
      {!isSad && <circle cx="45" cy="210" r="9" fill="#FDDCBD"/>}
      {isSad && <circle cx="48" cy="220" r="9" fill="#FDDCBD"/>}

      {/* ── Satchel strap ── */}
      {!isSad && (
        <path d="M120 155 Q135 165 140 180" fill="none" stroke="#6B4226" strokeWidth="4" strokeLinecap="round"/>
      )}
      {/* Satchel */}
      {!isSad && (
        <g>
          <rect x="132" y="175" width="22" height="18" rx="4" fill="#8B5E3C"/>
          <rect x="132" y="175" width="22" height="6" rx="3" fill="#6B4226"/>
          <circle cx="143" cy="184" r="2" fill="#D4A853"/>
        </g>
      )}

      {/* Right arm + magnifying glass (animated group) */}
      {!isSad ? (
        <g className="mascot-right-arm">
          {/* Arm */}
          <path d="M142 170 Q162 150 158 125" fill="none" stroke="#E8D5B8" strokeWidth="14" strokeLinecap="round"/>
          {/* Hand */}
          <circle cx="158" cy="125" r="9" fill="#FDDCBD"/>
          {/* Glass handle */}
          <line x1="158" y1="125" x2="168" y2="100" stroke="#D4A853" strokeWidth="5" strokeLinecap="round"/>
          {/* Glass ring */}
          <circle cx="174" cy="88" r="20" fill="none" stroke="#D4A853" strokeWidth="4.5"/>
          <circle cx="174" cy="88" r="20" fill="#E8F4FF" opacity="0.25"/>
          {/* Glass shine */}
          <path d="M165 80 Q168 76 173 74" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        </g>
      ) : (
        <g>
          {/* Sad arm right */}
          <path d="M142 170 Q158 195 152 220" fill="none" stroke="#E8D5B8" strokeWidth="14" strokeLinecap="round"/>
          <circle cx="152" cy="220" r="9" fill="#FDDCBD"/>
          {/* Magnifying glass on the ground */}
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
        {/* Left eye */}
        <ellipse cx="84" cy="100" rx="12" ry="13" fill="white"/>
        <ellipse cx="84" cy="100" rx="12" ry="13" fill="none" stroke="#DDBFA0" strokeWidth="1"/>
        <g className="mascot-pupils">
          <circle cx={isSearch ? "88" : "85"} cy={isSearch ? "101" : "100"} r="7" fill="#3D2314"/>
          <circle cx={isSearch ? "89.5" : "86.5"} cy={isSearch ? "98" : "97"} r="2.5" fill="white"/>
        </g>
        {/* Right eye */}
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
      {/* Brim */}
      <ellipse cx="100" cy="62" rx="52" ry="10" fill="#6B4226"/>
      <ellipse cx="100" cy="61" rx="52" ry="10" fill="#8B5E3C"/>
      {/* Crown */}
      <path d="M56 62 Q58 22 100 15 Q142 22 144 62" fill="#8B5E3C"/>
      <path d="M58 62 Q60 24 100 18 Q140 24 142 62" fill="#A67B4F" opacity="0.4"/>
      {/* Hat band */}
      <rect x="62" y="52" width="76" height="10" rx="2" fill="#4A2E1A"/>
      {/* Goggles on hat */}
      <ellipse cx="86" cy="50" rx="10" ry="7" fill="#4A2E1A" stroke="#D4A853" strokeWidth="1.5"/>
      <ellipse cx="86" cy="50" rx="7" ry="5" fill="#8BAEC4" opacity="0.5"/>
      <ellipse cx="114" cy="50" rx="10" ry="7" fill="#4A2E1A" stroke="#D4A853" strokeWidth="1.5"/>
      <ellipse cx="114" cy="50" rx="7" ry="5" fill="#8BAEC4" opacity="0.5"/>
      {/* Goggles bridge */}
      <path d="M96 50 L104 50" stroke="#D4A853" strokeWidth="2"/>
      {/* SF on hat band */}
      <text x="100" y="60" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="bold" fill="#D4A853" textAnchor="middle">SF</text>

      {/* ── Hover CSS: arm swings loupe in front of face, eyes look into it ── */}
      <style>{`
        .mascot-svg .mascot-right-arm {
          transform-origin: 142px 170px;
          transition: transform 0.4s ease;
        }
        .mascot-svg:hover .mascot-right-arm {
          transform: rotate(-35deg) translate(-20px, -15px);
        }
        .mascot-svg .mascot-pupils {
          transition: transform 0.4s ease;
        }
        .mascot-svg:hover .mascot-pupils {
          transform: translate(4px, -2px);
        }
      `}</style>
    </svg>
  );
}
