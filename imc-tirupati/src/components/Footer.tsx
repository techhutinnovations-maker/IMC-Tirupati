import { Instagram, Mail, Phone, Heart, ArrowUp } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Our Wings", id: "wings" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact & Enquiry", id: "contact" }
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900/80 pt-16 pb-8 relative overflow-hidden transition-colors duration-300">
      {/* Footer Ambient Background circle */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-200 dark:border-slate-900">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-5 text-left space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 bg-clip-text text-transparent font-display">
                IMC
              </span>
              <div className="border-l border-slate-200 dark:border-slate-800 h-6 mx-2" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 dark:text-white tracking-widest leading-none font-sans uppercase">
                  Tirupati
                </span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium tracking-tight">
                  IT'S MY COMMUNITY
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed font-sans max-w-sm">
              IMC Tirupati is a licensed, community-driven platform created to bring together residents, students, and professionals through shared passions, active hobbies, and lifelong meaningful friendships.
            </p>

            {/* Social media icons */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://www.instagram.com/imc.tirupati?igsh=MTE2ZjJzYXpmdXg4MQ=="
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-850 transition-colors"
                title="Follow on Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="mailto:hello@imctirupati.org"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-850 transition-colors"
                title="Email Support"
              >
                <Mail size={16} />
              </a>
              <a
                href="tel:+919123467890"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-850 transition-colors"
                title="Call Support"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation links */}
          <div className="md:col-span-3 text-left space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-orange-500 dark:text-orange-400 uppercase font-sans">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-sans cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Local Hours / Legal Info */}
          <div className="md:col-span-4 text-left space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-orange-500 dark:text-orange-400 uppercase font-sans">
              Our Presence
            </h4>
            <div className="space-y-3 font-sans font-light text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <p>
                <strong className="text-slate-800 dark:text-white font-semibold">HQ Address:</strong><br />
                Samskruthi Community Center, Near Kapilatheertham Road, Tirupati, Andhra Pradesh, 517501, India.
              </p>
              <p>
                <strong className="text-slate-800 dark:text-white font-semibold">Hours of Eventing:</strong><br />
                Every Saturday & Sunday from 3:00 PM onwards. Individual club meetups occur during weekdays.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright block */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500 dark:text-slate-500 font-sans font-light">
            &copy; {new Date().getFullYear()} IMC Tirupati. All rights reserved. Registered community project.
          </p>
          <div className="flex items-center space-x-4 text-[11px] text-slate-500">
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart size={10} className="text-rose-500 fill-rose-500" />
              <span>for Tirupati</span>
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              onClick={handleScrollToTop}
              className="inline-flex items-center space-x-1 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
