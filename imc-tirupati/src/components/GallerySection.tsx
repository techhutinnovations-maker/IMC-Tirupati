import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_ITEMS } from "../data";
import { Eye, Heart, Camera, ChevronLeft, ChevronRight, Share2, Maximize2 } from "lucide-react";

interface GallerySectionProps {
  onExploreStandalone: () => void;
}

export default function GallerySection({ onExploreStandalone }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = ["all", "Music", "Playing", "Books", "Craft", "Social", "Photo"];

  const filteredItems = selectedCategory === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current: el } = scrollRef;
      const scrollAmount = direction === "left" ? -400 : 400;
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <section id="gallery" className="py-24 md:py-36 bg-white dark:bg-[#030303] relative overflow-hidden transition-colors duration-500">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_65%)] from-orange-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="space-y-6 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Visual Journal</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
              Moments <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Documented.</span>
            </h2>
            
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-md">
              A cinematic look into the heartbeat of Tirupati's most vibrant community gatherings.
            </p>
          </div>

          {/* Modern Category Pill Selector */}
          <div className="flex flex-wrap gap-2 bg-slate-100 dark:bg-white/5 p-2 rounded-[2rem] border border-slate-200 dark:border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-6 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${
                  selectedCategory === cat ? "text-white" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {selectedCategory === cat && (
                  <motion.div 
                    layoutId="activeGalleryTab"
                    className="absolute inset-0 bg-orange-500 rounded-full shadow-lg shadow-orange-500/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cinematic Slider Container */}
        <div className="relative group">
          {/* Navigation Controls */}
          <div className="absolute -top-16 right-0 flex gap-3 z-20">
            <button 
              onClick={() => scroll("left")}
              className="p-4 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all shadow-xl"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="p-4 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all shadow-xl"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-12 pt-4 scrollbar-none snap-x snap-mandatory"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="flex-shrink-0 w-[320px] md:w-[450px] aspect-[10/12] relative rounded-[2.5rem] overflow-hidden group/card snap-center cursor-none"
                  onClick={() => setActivePhoto(item.url)}
                >
                  {/* Image with Parallax effect on hover */}
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                  />

                  {/* Glassmorphic Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover/card:opacity-100 transition-opacity" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end transform transition-transform duration-500">
                    <div className="space-y-4 translate-y-8 group-hover/card:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black text-white uppercase tracking-widest">
                          {item.category}
                        </span>
                        <div className="h-px flex-1 bg-white/20" />
                      </div>
                      
                      <h3 className="text-3xl font-bold text-white leading-tight">
                        {item.title}
                      </h3>

                      <div className="flex items-center justify-between pt-4 opacity-0 group-hover/card:opacity-100 transition-opacity delay-100">
                         <div className="flex items-center gap-4">
                            <button 
                              onClick={(e) => handleLike(item.id, e)}
                              className="flex items-center gap-2 text-white group/like"
                            >
                              <Heart size={20} className={`${likes[item.id] ? "fill-rose-500 text-rose-500" : "text-white"} transition-colors`} />
                              <span className="text-sm font-bold">{likes[item.id] || 0}</span>
                            </button>
                            <Share2 size={18} className="text-white/60 hover:text-white transition-colors" />
                         </div>
                         <Maximize2 size={18} className="text-white/60" />
                      </div>
                    </div>
                  </div>

                  {/* Custom Cursor Follower for Cards */}
                  <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-lg border border-white/30 flex items-center justify-center text-white scale-50 group-hover/card:scale-100 transition-transform duration-500">
                      <span className="text-[10px] font-black uppercase tracking-tighter">View</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Photowalk CTA - Premium Card Style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 p-12 rounded-[3rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative"
        >
          {/* Decorative Circle */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex-1 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-black/10 border border-white/10 dark:border-black/10">
              <Camera size={16} className="text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Calling all Photographers</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Capture the Soul of Tirupati.</h3>
            <p className="text-white/60 dark:text-slate-500 max-w-xl text-lg font-medium">
              Join our exclusive heritage photowalks. Document culture, master lighting, and tell stories through your lens.
            </p>
          </div>

          <a
            href="#"
            className="relative z-10 px-10 py-5 rounded-full bg-orange-500 text-white font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-500/20"
          >
            Join Next Photowalk
          </a>
        </motion.div>

        {/* Explore More Trigger */}
        <div className="mt-12 text-center">
          <button 
            onClick={onExploreStandalone}
            className="text-slate-400 hover:text-orange-500 font-bold text-xs uppercase tracking-[0.2em] transition-colors flex items-center gap-3 mx-auto"
          >
            <span>Dive into the Full Archive</span>
            <div className="h-px w-12 bg-current" />
          </button>
        </div>
      </div>

      {/* Modern Cinematic Lightbox */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6 md:p-12 cursor-zoom-out backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-6xl w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            >
              <img
                src={activePhoto}
                alt="Enlarged community memory"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}