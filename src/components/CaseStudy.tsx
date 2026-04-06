import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Cpu, Zap, Activity, CheckCircle2 } from 'lucide-react';

export default function CaseStudy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const monitorRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Autonomous movement for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    let angle = 0;
    const interval = setInterval(() => {
      angle += 0.02;
      const x = 50 + Math.cos(angle) * 30;
      const y = 50 + Math.sin(angle * 0.8) * 30;
      setMousePos({ x, y });
    }, 16);
    
    return () => clearInterval(interval);
  }, [isMobile]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !monitorRef.current) return;
    const rect = monitorRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const kpis = [
    { label: "ENGINE", value: "React 19 / Vite 6", icon: <Cpu size={16} /> },
    { 
      label: "PERFORMANCE", 
      value: "Lighthouse Score", 
      icon: <Zap size={16} />,
      scores: [
        { n: 96, l: "Perf" },
        { n: 96, l: "Aces" },
        { n: 100, l: "Prat" },
        { n: 100, l: "SEO" }
      ]
    },
    { label: "STATUS", value: "Sistema Ativo / Em Produção", icon: <Activity size={16} /> }
  ];

  const timeline = [
    { id: "01", title: "FASE DE DISCOVERY", desc: "Imersão no modelo de negócio, análise profunda da marca e definição da estratégia arquitetural focada no nicho esportivo." },
    { id: "02", title: "PROTOTIPAGEM UI/UX", desc: "Mapeamento da jornada do usuário e criação de interfaces de alta fidelidade para validação visual do fluxo de conversão." },
    { id: "03", title: "ENGENHARIA DIGITAL", desc: "Desenvolvimento rigoroso focado em escalabilidade, otimização extrema de performance e integração de dados reais." },
    { id: "04", title: "DEPLOYMENT", desc: "Revisão de performance, aprovação executiva e lançamento oficial da infraestrutura em ambiente de produção." }
  ];

  return (
    <section 
      ref={sectionRef} 
      id="case-study"
      className="relative min-h-screen py-24 bg-brand-navy-dark overflow-hidden flex items-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Content */}
          <motion.div 
            style={{ opacity, scale }}
            className="order-2 lg:order-1 flex flex-col space-y-10"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-brand-cyan/50"></div>
                <span className="text-brand-cyan/50 font-mono text-[10px] tracking-[0.5em] uppercase">CASO DE SUCESSO 01</span>
              </div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-brand-cyan font-mono text-xs tracking-[0.4em] uppercase block"
              >
                Validação Prática
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none"
              >
                CASE: <br />
                <span className="text-brand-cyan text-glow">PROTOCOLO AMFTV</span>
              </motion.h2>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {kpis.map((kpi, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl group hover:border-brand-cyan/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-brand-cyan/60 mb-3 font-mono text-[10px] tracking-widest uppercase">
                    {kpi.icon}
                    {kpi.label}
                  </div>
                  <div className="text-white font-bold text-sm leading-tight">
                    {kpi.value}
                  </div>
                  {kpi.scores && (
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      {kpi.scores.map((s, si) => (
                        <div key={si} className="flex flex-col items-center">
                          <span className="text-brand-cyan text-[10px] font-black">{s.n}</span>
                          <span className="text-[8px] text-brand-gray uppercase font-mono">{s.l}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Timeline */}
            <div className="space-y-8 relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-brand-cyan/20"></div>
              {timeline.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex gap-6 relative"
                >
                  <div className="relative z-10 w-6 h-6 rounded-full bg-brand-navy-dark border-2 border-brand-cyan flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-black text-sm tracking-tight mb-1">
                      <span className="text-brand-cyan font-mono mr-2">{item.id}.</span>
                      {item.title}
                    </h4>
                    <p className="text-brand-gray text-xs font-mono leading-relaxed max-w-md">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 209, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="w-fit px-10 py-4 border border-brand-cyan text-brand-cyan font-black text-xs tracking-[0.3em] uppercase rounded-full hover:bg-brand-cyan hover:text-brand-navy-dark transition-all duration-300"
            >
              VER OUTROS ESCOPOS
            </motion.button>
          </motion.div>

          {/* Right Column: iMac Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 relative flex items-center justify-center lg:justify-end"
          >
            {/* iMac Mockup Container */}
            <div 
              ref={monitorRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="relative w-full max-w-[1200px] aspect-[16/13] cursor-none group"
            >
              {/* Imagem Base (Visível por padrão) */}
              <img 
                src="/assets/imac-mockup-frente.png" 
                alt="iMac Mockup Frente" 
                className="absolute inset-0 w-full h-full object-contain z-10"
                referrerPolicy="no-referrer"
              />

              {/* Imagem Oculta (Revelada no cursor) */}
              <motion.img 
                src="/assets/imac-mockup-tras.png" 
                alt="iMac Mockup Tras" 
                className="absolute inset-0 w-full h-full object-contain z-20"
                referrerPolicy="no-referrer"
                animate={{
                  clipPath: `circle(${isHovering || isMobile ? '200px' : '0px'} at ${mousePos.x}% ${mousePos.y}%)`
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 150, mass: 0.5 }}
              />

              {/* X-Ray Lens UI (Circle following cursor) */}
              <motion.div
                className="absolute z-30 pointer-events-none"
                animate={{
                  left: `${mousePos.x}%`,
                  top: `${mousePos.y}%`,
                  opacity: isHovering || isMobile ? 1 : 0,
                  scale: isHovering || isMobile ? 1 : 0.5
                }}
                style={{ x: '-50%', y: '-50%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 150, mass: 0.5 }}
              >
                <div className="w-[400px] h-[400px] border-2 border-brand-cyan rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,209,255,0.2)]">
                  <div className="absolute inset-0 border border-brand-cyan/30 rounded-full animate-ping"></div>
                  <div className="w-6 h-6 border border-brand-cyan rotate-45 flex items-center justify-center">
                    <div className="w-1 h-1 bg-brand-cyan rounded-full"></div>
                  </div>
                  {/* Lens Coordinates */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-10 bg-brand-navy-dark/90 px-3 py-1 rounded-full border border-brand-cyan/30 font-mono text-[10px] text-brand-cyan whitespace-nowrap shadow-xl">
                    SCAN_XRAY: {Math.round(mousePos.x)}% | {Math.round(mousePos.y)}%
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Ambient Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-cyan/5 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-cyan/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
