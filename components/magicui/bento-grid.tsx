"use client";

import {
  ReactNode,
  useRef,
  type CSSProperties,
  type ElementType,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: ElementType;
  description: string;
  href: string;
  cta: string;
}) => {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const latestPointRef = useRef({ x: 0, y: 0 });

  const spotlightStyle = {
    // Defaults to center so the first render doesn't show a "zero" spotlight.
    "--spotlight-x": "50%",
    "--spotlight-y": "50%",
  } as unknown as CSSProperties;

  const commitSpotlight = () => {
    const el = cardRef.current;
    if (!el) return;

    const { x, y } = latestPointRef.current;
    el.style.setProperty("--spotlight-x", `${x}px`);
    el.style.setProperty("--spotlight-y", `${y}px`);
  };

  const handlePointerEnter = () => {
    const el = cardRef.current;
    if (!el) return;

    boundsRef.current = el.getBoundingClientRect();
    el.style.setProperty("--spotlight-x", "50%");
    el.style.setProperty("--spotlight-y", "50%");
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = boundsRef.current ?? el.getBoundingClientRect();
    if (!boundsRef.current) boundsRef.current = rect;

    latestPointRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    // Throttle updates to once per animation frame.
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      commitSpotlight();
    });
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;

    boundsRef.current = null;
    el.style.setProperty("--spotlight-x", "50%");
    el.style.setProperty("--spotlight-y", "50%");
  };

  return (
    <a
      key={name}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "group relative isolate col-span-3 flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className,
      )}
      style={spotlightStyle}
    >
      <div>{background}</div>

      {/* Spotlight follows the cursor (subtle white/blue). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          backgroundImage: `
            radial-gradient(520px circle at var(--spotlight-x) var(--spotlight-y), rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 55%),
            radial-gradient(420px circle at var(--spotlight-x) var(--spotlight-y), rgba(59,130,246,0.14) 0%, rgba(59,130,246,0) 60%)
          `,
        }}
      />

      <div className="pointer-events-none relative z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
        <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75 dark:text-neutral-300" />
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
          {name}
        </h3>
        <p className="max-w-lg text-neutral-400">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 z-10 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        {/* Decorative CTA (card link handles navigation). */}
        <div className="flex items-center gap-2 rounded-lg border border-transparent bg-transparent px-3 py-1.5 text-sm font-medium text-white transition-colors group-hover:text-white">
          <span>{cta}</span>
          <ArrowRightIcon className="h-4 w-4" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </a>
  );
};

export { BentoGrid, BentoCard };