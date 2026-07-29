import { useState, useEffect } from 'react';
import CanvasBackground from './components/CanvasBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // default to dark theme
  });

  const [activeSection, setActiveSection] = useState('hero');

  // Sync dark mode class on HTML document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Set up Intersection Observer to track active scrolling section
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'achievements', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -55% 0px', // Triggers when section occupies center focus
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen relative text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Interactive Background */}
      <CanvasBackground isDarkMode={isDarkMode} />

      {/* Header / Navbar */}
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        activeSection={activeSection} 
      />

      {/* Single Page Content Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        
        {/* Horizontal Divider */}
        <div className="border-t border-slate-200/50 dark:border-slate-800/40" />
        <About />

        <div className="border-t border-slate-200/50 dark:border-slate-800/40" />
        <Skills />

        <div className="border-t border-slate-200/50 dark:border-slate-800/40" />
        <Projects />

        <div className="border-t border-slate-200/50 dark:border-slate-800/40" />
        <Achievements />

        <div className="border-t border-slate-200/50 dark:border-slate-800/40" />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
