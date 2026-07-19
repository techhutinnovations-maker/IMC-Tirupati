import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, User, Mail, Smartphone, Briefcase, Check, ArrowUpRight,
    Sparkles, ChevronRight, ArrowRight, AlertCircle
} from "lucide-react";

// Import the structured data from your data.ts
import { TRIBE_MEMBERS } from "../data";
import { ArrowLeft } from "lucide-react";

// --- CONFIG ---
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwYl1500YJyaRQsW_y8cue5RHXciOLkS6ng6ICJtNPO6hLc4qAzaehd2qgxjKIDPsNZ/exec";
const WHATSAPP_GROUP_LINK = "https://wa.me/919550815185";
const LATEST_EVENTS_LINK = "https://linktr.ee/imc_tirupati";

export default function JoinTeamPage({ onBackToHome }: { onBackToHome?: () => void }) {
    // --- MODAL & FORM STATE ---
    const [showModal, setShowModal] = useState(false);
    const [modalStep, setModalStep] = useState<"terms" | "details" | "submitting" | "success">("terms");
    const [agreed, setAgreed] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", contact: "", profession: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});

    // --- HANDLERS ---
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "").slice(0, 10);
        setFormData({ ...formData, contact: val });
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (formData.name.trim().length < 2) newErrors.name = "Please enter your full name";
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Enter a valid email address";
        if (formData.contact.length !== 10) newErrors.contact = "Phone number must be 10 digits";
        if (formData.profession.trim().length < 2) newErrors.profession = "Please tell us what you do";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setModalStep("submitting");
        try {
            const now = new Date();
            const payload = new URLSearchParams();

            payload.append("name", formData.name);
            payload.append("email", formData.email);
            payload.append("contact", formData.contact);
            payload.append("profession", formData.profession);
            payload.append("source", "imc-website");
            payload.append("submittedAt", now.toISOString());

            // MUST MATCH data.submittedTime in your Script
            payload.append(
                "submittedTime",
                now.toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "medium",
                    hour12: true,
                })
            );

            // MUST MATCH data.termsAndConditions in your Script
            payload.append(
                "termsAndConditions",
                agreed ? "Agreed" : "Not Agreed"
            );

            await fetch(GOOGLE_SHEET_URL, {
                method: "POST",
                mode: "no-cors", // This is correct for Google Scripts
                body: payload,
            });

            setModalStep("success");
            setTimeout(() => { window.location.href = WHATSAPP_GROUP_LINK; }, 2500);
        } catch (error) {
            setModalStep("details");
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30 font-sans overflow-x-hidden">

            {/* --- NAVIGATION --- */}
            <nav className="fixed top-0 w-full z-[70] p-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] px-8 py-4 shadow-2xl">
                    <button
                        onClick={() => onBackToHome?.()}
                        className="flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>

                    <div className="text-xl font-black tracking-tighter italic flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center not-italic text-sm text-white">I</div>
                        IMC TRIBE
                    </div>
                    <button
                        onClick={() => { setShowModal(true); setModalStep("terms"); }}
                        className="bg-white text-black px-6 py-2 rounded-xl font-bold text-sm hover:bg-orange-600 hover:text-white transition-all active:scale-95"
                    >
                        Join Now
                    </button>
                </div>
            </nav>

            <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-4 overflow-hidden">
                {/* Background Glows - Adjusted for mobile to prevent horizontal scroll */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 md:w-[500px] md:h-[500px] bg-orange-600/20 rounded-full blur-[80px] md:blur-[120px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-5xl mx-auto text-center"
                >
                    {/* Modern Badge - Smaller on mobile */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 md:mb-10">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                            Phase 01 <span className="text-zinc-700 mx-1">/</span> The Collective
                        </span>
                    </div>

                    {/* Headline - Fluid scaling: text-5xl on mobile, text-9xl on desktop */}
                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-tighter mb-6 md:mb-8 leading-[0.9] uppercase text-white">
                        Meet the <br className="hidden sm:block" />
                        <span className="text-orange-500 italic relative inline-block">
                            Curators.
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="absolute bottom-1 md:bottom-4 left-0 h-[3px] md:h-[6px] bg-orange-600/30 -z-10"
                            />
                        </span>
                    </h1>

                    <p className="max-w-md md:max-w-lg mx-auto text-zinc-400 text-sm md:text-lg mb-10 md:mb-12 px-4">
                        A premium collective of digital visionaries. Join the next generation of creative curation.
                    </p>

                    {/* Button Group - Stacks on mobile, Row on desktop */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
                        <button
                            onClick={() => { setShowModal(true); setModalStep("terms"); }}
                            className="w-full sm:w-auto px-10 py-4 md:py-5 bg-orange-600 text-white font-black rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-600/20"
                        >
                            Join as a member <ArrowRight size={18} />
                        </button>

                        <a
                            href={LATEST_EVENTS_LINK}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-auto px-10 py-4 md:py-5 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors backdrop-blur-sm"
                        >
                            Events <ArrowUpRight size={18} />
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* --- STAGGERED PHOTO GRID --- */}
            <section className="px-6 pb-40">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                        {TRIBE_MEMBERS.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: (idx % 3) * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative group rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 aspect-[3/4] 
                                    ${idx % 2 === 1 ? 'mt-12 md:mt-0' : ''} 
                                    ${idx % 3 === 1 ? 'md:mt-24' : ''}
                                    ${idx % 3 === 2 ? 'md:mt-12' : ''}
                                `}
                            >
                                <img src={member.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" alt={member.name} />

                                {/* Glass Label Overlay */}
                                <div className="absolute bottom-4 left-4 right-4 p-5 rounded-[1.8rem] bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <div className="flex flex-col">
                                        <p className="text-[14px] font-black leading-none mb-1 text-white uppercase tracking-tighter">{member.name}</p>
                                        <p className="text-[9px] uppercase tracking-[0.2em] text-orange-500 font-black">{member.role}</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center shrink-0">
                                        <ArrowUpRight size={14} className="text-white" />
                                    </div>
                                </div>

                                <div className="absolute bottom-6 left-6 group-hover:opacity-0 transition-opacity duration-300">
                                    <p className="text-sm font-black tracking-tight text-white/80 uppercase">{member.name}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- REGISTRATION MODAL --- */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-3xl bg-black/80">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-full max-w-xl bg-[#0F0F0F] border border-white/10 rounded-[3rem] p-10 md:p-14 overflow-hidden shadow-2xl"
                        >
                            <button onClick={() => setShowModal(false)} className="absolute top-10 right-10 text-slate-500 hover:text-white transition-colors">
                                <X size={28} />
                            </button>

                            {/* STEP 1: TERMS */}
                            {modalStep === "terms" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="text-orange-500" />
                                        <span className="text-orange-500 font-black tracking-widest text-[10px] uppercase">Phase 01 — Covenant</span>
                                    </div>
                                    <h2 className="text-5xl font-black tracking-tighter uppercase leading-[0.9]">The <br /> Protocol.</h2>
                                    <div className="space-y-4">
                                        {[
                                            { t: "Respect Privacy", d: "What happens in the tribe, stays here." },
                                            { t: "Active Value", d: "Contribute more than you consume." },
                                            { t: "Zero Ego", d: "High-agency mindset over titles." }
                                        ].map((rule, i) => (
                                            <div key={i} className="flex gap-5 items-center bg-white/5 p-5 rounded-2xl border border-white/5">
                                                <span className="text-orange-500 font-black italic text-xl">0{i + 1}</span>
                                                <div>
                                                    <p className="font-bold text-white text-sm uppercase">{rule.t}</p>
                                                    <p className="text-xs text-slate-500">{rule.d}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <label className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl cursor-pointer border border-white/5 group">
                                        <input
                                            type="checkbox"
                                            checked={agreed}
                                            onChange={e => setAgreed(e.target.checked)}
                                            className="w-5 h-5 accent-orange-600 rounded bg-transparent"
                                        />
                                        <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors uppercase tracking-widest">I swear to uphold the code</span>
                                    </label>
                                    <button
                                        disabled={!agreed}
                                        onClick={() => setModalStep("details")}
                                        className="w-full py-6 bg-white disabled:opacity-20 text-black font-black rounded-2xl text-xl hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-2 shadow-xl"
                                    >
                                        I Accept <ChevronRight size={20} />
                                    </button>
                                </motion.div>
                            )}

                            {/* STEP 2: FORM */}
                            {modalStep === "details" && (
                                <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2 mb-6">
                                        <h2 className="text-4xl font-black tracking-tighter uppercase">Identity.</h2>
                                        <p className="text-slate-500 text-sm font-medium">Requesting entry into the collective.</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="relative">
                                            <div className={`flex items-center gap-4 px-6 py-5 bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-2xl focus-within:border-orange-500 transition-all`}>
                                                <User size={18} className="text-slate-500" />
                                                <input required type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="bg-transparent outline-none w-full font-bold text-white placeholder:text-slate-600" />
                                            </div>
                                            {errors.name && <p className="text-[10px] text-red-500 font-black mt-2 ml-4 flex items-center gap-1 uppercase tracking-tighter"><AlertCircle size={10} /> {errors.name}</p>}
                                        </div>

                                        <div className="relative">
                                            <div className={`flex items-center gap-4 px-6 py-5 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl focus-within:border-orange-500 transition-all`}>
                                                <Mail size={18} className="text-slate-500" />
                                                <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="bg-transparent outline-none w-full font-bold text-white placeholder:text-slate-600" />
                                            </div>
                                            {errors.email && <p className="text-[10px] text-red-500 font-black mt-2 ml-4 flex items-center gap-1 uppercase tracking-tighter"><AlertCircle size={10} /> {errors.email}</p>}
                                        </div>

                                        <div className="relative">
                                            <div className={`flex items-center gap-4 px-6 py-5 bg-white/5 border ${errors.contact ? 'border-red-500' : 'border-white/10'} rounded-2xl focus-within:border-orange-500 transition-all`}>
                                                <Smartphone size={18} className="text-slate-500" />
                                                <input required type="tel" placeholder="WhatsApp Number" value={formData.contact} onChange={handlePhoneChange} className="bg-transparent outline-none w-full font-bold text-white placeholder:text-slate-600" />
                                            </div>
                                            {errors.contact && <p className="text-[10px] text-red-500 font-black mt-2 ml-4 flex items-center gap-1 uppercase tracking-tighter"><AlertCircle size={10} /> {errors.contact}</p>}
                                        </div>

                                        <div className="relative">
                                            <div className={`flex items-center gap-4 px-6 py-5 bg-white/5 border ${errors.profession ? 'border-red-500' : 'border-white/10'} rounded-2xl focus-within:border-orange-500 transition-all`}>
                                                <Briefcase size={18} className="text-slate-500" />
                                                <input required type="text" placeholder="What do you build? (Profession)" value={formData.profession} onChange={e => setFormData({ ...formData, profession: e.target.value })} className="bg-transparent outline-none w-full font-bold text-white placeholder:text-slate-600" />
                                            </div>
                                            {errors.profession && <p className="text-[10px] text-red-500 font-black mt-2 ml-4 flex items-center gap-1 uppercase tracking-tighter"><AlertCircle size={10} /> {errors.profession}</p>}
                                        </div>
                                    </div>

                                    <button type="submit" className="w-full py-6 bg-orange-600 text-white font-black rounded-2xl text-xl mt-6 shadow-xl shadow-orange-600/20 active:scale-95 transition-all uppercase tracking-tight">
                                        Request Entry
                                    </button>
                                </motion.form>
                            )}

                            {/* STEP 3: SUBMITTING */}
                            {modalStep === "submitting" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center flex flex-col items-center">
                                    <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mb-8" />
                                    <h3 className="text-2xl font-black uppercase tracking-tighter italic">Vetting Identity...</h3>
                                    <p className="text-slate-500 text-sm mt-2">Encrypting your data for the tribe.</p>
                                </motion.div>
                            )}

                            {/* STEP 4: SUCCESS */}
                            {modalStep === "success" && (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center space-y-6">
                                    <div className="w-24 h-24 bg-orange-600 rounded-[2.5rem] flex items-center justify-center mx-auto rotate-12 shadow-[0_0_50px_rgba(234,88,12,0.4)]">
                                        <Check size={48} strokeWidth={4} className="text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-5xl font-black tracking-tighter uppercase italic text-orange-500 leading-none">Verified.</h3>
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Welcome home. Joining the inner circle...</p>
                                    </div>
                                    <div className="pt-4">
                                        <a href={WHATSAPP_GROUP_LINK} className="inline-block px-12 py-5 bg-white text-black font-black rounded-2xl hover:bg-orange-600 hover:text-white transition-all shadow-xl">
                                            Go to Community
                                        </a>
                                        <p className="mt-4 text-[9px] text-slate-600 font-bold uppercase tracking-widest">Redirecting automatically in 2s</p>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}