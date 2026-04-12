'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

/**
 * A component that adds a magnetic hover effect to the name
 * and a playful auto-animation to the letter 'M'
 */
function MagneticName() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const sprX = useSpring(mouseX, springConfig);
  const sprY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) * 0.3);
      mouseY.set((e.clientY - centerY) * 0.3);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sprX, y: sprY }}
      className="flex flex-col items-center md:items-start cursor-default group"
    >
      <span className="text-3xl md:text-3xl lg:text-4xl font-display font-bold tracking-tighter italic text-foreground transition-all duration-300 group-hover:text-primary">
        Athulya{' '}
        <motion.span 
          className="text-primary inline-block"
          animate={{
            y: [0, -12, 0, 0, 0],
            rotate: [0, 0, 15, -15, 0],
            x: [0, 0, 0, -2, 2, -2, 2, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 4,
            times: [0, 0.4, 0.6, 0.8, 1],
            ease: "easeInOut"
          }}
        >
          M
        </motion.span>
      </span>
      <span className="text-[10px] md:text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-bold mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
        Digital Architect • Problem Solver
      </span>
    </motion.div>
  );
}

export function FooterArea() {
  return (
    <footer className="relative w-full py-10 px-6 md:px-12 bg-background/40 backdrop-blur-xl overflow-hidden border-t border-primary/10">
      <AmbientSpaceFillers />
      
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4">
          
          {/* Top (on mobile): Name & Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 w-full md:w-auto flex justify-center md:justify-start"
          >
            <MagneticName />
          </motion.div>

          {/* Middle (on mobile): Status Pill - BLINKING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex-1 flex justify-center w-full"
          >
            <motion.div 
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-3 p-3 px-6 rounded-full bg-secondary/40 text-primary border border-primary/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.1)] group transition-all hover:border-primary/30 w-full max-w-sm justify-center md:w-auto"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute inset-0 opacity-75" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative z-10 border border-emerald-400/50" />
              </div>
              <span className="text-[10px] md:text-[10px] uppercase tracking-[0.15em] font-black text-foreground/70 group-hover:text-foreground transition-colors">
                Status: Ready for Internships and Freelancing
              </span>
            </motion.div>
          </motion.div>

          {/* Bottom (on mobile): Copyright & Roles */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex-1 w-full md:w-auto flex flex-col items-center md:items-end text-center md:text-right space-y-2"
          >
            <p className="text-[11px] md:text-[11px] text-foreground/40 font-medium tracking-wide">
              © {new Date().getFullYear()} Crafted with Passion & Precision.
            </p>
            <div className="flex items-center gap-3 text-[11px] md:text-[11px] uppercase tracking-[0.3em] font-black">
              <span className="text-foreground/30 hover:text-primary transition-all cursor-default hover:tracking-[0.4em] duration-500">Seeker</span>
              <span className="text-primary/20 scale-150">•</span>
              <span className="text-foreground/30 hover:text-primary transition-all cursor-default hover:tracking-[0.4em] duration-500">Solver</span>
            </div>
          </motion.div>
          
        </div>
      </div>
    </footer>
  );
}

function AmbientSpaceFillers() {
  return (
    <div className="absolute inset-x-0 bottom-0 w-full h-full overflow-hidden pointer-events-none -z-10">
      <div className="absolute -bottom-[20%] left-[10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-[10%] right-[10%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '3s' }} />
    </div>
  );
}

