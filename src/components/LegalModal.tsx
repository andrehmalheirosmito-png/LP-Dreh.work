import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export default function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-navy-dark/90 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[80vh] bg-brand-navy-dark border border-brand-cyan/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,209,255,0.1)] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-brand-navy-dark/50 backdrop-blur-xl sticky top-0 z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-brand-cyan"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar text-brand-gray font-mono text-sm leading-relaxed">
              {content}
            </div>

            {/* Footer Accent */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent opacity-30"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export const PrivacyPolicyContent = () => (
  <div className="space-y-8">
    <section>
      <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-base">1. Coleta de Dados Estratégica</h3>
      <p>
        Na DREH.WORK, a privacidade não é apenas uma obrigação legal, é um pilar de integridade digital. Coletamos apenas os dados estritamente necessários para a otimização da sua experiência e o sucesso da sua operação de vendas. Isso inclui informações fornecidas via formulários de contato e dados de navegação anônimos para análise de performance.
      </p>
    </section>
    <section>
      <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-base">2. Finalidade e Escala</h3>
      <div className="space-y-4">
        <p>Seus dados são utilizados exclusivamente para:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Personalização do diagnóstico de infraestrutura de vendas;</li>
          <li>Comunicação direta sobre o Protocolo DREH;</li>
          <li>Melhoria contínua da arquitetura de conversão do nosso ecossistema.</li>
        </ul>
      </div>
    </section>
    <section>
      <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-base">3. Segurança de Elite</h3>
      <p>
        Implementamos protocolos de criptografia e segurança de dados de nível corporativo. Suas informações são tratadas como ativos críticos e nunca são compartilhadas, vendidas ou expostas a terceiros sem consentimento explícito, seguindo rigorosamente a LGPD.
      </p>
    </section>
    <section>
      <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-base">4. Seus Direitos</h3>
      <p>
        Você detém controle total sobre seus dados. A qualquer momento, pode solicitar o acesso, retificação ou exclusão definitiva de suas informações de nossas bases de dados através dos nossos canais de contato oficial.
      </p>
    </section>
  </div>
);

export const TermsOfServiceContent = () => (
  <div className="space-y-8">
    <section>
      <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-base">1. Aceitação do Protocolo</h3>
      <p>
        Ao acessar e utilizar a plataforma DREH.WORK, você concorda em cumprir estes Termos de Serviço. Nossa metodologia é focada em resultados de alta performance e exige o comprometimento mútuo com a excelência digital.
      </p>
    </section>
    <section>
      <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-base">2. Propriedade Intelectual</h3>
      <p>
        Todo o conteúdo, design, código e estratégias apresentadas neste site são de propriedade exclusiva da DREH.WORK. A reprodução, cópia ou utilização não autorizada de nossa arquitetura visual ou metodológica constitui violação de direitos autorais e será tratada conforme a legislação vigente.
      </p>
    </section>
    <section>
      <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-base">3. Escopo de Entrega</h3>
      <p>
        A DREH.WORK se compromete a entregar infraestruturas de vendas conforme os escopos acordados (Validação, Escala ou Sob Medida). Resultados específicos de faturamento dependem de variáveis externas como mercado, produto e investimento em tráfego, embora nossa engenharia seja projetada para maximizar todas as chances de conversão.
      </p>
    </section>
    <section>
      <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-base">4. Limitação de Responsabilidade</h3>
      <p>
        Não nos responsabilizamos por interrupções de serviços de terceiros (hospedagem, APIs externas ou plataformas de anúncios) que possam impactar temporariamente a operação, embora ofereçamos suporte prioritário para mitigação de riscos.
      </p>
    </section>
  </div>
);
