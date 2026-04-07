import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';

/**
 * Efeito 1: Surgimento em Cascata com Sublinhado Animado
 * Letra por letra, surgindo de baixo para cima.
 * Linha expande do centro após exibição.
 */
export const TextCascade = ({ text, className }: { text: string; className?: string }) => {
  const letters = text.split("");
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <div className="relative inline-block">
      <motion.div
        className={className}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {letters.map((letter, index) => (
          <motion.span key={index} variants={child} className="inline-block">
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: letters.length * 0.03 + 0.5, duration: 0.8, ease: "circOut" }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-brand-cyan origin-center"
      />
    </div>
  );
};

/**
 * Efeito 2: Gradiente em Movimento com Destaque Interativo
 */
export const TextGradient = ({ text, className }: { text, className?: string }) => {
  return (
    <motion.span
      className={`${className} bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan via-white to-brand-cyan bg-[length:200%_auto] animate-gradient-x md:hover:drop-shadow-[0_0_15px_rgba(0,209,255,0.5)] transition-all duration-500 cursor-default`}
      style={{
        backgroundImage: 'linear-gradient(90deg, #00D1FF 0%, #FFFFFF 50%, #00D1FF 100%)',
        backgroundSize: '200% auto',
      }}
      animate={{
        backgroundPosition: ['0% center', '200% center'],
        filter: ['drop-shadow(0 0 0px rgba(0,209,255,0))', 'drop-shadow(0 0 8px rgba(0,209,255,0.3))', 'drop-shadow(0 0 0px rgba(0,209,255,0))']
      }}
      transition={{
        backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" },
        filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      {text}
    </motion.span>
  );
};

/**
 * Efeito 3: Surgimento Sequencial Direcional (Ativado por Rolagem)
 */
export const TextScrollReveal = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ");
  
  return (
    <div className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, x: -10 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            delay: i * 0.1,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

/**
 * Efeito 4: Desembaralhamento de Texto (Efeito Decodificação)
 */
export const TextDecoding = ({ text, className }: { text, className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const isMobile = window.innerWidth < 768;
    let iteration = 0;
    const speed = isMobile ? 50 : 30; // Slower on mobile for performance
    const increment = isMobile ? 1/2 : 1/3;

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += increment;
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <span ref={ref} className={`${className} font-mono break-all md:break-normal`}>
      {displayText}
    </span>
  );
};

/**
 * Efeito 5: Revelação Gradual por Rolagem (Texto Fixo)
 */
export const TextScrollFixed = ({ text, className }: { text, className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.1"]
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`${className} relative min-h-[30vh] md:min-h-[50vh] flex items-center justify-center py-10 md:py-20`}>
      <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-3 gap-y-1 md:gap-y-2">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
          
          return (
            <motion.span key={i} style={{ opacity }} className="inline-block">
              {word}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Efeito 6: Apresentação Ritmada Multi-Estilo (Configurado para Blur + Word)
 */
export const TextRhythmic = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ");
  
  return (
    <div className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: "easeOut"
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

/**
 * Efeito 6 (Variante): Apresentação Ritmada por Linha (Fade)
 */
export const TextLineFade = ({ text, className }: { text: string; className?: string }) => {
  const lines = text.split(". "); // Simple split by sentence/line for demo, or use a better heuristic
  
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: i * 0.2,
            ease: "easeOut"
          }}
          className="block mb-2"
        >
          {line}{i < lines.length - 1 ? "." : ""}
        </motion.span>
      ))}
    </div>
  );
};
export const TextBinary = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return Math.random() > 0.5 ? "0" : "1";
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 50);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <span ref={ref} className={`${className} font-mono text-[#00FF41] drop-shadow-[0_0_5px_#00FF41]`}>
      {displayText}
    </span>
  );
};
