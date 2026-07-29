import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Monitor, Database, Cloud, CheckCircle } from 'lucide-react';

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
    { name: 'Java', level: 90, category: 'backend', desc: 'Core OOP, Collections, Lambdas, Streams' },
    { name: 'Spring Boot', level: 85, category: 'backend', desc: 'Microservices, REST Controllers, DI/IoC' },
    { name: 'REST APIs', level: 90, category: 'backend', desc: 'Payload Validation, HTTP Codes, HATEOAS' },
    { name: 'JWT Authentication', level: 80, category: 'backend', desc: 'Spring Security, Token-based Stateless Auth' },
    { name: 'Spring Data JPA', level: 85, category: 'backend', desc: 'Hibernate ORM, Custom Queries, Entities' },
    // Frontend
    { name: 'React.js', level: 80, category: 'frontend', desc: 'Hooks, Router, Component Life Cycle, Context' },
    { name: 'JavaScript', level: 85, category: 'frontend', desc: 'ES6 Syntax, Async/Await, Fetch, Promises' },
    { name: 'HTML5 & CSS3', level: 90, category: 'frontend', desc: 'Responsive Design, Grid, Flexbox' },
    { name: 'Bootstrap', level: 85, category: 'frontend', desc: 'Theme overrides, Grid layouts, Pre-styled panels' },
    // Database
    { name: 'MySQL', level: 85, category: 'database', desc: 'Joins, Constraints, Indexing, Transaction ACID' },
    { name: 'SQL Querying', level: 85, category: 'database', desc: 'Relational logic, Subqueries, Aggregations' },
    // Cloud & Tools
    { name: 'AWS Basics', level: 75, category: 'cloud-tools', desc: 'S3 buckets, EC2 deployment, basics of IAM' },
    { name: 'Azure AI Fundamentals', level: 85, category: 'cloud-tools', desc: 'Certified AI-900, Azure ML, Cognitive Services' },
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
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-100/50 dark:bg-slate-950/20">
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
            My <span className="text-accent-teal dark:text-accent-glowTeal">Skills</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-accent-teal mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeTab === category.id
                  ? 'bg-accent-teal text-white border-accent-teal shadow-md shadow-accent-teal/15 dark:shadow-accent-teal/5'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-accent-teal/50 hover:text-accent-teal dark:hover:text-accent-glowTeal'
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={skill.name}
                className="p-6 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/40 hover:border-accent-teal/40 dark:hover:border-accent-teal/30 group hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-accent-teal/10 dark:bg-accent-teal/5">
                      {getCategoryIcon(skill.category)}
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-base text-slate-800 dark:text-white">
                        {skill.name}
                      </h4>
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase font-medium">
                        {skill.category.replace('-', ' & ')}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-accent-teal dark:text-accent-glowTeal">
                    {skill.level}%
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 h-8 overflow-hidden line-clamp-2">
                  {skill.desc}
                </p>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-accent-teal to-blue-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
