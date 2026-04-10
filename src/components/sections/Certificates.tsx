'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { X, Maximize2, LayoutGrid, Grid3X3, Grid, Sparkles, ArrowRight } from 'lucide-react';
import { CATEGORIES, type CategoryMeta } from './certificatesData';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

type GridSize = 'small' | 'medium' | 'large';

// ─── Per-card shimmer skeleton + image ────────────────────────────────────
function CertCard({
  src,
  alt,
  onClick,
  index = 0,
}: {
  src: string;
  alt: string;
  onClick: () => void;
  index?: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      layout
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: [0, (index % 2 === 0 ? 4 : -4), 0],
        y: [0, (index % 3 === 0 ? -4 : 4), 0]
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        layout: { duration: 0.4 },
        x: { duration: 5 + index, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 6 + index, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 0.4 }
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-lg hover:shadow-primary/30 transition-shadow duration-500 will-change-transform"
    >
      {/* Shimmer skeleton */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="sk"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="absolute inset-0 z-10 bg-secondary/30 animate-pulse flex items-center justify-center"
          >
            <div className="w-8 h-8 border-[3px] border-primary/30 border-t-primary rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-white/15 backdrop-blur-md rounded-full border border-white/25 text-white shadow-[0_0_24px_rgba(139,92,246,0.5)]"
        >
          <Maximize2 className="w-5 h-5" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Carousel card (gradient border, image-only) ──────────────────────────
function CarouselCard({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      className="relative group cursor-pointer rounded-2xl p-[1.5px] select-none"
      style={{
        background: 'linear-gradient(135deg,rgba(139,92,246,.5),rgba(196,181,253,.15),rgba(6,182,212,.4))',
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(135deg,rgba(139,92,246,.7),rgba(6,182,212,.6))' }}
      />

      <div className="relative rounded-2xl overflow-hidden bg-black/60">
        {/* skeleton */}
        <AnimatePresence>
          {!loaded && (
            <motion.div key="sk" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="absolute inset-0 z-10 bg-secondary/20 animate-pulse flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={src} alt={alt} loading="lazy" onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        {/* shine sweep */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

        {/* zoom icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="p-3 bg-primary/80 backdrop-blur-md rounded-full shadow-[0_0_30px_rgba(139,92,246,.8)] text-white transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Maximize2 className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── "Wanna See More" 6th card ─────────────────────────────────────────────
function SeeMoreCard({ cat, count, onClick }: { cat: CategoryMeta; count: number; onClick: () => void }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 20 });
  const sy = useSpring(my, { stiffness: 200, damping: 20 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.08);
    my.set((e.clientY - r.top - r.height / 2) * 0.08);
  }, [mx, my]);

  return (
    <motion.div
      layout initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="relative rounded-2xl overflow-hidden select-none" style={{ perspective: '600px' }}
    >
      <motion.div style={{ x: sx, y: sy }}
        className="relative min-h-[220px] flex flex-col items-center justify-center p-6 text-center"
      >
        {/* bg gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-10`} />
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 rounded-2xl`}
          animate={{ opacity: [0, 0.12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* dashed border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-primary/30 pointer-events-none" />

        {/* orbiting dots */}
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <motion.div key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/50"
            style={{ left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 52}px)`, top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 38}px)` }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
          />
        ))}

        {/* centre icon */}
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="relative mb-4">
          <div className="absolute inset-0 bg-primary/40 rounded-full blur-xl scale-150" />
          <div className="relative p-3 bg-primary/20 rounded-full border border-primary/30 backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
        </motion.div>

        <h3 className="text-lg font-display font-bold text-foreground mb-1">{count - 5}+ More</h3>
        <p className="text-xs text-muted-foreground mb-5 max-w-[160px] leading-relaxed">
          Let&apos;s go explore the full {cat.label} collection!
        </p>

        {/* CTA button */}
        <motion.button onClick={onClick} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
          className="relative overflow-hidden rounded-full px-5 py-2 text-sm font-semibold group/btn"
        >
          <span className={`absolute inset-0 bg-gradient-to-r ${cat.color} opacity-90 rounded-full`} />
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
          />
          <span className="relative flex items-center gap-2 text-white">
            Wanna see more?
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── Lightbox ──────────────────────────────────────────────────────────────
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <motion.div key="lb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
    >
      <motion.div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.85, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative z-10 max-w-5xl w-full flex items-center justify-center"
      >
        <img src={src} alt={alt}
          className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-white/10 shadow-[0_0_80px_rgba(139,92,246,.3)]"
        />
        <motion.button onClick={onClose} whileHover={{ rotate: 90, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="absolute -top-12 right-0 md:top-0 md:-right-14 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── Grid popup ─────────────────────────────────────────────────────────────
function GridPopup({
  open, cat, onClose, onOpenLightbox,
}: {
  open: boolean; cat: CategoryMeta;
  onClose: () => void; onOpenLightbox: (src: string, alt: string) => void;
}) {
  const [gridSize, setGridSize] = useState<GridSize>('medium');
  const gridClass: Record<GridSize, string> = {
    small:  'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3',
    medium: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5',
    large:  'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-7',
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div key="gp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-8"
        >
          <motion.div className="absolute inset-0 bg-background/80 backdrop-blur-2xl" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.93, y: 60, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.93, y: 60, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="relative w-full sm:max-w-7xl h-full sm:h-[88vh] bg-background/95 border-t sm:border border-border/50 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            style={{ boxShadow: '0 -20px 80px rgba(139,92,246,.12),0 0 0 1px rgba(139,92,246,.08)' }}
          >
            {/* Header */}
            <div className="flex-none px-5 py-4 md:px-8 md:py-5 flex items-center justify-between border-b border-border/40 bg-background/60 backdrop-blur-md">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${cat.color}`} />
                  <h3 className="text-xl md:text-2xl font-display font-bold">
                    <span className="gradient-text">{cat.label}</span>
                    <span className="text-foreground"> Collection</span>
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground">{cat.images.length} certificates &mdash; {cat.description}</p>
              </div>

              <div className="flex items-center gap-3">
                {/* Grid size toggle - now visible on all screens */}
                <div className="flex items-center gap-1 p-1 bg-secondary/60 rounded-full border border-border/50">
                  {([['large', Grid], ['medium', LayoutGrid], ['small', Grid3X3]] as const).map(([size, Icon]) => (
                    <motion.button key={size} onClick={() => setGridSize(size)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      className={`p-1.5 md:p-2 rounded-full transition-colors duration-200 ${gridSize === size ? 'bg-background shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </motion.button>
                  ))}
                </div>
                <motion.button onClick={onClose} whileHover={{ rotate: 90, scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="p-2.5 bg-secondary/60 hover:bg-secondary rounded-full border border-border/50 text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Scrollable grid */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
              <motion.div layout className={`grid ${gridClass[gridSize]} pb-8`}>
                <AnimatePresence mode="popLayout">
                  {cat.images.map((src, i) => (
                    <CertCard key={src} src={src} alt={`${cat.label} ${i + 1}`} index={i}
                      onClick={() => onOpenLightbox(src, `${cat.label} ${i + 1}`)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────
export function Certificates() {
  const [activeCat, setActiveCat]   = useState(CATEGORIES[0]);
  const [popupOpen, setPopupOpen]   = useState(false);
  const [lightbox, setLightbox]     = useState<{ src: string; alt: string } | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const carouselImgs = activeCat.images.slice(0, 5);
  const hasMore      = activeCat.images.length > 5;

  useEffect(() => { swiperRef.current?.slideTo(0); }, [activeCat]);

  useEffect(() => {
    if (popupOpen || lightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup: restore scroll on unmount or state change
    return () => {
      document.body.style.overflow = '';
    };
  }, [popupOpen, lightbox]);

  return (
    <section id="certificates" className="py-20 md:py-28 relative overflow-hidden bg-transparent">
      {/* ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65 }}
          className="flex flex-col items-center text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Licenses &amp; <span className="gradient-text">Certifications</span>.
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-6" />
          <p className="text-sm md:text-base text-muted-foreground max-w-xl">
            A curated collection of credentials across AI, cloud, security, and web development.
          </p>
        </motion.div>

        {/* Category pills */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 md:mb-14"
        >
          {CATEGORIES.map((cat) => (
            <motion.button key={cat.key} onClick={() => setActiveCat(cat)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
              className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border ${
                activeCat.key === cat.key
                  ? 'text-white border-transparent shadow-lg'
                  : 'bg-secondary/40 border-border text-foreground hover:border-primary/40 hover:bg-secondary/70'
              }`}
            >
              {activeCat.key === cat.key && (
                <motion.span layoutId="cat-pill"
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${cat.color}`}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{cat.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Carousel */}
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.65 }}
          className="w-full max-w-5xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div key={activeCat.key}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Swiper
                onSwiper={(s) => (swiperRef.current = s)}
                effect="coverflow" grabCursor centeredSlides slidesPerView="auto"
                breakpoints={{
                  320:  { slidesPerView: 1.15, spaceBetween: 14 },
                  640:  { slidesPerView: 1.8,  spaceBetween: 22 },
                  768:  { slidesPerView: 2.3,  spaceBetween: 26 },
                  1024: { slidesPerView: 3,    spaceBetween: 34 },
                }}
                coverflowEffect={{ rotate: 18, stretch: 0, depth: 160, modifier: 1, slideShadows: true }}
                autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="w-full pb-14"
              >
                {carouselImgs.map((src, i) => (
                  <SwiperSlide key={src} style={{ maxWidth: 320 }}>
                    <motion.div
                      animate={{ 
                        x: [0, (i % 2 === 0 ? 5 : -5), 0],
                        y: [0, (i % 3 === 0 ? -5 : 5), 0]
                      }}
                      transition={{ 
                        x: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
                        y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <CarouselCard src={src} alt={`${activeCat.label} ${i + 1}`}
                        onClick={() => setLightbox({ src, alt: `${activeCat.label} ${i + 1}` })}
                      />
                    </motion.div>
                  </SwiperSlide>
                ))}

                {hasMore && (
                  <SwiperSlide style={{ maxWidth: 320 }}>
                    <SeeMoreCard cat={activeCat} count={activeCat.images.length} onClick={() => setPopupOpen(true)} />
                  </SwiperSlide>
                )}
              </Swiper>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Grid popup */}
      <GridPopup open={popupOpen} cat={activeCat}
        onClose={() => setPopupOpen(false)}
        onOpenLightbox={(src, alt) => setLightbox({ src, alt })}
      />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </section>
  );
}