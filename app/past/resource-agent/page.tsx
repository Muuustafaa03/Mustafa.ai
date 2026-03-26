"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Terminal, ShieldAlert, Zap, Github, ExternalLink, Search, Lightbulb, MessageSquareQuote, Image as ImageIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResourceAgentDeepDive() {
    return (
        <main className="relative min-h-screen bg-black text-white p-6 lg:p-24 selection:bg-purple-500/30">
            <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_50%_0%,rgba(168,85,247,0.08),transparent_40%)]" />

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
                        <span className="text-purple-500/50">Resource-Agent</span>
                    </div>
                </nav>

                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-tighter font-mono">AI Research</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-8 leading-tight text-white">
                        Resource-First <br />AI Agent
                    </h1>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <Button asChild className="rounded-[8px] border border-white/10 bg-white/5 text-white hover:bg-white/10 text-sm font-bold px-6 py-6 transition-all">
                            <a href="https://github.com/Muuustafaa03/AI-Agent" target="_blank"><Github size={18} className="mr-2 text-purple-400" /> View Source</a>
                        </Button>
                        <Button asChild className="rounded-[8px] border border-white/10 bg-white/5 text-white hover:bg-white/10 text-sm font-bold px-6 py-6 transition-all">
                            <a href="https://ai-agent-web-0up4.onrender.com/" target="_blank"><ExternalLink size={18} className="mr-2 text-emerald-400" /> Live Demo</a>
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
                        <Search size={18} className="text-purple-400" />
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 font-mono">The Discovery</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-2">
                            <h3 className="text-3xl font-bold mb-6 tracking-tight">The Problem of AI "Bloat".</h3>
                            <p className="text-neutral-400 leading-relaxed mb-8 text-lg">
                                Most AI agents assume infinite compute resources, often leading to performance crashes on local hardware. I wanted to build an agent that understands its own environmental constraints—memory, CPU, and latency—before deciding on a reasoning path.
                            </p>
                            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 italic text-neutral-300 leading-relaxed relative">
                                <MessageSquareQuote size={24} className="mb-4 text-purple-500/50" />
                                Engineering an agent isn't just about the prompt; it's about the pipeline. This project explores how neurosymbolic logic can reduce token waste.
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                                <Sparkles size={20} className="text-purple-400 mb-3" />
                                <p className="text-[10px] font-bold uppercase text-neutral-500 mb-2 tracking-widest font-mono">The Purpose</p>
                                <p className="text-sm text-neutral-300 font-medium leading-relaxed italic">Optimization of autonomous reasoning.</p>
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
                            Standard agents often loop infinitely when faced with API timeouts or hardware throttles, resulting in massive resource leakage.
                        </p>
                    </section>
                    <section className="p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
                        <h3 className="flex items-center gap-2 text-white font-bold mb-6 uppercase text-[10px] tracking-widest font-mono">
                            <Zap size={16} className="text-purple-400/80" /> The Solve
                        </h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">
                            Implemented a resource-aware execution loop that monitors system telemetry in real-time, adjusting model temperature and logic depth dynamically.
                        </p>
                    </section>
                </div>

                <section className="rounded-2xl border border-white/10 bg-white/5 p-8 mb-20 relative overflow-hidden group">
                    <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity"><Terminal size={200} /></div>
                    <div className="flex items-center gap-2 mb-10 relative z-10">
                        <Terminal size={18} className="text-purple-400" />
                        <h2 className="text-xl font-bold tracking-tight">Technical Snapshot</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                        {[
                            { label: "Language", value: "TypeScript" },
                            { label: "Architecture", value: "Neurosymbolic" },
                            { label: "Runtime", value: "Node.js" },
                            { label: "Deployment", value: "Render" },
                        ].map((item, idx) => (
                            <div key={idx}>
                                <p className="text-[10px] uppercase text-neutral-500 font-bold mb-2 tracking-widest font-mono">{item.label}</p>
                                <p className="text-sm font-mono text-white group-hover:text-purple-400 transition-colors">{item.value}</p>
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