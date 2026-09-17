import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Mail, ArrowRight, Code2, Server, Database, Cpu, Sparkles, Terminal } from 'lucide-react';
import Card3DTilt from './Card3DTilt';
import fullbodyMale from '../assets/fullbody_3d_male.png';

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
    "Backend & REST API Architect"
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const heroRef = useRef(null);

  // Track scroll position of Hero section for 3D scroll movement
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Map scroll progress to 3D transformations as photo goes down
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const rawRotateX = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const rawRotateY = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const rawRotateZ = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.9, 0.2]);

  // Apply spring physics for buttery smooth 60fps movement
  const cardX = useSpring(rawX, { stiffness: 100, damping: 20 });
  const cardY = useSpring(rawY, { stiffness: 100, damping: 20 });
  const cardRotateX = useSpring(rawRotateX, { stiffness: 100, damping: 20 });
  const cardRotateY = useSpring(rawRotateY, { stiffness: 100, damping: 20 });
  const cardRotateZ = useSpring(rawRotateZ, { stiffness: 100, damping: 20 });
  const cardScale = useSpring(rawScale, { stiffness: 100, damping: 20 });
  const cardOpacity = useSpring(rawOpacity, { stiffness: 100, damping: 20 });

  useEffect(() => {
    let timer;
    const fullText = roles[currentRoleIndex];

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
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
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-x-clip"
    >
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-accent-teal/15 dark:bg-accent-teal/20 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-blue-600/10 dark:bg-blue-500/15 blur-[140px] pointer-events-none animate-float-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Bio & Headline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-accent-teal/10 border border-accent-teal/30 dark:border-accent-glowTeal/30 backdrop-blur-md shadow-sm"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-accent-teal dark:bg-accent-glowTeal animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-wider text-accent-teal dark:text-accent-glowTeal uppercase">
                Available for Roles & Projects
              </span>
            </motion.div>

            {/* Main Title */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Hi, I am{' '}
              <span className="bg-gradient-to-r from-accent-teal via-teal-400 to-blue-500 bg-clip-text text-transparent glow-text-teal">
                Sahil Shaikh
              </span>
            </h1>

            {/* Typewriter Title */}
            <div className="h-12 text-xl sm:text-2xl lg:text-3xl font-display font-medium text-slate-700 dark:text-slate-300">
              I'm a{' '}
              <span className="text-accent-teal dark:text-accent-glowTeal border-r-2 border-accent-teal typewriter-cursor pr-1 font-semibold">
                {currentText}
              </span>
            </div>

            {/* Summary Bio */}
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Motivated Java Full Stack Developer with hands-on experience building enterprise ERP solutions, 
              government inspector portals, and responsive web systems with Spring Boot, React, and MySQL.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => handleScrollTo('projects')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-accent-teal to-blue-600 hover:from-accent-lightTeal hover:to-blue-500 text-white font-semibold shadow-xl shadow-accent-teal/20 hover:shadow-accent-teal/30 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center space-x-3 group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={() => handleScrollTo('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-slate-300 dark:border-slate-800 hover:border-accent-teal/50 bg-white/70 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 font-semibold shadow-lg hover:shadow-accent-teal/10 hover:scale-[1.02] active:scale-95 transition-all duration-200 backdrop-blur-md"
              >
                Contact Me
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-slate-500 dark:text-slate-400 pt-4">
              <a
                href="https://github.com/Sahil-shaikh45"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-accent-teal hover:text-accent-teal dark:hover:text-accent-glowTeal hover:scale-110 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/sahilshaikh3033/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-accent-teal hover:text-accent-teal dark:hover:text-accent-glowTeal hover:scale-110 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:sahilms3033@gmail.com"
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-accent-teal hover:text-accent-teal dark:hover:text-accent-glowTeal hover:scale-110 transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Right Side: Full-Body 3D Male Developer Artwork Showcase with 3D Scroll Down effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center items-center perspective-1000 z-20"
          >
            {/* 3D Scroll Transformation Wrapper */}
            <motion.div
              style={{
                y: cardY,
                x: cardX,
                rotateX: cardRotateX,
                rotateY: cardRotateY,
                rotateZ: cardRotateZ,
                scale: cardScale,
                opacity: cardOpacity,
                transformStyle: 'preserve-3d'
              }}
              className="w-full max-w-md relative"
            >
              {/* Glowing Backdrop Ambient Aura */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-teal/30 via-teal-400/20 to-blue-500/20 rounded-3xl blur-3xl transform scale-95 animate-pulse-glow pointer-events-none" />

              <Card3DTilt maxTilt={14} scale={1.03} className="w-full">
                <div className="relative rounded-3xl glass-panel-3d p-5 sm:p-7 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl overflow-hidden group transform-style-3d">
                  
                  {/* Header Hologram Bar */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200/50 dark:border-slate-800/50" style={{ transform: 'translateZ(20px)' }}>
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs font-mono text-accent-teal dark:text-accent-glowTeal font-bold">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>3D Character Presentation</span>
                    </div>
                  </div>

                  {/* Full-Body 3D Male Developer Character Photo */}
                  <div 
                    className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-950 p-2 shadow-inner group-hover:scale-[1.01] transition-transform duration-500"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    <img
                      src={fullbodyMale}
                      alt="Sahil Shaikh - Full Body 3D Male Developer Character"
                      className="w-full h-auto max-h-[440px] object-contain mx-auto transform hover:scale-105 transition-transform duration-700 ease-out drop-shadow-2xl"
                    />
                  </div>

                  {/* Orbiting 3D Floating Tech Badges around character with enhanced 3D Z-depth */}

                  {/* Top Left: Java & Spring Boot */}
                  <div 
                    className="absolute top-14 -left-2 sm:-left-5 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md flex items-center space-x-2 animate-float-slow pointer-events-none z-30"
                    style={{ transform: 'translateZ(60px)' }}
                  >
                    <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500">
                      <Server className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-mono text-slate-400 font-bold uppercase">Backend</p>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">Java Spring</p>
                    </div>
                  </div>

                  {/* Top Right: React Frontend */}
                  <div 
                    className="absolute top-20 -right-2 sm:-right-5 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md flex items-center space-x-2 animate-float-reverse pointer-events-none z-30"
                    style={{ transform: 'translateZ(65px)' }}
                  >
                    <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-mono text-slate-400 font-bold uppercase">Frontend</p>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">React.js</p>
                    </div>
                  </div>

                  {/* Bottom Left: MySQL Database */}
                  <div 
                    className="absolute bottom-16 -left-2 sm:-left-5 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md flex items-center space-x-2 animate-float-reverse pointer-events-none z-30"
                    style={{ transform: 'translateZ(55px)' }}
                  >
                    <div className="p-1.5 rounded-lg bg-teal-500/10 text-accent-teal dark:text-accent-glowTeal">
                      <Database className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-mono text-slate-400 font-bold uppercase">Database</p>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">MySQL & JPA</p>
                    </div>
                  </div>

                  {/* Bottom Right: REST APIs */}
                  <div 
                    className="absolute bottom-12 -right-2 sm:-right-5 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md flex items-center space-x-2 animate-float-slow pointer-events-none z-30"
                    style={{ transform: 'translateZ(50px)' }}
                  >
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-mono text-slate-400 font-bold uppercase">Architecture</p>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">RESTful APIs</p>
                    </div>
                  </div>

                </div>
              </Card3DTilt>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Down arrow indicator */}
      <div
        onClick={() => handleScrollTo('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer text-slate-400 hover:text-accent-teal dark:hover:text-accent-glowTeal transition-colors duration-200 animate-bounce hidden sm:block z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
