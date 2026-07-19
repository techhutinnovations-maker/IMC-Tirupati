import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Quote, Star, MessageSquare, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "../data";

// Helper to split testimonials into two compact rows
const row1 = TESTIMONIALS.slice(0, 6);
const row2 = TESTIMONIALS.slice(6, 12);

const TiltCard = ({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Map mouse position to rotation (Max 15 degrees tilt)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Reflection/Shine effect following the mouse
  const shineOpacity = useTransform(mouseYSpring, [-0.5, 0.5], [0, 0.3]);
  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate normalized value between -0.5 and 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-[340px] shrink-0 p-8 mx-4 rounded-[2.5rem] 
                 bg-white dark:bg-white/[0.04] backdrop-blur-2xl
                 border border-slate-200 dark:border-white/10 
                 hover:border-orange-500/50 transition-colors duration-500 group cursor-grab active:cursor-grabbing"
    >
      {/* Dynamic Shine Effect */}
      <motion.div
        style={{ opacity: shineOpacity, left: shineX }}
        className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-transparent via-white to-transparent skew-x-12"
      />

      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="fill-orange-500 text-orange-500" />
          ))}
        </div>

        <p className="text-slate-700 dark:text-slate-200 text-base leading-relaxed mb-6 italic whitespace-normal">
          "{testimonial.quote}"
        </p>

        <div className="flex items-center gap-4 pt-5 border-t border-slate-100 dark:border-white/5">
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-orange-500/20"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">
              {testimonial.author}
            </h4>
            <p className="text-[10px] text-orange-600 dark:text-orange-400 font-bold uppercase tracking-[0.15em] mt-1">
              {testimonial.role}
            </p>
          </div>
          <Quote size={24} className="text-slate-100 dark:text-white/5 shrink-0" />
        </div>
      </div>
    </motion.div>
  );
};

const MarqueeRow = ({ items, direction = "left", speed = 50 }: { items: any[], direction?: "left" | "right", speed?: number }) => {
  const [isPaused, setIsPaused] = React.useState(false);

  return (
    <div 
      className="flex overflow-hidden perspective-1000 py-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        animate={{ x: isPaused ? undefined : (direction === "left" ? [0, -1800] : [-1800, 0]) }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...items, ...items, ...items].map((t, idx) => (
          <TiltCard key={idx} testimonial={t} />
        ))}
      </motion.div>
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <section className="relative min-h-screen py-24 flex flex-col justify-center bg-slate-50 dark:bg-[#050505] overflow-hidden transition-colors">
      
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-500/10 rounded-full blur-[120px]" 
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xl"
          >
            <MessageSquare size={14} className="text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Community Love
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]"
          >
            JOIN THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-orange-600">
              TIRUPATI TRIBE.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Move your mouse over the cards to experience the depth of our community. 
            Real feedback from local hobbyists.
          </motion.p>
        </div>

        {/* Marquee with Tilt Cards */}
        <div className="relative">
          {/* Cinematic Side Masks */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-slate-50 dark:from-[#050505] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-slate-50 dark:from-[#050505] to-transparent z-20 pointer-events-none" />
          
          <MarqueeRow items={row1} direction="left" speed={60} />
          <MarqueeRow items={row2} direction="right" speed={80} />
        </div>

        {/* Action Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <div className="flex -space-x-3">
              {TESTIMONIALS.slice(0, 4).map((t, i) => (
                <img key={i} src={t.avatar} className="w-10 h-10 rounded-full border-4 border-slate-50 dark:border-[#050505] shadow-lg" alt="" />
              ))}
            </div>
            <p className="text-sm font-black text-slate-900 dark:text-white">
              25k+ Members Strong
            </p>
          </div>

          <button className="group relative flex items-center gap-3 px-10 py-5 bg-orange-500 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-600 transition-all duration-300 shadow-2xl shadow-orange-500/20">
            Apply to Join the Tribe
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>

      </div>

      {/* Tailwind helper classes for perspective */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}