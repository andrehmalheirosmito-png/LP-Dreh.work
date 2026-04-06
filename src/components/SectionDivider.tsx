import React from 'react';
import { motion, useTransform, useVelocity, useSpring, MotionValue } from 'motion/react';

interface SectionDividerProps {
  scrollYProgress: MotionValue<number>;
  fill: string;
  className?: string;
  reverse?: boolean;
}

export default function SectionDivider({ scrollYProgress, fill, className, reverse = false }: SectionDividerProps) {
  // Get scroll velocity to react to speed and direction
  const velocity = useVelocity(scrollYProgress);
  
  // Smooth the velocity for a "thick" and fluid feel
  const smoothVelocity = useSpring(velocity, {
    stiffness: 60,
    damping: 20,
    mass: 0.5
  });

  // Transform velocity into horizontal shift and skew
  // This makes the divider "lean" into the scroll direction
  const skewX = useTransform(smoothVelocity, [-0.1, 0, 0.1], [10, 0, -10]);
  const translateX = useTransform(smoothVelocity, [-0.1, 0, 0.1], [-40, 0, 40]);
  
  // Subtle scale effect as we reach the end of the section
  const scaleY = useTransform(scrollYProgress, [0.7, 1], [1, 1.25]);
  const opacity = useTransform(smoothVelocity, [-0.1, 0, 0.1], [0.9, 1, 0.9]);

  // Wave effect: change the path slightly based on velocity
  const wavePath = useTransform(smoothVelocity, [-0.1, 0, 0.1], [
    "M0,120 L1200,120 L1200,40 Q600,80 0,40 Z", // Curved down
    "M0,120 L1200,120 L1200,40 Q600,0 0,40 Z",  // Normal
    "M0,120 L1200,120 L1200,40 Q600,-40 0,40 Z" // Curved up
  ]);

  return (
    <div className={`absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none ${className}`}>
      <motion.div
        style={{ 
          skewX,
          x: translateX,
          scaleY,
          opacity,
          originY: 1,
          rotate: reverse ? 180 : 0
        }}
        className="w-[130%] -left-[15%] relative"
      >
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className={`relative block w-full h-[60px] md:h-[120px] ${fill}`}
        >
          <motion.path d={wavePath} />
        </svg>
      </motion.div>
    </div>
  );
}
