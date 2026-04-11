'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export function FooterArea() {
  return (
    <>
      <AmbientSpaceFillers />
      <footer className="relative w-full py-8 px-6 md:px-12 bg-background/20 backdrop-blur-md overflow-hidden border-t border-primary/10">
        <div className="container mx-auto flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center space-y-4"
          >
            {/* Elegant Name */}
            <span className="text-3xl md:text-5xl font-display font-bold tracking-tighter italic text-foreground">
              Athulya <span className="text-primary">M</span>
            </span>
            
            {/* Soft Catchphrase */}
            <p className="text-sm md:text-base text-muted-foreground font-light max-w-md italic">
              "Weaving digital dreams into beautiful realities."
            </p>

            {/* Status Pill */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 p-2 px-4 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-md shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] md:text-xs uppercase tracking-wider font-bold">
                Currently welcoming new opportunities
              </span>
            </motion.div>
            
          </motion.div>

          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-6" />

          {/* Copyright Area */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            
            <p className="text-[10px] text-foreground/30 mt-2 font-display">
              © {new Date().getFullYear()} All Rights Reserved.
            </p>
          </motion.div>

        </div>
      </footer>
    </>
  );
}

function AmbientSpaceFillers() {
  return (
    <div className="absolute inset-x-0 top-0 w-full h-full min-h-screen overflow-hidden pointer-events-none -z-10">
      {/* Soft Blobs instead of harsh particles */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '10s' }} />
      
      {/* Floating sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/20"
          initial={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            y: [0, -30, 0],
            scale: [0.5, 1.2, 0.5],
            opacity: [0.1, 0.6, 0.1],
            rotate: [0, 90, 180]
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
      ))}
    </div>
  );
}
