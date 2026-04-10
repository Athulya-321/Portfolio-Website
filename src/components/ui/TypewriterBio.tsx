'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bios = [
  "I am a software developer and NxtWave CCBP 4.0 Fellow with a strong passion for building dynamic, user-centric applications. Serving as a Teaching Assistant has honed my ability to write clean, maintainable code and translate complex technical concepts into accessible solutions. While my background includes rigorous problem-solving in analytics, my core strength lies in engineering robust end-to-end software. From designing responsive interfaces to optimizing backend logic, I bring a detail-oriented and adaptable approach to development. Having collaborated in high-stakes environments like the NASA Space Apps Challenge, I thrive under pressure and am always looking to leverage my technical versatility to build scalable software.",
  
  "As an AI & Data Science undergraduate at JEC and a Teaching Assistant at NxtWave, I am driven by the potential of data to solve complex, real-world problems. My experience spans hands-on roles at YBI Foundation and InternPe, where I've built predictive models tackling everything from healthcare diagnostics (diabetes prediction) to business optimization (revenue forecasting). I am constantly expanding my technical toolkit — whether I'm diving deep into the math behind Support Vector Machines, building and training custom voice assistants, or pushing the boundaries of technology in events like the NASA Space Apps Challenge. I thrive at the intersection of advanced analytics and creative problem-solving, always eager to adapt, learn, and engineer intelligent systems that make a tangible impact.",
  
  "I'm a technologist by training, but a problem-solver by nature. Whether I'm debugging a model late into the night for a hackathon or mentoring peers as a Teaching Assistant, I bring relentless energy and curiosity to the table. I don't just want to learn how systems work; I want to figure out how they can work better. I view every roadblock as a puzzle to solve and every project as a stepping stone to grow. Passionate, highly adaptable, and fiercely hardworking, my goal is to blend technical precision with a creative mindset. I am not just looking for a job; I am looking for the next big challenge to dive into, learn from, and conquer."
];

const TYPING_SPEED = 18;    // ms per char
const ERASING_SPEED = 8;    // ms per char
const PAUSE_AFTER_TYPE = 3200; // ms pause after full text shown
const PAUSE_AFTER_ERASE = 600; // ms pause before next text

export function TypewriterBio() {
  const [bioIndex, setBioIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'erasing' | 'waiting'>('typing');

  useEffect(() => {
    const currentBio = bios[bioIndex];

    if (phase === 'typing') {
      if (displayedText.length < currentBio.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentBio.slice(0, displayedText.length + 1));
        }, TYPING_SPEED);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setPhase('erasing'), PAUSE_AFTER_TYPE);
        return () => clearTimeout(timeout);
      }
    }

    if (phase === 'erasing') {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
        }, ERASING_SPEED);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setBioIndex((prev) => (prev + 1) % bios.length);
          setPhase('typing');
        }, PAUSE_AFTER_ERASE);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayedText, phase, bioIndex]);

  const labels = ['Software Developer', 'AI & DS Undergrad', 'Problem Solver'];

  return (
    <div className="relative">
      {/* Label pill */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bioIndex}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {labels[bioIndex]}
        </motion.div>
      </AnimatePresence>

      {/* Typewriter text area with fixed bounds to prevent layout shift */}
      <div className="min-h-[220px] md:min-h-[200px] lg:min-h-[180px] flex items-start">
        <p className="text-base md:text-lg text-foreground/75 leading-relaxed font-sans w-full">
          {displayedText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }}
            className="inline-block w-[2px] h-[1.1em] ml-[2px] bg-primary align-middle rounded-sm"
          />
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2 mt-6">
        {bios.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDisplayedText('');
              setBioIndex(i);
              setPhase('typing');
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === bioIndex ? 'w-8 bg-primary' : 'w-2 bg-foreground/20 hover:bg-foreground/40'
            }`}
          />
        ))}
        <span className="ml-2 text-xs text-foreground/40 font-medium">{bioIndex + 1} / {bios.length}</span>
      </div>
    </div>
  );
}
