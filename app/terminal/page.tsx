"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Terminal, Send, Trash2, RefreshCcw, LogOut, Loader2, Check, Globe } from "lucide-react";

export default function ControlCenter() {
    const [pass, setPass] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const [futureItems, setFutureItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // --- STATE: GLOBAL MISSION ---
    const [mission, setMission] = useState("");

    // --- STATE: PRESENT PILLAR (THE FORGE) ---
    const [logTitle, setLogTitle] = useState("");
    const [logContent, setLogContent] = useState("");
    const [logType, setLogType] = useState("update");

    const SECRET = process.env.NEXT_PUBLIC_ADMIN_KEY;

    useEffect(() => {
        if (isAuth) fetchAll();
    }, [isAuth]);

    const [presentLogs, setPresentLogs] = useState<any[]>([]); // Add this state at the top

    const fetchAll = async () => {
        setLoading(true);

        // Fetch Future Concepts
        const { data: future } = await supabase.from('marketplace_submissions').select('*').order('created_at', { ascending: false });

        // Fetch Present Logs
        const { data: logs } = await supabase.from('present_logs').select('*').order('created_at', { ascending: false }).limit(5);

        // Fetch Global Mission
        const { data: settings } = await supabase.from('site_settings').select('current_mission').single();

        if (future) setFutureItems(future);
        if (logs) setPresentLogs(logs); // Update state here
        if (settings) setMission(settings.current_mission);

        setLoading(false);
    };

    // --- ACTIONS ---

    const updateMission = async () => {
        const { error } = await supabase.from('site_settings').update({ current_mission: mission }).eq('id', 'global');
        if (error) alert("Error: " + error.message);
        else alert("Global Mission Updated.");
    };

    const handlePostLog = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!logTitle || !logContent) return;

        const { error } = await supabase
            .from('present_logs')
            .insert([{ title: logTitle, content: logContent, type: logType }]);

        if (error) {
            alert("Error: " + error.message);
        } else {
            // 1. Clear the form fields
            setLogTitle("");
            setLogContent("");

            // 2. IMMEDIATELY REFRESH THE LIST
            // This pulls the fresh data from Supabase and updates the UI instantly
            await fetchAll();

            alert("Log pushed to The Forge.");
        }
    };

    const updateStatus = async (id: string, currentStatus: string) => {
        const statuses = ["Submitted", "In Development", "Completed"];
        const nextIndex = (statuses.indexOf(currentStatus) + 1) % statuses.length;
        const newStatus = statuses[nextIndex];

        await supabase.from('marketplace_submissions').update({ status: newStatus }).eq('id', id);
        fetchAll();
    };

    const deleteFuture = async (id: string) => {
        if (!confirm("Delete this concept?")) return;
        await supabase.from('marketplace_submissions').delete().eq('id', id);
        fetchAll();
    };

    const deleteLog = async (id: string) => {
        if (!confirm("Are you sure you want to remove this log from the timeline?")) return;

        const { error } = await supabase
            .from('present_logs')
            .delete()
            .eq('id', id);

        if (error) {
            alert("Error: " + error.message);
        } else {
            // We don't have a 'fetchAllLogs' yet, so we'll just refresh the whole view
            fetchAll();
        }
    };

    // --- AUTH UI ---
    if (!isAuth) {
        return (
            <div className="h-screen bg-black flex items-center justify-center p-6 font-mono">
                <div className="w-full max-w-sm space-y-4">
                    <h2 className="text-emerald-500 text-[10px] uppercase tracking-[0.4em] text-center mb-8 italic">// Access_Protocol_Required</h2>
                    <input
                        type="password"
                        autoFocus
                        className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-emerald-500 outline-none transition-all"
                        placeholder="ENTER_ENCRYPTION_KEY"
                        onChange={(e) => {
                            if (e.target.value === SECRET) setIsAuth(true);
                            setPass(e.target.value);
                        }}
                    />
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white p-6 lg:p-12 font-mono text-left selection:bg-emerald-500/30">
            <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                    <Terminal className="text-emerald-500 animate-pulse" size={20} />
                    <h1 className="text-lg font-bold tracking-tighter uppercase italic">Mustafa_Command_v1.0</h1>
                </div>
                <button onClick={() => window.location.href = "/"} className="text-neutral-600 hover:text-white transition-colors flex items-center gap-2 text-[10px] uppercase tracking-widest">
                    Exit_Session <LogOut size={16} />
                </button>
            </header>

            <div className="max-w-6xl mx-auto space-y-12">

                {/* GLOBAL SETTINGS SECTION */}
                <section className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                    <div className="flex items-center gap-2 mb-4 text-emerald-500">
                        <Globe size={14} />
                        <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">Global Site Status</h2>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            value={mission}
                            onChange={(e) => setMission(e.target.value)}
                            className="flex-1 bg-black border border-white/10 rounded-lg p-3 text-xs text-white focus:border-emerald-500 outline-none"
                            placeholder="Primary site mission statement..."
                        />
                        <button onClick={updateMission} className="px-8 bg-emerald-600 hover:bg-emerald-500 text-black py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                            Update_Live_Mission
                        </button>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* LEFT: THE FORGE (PRESENT PILLAR) */}
                    <section className="space-y-8 text-left">
                        <div>
                            <h2 className="text-purple-400 text-[10px] uppercase tracking-widest font-bold border-b border-purple-400/20 pb-2 mb-6">
                                The Forge (Active Logs)
                            </h2>

                            {/* 1. THE ADD FORM */}
                            <form onSubmit={handlePostLog} className="bg-neutral-900/40 p-6 rounded-xl border border-white/5 space-y-4 mb-10">
                                <p className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Push New Update</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        value={logTitle}
                                        onChange={(e) => setLogTitle(e.target.value)}
                                        className="bg-black border border-white/10 rounded p-3 text-xs text-white focus:border-purple-500 outline-none transition-all"
                                        placeholder="Log Title (e.g. Optimized Auth Logic)"
                                    />
                                    <select
                                        value={logType}
                                        onChange={(e) => setLogType(e.target.value)}
                                        className="bg-black border border-white/10 rounded p-3 text-[10px] text-neutral-400 uppercase font-bold cursor-pointer focus:border-purple-500 outline-none"
                                    >
                                        <option value="update">Type: Update</option>
                                        <option value="win">Type: Win</option>
                                        <option value="wall">Type: Wall</option>
                                        <option value="pivot">Type: Pivot</option>
                                    </select>
                                </div>
                                <textarea
                                    value={logContent}
                                    onChange={(e) => setLogContent(e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded p-3 text-xs text-white leading-relaxed focus:border-purple-500 outline-none"
                                    rows={4}
                                    placeholder="What did you build, break, or solve today?"
                                />
                                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-lg shadow-purple-500/10">
                                    Push_To_Forge_Timeline
                                </button>
                            </form>

                            {/* 2. THE LOG HISTORY (MANAGEMENT) */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-2">
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-600 font-bold">Recent Timeline Entries</p>
                                    <span className="text-[8px] font-mono text-neutral-800">{presentLogs.length} TOTAL</span>
                                </div>

                                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {presentLogs.length === 0 && (
                                        <p className="text-neutral-800 text-[10px] uppercase italic p-4 border border-dashed border-white/5 rounded-lg text-center">
                                            Timeline is empty. Strike the iron.
                                        </p>
                                    )}

                                    {presentLogs.map(log => (
                                        <div key={log.id} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-lg group hover:border-white/10 transition-all">
                                            <div className="truncate pr-4 flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-1 h-1 rounded-full ${log.type === 'win' ? 'bg-emerald-500' :
                                                        log.type === 'wall' ? 'bg-red-500' : 'bg-purple-500'
                                                        }`} />
                                                    <p className="text-sm font-bold text-white text-left">{log.title}</p>
                                                </div>
                                                <p className="text-[8px] text-neutral-600 font-mono italic">
                                                    {new Date(log.created_at).toLocaleDateString()} • {log.type}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => deleteLog(log.id)}
                                                className="text-neutral-700 hover:text-red-500 transition-colors p-2"
                                                title="Delete Log"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* RIGHT: THE MARKET (FUTURE) */}
                    <section className="space-y-6">
                        <div className="flex justify-between items-end border-b border-emerald-400/20 pb-2">
                            <h2 className="text-emerald-400 text-[10px] uppercase tracking-widest font-bold">The Market (Future Backlog)</h2>
                            {loading && <Loader2 size={12} className="animate-spin text-neutral-500" />}
                        </div>

                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {futureItems.length === 0 && <p className="text-neutral-700 text-[10px] uppercase italic">Backlog is currently empty.</p>}
                            {futureItems.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-neutral-900/30 border border-white/5 rounded-lg">
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-white uppercase tracking-tight">{item.concept}</p>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border ${item.status === 'Completed' ? 'border-blue-500/30 text-blue-400' :
                                                item.status === 'In Development' ? 'border-emerald-500/30 text-emerald-400' :
                                                    'border-yellow-500/30 text-yellow-400'
                                                }`}>
                                                {item.status}
                                            </span>
                                            <span className="text-[8px] text-neutral-600 uppercase tracking-tighter">By: {item.alias || "Anon"}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => updateStatus(item.id, item.status)} title="Cycle Status" className="text-neutral-600 hover:text-emerald-400 transition-colors">
                                            <RefreshCcw size={16} />
                                        </button>
                                        <button onClick={() => deleteFuture(item.id)} className="text-neutral-600 hover:text-red-500 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </main>
    );
}