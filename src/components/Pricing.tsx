import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Check } from 'lucide-react';

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const plans = [
    {
      name: "Validação",
      price: "Foco em Aquisição",
      description: "Desenvolvido para operações que precisam validar ofertas, tracionar campanhas e capturar leads com alta eficiência e baixo atrito.",
      features: ["Design Exclusivo", "Otimização Mobile", "Integração WhatsApp", "Hospedagem 1 Ano", "Suporte E-mail"],
      highlight: false
    },
    {
      name: "Escala",
      price: "Foco em Conversão",
      description: "Infraestrutura avançada de vendas para empresas que já possuem volume de tráfego e precisam maximizar sua margem de lucro e retenção.",
      features: ["Tudo do Start", "Copywriting Premium", "Integração CRM/E-mail", "Dashboard Analytics", "Suporte Prioritário", "Ajustes Ilimitados (15 dias)"],
      highlight: true
    },
    {
      name: "Sob Medida",
      price: "Foco em Engenharia",
      description: "Desenvolvimento de ecossistemas complexos, automações de processos e integrações de sistemas exclusivos para operações já consolidadas.",
      features: ["Múltiplas Páginas", "Funil de Vendas", "Testes A/B", "Gestão de Tráfego", "Consultoria Estratégica"],
      highlight: false
    }
  ];

  return (
    <section ref={sectionRef} id="escopos" className="py-24 md:py-32 bg-brand-navy-dark relative overflow-hidden">
      {/* Digital Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      {/* Background Parallax Elements */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), rotate: 45 }}
        className="absolute top-0 left-0 w-64 h-64 bg-brand-cyan/5 blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]), rotate: -45 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-brand-cyan/5 blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-brand-cyan font-mono text-xs mb-6 tracking-[0.4em] uppercase block">Escopo de Soluções</span>
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
              Modelos de <br />
              <span className="text-brand-cyan">Atuação.</span>
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-1 bg-brand-cyan rounded-full"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const start = 0.1 + (index * 0.1);
            const end = start + 0.3;
            
            const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
            const scale = useTransform(scrollYProgress, [start, end], [0.7, 1]);
            const rotate = useTransform(scrollYProgress, [start, end], [index === 0 ? -10 : index === 2 ? 10 : 0, 0]);
            const x = useTransform(scrollYProgress, [start, end], [index === 0 ? -50 : index === 2 ? 50 : 0, 0]);

            return (
              <motion.div
                key={index}
                style={{ opacity, scale, rotate, x }}
                className={`p-8 md:p-10 border transition-all relative group perspective-2000 flex flex-col h-full ${
                  plan.highlight 
                    ? 'bg-brand-cyan border-brand-cyan shadow-[0_30px_100px_rgba(0,209,255,0.1)] scale-105 z-20' 
                    : 'bg-brand-navy-dark/60 backdrop-blur-xl border-white/10 hover:border-brand-cyan/50 z-10'
                }`}
              >
                {/* Technical Brackets */}
                {!plan.highlight && (
                  <>
                    <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-brand-cyan/30"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-brand-cyan/30"></div>
                  </>
                )}

                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-navy-dark text-brand-cyan px-6 py-1 font-mono text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl border border-brand-cyan/30 whitespace-nowrap">
                    [ RECOMMENDED_PROTOCOL ]
                  </div>
                )}
                
                <h3 className={`text-3xl font-black mb-4 tracking-tighter uppercase leading-none ${plan.highlight ? 'text-brand-navy-dark' : 'text-white'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className={`text-3xl sm:text-5xl font-black tracking-tighter ${plan.highlight ? 'text-brand-navy-dark' : 'text-brand-cyan'}`}>
                    {plan.price}
                  </span>
                  {plan.price !== "Sob Consulta" && (
                    <span className={`font-mono text-[10px] uppercase tracking-widest ${plan.highlight ? 'text-brand-navy-dark/60' : 'text-brand-gray'}`}>/project</span>
                  )}
                </div>
                <p className={`mb-10 text-sm leading-relaxed font-mono ${plan.highlight ? 'text-brand-navy-dark/80' : 'text-brand-gray'}`}>
                  {plan.description}
                </p>
                
                <ul className="space-y-4 mb-12">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3">
                      <div className={`w-4 h-4 flex items-center justify-center border ${
                        plan.highlight ? 'bg-brand-navy-dark border-brand-navy-dark text-brand-cyan' : 'bg-brand-cyan/10 border-brand-cyan/20 text-brand-cyan'
                      }`}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span className={`font-mono text-[11px] tracking-tight uppercase ${plan.highlight ? 'text-brand-navy-dark' : 'text-white/80'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={`https://wa.me/5531999656778?text=${encodeURIComponent(`Olá, Andreh. Gostaria de agendar um diagnóstico com foco no escopo de ${plan.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 font-mono text-xs font-black tracking-[0.3em] uppercase transition-all relative overflow-hidden group/btn text-center block ${
                  plan.highlight 
                    ? 'bg-brand-navy-dark text-white shadow-2xl' 
                    : 'bg-transparent border border-brand-cyan/30 text-brand-cyan'
                }`}>
                  <span className="relative z-10 group-hover/btn:text-brand-navy-dark transition-colors duration-300">Agendar Diagnóstico</span>
                  {!plan.highlight && (
                    <div className="absolute inset-0 bg-brand-cyan translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
                  )}
                  {plan.highlight && (
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
                  )}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
