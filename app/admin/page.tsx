"use client";
import { useRouter } from "next/navigation";

export default function DecoyPage() {
  const router = useRouter();

  return (
    <div className="h-screen bg-[#050505] text-[#ff3b3b] font-mono flex flex-col items-center justify-center p-10">
      <div className="border border-[#ff3b3b]/30 bg-[#ff3b3b]/5 p-8 rounded-lg max-w-lg w-full space-y-4 shadow-[0_0_50px_rgba(255,59,59,0.1)]">
        <h1 className="text-2xl font-bold tracking-tighter uppercase italic">
          [!] Security Violation [!]
        </h1>
        <div className="space-y-2 text-sm leading-relaxed text-[#ff3b3b]/80">
          <p> Unauthorized access attempt detected at <span className="text-white">{new Date().toLocaleTimeString()}</span>.</p>
          <p> Scanning biometric signature...</p>
          <p> <span className="bg-[#ff3b3b] text-black px-1">FAILED</span>: Signature does not match "Mustafa Ahmed".</p>
          <p className="pt-4 italic text-white/60">
            "Listen, I'm sure you're a great developer, but this door is locked. 
            Try looking at the projects on the main page instead—they're much more interesting than my database settings."
          </p>
        </div>
        <button 
          onClick={() => router.push("/")}
          className="w-full mt-6 border border-[#ff3b3b] py-2 hover:bg-[#ff3b3b] hover:text-black transition-all uppercase text-[10px] font-bold tracking-[0.3em]"
        >
          Return to Hub
        </button>
      </div>
    </div>
  );
}