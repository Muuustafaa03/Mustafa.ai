"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Terminal, ShieldAlert, Zap, Github, ExternalLink, Search, MessageSquareQuote, Cpu, Database, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Lightbulb,
    Image as ImageIcon
} from "lucide-react";

export default function PortfolioDeepDive() {
    return (
        <main className="relative min-h-screen bg-black text-white p-6 lg:p-24 selection:bg-cyan-500/30">
            <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_50%_0%,rgba(6,182,212,0.08),transparent_40%)]" />

            <div className="relative mx-auto max-w-4xl text-left">
                <nav className="mb-12 flex justify-between items-center">
                    <Button asChild variant="ghost" className="text-neutral-500 hover:text-white -ml-4 gap-2 font-mono text-[10px] uppercase tracking-widest">
                        <Link href="/past"><ChevronLeft size={14} /> Back to Projects</Link>
                    </Button>
                    <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-700">
                        <Link href="/" className="hover:text-white transition-colors">Hub</Link>
                        <span>/</span>
                        <Link href="/past" className="hover:text-white transition-colors">Past</Link>
                        <span>/</span>
                        <span className="text-cyan-500/50">Mustafa-AI</span>
                    </div>
                </nav>

                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-tighter font-mono">System Architecture</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-8 leading-tight text-white">
                        Mustafa.ai <br />V1.0 Engine
                    </h1>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <Button asChild className="rounded-[8px] border border-white/10 bg-white/5 text-white hover:bg-white/10 text-sm font-bold px-6 py-6 transition-all">
                            <a href="https://github.com/Muuustafaa03/Mustafa.ai/" target="_blank"><Github size={18} className="mr-2 text-cyan-400" /> View Source</a>
                        </Button>
                        <Button asChild className="rounded-[8px] border border-white/10 bg-white/5 text-white hover:bg-white/10 text-sm font-bold px-6 py-6 transition-all">
                            <a href="https://mustafa-forge.vercel.app/" target="_blank"><ExternalLink size={18} className="mr-2 text-blue-400" /> Live Demo</a>
                        </Button>
                        <Button asChild className="rounded-[8px] border border-white/10 bg-white/5 text-white hover:bg-white/10 text-sm font-bold tracking-tight tracking-tight px-6 py-6 transition-all">
                            <Link href="/gallery">
                                <ImageIcon size={18} className="mr-2 text-orange-400" /> View Gallery
                            </Link>
                        </Button>
                    </div>
                </header>

                <section className="mb-24 mt-20">
                    <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                        <Search size={18} className="text-cyan-400" />
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 font-mono">The Discovery</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-2">
                            <h3 className="text-3xl font-bold mb-6 tracking-tight">A Portfolio to Complete Two Objectives</h3>
                            <p className="text-neutral-400 leading-relaxed mb-8 text-lg">
                                I wanted my portfolio to not only showcase my work, but also be a living website where I can post updates and stay connected with a potential audience.
                            </p>
                            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 italic text-neutral-300 leading-relaxed relative">
                                <MessageSquareQuote size={24} className="mb-4 text-cyan-500/50" />
                                Instead of making just a website, I've made a dashboard for my career. I've bridged the gap between "doing work" and "showing work".
                            </div>
                        </div>
                        {/* THE NUDGE: Outer wrapper to shift the entire card right */}
                        <div className="w-full pl-3 sm:pl-0">
                            <div className="w-full p-6 rounded-2xl border border-white/5 bg-white/[0.02] box-border relative">
                                <div className="flex flex-col gap-3">

                                    {/* Header: Icon + Title Grouped */}
                                    <div className="flex items-center gap-3">
                                        <Cpu size={20} className="text-cyan-400" />
                                        <p className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest font-mono">
                                            The Purpose
                                        </p>
                                    </div>

                                    {/* Body: Flush under the Cpu symbol */}
                                    <p className="text-sm text-neutral-300 font-medium leading-relaxed italic">
                                        Real-time career telemetry.
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
                            Combining a UI that draws users in with real time data fetching in a clean, minimalist way.
                        </p>
                    </section>
                    <section className="p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
                        <h3 className="flex items-center gap-2 text-white font-bold mb-6 uppercase text-[10px] tracking-widest font-mono">
                            <Zap size={16} className="text-cyan-400/80" /> The Solve
                        </h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">
                            Implemented a live dashboard that turns my credentials into a real-time feed, combining clean design with a database that updates as I work.
                        </p>
                    </section>
                </div>

                <section className="rounded-2xl border border-white/10 bg-white/5 p-8 mb-20 relative overflow-hidden group">
                    <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity"><Terminal size={200} /></div>
                    <div className="flex items-center gap-2 mb-10 relative z-10">
                        <Terminal size={18} className="text-cyan-400" />
                        <h2 className="text-xl font-bold tracking-tight">Technical Snapshot</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                        {[
                            { label: "Framework", value: "Next.js 14" },
                            { label: "Database", value: "Supabase" },
                            { label: "Animations", value: "Framer Motion" },
                            { label: "Deployment", value: "Vercel" },
                        ].map((item, idx) => (
                            <div key={idx}>
                                <p className="text-[10px] uppercase text-neutral-500 font-bold mb-2 tracking-widest font-mono">{item.label}</p>
                                <p className="text-sm font-mono text-white group-hover:text-cyan-400 transition-colors">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="mt-20 pt-10 border-t border-white/5 text-center">
                    <p className="text-neutral-800 text-[9px] font-mono uppercase tracking-[0.5em]">End of Transmission</p>
                </footer>
            </div>
        </main>
    );
}