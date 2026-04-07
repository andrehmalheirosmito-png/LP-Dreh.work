import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function FooterCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [-5, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="py-20 md:py-48 bg-brand-navy-dark relative overflow-hidden">
      {/* Digital Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      {/* Background Parallax Glow */}
      <motion.div 
        style={{ 
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.2, 0.1])
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan rounded-full blur-[120px] pointer-events-none"
      />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          style={{ scale, rotate, opacity }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-brand-cyan font-mono text-xs mb-8 tracking-[0.4em] uppercase block">Iniciação de Protocolo</span>
          <h2 className="text-4xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9]">
            Pronto para dominar <br />
            <span className="text-brand-cyan">o seu mercado?</span>
          </h2>
          <p className="text-lg md:text-2xl text-brand-gray mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed font-light">
            Chega de perder clientes valiosos por causa de uma presença digital genérica. Vamos construir a infraestrutura profissional que o seu negócio precisa para escalar de verdade.
          </p>
          <motion.a
            href={`https://wa.me/5531999656778?text=${encodeURIComponent('Olá, Andreh. Estou pronto para dominar meu mercado e gostaria do diagnóstico gratuito.')}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center px-8 md:px-16 py-5 md:py-7 bg-transparent border border-brand-cyan/50 text-brand-cyan rounded-full font-black text-lg md:text-2xl tracking-widest uppercase overflow-hidden transition-all duration-300 hover:text-brand-navy-dark active:scale-95"
          >
            <span className="relative z-10">Solicitar Diagnóstico Gratuito</span>
            <div className="absolute inset-0 bg-brand-cyan -translate-x-full md:group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
