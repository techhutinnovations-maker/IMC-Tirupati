import { motion } from "motion/react";
import { Instagram, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const highlights = [
    {
      title: "Interest-Based Wings",
      desc: "Six dedicated clubs (Music, Books, Games, Craft, Photo, Social) to suit your unique creativity."
    },
    {
      title: "Break the Regular Routine",
      desc: "Weekend activities, treks, jamming, and workshops designed to escape your regular schedule."
    },
    {
      title: "Build Meaningful Connections",
      desc: "Meet empathetic, progressive, and friendly like-minded individuals in an open community."
    },
    {
      title: "Tirupati-Centric Gatherings",
      desc: "Local, organic meetups celebrating the beauty, heritage, and people of Tirupati."
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 relative overflow-hidden transition-colors duration-300">
      {/* Decorative ambient blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Modern Image Collage */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 z-10" />
                <img
                  src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&q=80"
                  alt="Singing together"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="space-y-4 pt-8">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="rounded-3xl overflow-hidden aspect-square shadow-2xl relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 z-10" />
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
                    alt="Board Games"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 z-10" />
                  <img
                    src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=400&q=80"
                    alt="Laughter"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Side: Copy & Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest text-orange-500 dark:text-orange-400 uppercase font-sans">
                About IMC Tirupati
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display leading-tight">
                More Than a Community. <br />
                It's Where You <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Belong.</span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
            </div>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-light leading-relaxed font-sans">
              It's My Community (IMC) Tirupati is a vibrant, community-driven platform created to bring people together beyond their everyday schedules. Through our dedicated interest-based clubs, experiential weekend trips, hands-on masterclasses, and social initiatives, we cultivate open spaces where people freely learn new creative hobbies, exchange unique stories, and nurture authentic, long-term friendships.
            </p>

            {/* highlights list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 transition-colors duration-300">
                  <CheckCircle2 className="text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white font-display">{item.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 items-center pt-2">
              <a
                href="https://www.instagram.com/imc.tirupati?igsh=MTE2ZjJzYXpmdXg4MQ=="
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white font-bold py-3 px-6 rounded-full text-xs tracking-wider uppercase transition-colors shadow-sm"
              >
                <span>Know More About IMC</span>
                <ArrowUpRight size={14} className="text-slate-50 dark:text-slate-400" />
              </a>

              <a
                href="https://www.instagram.com/imc.tirupati?igsh=MTE2ZjJzYXpmdXg4MQ=="
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold py-3 px-6 rounded-full text-xs tracking-wider uppercase transition-colors shadow-lg shadow-pink-600/10"
              >
                <Instagram size={14} />
                <span>Follow on Instagram</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
