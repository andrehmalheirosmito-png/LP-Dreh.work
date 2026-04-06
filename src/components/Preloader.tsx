import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const opacity = useTransform(smoothProgress, [0, 0.8, 1], [1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const yOffset = useTransform(smoothProgress, [0, 1], [0, -100]);

  const bootLogs = [
    "INITIALIZING CORE SYSTEMS...",
    "ESTABLISHING NEURAL LINK...",
    "LOADING VIRTUAL ENVIRONMENT...",
    "CALIBRATING SENSORY INPUTS...",
    "BYPASSING REALITY FILTERS...",
    "SYSTEM READY."
  ];

  return (
    <div ref={containerRef} className="relative h-[300vh] z-[10000]">
      <motion.div
        style={{ opacity, scale }}
        className="sticky top-0 h-screen w-full bg-brand-navy-dark flex flex-col items-center justify-center p-6 font-mono overflow-hidden"
      >
        {/* Background Grid for Intro */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0"></div>
        
        <div className="w-full max-w-md relative z-10 bg-brand-navy-dark/40 backdrop-blur-sm p-8 border border-white/5 rounded-2xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-2 h-2 bg-brand-cyan animate-pulse"></div>
            <h2 className="text-brand-cyan text-sm font-black tracking-[0.3em] uppercase">Loading Protocol</h2>
          </div>
          
          <motion.div 
            style={{ y: yOffset }}
            className="mb-8 h-32 overflow-hidden flex flex-col justify-end"
          >
            {bootLogs.map((log, i) => {
              const start = (i / bootLogs.length) * 0.6;
              const end = start + 0.1;
              const logOpacity = useTransform(smoothProgress, [start, end], [0, 1]);
              
              return (
                <motion.div
                  key={i}
                  style={{ opacity: logOpacity }}
                  className="text-brand-cyan text-xs mb-1"
                >
                  <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
                  {log}
                </motion.div>
              );
            })}
          </motion.div>

          <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden mb-4">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-brand-cyan shadow-[0_0_15px_rgba(0,209,255,0.8)]"
              style={{ 
                width: useTransform(smoothProgress, [0, 0.8], ["0%", "100%"]) 
              }}
            />
          </div>
          
          <div className="flex justify-between items-center text-[10px] text-brand-cyan/50 tracking-widest uppercase">
            <span>Scroll to Initialize</span>
            <motion.span>
              {useTransform(smoothProgress, (v) => `${Math.min(Math.round(v * 125), 100)}%`)}
            </motion.span>
          </div>
        </div>

        <motion.div 
          style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-12 flex flex-col items-center gap-4"
        >
          <div className="w-px h-12 bg-gradient-to-b from-brand-cyan to-transparent animate-bounce"></div>
          <span className="text-brand-cyan/30 text-[10px] tracking-[0.5em] uppercase">
            Rotate to begin
          </span>
        </motion.div>

        {/* Decorative Brackets */}
        <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-brand-cyan/20"></div>
        <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-brand-cyan/20"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-brand-cyan/20"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-brand-cyan/20"></div>
      </motion.div>
    </div>
  );
}
