import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp, Code, ArrowUpRight } from 'lucide-react';

const Github = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
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

export default function Projects() {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Full-Stack Apps' },
  ];

  const projects = [
    {
      id: 1,
      title: "ERP Management System",
      category: "web",
      categoryLabel: "Full-Stack ERP",
      tech: ["Java", "Spring Boot", "React.js", "MySQL", "REST APIs", "Maven"],
      summary: "Enterprise resource planning portal for student records, fee logs, and staff reporting.",
      details: "Developed core modules for student admissions, database tracking, and reporting. Designed responsive dashboard panels in React and integrated them with Spring Boot REST backends. Handled secure credentials and structured ledger generation for administration users.",
      github: "https://github.com/Sahil-shaikh45",
      live: null
    },
    {
      id: 2,
      title: "Government Field Inspection System",
      category: "web",
      categoryLabel: "E-Governance",
      tech: ["React.js", "Spring Boot", "MySQL", "GPS Integration", "Responsive UI"],
      summary: "Geolocation-enabled site monitoring system for government inspection officers.",
      details: "Created interactive forms that capture inspector GPS coordinates and handle onsite camera upload feeds. Programmed background sync functionality so offline checklists transfer to the central MySQL server once a connection is detected.",
      github: "https://github.com/Sahil-shaikh45",
      live: null
    },
    {
      id: 3,
      title: "Government CFR-IFR Portal",
      category: "web",
      categoryLabel: "Compliance Utility",
      tech: ["Java", "Spring Boot", "React.js", "MySQL", "JWT Auth", "Spring Security"],
      summary: "Stateless compliance portal verifying regulatory checklists for field officers.",
      details: "Engineered Spring Security interceptors using JWTs to authenticate inspectors. Designed import pipelines to parse and map state regulations against field questionnaires, flagging discrepancies automatically on interactive React tables.",
      github: "https://github.com/Sahil-shaikh45",
      live: null
    }
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
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
            Featured <span className="text-accent-teal dark:text-accent-glowTeal">Projects</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-accent-teal mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Project Filters */}
        <div className="flex justify-center space-x-2 mb-12">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setFilter(c.id);
                setExpandedId(null);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                filter === c.id
                  ? 'bg-slate-900 dark:bg-slate-800 text-white border-slate-900 dark:border-slate-800 shadow-sm'
                  : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isExpanded = expandedId === project.id;
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => toggleExpand(project.id)}
                  className={`cursor-pointer rounded-3xl border text-left glass-panel transition-all duration-300 overflow-hidden group ${
                    isExpanded 
                      ? 'border-accent-teal/60 dark:border-accent-teal/50 shadow-xl' 
                      : 'border-slate-200/50 dark:border-slate-800/40 hover:border-accent-teal/30 dark:hover:border-accent-teal/20 hover:shadow-md'
                  }`}
                >
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        project.category === 'web' 
                          ? 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400' 
                          : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                      }`}>
                        {project.categoryLabel}
                      </span>
                      <div className="flex items-center space-x-2 text-slate-400 dark:text-slate-500">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="hover:text-accent-teal dark:hover:text-accent-glowTeal transition-colors duration-200"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-accent-teal dark:hover:text-accent-glowTeal transition-colors duration-200"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-800 dark:text-white mb-3 group-hover:text-accent-teal dark:group-hover:text-accent-glowTeal transition-colors duration-200 flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </h3>

                    {/* Summary */}
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                      {project.summary}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span 
                          key={t}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/40 dark:border-slate-700/30"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Toggle button */}
                    <div className="flex items-center text-xs font-semibold text-accent-teal dark:text-accent-glowTeal uppercase tracking-wider">
                      {isExpanded ? (
                        <>
                          <span>Show Less</span>
                          <ChevronUp className="w-4 h-4 ml-1" />
                        </>
                      ) : (
                        <>
                          <span>Read Case Study</span>
                          <ChevronDown className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </div>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-800/40"
                        >
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                            <Code className="w-4 h-4 mr-1.5 text-accent-teal" />
                            Implementation Details
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                            {project.details}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
