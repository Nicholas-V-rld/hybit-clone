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
    <nav className="relative w-full h-20 bg-gradient-to-r from-framer-blue-light to-framer-purple">
      <div className="max-w-3xl mx-auto px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
            <Image
              src="/hybit-logo.png"
              alt="Hybit logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
              priority
            />
            <Link href="/" className="text-4xl font-medium text-framer-text">
              hybit.
            </Link>
          </div>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-[25px] py-[19px] h-[60px] text-[25px] font-bold border border-framer-text rounded-full text-framer-text bg-transparent relative"
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