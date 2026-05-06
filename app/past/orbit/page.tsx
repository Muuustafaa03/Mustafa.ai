"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Github,
  ExternalLink,
  Search,
  MessageSquareQuote,
  Box,
  Orbit as OrbitIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const LIVE_URL = "https://orbit-sigma-two.vercel.app/";
const REPO_URL = "https://github.com/Muuustafaa03/orbit";

export default function OrbitDeepDive() {
  return (
    <main className="relative min-h-screen bg-black text-white p-6 lg:p-24 selection:bg-sky-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_50%_0%,rgba(56,189,248,0.08),transparent_40%)]" />

      <div className="relative mx-auto max-w-4xl text-left">
        <nav className="mb-12 flex justify-between items-center">
          <Button
            asChild
            variant="ghost"
            className="text-neutral-500 hover:text-white -ml-4 gap-2 font-mono text-[10px] uppercase tracking-widest"
          >
            <Link href="/past">
              <ChevronLeft size={14} /> Back to Projects
            </Link>
          </Button>

          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-700">
            <Link href="/" className="hover:text-white transition-colors">
              Hub
            </Link>
            <span>/</span>
            <Link href="/past" className="hover:text-white transition-colors">
              Past
            </Link>
            <span>/</span>
            <span className="text-sky-500/50">Orbit</span>
          </div>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-bold uppercase tracking-tighter font-mono">
              Spatial task canvas
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-8 leading-tight text-white">
            Orbit
            <br />
            Constellation tasks
          </h1>

          <div className="flex flex-wrap gap-3 mt-8">
            <Button
              asChild
              className="rounded-[8px] border border-white/10 bg-white/5 text-white hover:bg-white/10 text-sm font-bold px-6 py-6 transition-all"
            >
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <Github size={18} className="mr-2 text-sky-400" /> View source
              </a>
            </Button>
            <Button
              asChild
              className="rounded-[8px] border border-white/10 bg-white/5 text-white hover:bg-white/10 text-sm font-bold px-6 py-6 transition-all"
            >
              <a href={LIVE_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={18} className="mr-2 text-cyan-400" /> Live app
              </a>
            </Button>
          </div>
        </header>

        <section className="mb-24 mt-20">
          <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
            <Search size={18} className="text-sky-400" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 font-mono">
              The idea
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-6 tracking-tight">
                Deadlines as motion, not columns
              </h3>
              <p className="text-neutral-400 leading-relaxed mb-8 text-lg">
                Orbit is a single-project task board where each task is a planet on a
                spoke: workflow rings show progress toward the sun, and deadline urgency
                reads through color and light—not buried in a due-date cell.
              </p>
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 italic text-neutral-300 leading-relaxed relative">
                <MessageSquareQuote size={24} className="mb-4 text-sky-500/50" />
                Built as a calm, spatial alternative to dense grids: fewer panels, more
                orientation at a glance.
              </div>
            </div>
            <div className="w-full pl-3 sm:pl-0">
              <div className="w-full p-6 rounded-2xl border border-white/5 bg-white/[0.02] box-border relative">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Box size={20} className="text-sky-400" />
                    <p className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest font-mono">
                      Stack
                    </p>
                  </div>
                  <p className="text-sm text-neutral-300 font-medium leading-relaxed">
                    React · Three.js · Vite · hosted on Vercel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24 border-t border-white/5 pt-16">
          <div className="flex items-center gap-2 mb-6">
            <OrbitIcon size={18} className="text-sky-400" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 font-mono">
              Links
            </h2>
          </div>
          <p className="text-neutral-500 text-sm mb-6">
            Production deploy and repository stay in sync with continued iteration on the
            constellation UX and audio polish.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-[8px] border-white/10 bg-transparent text-white hover:bg-white/5"
            >
              <a href={LIVE_URL} target="_blank" rel="noopener noreferrer">
                orbit-sigma-two.vercel.app
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-[8px] border-white/10 bg-transparent text-white hover:bg-white/5"
            >
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                github.com/Muuustafaa03/orbit
              </a>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
