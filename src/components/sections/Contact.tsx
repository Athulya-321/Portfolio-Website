'use client';

import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin, Instagram, Send } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

function MagneticText({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.2);
    y.set((clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ContactOrb({ icon: Icon, href, label, detail, delay = 0 }: { icon: any, href?: string, label: string, detail: string, delay?: number }) {
  return (
    <motion.a
      href={href}
      target={href?.startsWith('http') ? "_blank" : undefined}
      initial={{ y: 0 }}
      animate={{ 
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex flex-col items-center justify-center p-8 rounded-full border border-border bg-secondary/30 backdrop-blur-md transition-colors hover:bg-secondary/50 hover:border-primary/50"
    >
      {/* Liquid Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col items-center">
        <Icon className="w-8 h-8 text-primary mb-2 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110" />
        <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-bold">{label}</span>
        <span className="text-sm font-medium text-foreground text-center">{detail}</span>
      </div>
      
      {/* Decorative pulse ring */}
      <div className="absolute inset-0 rounded-full border border-primary/10 scale-110 group-hover:scale-125 group-hover:border-primary/30 transition-all duration-700" />
      <div className="absolute inset-0 rounded-full border border-primary/5 scale-125 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-1000" />
    </motion.a>
  );
}

export function Contact() {
  const [isSent, setIsSent] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    const formData = new FormData(formRef.current);
    const name = formData.get('pilot') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('manifesto') as string;
    
    // Direct Gmail compose link
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=adhithyanvv2005@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`)}`;
    
    window.open(gmailLink, '_blank');
    
    setIsSent(true);
    formRef.current.reset();
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-20">
          <MagneticText>
            <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter uppercase mb-6 leading-none text-foreground">
              Ready to <br />
              <span className="gradient-text">Defy Limits?</span>
            </h2>
          </MagneticText>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-2xl font-light italic"
          >
            "Curiosity is the engine of innovation. Let's build the future together."
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Contact Orbs Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
            <ContactOrb 
              icon={Mail} 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=adhithyanvv2005@gmail.com" 
              label="The Channel" 
              detail="adhithyanvv2005@gmail.com" 
              delay={0}
            />
            <ContactOrb 
              icon={Phone} 
              href="tel:+918590648846" 
              label="The Line" 
              detail="+91 8590648846" 
              delay={0.5}
            />
            <ContactOrb 
              icon={MapPin} 
              label="The Base" 
              detail="Kerala, India" 
              delay={1}
            />
            <div className="flex justify-center items-center gap-6 p-8">
              {[
                { icon: Github, href: 'https://github.com/Adhithyan-VV-05' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/adhithyan-vv' },
                { icon: Instagram, href: 'https://www.instagram.com/adhithyan_vv_?igsh=MWZmNGRzcTdnMnptbg==' },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a 
                    key={i}
                    href={social.href}
                    target="_blank"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-14 h-14 bg-secondary border border-border rounded-full flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-all backdrop-blur-sm shadow-sm"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Magnetic Form Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative p-[1.5px] rounded-[2.5rem] overflow-hidden group shadow-xl"
          >
            {/* Animated breathing border */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,var(--primary),transparent)] group-hover:animate-[spin_4s_linear_infinite]" />
            
            <div className="relative bg-background/95 backdrop-blur-2xl rounded-[2.45rem] p-10 md:p-14">
              <form ref={formRef} className="flex flex-col gap-8" onSubmit={handleSend}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold ml-2 italic">The Pilot (Name)</label>
                    <input 
                      required
                      name="pilot"
                      type="text" 
                      placeholder="Identified as..." 
                      className="w-full bg-secondary/50 border border-border rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors focus:ring-1 focus:ring-primary/20 placeholder:text-muted-foreground/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold ml-2 italic">The Subject (Clearance)</label>
                    <input 
                      required
                      name="subject"
                      type="text" 
                      placeholder="Frequency set to..." 
                      className="w-full bg-secondary/50 border border-border rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors focus:ring-1 focus:ring-primary/20 placeholder:text-muted-foreground/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold ml-2 italic">The Manifesto (Message)</label>
                  <textarea 
                    required
                    name="manifesto"
                    placeholder="Describe the mission..." 
                    rows={4}
                    className="w-full bg-secondary/50 border border-border rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors focus:ring-1 focus:ring-primary/20 placeholder:text-muted-foreground/30 resize-none"
                  />
                </div>

                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex items-center justify-center gap-3 bg-foreground text-background font-bold h-16 rounded-2xl overflow-hidden transition-all hover:bg-primary"
                >
                  <span className="relative z-10 font-display uppercase tracking-widest transition-colors group-hover:text-white">
                    {isSent ? "Connection Established" : "Connect with Me"}
                  </span>
                  {!isSent && <Send className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />}
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
