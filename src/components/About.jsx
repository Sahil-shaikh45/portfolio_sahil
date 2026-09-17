import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Download, GraduationCap, Briefcase, Award, Code, Terminal } from 'lucide-react';
import Card3DTilt from './Card3DTilt';
import Card3DScroll from './Card3DScroll';
import fullbodyMale from '../assets/fullbody_3d_male.png';

export default function About() {
  const aboutRef = useRef(null);

  // Track scroll position of About section for 3D scroll movement
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });

  // Smooth 3D scroll transformations as photo glides down into About section on the LEFT
  const rawY = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [-70, 0, 40, 200]);
  const rawX = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [-40, 0, 0, -50]);
  const rawRotateX = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [25, 0, 0, -22]);
  const rawRotateY = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [-20, 0, 0, 18]);
  const rawRotateZ = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [-6, 0, 0, 6]);
  const rawScale = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.88, 1, 1, 0.88]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0.3, 1, 1, 0.3]);

  // Apply spring physics for buttery smooth 60fps movement
  const cardY = useSpring(rawY, { stiffness: 100, damping: 20 });
  const cardX = useSpring(rawX, { stiffness: 100, damping: 20 });
  const cardRotateX = useSpring(rawRotateX, { stiffness: 100, damping: 20 });
  const cardRotateY = useSpring(rawRotateY, { stiffness: 100, damping: 20 });
  const cardRotateZ = useSpring(rawRotateZ, { stiffness: 100, damping: 20 });
  const cardScale = useSpring(rawScale, { stiffness: 100, damping: 20 });
  const cardOpacity = useSpring(rawOpacity, { stiffness: 100, damping: 20 });

  const stats = [
    {
      icon: <GraduationCap className="w-5 h-5 text-accent-teal dark:text-accent-glowTeal" />,
      title: "Education",
      value: "MCA Candidate",
      detail: "SPPU (2024 - 2026)"
    },
    {
      icon: <Briefcase className="w-5 h-5 text-accent-teal dark:text-accent-glowTeal" />,
      title: "Experience",
      value: "Full Stack Intern",
      detail: "SETTribe (On-site)"
    },
    {
      icon: <Award className="w-5 h-5 text-accent-teal dark:text-accent-glowTeal" />,
      title: "Academic Grade",
      value: "8.17 CGPA",
      detail: "BCA SPPU Graduate"
    },
    {
      icon: <Code className="w-5 h-5 text-accent-teal dark:text-accent-glowTeal" />,
      title: "Core Stack",
      value: "Java & Spring Boot",
      detail: "React & REST APIs"
    }
  ];

  return (
    <section id="about" ref={aboutRef} className="py-24 relative overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-3xl sm:text-5xl tracking-tight"
          >
            About <span className="text-accent-teal dark:text-accent-glowTeal glow-text-teal">Me</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-accent-teal to-blue-500 mx-auto mt-4 rounded-full shadow-md"
          />
        </div>

        <Card3DScroll rotateXAmount={12} translateZAmount={40}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: 3D Photo Showcase Card smoothly traveling down into About section */}
            <motion.div
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
                        <span>Developer Identity</span>
                      </div>
                    </div>

                    {/* Full-Body 3D Male Developer Character Photo */}
                    <div 
                      className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-950 p-2 shadow-inner group-hover:scale-[1.01] transition-transform duration-500"
                      style={{ transform: 'translateZ(30px)' }}
                    >
                      <img
                        src={fullbodyMale}
                        alt="Sahil Shaikh - 3D Developer Avatar"
                        className="w-full h-auto max-h-[420px] object-contain mx-auto transform hover:scale-105 transition-transform duration-700 ease-out drop-shadow-2xl"
                      />
                    </div>

                    {/* Floating 3D Badges tuned for About Section */}

                    {/* Top Left: Education */}
                    <div 
                      className="absolute top-14 -left-2 sm:-left-4 px-3 py-1.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md flex items-center space-x-2 animate-float-slow pointer-events-none z-30"
                      style={{ transform: 'translateZ(60px)' }}
                    >
                      <div className="p-1 rounded-lg bg-teal-500/10 text-accent-teal dark:text-accent-glowTeal">
                        <GraduationCap className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-[9px] font-mono text-slate-400 font-bold uppercase">Degree</p>
                        <p className="text-xs font-bold text-slate-800 dark:text-white">MCA SPPU</p>
                      </div>
                    </div>

                    {/* Top Right: Grade */}
                    <div 
                      className="absolute top-20 -right-2 sm:-right-4 px-3 py-1.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md flex items-center space-x-2 animate-float-reverse pointer-events-none z-30"
                      style={{ transform: 'translateZ(65px)' }}
                    >
                      <div className="p-1 rounded-lg bg-amber-500/10 text-amber-500">
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-[9px] font-mono text-slate-400 font-bold uppercase">Grade</p>
                        <p className="text-xs font-bold text-slate-800 dark:text-white">8.17 CGPA</p>
                      </div>
                    </div>

                    {/* Bottom Left: Experience */}
                    <div 
                      className="absolute bottom-16 -left-2 sm:-left-4 px-3 py-1.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md flex items-center space-x-2 animate-float-reverse pointer-events-none z-30"
                      style={{ transform: 'translateZ(55px)' }}
                    >
                      <div className="p-1 rounded-lg bg-blue-500/10 text-blue-500">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-[9px] font-mono text-slate-400 font-bold uppercase">Internship</p>
                        <p className="text-xs font-bold text-slate-800 dark:text-white">SETTribe</p>
                      </div>
                    </div>

                    {/* Bottom Right: Core Focus */}
                    <div 
                      className="absolute bottom-12 -right-2 sm:-right-4 px-3 py-1.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md flex items-center space-x-2 animate-float-slow pointer-events-none z-30"
                      style={{ transform: 'translateZ(50px)' }}
                    >
                      <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-500">
                        <Code className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-[9px] font-mono text-slate-400 font-bold uppercase">Role</p>
                        <p className="text-xs font-bold text-slate-800 dark:text-white">Java & React</p>
                      </div>
                    </div>

                  </div>
                </Card3DTilt>
              </motion.div>
            </motion.div>

            {/* Right Side: Bio text & 3D Stats grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-snug">
                Building scalable backend architectures & interactive web experiences
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
                I am Sahil Shaikh, currently pursuing my Master of Computer Application (MCA) at Savitribai Phule Pune University. 
                As a Java Full Stack Developer Intern at <strong className="text-slate-900 dark:text-white font-semibold">SETTribe</strong>, I have worked on production modules for enterprise ERP systems and government inspector portals.
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
                My core strengths lie in object-oriented software design with Java & Spring Boot, designing clean RESTful microservices, and crafting modern 3D user interfaces with React.
              </p>

              <div className="pt-2">
                <a
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  download="Sahil_Shaikh_Resume.pdf"
                  className="inline-flex items-center space-x-3 px-7 py-3.5 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold transition-all duration-200 border border-slate-700 hover:border-accent-teal/50 shadow-xl shadow-black/10 hover:shadow-accent-teal/20 hover:scale-[1.02] active:scale-95 group"
                >
                  <span>Download Resume</span>
                  <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-200 text-accent-glowTeal" />
                </a>
              </div>

              {/* 3D Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {stats.map((stat, idx) => (
                  <Card3DTilt key={idx} maxTilt={12} scale={1.03}>
                    <div className="p-5 rounded-2xl glass-panel-3d border border-slate-200/60 dark:border-slate-800/60 hover:border-accent-teal/40 dark:hover:border-accent-teal/40 transition-all duration-300 h-full flex flex-col justify-between group">
                      <div>
                        <div className="p-3 rounded-2xl bg-accent-teal/15 dark:bg-accent-teal/10 inline-flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                          {stat.icon}
                        </div>
                        <h4 className="font-mono font-bold text-[10px] tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-1">
                          {stat.title}
                        </h4>
                        <p className="font-display font-bold text-lg text-slate-900 dark:text-white mb-0.5 group-hover:text-accent-teal dark:group-hover:text-accent-glowTeal transition-colors duration-200">
                          {stat.value}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 block">
                        {stat.detail}
                      </span>
                    </div>
                  </Card3DTilt>
                ))}
              </div>
            </motion.div>

          </div>
        </Card3DScroll>

      </div>
    </section>
  );
}
