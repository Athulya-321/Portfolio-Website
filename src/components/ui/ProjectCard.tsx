'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  index: number;
}

export function ProjectCard({ title, description, image, tags, liveUrl, index }: ProjectCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      style={{ perspective: 1200 }}
      className="group relative h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="flex flex-col h-full bg-background backdrop-blur-sm rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.1)] transition-shadow duration-500 will-change-transform relative z-0"
      >
        {/* Spotlight rotating border on hover */}
        <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_300deg,var(--grad-end)_360deg)] opacity-0 group-hover:opacity-100 animate-border-chase z-[-2] transition-opacity duration-300" />
        <div className="absolute inset-[1.5px] bg-background rounded-2xl z-[-1]" />

        {/* Image Container with Parallax Effect */}
        <div className="relative h-64 overflow-hidden bg-muted flex-shrink-0" style={{ transform: "translateZ(30px)" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-105 transition-transform duration-700 ease-out z-0" />
          
          <div className="absolute inset-0 z-10 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110" style={{ backgroundImage: `url(${image})` }} />
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center gap-4">
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-primary transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
           
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex-1 flex flex-col z-30 bg-background/50" style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
          <p className="text-foreground/70 mb-6 flex-1 line-clamp-3">{description}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
