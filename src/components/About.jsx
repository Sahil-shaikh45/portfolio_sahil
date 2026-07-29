import { motion } from 'framer-motion';
import { Download, GraduationCap, Briefcase, Award, Code } from 'lucide-react';

export default function About() {
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
    <section id="about" className="py-24 relative overflow-hidden">
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
            About <span className="text-accent-teal dark:text-accent-glowTeal">Me</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-accent-teal mx-auto mt-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Bio text (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="font-display font-semibold text-2xl text-slate-800 dark:text-white">
              Crafting robust backends & responsive frontends
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              I am Sahil Shaikh, currently pursuing my Master of Computer Application (MCA) at Savitribai Phule Pune University. 
              As a Java Full Stack Developer Intern at <strong className="text-slate-900 dark:text-white font-medium">SETTribe</strong>, I have contributed directly to core modules in enterprise ERPs and government inspector portals.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              My engineering approach prioritizes clean architecture, secure RESTful boundaries, and responsive, interactive visual flows. 
              Beyond enterprise software, I have a deep interest in software engineering principles, system design, and building custom tools to optimize developer workflows.
            </p>

            <div className="pt-4">
              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                download="Sahil_Shaikh_Resume.pdf"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium transition-all duration-200 border border-slate-700 hover:border-slate-600 shadow-md group"
              >
                <span>Download Resume</span>
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200 text-accent-glowTeal" />
              </a>
            </div>
          </motion.div>

          {/* Stats Grid (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/40 hover:border-accent-teal/40 dark:hover:border-accent-teal/30 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-accent-teal/10 dark:bg-accent-teal/5 inline-flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <h4 className="font-display font-medium text-xs tracking-wider text-slate-400 uppercase mb-1">
                  {stat.title}
                </h4>
                <p className="font-semibold text-lg text-slate-800 dark:text-white mb-0.5">
                  {stat.value}
                </p>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {stat.detail}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
