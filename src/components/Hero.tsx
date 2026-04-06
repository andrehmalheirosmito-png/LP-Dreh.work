import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  const smoothY = useSpring(y, { stiffness: 50, damping: 20 });
  const smoothScale = useSpring(scale, { stiffness: 50, damping: 20 });
  const smoothRotate = useSpring(rotate, { stiffness: 50, damping: 20 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[150vh] flex items-start pt-[20vh] overflow-hidden bg-brand-navy-dark"
    >
      {/* Digital Environment Background Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: smoothY, opacity, scale: smoothScale, rotateX: smoothRotate }}
          className="max-w-4xl"
        >
          
          <div className="max-w-2xl">
            <motion.div 
              variants={textVariants}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-brand-cyan shadow-[0_0_10px_rgba(0,209,255,0.8)]"></div>
              <span className="text-brand-cyan font-mono text-xs tracking-[0.4em] uppercase">Conexão Estabelecida</span>
            </motion.div>
            
            <motion.h1 
              variants={textVariants}
              className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] mb-8 tracking-tighter perspective-2000"
            >
              <span className="block glitch-text" data-text="INFRAESTRUTURA">INFRAESTRUTURA</span>
              <span className="block text-brand-cyan text-glow">DE VENDAS.</span>
            </motion.h1>
            
            <motion.p 
              variants={textVariants}
              className="text-lg md:text-2xl text-brand-gray mb-12 max-w-xl leading-relaxed font-light"
            >
              Não fazemos sites genéricos. Construímos ecossistemas digitais de alta performance, projetados milimetricamente para dominar a atenção e maximizar a conversão da sua empresa.
            </motion.p>
            
            <motion.div 
              variants={textVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-8 w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto group relative bg-transparent border border-brand-cyan/50 text-brand-cyan px-10 py-5 md:px-12 md:py-6 rounded-full font-black text-lg md:text-xl tracking-widest uppercase overflow-hidden transition-all duration-300 hover:text-brand-navy-dark">
                <span className="relative z-10">Solicitar Diagnóstico</span>
                <div className="absolute inset-0 bg-brand-cyan translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                <div className="absolute -inset-1 bg-brand-cyan rounded-full blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              </button>
              
              <div className="flex items-center gap-4 font-mono">
                <div className="w-3 h-3 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_10px_rgba(0,209,255,0.8)]"></div>
                <div className="text-xs text-brand-cyan/60 tracking-widest uppercase">
                  <strong className="text-white block text-lg">+150%</strong>
                  Retenção de Atenção
                </div>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* Floating Technical Elements */}
      <div className="absolute bottom-10 left-10 z-20 font-mono text-[10px] text-brand-cyan/30 tracking-[0.5em] uppercase hidden md:block">
        Sistema_Operacional: Otimizado // Latência: Zero // Modo_Imersivo: Ativo
      </div>
    </section>
  );
}
