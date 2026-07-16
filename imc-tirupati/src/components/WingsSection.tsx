import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Ensure WINGS_DATA has: id, name, tagline, detailedDesc, activities, image, team
import { WINGS_DATA } from "../data"; 
import { 
  Music, BookOpen, Gamepad2, Palette, Camera, Heart, 
  Users, Clock, Sparkles, ArrowRight, CheckCircle2 
} from "lucide-react";

/**
 * THEME DEFINITIONS
 * These keys MUST match the 'id' in your WINGS_DATA (case-insensitive check added below)
 */
const THEMES: Record<string, { 
  color: string; 
  glow: string; 
  border: string; 
  bg: string;
  icon: any 
}> = {
  music: { 
    color: "from-indigo-600 to-blue-500", 
    glow: "rgba(79, 70, 229, 0.15)", 
    border: "border-indigo-500/20", 
    bg: "bg-indigo-500/5",
    icon: Music 
  },
  books: { 
    color: "from-amber-600 to-orange-500", 
    glow: "rgba(217, 119, 6, 0.15)", 
    border: "border-amber-500/20", 
    bg: "bg-amber-500/5",
    icon: BookOpen 
  },
  games: { 
    color: "from-rose-600 to-pink-500", 
    glow: "rgba(225, 29, 72, 0.15)", 
    border: "border-rose-500/20", 
    bg: "bg-rose-500/5",
    icon: Gamepad2 
  },
  craft: { 
    color: "from-emerald-600 to-teal-500", 
    glow: "rgba(5, 150, 105, 0.15)", 
    border: "border-emerald-500/20", 
    bg: "bg-emerald-500/5",
    icon: Palette 
  },
  photo: { 
    color: "from-cyan-600 to-sky-500", 
    glow: "rgba(8, 145, 178, 0.15)", 
    border: "border-cyan-500/20", 
    bg: "bg-cyan-500/5",
    icon: Camera 
  },
  social: { 
    color: "from-purple-600 to-fuchsia-500", 
    glow: "rgba(147, 51, 234, 0.15)", 
    border: "border-purple-500/20", 
    bg: "bg-purple-500/5",
    icon: Heart 
  },
};

export default function WingsSection() {
  // Initialize with the ID of your first wing from data
  const [selectedWingId, setSelectedWingId] = useState(WINGS_DATA[0]?.id || "music");
  
  // Safe Theme Lookup Helper
  const getTheme = (id: string) => {
    const key = id.toLowerCase();
    return THEMES[key] || THEMES.music; // Fallback to music theme if ID not found
  };

  const activeWing = useMemo(() => 
    WINGS_DATA.find((w) => w.id === selectedWingId) || WINGS_DATA[0], 
    [selectedWingId]
  );

  const theme = getTheme(activeWing.id);

  return (
    <section id="wings" className="py-24 md:py-36 bg-white dark:bg-[#050505] relative overflow-hidden transition-colors duration-700">
      
      {/* 1. Dynamic Ambient Atmosphere */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out"
        style={{
          background: `radial-gradient(circle at 50% 20%, ${theme.glow} 0%, transparent 50%)`
        }}
      />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none grayscale" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`inline-block text-[10px] font-black tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full border ${theme.border} bg-white dark:bg-slate-900 shadow-sm transition-colors duration-500`}
          >
            Explore Your Passions
          </motion.span>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6">
            The Six <span className={`bg-gradient-to-r ${theme.color} bg-clip-text text-transparent transition-all duration-500`}>Wings</span> of IMC.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
            Every club is a community within itself. Choose a wing to see how we spend our weekends.
          </p>
        </div>

        {/* 2. Modern Wing Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {WINGS_DATA.map((wing) => {
            const isSelected = wing.id === selectedWingId;
            const wingTheme = getTheme(wing.id);
            const WingIcon = wingTheme.icon || Users;
            
            return (
              <button
                key={wing.id}
                onClick={() => setSelectedWingId(wing.id)}
                className={`relative px-6 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 group ${
                  isSelected ? "text-white" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 bg-gradient-to-r ${wingTheme.color} rounded-2xl shadow-xl shadow-indigo-500/20`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  <WingIcon size={20} className={isSelected ? "animate-pulse" : "opacity-70 group-hover:opacity-100"} />
                </span>
                <span className="relative z-10 font-bold text-sm tracking-wide uppercase">
                  {wing.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3. Main Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedWingId}
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Image Side */}
            <div className="lg:col-span-5 group relative">
              <div className={`absolute -inset-4 bg-gradient-to-r ${theme.color} opacity-20 blur-3xl rounded-[3rem] transition-all duration-700`} />
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/20 dark:border-slate-800 shadow-2xl">
                <img
                  src={activeWing.image}
                  alt={activeWing.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                   <div className="flex items-center gap-2 mb-2">
                     <Sparkles size={16} className="text-yellow-400" />
                     <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Featured Event</span>
                   </div>
                   <h4 className="text-2xl font-bold text-white mb-2">Capturing {activeWing.name}</h4>
                   <p className="text-sm text-white/60 line-clamp-2">Authentic moments from our last meetup in Tirupati.</p>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-10 lg:pl-8">
              <div className="space-y-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.color} flex items-center justify-center text-white shadow-lg`}>
                  <theme.icon size={28} />
                </div>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {activeWing.name} <span className="text-slate-300 dark:text-slate-700 font-light">/</span> {activeWing.tagline}
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {activeWing.detailedDesc}
                </p>
              </div>

              {/* Program Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeWing.activities.map((act, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="p-5 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-white/20 transition-all group/card"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 rounded-full p-1 bg-gradient-to-r ${theme.color}`}>
                        <CheckCircle2 size={14} className="text-white" />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 dark:text-white mb-1 group-hover/card:translate-x-1 transition-transform">{act.title}</h5>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                          <Clock size={10} />
                          {act.frequency}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action Footer */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex -space-x-3">
                  {activeWing.team.map((leader, idx) => (
                    <div 
                      key={idx}
                      title={`${leader.name} - ${leader.role}`}
                      className={`w-12 h-12 rounded-full border-4 border-white dark:border-[#050505] bg-gradient-to-br ${theme.color} flex items-center justify-center text-white font-bold text-xs shadow-lg`}
                    >
                      {leader.name[0]}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Curated by the Wing Leads</p>
                  <p className="text-xs text-slate-500 mt-1">Passionate experts in {activeWing.name.toLowerCase()}</p>
                </div>
                <button className={`flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:scale-105 active:scale-95 transition-all`}>
                  Join Wing <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}