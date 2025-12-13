'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState<Array<{
    delay: number;
    duration: number;
    startX: number;
    endX: number;
    size: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const particleData = Array.from({ length: 30 }).map((_, i) => ({
      delay: i * 0.2,
      duration: 6 + Math.random() * 6, // 6-12 seconds
      startX: Math.random() * 100, // Random horizontal position
      endX: Math.random() * 100 + (Math.random() - 0.5) * 15, // Slight horizontal drift
      size: 1 + Math.random() * 2, // 1-3px size
      opacity: 0.3 + Math.random() * 0.4, // 0.3-0.7 opacity
    }));
    setParticles(particleData);
  }, []);

  // Calculate animation values based on scroll
  // Description starts fading after scrolling past hero section
  const scrollThreshold = 100; // Start animation after 100px scroll
  const fadeRange = 400; // Fade over 400px of scroll
  
  const descriptionScrollProgress = Math.min(
    Math.max((scrollY - scrollThreshold) / fadeRange, 0),
    1
  );
  
  // Description opacity and transform - stays fixed initially, then fades and moves up
  const descriptionOpacity = 1 - descriptionScrollProgress;
  const descriptionTranslateY = descriptionScrollProgress * 80; // Moves up 80px as it fades

  return (
    <section className="min-h-[130vh] relative overflow-hidden bg-gradient-to-r from-framer-blue-light to-framer-purple">
      {/* Background Neuron Images - EXACT FRAMER SIZES */}
      <div className="absolute inset-0 z-0">
        {/* First image (Hybit..png) - Rectangular shape with faded edges (top, bottom, left, right) */}
        <div 
          className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ 
            width: '95vw', 
            maxWidth: 'none',
            maskImage: 'radial-gradient(ellipse 90% 55% at 50% 50%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.7) 38%, rgba(0,0,0,0.4) 48%, rgba(0,0,0,0.15) 58%, transparent 68%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 55% at 50% 50%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.7) 38%, rgba(0,0,0,0.4) 48%, rgba(0,0,0,0.15) 58%, transparent 68%)',
            overflow: 'hidden'
          }}
        >
          <img
            src="/Hybit..png"
            alt="Neuron background"
            className="w-full h-auto object-contain opacity-100"
            style={{ maxWidth: 'none', width: '100%', display: 'block' }}
          />
        </div>
        
        {/* Second image (hybit.png) - Cropped at bottom to touch tail of image underneath */}
        <div 
          className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ 
            width: '126.9vw', 
            maxWidth: 'none',
            maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 5%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.35) 18%, rgba(0,0,0,0.65) 25%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0.15) 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 5%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.35) 18%, rgba(0,0,0,0.65) 25%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0.15) 92%, transparent 100%)',
            overflow: 'hidden'
          }}
        >
          <img
            src="/hybit.png"
            alt="Neuron overlay"
            className="w-full h-auto object-contain opacity-50"
            style={{ maxWidth: 'none', width: '100%', display: 'block' }}
          />
        </div>
      </div>

      {/* Gradient layer after images */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-framer-blue-light to-framer-purple"
        style={{ 
          top: '70%', // Start gradient layer where images end
          height: '30%', // Cover remaining portion
          zIndex: 1 // Above images (z-0) but below content (z-10)
        }}
      />

      {/* Animated White Particles */}
      {particles.length > 0 && (
        <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              initial={{
                x: `${particle.startX}%`,
                y: '-5%',
                opacity: 0
              }}
              animate={{
                x: `${particle.endX}%`,
                y: '105%',
                opacity: [0, particle.opacity, particle.opacity, 0]
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.1, 0.9, 1]
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-end min-h-[130vh] px-6 pb-[35vh] md:pb-[38vh]">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* First part - scrolls normally */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'Sora, "Sora Placeholder", sans-serif',
              fontSize: '47px',
              fontWeight: 400,
              lineHeight: '56.4px',
              color: 'rgb(47, 45, 61)',
              textAlign: 'center',
              margin: '0 auto',
              padding: 0,
              width: '100%'
            }}
          >
            Neuronale Aktivität Steigern. Leistung Optimieren. Wachstum Beschleunigen.
          </motion.p>
          
          {/* Description - stays fixed initially, then fades and moves up on scroll */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontSize: '21px',
              fontWeight: 500,
              lineHeight: '23.1px',
              color: 'rgb(96, 90, 133)',
              textAlign: 'center',
              margin: '32px auto 40px auto',
              padding: 0,
              width: '100%',
              maxWidth: '48rem',
              opacity: descriptionOpacity,
              transform: `translateY(-${descriptionTranslateY}px)`,
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              willChange: 'opacity, transform'
            }}
          >
            Hybit NeuraFlow ist ein patentiertes, wissenschaftlich fundiertes System, das ohne Mehraufwand sofort die kognitive Leistung von Mitarbeitern steigert und die Produktivität messbar erhöht – für schnellere Skalierung und maximalen Unternehmenserfolg.
          </motion.p>
        </div>
      </div>
    </section>
  );
}