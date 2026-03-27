"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText, Check, Copy, Send, Activity, ChevronRight,
  Github, Linkedin, Image as ImageIcon, Sparkles, FileDown, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [futureItems, setFutureItems] = useState<any[]>([]);
  const [presentLogs, setPresentLogs] = useState<any[]>([]);
  const [displayItems, setDisplayItems] = useState<any[]>([]);
  const [currentMission, setCurrentMission] = useState("Looking for problems...");
  const [loading, setLoading] = useState(true);

  const email = "m.m.stafa2742@gmail.com";

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        // ... Fetching Future Items ...
        const { data: future } = await supabase
          .from('marketplace_submissions')
          .select('*')
          .order('votes', { ascending: false })
          .limit(3);

        // ... Fetching Projects ...
        const { data: projects } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'Completed') // Strict consistency
          .order('created_at', { ascending: false })
          .limit(3);

        // ... Fetching Logs ...
        const { data: logs } = await supabase
          .from('present_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        // ... Fetching Mission ...
        const { data: settings } = await supabase
          .from('site_settings')
          .select('current_mission')
          .eq('id', 'global')
          .single();

        if (isMounted) {
          if (future) setFutureItems(future);

          if (projects && projects.length > 0) {
            // No more hardcoded title checks. 
            // We use the slug directly from Supabase.
            const dbMapped = projects.map(project => ({
              ...project,
              slug: project.slug // Trusts the DB source of truth
            }));

            setDisplayItems(dbMapped);
          } else {
            setDisplayItems([
              { id: '1', title: "Mustafa.ai (v1.0)", type: "Full-Stack", status: "Completed", slug: "mustafa-ai" },
              { id: '2', title: "QuickBooks IES Suite", type: "Automation", status: "Completed", slug: "quickbooks" },
              { id: '3', title: "New Project Loading...", type: "NextGen AI", status: "In Progress", slug: "upcoming" }
            ]);
          }

          if (logs) setPresentLogs(logs);
          if (settings) setCurrentMission(settings.current_mission);
        }
      } catch (err) {
        console.error("🚨 Sync Fail:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    // Setup Keyboard Listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "~") {
        window.location.href = "/terminal";
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // CLEANUP: One single return to handle everything
    return () => {
      isMounted = false;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) { console.error(err); }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white p-6 lg:p-24 selection:bg-white/10 text-left font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_0%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(900px_circle_at_90%_10%,rgba(59,130,246,0.06),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* HERO SECTION */}
        <header className="mb-20">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 fill-mode-both">
            <div className="absolute top-0 right-0 hidden lg:block text-left">
              <div className="rounded-full border border-white/10 bg-white/5 backdrop-blur px-4 py-2 flex items-center gap-3">
                <span className="relative block h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold text-gray-300 tracking-[0.2em] uppercase font-mono">Seattle, WA</span>
              </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">Mustafa Ahmed</h1>

            <p className="text-neutral-500 text-xl lg:text-2xl max-w-2xl leading-relaxed mb-12 font-medium italic text-left">
              <span className="text-white font-semibold text-nowrap">Product Builder</span> with a passion for <span className="text-white font-semibold text-nowrap">shipping in public</span> and <span className="text-white font-semibold text-nowrap">creating something from nothing</span>.
            </p>

            <nav className="flex flex-wrap gap-3">
              {/* RESUME */}
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="rounded-[8px] border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white px-6 py-5 transition-all font-bold tracking-tight group"
              >
                <a href="/Mustafa_Ahmed_Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <FileDown size={18} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                  Resume
                </a>
              </Button>

              {/* GITHUB */}
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="rounded-[8px] border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white px-6 py-5 transition-all font-bold tracking-tight group"
              >
                <a href="https://github.com/Muuustafaa03" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github size={18} className="text-neutral-400 group-hover:text-white transition-colors" />
                  GitHub
                </a>
              </Button>

              {/* LINKEDIN */}
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="rounded-[8px] border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white px-6 py-5 transition-all font-bold tracking-tight group"
              >
                <a href="https://www.linkedin.com/in/mustafa-mm-ahmed/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Linkedin size={18} className="text-[#0A66C2] group-hover:text-[#0077b5] transition-colors" />
                  LinkedIn
                </a>
              </Button>

              {/* EMAIL GROUP WITH SEND OPTION */}
              <div className="flex items-center overflow-hidden rounded-[8px] border border-white/10 bg-white/5 text-sm font-bold tracking-tight">
                {/* Segment 1: The "Email" Label */}
                <a
                  className="px-5 py-2 text-white border-r border-white/10 font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-colors"
                >
                  Email
                </a>

                {/* Segment 2: The Send Icon */}
                <a
                  href={`mailto:${email}`}
                  className="px-4 py-2 text-white border-r border-white/10 hover:bg-white/10 transition-colors"
                  title="Send Email"
                >
                  <Send size={12} className="text-neutral-400" />
                </a>

                {/* Segment 3: The Copy Icon */}
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center px-4 py-2 hover:bg-white/10 transition-colors"
                  title="Copy Email"
                >
                  {emailCopied ? (
                    <Check size={14} className="text-green-500" />
                  ) : (
                    <Copy size={14} className="text-neutral-400" />
                  )}
                </button>
              </div>
            </nav>
          </div>
        </header>

        {/* MAJOR PILLARS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          {/* PILLAR: PAST */}
          <div className="group relative min-h-[420px] flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden transition-all hover:border-blue-500/20">
            <Link href="/past" className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <div className="relative z-10 flex-1 p-8 flex flex-col pointer-events-none">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold mb-2">Pillar • Past</p>
                  <h2 className="text-3xl font-bold tracking-tight text-white">The Archive</h2>
                </div>
                <FileText className="text-neutral-700 group-hover:text-blue-400" size={24} />
              </div>

              <div className="mb-6">
                <p className="text-[11px] text-neutral-400 italic line-clamp-2 leading-relaxed min-h-[32px]">
                  My 3 most recent projects
                </p>
              </div>

              <div className="space-y-3 flex-1">
                {displayItems.map((item) => (
                  <div key={item.id} className="relative z-30 pointer-events-auto">
                    <Link href={`/past/${item.slug}`} scroll={true}>
                      <div className="rounded-xl border border-white/5 bg-black/20 p-3 h-[64px] flex flex-col justify-between transition-all hover:bg-white/10 hover:border-blue-500/30 group/project">
                        <p className="text-sm font-bold text-white group-hover/project:text-blue-400 transition-colors">
                          {item.title}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-[8px] text-neutral-500 font-mono uppercase tracking-widest">
                            {item.type} Project →
                          </p>
                          <p className="text-[8px] text-blue-500 font-mono uppercase">{item.status}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] text-neutral-500 font-mono group-hover:text-white transition-colors">
                <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" /> View Architecture
              </div>
            </div>
          </div>

          {/* PILLAR: PRESENT */}
          <div className="group relative min-h-[420px] flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden transition-all hover:border-purple-500/20">
            {/* The Link - Ensure z-index is high enough to catch everything */}
            <Link href="/present" className="absolute inset-0 z-30">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            {/* Content Container - Set to z-20 so it sits under the link */}
            <div className="relative z-20 flex-1 p-8 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-bold mb-2">Pillar • Present</p>
                  <h2 className="text-3xl font-bold tracking-tight text-white">The Forge</h2>
                </div>
                <Activity className="text-neutral-700 group-hover:text-purple-400" size={24} />
              </div>

              <div className="mb-6">
                <p className="text-[11px] text-neutral-400 italic line-clamp-2 leading-relaxed min-h-[32px]">
                  {currentMission}
                </p>
              </div>

              <div className="space-y-3 flex-1">
                {presentLogs.map((log) => (
                  <div key={log.id} className="rounded-xl border border-white/5 bg-black/40 p-3 h-[64px] flex flex-col justify-between">
                    <p className="text-sm font-bold text-white">{log.title}</p>
                    <div className="flex justify-between items-center mt-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1 h-1 rounded-full ${log.type === 'win' ? 'bg-emerald-500' : log.type === 'wall' ? 'bg-red-500' : 'bg-purple-500'}`} />
                        <p className="text-[8px] text-neutral-500 font-mono uppercase tracking-widest">{log.type}</p>
                      </div>
                      <p className="text-[8px] text-neutral-700 font-mono">{new Date(log.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] text-neutral-500 font-mono group-hover:text-white transition-colors">
                <span className="w-1 h-1 rounded-full bg-purple-500 animate-pulse" /> View Full Build History
              </div>
            </div>
          </div>

          {/* PILLAR: FUTURE */}
          <div className="group relative min-h-[420px] flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden transition-all hover:border-emerald-500/20">
            <Link href="/future" className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <div className="relative z-10 flex-1 p-8 flex flex-col pointer-events-none">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-bold mb-2">Pillar • Future</p>
                  <h2 className="text-3xl font-bold tracking-tight text-white">The Market</h2>
                </div>
                <Sparkles className="text-neutral-700 group-hover:text-emerald-400" size={24} />
              </div>

              <div className="mb-6">
                <p className="text-[11px] text-neutral-400 italic leading-relaxed min-h-[32px]">
                  The top 3 highest rated ideas
                </p>
              </div>

              <div className="space-y-3 flex-1">
                {futureItems.map((item) => (
                  <div key={item.id} className="rounded-xl border border-white/5 bg-black/20 p-3 h-[64px] flex flex-col justify-between">
                    <p className="text-sm font-bold text-white">{item.concept}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-[8px] text-neutral-500 font-mono uppercase tracking-widest">{item.status}</p>
                      <p className="text-[8px] text-emerald-500 font-mono">↑ {item.votes}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] text-neutral-500 font-mono group-hover:text-white transition-colors">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> Open Market Proposals
              </div>
            </div>
          </div>
        </section>

        {/* MINOR PILLARS & FOOTER RENDERED AS PER YOUR ORIGINAL FILE */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/gallery" className="group relative h-[200px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden transition-all hover:border-orange-500/30">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 p-8 flex flex-col h-full text-left">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold tracking-tight text-white">The Gallery</h3>
                <ImageIcon className="text-neutral-700 group-hover:text-orange-400" size={20} />
              </div>
              <p className="mt-2 text-xs text-neutral-500 font-mono uppercase tracking-widest">Interface & Architecture Previews</p>
              <div className="mt-auto flex items-center gap-2 text-[10px] text-neutral-600 font-mono group-hover:text-orange-400 transition-colors">
                Explore visual archive <ChevronRight size={12} />
              </div>
            </div>
          </Link>

          <div className="group relative h-[200px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden transition-all hover:border-white/20">
            <div className="relative z-10 p-8 flex flex-col h-full text-left">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold tracking-tight text-white">The Feed</h3>
                <Activity className="text-neutral-700 group-hover:text-white" size={20} />
              </div>
              <p className="mt-2 text-xs text-neutral-500 font-mono uppercase tracking-widest">Socials • Media • Signals</p>
              <div className="mt-auto flex gap-6">
                <a href="https://www.linkedin.com/in/mustafa-mm-ahmed/" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-all"><Linkedin size={22} /></a>
                <a href="https://github.com/Muuustafaa03" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-all"><Github size={22} /></a>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-40 border-t border-white/5 pt-10 flex justify-between text-neutral-800 text-[9px] tracking-[0.4em] uppercase font-mono">
          <span>© 2026 — Mustafa Ahmed</span>
          <span>SaaS Engineer</span>
        </footer>
      </div>
    </main>
  );
}