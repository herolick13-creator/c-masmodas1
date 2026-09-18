import React from "react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark" | "burgundy" | "gold";
  showTagline?: boolean;
  monogramOnly?: boolean;
}

export default function BrandLogo({
  className,
  size = "md",
  variant = "burgundy",
  showTagline = true,
  monogramOnly = false,
}: BrandLogoProps) {
  const sizeMap = {
    sm: { emblem: "w-8 h-8", text: "text-lg", sub: "text-[9px]" },
    md: { emblem: "w-11 h-11", text: "text-2xl", sub: "text-[10px]" },
    lg: { emblem: "w-16 h-16", text: "text-3xl", sub: "text-xs" },
    xl: { emblem: "w-24 h-24", text: "text-5xl", sub: "text-sm" },
  };

  const currentSize = sizeMap[size];

  const colors = {
    burgundy: {
      emblemBg: "bg-[#720018]",
      emblemBorder: "border-[#C9A86A]",
      monogram: "#F8F5F3",
      crown: "#C9A86A",
      text: "text-[#720018]",
      sub: "text-[#4A0010]/80",
    },
    dark: {
      emblemBg: "bg-[#4A0010]",
      emblemBorder: "border-[#C9A86A]",
      monogram: "#FFFFFF",
      crown: "#C9A86A",
      text: "text-white",
      sub: "text-[#C9A86A]",
    },
    light: {
      emblemBg: "bg-white",
      emblemBorder: "border-[#720018]",
      monogram: "#720018",
      crown: "#C9A86A",
      text: "text-[#720018]",
      sub: "text-slate-600",
    },
    gold: {
      emblemBg: "bg-gradient-to-br from-[#720018] to-[#4A0010]",
      emblemBorder: "border-[#C9A86A]",
      monogram: "#C9A86A",
      crown: "#FFFFFF",
      text: "text-[#C9A86A]",
      sub: "text-slate-300",
    },
  };

  const c = colors[variant];

  return (
    <div className={cn("inline-flex items-center gap-3 select-none", className)}>
      {/* Luxurious Monogram Emblem */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-2xl shadow-md border p-1 transition-transform",
          currentSize.emblem,
          c.emblemBg,
          c.emblemBorder
        )}
      >
        {/* Subtle decorative inner border */}
        <div className="absolute inset-0.5 rounded-xl border border-white/20 pointer-events-none" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Crown / Tiara Crest */}
          <path
            d="M32 30 L50 16 L68 30 L60 33 L50 25 L40 33 Z"
            fill={c.crown}
          />
          <circle cx="50" cy="14" r="3" fill={c.crown} />
          <circle cx="32" cy="28" r="2.2" fill={c.crown} />
          <circle cx="68" cy="28" r="2.2" fill={c.crown} />

          {/* Interlocking Monogram C & M */}
          {/* Stylized 'C' */}
          <path
            d="M48 42 C41 42 34 47 34 56 C34 65 41 70 48 70 C53 70 57 67 58 64 L53 62 C52 64 50 66 48 66 C43 66 39 62 39 56 C39 50 43 46 48 46 C51 46 53 48 54 50 L58 47 C56 44 52 42 48 42 Z"
            fill={c.monogram}
          />

          {/* Stylized 'M' intertwined */}
          <path
            d="M50 43 L58 65 L66 43 L72 43 L72 70 L67 70 L67 50 L60 70 L56 70 L49 50 L49 70 L44 70 L44 43 Z"
            fill={c.monogram}
            fillOpacity="0.95"
          />

          {/* Bottom flourish arc */}
          <path
            d="M30 76 Q50 84 70 76"
            stroke={c.crown}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {!monogramOnly && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-brand-title font-bold tracking-[0.14em] leading-none uppercase",
              currentSize.text,
              c.text
            )}
          >
            C-MAS
          </span>
          <span
            className={cn(
              "font-serif-luxury tracking-[0.25em] font-medium uppercase mt-0.5 leading-tight",
              currentSize.sub,
              c.sub
            )}
          >
            MODAS
          </span>
          {showTagline && size !== "sm" && (
            <span className="text-[9px] tracking-[0.18em] uppercase text-slate-400 font-sans mt-0.5">
              Campo Grande • MS
            </span>
          )}
        </div>
      )}
    </div>
  );
}
