import { useEffect, useRef, useState, useCallback } from 'react';
import { animate, stagger } from 'animejs';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once && hasAnimated.current) return;
          setIsVisible(true);
          hasAnimated.current = true;
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
};

export const useParallax = () => {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setOffset(Math.min(Math.max(scrollProgress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, offset };
};

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      setProgress(scrollTop / scrollHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

export const animateOnScroll = (
  selector: string,
  animation: Parameters<typeof animate>[1],
  delay: number = 0
) => {
  animate(selector, {
    ...animation,
    delay: typeof animation.delay === 'function' ? animation.delay : delay,
  });
};

export const staggeredReveal = (selector: string, direction: 'up' | 'down' | 'left' | 'right' = 'up') => {
  const transforms = {
    up: { translateY: [60, 0] },
    down: { translateY: [-60, 0] },
    left: { translateX: [60, 0] },
    right: { translateX: [-60, 0] },
  };

  animate(selector, {
    ...transforms[direction],
    opacity: [0, 1],
    duration: 1000,
    delay: stagger(100),
    ease: 'outExpo',
  });
};
