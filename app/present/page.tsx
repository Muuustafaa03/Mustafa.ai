"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Activity,
  Zap,
  ShieldAlert,
  CheckCircle2,
  History,
  Loader2,
  ExternalLink,
  Github
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function PresentPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('present_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setLogs(data);
    } catch (err) {
      console.error("Error fetching logs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to get the right icon per log type
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'win': return <CheckCircle2 size={14} className="text-emerald-500" />;
      case 'wall': return <ShieldAlert size={14} className="text-red-500" />;
      case 'pivot': return <Zap size={14} className="text-purple-400" />;
      default: return <Activity size={14} className="text-blue-400" />;
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-white p-6 lg:p-24 selection:bg-purple-500/30 text-left">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_90%_10%,rgba(168,85,247,0.05),transparent_40%)]" />

      <div className="relative mx-auto max-w-4xl">
        {/* NAVIGATION */}
        <nav className="mb-12 flex justify-between items-center">
          <Button asChild variant="ghost" className="text-neutral-500 hover:text-white -ml-4 gap-2 font-mono text-[10px] uppercase tracking-widest">
            <Link href="/"><ChevronLeft size={14} /> Back to Hub</Link>
          </Button>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-purple-500/50">
            System • Active_Build
          </div>
        </nav>

        {/* HEADER: THE BLUEPRINT */}
        <header className="mb-20">
          <div className="flex items-center gap-2 text-purple-500 mb-4">
            <Activity size={18} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono">Current Focus</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter mb-8 italic">The Forge</h1>
          <p className="text-neutral-400 text-xl max-w-2xl leading-relaxed">
            Currently engineering a <span className="text-white">Full-Stack SaaS Portfolio</span>.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest gap-2">
              <Github size={14} /> Source Code
            </Button>
            <Button variant="outline" className="bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20 text-[10px] font-bold uppercase tracking-widest gap-2">
              <ExternalLink size={14} /> Live Staging
            </Button>
          </div>
        </header>

        {/* SECTION: ARCHITECTURAL INTENT (Static) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 border-y border-white/5 py-12">
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-mono">Friction</h3>
            <p className="text-sm font-medium leading-relaxed text-neutral-300">I want a portfolio that can showcase my work and promote my brand.</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-mono">Purpose</h3>
            <p className="text-sm font-medium leading-relaxed text-neutral-300">To demonstrate problem solving skills and grow a community.</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-mono">Discovery</h3>
            <p className="text-sm font-medium leading-relaxed text-neutral-300">Having a good landing page is the first step is connecting with audiences.</p>
          </div>
        </section>

        {/* SECTION: THE PULSE (Dynamic Logs) */}
        <section className="space-y-10">
          <div className="flex items-center gap-3 mb-12">
            <History size={18} className="text-neutral-700" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 font-mono">Development Logs</h2>
          </div>

          <div className="relative pl-8 border-l border-white/10 space-y-12">
            {loading ? (
              <div className="flex items-center gap-2 text-neutral-600 font-mono text-[10px]">
                <Loader2 size={14} className="animate-spin" /> Synchronizing logs...
              </div>
            ) : logs.length === 0 ? (
              <p className="text-neutral-600 italic text-sm font-mono">The forge is silent. Awaiting the first strike.</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-black border border-white/20 flex items-center justify-center group-hover:border-purple-500 transition-colors">
                    <div className="h-1 w-1 rounded-full bg-neutral-700 group-hover:bg-purple-500" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-neutral-600">
                        {new Date(log.created_at).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/5 font-mono text-[9px] font-bold uppercase tracking-tighter text-neutral-400">
                        {getLogIcon(log.type)}
                        {log.type}
                      </div>
                    </div>

                    <h4 className="text-xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">
                      {log.title}
                    </h4>

                    <p className="text-neutral-500 text-sm leading-relaxed max-w-2xl font-medium">
                      {log.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <footer className="mt-40 opacity-20 hover:opacity-100 transition-opacity">
          <p className="text-[9px] font-mono uppercase tracking-[0.5em] text-center">Protocol: Build_In_Public // Active</p>
        </footer>
      </div>
    </main>
  );
}