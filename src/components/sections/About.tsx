'use client';

import { motion } from 'framer-motion';
import { Layout, Server, Cpu, Terminal, Code2, Rocket, Cloud, Compass } from 'lucide-react';
import { TypewriterBio } from '@/components/ui/TypewriterBio';

const skills = [
  { 
    name: 'Frontend Development', 
    icon: Layout, 
    items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Next.js', 'Tailwind CSS'] 
  },
  { 
    name: 'Backend & Infra', 
    icon: Server, 
    items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'] 
  },
  { 
    name: 'AI Engineering', 
    icon: Cpu, 
    items: ['Python', 'PyTorch', 'Large Language Models', 'LangChain', 'RAG Pipelines'] 
  },
  { 
    name: 'DevOps & Tools', 
    icon: Terminal, 
    items: ['Git', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'UI/UX Design'] 
  },
  { 
    name: 'Languages', 
    icon: Code2, 
    items: ['JavaScript', 'Python', 'C++', 'Java', 'Go', 'Rust'] 
  },
  { 
    name: 'Experience & Growth', 
    icon: Compass, 
    items: ['Hackathons', 'Project Development', 'Technical Courses', 'Problem Solving'] 
  },
];

const techNodes = [
  { icon: Cpu,      label: 'AI Pipelines', x: '50%',  y: '12%',  delay: 0,    color: 'text-violet-400',  bg: 'bg-violet-500/10',  ring: 'border-violet-500/30' },
  { icon: Layout,   label: 'Frontend',     x: '82%',  y: '30%',  delay: 0.1,  color: 'text-pink-400',    bg: 'bg-pink-500/10',    ring: 'border-pink-500/30' },
  { icon: Server,   label: 'Backend',      x: '88%',  y: '62%',  delay: 0.15, color: 'text-emerald-400', bg: 'bg-emerald-500/10', ring: 'border-emerald-500/30' },
  { icon: Cloud,    label: 'AWS & Cloud',  x: '55%',  y: '84%',  delay: 0.2,  color: 'text-orange-400',  bg: 'bg-orange-500/10',  ring: 'border-orange-500/30' },
  { icon: Terminal, label: 'DevOps',       x: '18%',  y: '72%',  delay: 0.25, color: 'text-cyan-400',    bg: 'bg-cyan-500/10',    ring: 'border-cyan-500/30' },
  { icon: Code2,    label: 'Languages',    x: '9%',   y: '40%',  delay: 0.3,  color: 'text-yellow-400',  bg: 'bg-yellow-500/10',  ring: 'border-yellow-500/30' },
  { icon: Rocket,   label: 'Hackathons',   x: '27%',  y: '16%',  delay: 0.35, color: 'text-rose-400',    bg: 'bg-rose-500/10',    ring: 'border-rose-500/30' },
];

const connections = [
  [0, 1], [0, 6], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [0, 4], [1, 3],
];

function TechHub() {
  return (
    <div className="relative w-full h-[340px] md:h-[420px] select-none">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map(([a, b], idx) => {
          const from = techNodes[a];
          const to   = techNodes[b];
          return (
            <motion.line
              key={idx}
              x1={from.x} y1={from.y}
              x2={to.x}   y2={to.y}
              stroke="url(#lineGrad)"
              strokeWidth="0.3"
              strokeDasharray="2 2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + idx * 0.1, duration: 0.8 }}
            />
          );
        })}
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--color-accent, #ec4899)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-full bg-primary/20 blur-xl"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-primary/20"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold text-primary/60 tracking-widest">A - M</span>
        </div>
      </div>

      {techNodes.map(({ icon: Icon, label, x, y, delay, color, bg, ring }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.2, zIndex: 10 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-default"
          style={{ left: x, top: y }}
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.5 + delay, ease: 'easeInOut' }}
            className={`absolute inset-0 rounded-full border ${ring}`}
          />
          <div className={`w-12 h-12 rounded-full ${bg} border ${ring} flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:shadow-lg`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            <span className={`text-[10px] font-bold ${color} tracking-wide`}>{label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            About <span className="gradient-text">Me</span>.
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-grad-start to-grad-end rounded-full inline-block animate-gradient-xy bg-[length:200%_200%]" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
          >
            <TypewriterBio />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border border-border/40" />
            <TechHub />
            <p className="text-center text-xs text-muted-foreground opacity-60 tracking-widest uppercase mt-2 pb-4">hover nodes to explore my stack</p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="group relative p-6 bg-background/40 backdrop-blur-lg rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-primary/10"
              >
                <div className="absolute inset-0 rounded-2xl before:absolute before:inset-[-2px] before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent,var(--grad-start),transparent,var(--grad-end),transparent)] before:bg-[length:300%_300%] before:animate-gradient-xy before:-z-10 group-hover:before:opacity-100 before:opacity-0 before:transition-opacity before:duration-500 after:absolute after:inset-[1.5px] after:bg-background/80 after:backdrop-blur-xl after:rounded-2xl after:-z-10" />
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold mb-4 relative z-10">{skill.name}</h3>
                <ul className="space-y-2 relative z-10">
                  {skill.items.map((item) => (
                    <li key={item} className="flex items-center text-foreground/70 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}