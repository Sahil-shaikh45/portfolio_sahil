import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Terminal } from 'lucide-react';

const Github = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
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
    width="24"
    height="24"
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

export default function Hero() {
  const roles = [
    "Full Stack Developer",
    "Java & Spring Boot Engineer",
    "Backend Developer"
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const fullText = roles[currentRoleIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Decorative Glowing Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-accent-teal/20 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-3xl animate-pulse-glow pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight mb-4"
        >
          Hi, I am{' '}
          <span className="bg-gradient-to-r from-accent-teal via-teal-400 to-blue-500 bg-clip-text text-transparent glow-text-teal">
            Sahil Shaikh
          </span>
        </motion.h1>

        {/* Dynamic Typing Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-10 sm:h-12 text-xl sm:text-2xl md:text-3xl font-display font-medium text-slate-700 dark:text-slate-300 mb-8"
        >
          I'm a <span className="text-slate-900 dark:text-white border-r-2 border-accent-teal dark:border-accent-glowTeal typewriter-cursor pr-1">{currentText}</span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Motivated Java Full Stack Developer with hands-on experience building enterprise ERP solutions, 
          government monitoring systems, and responsive web applications using Spring Boot, React, and MySQL.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() => handleScrollTo('projects')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-teal to-blue-600 hover:from-accent-lightTeal hover:to-blue-500 text-white font-medium shadow-lg shadow-accent-teal/10 hover:shadow-accent-teal/20 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleScrollTo('contact')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-300 dark:border-slate-800 hover:border-accent-teal/50 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium transition-all duration-200 bg-white/50 dark:bg-slate-950/20 backdrop-blur-sm"
          >
            Contact Me
          </button>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center space-x-6 text-slate-500 dark:text-slate-400"
        >
          <a
            href="https://github.com/Sahil-shaikh45"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-teal dark:hover:text-accent-glowTeal transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/sahilshaikh3033/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-teal dark:hover:text-accent-glowTeal transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:sahilms3033@gmail.com"
            className="hover:text-accent-teal dark:hover:text-accent-glowTeal transition-colors duration-200"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </motion.div>
      </div>

      {/* Down arrow indicator */}
      <div
        onClick={() => handleScrollTo('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-slate-400 hover:text-accent-teal dark:hover:text-accent-glowTeal transition-colors duration-200 animate-bounce hidden sm:block"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
