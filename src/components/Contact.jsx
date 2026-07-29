import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Github = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-3xl sm:text-4xl tracking-tight"
          >
            Get In <span className="text-accent-teal dark:text-accent-glowTeal">Touch</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-accent-teal mx-auto mt-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
          {/* Info Details (Left Column) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              <h3 className="font-display font-bold text-2xl text-slate-800 dark:text-white">
                Let's discuss your next project
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Whether you want to discuss full-stack opportunities, database structure, APIs, 
                or full-stack architectures, feel free to drop a message or connect directly.
              </p>

              <div className="space-y-4 pt-4">
                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-accent-teal/10 dark:bg-accent-teal/5 text-accent-teal dark:text-accent-glowTeal">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Me</h4>
                    <a href="mailto:sahilms3033@gmail.com" className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-accent-teal dark:hover:text-accent-glowTeal transition-colors duration-200">
                      sahilms3033@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-accent-teal/10 dark:bg-accent-teal/5 text-accent-teal dark:text-accent-glowTeal">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Call Me</h4>
                    <a href="tel:+918080081811" className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-accent-teal dark:hover:text-accent-glowTeal transition-colors duration-200">
                      +91 8080081811
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-accent-teal/10 dark:bg-accent-teal/5 text-accent-teal dark:text-accent-glowTeal">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</h4>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      Pune, Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials Connection */}
            <div className="space-y-3 pt-6 border-t border-slate-200/50 dark:border-slate-800/40">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Connect with me</h4>
              <div className="flex space-x-3">
                <a
                  href="https://github.com/Sahil-shaikh45"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-accent-teal/50 dark:hover:border-accent-teal/50 hover:text-accent-teal dark:hover:text-accent-glowTeal transition-all duration-200 flex items-center space-x-2 text-sm font-medium"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/sahilshaikh3033/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-accent-teal/50 dark:hover:border-accent-teal/50 hover:text-accent-teal dark:hover:text-accent-glowTeal transition-all duration-200 flex items-center space-x-2 text-sm font-medium"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Block (Right Column) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 glass-panel h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-slate-950/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent-teal/30 focus:border-accent-teal dark:focus:ring-accent-glowTeal/30 dark:focus:border-accent-glowTeal transition-all duration-200 text-slate-800 dark:text-slate-100 ${
                          errors.name 
                            ? 'border-red-500/60 focus:ring-red-500/20 focus:border-red-500' 
                            : 'border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-slate-950/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent-teal/30 focus:border-accent-teal dark:focus:ring-accent-glowTeal/30 dark:focus:border-accent-glowTeal transition-all duration-200 text-slate-800 dark:text-slate-100 ${
                          errors.email 
                            ? 'border-red-500/60 focus:ring-red-500/20 focus:border-red-500' 
                            : 'border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-slate-950/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent-teal/30 focus:border-accent-teal dark:focus:ring-accent-glowTeal/30 dark:focus:border-accent-glowTeal transition-all duration-200 text-slate-800 dark:text-slate-100 resize-none ${
                          errors.message 
                            ? 'border-red-500/60 focus:ring-red-500/20 focus:border-red-500' 
                            : 'border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80'
                        }`}
                        placeholder="Type your project description here..."
                      />
                      {errors.message && <p className="text-xs text-red-500 mt-1.5">{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-teal to-blue-600 hover:from-accent-lightTeal hover:to-blue-500 text-white font-medium shadow-md shadow-accent-teal/10 hover:shadow-accent-teal/20 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-accent-teal/10 text-accent-teal dark:text-accent-glowTeal mb-2">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-slate-800 dark:text-white">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out, Sahil will get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-6 px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-accent-teal/50 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-all duration-200"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
