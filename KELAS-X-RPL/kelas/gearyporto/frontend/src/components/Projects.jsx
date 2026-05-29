import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, RefreshCw, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import ChessGame from './ChessGame';
import Calculator from './Calculator';

const GithubIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


// Backup fallback data in case backend is offline
const FALLBACK_PROJECTS = [
  {
    id: 5,
    title: "Catur Cyber",
    description: "An interactive, fully playable turn-based holographic Chess game inside the portfolio. Styled with futuristic glassmorphism, glowing piece overlays, and automated AI tactical calculation.",
    technologies: ["React", "CSS Grid", "Framer Motion", "Web Audio API"],
    category: "frontend",
    image: "/images/project_chess.png",
    demoLink: "#chess-game",
    githubLink: "https://github.com/gearyporto/cyber-chess"
  },
  {
    id: 6,
    title: "Kalkulator Cyber",
    description: "A high-performance quantum mathematical suite. Computes scientific formulas with interactive binary/hex conversion panels, neon glow themes, and click synth tactile audio.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Web Audio API"],
    category: "frontend",
    image: "/images/project_calculator.png",
    demoLink: "#calculator",
    githubLink: "https://github.com/gearyporto/cyber-calculator"
  }
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isChessOpen, setIsChessOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Fullstack' }
  ];

  const fetchProjects = async () => {
    setLoading(true);
    setError(false);
    setIsUsingFallback(false);
    try {
      // Connect to Express Backend
      const response = await axios.get('http://localhost:5000/api/projects');
      if (response.data && response.data.data && response.data.data.projects) {
        setProjects(response.data.data.projects);
        setFilteredProjects(response.data.data.projects);
      } else {
        throw new Error("Invalid format");
      }
    } catch (err) {
      console.warn("Backend API not reachable. Using rich offline fallback data.", err);
      setProjects(FALLBACK_PROJECTS);
      setFilteredProjects(FALLBACK_PROJECTS);
      setIsUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === filter));
    }
  };

  return (
    <section id="portfolio" className="relative py-24 px-4 overflow-hidden border-t border-white/5 bg-black/5">
      {/* Background neon orb */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            PROJEK <span className="text-gradient">SHOWCASE</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full mb-6" />
          <p className="text-gray-400 font-light max-w-2xl mx-auto text-sm md:text-base">
            Eksplorasi portofolio rekayasa web futuristik kami.
            Menghubungkan visual modern dengan arsitektur server-side berkecepatan tinggi.
          </p>
        </motion.div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => handleFilterChange(filter.value)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm tracking-wide uppercase transition-all duration-300 ${activeFilter === filter.value
                ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-dark-bg font-bold shadow-[0_0_20px_rgba(0,243,255,0.3)] border-transparent'
                : 'bg-white/5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Live status alert (if fallback) */}
        {isUsingFallback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 glass-panel border border-neon-purple/30 rounded-2xl max-w-xl mx-auto flex items-center justify-between gap-4 text-xs font-mono"
          >
            <div className="flex items-center gap-2 text-neon-purple">
              <AlertTriangle size={16} />
              <span>Offline Mode: Loaded client fallback projects.</span>
            </div>
            <button
              onClick={fetchProjects}
              className="text-white hover:text-neon-cyan flex items-center gap-1 transition-colors"
            >
              <RefreshCw size={12} />
              Retry Connection
            </button>
          </motion.div>
        )}

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-panel h-80 rounded-3xl animate-pulse border border-white/5 p-6 space-y-4">
                <div className="w-full h-40 bg-white/5 rounded-2xl" />
                <div className="w-1/3 h-6 bg-white/5 rounded-lg" />
                <div className="w-full h-10 bg-white/5 rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          /* Projects grid */
          <motion.div
            layout
            className="grid md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative"
                >
                  {/* Glowing card container */}
                  <div className="h-full glass-panel overflow-hidden rounded-3xl border border-white/5 group-hover:border-neon-blue/30 transition-all duration-500 hover:shadow-[0_0_35px_rgba(0,243,255,0.1)] flex flex-col justify-between">
                    {/* Simulated Project Image with custom high-tech CSS placeholders */}
                    <div className="h-48 w-full overflow-hidden relative bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg border-b border-white/5 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-blue/5 via-transparent to-transparent pointer-events-none" />

                      {/* Cool grid graphics for cyberpunk portfolio vibe */}
                      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />

                      {/* Big neon stylized project number/monogram */}
                      <div className="text-8xl font-black text-white/5 select-none font-mono">
                        0{project.id}
                      </div>

                      {/* Accent glow line inside banner */}
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan" />
                    </div>

                    <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-white/5 border border-white/10 text-gray-300 font-mono px-2.5 py-1 rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors duration-300">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 font-light text-sm leading-relaxed mb-6">
                          {project.description}
                        </p>
                      </div>

                      {/* Links */}
                      <div className="flex gap-4 pt-4 border-t border-white/5">
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white font-mono uppercase transition-colors"
                        >
                          <GithubIcon size={14} />
                          Source Code
                        </a>
                        {project.demoLink === '#chess-game' ? (
                          <button
                            onClick={() => setIsChessOpen(true)}
                            className="flex items-center gap-1.5 text-xs font-bold text-neon-blue hover:text-neon-cyan font-mono uppercase transition-colors ml-auto cursor-pointer border-none bg-transparent"
                          >
                            Live Demo
                            <ExternalLink size={14} />
                          </button>
                        ) : project.demoLink === '#calculator' ? (
                          <button
                            onClick={() => setIsCalculatorOpen(true)}
                            className="flex items-center gap-1.5 text-xs font-bold text-neon-blue hover:text-neon-cyan font-mono uppercase transition-colors ml-auto cursor-pointer border-none bg-transparent"
                          >
                            Live Demo
                            <ExternalLink size={14} />
                          </button>
                        ) : (
                          <a
                            href={project.demoLink}
                            className="flex items-center gap-1.5 text-xs font-bold text-neon-blue hover:text-neon-cyan font-mono uppercase transition-colors ml-auto"
                          >
                            Live Demo
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Playable Cyber Chess Game Modal */}
      <ChessGame isOpen={isChessOpen} onClose={() => setIsChessOpen(false)} />

      {/* Quantum Cyber Calculator Modal */}
      <Calculator isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
    </section>
  );
};

export default Projects;
