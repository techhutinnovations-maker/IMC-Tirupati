import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import WingsSection from "./components/WingsSection";
import EventsSection from "./components/EventsSection";
import GallerySection from "./components/GallerySection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import GalleryPage from "./components/GalleryPage";
import Footer from "./components/Footer";

export default function App() {
  const [view, setView] = useState<"home" | "gallery">("home");
  const [activeSection, setActiveSection] = useState("home");
  const [prefilledWing, setPrefilledWing] = useState("");
  const [prefilledType, setPrefilledType] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("imc-theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Sync theme with document class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("imc-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Smooth scroll and routing handler
  const handleNavigate = (sectionId: string) => {
    if (sectionId === "gallery") {
      setView("gallery");
      setActiveSection("gallery");
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return;
    }

    setView("home");
    setActiveSection(sectionId);

    // Give state a brief moment to render the home page before scrolling to the section
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // height of fixed header
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 60);
  };

  // Callback when a user clicks RSVP or join event in EventsSection
  const handleJoinEvent = (wingName: string, eventName: string) => {
    setPrefilledWing(wingName);
    setPrefilledType("Attend an Event");
    handleNavigate("contact");
  };

  const handleClearPrefills = () => {
    setPrefilledWing("");
    setPrefilledType("");
  };

  // Monitor scrolling to highlight the active navigation link dynamically
  useEffect(() => {
    if (view === "gallery") {
      setActiveSection("gallery");
      return;
    }

    const sections = ["home", "about", "wings", "events", "gallery", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160; // offset

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [view]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* If view is gallery, we render the standalone Gallery page with its custom header */}
      {view === "gallery" ? (
        <GalleryPage onBackToHome={() => handleNavigate("home")} theme={theme} onToggleTheme={toggleTheme} />
      ) : (
        <>
          {/* Dynamic Navigation */}
          <Navbar activeSection={activeSection} onNavigate={handleNavigate} theme={theme} onToggleTheme={toggleTheme} />

          {/* Hero Banner Section (Highlights vibrant community engagement first) */}
          <Hero onNavigate={handleNavigate} />

          {/* About Section */}
          <AboutSection />

          {/* Six Wings/Clubs Section with interactive details */}
          <WingsSection />

          {/* Upcoming Events Section with RSVP */}
          <EventsSection onJoinClick={handleJoinEvent} />

          {/* Summary / Fast Preview of the Gallery Section with a CTA to open standalone Gallery */}
          <GallerySection onExploreStandalone={() => handleNavigate("gallery")} />

          {/* Testimonials Carousel Section */}
          <TestimonialsSection />

          {/* FAQ Section */}
          <FAQSection />

          {/* Contact & Enquiry Form */}
          <ContactSection
            prefilledWing={prefilledWing}
            prefilledType={prefilledType}
            onClearPrefills={handleClearPrefills}
          />
        </>
      )}

      {/* Dynamic rich Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
