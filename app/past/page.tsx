"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Folder, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PastPillarHub() {
  return (
    <main className="relative min-h-screen bg-black text-white p-6 lg:p-24 selection:bg-blue-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_10%_10%,rgba(59,130,246,0.05),transparent_40%)]" />

      <div className="relative mx-auto max-w-5xl">
        <nav className="mb-20 flex justify-between items-center">
          <Button asChild variant="ghost" className="text-neutral-500 hover:text-white -ml-4 gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
            <Link href="/">
              <ChevronLeft size={14} /> Back to Home
            </Link>
          </Button>
          <span className="text-neutral-700 font-mono text-[10px] tracking-widest uppercase">/ Root / Past</span>
        </nav>

        <header className="mb-16">
          <h1 className="text-6xl font-bold tracking-tighter mb-4">The Proof</h1>
          <p className="text-neutral-500 text-lg max-w-xl">
            A collection of my problem searching and problem solving.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          <Link href="/past/quickbooks">
            <div className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Folder size={20} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">QuickBooks IES Data Suite</h3>
                </div>
                <ArrowUpRight className="text-neutral-700 group-hover:text-blue-400 transition-colors" />
              </div>
              <p className="text-neutral-400 text-sm max-w-2xl leading-relaxed">
                Solved 41-character data truncation in Intuit Enterprise Suite through
                automated auditing and a custom normalization pipeline.
              </p>
              <div className="mt-6 flex gap-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                <span>Python</span>
                <span>•</span>
                <span>Automation</span>
                <span>•</span>
                <span>IES</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}