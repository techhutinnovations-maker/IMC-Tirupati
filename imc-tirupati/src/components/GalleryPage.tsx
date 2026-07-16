import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Search,
  X,
  Instagram,
  Sun,
  Moon,
  Maximize2,
  Camera,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA — 30 photos across 6 categories                              */
/* ------------------------------------------------------------------ */

const CATEGORY_META = {
  Music: { tape: "#FF6452", note: "#FFF0EE", label: "Acoustics" },
  Playing: { tape: "#1F9E96", note: "#E6F6F5", label: "Recess" },
  Books: { tape: "#7B5EA7", note: "#F2EEF9", label: "Library" },
  Craft: { tape: "#F5B942", note: "#FFF9EB", label: "Atelier" },
  Social: { tape: "#E8607F", note: "#FDF0F3", label: "Gather" },
  Photo: { tape: "#3E7CB1", note: "#EEF5FA", label: "Studio" },
};

const TITLE_POOL = {
  Music: ["Guitar Circle", "Sunday Worship", "Open Mic Night", "Drum Practice", "Choir Warm-up"],
  Playing: ["Backyard Football", "Board Game Break", "Water Balloon Chaos", "Relay Race", "Court Rematch"],
  Books: ["Book Club Huddle", "Quiet Reading Corner", "Study Marathon", "New Arrivals Shelf", "Poetry Swap"],
  Craft: ["Macrame Night", "Paint & Chatter", "Pottery Wheel", "Scrapbook Session", "Candle Making"],
  Social: ["Bonfire Chats", "Potluck Sunday", "Welcome Circle", "Late Night Talks", "Birthday Surprise"],
  Photo: ["Golden Hour Shoot", "Street Wander", "Portrait Session", "Behind the Lens", "Candid Catch"],
};

const CATEGORIES = Object.keys(CATEGORY_META);

const GALLERY_ITEMS = Array.from({ length: 30 }, (_, i) => {
  const category = CATEGORIES[i % CATEGORIES.length];
  const pool = TITLE_POOL[category];
  const title = pool[Math.floor(i / CATEGORIES.length) % pool.length];
  const seed = `imc-${category.toLowerCase()}-${i}`;
  const tall = i % 3 === 0;
  const wide = i % 5 === 0 && !tall;
  const w = wide ? 600 : 420;
  const h = tall ? 560 : wide ? 320 : 460;
  return {
    id: `p${i + 1}`,
    title,
    category,
    url: `https://picsum.photos/seed/${seed}/${w}/${h}`,
  };
});

const rot = (id, spread = 5) => {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 997;
  return ((h % (spread * 20)) / 10 - spread).toFixed(1);
};

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function GalleryPage({ onBackToHome = () => {} }) {
  const [theme, setTheme] = useState("light");
  const [query, setQuery] = useState("");
  const [activePhoto, setActivePhoto] = useState(null);
  const [likes, setLikes] = useState({});

  const dark = theme === "dark";

  const filtered = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      return (
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [query]);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className={dark ? "dark" : ""}
      style={{
        "--paper": dark ? "#0F1110" : "#F9F7F2",
        "--board": dark ? "#161817" : "#EBE6D9",
        "--ink": dark ? "#E0DDD5" : "#1A1714",
        "--ink-soft": dark ? "#88837A" : "#7A7369",
        "--card": dark ? "#1C1F1E" : "#FFFFFF",
        "--accent": "#FF6452",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400&family=Inter:wght@400;600;800&family=Caveat:wght@600;700&display=swap');

        .gp-root {
          font-family: 'Inter', sans-serif;
          background-color: var(--paper);
          color: var(--ink);
          min-height: 100vh;
          transition: background .4s ease;
          background-image: 
            linear-gradient(var(--board) 1.5px, transparent 1.5px),
            linear-gradient(90deg, var(--board) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
        }
        @media (min-width: 768px) {
          .gp-root { background-size: 40px 40px; }
        }

        .gp-display { font-family: 'Fraunces', serif; }
        .gp-hand { font-family: 'Caveat', cursive; }

        .gp-tape {
          position: absolute;
          height: 24px;
          width: 68px;
          opacity: 0.7;
          backdrop-filter: blur(1px);
          clip-path: polygon(5% 0%, 95% 2%, 100% 15%, 98% 85%, 95% 98%, 5% 100%, 0% 80%, 2% 20%);
          box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
        }
        @media (min-width: 768px) {
          .gp-tape { height: 30px; width: 85px; }
        }

        .gp-card {
          break-inside: avoid;
          margin-bottom: 18px;
          background: var(--card);
          padding: 10px 10px 14px;
          border-radius: 2px;
          box-shadow: 
            0 1px 3px rgba(0,0,0,0.1),
            0 15px 30px -10px rgba(0,0,0,0.2);
          cursor: pointer;
          position: relative;
          transition: all .4s cubic-bezier(.175, .885, .32, 1.275);
        }
        @media (min-width: 768px) {
          .gp-card { margin-bottom: 28px; padding: 12px 12px 16px; }
        }

        .gp-card::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.03;
          pointer-events: none;
          background-image: url("https://www.transparenttextures.com/patterns/paper-fibers.png");
        }

        @media (hover: hover) {
          .gp-card:hover {
            transform: rotate(0deg) translateY(-8px) scale(1.02) !important;
            box-shadow: 0 30px 60px -20px rgba(0,0,0,0.3);
            z-index: 20;
          }
          .gp-card:hover img { filter: sepia(0) contrast(1); }
        }

        .gp-card img {
          filter: sepia(0.1) contrast(1.05);
          transition: filter 0.3s ease;
        }

        .gp-tray {
          background: var(--card);
          border: 1px solid var(--board);
          box-shadow: 0 20px 40px -15px rgba(0,0,0,0.1);
          border-radius: 20px;
        }
        @media (min-width: 768px) {
          .gp-tray { border-radius: 24px; }
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="gp-root selection:bg-[#FF6452] selection:text-white">
        {/* NAV */}
        <nav className="fixed top-0 w-full z-50 h-16 md:h-20 flex items-center justify-between px-4 sm:px-6 md:px-12 backdrop-blur-md bg-[var(--paper)]/80">
          <motion.button
            whileHover={{ x: -4 }}
            onClick={onBackToHome}
            className="flex items-center gap-1.5 sm:gap-3 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity shrink-0"
          >
            <ArrowLeft size={16} className="sm:hidden" />
            <ArrowLeft size={18} className="hidden sm:block" />
            <span className="hidden xs:inline">Exit Archive</span>
          </motion.button>

          <div className="flex flex-col items-center">
            <h1 className="gp-display text-base sm:text-xl font-black tracking-tighter whitespace-nowrap">
              IMC <span className="gp-hand text-lg sm:text-2xl font-normal ml-1">Archives</span>
            </h1>
          </div>

          <button
            onClick={() => setTheme(dark ? "light" : "dark")}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-[var(--board)] hover:bg-[var(--board)] transition-colors shrink-0"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={16} className="sm:hidden" /> : <Moon size={16} className="sm:hidden" />}
            {dark ? <Sun size={18} className="hidden sm:block" /> : <Moon size={18} className="hidden sm:block" />}
          </button>
        </nav>

        {/* HERO */}
        <section className="pt-24 sm:pt-32 md:pt-40 pb-10 sm:pb-14 md:pb-16 px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <span className="gp-hand text-xl sm:text-2xl md:text-3xl text-[var(--accent)] block mb-2">
              Moments from the Tirupati Tribe
            </span>
            <h2 className="gp-display text-4xl xs:text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.9] md:leading-[0.85] mb-5 md:mb-6">
              Our Visual <br /> <span className="italic font-normal">Diary.</span>
            </h2>
            <div className="flex justify-center gap-6 sm:gap-10 md:gap-12 mt-6 md:mt-8">
              <div className="text-center">
                <p className="gp-display text-xl sm:text-2xl md:text-3xl font-bold leading-none">{GALLERY_ITEMS.length}</p>
                <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest opacity-50">Captures</p>
              </div>
              <div className="text-center border-x border-[var(--board)] px-6 sm:px-8 md:px-12">
                <p className="gp-display text-xl sm:text-2xl md:text-3xl font-bold leading-none">06</p>
                <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest opacity-50">Wings</p>
              </div>
              <div className="text-center">
                <p className="gp-display text-xl sm:text-2xl md:text-3xl font-bold leading-none">2024</p>
                <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest opacity-50">Season</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SEARCH TRAY */}
        <section className="sticky top-16 md:top-24 z-40 px-4 sm:px-6 mb-10 md:mb-16">
          <div className="max-w-2xl mx-auto gp-tray p-1.5 sm:p-2 flex items-center">
            <div className="relative flex-grow">
              <Search size={16} className="sm:hidden absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-soft)]" />
              <Search size={18} className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-soft)]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or category..."
                className="w-full pl-9 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-transparent text-sm focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* MASONRY WALL */}
        <section className="px-4 sm:px-6 pb-24 md:pb-32 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <Camera size={40} className="mx-auto mb-4 opacity-20" />
                <p className="gp-display text-xl sm:text-2xl font-bold opacity-30">No matches found on the wall</p>
              </motion.div>
            ) : (
              <div className="columns-2 sm:columns-2 md:columns-3 xl:columns-4 gap-4 md:gap-8">
                {filtered.map((item, idx) => {
                  const r = rot(item.id);
                  const meta = CATEGORY_META[item.category];
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (idx % 10) * 0.05 }}
                      className="gp-card group"
                      style={{ rotate: `${r}deg` }}
                      onClick={() => setActivePhoto(item)}
                    >
                      <div
                        className="gp-tape"
                        style={{
                          backgroundColor: meta.tape,
                          top: -12,
                          left: "50%",
                          transform: `translateX(-50%) rotate(${Number(r) * -1.5}deg)`,
                        }}
                      />

                      <div className="relative overflow-hidden rounded-sm">
                        <img
                          src={item.url}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-auto block"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center hidden sm:flex">
                          <Maximize2 className="text-white" size={22} />
                        </div>
                      </div>

                      <div className="mt-3 md:mt-4 flex items-center justify-between gap-1">
                        <div className="min-w-0">
                          <p className="gp-hand text-lg sm:text-xl md:text-2xl leading-none mb-1 truncate">{item.title}</p>
                          <p className="text-[7px] sm:text-[9px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] opacity-40">
                            {item.category} Club
                          </p>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={(e) => toggleLike(item.id, e)}
                          className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center hover:bg-black/5"
                          aria-label="Like photo"
                        >
                          <Heart
                            size={16}
                            className="sm:hidden"
                            fill={likes[item.id] ? "var(--accent)" : "none"}
                            color={likes[item.id] ? "var(--accent)" : "var(--ink-soft)"}
                          />
                          <Heart
                            size={18}
                            className="hidden sm:block"
                            fill={likes[item.id] ? "var(--accent)" : "none"}
                            color={likes[item.id] ? "var(--accent)" : "var(--ink-soft)"}
                          />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* LIGHTBOX */}
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-0 sm:p-8 overflow-y-auto"
              style={{ backgroundColor: dark ? "rgba(5,7,5,0.98)" : "rgba(25,23,20,0.95)" }}
            >
              <div
                className="absolute inset-0 cursor-pointer"
                onClick={() => setActivePhoto(null)}
              />

              <motion.div
                layoutId={activePhoto.id}
                className="relative w-full sm:max-w-6xl min-h-screen sm:min-h-0 flex flex-col md:flex-row bg-[var(--card)] sm:rounded-lg shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-black/40 sm:bg-transparent text-white sm:text-[var(--ink)] hover:bg-[var(--board)] sm:hover:text-[var(--ink)]"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                {/* Photo Area */}
                <div className="flex-grow bg-black flex items-center justify-center p-2 min-h-[45vh] sm:min-h-0">
                  <img
                    src={activePhoto.url}
                    alt={activePhoto.title}
                    className="max-w-full max-h-[45vh] sm:max-h-[70vh] md:max-h-[85vh] object-contain shadow-2xl"
                  />
                </div>

                {/* Sidebar */}
                <div className="w-full md:w-80 p-5 sm:p-8 flex flex-col border-t md:border-t-0 md:border-l border-[var(--board)]">
                  <div className="mt-2 md:mt-0">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white mb-3 sm:mb-4"
                      style={{ backgroundColor: CATEGORY_META[activePhoto.category].tape }}
                    >
                      {activePhoto.category} Collective
                    </span>
                    <h3 className="gp-display text-2xl sm:text-3xl md:text-4xl font-black mb-2">{activePhoto.title}</h3>
                    <p className="gp-hand text-lg sm:text-xl md:text-2xl text-[var(--ink-soft)]">
                      Pinned on the wall by IMC Tribe
                    </p>
                  </div>

                  <div className="mt-6 md:mt-auto pt-6 sm:pt-10">
                    <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-[var(--board)] bg-[var(--paper)]">
                      <Instagram size={20} className="text-[var(--accent)] shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-tighter leading-none">Shared via</p>
                        <p className="text-sm font-bold">@imc.tirupati</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}