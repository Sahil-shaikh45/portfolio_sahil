import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronUp, X, Code2 } from 'lucide-react';
import fullbodyMale from '../assets/fullbody_3d_male.png';

export default function Scroll3DPresenter({ activeSection }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show widget once user scrolls down slightly (> 250px)
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSectionDetails = () => {
    switch (activeSection) {
      case 'about':
        return {
          title: "About Sahil",
          badge: "MCA & SETTribe Intern",
          desc: "Java Full Stack Developer with 8.17 CGPA"
        };
      case 'skills':
        return {
          title: "Technical Stack",
          badge: "Java • Spring • React • MySQL",
          desc: "REST APIs, Security & Database Architectures"
        };
      case 'projects':
        return {
          title: "Featured Works",
          badge: "ERP & Field Inspection Portals",
          desc: "Production Web Applications & Systems"
        };
      case 'achievements':
        return {
          title: "Milestones",
          badge: "DIMR Award & Azure Certified",
          desc: "Academic & Professional Recognition"
        };
      case 'contact':
        return {
          title: "Get In Touch",
          badge: "Open for Opportunities",
          desc: "Send a message to collaborate"
        };
      default:
        return {
          title: "Sahil Shaikh",
          badge: "3D Developer Portfolio",
          desc: "Scroll down to explore"
        };
    }
  };

  const details = getSectionDetails();

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <AnimatePresence>
        {!isMinimized ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative w-72 rounded-3xl glass-panel-3d border border-slate-200/80 dark:border-slate-800/80 shadow-2xl p-4 overflow-hidden backdrop-blur-xl group"
          >
            {/* Header controls */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/50 dark:border-slate-800/50">
              <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-accent-teal dark:text-accent-glowTeal">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D Companion</span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                  aria-label="Minimize 3D companion"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Body: Avatar & Dynamic Board */}
            <div className="flex items-center space-x-3">
              {/* 3D Character Thumbnail */}
              <div className="w-20 h-24 rounded-2xl overflow-hidden bg-gradient-to-tr from-accent-teal/20 via-blue-500/10 to-teal-400/20 p-1 flex-shrink-0 relative border border-slate-200/40 dark:border-slate-700/40">
                <img
                  src={fullbodyMale}
                  alt="3D Character Companion"
                  className="w-full h-full object-cover rounded-xl transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Dynamic Information Board held by character */}
              <div className="flex-1 text-left">
                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-accent-teal/15 text-accent-teal dark:text-accent-glowTeal mb-1">
                  {details.badge}
                </span>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-snug">
                  {details.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 line-clamp-2">
                  {details.desc}
                </p>
              </div>
            </div>

            {/* Scroll Back to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full mt-3 py-2 rounded-xl bg-accent-teal/10 hover:bg-accent-teal text-accent-teal hover:text-white dark:text-accent-glowTeal font-mono text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all duration-200"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsMinimized(false)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-full glass-panel-3d border border-slate-200/80 dark:border-slate-800/80 shadow-2xl hover:scale-105 transition-transform duration-200"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden border border-accent-teal">
              <img src={fullbodyMale} alt="3D Avatar" className="w-full h-full object-cover" />
            </div>
            <span className="font-mono text-xs font-bold text-accent-teal dark:text-accent-glowTeal">
              3D Avatar
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
