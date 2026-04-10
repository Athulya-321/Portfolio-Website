'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDpInNavbar, setIsDpInNavbar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const lastScrollY = useRef(0);
  
  useEffect(() => {
    // Scroll lock for mobile menu
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Check initial scroll position
    const latest = window.scrollY;
    const vh = window.innerHeight;
    setIsScrolled(latest > 50);
    if (latest > vh * 0.20) setIsDpInNavbar(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Backdrop logic (small scroll)
    setIsScrolled(latest > 50);

    // DP transition logic (hysteresis)
    const vh = window.innerHeight;
    const direction = latest > lastScrollY.current ? 'down' : 'up';
    lastScrollY.current = latest;

    if (direction === 'down') {
      if (latest > vh * 0.20) setIsDpInNavbar(true);
    } else {
      if (latest < vh * 0.30) setIsDpInNavbar(false);
    }
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95%] md:max-w-4xl px-4">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`relative rounded-[2rem] transition-all duration-500 overflow-hidden border border-border/50 ${
            isScrolled
              ? 'bg-background/40 backdrop-blur-[20px] py-3 shadow-[0_8px_32px_rgba(0,0,0,0.1)] border-primary/20 scale-[1.02]'
              : 'bg-transparent py-5 scale-100'
          }`}
        >
          {/* Internal liquid/glass effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/5 blur-[80px] rounded-full animate-pulse" />
          
          <div className="relative z-10 container mx-auto px-6 flex items-center justify-between">
            <Link href="#home">
              <div className="flex items-center gap-3">
                <AnimatePresence mode="wait">
                  {isDpInNavbar && (
                    <motion.div
                      initial={{ scale: 0, y: 100, opacity: 0, rotate: -20 }}
                      animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0, y: 20, opacity: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20,
                        duration: 0.6 
                      }}
                      className="relative w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer group"
                    >
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-md group-hover:bg-primary/40 transition-colors" />
                      <div className="absolute inset-[-2px] rounded-full border border-primary/30 group-hover:border-primary/60 transition-colors animate-[spin_6s_linear_infinite]" />
                      <img 
                        src="/dp.jpg" 
                        alt="Profile" 
                        className="relative w-full h-full object-cover rounded-full border border-border/50 group-hover:scale-105 transition-transform" 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.span 
                   className={`font-display font-bold tracking-tighter text-lg italic ${isDpInNavbar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} transition-all duration-500`}
                >
                  Adhithyan <span className="text-primary italic">VV</span>
                </motion.span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="px-4 py-2 text-xs uppercase tracking-widest font-bold text-foreground/70 hover:text-primary transition-colors cursor-pointer rounded-xl hover:bg-primary/5"
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="h-4 w-px bg-border/50 mx-2" />
              <ThemeToggle />
            </nav>

            {/* Mobile Navigation Toggle */}
            <div className="flex items-center gap-4 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/50 text-foreground hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden"
              >
                <ul className="flex flex-col px-6 py-8 space-y-6">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-xl font-display font-bold text-foreground hover:text-primary transition-all"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      </div>
    </>
  );
}
