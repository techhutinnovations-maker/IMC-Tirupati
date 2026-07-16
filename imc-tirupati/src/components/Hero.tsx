import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Play, Sparkles, MapPin, Users, Zap } from "lucide-react";
import { STATS } from "../data";
import { useRef } from "react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Parallax effects for background elements
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div 
      ref={containerRef}
      id="home" 
      className="relative min-h-[100vh] lg:min-h-[110vh] flex flex-col justify-center overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y: y1, opacity }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=80"
            alt="Community"
            className="w-full h-full object-cover opacity-30 dark:opacity-20 scale-110 blur-[2px] dark:blur-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-slate-950/50 dark:to-slate-950" />
        </motion.div>

        {/* Animated Gradient Blobs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 shadow-sm"
            >
              <Sparkles size={14} className="text-orange-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
                Tirupati's Largest Lifestyle Tribe
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter"
            >
              FIND YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600">TRIBE.</span> <br />
              <span className="relative">
                BREAK THE
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-orange-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" />
                </svg>
              </span>
              <br />
              ROUTINE.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl font-medium leading-relaxed"
            >
              Join a vibrant community in Tirupati where interests turn into experiences. 
              From music jams to weekend treks, we build connections that matter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-5 items-center"
            >
              <button
                onClick={() => onNavigate("wings")}
                className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-sm overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-orange-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  Explore Wings <ChevronRight size={18} />
                </span>
              </button>

              <button
                onClick={() => onNavigate("about")}
                className="flex items-center gap-3 px-8 py-4 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all font-bold text-sm text-slate-700 dark:text-slate-300"
              >
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                  <Play size={14} fill="currentColor" />
                </div>
                Watch Story
              </button>
            </motion.div>
          </div>

          {/* Right Side: Interactive Photo Stack / Bento */}
          <div className="hidden lg:flex lg:col-span-5 relative h-[600px] items-center justify-center">
            {/* Main Floating Image */}
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-20 w-72 h-96 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900 rotate-3"
            >
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl">
                 <p className="text-[10px] font-black uppercase text-orange-500">Board Games Night</p>
                 <p className="text-xs font-bold dark:text-white">Social Wing Meetup</p>
              </div>
            </motion.div>

            {/* Smaller Secondary Image */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-0 z-30 w-48 h-48 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900 -rotate-6"
            >
              <img src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400" className="w-full h-full object-cover" />
            </motion.div>

            {/* Badge: Live Location */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-20 -right-4 z-40 bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-black dark:text-white">Tirupati, AP</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">12+ Active Spots</p>
              </div>
            </motion.div>

            {/* Floating Avatars */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1/4 -left-10 z-40 bg-white dark:bg-slate-900 py-3 px-4 rounded-full shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3"
            >
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200" />
                ))}
              </div>
              <p className="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-wider">500+ Joined</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- STATS BENTO BAR --- */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pb-10">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-[2.5rem] bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl border border-white/20 dark:border-slate-800 shadow-2xl"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-6 rounded-[1.5rem] hover:bg-white dark:hover:bg-slate-800 transition-colors group">
              <span className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter group-hover:scale-110 transition-transform">
                {stat.label}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mt-2">
                {stat.description}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-orange-500 to-transparent" />
      </motion.div>
    </div>
  );
}