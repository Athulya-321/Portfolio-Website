'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ChevronDown, X, LayoutGrid, Grid3X3, Grid } from 'lucide-react';

type GridSize = 'small' | 'medium' | 'large';

const projects = [
  {
    title: 'Yodha Hackathon',
    description: 'National level hackathon platform designed for seamless registration and real-time event tracking.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000',
    tags: ['React', 'Next.js', 'Tailwind', 'Event-Tech'],
    liveUrl: 'https://yodha.aidajecc.in/',
    
  },
  {
    title: 'HireFlow AI',
    description: 'Intelligent recruitment platform bridging talent and recruiters using NLP and conversational AI.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000',
    tags: ['NLP', 'Conversational AI', 'Hybrid Search', 'Recruitment'],
    liveUrl: 'https://github.com/Adhithyan-VV-05/HireFlow',
 
  },
  {
    title: 'AI Health Assistant',
    description: 'Advanced screening advisor using GPT-4o-mini to analyze medical data for diabetes and cancer risk.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000',
    tags: ['OpenAI', 'Neural Networks', 'Python', 'Healthcare'],
    liveUrl: 'https://github.com/Adhithyan-VV-05/Health-Predict-Plus',
  },
  {
    title: 'Car Price Prediction',
    description: 'Machine learning model that leverages historical market data to provide accurate automotive valuation.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000',
    tags: ['Machine Learning', 'Regression', 'Data Science', 'Python'],
    liveUrl: 'https://github.com/Adhithyan-VV-05/Car-Price-Prediction',
  },
  {
    title: 'Diabetes Prediction (SVM)',
    description: 'Support Vector Machine implementation for clinical risk assessment of diabetes based on patient metrics.',
    image: 'https://cdn.analyticsvidhya.com/wp-content/uploads/2022/01/Diabetes-Prediction-Using-Machine-Learning.webp',
    tags: ['SVM', 'Scikit-Learn', 'Analytics', 'Clinical'],
    liveUrl: 'https://github.com/Adhithyan-VV-05/Diabetes-prediction',
  },
  {
    title: 'Experience-to-Salary Predictor',
    description: 'Linear Regression model analyzing the correlation between professional experience and salary expectations.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    tags: ['Linear Regression', 'Python', 'Statistics', 'Matplotlib'],
    liveUrl: 'https://github.com/Adhithyan-VV-05/salary-prediction',
  },
  {
    title: 'Happy Colors',
    description: 'A vibrant color palette and gradient generator tool for UI/UX designers and frontend developers.',
    image: 'https://plus.unsplash.com/premium_photo-1764265388725-bdb8159c2889?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2xvdXJzfGVufDB8fDB8fHww',
    tags: ['UI/UX', 'CSS Gradients', 'JavaScript', 'Design'],
    liveUrl: 'https://happycolours.ccbp.tech/',
  },
  {
    title: 'Waste Management Web',
    description: 'Digital solution for optimizing waste collection and promoting environmental sustainability practices.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1000',
    tags: ['Netlify', 'Sustainability', 'GreenTech', 'Frontend'],
    liveUrl: 'https://waste-management-web.netlify.app/',
  },
  {
    title: 'Nebullians',
    description: 'An astronomical tracker providing real-time data on Near-Earth Objects (NEOs) from space agencies.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
    tags: ['Space API', 'Astronomy', 'Real-time Data', 'React'],
    liveUrl: 'https://nebullians.netlify.app/',
  },
  {
    title: 'Typing Speed Tester',
    description: 'A high-performance web app to test and improve typing speed with real-time accuracy analytics.',
    image: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&q=80&w=1000',
    tags: ['JavaScript', 'Gamification', 'WPM Tracker', 'Web'],
    liveUrl: 'https://tst.ccbp.tech/',
  },
  {
    title: 'Tic Tac Toe Pro',
    description: 'Cross-platform implementation of the classic game with advanced logic and responsive UI.',
    image: 'https://media.istockphoto.com/id/1198872799/photo/tic-tac-toe-game.jpg?s=612x612&w=0&k=20&c=0Tg1Rqreq2lB6CW_hmO0tu0kQsWcfzxy-6monfIf4to=',
    tags: ['Game Dev', 'Responsive', 'JavaScript', 'Logic'],
    liveUrl: 'https://xox404.ccbp.tech/',
  },
  {
    title: 'Rock Paper Scissors',
    description: 'An interactive web-based game featuring smooth animations and score-tracking persistent logic.',
    image: 'https://media.istockphoto.com/id/1324377846/photo/digital-collage-modern-art-rock-scissor-and-paper-hand-sign-with-conflict-geometry.webp?a=1&b=1&s=612x612&w=0&k=20&c=CMetrMxmwslUIu-NxzTgwaiJWmhbrANBxrA6ep-k8pc=',
    tags: ['DOM Manipulation', 'Interactivity', 'Games', 'Web'],
    liveUrl: 'https://vvgame1.ccbp.tech/',
  }
];

export function Projects() {
  const [isOpen, setIsOpen] = useState(false);
  const [gridSize, setGridSize] = useState<GridSize>('medium');

  const gridClass: Record<GridSize, string> = {
    small:  'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
    medium: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8',
    large:  'grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12',
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
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
            A selection of my recent work in Data Science and Web Development.
          </p>
        </div>

        {/* Display only the first 4 projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {projects.slice(0, 4).map((project, index) => (
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
              Wanna see more?
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
            {/* Backdrop Blur */}
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-7xl h-[85vh] bg-background border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Sticky Header inside Modal */}
              <div className="p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center border-b border-white/5 bg-background/40 backdrop-blur-md z-10 gap-4">
                <div>
                  <h3 className="text-2xl font-display font-bold">Project <span className="gradient-text">Archive</span>.</h3>
                  <p className="text-sm text-muted-foreground">{projects.length} key developments &mdash; Full Collection</p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Grid size toggle */}
                  <div className="flex items-center gap-1 p-1 bg-secondary/60 rounded-full border border-border/50">
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

                  {/* Animated Close Button */}
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