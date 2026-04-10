'use client';

import { motion } from 'framer-motion';

export function FooterArea() {
  return (
    <>
      <AmbientSpaceFillers />
      <footer className="relative w-full py-10 px-6 md:px-12 bg-background overflow-hidden">
        <div className="container mx-auto flex flex-col items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border/30 to-transparent mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <span className="text-xl font-display font-bold tracking-tighter mb-1 italic">
                Adhithyan <span className="text-primary italic">VV</span>
              </span>
              <p className="text-[10px] text-foreground/30 font-medium tracking-widest uppercase">
                Digital Architect • Problem Solver
              </p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="flex items-center gap-2 p-1.5 rounded-xl bg-secondary/20 backdrop-blur-md border border-border/40"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
              <span className="text-[9px] uppercase tracking-widest font-bold pr-3 pl-1 text-foreground/50 italic">
                Status: Ready for Internships and Freelancing
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex flex-col items-center md:items-end text-center md:text-right"
            >
              <p className="text-xs text-foreground/40 font-medium mb-1 italic">
                © 2026 Crafted with Passion & Precision.
              </p>
              <div className="flex gap-4">
                 <span className="text-[9px] uppercase tracking-widest text-primary/60 font-bold">Seeker</span>
                 <span className="text-[9px] uppercase tracking-widest text-primary/60 font-bold">-</span>
                 <span className="text-[9px] uppercase tracking-widest text-primary/60 font-bold">Solver</span>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </>
  );
}

function AmbientSpaceFillers() {
  return (
    <div className="absolute inset-x-0 top-0 w-full h-full min-h-screen overflow-hidden pointer-events-none -z-10">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          initial={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            scale: 0,
          }}
          animate={{
            y: [0, -60, 0],
            scale: [0.5, 1.5, 0.5],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
      <div className="absolute top-[25%] right-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute top-[65%] left-[-5%] w-[350px] h-[350px] bg-accent/5 rounded-full blur-[120px]" />
    </div>
  );
}
