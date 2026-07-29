import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/50 dark:border-slate-800/40 bg-white/30 dark:bg-slate-950/20 backdrop-blur-sm py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Branding */}
        <div className="font-display font-bold text-lg text-slate-800 dark:text-slate-200">
          Sahil<span className="text-accent-teal">Shaikh</span>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          {['hero', 'about', 'skills', 'projects', 'achievements', 'contact'].map((id) => (
            <button
              key={id}
              onClick={() => {
                const el = document.getElementById(id);
                if (el) {
                  const offset = 80;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elRect = el.getBoundingClientRect().top;
                  window.scrollTo({
                    top: elRect - bodyRect - offset,
                    behavior: 'smooth'
                  });
                }
              }}
              className="hover:text-accent-teal dark:hover:text-accent-glowTeal transition-colors duration-200 capitalize"
            >
              {id === 'hero' ? 'Home' : id}
            </button>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
          <span>&copy; {currentYear} Sahil Shaikh. All rights reserved.</span>
          <span className="flex items-center gap-0.5">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> in Pune
          </span>
        </p>
      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 p-3.5 rounded-full bg-slate-900 dark:bg-slate-800 border border-slate-700/80 hover:border-accent-teal/50 hover:bg-slate-800 dark:hover:bg-slate-700 text-white shadow-xl hover:shadow-accent-teal/15 transition-all duration-200 group"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200 text-accent-glowTeal" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
