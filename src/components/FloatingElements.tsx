import { useEffect, useRef } from 'react';
import { animate, utils } from 'animejs';

interface FloatingElementsProps {
  count?: number;
  type?: 'particles' | 'code' | 'hexagons' | 'data';
  color?: 'primary' | 'secondary' | 'neon-red' | 'neon-purple';
}

export const FloatingElements = ({ count = 15, type = 'particles', color = 'primary' }: FloatingElementsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.floating-element');
    
    elements.forEach((el, i) => {
      const randomDuration = utils.random(8000, 15000);
      const randomDelay = utils.random(0, 5000);
      
      animate(el, {
        translateY: () => [utils.random(-100, 100), utils.random(-100, 100)],
        translateX: () => [utils.random(-50, 50), utils.random(-50, 50)],
        rotate: () => [utils.random(-180, 180), utils.random(-180, 180)],
        scale: () => [utils.random(0.5, 1), utils.random(0.8, 1.2)],
        opacity: [0.1, utils.random(0.3, 0.7), 0.1],
        duration: randomDuration,
        delay: randomDelay,
        loop: true,
        ease: 'inOutSine',
      });
    });
  }, []);

  const getColorClass = () => {
    switch (color) {
      case 'secondary': return 'text-secondary border-secondary/30';
      case 'neon-red': return 'text-neon-red border-neon-red/30';
      case 'neon-purple': return 'text-neon-purple border-neon-purple/30';
      default: return 'text-primary border-primary/30';
    }
  };

  const renderElement = (index: number) => {
    const left = `${Math.random() * 100}%`;
    const top = `${Math.random() * 100}%`;
    const baseStyle = { left, top, opacity: 0 };

    switch (type) {
      case 'code':
        const codeSnippets = ['{ }', '< />', '( )', '[ ]', '&&', '||', '=>', '::'];
        return (
          <span
            key={index}
            className={`floating-element absolute font-mono text-xs ${getColorClass()} opacity-0`}
            style={baseStyle}
          >
            {codeSnippets[index % codeSnippets.length]}
          </span>
        );
      case 'hexagons':
        return (
          <svg
            key={index}
            className={`floating-element absolute w-8 h-8 ${getColorClass()} opacity-0`}
            style={baseStyle}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M12 2L21.5 7V17L12 22L2.5 17V7L12 2Z" />
          </svg>
        );
      case 'data':
        const dataSymbols = ['01', '10', '11', '00', '⟨⟩', '⧫', '◈', '⬡'];
        return (
          <span
            key={index}
            className={`floating-element absolute font-mono text-[10px] ${getColorClass()} opacity-0`}
            style={baseStyle}
          >
            {dataSymbols[index % dataSymbols.length]}
          </span>
        );
      default:
        return (
          <div
            key={index}
            className={`floating-element absolute w-1 h-1 rounded-full bg-current ${getColorClass()} opacity-0`}
            style={baseStyle}
          />
        );
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => renderElement(i))}
    </div>
  );
};
