import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "How do I join IMC Tirupati or any of the clubs?",
      answer: "Joining is simple and open to everyone! Just scroll down to our Contact & Enquiry section, select your interested wing, and submit the quick form. A club coordinator will reach out to you within 24 hours to guide you into our active WhatsApp and Discord community channels where weekend plans are organized."
    },
    {
      question: "Is there a membership fee to participate?",
      answer: "No, IMC Tirupati is a non-commercial, community-first initiative. Our weekly routine gatherings, sunset jam sessions, book discussions, and silent reading hours are completely free. For activities requiring rental bookings (like weekend turf sports or Talakona outdoor treks), expenses are split transparently among attendees."
    },
    {
      question: "Can I be a member of multiple wings at the same time?",
      answer: "Absolutely! Most of our community members love exploring different hobbies. You are highly encouraged to jam with the Music Club, read with the Books Club, and hike with the Playing & Games wing whenever you wish. There are no restrictions."
    },
    {
      question: "How do I volunteer for the Social Club's welfare drives?",
      answer: "We orchestrate environmental preservation drives, green tree plantations, and kid education programs regularly. Simply fill out our contact form, select 'Social Club' as your wing, and choose 'Volunteer / Social Welfare' as your enquiry type. Our coordinator will add you to the volunteers' roster."
    },
    {
      question: "Where do the weekend meetups usually take place?",
      answer: "Our meetups take place across various accessible outdoor grounds, cozy cafes, and community halls in Tirupati. Key spots include Samskruthi Open Grounds, local cafes near Kapilatheertham Road, and scenic nature paths. Once you RSVP, you will receive the exact Google Maps coordinates."
    },
    {
      question: "Do I need to be skilled or experienced to participate?",
      answer: "Not at all! All our clubs are completely beginner-friendly and low-pressure. Whether you are holding a paint brush for the first time, have never sung in public, or are a casual board gamer, you will find a highly supportive and warm group of friends waiting to guide you."
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900/80 relative overflow-hidden transition-colors duration-300">
      {/* Visual background decorations */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-orange-500 dark:text-orange-400 uppercase font-sans flex items-center justify-center space-x-1.5">
            <Sparkles size={12} className="animate-pulse" />
            <span>Got Questions?</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display leading-tight">
            Frequently Asked <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Questions.</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light font-sans max-w-xl mx-auto">
            Everything you need to know about joining our wings, attending events, and making the most of the IMC community experience.
          </p>
        </div>

        {/* Accordion FAQ Grid */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-white dark:bg-slate-900/40 border-orange-500/30 dark:border-orange-500/30 shadow-xl shadow-orange-500/5"
                    : "bg-white/80 dark:bg-slate-900/10 border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900/25"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                >
                  <div className="flex items-center space-x-4 pr-4">
                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-orange-500/10 text-orange-500 dark:text-orange-400" : "bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500"
                    }`}>
                      <HelpCircle size={16} />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-white font-display leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-orange-500 dark:text-orange-400" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pl-17 md:px-6 md:pb-6 md:pl-18 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-sans font-light text-left border-t border-slate-100 dark:border-slate-900/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Suggestion block */}
        <div className="mt-12 text-center text-xs text-slate-500 dark:text-slate-500 font-sans">
          <span>Still have questions? </span>
          <a
            href="#contact"
            className="text-orange-600 dark:text-orange-400 font-semibold hover:underline transition-all"
            onClick={(e) => {
              e.preventDefault();
              const contactSec = document.getElementById("contact");
              if (contactSec) {
                contactSec.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Submit an enquiry form below
          </a>
          <span> or WhatsApp our team at </span>
          <span className="text-slate-700 dark:text-slate-300 font-medium">+91 91234 67890</span>
        </div>

      </div>
    </section>
  );
}
