import { useState, useEffect } from "react";
import { Menu, X, Instagram, Users, Sun, Moon } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export default function Navbar({ activeSection, onNavigate, theme, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Our Wings", id: "wings" },
    { name: "Events", id: "events" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact", id: "contact" }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-900 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleLinkClick("home")}>
            <div className="flex items-center space-x-2">
              <span className="text-2xl md:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 bg-clip-text text-transparent filter drop-shadow-md font-display">
                IMC
              </span>
              <div className="hidden sm:block border-l border-slate-300 dark:border-slate-800 h-6 mx-2" />
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-bold text-slate-900 dark:text-white tracking-widest leading-none font-sans uppercase">
                  Tirupati
                </span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                  IT'S MY COMMUNITY
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-orange-500 dark:hover:text-orange-400 relative py-1 ${
                  activeSection === link.id ? "text-orange-500 dark:text-orange-400 font-semibold" : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500/30 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <a
              href="https://www.instagram.com/imc.tirupati?igsh=MTE2ZjJzYXpmdXg4MQ=="
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-white transition-colors p-2"
              title="Official Instagram"
            >
              <Instagram size={20} />
            </a>
            <button
              onClick={() => handleLinkClick("contact")}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-2 px-5 rounded-full text-xs tracking-wider uppercase transition-transform active:scale-95 shadow-lg shadow-orange-500/20"
            >
              <Users size={14} />
              <span>Join Community</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-orange-500 transition-colors"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a
              href="https://www.instagram.com/imc.tirupati?igsh=MTE2ZjJzYXpmdXg4MQ=="
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 dark:text-slate-400 hover:text-orange-500 p-2"
            >
              <Instagram size={18} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 dark:text-slate-400 hover:text-orange-500 p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900 px-4 pt-2 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                activeSection === link.id
                  ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-900 flex flex-col space-y-3 px-3">
            <button
              onClick={() => handleLinkClick("contact")}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 px-4 rounded-xl text-sm tracking-wider uppercase shadow-md"
            >
              <Users size={16} />
              <span>Join Community</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
