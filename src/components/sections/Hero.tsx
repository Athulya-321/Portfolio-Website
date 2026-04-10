'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ParticlesBackground } from '@/components/ui/ParticlesBackground';
import { useState } from 'react';
import { useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLockedOpen, setIsLockedOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Check initial scroll position
    const latest = window.scrollY;
    setIsScrolled(latest > 50);

    if (!containerRef.current) return;
    
    // Optional GSAP background animation
    gsap.to('.hero-glow', {
      x: 'random(-50, 50)',
      y: 'random(-50, 50)',
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: 2.2 + custom * 0.2, 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }
    })
  } as any;

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Decorative Elements */}
      <ParticlesBackground />
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 dark:opacity-20 pointer-events-none">
        <div className="hero-glow absolute w-[600px] h-[600px] bg-primary/30 rounded-full blur-[100px] -top-20 -left-20" />
        <div className="hero-glow absolute w-[500px] h-[500px] bg-accent/30 rounded-full blur-[100px] bottom-0 right-0" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between w-full">
        
        {/* DP Side */}
        <div className="relative w-48 h-48 md:w-[450px] md:h-[450px] rounded-full mb-10 md:mb-0 z-20 flex-shrink-0 origin-center">
            {/* Main DP stays here */}
            <motion.div
              layoutId="profile-picture-hero"
              className="relative w-full h-full rounded-full cursor-pointer"
            >
              {/* Circular spinning animated border */}
              <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary border-r-accent animate-[spin_4s_linear_infinite]" />
              <img src="/dp.jpg" alt="Adhithyan VV" className="relative w-full h-full object-cover rounded-full p-2" />
            </motion.div>
        </div>

        {/* Content Side */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2 z-30">
          
          
          <div className="overflow-hidden mt-10 mb-8 perspective-[1000px]">
            <h1 className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-none text-foreground">
              {"Architecting ".split('').map((char, i) => (
                <motion.span
                  key={`c-${i}`}
                  className="inline-block"
                  initial={{ y: 120, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ delay: 2.5 + i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
              <span className="gradient-text inline-flex">
                {"Intelligent".split('').map((char, i) => (
                  <motion.span
                    key={`d-${i}`}
                    className="inline-block"
                    initial={{ y: 120, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{ delay: 2.5 + (13 + i) * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
              <br className="hidden md:block" />
              {" Systems.".split('').map((char, i) => (
                <motion.span
                  key={`e-${i}`}
                  className="inline-block mt-2 md:mt-4"
                  initial={{ y: 120, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ delay: 2.5 + (24 + i) * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>
          </div>

          <motion.p
            custom={6}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-lg md:text-xl text-foreground opacity-60 max-w-2xl mb-12 font-sans"
          >
            I'm Adhithyan VV, an AI & DS student and Full-stack Developer. I specialize in 4.0 Technologies, harnessing data science, machine learning, and robust engineering to drive innovation.
          </motion.p>
          
          <motion.div
            custom={7}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className={`flex flex-col sm:flex-row items-center gap-4`}
          >
            <Link 
              href="#projects"
              className="group flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
            >
              View Projects
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <button
              onClick={() => setIsLockedOpen(true)}
              className="group flex items-center gap-2 bg-secondary text-foreground px-8 py-4 rounded-full font-medium transition-all hover:bg-muted"
            >
              Download CV
              <Download className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

      </div>

      {/* Locked Resume Popup */}
      <AnimatePresence>
        {isLockedOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <motion.div 
              className="absolute inset-0 bg-background/60 backdrop-blur-xl"
              onClick={() => setIsLockedOpen(false)}
            />
            
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-background border border-border/50 p-10 rounded-[2.5rem] shadow-2xl text-center overflow-hidden"
            >
              {/* Decorative background circle */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                className="inline-flex p-4 rounded-full bg-primary/10 border border-primary/20 mb-8"
              >
                <div className="relative">
                   <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                   <Download className="w-10 h-10 text-primary relative z-10" />
                </div>
              </motion.div>

              <h3 className="text-3xl font-display font-bold mb-4">Access <span className="gradient-text">Locked</span>.</h3>
              <p className="text-foreground/60 leading-relaxed mb-8">
                I&apos;m currently refining my professional resume to ensure it meets the highest standards of precision.
                <br /><br />
                <span className="italic font-medium text-primary/80">&quot;Good things take time. Perfect things take a little longer.&quot;</span>
              </p>

              <motion.button
                onClick={() => setIsLockedOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-foreground text-background font-bold rounded-2xl transition-colors hover:bg-primary"
              >
                Understood
              </motion.button>

              <div className="mt-6 text-[10px] uppercase tracking-widest text-foreground/20 font-bold">
                Status: In Refinement Phase
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </section>
  );
}
