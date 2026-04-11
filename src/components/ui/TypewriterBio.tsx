'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bios = [
  "I am a passionate software developer dedicated to engineering immersive and hyper-responsive digital experiences. My expertise bridges the gap between scalable engineering and fluid aesthetics, combining powerful frameworks like React.js, Next.js, and Node.js with rich front-end technologies like Tailwind CSS, Three.js, and GSAP. I thrive on translating abstract ideas into beautifully structured web applications and highly optimized architectures. Equipped with a strong foundation in generative AI workflows and modern DevOps tooling, I continuously explore experimental solutions to ensure every project is built to adapt and scale for the future.",
  
  "As a Computer Science undergraduate at Jyothi Engineering College, my academic journey is fueled by a relentless curiosity for how intelligent systems operate. Beyond the traditional curriculum, I have actively expanded my horizons through rigorous technical coursework, extensive full-stack project development, and high-pressure competitive hackathons. Whether I am architecting complex backend infrastructure or fine-tuning data science models, I approach every challenge as an opportunity to master new paradigms. My ultimate ambition is to bridge advanced academic concepts with real-world, impactful deployments.",
  
  "At my core, I am an adaptive problem solver who looks at every roadblock as a puzzle to conquer. I don't just write code; I engineer scalable solutions designed to drive tangible results, optimize performance, and completely elevate the user experience. Whether it involves debugging an intricate backend pipeline late into the night, rapidly adapting to an entirely new technology stack, or conceptualizing a system architecture from scratch, I bring analytical rigor and creative energy to the table. I am fiercely hardworking, extremely adaptable, and always searching for the next big challenge to aggressively execute."
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
