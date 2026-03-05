import { useEffect, useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxSection = ({ children, speed = 0.5, className = '' }: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = -rect.top * speed;
      ref.current.style.transform = `translateY(${scrollProgress}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
  threshold?: number;
}

export const ScrollReveal = ({ children, direction = 'up', delay = 0, className = '', threshold = 0.05 }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          setTimeout(() => {
            ref.current?.classList.add('revealed');
          }, delay);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={`opacity-0 transition-all duration-1000 ease-out 
        ${direction === 'up' ? 'translate-y-[40px]' :
          direction === 'down' ? 'translate-y-[-40px]' :
            direction === 'left' ? 'md:translate-x-[40px] translate-y-[20px]' :
              direction === 'right' ? 'md:translate-x-[-40px] translate-y-[20px]' : 'translate-y-[40px]'}
        [&.revealed]:opacity-100 [&.revealed]:translate-x-0 [&.revealed]:translate-y-0 ${className}`}
    >
      {children}
    </div>
  );
};
