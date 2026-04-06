import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const faqs = [
    {
      question: "Qual é o tempo médio de implementação do projeto?",
      answer: "Nossos protocolos de desenvolvimento levam de 7 a 15 dias úteis, variando diretamente conforme o nível de complexidade arquitetural da sua operação e o fluxo de aprovações."
    },
    {
      question: "A estruturação dos textos e copy já está inclusa?",
      answer: "Sim. Não exigimos que você nos entregue o texto pronto. Nossa equipe desenvolve a narrativa persuasiva completa, alinhada aos seus objetivos comerciais e focada em vendas."
    },
    {
      question: "Como funciona o suporte após o lançamento da estrutura?",
      answer: "Nós garantimos a estabilidade do que construímos. Todo escopo inclui um período de suporte técnico pós-lançamento para ajustes finos, garantindo que sua infraestrutura rode com máxima performance."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={sectionRef} id="faq" className="py-32 bg-brand-navy-dark relative overflow-hidden">
      {/* Digital Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      {/* Parallax Background Text */}
      <motion.div 
        style={{ x }}
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-brand-cyan/[0.02] whitespace-nowrap pointer-events-none select-none font-mono"
      >
        QUESTIONS ANSWERS SUPPORT HELP
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <span className="text-brand-cyan font-mono text-xs mb-6 tracking-[0.4em] uppercase block">Base de Conhecimento</span>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
            Perguntas <br />
            <span className="text-brand-cyan text-glow">Frequentes.</span>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-1 bg-brand-cyan mx-auto rounded-full shadow-[0_0_10px_rgba(0,209,255,0.8)]"
          />
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border border-white/10 rounded-[2rem] overflow-hidden bg-brand-navy-dark/40 backdrop-blur-xl hover:border-brand-cyan/30 transition-all group relative"
            >
              {/* Scanning Line */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-cyan/5 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-[scan_3s_linear_infinite] pointer-events-none"></div>

              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-8 text-left focus:outline-none group relative z-10"
              >
                <span className="text-xl font-black text-white group-hover:text-brand-cyan transition-colors tracking-tight">{faq.question}</span>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border ${openIndex === index ? 'bg-brand-cyan border-brand-cyan rotate-180' : 'bg-white/5 border-white/10'}`}>
                  <ChevronDown 
                    className={`w-6 h-6 transition-colors ${openIndex === index ? 'text-brand-navy-dark' : 'text-brand-cyan'}`} 
                  />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10"
                  >
                    <div className="px-8 pb-8 text-brand-gray leading-relaxed text-lg font-light border-t border-white/5 pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
