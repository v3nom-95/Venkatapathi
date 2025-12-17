import { useEffect, useRef } from 'react';
import { animate, stagger, utils } from 'animejs';
import { Terminal, Shield, Code2, ChevronDown } from 'lucide-react';
import { HackerScene } from './HackerScene';
import { MatrixRain } from './MatrixRain';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Animated background particles
    animate('.particle', {
      translateY: () => utils.random(-200, 200),
      translateX: () => utils.random(-200, 200),
      scale: () => utils.random(0.5, 1.5),
      opacity: [0, () => utils.random(0.3, 0.7)],
      duration: () => utils.random(3000, 5000),
      delay: () => utils.random(0, 2000),
      alternate: true,
      loop: true,
      ease: 'inOutSine',
    });

    // Name animation
    animate('.hero-name .letter', {
      translateY: [100, 0],
      opacity: [0, 1],
      rotateX: [-90, 0],
      duration: 1200,
      delay: stagger(80, { start: 800 }),
      ease: 'outExpo',
    });

    // Subtitle animation
    animate('.hero-subtitle', {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: 2000,
      ease: 'outExpo',
    });

    // Tags animation
    animate('.hero-tag', {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(150, { start: 2500 }),
      ease: 'outBack',
    });

    // Scroll indicator animation
    animate('.scroll-indicator', {
      translateY: [0, 10],
      opacity: [1, 0.3],
      duration: 1000,
      alternate: true,
      loop: true,
      ease: 'inOutSine',
    });

    // Hacker scene reveal
    animate('.hacker-scene', {
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 1500,
      delay: 1500,
      ease: 'outExpo',
    });
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="letter inline-block opacity-0" style={{ transformOrigin: '0 100%' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden scanline">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Animated background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left - Text content */}
          <div className="text-center lg:text-left">
            {/* Terminal prefix */}
            <div className="font-mono text-primary mb-4 opacity-0 hero-subtitle">
              <span className="text-muted-foreground">root@v3nom95:~$</span> ./portfolio.sh
            </div>

            {/* Main name with glitch effect */}
            <h1 className="hero-name text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="glitch text-foreground" data-text="Venkatapathi">
                {splitText('Venkatapathi')}
              </span>
              <br />
              <span className="text-gradient-cyber" ref={textRef}>
                {splitText('Babu')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-lg md:text-xl text-muted-foreground font-mono mb-8 opacity-0">
              <span className="text-primary">&lt;</span>
              Security Researcher / Web3 Builder / Developer
              <span className="text-primary">/&gt;</span>
            </p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              <div className="hero-tag opacity-0 flex items-center gap-2 px-4 py-2 bg-card/50 border border-neon-red/50 rounded-full backdrop-blur-sm">
                <Shield className="w-4 h-4 text-neon-red" />
                <span className="font-mono text-sm text-neon-red">Red Team</span>
              </div>
              <div className="hero-tag opacity-0 flex items-center gap-2 px-4 py-2 bg-card/50 border border-secondary/50 rounded-full backdrop-blur-sm">
                <Shield className="w-4 h-4 text-secondary" />
                <span className="font-mono text-sm text-secondary">Blue Team</span>
              </div>
              <div className="hero-tag opacity-0 flex items-center gap-2 px-4 py-2 bg-card/50 border border-neon-purple/50 rounded-full backdrop-blur-sm">
                <Terminal className="w-4 h-4 text-neon-purple" />
                <span className="font-mono text-sm text-neon-purple">Web3</span>
              </div>
              <div className="hero-tag opacity-0 flex items-center gap-2 px-4 py-2 bg-card/50 border border-primary/50 rounded-full backdrop-blur-sm">
                <Code2 className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm text-primary">Dev</span>
              </div>
            </div>

            {/* CTA */}
            <div className="hero-subtitle opacity-0 flex justify-center lg:justify-start gap-4">
              <button 
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-primary text-primary-foreground font-mono font-semibold rounded hover:glow-green transition-all duration-300"
              >
                View Projects
              </button>
              <button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 border border-primary text-primary font-mono font-semibold rounded hover:bg-primary/10 transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>

          {/* Right - Hacker Scene Animation */}
          <div className="hacker-scene opacity-0 hidden lg:block">
            <HackerScene />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </div>
    </section>
  );
};
