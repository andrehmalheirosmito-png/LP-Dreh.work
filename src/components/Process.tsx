import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  const steps = [
    {
      number: "01",
      title: "Imersão & Diagnóstico",
      description: "Mapeamos seus gargalos operacionais, estudamos o comportamento do seu cliente ideal e definimos a arquitetura exata para o seu projeto.",
      color: "bg-brand-navy-dark"
    },
    {
      number: "02",
      title: "Estrutura & Copywriting",
      description: "Construímos a espinha dorsal persuasiva. Textos desenvolvidos para conduzir a decisão de compra através de gatilhos mentais e lógica impecável.",
      color: "bg-brand-cyan"
    },
    {
      number: "03",
      title: "Design & Engenharia",
      description: "Transformamos a estratégia em uma interface de alto impacto visual, programada com código limpo e velocidade de carregamento extrema.",
      color: "bg-brand-navy"
    },
    {
      number: "04",
      title: "Integração & Lançamento",
      description: "A infraestrutura vai ao ar totalmente integrada às suas ferramentas de tráfego, CRM e automações, pronta para transformar cliques em receita real.",
      color: "bg-brand-navy-dark"
    }
  ];

  return (
    <section ref={containerRef} id="processo" className="relative h-auto lg:h-[400vh] bg-brand-navy-dark">
      {/* Digital Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      {/* Mobile View: Vertical Stack */}
      <div className="lg:hidden py-20 px-6 relative z-10">
        <div className="mb-16">
          <span className="text-brand-cyan font-mono text-xs mb-4 tracking-[0.4em] uppercase block">Nossa Metodologia</span>
          <h2 className="text-4xl font-black text-white leading-none tracking-tighter mb-6">
            O Protocolo <br />
            <span className="text-brand-cyan text-glow">DREH.</span>
          </h2>
          <p className="text-lg text-brand-gray leading-relaxed font-light">
            Abandonamos o achismo. Nosso processo é um método validado de engenharia de conversão.
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative p-8 bg-brand-navy-dark/40 backdrop-blur-xl border-l border-brand-cyan/20">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 ${step.color} flex items-center justify-center text-xl font-mono font-black border border-white/10 ${index === 1 ? 'text-brand-navy-dark' : 'text-white'}`}>
                  {step.number}
                </div>
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{step.title}</h3>
              </div>
              <p className="text-sm text-brand-gray leading-relaxed font-mono">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View: Sticky Reveal */}
      <div className="hidden lg:block sticky top-0 h-[100dvh] flex items-center overflow-hidden z-10 will-change-transform">
        <div className="container mx-auto px-12 grid grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Pinned Title */}
          <div className="relative z-20">
            <motion.div
              style={{ 
                opacity: useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
                scale: useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0.9, 1, 1, 0.9])
              }}
            >
              <span className="text-brand-cyan font-mono text-xs mb-6 tracking-[0.4em] uppercase block">Nossa Metodologia</span>
              <h2 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter mb-8">
                O Protocolo <br />
                <span className="text-brand-cyan text-glow">DREH.</span>
              </h2>
              <p className="text-xl text-brand-gray max-w-md leading-relaxed font-light">
                Abandonamos o achismo. Nosso processo é um método validado de engenharia de conversão para entregar resultados previsíveis e altamente escaláveis.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Scrolling Steps */}
          <div className="relative h-[60vh] flex flex-col justify-center">
            {steps.map((step, index) => {
              const start = index / steps.length;
              const end = (index + 1) / steps.length;
              
              // Overlapping ranges to avoid "invisible" states
              const opacity = useTransform(smoothProgress, 
                [start - 0.1, start, end - 0.1, end], 
                [0, 1, 1, 0]
              );
              const y = useTransform(smoothProgress, 
                [start - 0.1, start, end - 0.1, end], 
                [100, 0, 0, -100]
              );
              const scale = useTransform(smoothProgress, 
                [start - 0.1, start, end - 0.1, end], 
                [0.8, 1, 1, 0.8]
              );

              return (
                <motion.div
                  key={index}
                  style={{ opacity, y, scale }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-6 mb-8">
                    <div className={`w-16 h-16 ${step.color} flex items-center justify-center text-2xl font-mono font-black shadow-2xl border border-white/10 ${index === 1 ? 'text-brand-navy-dark' : 'text-white'}`}>
                      {step.number}
                    </div>
                    <div className="h-[1px] flex-grow bg-brand-cyan/20 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-brand-cyan animate-pulse"></div>
                    </div>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none uppercase">{step.title}</h3>
                  <p className="text-lg md:text-xl text-brand-gray leading-relaxed max-w-lg font-mono tracking-tight">
                    {step.description}
                  </p>
                  
                  {/* Technical Metadata */}
                  <div className="mt-10 font-mono text-[8px] text-brand-cyan/30 tracking-[0.5em] uppercase">
                    PHASE_{step.number} // STATUS: OPTIMIZING_WORKFLOW
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
}
