"use client";

import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type RetroGridProps = HTMLAttributes<HTMLDivElement> & {
  angle?: number;
  cellSize?: number;
  opacity?: number;
  lightLineColor?: string;
  darkLineColor?: string;
};

const ANIMATION_DURATION_SECONDS = 15;
const FALLBACK_ANIMATION_NAME = "retro-grid-fallback-scroll";

function makeGridBackground(lineColor: string, cellSize: number): CSSProperties {
  return {
    backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 0), linear-gradient(to bottom, ${lineColor} 1px, transparent 0)`,
    backgroundRepeat: "repeat",
    backgroundSize: `${cellSize}px ${cellSize}px`,
  };
}

export function RetroGrid({
  className,
  angle = 65,
  cellSize = 60,
  opacity = 0.05,
  lightLineColor = "rgba(148,163,184,1)",
  darkLineColor = "rgba(148,163,184,1)",
  style,
  ...props
}: RetroGridProps) {
  const wrapperStyle = {
    "--retro-grid-angle": `${angle}deg`,
  } as CSSProperties;

  const sharedLayerStyle: CSSProperties = {
    opacity,
    animation: `${FALLBACK_ANIMATION_NAME} ${ANIMATION_DURATION_SECONDS}s linear infinite`,
    willChange: "transform",
    transform: "translateY(-50%)",
    WebkitMaskImage:
      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
    maskImage:
      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
  };

  const lightLayerStyle: CSSProperties = {
    ...sharedLayerStyle,
    ...makeGridBackground(lightLineColor, cellSize),
  };

  const darkLayerStyle: CSSProperties = {
    ...sharedLayerStyle,
    ...makeGridBackground(darkLineColor, cellSize),
  };

  return (
    <>
      <style>{`
        @keyframes ${FALLBACK_ANIMATION_NAME} {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          [data-retro-grid-scroll="true"] {
            animation: none !important;
            transform: translateY(-50%) !important;
          }
        }
      `}</style>

      <div
        data-retro-grid-scroll="true"
        aria-hidden
        className={cn("pointer-events-none overflow-hidden", className)}
        style={{ ...wrapperStyle, ...style }}
        {...props}
      >
        <div className="absolute inset-0 [transform:perspective(800px)_rotateX(var(--retro-grid-angle))] [transform-origin:top_center]">
          <div className="block dark:hidden absolute inset-0" style={lightLayerStyle} />
          <div className="hidden dark:block absolute inset-0" style={darkLayerStyle} />
        </div>
      </div>
    </>
  );
}

