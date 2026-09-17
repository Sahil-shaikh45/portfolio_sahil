import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Monitor, Database, Cloud, CheckCircle } from 'lucide-react';
import Card3DTilt from './Card3DTilt';
import Card3DScroll from './Card3DScroll';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All Skills', icon: null },
    { id: 'backend', label: 'Backend', icon: <Server className="w-4 h-4" /> },
    { id: 'frontend', label: 'Frontend', icon: <Monitor className="w-4 h-4" /> },
    { id: 'database', label: 'Database', icon: <Database className="w-4 h-4" /> },
    { id: 'cloud-tools', label: 'Cloud & Tools', icon: <Cloud className="w-4 h-4" /> },
  ];

  const skills = [
    // Backend
    { name: 'Java', level: 90, category: 'backend', desc: 'Core OOP, Collections, Lambdas, Streams, Multi-threading' },
    { name: 'Spring Boot', level: 85, category: 'backend', desc: 'Microservices, REST Controllers, Dependency Injection' },
    { name: 'REST APIs', level: 90, category: 'backend', desc: 'Payload Validation, HTTP Codes, OpenAPI, Security' },
    { name: 'JWT Authentication', level: 80, category: 'backend', desc: 'Spring Security, Token-based Stateless Auth' },
    { name: 'Spring Data JPA', level: 85, category: 'backend', desc: 'Hibernate ORM, Custom Queries, Entity Relations' },
    // Frontend
    { name: 'React.js', level: 80, category: 'frontend', desc: 'Hooks, Router, Component Lifecycle, Context API' },
    { name: 'JavaScript', level: 85, category: 'frontend', desc: 'ES6+ Syntax, Async/Await, Promises, DOM API' },
    { name: 'HTML5 & CSS3', level: 90, category: 'frontend', desc: 'Responsive Design, Grid, Flexbox, Tailwind CSS' },
    { name: 'Bootstrap', level: 85, category: 'frontend', desc: 'Grid layouts, Responsive panels, Theme overrides' },
    // Database
    { name: 'MySQL', level: 85, category: 'database', desc: 'Complex Joins, Indexing, Transaction ACID, Stored Procedures' },
    { name: 'SQL Querying', level: 85, category: 'database', desc: 'Relational logic, Subqueries, Aggregations, Optimization' },
    // Cloud & Tools
    { name: 'AWS Basics', level: 75, category: 'cloud-tools', desc: 'S3 buckets, EC2 deployment, basics of IAM Roles' },
    { name: 'Azure AI Fundamentals', level: 85, category: 'cloud-tools', desc: 'Certified AI-900, Azure ML, Cognitive Vision' },
    { name: 'Git & GitHub', level: 90, category: 'cloud-tools', desc: 'Version control, PR reviews, branches, conflict merges' },
    { name: 'Maven & STS/VS Code', level: 80, category: 'cloud-tools', desc: 'Build tools, dependencies, agile Scrum frameworks' },
  ];

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeTab);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'backend':
        return <Server className="w-5 h-5 text-accent-teal dark:text-accent-glowTeal" />;
      case 'frontend':
        return <Monitor className="w-5 h-5 text-accent-teal dark:text-accent-glowTeal" />;
      case 'database':
        return <Database className="w-5 h-5 text-accent-teal dark:text-accent-glowTeal" />;
      case 'cloud-tools':
        return <Cloud className="w-5 h-5 text-accent-teal dark:text-accent-glowTeal" />;
      default:
        return <CheckCircle className="w-5 h-5 text-accent-teal dark:text-accent-glowTeal" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
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
            Technical <span className="text-accent-teal dark:text-accent-glowTeal glow-text-teal">Stack & Skills</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-accent-teal to-blue-500 mx-auto mt-4 rounded-full shadow-md"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 backdrop-blur-md ${
                activeTab === category.id
                  ? 'bg-accent-teal text-white shadow-xl shadow-accent-teal/25 border border-accent-teal scale-105'
                  : 'bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-accent-teal/50 hover:text-accent-teal dark:hover:text-accent-glowTeal'
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* 3D Skills Grid with Scroll Parallax */}
        <Card3DScroll rotateXAmount={18} translateZAmount={60}>
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={skill.name}
                >
                  <Card3DTilt maxTilt={12} scale={1.03} className="h-full">
                    <div className="p-6 rounded-2xl glass-panel-3d border border-slate-200/60 dark:border-slate-800/60 hover:border-accent-teal/50 dark:hover:border-accent-teal/40 group hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-3 rounded-xl bg-accent-teal/15 dark:bg-accent-teal/10 group-hover:scale-110 transition-transform duration-300">
                              {getCategoryIcon(skill.category)}
                            </div>
                            <div>
                              <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-accent-teal dark:group-hover:text-accent-glowTeal transition-colors duration-200">
                                {skill.name}
                              </h4>
                              <span className="text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                {skill.category.replace('-', ' & ')}
                              </span>
                            </div>
                          </div>
                          <span className="font-mono text-sm font-bold text-accent-teal dark:text-accent-glowTeal bg-accent-teal/10 px-2.5 py-1 rounded-lg">
                            {skill.level}%
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed font-normal min-h-[36px]">
                          {skill.desc}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-accent-teal via-teal-400 to-blue-500 rounded-full shadow-sm"
                        />
                      </div>
                    </div>
                  </Card3DTilt>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Card3DScroll>

      </div>
    </section>
  );
}
