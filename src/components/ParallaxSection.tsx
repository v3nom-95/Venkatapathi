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
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const ScrollReveal = ({ children, direction = 'up', delay = 0, className = '' }: ScrollRevealProps) => {
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
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    switch (direction) {
      case 'down': return 'translate-y-[-50px]';
      case 'left': return 'translate-x-[50px]';
      case 'right': return 'translate-x-[-50px]';
      default: return 'translate-y-[50px]';
    }
  };

  return (
    <div
      ref={ref}
      className={`opacity-0 ${getTransform()} transition-all duration-1000 ease-out [&.revealed]:opacity-100 [&.revealed]:translate-x-0 [&.revealed]:translate-y-0 ${className}`}
    >
      {children}
    </div>
  );
};
