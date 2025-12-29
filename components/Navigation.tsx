'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [mouseY, setMouseY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    setMouseY(y);
  };

  return (
    <nav className="relative w-full h-16 sm:h-20 bg-gradient-to-r from-framer-blue-light to-framer-purple">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo - centered on mobile/tablet, left-aligned on desktop */}
          <div className="flex items-center gap-2 sm:gap-3 lg:flex-none flex-1 lg:flex-initial justify-center lg:justify-start">
            <Image
              src="/hybit-logo.png"
              alt="Hybit logo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              priority
            />
            <Link href="/" className="text-xl sm:text-2xl md:text-4xl font-medium text-framer-text">
              hybit.
            </Link>
          </div>
          
          {/* Desktop Button - only visible on lg screens and up */}
          <Link
            href="#contact"
            className="hidden lg:inline-flex items-center justify-center px-[25px] py-[19px] h-[60px] text-[25px] font-bold border border-framer-text rounded-full text-framer-text bg-transparent relative"
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
        </div>
      </div>
    </nav>
  );
}
