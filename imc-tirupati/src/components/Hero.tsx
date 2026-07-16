import { motion } from "motion/react";
import { ChevronRight, ArrowDown, Play, Sparkles } from "lucide-react";
import { STATS } from "../data";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div id="home" className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Background Hero Banner Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=80"
          alt="IMC Tirupati Community Gathering"
          className="w-full h-full object-cover object-center opacity-45 dark:opacity-40 scale-105 filter saturate-[1.2]"
          referrerPolicy="no-referrer"
        />
        {/* Modern dark/light radial and linear gradients to blend background */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-slate-50/20 dark:from-slate-950 dark:via-slate-950/70 dark:to-slate-950/40" />
      </div>

      {/* Spacer for navigation */}
      <div className="h-20" />

      {/* Hero Content Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex items-center py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Main Slogan & Text */}
          <div className="lg:col-span-8 text-left space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider text-orange-600 dark:text-orange-400 uppercase font-sans"
            >
              <Sparkles size={12} className="animate-pulse" />
              <span>It's My Community Tirupati</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display leading-[1.1]"
            >
              Find Your <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">People.</span> <br className="hidden sm:inline" />
              Explore Your <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">Passion.</span> <br />
              Break the <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Routine.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl font-light leading-relaxed font-sans"
            >
              IMC Tirupati is a vibrant community where people connect through shared interests, meaningful experiences, events, workshops, and unforgettable weekends.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <button
                onClick={() => onNavigate("wings")}
                className="group inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 px-8 rounded-full text-sm tracking-wider uppercase transition-all shadow-lg shadow-orange-500/20 active:scale-95"
              >
                <span>Explore Our Wings</span>
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate("about")}
                className="inline-flex items-center space-x-2 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-bold py-3.5 px-8 rounded-full text-sm tracking-wider uppercase transition-all active:scale-95 shadow-sm"
              >
                <span>About IMC</span>
              </button>

              {/* YouTube/Instagram Video Link simulator */}
              <a
                href="https://www.instagram.com/imc.tirupati?igsh=MTE2ZjJzYXpmdXg4MQ=="
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors py-2 px-3 font-semibold tracking-wider uppercase"
              >
                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-orange-500 dark:text-orange-400 shadow-sm">
                  <Play size={12} fill="currentColor" />
                </div>
                <span>Watch Our Story</span>
              </a>
            </motion.div>
          </div>

          {/* Glowing Circle Graphic Badge on the right */}
          <div className="hidden lg:col-span-4 lg:flex justify-end relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="w-72 h-72 rounded-full border-2 border-dashed border-orange-500/20 flex items-center justify-center p-6 relative"
            >
              <div className="absolute inset-0 bg-orange-500/5 rounded-full blur-2xl animate-pulse" />
              <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-8 shadow-2xl relative z-10">
                <span className="text-sm font-semibold tracking-widest text-orange-500 dark:text-orange-400 uppercase mb-2">Established</span>
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-display">TIRUPATI</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-[150px] leading-relaxed">Bringing people together, breaking regular routines.</span>
                
                <div className="mt-6 flex items-center -space-x-2">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=80" alt="member" className="w-8 h-8 rounded-full border-2 border-slate-100 dark:border-slate-900 object-cover" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&q=80" alt="member" className="w-8 h-8 rounded-full border-2 border-slate-100 dark:border-slate-900 object-cover" />
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&q=80" alt="member" className="w-8 h-8 rounded-full border-2 border-slate-100 dark:border-slate-900 object-cover" />
                  <div className="w-8 h-8 rounded-full border-2 border-slate-100 dark:border-slate-900 bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white font-sans">
                    +1K
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Bar Overlaid at the Bottom */}
      <div className="relative z-10 bg-slate-50/90 dark:bg-slate-950/60 backdrop-blur-md border-t border-slate-200 dark:border-slate-900/80 py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="flex flex-col items-center justify-center"
              >
                <span className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white font-display tracking-tight">
                  {stat.label}
                </span>
                <span className="text-[10px] md:text-xs font-semibold tracking-widest text-orange-500 dark:text-orange-400 uppercase mt-1">
                  {stat.description}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
