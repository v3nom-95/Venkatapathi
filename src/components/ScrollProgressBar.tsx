import { useEffect, useState } from 'react';
import { animate } from 'animejs';

export const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const newProgress = (scrollTop / scrollHeight) * 100;
      setProgress(newProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted/30">
      <div
        className="h-full bg-gradient-to-r from-primary via-secondary to-neon-purple transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
      <div
        className="absolute top-0 h-full w-4 bg-white/50 blur-sm transition-all duration-150"
        style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
      />
    </div>
  );
};
