import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { TextRhythmic } from './animations/TextAnimations';

export default function Features() {
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

  const features = [
    {
      title: "Copywriting Estratégico",
      description: "Textos que não apenas informam, mas convertem. Criamos narrativas persuasivas que anulam objeções e tornam sua oferta a única escolha lógica para o cliente.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2573&auto=format&fit=crop",
      color: "from-brand-cyan/20 to-transparent"
    },
    {
      title: "Posicionamento Premium",
      description: "Elevamos a percepção de valor do seu negócio através de uma estética sofisticada que transmite autoridade instantânea e destrói a concorrência visual.",
      image: "https://images.unsplash.com/photo-1561070791-26c145824a4d?q=80&w=2564&auto=format&fit=crop",
      color: "from-blue-500/20 to-transparent"
    },
    {
      title: "Infraestrutura Invisível",
      description: "O design atrai, a tecnologia sustenta. Código limpo, seguro e estruturado para garantir que a jornada de compra nunca sofra atritos ou interrupções.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
      color: "from-purple-500/20 to-transparent"
    }
  ];

  return (
    <section ref={containerRef} id="servicos" className="relative lg:h-[400vh] h-auto bg-brand-navy-dark">
      
      {/* Desktop Version: Sticky Reveal Animation */}
      <div className="hidden lg:block sticky top-0 h-[100dvh] overflow-hidden z-10 will-change-transform">
        <div className="container mx-auto px-6 md:px-12 h-full flex items-center justify-center">
          <div className="grid grid-cols-2 gap-24 items-center w-full py-32">
            
            {/* Left Side: Text Reveal */}
            <div className="relative h-[65vh] flex flex-col justify-center">
            {features.map((feature, index) => {
              const start = index / features.length;
              const end = (index + 1) / features.length;
              
              const opacity = useTransform(smoothProgress, 
                [start - 0.1, start, end - 0.1, end], 
                [0, 1, 1, 0]
              );
              const y = useTransform(smoothProgress, 
                [start - 0.1, start, end - 0.1, end], 
                [100, 0, 0, -100]
              );

              return (
                <motion.div
                  key={index}
                  style={{ opacity, y }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-6 mb-8">
                    <span className="text-8xl font-black text-brand-cyan/10 leading-none font-mono">0{index + 1}</span>
                    <div className="h-px flex-grow bg-brand-cyan/20"></div>
                  </div>
                  <TextRhythmic 
                    text={feature.title} 
                    className="text-8xl font-black text-white mb-8 tracking-tighter leading-none"
                  />
                  <p className="text-3xl text-brand-gray leading-relaxed max-w-lg font-light">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side: Image Reveal */}
          <div className="relative h-[65vh] perspective-2000">
            {features.map((feature, index) => {
              const start = index / features.length;
              const end = (index + 1) / features.length;
              
              const opacity = useTransform(smoothProgress, 
                [start - 0.1, start, end - 0.1, end], 
                [0, 1, 1, 0]
              );
              const scale = useTransform(smoothProgress, 
                [start - 0.1, start, end - 0.1, end], 
                [0.8, 1, 1, 1.2]
              );
              const rotate = useTransform(smoothProgress, 
                [start - 0.1, start, end - 0.1, end], 
                [10, 0, 0, -10]
              );

              return (
                <motion.div
                  key={index}
                  style={{ opacity, scale, rotateY: rotate }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative w-full h-full bg-brand-navy-dark/40 backdrop-blur-xl rounded-[4rem] border border-white/10 overflow-hidden group shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy-dark/80 to-transparent z-10"></div>
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-cyan/10 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-[scan_2s_linear_infinite] pointer-events-none z-20"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>

    {/* Mobile Version: Standard Vertical List */}
      <div className="lg:hidden container mx-auto px-6 py-32 flex flex-col gap-32">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-10"
          >
            <div className="flex items-center gap-4">
              <span className="text-5xl font-black text-brand-cyan/20 leading-none font-mono">0{index + 1}</span>
              <div className="h-px flex-grow bg-brand-cyan/10"></div>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tighter leading-none text-left">
              {feature.title}
            </h3>
            
            <p className="text-lg text-brand-gray leading-relaxed font-light text-left">
              {feature.description}
            </p>
            
            <div className="relative aspect-[4/5] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/90 via-transparent to-transparent z-10"></div>
              <img 
                src={feature.image} 
                alt={feature.title} 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="font-mono text-[10px] text-brand-cyan/50 tracking-[0.5em] uppercase">
                  PHASE_0{index + 1} // STATUS: ACTIVE
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
