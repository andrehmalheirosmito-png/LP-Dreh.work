import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Target, MessageSquare, Mail, BarChart3, Smartphone, Zap, Rocket } from 'lucide-react';

export default function BentoGrid() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-68%"]);

  return (
    <section ref={targetRef} className="relative h-[200vh] md:h-[400vh] bg-brand-navy-dark">
      <div className="sticky top-0 h-[100dvh] flex items-center overflow-hidden z-10 will-change-transform">
        <div className="container mx-auto px-6 md:px-12 absolute top-10 md:top-20 left-0 right-0 z-20">
           <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <span className="text-brand-cyan font-mono text-xs tracking-[0.4em] uppercase mb-4">Engenharia Digital</span>
            <h2 className="text-3xl md:text-7xl font-black text-white tracking-tighter leading-none">
              Arquitetura focada <br />
              <span className="text-brand-cyan text-glow">em lucro.</span>
            </h2>
          </motion.div>
        </div>

        {/* Mobile: Swipeable Carousel | Desktop: Sticky Scroll */}
        <div className="md:hidden absolute inset-0 flex items-center overflow-x-auto snap-x snap-mandatory no-scrollbar pt-20">
          <div className="flex gap-6 px-6">
            {[
              {
                title: "EXPERIÊNCIA FLUIDA",
                subtitle: "FLUIDA",
                desc: "Sua marca impecável. Desenvolvemos interfaces com navegação imersiva, priorizando o mobile para garantir retenção absoluta do usuário.",
                icon: <Smartphone className="text-brand-cyan" size={32} />,
                tag: "MODULE_01 // RESPONSIVE_ENGINE",
                bg: "bg-brand-navy-dark/40 backdrop-blur-xl border-l border-brand-cyan/20"
              },
              {
                title: "DESIGN PERSUASIVO",
                subtitle: "PERSUASIVO",
                desc: "A união entre neurociência e design. Interfaces guiadas por dados que direcionam o usuário de forma lógica e irresistível até a conversão.",
                icon: <Target className="text-brand-cyan" size={32} />,
                tag: "[CONVERSION_RATE: OPTIMIZED]",
                bg: "bg-brand-cyan text-brand-navy-dark"
              },
              {
                title: "CÓDIGO DE ELITE",
                subtitle: "ELITE",
                desc: "Otimização extrema no front-end para máxima velocidade e indexação impecável nos motores de busca.",
                icon: <Rocket className="text-brand-navy-dark" size={32} />,
                tag: "SCORE 100 // LIGHTHOUSE_V10",
                bg: "bg-white text-brand-navy-dark"
              },
              {
                title: "INTEGRAÇÃO GLOBAL",
                subtitle: "GLOBAL",
                desc: "Ecossistema conectado. CRM, automações de marketing, WhatsApp e trackers de dados sincronizados para escalar suas vendas de forma inteligente.",
                icon: <Zap className="text-brand-cyan" size={32} />,
                tag: "MODULE_04 // GLOBAL_SYNC",
                bg: "bg-brand-navy border-r border-brand-cyan/20"
              }
            ].map((panel, i) => (
              <div 
                key={i}
                className={`min-w-[85vw] h-[60vh] p-10 flex flex-col justify-center relative overflow-hidden snap-center ${panel.bg}`}
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-8 flex items-center justify-center border border-current/20">
                    {panel.icon}
                  </div>
                  <h3 className="text-4xl font-black mb-6 tracking-tighter leading-[0.9] uppercase">
                    {panel.title}
                  </h3>
                  <p className="text-sm font-mono leading-relaxed opacity-80">
                    {panel.desc}
                  </p>
                </div>
                <div className="absolute bottom-6 right-6 font-mono text-[8px] opacity-30 tracking-[0.3em] uppercase">
                  {panel.tag}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Only: Horizontal Scroll */}
        <motion.div style={{ x }} className="hidden md:flex gap-12 px-12 pt-40">
          {/* Panel 1: Design Responsivo */}
          <motion.div 
            whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
            className="min-w-[700px] h-[65vh] bg-brand-navy-dark/40 backdrop-blur-xl p-20 relative overflow-hidden group shadow-2xl flex flex-col justify-center border-l border-brand-cyan/20 perspective-2000"
          >
            {/* Technical Brackets */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-brand-cyan/30"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-brand-cyan/30"></div>
            
            <div className="relative z-10 max-w-xl">
              <div className="relative w-20 h-20 mb-10 group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 border border-brand-cyan/20 rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Smartphone className="text-brand-cyan" size={32} />
                </div>
              </div>
              <h3 className="text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9] group-hover:text-brand-cyan transition-colors">
                EXPERIÊNCIA <br />
                <span className="opacity-50">FLUIDA</span>
              </h3>
              <p className="text-xl text-brand-gray leading-relaxed font-mono tracking-tight group-hover:text-white transition-colors max-w-md">
                Sua marca impecável. Desenvolvemos interfaces com navegação imersiva, priorizando o mobile para garantir retenção absoluta do usuário.
              </p>
            </div>
            
            {/* Data Overlay */}
            <div className="absolute top-6 right-6 font-mono text-[8px] text-brand-cyan/20 tracking-[0.5em] vertical-text">
              MODULE_01 // RESPONSIVE_ENGINE
            </div>
          </motion.div>

          {/* Panel 2: Foco em Conversão */}
          <motion.div 
            whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
            className="min-w-[500px] h-[65vh] bg-brand-cyan p-16 flex flex-col justify-between group shadow-2xl relative overflow-hidden perspective-2000"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
            
            <div className="relative w-24 h-24 bg-brand-navy-dark flex items-center justify-center shadow-2xl">
              <div className="absolute -inset-2 border border-brand-navy-dark/20 animate-spin-slow"></div>
              <Target className="text-brand-cyan" size={40} />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-5xl font-black text-brand-navy-dark mb-6 tracking-tighter uppercase leading-[0.9]">
                DESIGN <br />
                PERSUASIVO
              </h3>
              <p className="text-brand-navy-dark/80 font-bold text-xl leading-snug font-mono">
                A união entre neurociência e design. Interfaces guiadas por dados que direcionam o usuário de forma lógica e irresistível até a conversão.
              </p>
            </div>
            
            <div className="absolute bottom-6 right-6 font-mono text-[10px] text-brand-navy-dark/40">
              [CONVERSION_RATE: OPTIMIZED]
            </div>
          </motion.div>

          {/* Panel 3: Velocidade */}
          <motion.div 
            whileHover={{ y: -10, rotateX: -2, rotateY: -2 }}
            className="min-w-[500px] h-[65vh] bg-white p-16 shadow-2xl flex flex-col justify-between relative overflow-hidden perspective-2000"
          >
            <div className="w-24 h-24 bg-brand-ice flex items-center justify-center border border-gray-200 relative">
               <div className="absolute inset-0 bg-brand-cyan/5 animate-pulse"></div>
               <Rocket className="text-brand-navy-dark relative z-10" size={40} />
            </div>
            
            <div>
              <h3 className="text-5xl font-black text-brand-navy-dark mb-4 tracking-tighter leading-[0.9] uppercase">
                CÓDIGO DE <br />
                ELITE
              </h3>
              <p className="text-brand-gray text-xl leading-relaxed font-mono">Otimização extrema no front-end para máxima velocidade e indexação impecável nos motores de busca.</p>
            </div>
            
            <div className="mt-8 flex items-baseline gap-4">
              <span className="text-9xl font-black text-brand-navy-dark tracking-tighter leading-none">100</span>
              <div className="flex flex-col font-mono">
                <span className="text-brand-cyan font-black text-xl uppercase tracking-widest">Score</span>
                <span className="text-gray-400 text-xs">LIGHTHOUSE_V10</span>
              </div>
            </div>
          </motion.div>

          {/* Panel 4: Integrações */}
          <motion.div 
            whileHover={{ y: -10, rotateX: -2, rotateY: 2 }}
            className="min-w-[700px] h-[65vh] bg-brand-navy p-20 flex flex-col justify-center shadow-2xl border-r border-brand-cyan/20 relative overflow-hidden perspective-2000"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="max-w-xl mb-12 relative z-10">
              <h3 className="text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9] uppercase">
                INTEGRAÇÃO <br />
                <span className="text-brand-cyan">GLOBAL</span>
              </h3>
              <p className="text-xl text-brand-gray leading-relaxed font-mono tracking-tight">
                Ecossistema conectado. CRM, automações de marketing, WhatsApp e trackers de dados sincronizados para escalar suas vendas de forma inteligente.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 relative z-10">
              {[MessageSquare, Mail, BarChart3, Zap].map((Icon, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.1, rotate: 5, borderColor: '#00d1ff' }}
                  className="w-20 h-20 bg-brand-navy-dark/80 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-brand-cyan" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
