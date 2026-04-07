import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Zap, Target, BarChart3 } from 'lucide-react';
import { TextScrollReveal, TextBinary } from './animations/TextAnimations';

export default function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  const x1 = useTransform(smoothProgress, [0, 1], [-200, 200]);
  const x2 = useTransform(smoothProgress, [0, 1], [200, -200]);

  return (
    <section ref={containerRef} id="solucoes" className="py-24 md:py-32 bg-brand-navy-dark relative overflow-hidden">
      {/* Digital Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      {/* Parallax Background Text */}
      <motion.div 
        style={{ x: x1 }}
        className="absolute top-10 left-0 text-[15vw] font-black text-brand-cyan/[0.03] whitespace-nowrap pointer-events-none select-none font-mono"
      >
        PERFORMANCE VELOCIDADE CONVERSÃO ESTRATÉGIA ESCALA
      </motion.div>
      <motion.div 
        style={{ x: x2 }}
        className="absolute bottom-10 right-0 text-[15vw] font-black text-brand-cyan/[0.03] whitespace-nowrap pointer-events-none select-none font-mono"
      >
        PERFORMANCE VELOCIDADE CONVERSÃO ESTRATÉGIA ESCALA
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-20 md:mb-24"
        >
          <span className="text-brand-cyan font-mono text-xs mb-6 tracking-[0.4em] uppercase block">Diagnóstico de Falhas</span>
          <TextScrollReveal 
            text="Por que sua operação digital está perdendo dinheiro?" 
            className="text-3xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none"
          />
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 160 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-1 bg-brand-cyan mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "LENTIDÃO FATAL",
              desc: "Segundos de atraso no carregamento destroem seu ROI. O mercado premium não espera por uma infraestrutura amadora.",
              icon: <Zap className="text-brand-cyan" size={32} />,
              tag: "CORE_PERF"
            },
            {
              title: "INTERFACE GENÉRICA",
              desc: "Templates prontos transmitem desconfiança imediata. Se o seu posicionamento visual não for premium, seu preço também não será.",
              icon: <Target className="text-brand-cyan" size={32} />,
              tag: "UI_INTEGRITY"
            },
            {
              title: "TRÁFEGO DESPERDIÇADO",
              desc: "Atrair cliques não gera caixa. Sem uma arquitetura persuasiva que conduza a venda, seu investimento em anúncios é dinheiro jogado fora.",
              icon: <BarChart3 className="text-brand-cyan" size={32} />,
              tag: "ROI_ENGINE"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative bg-brand-navy-dark/40 backdrop-blur-xl p-10 border-l border-brand-cyan/20 overflow-hidden min-h-[350px] flex flex-col justify-center"
            >
              {/* Technical Accents */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-brand-cyan/5 -rotate-45 translate-x-8 -translate-y-8"></div>
              <div className="absolute top-4 right-4 font-mono text-[8px] text-brand-cyan/30 tracking-widest">
                <TextBinary text={item.tag} />
              </div>
              
              <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
                <div className="absolute inset-0 border border-brand-cyan/20 group-hover:rotate-90 transition-transform duration-500"></div>
                {item.icon}
              </div>
              
              <h3 className="text-3xl font-black text-white mb-4 tracking-tighter group-hover:text-brand-cyan transition-colors leading-tight">
                {item.title}
              </h3>
              <p className="text-brand-gray font-mono text-sm leading-relaxed group-hover:text-white transition-colors">
                {item.desc}
              </p>
              
              {/* Bottom Bar */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-brand-cyan/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
