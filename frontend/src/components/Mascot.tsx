"use client";

import Image from "next/image";

export type MascotPose = "default" | "search" | "sad" | "wave";

const POSE_FILES: Record<MascotPose, string> = {
  default: "/mascot.svg",
  search: "/mascot-search.svg",
  sad: "/mascot-sad.svg",
  wave: "/mascot-wave.svg",
};

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
  return (
    <div
      className={`inline-block ${animate ? "animate-bounce-slow" : ""} ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={POSE_FILES[pose]}
        alt="Findy, mascotte SkillFinder"
        width={size}
        height={size}
        priority={false}
      />
    </div>
  );
}
