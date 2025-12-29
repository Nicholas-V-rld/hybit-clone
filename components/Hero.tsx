'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Particle type for the synaptic gap effect
interface SynapticParticle {
  id: number;
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [synapticParticles, setSynapticParticles] = useState<SynapticParticle[]>([]);
  const [mouseY, setMouseY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate particles localized to the synaptic gap area
  useEffect(() => {
    const particleCount = 75; // More particles for fuller effect
    const particles: SynapticParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Particles spawn within the synaptic gap area
      // Spread them in a cloud pattern
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random();
      const x = 50 + Math.cos(angle) * radius * 45; // Wider spread horizontally
      const y = 50 + Math.sin(angle) * radius * 40; // Wider spread vertically
      
      // Gentle drift within the gap
      const driftX = (Math.random() - 0.5) * 10;
      const driftY = (Math.random() - 0.5) * 8;

      particles.push({
        id: i,
        x,
        y,
        driftX,
        driftY,
        size: 3 + Math.random() * 5, // 3-8px - BOLDER particles
        duration: 2 + Math.random() * 3, // 2-5 seconds
        delay: Math.random() * 2, // Staggered start
        opacity: 0.85 + Math.random() * 0.15, // 0.85-1.0 opacity - BRIGHTER
      });
    }
    
    setSynapticParticles(particles);
  }, []);

  // Calculate animation values based on scroll
  const scrollThreshold = 100;
  const fadeRange = 400;
  
  const descriptionScrollProgress = Math.min(
    Math.max((scrollY - scrollThreshold) / fadeRange, 0),
    1
  );
  
  const descriptionOpacity = 1 - descriptionScrollProgress;
  const descriptionTranslateY = descriptionScrollProgress * 80;

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    setMouseY(y);
  };

  return (
    <section className="min-h-screen md:min-h-[130vh] relative overflow-hidden bg-gradient-to-r from-framer-blue-light to-framer-purple">
      {/* Background Neuron Images - Responsive sizing */}
      <div className="absolute inset-0 z-0">
        {/* First image (Hybit..png) - Main neuron image */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2
            top-[32%] w-[140vw]
            sm:top-[30%] sm:w-[120vw]
            md:top-[28%] md:w-[100vw]
            lg:top-[28%] lg:w-[95vw]"
          style={{ 
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
        
        {/* Second image (hybit.png) - Overlay */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2
            top-[38%] w-[180vw]
            sm:top-[36%] sm:w-[150vw]
            md:top-[35%] md:w-[130vw]
            lg:top-[35%] lg:w-[126.9vw]"
          style={{ 
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

      {/* SYNAPTIC GAP PARTICLES - Separate layer on top of images */}
      {synapticParticles.length > 0 && (
        <div 
          className="absolute pointer-events-none z-[2]"
          style={{
            // Position exactly where the synaptic gap appears on screen
            // The gap is between the two neurons, roughly center of the image
            left: '50%',
            transform: 'translateX(-50%)',
            // Position at the synaptic gap - exactly in the middle between the two neurons
            top: '20%',
            width: '180px',
            height: '130px',
          }}
        >
          {/* Responsive container that scales with screen */}
          <div 
            className="relative w-full h-full
              sm:w-[140px] sm:h-[90px]
              md:w-[160px] md:h-[100px]
              lg:w-[180px] lg:h-[110px]"
            style={{
              // Center the particle area
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {synapticParticles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 30%, rgba(220,230,255,0.6) 60%, transparent 100%)',
                  boxShadow: '0 0 6px rgba(255,255,255,1), 0 0 12px rgba(255,255,255,0.9), 0 0 18px rgba(200,220,255,0.7), 0 0 24px rgba(180,200,255,0.4)',
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                initial={{
                  opacity: 0,
                  scale: 0.2,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  opacity: [0, particle.opacity, particle.opacity * 0.5, particle.opacity, 0],
                  scale: [0.2, 1, 0.6, 1, 0.2],
                  x: [0, particle.driftX * 0.5, particle.driftX, particle.driftX * 0.5, 0],
                  y: [0, particle.driftY * 0.5, particle.driftY, particle.driftY * 0.5, 0],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.25, 0.5, 0.75, 1],
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Gradient layer after images */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-framer-blue-light to-framer-purple"
        style={{ 
          top: '70%',
          height: '30%',
          zIndex: 1
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-end min-h-screen md:min-h-[130vh] px-4 sm:px-6 md:px-8 lg:px-6 pb-12 sm:pb-16 md:pb-[20vh] lg:pb-[30vh]">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[22px] leading-[28px] sm:text-[28px] sm:leading-[34px] md:text-[36px] md:leading-[44px] lg:text-[47px] lg:leading-[56.4px] font-normal text-[rgb(47,45,61)]"
            style={{
              fontFamily: 'Sora, "Sora Placeholder", sans-serif',
              textAlign: 'center',
              margin: '0 auto',
              padding: '0 8px',
              width: '100%'
            }}
          >
            Neuronale Aktivität Steigern. Leistung Optimieren. Wachstum Beschleunigen.
          </motion.p>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[14px] leading-[18px] sm:text-[16px] sm:leading-[20px] md:text-[18px] md:leading-[22px] lg:text-[21px] lg:leading-[23.1px] font-medium text-[rgb(96,90,133)] mt-4 sm:mt-6 md:mt-8"
            style={{
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              textAlign: 'center',
              margin: '16px auto 0 auto',
              padding: '0 8px',
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

          {/* Get Started Button - visible on mobile/tablet, hidden on desktop (uses nav button) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 sm:mt-10 lg:hidden"
            style={{
              opacity: descriptionOpacity,
              transform: `translateY(-${descriptionTranslateY}px)`,
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            }}
          >
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-[18px] sm:text-[22px] font-bold border-2 border-framer-text rounded-full text-framer-text bg-transparent hover:bg-framer-text/5 transition-colors duration-200"
              style={{ perspective: '1000px' }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <motion.span
                className="inline-block relative"
                animate={{
                  rotateX: isHovering ? (mouseY < 30 ? 180 : -180) : 0,
                  y: isHovering ? (mouseY < 30 ? -2 : 2) : 0
                }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center'
                }}
              >
                <span className="inline-block" style={{ backfaceVisibility: 'hidden' }}>
                  Get started
                </span>
                <span 
                  className="inline-block absolute inset-0" 
                  style={{ 
                    transform: 'rotateX(180deg)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  Get started
                </span>
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
