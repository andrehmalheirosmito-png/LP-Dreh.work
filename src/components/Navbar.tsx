import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useTransform } from 'motion/react';

interface NavbarProps {
  scrollProgress?: any;
}

export default function Navbar({ scrollProgress }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide navbar during intro (first 15% of total scroll)
  const navOpacity = useTransform(scrollProgress, [0, 0.1, 0.15], [0, 0, 1]);
  const navY = useTransform(scrollProgress, [0, 0.1, 0.15], [-100, -100, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Metodologia', href: '#processo' },
    { name: 'Soluções', href: '#beneficios' },
    { name: 'Escopos', href: '#precos' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.header
      style={{ opacity: navOpacity, y: navY }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-brand-navy-dark/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="text-white font-black text-2xl tracking-tighter group">
          <span className="group-hover:glitch-text" data-text="DREH">DREH</span>
          <span className="text-brand-cyan text-glow">.WORK</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-brand-gray hover:text-brand-cyan font-mono text-[10px] tracking-[0.3em] uppercase transition-all duration-300 relative group"
            >
              <span className="relative z-10">{link.name}</span>
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-px bg-brand-cyan shadow-[0_0_10px_rgba(0,209,255,0.8)] group-hover:w-full transition-all duration-300"
              />
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contato"
            className="relative group px-8 py-3 bg-transparent border border-brand-cyan/30 text-brand-cyan font-mono text-[10px] tracking-[0.3em] uppercase overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10 group-hover:text-brand-navy-dark transition-colors duration-300">Iniciar Protocolo</span>
            
            {/* Animated Background Layers */}
            <div className="absolute inset-0 bg-brand-cyan translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            
            {/* Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100dvh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-0 left-0 right-0 bg-brand-navy-dark/98 backdrop-blur-2xl z-[60] flex flex-col md:hidden overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            
            <div className="flex justify-between items-center px-6 py-6 border-b border-white/10">
              <a href="#" className="text-white font-black text-2xl tracking-tighter">
                DREH<span className="text-brand-cyan text-glow">.WORK</span>
              </a>
              <button
                className="text-white p-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={32} className="text-brand-cyan" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-10 gap-12">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-black text-white tracking-tighter hover:text-brand-cyan transition-colors flex items-center gap-4 group"
                >
                  <span className="text-brand-cyan font-mono text-xs opacity-30 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                  {link.name}
                </motion.a>
              ))}
              
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                href="#contato"
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative group px-8 py-5 bg-transparent border border-brand-cyan text-brand-cyan font-black text-xl tracking-widest uppercase overflow-hidden text-center mt-8"
              >
                <span className="relative z-10">Mapear Meu Projeto</span>
                <div className="absolute inset-0 bg-brand-cyan translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></div>
              </motion.a>
            </div>

            <div className="p-10 border-t border-white/10 flex justify-between items-center font-mono text-[8px] text-brand-cyan/30 tracking-[0.5em] uppercase">
              <span>SYSTEM_READY</span>
              <span>v2.0.26</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
