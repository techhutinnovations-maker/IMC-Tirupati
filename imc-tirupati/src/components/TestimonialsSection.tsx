import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS } from "../data";
import { Quote, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play effect
  useEffect(() => {
    if (!isHovered) {
      autoplayTimerRef.current = setInterval(() => {
        handleNext();
      }, 5000); // 5 seconds autoplay
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [currentIndex, isHovered]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-20 md:py-32 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 relative overflow-hidden transition-colors duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-orange-400 uppercase font-sans flex items-center justify-center space-x-1.5">
            <MessageSquare size={12} className="text-orange-500" />
            <span>Community Voices</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display leading-tight">
            Loved by the <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Tirupati Tribe.</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light font-sans max-w-xl mx-auto">
            Read first-hand accounts of how our interest-based clubs have helped local people escape monotony and find genuine connection.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative" id="testimonial-carousel">
          
          {/* Main Card with AnimatePresence */}
          <div className="relative min-h-[320px] sm:min-h-[260px] bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-md flex flex-col justify-between">
            <div className="absolute top-8 right-8 text-slate-300/60 dark:text-slate-800/40 pointer-events-none">
              <Quote size={56} className="rotate-180" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-6 text-left"
              >
                {/* Quote Text */}
                <p className="text-lg sm:text-xl md:text-2xl font-light text-slate-700 dark:text-slate-200 leading-relaxed font-sans italic">
                  "{currentTestimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center space-x-4 pt-4 border-t border-slate-200">
                  <div className="relative shrink-0">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.author}
                      className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/30"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 rounded-full shadow-inner" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                      {currentTestimonial.author}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Navigation Buttons (Desktop only overlay) */}
          <div className="absolute inset-y-0 -left-16 right-auto hidden md:flex items-center">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-orange-400 hover:scale-110 active:scale-95 transition-all shadow-xl hover:border-orange-500/20 cursor-pointer"
              aria-label="Previous testimonial"
              id="testimonial-prev-btn"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <div className="absolute inset-y-0 -right-16 left-auto hidden md:flex items-center">
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-orange-400 hover:scale-110 active:scale-95 transition-all shadow-xl hover:border-orange-500/20 cursor-pointer"
              aria-label="Next testimonial"
              id="testimonial-next-btn"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Mobile navigation row */}
          <div className="flex md:hidden items-center justify-between mt-6 px-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-orange-400 transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Pagination dots (Shared) */}
            <div className="flex space-x-2" id="testimonial-dots">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? "w-6 bg-gradient-to-r from-orange-500 to-amber-500" : "w-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-orange-400 transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Desktop Pagination dots below card */}
          <div className="hidden md:flex justify-center space-x-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? "w-8 bg-gradient-to-r from-orange-500 to-amber-500" : "w-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
