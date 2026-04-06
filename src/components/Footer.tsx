import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#01111f] py-12 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-center md:text-left">
            <a href="#" className="text-white font-bold text-xl tracking-tighter block mb-2">
              dreh<span className="text-brand-cyan">.work</span>
            </a>
            <p className="text-gray-500 text-sm">
              Engenharia de conversão e design premium para empresas que não aceitam a média.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-brand-cyan transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-brand-cyan transition-colors">Termos de Serviço</a>
            <a href="#" className="hover:text-brand-cyan transition-colors">Contato Corporativo</a>
          </div>

          <div className="text-gray-500 text-sm text-center md:text-right">
            © {new Date().getFullYear()} dreh.work. Todos os direitos reservados.
          </div>

        </div>
      </div>
    </footer>
  );
}
