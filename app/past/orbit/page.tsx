"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Github,
  ExternalLink,
  Search,
  MessageSquareQuote,
  Sparkles,
  ShieldAlert,
  Zap,
  Terminal,
  Image as ImageIcon,
  Orbit as OrbitIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const LIVE_URL = "https://orbit-sigma-two.vercel.app/";
const REPO_URL = "https://github.com/Muuustafaa03/orbit";

/** Emerald accent matches `/past` hub card — see `.cursor/rules/portfolio-past-project-pages.mdc`. */
export default function OrbitDeepDive() {
  return (
    <main className="relative min-h-screen bg-black text-white p-6 lg:p-24 selection:bg-emerald-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_50%_0%,rgba(16,185,129,0.08),transparent_40%)]" />

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
            <span className="text-emerald-500/50">Orbit</span>
          </div>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-tighter font-mono">
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
              className="rounded-[8px] border border-white/10 bg-white/5 text-white hover:bg-white/10 text-sm font-bold tracking-tight px-6 py-6 transition-all"
            >
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <Github size={18} className="mr-2 text-emerald-400" /> View source
              </a>
            </Button>
            <Button
              asChild
              className="rounded-[8px] border border-white/10 bg-white/5 text-white hover:bg-white/10 text-sm font-bold tracking-tight px-6 py-6 transition-all"
            >
              <a href={LIVE_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={18} className="mr-2 text-cyan-400" /> Live app
              </a>
            </Button>
            <Button
              asChild
              className="rounded-[8px] border border-white/10 bg-white/5 text-white hover:bg-white/10 text-sm font-bold tracking-tight px-6 py-6 transition-all"
            >
              <Link href="/gallery">
                <ImageIcon size={18} className="mr-2 text-orange-400" /> View Gallery
              </Link>
            </Button>
          </div>
        </header>

        <section className="mb-24 mt-20">
          <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
            <Search size={18} className="text-emerald-400" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 font-mono">
              The Discovery
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-6 tracking-tight">
                Deadlines as motion, not columns
              </h3>
              <p className="text-neutral-400 leading-relaxed mb-8 text-lg">
                Task tools often bury urgency in cells and sort orders. Orbit instead maps one
                project to a single sun: tasks become planets on spokes, workflow rings show how
                close work is to done, and due pressure reads through color and motion so you
                orient without scanning tables.
              </p>
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 italic text-neutral-300 leading-relaxed relative">
                <MessageSquareQuote size={24} className="mb-4 text-emerald-500/50" />
                Spatial clarity beats density: one tableau for orientation, list mode when you
                need rows—same work, two reads.
              </div>
            </div>
            <div className="w-full pl-2 sm:pl-0">
              <div className="w-full p-6 rounded-2xl border border-white/5 bg-white/[0.02] box-border relative">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Sparkles size={20} className="text-emerald-400" />
                    <p className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest font-mono">
                      The Purpose
                    </p>
                  </div>
                  <p className="text-sm text-neutral-300 font-medium leading-relaxed italic">
                    Make progress and deadline stress visible at a glance—without abandoning a
                    familiar list when you want it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <section className="p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h3 className="flex items-center gap-2 text-white font-bold mb-6 uppercase text-[10px] tracking-widest font-mono">
              <ShieldAlert size={16} className="text-red-500/80" /> The Friction
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Boards and grids optimize for many projects and fields; they rarely give one
              initiative a sense of “where everything sits” relative to completion and time.
              Urgency gets lost next to busy columns.
            </p>
          </section>
          <section className="p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h3 className="flex items-center gap-2 text-white font-bold mb-6 uppercase text-[10px] tracking-widest font-mono">
              <Zap size={16} className="text-emerald-400/80" /> The Solve
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              A constellation canvas: drag tasks along workflow spokes, absorb finished work
              into the sun, and switch to list view for a compact read—same data, two
              intentional layouts.
            </p>
          </section>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-8 mb-20 relative overflow-hidden group">
          <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <Terminal size={200} />
          </div>
          <div className="flex items-center gap-2 mb-10 relative z-10">
            <Terminal size={18} className="text-emerald-400" />
            <h2 className="text-xl font-bold tracking-tight">Technical Snapshot</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {[
              { label: "Framework", value: "Vite + React" },
              { label: "Canvas", value: "Three.js (R3F)" },
              { label: "Deploy", value: "Vercel" },
              { label: "Data", value: "Client-only (no login)" },
            ].map((item, idx) => (
              <div key={idx}>
                <p className="text-[10px] uppercase text-neutral-500 font-bold mb-2 tracking-widest font-mono">
                  {item.label}
                </p>
                <p className="text-sm font-mono text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                  {item.label === "Canvas" && (
                    <OrbitIcon size={14} className="text-emerald-400/80 shrink-0" />
                  )}
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t border-white/5 text-center">
          <p className="text-neutral-800 text-[9px] font-mono uppercase tracking-[0.5em]">
            End of Transmission
          </p>
        </footer>
      </div>
    </main>
  );
}
