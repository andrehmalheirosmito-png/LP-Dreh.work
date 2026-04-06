import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import BentoGrid from './components/BentoGrid';
import Process from './components/Process';
import Features from './components/Features';
import CaseStudy from './components/CaseStudy';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import FooterCTA from './components/FooterCTA';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-navy-dark font-sans selection:bg-brand-cyan selection:text-brand-navy-dark relative">
      <Preloader />
      
      {/* Digital Environment Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[9998]">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="scanline"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>
      
      {/* Custom Cursor - Digital Probe */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-brand-cyan/30 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          rotate: isHovering ? 90 : 0,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'rgba(0, 209, 255, 0.8)' : 'rgba(0, 209, 255, 0.3)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.5 }}
      >
        <div className="w-1 h-1 bg-brand-cyan rounded-full"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2 bg-brand-cyan/50"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-2 bg-brand-cyan/50"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-px bg-brand-cyan/50"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-px bg-brand-cyan/50"></div>
      </motion.div>

      <Navbar scrollProgress={scrollYProgress} />
      <main className="relative z-10 bg-brand-navy-dark">
        <Hero />
        <ProblemSection />
        <BentoGrid />
        <Features />
        <CaseStudy />
        <Process />
        <Pricing />
        <FAQ />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
}
