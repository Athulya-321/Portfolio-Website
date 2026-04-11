'use client';

import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export function LockedCard() {
  return (
    <div className="relative h-full group perspective-[1200px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative h-full flex flex-col bg-background/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-primary/10 shadow-2xl transition-all duration-500 hover:shadow-primary/5 hover:border-primary/30"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated Background Shimmer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
          <motion.div
            animate={{ 
              backgroundPosition: ['0% 0%', '200% 200%'],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(210,136,146,0.05)_50%,transparent_75%)] bg-[length:250%_250%]"
          />
        </div>

        {/* Top Header Placeholder */}
        <div className="relative h-48 sm:h-64 flex items-center justify-center overflow-hidden bg-secondary/20 border-b border-primary/5">
          {/* Pulsing decorative circles */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute w-40 h-40 bg-primary/20 rounded-full blur-3xl"
          />
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="p-5 rounded-full bg-background/60 backdrop-blur-md border border-primary/20 shadow-xl relative"
            >
              <Lock className="w-10 h-10 text-primary opacity-80" />
              {/* Spinning Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-[spin_10s_linear_infinite]" />
            </motion.div>
          </div>
        </div>

        {/* Content Placeholder */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center items-center text-center">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <h3 className="text-xl font-display font-bold tracking-widest text-foreground uppercase mb-2">
              Access Restricted
            </h3>
            <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-4" />
          </motion.div>
          
          <p className="text-sm text-foreground/40 italic font-medium max-w-[200px]">
            Technical architectural blueprints under development.
          </p>
          
          <div className="mt-8 flex gap-2">
             {[1,2,3].map(i => (
               <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
             ))}
          </div>
        </div>

        {/* Bottom Loading Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary/30">
          <motion.div
            animate={{ left: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          />
        </div>
      </motion.div>
    </div>
  );
}
