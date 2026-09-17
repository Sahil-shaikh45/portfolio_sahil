import { motion } from 'framer-motion';
import { Award, ShieldCheck, BookOpen, Calendar } from 'lucide-react';
import Card3DTilt from './Card3DTilt';
import Card3DScroll from './Card3DScroll';

export default function Achievements() {
  const items = [
    {
      id: 1,
      type: "award",
      icon: <Award className="w-5 h-5" />,
      title: "Best Paper Presenter Award",
      organization: "DIMR International Conference 2025",
      date: "2025",
      desc: "Awarded Best Paper Presenter for outstanding research presentation quality, academic contribution, and defense of paper findings in the international conference forum."
    },
    {
      id: 2,
      type: "certification",
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Microsoft Azure AI Fundamentals",
      organization: "Microsoft Certified (AI-900)",
      date: "2024",
      desc: "Validated fundamental knowledge of machine learning and artificial intelligence concepts and related Microsoft Azure services (computer vision, NLP, Azure ML studio)."
    },
    {
      id: 3,
      type: "education",
      icon: <BookOpen className="w-5 h-5" />,
      title: "Master of Computer Application (MCA)",
      organization: "Savitribai Phule Pune University (SPPU)",
      date: "2024 - 2026",
      desc: "Focusing on Advanced Java, Spring Core, Web Engineering, Relational Database Management Systems, and Object-Oriented Software Architectures."
    },
    {
      id: 4,
      type: "education",
      icon: <BookOpen className="w-5 h-5" />,
      title: "Bachelor of Computer Application (BCA)",
      organization: "Savitribai Phule Pune University (SPPU)",
      date: "2021 - 2024",
      desc: "Graduated with a cumulative GPA of 8.17/10. Studied C/C++ programming, database fundamentals, web development, data structures, and computer networking."
    }
  ];

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
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
            Achievements & <span className="text-accent-teal dark:text-accent-glowTeal glow-text-teal">Timeline</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-accent-teal to-blue-500 mx-auto mt-4 rounded-full shadow-md"
          />
        </div>

        {/* 3D Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line track with glowing gradient */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-1 bg-gradient-to-b from-accent-teal via-blue-500 to-accent-teal/30 -translate-x-1/2 rounded-full shadow-sm" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {items.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <Card3DScroll key={item.id} rotateXAmount={14} translateZAmount={40}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: idx * 0.1 }}
                    className={`relative flex flex-col md:flex-row items-stretch ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Glowing 3D Timeline Icon Node */}
                    <div className="absolute left-4 md:left-1/2 top-6 w-11 h-11 rounded-full bg-slate-900 border-2 border-accent-teal dark:border-accent-glowTeal text-accent-teal dark:text-accent-glowTeal flex items-center justify-center -translate-x-1/2 z-20 shadow-xl shadow-accent-teal/20">
                      {item.icon}
                    </div>

                    {/* Spacer Column for desktop spacing */}
                    <div className="hidden md:block w-1/2" />

                    {/* Card Content Column */}
                    <div className="w-full md:w-1/2 pl-14 md:pl-0 md:px-8">
                      <Card3DTilt maxTilt={10} scale={1.02}>
                        <div className="p-7 rounded-3xl glass-panel-3d border border-slate-200/60 dark:border-slate-800/60 hover:border-accent-teal/50 dark:hover:border-accent-teal/40 transition-all duration-300 relative group">
                          
                          {/* Date & Type Tag Header */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                              <Calendar className="w-4 h-4 text-accent-teal dark:text-accent-glowTeal" />
                              <span className="font-mono text-xs font-bold uppercase tracking-wider">{item.date}</span>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-accent-teal/10 text-accent-teal dark:text-accent-glowTeal">
                              {item.type}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-1 group-hover:text-accent-teal dark:group-hover:text-accent-glowTeal transition-colors duration-200">
                            {item.title}
                          </h3>

                          {/* Organization */}
                          <p className="font-mono font-semibold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                            {item.organization}
                          </p>

                          {/* Description */}
                          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-normal">
                            {item.desc}
                          </p>
                        </div>
                      </Card3DTilt>
                    </div>
                  </motion.div>
                </Card3DScroll>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
