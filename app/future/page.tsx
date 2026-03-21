"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Sparkles,
  HelpCircle,
  ListFilter,
  ThumbsUp,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function MarketplacePage() {
  const [submitted, setSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. FETCH DATA ON LOAD
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setSubmissions(data);
    } catch (err) {
      console.error("Error fetching backlog:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. SUBMIT CONCEPT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const submission = {
      alias: formData.get('alias') as string,
      contact: formData.get('contact') as string,
      concept: formData.get('concept') as string,
    };

    const { error } = await supabase
      .from('marketplace_submissions')
      .insert([submission]);

    if (error) {
      console.error("Submission failed:", error.message);
      return;
    }

    setSubmitted(true);
    form.reset();
    await fetchSubmissions(); // Refresh the list instantly

    // Reset the button state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  // 3. UPVOTE LOGIC
  const handleUpvote = async (id: string, currentVotes: number) => {
    const hasVoted = localStorage.getItem(`voted_${id}`);
    if (hasVoted) return;

    // Optimistic UI Update
    setSubmissions(prev =>
      prev.map(item => item.id === id ? { ...item, votes: item.votes + 1 } : item)
    );

    const { error } = await supabase
      .from('marketplace_submissions')
      .update({ votes: currentVotes + 1 })
      .eq('id', id);

    if (!error) {
      localStorage.setItem(`voted_${id}`, "true");
    } else {
      fetchSubmissions(); // Rollback if DB update fails
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-white p-6 lg:p-24 selection:bg-emerald-500/30 text-left">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_10%_10%,rgba(16,185,129,0.05),transparent_40%)]" />

      <div className="relative mx-auto max-w-4xl">
        {/* NAV */}
        <nav className="mb-12 flex justify-between items-center">
          <Button asChild variant="ghost" className="text-neutral-500 hover:text-white -ml-4 gap-2 font-mono text-[10px] uppercase tracking-widest">
            <Link href="/"><ChevronLeft size={14} /> Back to Hub</Link>
          </Button>
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-700">
            <Link href="/" className="hover:text-white transition-colors">Hub</Link>
            <span>/</span>
            <span className="text-emerald-500/50">Marketplace</span>
          </div>
        </nav>

        {/* HEADER */}
        <header className="mb-20">
          <div className="flex items-center gap-2 text-emerald-500 mb-4">
            <Sparkles size={18} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono">Future Systems</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter mb-8">The Marketplace</h1>
          <p className="text-neutral-400 text-xl max-w-2xl leading-relaxed italic">
            I engineer solutions for high-value problems. Submit a business problem, an automation request, or a Micro-SaaS concept.
          </p>
        </header>

        {/* FORM SECTION */}
        <section className="mb-24 p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative z-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] font-mono mb-8 text-neutral-400">Upload Idea</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-neutral-600 font-mono tracking-widest px-1">Identity / Alias (Optional)</label>
                  <input name="alias" type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all" placeholder="e.g. Mustafa Ahmed" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-neutral-600 font-mono tracking-widest px-1">Contact / Email (Optional)</label>
                  <input name="contact" type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all" placeholder="For follow-up discussions" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold text-neutral-600 font-mono tracking-widest px-1">The Problem / Idea *</label>
                <textarea name="concept" required rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all" placeholder="Describe the repetitive task or business problem you want solved." />
              </div>

              <Button type="submit" disabled={submitted} className={`w-full py-7 font-extrabold uppercase tracking-[0.2em] text-[11px] transition-all duration-500 ${submitted ? "bg-emerald-900/40 text-emerald-400 border border-emerald-500/30" : "bg-white text-black hover:bg-emerald-400"}`}>
                {submitted ? <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Idea Uploaded</span> : "Submit to Marketplace"}
              </Button>
            </form>
          </div>
        </section>

        {/* INFO CARDS */}
        <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={16} className="text-emerald-500" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest font-mono text-neutral-500">How to choose?</h3>
            </div>
            <p className="text-lg font-bold tracking-tight text-white leading-snug">Think of any manual process that takes you more than 20 minutes a week.</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-emerald-500" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest font-mono text-neutral-500">The Impact</h3>
            </div>
            <p className="text-lg font-bold tracking-tight text-white leading-snug">Every accepted project is built with a focus on technical problem solving and customer focus.</p>
          </div>
        </section>

        {/* BACKLOG SECTION */}
        <section className="mb-24">
          <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
            <ListFilter size={18} className="text-emerald-500" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 font-mono">Backlog Status</h2>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center gap-2 text-neutral-500 font-mono text-[10px] animate-pulse">
                <Loader2 size={14} className="animate-spin" /> Synchronizing with Supabase...
              </div>
            ) : submissions.length === 0 ? (
              <p className="text-neutral-600 italic text-sm font-mono">No concepts in orbit yet.</p>
            ) : (
              submissions.map((item) => {
                const userHasVoted = typeof window !== 'undefined' && localStorage.getItem(`voted_${item.id}`);
                return (
                  <div key={item.id} className="group flex items-center justify-between p-7 rounded-xl border border-white/5 bg-white/[0.01] hover:border-emerald-500/20 transition-all duration-300">
                    <div className="text-left pr-4">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-bold text-xl tracking-tight text-white">
                          {item.concept.length > 60 ? item.concept.substring(0, 60) + "..." : item.concept}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${item.status === 'Completed' ? 'bg-blue-500/10 text-blue-400' :
                          item.status === 'In Development' ? 'bg-emerald-500/10 text-emerald-500' :
                            'bg-yellow-500/10 text-yellow-500'
                          }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-500 font-medium italic">Submitted by: {item.alias || "Anonymous"}</p>
                    </div>

                    <button
                      onClick={() => handleUpvote(item.id, item.votes)}
                      disabled={!!userHasVoted}
                      className={`flex flex-col items-center gap-1 transition-all ${userHasVoted ? 'cursor-default' : 'cursor-pointer active:scale-90'}`}
                    >
                      <ThumbsUp size={18} className={`transition-colors ${userHasVoted ? 'text-emerald-500 fill-emerald-500/20' : 'text-neutral-700 hover:text-emerald-400'}`} />
                      <span className={`text-[10px] font-mono font-bold transition-colors ${userHasVoted ? 'text-emerald-500' : 'text-neutral-600'}`}>
                        {item.votes}
                      </span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <footer className="mt-40 border-t border-white/5 pt-10 text-center">
          <p className="text-neutral-900 text-[9px] font-mono uppercase tracking-[1em]">Future System v1.0.7</p>
        </footer>
      </div>
    </main>
  );
}