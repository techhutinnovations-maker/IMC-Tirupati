import { useState, useMemo, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Heart,
  Camera,
  Sparkles,
  Search,
  Share2,
  Download,
  Eye,
  Instagram,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sun,
  Moon
} from "lucide-react";
import { GALLERY_ITEMS } from "../data";

interface GalleryPageProps {
  onBackToHome: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export default function GalleryPage({ onBackToHome, theme, onToggleTheme }: GalleryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({
    gal1: 42,
    gal2: 28,
    gal3: 56,
    gal4: 112,
    gal5: 95,
    gal6: 34,
    gal7: 64,
    gal8: 89
  });
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  // 3D Highlight Cards Carousel state (similar to reference image deck)
  const [carouselIndex, setCarouselIndex] = useState(2);

  const categories = ["all", "Music", "Playing", "Books", "Craft", "Social", "Photo"];

  // Handle Like functionality
  const handleLike = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  // Filter gallery items based on tag and search input
  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans selection:bg-orange-500 selection:text-white pt-24 pb-20 overflow-hidden relative transition-colors duration-300">
      {/* Dynamic Background Radial Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl -z-10" />

      {/* Embedded Navigation/Header matching PhotoLume mock */}
      <div className="fixed top-0 left-0 w-full z-40 bg-slate-50/95 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-900 px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between transition-colors duration-300">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBackToHome}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500/30 transition-all active:scale-95 flex items-center justify-center cursor-pointer"
            title="Go back to Home"
          >
            <ArrowLeft size={16} />
          </button>
          
          <div className="flex items-center space-x-2 cursor-pointer" onClick={onBackToHome}>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 bg-clip-text text-transparent filter drop-shadow-md font-display">
              IMC
            </span>
            <div className="border-l border-slate-200 dark:border-slate-800 h-5 mx-1" />
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase font-sans">
              Gallery Hub
            </span>
          </div>
        </div>

        {/* Back to main page menu link + Theme Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500/30 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            onClick={onBackToHome}
            className="hidden sm:block text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 tracking-widest uppercase transition-colors cursor-pointer"
          >
            ← Back to Main Community
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION 1: Dynamic 3D Highlight Deck (inspired by "My Visual Diary" / "PhotoLume" mock layouts) */}
        <div className="py-8 md:py-12 text-center relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider text-orange-400 uppercase font-sans mb-4"
          >
            <Sparkles size={10} className="animate-pulse" />
            <span>Curated Showcase</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display leading-[1.1]"
          >
            My Visual <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Diary.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light font-sans max-w-xl mx-auto mt-3"
          >
            See the world through our lens: adventures, weekend stories, and memorable slices of life in Tirupati.
          </motion.p>

          {/* Curved Interactive Deck Carousel */}
          <div className="relative h-[320px] sm:h-[450px] mt-12 flex items-center justify-center">
            
            {/* Carousel navigation buttons */}
            <button
              onClick={handlePrevCarousel}
              className="absolute left-2 sm:left-12 z-30 p-3 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-700 transition-colors shadow-2xl backdrop-blur-md cursor-pointer"
              aria-label="Previous Highlight"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNextCarousel}
              className="absolute right-2 sm:right-12 z-30 p-3 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-700 transition-colors shadow-2xl backdrop-blur-md cursor-pointer"
              aria-label="Next Highlight"
            >
              <ChevronRight size={20} />
            </button>

            {/* Render 3D card layout */}
            <div className="relative w-full max-w-lg h-full flex items-center justify-center">
              {GALLERY_ITEMS.map((item, index) => {
                // Calculate distance from center active card
                let offset = index - carouselIndex;
                if (offset < -GALLERY_ITEMS.length / 2) offset += GALLERY_ITEMS.length;
                if (offset > GALLERY_ITEMS.length / 2) offset -= GALLERY_ITEMS.length;

                const isActive = offset === 0;
                const isVisible = Math.abs(offset) <= 2;

                if (!isVisible) return null;

                // 3D positioning calculations
                const rotateY = offset * 25;
                const translateX = offset * 110; // offset spacing
                const translateZ = -Math.abs(offset) * 120;
                const scale = 1 - Math.abs(offset) * 0.15;
                const opacity = 1 - Math.abs(offset) * 0.35;
                const zIndex = 20 - Math.abs(offset);

                return (
                  <motion.div
                    key={item.id}
                    animate={{
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity,
                      zIndex
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`absolute w-[180px] sm:w-[280px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border cursor-pointer group ${
                      isActive ? "border-orange-500/40 shadow-orange-500/10" : "border-slate-200 dark:border-slate-900/80"
                    }`}
                    onClick={() => {
                      if (isActive) {
                        setActivePhoto(item.url);
                      } else {
                        setCarouselIndex(index);
                      }
                    }}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover select-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                    
                    {/* Floating title info on center active item */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-left"
                      >
                        <span className="text-[9px] font-black tracking-widest text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20 uppercase font-sans">
                          {item.category} Club
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight mt-2 line-clamp-1 font-display">
                          {item.title}
                        </h3>
                        <p className="text-[10px] text-slate-400 font-light font-sans mt-0.5 flex items-center space-x-1">
                          <span>Click to maximize</span>
                          <Maximize2 size={8} />
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>

        {/* SECTION 2: Dynamic Gallery Filter & Live Search Toolbar */}
        <div className="mt-12 mb-10 pt-10 border-t border-slate-200 dark:border-slate-900/80">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Elegant horizontal selector pills */}
            <div className="flex flex-wrap gap-2 shrink-0 justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4.5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-lg shadow-orange-500/15 cursor-pointer"
                      : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-800 cursor-pointer"
                  }`}
                >
                  {cat === "all" ? "All Photos" : `${cat} Club`}
                </button>
              ))}
            </div>

            {/* Premium Search Filter bar */}
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Search size={14} />
              </div>
              <input
                type="text"
                placeholder="Search memories, categories, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900/70 focus:bg-white dark:focus:bg-slate-950 border border-slate-200 dark:border-slate-900 focus:border-orange-500/35 rounded-full pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500/10 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 dark:text-slate-500 hover:text-slate-850 dark:hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

          </div>
        </div>

        {/* SECTION 3: Grid Display (Masonry-like) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 group cursor-pointer shadow-lg"
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

                {/* Ambient dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent opacity-90" />

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
                      className="inline-flex items-center space-x-1.5 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 hover:border-rose-400/40 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                      title="Heart this photo"
                    >
                      <Heart size={11} className={likes[item.id] > 0 ? "fill-rose-500 text-rose-500 animate-pulse" : ""} />
                      <span className="text-[10px] font-bold font-mono">{likes[item.id]}</span>
                    </button>
                  </div>

                  {/* Title */}
                  <p className="text-xs sm:text-sm font-semibold text-white tracking-tight leading-snug">
                    {item.title}
                  </p>
                </div>

                {/* Hover magnifier icon overlay */}
                <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-orange-500 dark:text-orange-400 scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Eye size={16} />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state when query results are zero */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-slate-100/50 dark:bg-slate-900/10 border border-dashed border-slate-200 dark:border-slate-900 rounded-3xl"
          >
            <p className="text-slate-500 dark:text-slate-500 font-sans text-sm">No specific memories match your search criteria. Try filtering by simple keywords like "Sunset", "Trek", or "Books"!</p>
          </motion.div>
        )}

        {/* Photographer community invite block */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left transition-colors duration-300">
          <div className="flex items-center space-x-4 text-left">
            <div className="w-12 h-12 rounded-full bg-orange-500/15 flex items-center justify-center text-orange-400 shrink-0">
              <Camera size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white font-display">Contribute Your Clicks!</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5 leading-relaxed">Are you an active IMC Tirupati member with beautiful visual moments from last week's acoustic circle or camping trek? Share them with us to get showcased in our Visual Diary!</p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/imc.tirupati?igsh=MTE2ZjJzYXpmdXg4MQ=="
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold py-3 px-6 rounded-full text-xs tracking-wider uppercase transition-colors shadow-lg cursor-pointer"
          >
            <Instagram size={14} />
            <span>Send photos on IG</span>
          </a>
        </div>

      </div>

      {/* Lightbox / Expanded preview modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center p-4"
          >
            {/* Close handler on backdrop click */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setActivePhoto(null)} />

            {/* Toolbar area */}
            <div className="relative z-10 w-full max-w-4xl flex items-center justify-between px-2 mb-4">
              <span className="text-xs text-slate-400 font-sans font-light">IMC Tirupati Event Photography</span>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = activePhoto;
                    link.download = "imc-tirupati-memory.jpg";
                    link.target = "_blank";
                    link.click();
                  }}
                  className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Download image"
                >
                  <Download size={14} />
                </button>
                <button
                  onClick={() => alert("Link copied to clipboard!")}
                  className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Share link"
                >
                  <Share2 size={14} />
                </button>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="px-4 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Container for Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[75vh] overflow-hidden rounded-2xl border border-slate-800 shadow-2xl z-10"
            >
              <img
                src={activePhoto}
                alt="Enlarged community memory"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <span className="text-[10px] text-slate-500 font-sans font-light mt-4 z-10">
              Press anywhere to return to the gallery grid view.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
