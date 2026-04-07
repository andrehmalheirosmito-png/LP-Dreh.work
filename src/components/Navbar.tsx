import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useTransform } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use a more robust way to show navbar after preloader/intro
  // We'll use a combination of scroll progress and absolute scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // Show navbar after approximately 2.5 screens (near the end of preloader)
      setIsVisible(scrollY > window.innerHeight * 2.5);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Metodologia', href: '#metodologia' },
    { name: 'Soluções', href: '#solucoes' },
    { name: 'Escopos', href: '#escopos' },
    { name: 'FAQ', href: '#faq' },
  ];

  const whatsappLink = `https://wa.me/5531999656778?text=${encodeURIComponent('Olá, Andreh. Gostaria de iniciar o Protocolo DREH para minha operação digital.')}`;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'bg-brand-navy-dark/70 backdrop-blur-xl py-3 border-b border-white/5 shadow-2xl' 
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-white font-black text-xl md:text-2xl tracking-tighter group flex items-center gap-2"
        >
          <div className="w-6 h-6 border-2 border-brand-cyan flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
            <div className="w-1 h-1 bg-brand-cyan"></div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white">DREH</span>
            <span className="text-brand-cyan text-[10px] tracking-[0.3em] font-mono">WORK</span>
          </div>
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
                className="absolute -bottom-1 left-0 w-0 h-px bg-brand-cyan group-hover:w-full transition-all duration-300"
              />
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group px-8 py-3 bg-transparent border border-brand-cyan/30 text-brand-cyan font-mono text-[10px] tracking-[0.3em] uppercase overflow-hidden transition-all duration-300 block"
          >
            <span className="relative z-10 group-hover:text-brand-navy-dark transition-colors duration-300">Iniciar Protocolo</span>
            
            {/* Animated Background Layers */}
            <div className="absolute inset-0 bg-brand-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-brand-cyan p-2 border border-brand-cyan/20 rounded-lg bg-brand-navy-dark/50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-navy-dark/95 backdrop-blur-2xl border-t border-white/5 overflow-hidden md:hidden shadow-2xl"
          >
            <div className="p-8 flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-brand-gray hover:text-brand-cyan font-mono text-sm tracking-[0.4em] uppercase transition-colors flex items-center justify-between group"
                >
                  <span>{link.name}</span>
                  <div className="w-2 h-2 border border-brand-cyan/30 group-hover:bg-brand-cyan transition-all"></div>
                </motion.a>
              ))}
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-brand-cyan text-brand-navy-dark px-8 py-5 font-black text-center mt-4 tracking-widest uppercase text-xs active:scale-95 transition-transform shadow-[0_0_20px_rgba(0,209,255,0.3)]"
              >
                Iniciar Protocolo
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
