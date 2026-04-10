'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    // Lock scroll while preloading
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShow(false);
            if (onComplete) {
              setTimeout(onComplete, 800);
            }
            // Unlock scroll
            setTimeout(() => {
              document.body.style.overflow = '';
            }, 800);
          }, 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const displayProgress = Math.min(Math.round(progress), 100);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
                opacity: 0.15
              }}
            />
          </div>

          {/* Progress number */}
          <motion.div
            className="relative z-10 font-display font-bold text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent tabular-nums flex items-end tracking-tighter"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {displayProgress}
            <span className="text-4xl text-foreground/40 mb-3 ml-2">%</span>
          </motion.div>

          {/* Loading text */}
          <motion.p
            className="mt-6 font-mono text-sm tracking-[0.3em] text-foreground/50 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Initializing Experience
          </motion.p>

          {/* Progress bar */}
          <div className="mt-8 w-48 h-[2px] bg-muted rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary rounded-full"
              style={{ width: `${displayProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
