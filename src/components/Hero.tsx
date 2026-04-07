import React from 'react';
import { motion } from 'motion/react';
import { TextCascade, TextDecoding, TextScrollReveal } from './animations/TextAnimations';

export default function Hero() {
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
      className="relative h-[100dvh] flex items-center overflow-hidden bg-brand-navy-dark"
    >
      {/* Digital Environment Background Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          
          <div className="flex flex-col items-start text-left">
            <motion.div 
              variants={textVariants}
              className="flex items-center gap-4 mb-2"
            >
              <div className="w-12 h-px bg-brand-cyan"></div>
              <TextDecoding text="Conexão Estabelecida" className="text-brand-cyan font-mono text-xs tracking-[0.4em] uppercase" />
            </motion.div>
            
            <motion.h1 
              variants={textVariants}
              className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black text-white leading-[0.85] mb-2 md:mb-4 tracking-tighter perspective-2000"
            >
              <div className="flex flex-col items-start gap-1 md:gap-2 overflow-hidden">
                <TextCascade text="INFRAESTRUTURA" className="whitespace-nowrap text-[10vw] sm:text-5xl md:text-5xl lg:text-6xl" />
                <span className="text-brand-cyan">DE VENDAS.</span>
              </div>
            </motion.h1>
            
            <motion.div variants={textVariants}>
              <TextScrollReveal 
                text="Não fazemos sites genéricos. Construímos ecossistemas digitais de alta performance, projetados milimetricamente para dominar a atenção e maximizar a conversão da sua empresa."
                className="text-sm md:text-base text-white/90 mb-4 md:mb-6 max-w-2xl leading-relaxed font-light"
              />
            </motion.div>
            
            <motion.div 
              variants={textVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 w-full sm:w-auto"
            >
              <a 
                href={`https://wa.me/5531999656778?text=${encodeURIComponent('Olá, Andreh. Gostaria de solicitar um diagnóstico da minha infraestrutura de vendas atual.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-transparent border border-brand-cyan/50 text-brand-cyan px-6 md:px-10 py-3 md:py-4 rounded-full font-black text-base md:text-lg tracking-widest uppercase overflow-hidden transition-all duration-300 hover:text-brand-navy-dark active:scale-95 text-center w-full sm:w-auto"
              >
                <span className="relative z-10">Solicitar Diagnóstico</span>
                <div className="absolute inset-0 bg-brand-cyan -translate-x-full md:group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              </a>
              
              <div className="flex items-center gap-4 font-mono p-2">
                <div className="w-3 h-3 rounded-full bg-brand-cyan animate-pulse"></div>
                <div className="text-xs text-brand-cyan/60 tracking-widest uppercase text-left">
                  <strong className="text-white block text-base">
                    <TextDecoding text="+150%" />
                  </strong>
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
