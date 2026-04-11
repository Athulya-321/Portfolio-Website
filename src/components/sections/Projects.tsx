'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { LockedCard } from '@/components/ui/LockedCard';
import { ChevronDown, X, LayoutGrid, Grid3X3, Grid } from 'lucide-react';

type GridSize = 'small' | 'medium' | 'large';

const projects = [
  {
    title: 'SeizureGuard AI',
    description: 'An accessible, AI-powered healthcare dashboard for early seizure detection. It leverages real-time webcam feeds and client-side ML to detect visual warning signs and trigger critical emergency alerts.',
    image: '/projects/seizureguard.png',
    tags: ['AI', 'Healthcare', 'ML', 'Computer Vision'],
    liveUrl: 'https://github.com/EmerinGeorge9/seizureguard.2',
  },
  {
    title: 'The Blossom Portfolio',
    description: 'A premium, feminine-aesthetic personal portfolio built with Next.js, Framer Motion, and GSAP. Features ambient mesh gradients and immersive glassmorphism for a world-class user experience.',
    image: '/projects/portfolio.png',
    tags: ['Next.js', 'Framer Motion', 'GSAP', 'Tailwind'],
    liveUrl: 'https://athulya-m.netlify.app',
  }
];

export function Projects() {
  const [isOpen, setIsOpen] = useState(false);
  const [gridSize, setGridSize] = useState<GridSize>('medium');

  const gridClass: Record<GridSize, string> = {
    small:  'grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4',
    medium: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8',
    large:  'grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12',
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>.
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-grad-start to-grad-end animate-gradient-xy bg-[length:200%_200%] rounded-full mb-8" />
          <p className="text-lg md:text-xl text-foreground opacity-70 max-w-2xl">
            A focused selection of technical developments and creative experiments.
          </p>
        </div>

        {/* Display only the 2 main projects in the core grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              animate={{ 
                x: [0, (index % 2 === 0 ? 6 : -6), 0],
                y: [0, (index % 3 === 0 ? -6 : 6), 0]
              }}
              transition={{ 
                x: { duration: 6 + index, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 7 + index, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <ProjectCard index={index} {...project} />
            </motion.div>
          ))}
        </div>

        {/* Wanna see more button */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative px-8 py-3 font-medium transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-grad-start to-grad-end rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2 bg-background px-8 py-3 rounded-full border border-border hover:border-foreground/20">
              Explore Archive
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </span>
          </button>
        </div>
      </div>

      {/* Full Project Gallery Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-7xl h-[85vh] bg-background border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center border-b border-white/5 bg-background/40 backdrop-blur-md z-10 gap-4">
                <div>
                  <h3 className="text-2xl font-display font-bold">Project <span className="gradient-text">Archive</span>.</h3>
                  <p className="text-sm text-muted-foreground">{projects.length} + 1 Current Developments</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-1 p-1 bg-secondary/60 rounded-full border border-border/50">
                    {([['large', Grid], ['medium', LayoutGrid], ['small', Grid3X3]] as const).map(([size, Icon]) => (
                      <motion.button 
                        key={size} 
                        onClick={() => setGridSize(size)} 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        className={`p-2 rounded-full transition-colors duration-200 ${gridSize === size ? 'bg-background shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="group relative p-2 transition-transform hover:rotate-90 duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-grad-start to-grad-end rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity" />
                    <div className="relative bg-secondary/60 p-2 rounded-full border border-border">
                      <X className="w-5 h-5 text-foreground" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Scrollable Project Grid */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar overscroll-contain">
                <div className={`grid ${gridClass[gridSize]} pb-10`}>
                  <AnimatePresence mode="popLayout">
                    {/* Projects */}
                    {projects.map((project, index) => (
                      <motion.div
                        layout
                        key={project.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          x: [0, (index % 2 === 0 ? 5 : -5), 0],
                          y: [0, (index % 3 === 0 ? -5 : 5), 0]
                        }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ 
                          layout: { type: "spring", stiffness: 100, damping: 15 },
                          x: { duration: 6 + index, repeat: Infinity, ease: "easeInOut" },
                          y: { duration: 7 + index, repeat: Infinity, ease: "easeInOut" },
                          opacity: { duration: 0.4 },
                          scale: { duration: 0.4 }
                        }}
                      >
                        <ProjectCard index={index} {...project} />
                      </motion.div>
                    ))}

                    {/* The Unlocked Card */}
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <LockedCard />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}