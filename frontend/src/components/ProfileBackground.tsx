"use client";

import { useRef } from "react";

interface ProfileBackgroundProps {
  theme: number;
  category: string;
}

const CATEGORY_COLORS: Record<string, [string, string, string]> = {
  fitness: ["#22c55e", "#10b981", "#06b6d4"],
  cosplay: ["#ec4899", "#a855f7", "#6366f1"],
  artist: ["#f97316", "#eab308", "#ef4444"],
  music: ["#ef4444", "#ec4899", "#a855f7"],
  gaming: ["#8b5cf6", "#6366f1", "#3b82f6"],
  lifestyle: ["#06b6d4", "#14b8a6", "#22c55e"],
  education: ["#3b82f6", "#6366f1", "#8b5cf6"],
  professional: ["#64748b", "#475569", "#6b7280"],
  model: ["#ec4899", "#f43f5e", "#fb7185"],
  other: ["#8b5cf6", "#6366f1", "#a855f7"],
};

export function ProfileBackground({ theme, category }: ProfileBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const colors = CATEGORY_COLORS[category.toLowerCase()] || CATEGORY_COLORS.other;


  const cssVars = {
    "--theme-color-1": colors[0],
    "--theme-color-2": colors[1],
    "--theme-color-3": colors[2],
  } as React.CSSProperties;

  // Theme 0: Aurora
  if (theme === 0) {
    return (
      <div ref={containerRef} className="profile-bg" style={cssVars}>
        <div className="profile-bg-aurora absolute inset-0" />
      </div>
    );
  }

  // Theme 1: Mesh
  if (theme === 1) {
    return (
      <div ref={containerRef} className="profile-bg profile-bg-mesh" style={cssVars}>
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
    );
  }

  // Theme 2: Carbon
  if (theme === 2) {
    return (
      <div ref={containerRef} className="profile-bg profile-bg-carbon" style={cssVars}>
        <div className="carbon-grid" />
        <div className="carbon-scanlines" />
        <div className="carbon-accent" />
      </div>
    );
  }

  // Theme 3: Noise
  if (theme === 3) {
    return (
      <div ref={containerRef} className="profile-bg profile-bg-noise" style={cssVars} />
    );
  }

  // Theme 4: Glass
  if (theme === 4) {
    return (
      <div ref={containerRef} className="profile-bg profile-bg-glass" style={cssVars}>
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
        <div className="frost" />
      </div>
    );
  }

  return null;
}
