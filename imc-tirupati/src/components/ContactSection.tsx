import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, Instagram, Send, CheckCircle, Sparkles } from "lucide-react";
import { EnquiryForm } from "../types";

interface ContactSectionProps {
  prefilledWing: string;
  prefilledType: string;
  onClearPrefills: () => void;
}

export default function ContactSection({ prefilledWing, prefilledType, onClearPrefills }: ContactSectionProps) {
  const [form, setForm] = useState<EnquiryForm>({
    fullName: "",
    email: "",
    phone: "",
    wing: "",
    enquiryType: "",
    message: ""
  });

  const [errors, setErrors] = useState<Partial<EnquiryForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync prefilled data from other components
  useEffect(() => {
    if (prefilledWing || prefilledType) {
      setForm((prev) => ({
        ...prev,
        wing: prefilledWing || prev.wing,
        enquiryType: prefilledType || prev.enquiryType,
        message: prefilledType === "Attend an Event" 
          ? `Hi! I would love to RSVP and attend the upcoming event with the ${prefilledWing}. Please send me the location coordinates and event details.` 
          : prev.message
      }));
    }
  }, [prefilledWing, prefilledType]);

  const validate = () => {
    const newErrors: Partial<EnquiryForm> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\s-]{10,15}$/.test(form.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!form.wing) newErrors.wing = "Please select a wing";
    if (!form.enquiryType) newErrors.enquiryType = "Please select an enquiry type";
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof EnquiryForm]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API Submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onClearPrefills();
      setForm({
        fullName: "",
        email: "",
        phone: "",
        wing: "",
        enquiryType: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Contact details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest text-orange-500 dark:text-orange-400 uppercase font-sans">
                Get Connected Today
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display leading-tight">
                We'd Love to <br />
                Hear <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">From You!</span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light font-sans leading-relaxed">
                Have a question, suggestion, or want to collaborate with us? Drop us a line! Select your interested wing and our coordinator will get back to you within 24 hours.
              </p>
            </div>

            {/* Quick Stats/Highlights cards */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 transition-colors duration-300">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Phone size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans uppercase">Call / WhatsApp</h4>
                  <p className="text-sm font-semibold text-slate-700 dark:text-white mt-0.5">+91 91234 67890</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 transition-colors duration-300">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans uppercase">Email Us</h4>
                  <p className="text-sm font-semibold text-slate-700 dark:text-white mt-0.5">hello@imctirupati.org</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 transition-colors duration-300">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Instagram size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans uppercase">Instagram DM</h4>
                  <a
                    href="https://www.instagram.com/imc.tirupati?igsh=MTE2ZjJzYXpmdXg4MQ=="
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-slate-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors mt-0.5 block"
                  >
                    @imc.tirupati
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact/Enquiry Form */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-900 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden transition-colors duration-300">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-6 text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans uppercase">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border text-slate-800 dark:text-slate-300 text-sm focus:outline-none focus:ring-1 ${
                          errors.fullName ? "border-rose-500 focus:ring-rose-500" : "border-slate-200 dark:border-slate-800 focus:border-orange-500 focus:ring-orange-500"
                        }`}
                        placeholder="e.g. Rahul Sharma"
                      />
                      {errors.fullName && <p className="text-[10px] text-rose-500 font-sans font-medium">{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans uppercase">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border text-slate-800 dark:text-slate-300 text-sm focus:outline-none focus:ring-1 ${
                          errors.email ? "border-rose-500 focus:ring-rose-500" : "border-slate-200 dark:border-slate-800 focus:border-orange-500 focus:ring-orange-500"
                        }`}
                        placeholder="e.g. rahul@example.com"
                      />
                      {errors.email && <p className="text-[10px] text-rose-500 font-sans font-medium">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans uppercase">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border text-slate-800 dark:text-slate-300 text-sm focus:outline-none focus:ring-1 ${
                          errors.phone ? "border-rose-500 focus:ring-rose-500" : "border-slate-200 dark:border-slate-800 focus:border-orange-500 focus:ring-orange-500"
                        }`}
                        placeholder="e.g. +91 9876543210"
                      />
                      {errors.phone && <p className="text-[10px] text-rose-500 font-sans font-medium">{errors.phone}</p>}
                    </div>

                    {/* Interested Wing */}
                    <div className="space-y-1.5">
                      <label htmlFor="wing" className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans uppercase">
                        Interested Wing / Club *
                      </label>
                      <select
                        id="wing"
                        name="wing"
                        value={form.wing}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border text-slate-850 dark:text-slate-300 text-sm focus:outline-none focus:ring-1 ${
                          errors.wing ? "border-rose-500 focus:ring-rose-500" : "border-slate-200 dark:border-slate-800 focus:border-orange-500 focus:ring-orange-500"
                        }`}
                      >
                        <option value="">-- Choose Wing --</option>
                        <option value="Music Club">Music Club</option>
                        <option value="Books Club">Books Club</option>
                        <option value="Playing & Games Wing">Playing & Games Wing</option>
                        <option value="Craft Club">Craft Club</option>
                        <option value="Photo Club">Photo Club</option>
                        <option value="Social Club">Social Club</option>
                        <option value="All Wings / Just general info">All Wings / Multi-interest</option>
                      </select>
                      {errors.wing && <p className="text-[10px] text-rose-500 font-sans font-medium">{errors.wing}</p>}
                    </div>
                  </div>

                  {/* Enquiry Type */}
                  <div className="space-y-1.5">
                    <label htmlFor="enquiryType" className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans uppercase">
                      Enquiry Type *
                    </label>
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      value={form.enquiryType}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border text-slate-850 dark:text-slate-300 text-sm focus:outline-none focus:ring-1 ${
                        errors.enquiryType ? "border-rose-500 focus:ring-rose-500" : "border-slate-200 dark:border-slate-800 focus:border-orange-500 focus:ring-orange-500"
                      }`}
                    >
                      <option value="">-- Choose Enquiry Type --</option>
                      <option value="Join a Wing">Join a Wing</option>
                      <option value="Attend an Event">Attend an Event / RSVP</option>
                      <option value="Collaboration">Collaboration / Host joint event</option>
                      <option value="Partnership / Sponsorship">Partnership / Sponsorship</option>
                      <option value="Volunteer">Volunteer / Social Welfare</option>
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                    {errors.enquiryType && <p className="text-[10px] text-rose-500 font-sans font-medium">{errors.enquiryType}</p>}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans uppercase">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border text-slate-800 dark:text-slate-300 text-sm focus:outline-none focus:ring-1 ${
                        errors.message ? "border-rose-500 focus:ring-rose-500" : "border-slate-200 dark:border-slate-800 focus:border-orange-500 focus:ring-orange-500"
                      }`}
                      placeholder="Hi! Tell us a bit about your interests and why you want to connect with IMC Tirupati..."
                    />
                    {errors.message && <p className="text-[10px] text-rose-500 font-sans font-medium">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-xl text-sm tracking-wider uppercase transition-all shadow-lg shadow-orange-500/15 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Send Enquiry</span>
                      </>
                    )}
                  </button>

                </motion.form>
              ) : (
                <motion.div
                  key="success-card"
                  className="py-12 px-4 text-center space-y-6 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/5 animate-bounce">
                    <CheckCircle size={44} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-850 dark:text-white font-display">Enquiry Submitted Successfully!</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-sans max-w-md mx-auto">
                      Thank you for reaching out, your form was received. Our Tirupati team leads will get in touch with you via email or WhatsApp shortly.
                    </p>
                  </div>

                  {/* WhatsApp/Instagram join suggestion */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 max-w-md w-full flex items-center space-x-3 text-left transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 dark:text-pink-400 shrink-0">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white font-display">While you wait...</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans mt-0.5">Follow our Instagram to see pictures of last week's acoustic circle and upcoming trek countdowns!</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsSuccess(false)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold tracking-wider text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-white uppercase font-sans transition-colors cursor-pointer"
                  >
                    <span>Submit another enquiry</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
}
