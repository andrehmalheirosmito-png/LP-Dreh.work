import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

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
    <section ref={containerRef} id="servicos" className="relative h-auto lg:h-[400vh] bg-brand-navy-dark">
      {/* Mobile View: Vertical Stack */}
      <div className="lg:hidden py-20 px-6 space-y-20">
        {features.map((feature, index) => (
          <div key={index} className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="text-6xl font-black text-brand-cyan/10 leading-none font-mono">0{index + 1}</span>
              <div className="h-px flex-grow bg-brand-cyan/20"></div>
            </div>
            <h3 className="text-4xl font-black text-white tracking-tighter leading-none">
              {feature.title}
            </h3>
            <p className="text-lg text-brand-gray leading-relaxed font-light">
              {feature.description}
            </p>
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10">
              <img 
                src={feature.image} 
                alt={feature.title} 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/80 to-transparent"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Sticky Reveal */}
      <div className="hidden lg:block sticky top-0 h-[100dvh] flex items-center overflow-hidden z-10 will-change-transform">
        <div className="container mx-auto px-12 grid grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Text Reveal */}
          <div className="relative h-[60vh] flex flex-col justify-center">
            {features.map((feature, index) => {
              const start = index / features.length;
              const end = (index + 1) / features.length;
              
              // Overlapping ranges for continuous animation
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
                    <span className="text-8xl font-black text-brand-cyan/10 leading-none font-mono glitch-text" data-text={`0${index + 1}`}>0{index + 1}</span>
                    <div className="h-px flex-grow bg-brand-cyan/20 shadow-[0_0_10px_rgba(0,209,255,0.3)]"></div>
                  </div>
                  <h3 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                    {feature.title.split(' ').map((word, i) => (
                      <span key={i} className={i === 1 ? 'text-brand-cyan text-glow' : ''}>{word} </span>
                    ))}
                  </h3>
                  <p className="text-xl md:text-3xl text-brand-gray leading-relaxed max-w-lg font-light">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side: Image Reveal */}
          <div className="relative h-[60vh] perspective-2000">
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
                    {/* Scanning Line */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-cyan/10 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-[scan_2s_linear_infinite] pointer-events-none z-20"></div>
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
