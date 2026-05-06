"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ArrowUpRight, Image as ImageIcon, Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const gallerySections = [
  {
    title: "Archive Systems",
    items: [
      {
        title: "QuickBooks IES Auditor",
        description: "The core Streamlit interface used to validate 41-character constraints across thousands of rows.",
        projectLink: "/past/quickbooks",
        image: "/images/qb-auditor-main.png",
        tag: "Tool Interface"
      },
      {
        title: "Hidden Terminal Interface",
        description: "A functional command-line overlay built into the portfolio for updating portfolio in real time.",
        projectLink: "/past/mustafa-ai",
        image: "/images/terminal-screenshot.png",
        tag: "System Core"
      },
    ]
  },
  {
    title: "Altar",
    items: [
      {
        title: "Altar Home Ritual",
        description: "Primary ritual setup screen where users choose what to sacrifice and for how long.",
        projectLink: "/past/altar",
        image: "/images/altarhome.png",
        tag: "Ritual Setup"
      },
      {
        title: "Altar Active Session",
        description: "In-session focus state visualizing the active sacrifice in a minimal immersive interface.",
        projectLink: "/past/altar",
        image: "/images/altaractive.png",
        tag: "Focus State"
      },
    ]
  },
  {
    title: "Orbit",
    items: [
      {
        title: "Constellation view",
        description:
          "The spatial canvas: tasks as planets on spokes, workflow rings, and sun-centered progress.",
        projectLink: "/past/orbit",
        image: "/images/constellation.png",
        tag: "3D board",
      },
      {
        title: "List view",
        description:
          "Dense task list with priorities and due phrases—same project, alternate read when you want rows.",
        projectLink: "/past/orbit",
        image: "/images/list.png",
        tag: "List mode",
      },
    ],
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="relative min-h-screen bg-black text-white p-6 lg:p-24 selection:bg-orange-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_90%_90%,rgba(249,115,22,0.04),transparent_40%)]" />

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            className="max-w-full max-h-[85vh] rounded-lg shadow-2xl border border-white/10 object-contain"
            alt="Full view"
          />
        </div>
      )}

      <div className="relative mx-auto max-w-6xl">
        <nav className="mb-20 flex justify-between items-center">
          <Button asChild variant="ghost" className="text-neutral-500 hover:text-white -ml-4 gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
            <Link href="/">
              <ChevronLeft size={14} /> Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-neutral-700 font-mono text-[10px] tracking-widest uppercase">
            <span>Root</span>
            <span>/</span>
            <span className="text-orange-500/50">The Gallery</span>
          </div>
        </nav>

        <header className="mb-16 max-w-2xl text-left">
          <div className="flex items-center gap-2 text-orange-500 mb-4">
            <Camera size={18} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono text-left">Visual Archive</span>
          </div>
          <h1 className="text-6xl font-bold tracking-tighter mb-4 text-white text-left">The Gallery</h1>
          <p className="text-neutral-500 text-lg leading-relaxed italic text-left">
            Visual proof of logic, interfaces, and architecture. Click images for full view.
          </p>
        </header>

        <div className="space-y-16">
          {gallerySections.map((section) => (
            <section key={section.title}>
              <div className="mb-8">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 font-mono">
                  {section.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {section.items.map((item, idx) => (
                  <div key={`${section.title}-${idx}`} className="group flex flex-col space-y-6">
                    <div
                      className="relative aspect-video w-full rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all group-hover:border-orange-500/40 cursor-zoom-in"
                      onClick={() => setSelectedImage(item.image)}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-[1.02]"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/600x400/000000/FFFFFF/png?text=Image+Not+Found";
                        }}
                      />

                      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-widest text-orange-400 border border-orange-500/20">
                        {item.tag}
                      </div>
                    </div>

                    <div className="px-2 text-left">
                      <Link href={item.projectLink} className="inline-flex items-center group/title">
                        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover/title:text-orange-400 transition-colors mr-2">
                          {item.title}
                        </h3>
                        <ArrowUpRight size={18} className="text-neutral-700 group-hover/title:text-orange-400 transition-transform group-hover/title:-translate-y-1 group-hover/title:translate-x-1" />
                      </Link>
                      <p className="text-neutral-500 text-sm leading-relaxed max-w-md italic text-left">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-40 border-t border-white/5 pt-10 text-center">
          <p className="text-neutral-900 text-[9px] font-mono uppercase tracking-[1em]">Visualization Module v1.0</p>
        </footer>
      </div>
    </main>
  );
}