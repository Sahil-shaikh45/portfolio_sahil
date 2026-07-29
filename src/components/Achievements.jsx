import { motion } from 'framer-motion';
import { Award, ShieldCheck, BookOpen, Calendar } from 'lucide-react';

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
    <section id="achievements" className="py-24 relative overflow-hidden bg-slate-100/50 dark:bg-slate-950/20">
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
            Achievements & <span className="text-accent-teal dark:text-accent-glowTeal">Timeline</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-accent-teal mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line track */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {items.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline icon node */}
                  <div className="absolute left-4 md:left-1/2 top-4 w-9 h-9 rounded-full bg-slate-950 border-2 border-accent-teal dark:border-accent-glowTeal text-accent-teal dark:text-accent-glowTeal flex items-center justify-center -translate-x-1/2 z-20 shadow-md">
                    {item.icon}
                  </div>

                  {/* Spacer Column for desktop spacing */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Content Column */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div className="p-6 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/40 hover:border-accent-teal/40 dark:hover:border-accent-teal/30 hover:shadow-lg transition-all duration-300 relative group">
                      
                      {/* Decorative small node indicator for desktop */}
                      <div className={`hidden md:block absolute top-6 w-3 h-3 rotate-45 border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900 border-t-0 border-r-0 ${
                        isEven ? '-right-1.5 border-t border-r border-b-0 border-l-0' : '-left-1.5'
                      }`} />

                      {/* Date Header */}
                      <div className="flex items-center space-x-2 text-slate-400 dark:text-slate-500 mb-2">
                        <Calendar className="w-4 h-4 text-accent-teal dark:text-accent-glowTeal" />
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider">{item.date}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-1 group-hover:text-accent-teal dark:group-hover:text-accent-glowTeal transition-colors duration-200">
                        {item.title}
                      </h3>

                      {/* Organization */}
                      <p className="font-display font-semibold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                        {item.organization}
                      </p>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
