import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Scroll, ShieldCheck, Users, Printer, Copy, Check } from "lucide-react";

interface LegalPageProps {
  type: "terms" | "privacy" | "guidelines";
  onBack: () => void;
}

export default function LegalPage({ type, onBack }: LegalPageProps) {
  const [copied, setCopied] = useState(false);

  const content = {
    terms: {
      title: "Terms of Service",
      subtitle: "The rules of the Tirupati Tribe.",
      icon: <Scroll className="w-8 h-8" />,
      sections: [
        { h: "1. Acceptance", p: "By accessing IMC Tirupati, you agree to follow our community rules and local laws. We are a collective of builders and creators." },
        { h: "2. Visual Archive", p: "We document community history. By attending events, you acknowledge you may appear in the Visual Diary. We honor all removal requests." },
        { h: "3. Liability", p: "Participation in physical activities (trekking, sports) is at your own risk. IMC is a platform for connection, not a regulated service provider." }
      ]
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "How we protect your digital footprint.",
      icon: <ShieldCheck className="w-8 h-8" />,
      sections: [
        { h: "1. Data Collection", p: "We only collect what you give us (Name, Email, Phone) via our enquiry cards to help you join the right Wing." },
        { h: "2. Data Usage", p: "Your data is used to send event coordinates and community updates. We never sell your info to third-party 'suits'." },
        { h: "3. Your Rights", p: "You have the right to be forgotten. Email us to wipe your contact info or archive photos at any time." }
      ]
    },
    guidelines: {
      title: "Community Guidelines",
      subtitle: "The soul of our collective.",
      icon: <Users className="w-8 h-8" />,
      sections: [
        { h: "1. Radical Respect", p: "Tirupati is diverse. We welcome all backgrounds. Harassment or exclusion is an immediate exit from the Tribe." },
        { h: "2. Non-Commercial", p: "Wings are for connection, not for cold-pitching your services or spamming members with 'opportunities'." },
        { h: "3. Create First", p: "We encourage 'doing' over 'talking'. Bring something to the table—an instrument, a book, or an idea." }
      ]
    }
  }[type];

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] selection:bg-orange-500 selection:text-white transition-colors duration-500">
      <style>{`
        .font-display { font-family: 'Fraunces', serif; }
        .font-hand { font-family: 'Caveat', cursive; }
        .legal-card { background: var(--card); border: 1px solid var(--board); }
      `}</style>

      {/* FIXED NAV */}
      <nav className="fixed top-0 w-full h-20 flex items-center justify-between px-6 md:px-12 backdrop-blur-xl z-50 border-b border-[var(--board)]/50">
        <button onClick={onBack} className="group flex items-center gap-3">
          <div className="p-2 rounded-full border border-[var(--board)] group-hover:bg-[var(--ink)] group-hover:text-[var(--paper)] transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Return Home</span>
        </button>

        <div className="flex gap-2">
          <button onClick={handleCopy} className="p-3 rounded-full hover:bg-[var(--board)] transition-all">
            {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
          </button>
          <button onClick={() => window.print()} className="p-3 rounded-full hover:bg-[var(--board)] transition-all">
            <Printer size={18} />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-xl shadow-orange-500/20">
              {content.icon}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-1 block">Legal Document</span>
              <p className="text-xs opacity-40 font-bold uppercase tracking-widest">Last Updated: Oct 2024</p>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8"
          >
            {content.title.split(' ')[0]} <br />
            <span className="italic font-normal text-[var(--ink-soft)]">{content.title.split(' ').slice(1).join(' ')}</span>
          </motion.h1>

          <p className="font-hand text-3xl text-[var(--ink-soft)] max-w-lg">
            {content.subtitle}
          </p>
        </div>
      </header>

      {/* CONTENT GRID */}
      <main className="max-w-4xl mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 gap-12">
          {content.sections.map((section, idx) => (
            <motion.section 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="legal-card p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group"
            >
              {/* Decorative Section Number */}
              <span className="absolute top-8 right-12 font-display text-8xl font-black opacity-[0.03] group-hover:opacity-[0.07] transition-opacity select-none">
                0{idx + 1}
              </span>

              <h2 className="font-display text-3xl font-black mb-6 relative z-10">
                {section.h}
              </h2>
              <p className="text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed font-medium relative z-10">
                {section.p}
              </p>
            </motion.section>
          ))}

          {/* SIGNATURE / CALLOUT */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 p-8 md:p-12 border-2 border-dashed border-[var(--board)] rounded-[2.5rem] text-center"
          >
            <p className="font-hand text-3xl text-orange-500 mb-4">"Building a kinder Tirupati, one gathering at a time."</p>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 italic">
              Official Document of IMC Tribe
            </p>
          </motion.div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t border-[var(--board)]/50 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
          © 2024 IMC Tirupati Archives • All Rights Reserved
        </p>
      </footer>
    </div>
  );
}