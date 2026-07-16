import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GALLERY_ITEMS } from "../data";
import { Eye, Heart, Camera, ChevronLeft, ChevronRight } from "lucide-react";

interface GallerySectionProps {
  onExploreStandalone: () => void;
}

export default function GallerySection({ onExploreStandalone }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScrollProgress = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const categories = ["all", "Music", "Playing", "Books", "Craft", "Social", "Photo"];

  const filteredItems = selectedCategory === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const handleLike = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <section id="gallery" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 relative overflow-x-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="text-left space-y-4 max-w-xl">
            <span className="text-xs font-bold tracking-widest text-orange-500 dark:text-orange-400 uppercase font-sans">
              Visual Community Diary
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display leading-tight">
              Memories We <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Cherish.</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light font-sans">
              Step into the vibrant snapshots of our weekend getaways, creative workshops, and deep discussion circles. Real people, authentic laughter, and unforgettable vibes.
            </p>
          </div>

          {/* Categories select buttons */}
          <div className="flex flex-wrap gap-2 shrink-0 justify-start items-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-lg shadow-orange-500/15"
                    : "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-850 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-800"
                }`}
              >
                {cat === "all" ? "View All Photos" : `${cat} Club`}
              </button>
            ))}
            <button
              onClick={onExploreStandalone}
              className="px-4.5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 bg-orange-500/10 hover:bg-orange-500 text-orange-600 dark:text-orange-400 hover:text-white border border-orange-500/30 hover:border-transparent flex items-center space-x-1.5 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Explore Immersive Gallery ↗</span>
            </button>
          </div>
        </div>

        {/* Gallery Horizontal Scroll Container */}
        <div className="relative group/scroll-container mt-8">
          
          {/* Scroll Left Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-[-20px] top-[45%] -translate-y-1/2 z-20 p-3.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 hover:scale-110 active:scale-95 transition-all shadow-xl backdrop-blur-md opacity-0 group-hover/scroll-container:opacity-100 hidden md:flex items-center justify-center cursor-pointer hover:border-orange-500/30"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Scroll Right Button */}
          <button
            onClick={scrollRight}
            className="absolute right-[-20px] top-[45%] -translate-y-1/2 z-20 p-3.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 hover:scale-110 active:scale-95 transition-all shadow-xl backdrop-blur-md opacity-0 group-hover/scroll-container:opacity-100 hidden md:flex items-center justify-center cursor-pointer hover:border-orange-500/30"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>

          {/* Scrolling Track */}
          <div
            ref={scrollRef}
            onScroll={handleScrollProgress}
            className="flex space-x-6 overflow-x-auto pb-6 pt-2 px-1 scrollbar-none scroll-smooth snap-x snap-mandatory"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] aspect-[4/5] relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 group cursor-pointer shadow-lg transition-colors duration-300 snap-start"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActivePhoto(item.url)}
                >
                  {/* Image */}
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Ambient dark gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 transition-opacity duration-300" />

                  {/* Overlaid details */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-left space-y-3 z-10">
                    
                    {/* Category label */}
                    <div className="flex items-center justify-between">
                      <span className="inline-block bg-orange-500/10 border border-orange-500/20 text-orange-400 font-sans text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
                        {item.category} Club
                      </span>

                      {/* Interactive like count */}
                      <button
                        onClick={(e) => handleLike(item.id, e)}
                        className="inline-flex items-center space-x-1 bg-white/85 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-rose-500 hover:border-rose-400/40 p-2 rounded-full transition-colors cursor-pointer"
                        title="Heart this photo"
                      >
                        <Heart size={12} className={likes[item.id] ? "fill-rose-500 text-rose-500 animate-pulse" : ""} />
                        <span className="text-[10px] font-bold font-mono text-slate-850 dark:text-slate-100">{likes[item.id] || 0}</span>
                      </button>
                    </div>

                    {/* Title */}
                    <p className="text-xs sm:text-sm font-semibold text-white tracking-tight leading-snug">
                      {item.title}
                    </p>
                  </div>

                  {/* Hover magnifier icon overlay */}
                  <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-slate-950/80 border border-slate-800 flex items-center justify-center text-orange-400 scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Eye size={18} />
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Progress Indicator Track */}
          <div className="mt-4 max-w-[200px] mx-auto bg-slate-200 dark:bg-slate-800/80 h-1 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-full transition-all duration-150 rounded-full"
              style={{ width: `${Math.max(8, scrollProgress)}%` }}
            />
          </div>

        </div>

        {/* Photowalk CTA bar (under the gallery grid) */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-colors duration-300">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-full bg-orange-500/15 flex items-center justify-center text-orange-500">
              <Camera size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white font-display">Are you a hobbyist photographer?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5 leading-relaxed">Join our next heritage photowalk around Tirupati to explore camera trick theories and document memories.</p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/imc.tirupati?igsh=MTE2ZjJzYXpmdXg4MQ=="
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center space-x-2 bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 text-orange-600 dark:text-orange-400 border border-slate-200 dark:border-slate-800 py-2.5 px-6 rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-sm"
          >
            <span>Learn about Photowalks</span>
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setActivePhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
            <img
              src={activePhoto}
              alt="Enlarged community memory"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
