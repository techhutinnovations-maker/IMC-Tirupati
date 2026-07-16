import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WINGS_DATA } from "../data";
import { Music, BookOpen, Gamepad2, Palette, Camera, Heart, Users, Clock, Calendar, ShieldAlert } from "lucide-react";

const getIconComponent = (name: string, className = "") => {
  switch (name) {
    case "Music":
      return <Music className={className} />;
    case "BookOpen":
      return <BookOpen className={className} />;
    case "Gamepad2":
      return <Gamepad2 className={className} />;
    case "Palette":
      return <Palette className={className} />;
    case "Camera":
      return <Camera className={className} />;
    case "Heart":
      return <Heart className={className} />;
    default:
      return <Users className={className} />;
  }
};

export default function WingsSection() {
  const [selectedWingId, setSelectedWingId] = useState("music");
  const activeWing = WINGS_DATA.find((w) => w.id === selectedWingId) || WINGS_DATA[0];

  return (
    <section id="wings" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900/80 relative transition-colors duration-300">
      {/* Dynamic Background Glow based on active wing's colors */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none transition-all duration-700 bg-radial-gradient-glow" style={{
        backgroundImage: `radial-gradient(circle at 50% 30%, var(--wing-glow-color, rgba(249, 115, 22, 0.15)) 0%, transparent 70%)`
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-orange-500 dark:text-orange-400 uppercase font-sans">
            Our Six Wings / Clubs
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display leading-tight">
            One Community. <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Six Passions.</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light font-sans">
            Find your space. Meet your people. Currently featuring six diverse wings tailored to spark your creativity, and let you step outside of your regular routine.
          </p>
        </div>

        {/* Wings Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {WINGS_DATA.map((wing) => {
            const isSelected = wing.id === selectedWingId;
            return (
              <motion.button
                key={wing.id}
                onClick={() => setSelectedWingId(wing.id)}
                whileHover={{ 
                  y: -8, 
                  scale: 1.05, 
                  boxShadow: "0 20px 25px -5px rgba(249, 115, 22, 0.15), 0 10px 10px -5px rgba(249, 115, 22, 0.1)"
                }}
                whileTap={{ scale: 0.97 }}
                className={`p-6 rounded-2xl border text-left flex flex-col justify-between h-48 transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? `bg-gradient-to-br ${wing.accentColor} text-white border-transparent shadow-2xl`
                    : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-orange-500/20"
                }`}
              >
                {/* Decorative subtle background icon */}
                <div className="absolute -right-4 -bottom-4 opacity-10 text-white transition-transform group-hover:scale-110 duration-300">
                  {getIconComponent(wing.iconName, "w-24 h-24")}
                </div>

                {/* Icon Badge */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isSelected ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800/80 text-orange-500 dark:text-orange-400 group-hover:text-white transition-colors"
                }`}>
                  {getIconComponent(wing.iconName, "w-5 h-5")}
                </div>

                {/* Text info */}
                <div className="space-y-1 relative z-10 mt-6">
                  <h3 className="text-sm font-bold tracking-tight uppercase font-display leading-none">
                    {wing.name}
                  </h3>
                  <p className={`text-[11px] leading-tight line-clamp-2 ${
                    isSelected ? "text-white/80" : "text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-400"
                  }`}>
                    {wing.tagline}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Wing Details Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedWingId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-900 rounded-3xl overflow-hidden shadow-2xl relative transition-colors duration-300"
          >
            {/* Header banner area within card */}
            <div className={`p-8 md:p-12 bg-gradient-to-r ${activeWing.accentColor} text-white relative overflow-hidden`}>
              <div className="absolute -right-16 -top-16 opacity-10">
                {getIconComponent(activeWing.iconName, "w-64 h-64")}
              </div>
              <div className="relative z-10 max-w-3xl space-y-3">
                <span className="inline-flex items-center space-x-1.5 bg-white/20 border border-white/10 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase font-sans">
                  Active Club Space
                </span>
                <h3 className="text-3xl md:text-5xl font-black tracking-tight font-display">
                  {activeWing.name}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-white/90 italic font-light font-sans max-w-xl">
                  "{activeWing.tagline}"
                </p>
              </div>
            </div>

            {/* Inner Content Grid */}
            <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* About & Programs - left */}
              <div className="lg:col-span-7 space-y-8 text-left">
                {/* About Section */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black tracking-widest text-orange-500 dark:text-orange-400 uppercase font-sans">
                    About The Club
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed font-sans">
                    {activeWing.detailedDesc}
                  </p>
                </div>

                {/* Specific Program Highlights */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black tracking-widest text-orange-500 dark:text-orange-400 uppercase font-sans">
                    Specific Program Highlights
                  </h4>
                  <div className="space-y-4">
                    {activeWing.activities.map((act, i) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group/item transition-colors duration-300">
                        <div className="space-y-1">
                          <h5 className="text-sm font-bold text-slate-800 dark:text-white font-display group-hover/item:text-orange-500 dark:group-hover/item:text-orange-400 transition-colors">
                            {act.title}
                          </h5>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                            {act.description}
                          </p>
                        </div>
                        <div className="shrink-0 flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 transition-colors duration-300">
                          <Clock size={12} className="text-orange-500 dark:text-orange-400" />
                          <span>{act.frequency}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Team Overview & Image - right */}
              <div className="lg:col-span-5 space-y-8 text-left">
                {/* High-quality Representative Image */}
                <div className="rounded-2xl overflow-hidden aspect-video lg:aspect-[4/3] shadow-2xl relative border border-slate-200 dark:border-slate-800">
                  <img
                    src={activeWing.image}
                    alt={activeWing.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-[10px] font-bold tracking-wider text-white uppercase font-sans">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Real Event Photograph</span>
                  </div>
                </div>

                {/* Team Overview */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black tracking-widest text-orange-500 dark:text-orange-400 uppercase font-sans">
                    Team Overview
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeWing.team.map((leader, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-900 flex items-center space-x-3.5 transition-colors duration-300">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${activeWing.accentColor} flex items-center justify-center font-bold text-white text-sm font-display shadow-md`}>
                          {leader.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-slate-850 dark:text-white font-sans leading-none">{leader.name}</h5>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-none font-sans font-light">{leader.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
