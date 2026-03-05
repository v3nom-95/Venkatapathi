import { useEffect, useRef, useState, Suspense } from 'react';
import { animate, stagger, utils } from 'animejs';
import { Terminal, Brain, Code2, ChevronDown, Boxes } from 'lucide-react';
import { HackerScene } from './HackerScene';
import { MatrixRain } from './MatrixRain';
import { FloatingElements } from './FloatingElements';
import { CyberGlobe3D } from './CyberGlobe3D';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Animated background particles with reactive movement
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

    // Name animation with 3D effect
    animate('.hero-name .letter', {
      translateY: [100, 0],
      translateZ: [50, 0],
      opacity: [0, 1],
      rotateX: [-90, 0],
      duration: 1200,
      delay: stagger(window.innerWidth < 768 ? 40 : 80, { start: window.innerWidth < 768 ? 400 : 800 }),
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

    // Tags animation with bounce
    animate('.hero-tag', {
      scale: [0, 1.1, 1],
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: stagger(150, { start: 2500 }),
      ease: 'outBack',
    });

    // Scroll indicator animation
    animate('.scroll-indicator', {
      translateY: [0, 15, 0],
      opacity: [1, 0.3, 1],
      duration: 1500,
      loop: true,
      ease: 'inOutSine',
    });

    // Hacker scene reveal with parallax
    animate('.hacker-scene', {
      scale: [0.8, 1],
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 1500,
      delay: 1500,
      ease: 'outExpo',
    });

    // Glow orbs pulsing
    animate('.glow-orb', {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      duration: 3000,
      delay: stagger(500),
      loop: true,
      ease: 'inOutSine',
    });

    // Cyber lines animation
    animate('.cyber-line', {
      scaleX: [0, 1],
      opacity: [0, 1],
      duration: 1000,
      delay: stagger(200, { start: 500 }),
      ease: 'outExpo',
    });
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="letter inline-block opacity-0" style={{ transformOrigin: '0 100%', transformStyle: 'preserve-3d' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen lg:h-screen flex items-center lg:justify-center overflow-hidden scanline pt-32 pb-12 lg:py-0 scroll-mt-20"
    >
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Floating code elements */}
      <FloatingElements count={20} type="code" color="primary" />
      <FloatingElements count={15} type="data" color="secondary" />

      {/* Animated background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />

      {/* Animated cyber lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="cyber-line absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="cyber-line absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        <div className="cyber-line absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent" />
        <div className="cyber-line absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-red/20 to-transparent" />
      </div>

      {/* Floating particles with mouse parallax */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-200 ease-out"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      >
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: i % 3 === 0 ? 'hsl(142 100% 50%)' : i % 3 === 1 ? 'hsl(188 100% 50%)' : 'hsl(270 100% 60%)',
            }}
          />
        ))}
      </div>

      {/* Glow effects with parallax */}
      <div
        className="glow-orb absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px] transition-transform duration-300"
        style={{ transform: `translate(${-mousePos.x * 2}px, ${-mousePos.y * 2}px)` }}
      />
      <div
        className="glow-orb absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[120px] transition-transform duration-300"
        style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
      />
      <div
        className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[150px]"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text content */}
          <div className="text-center lg:text-left">
            {/* Terminal prefix with typing effect */}
            {/* Terminal prefix with typing effect - Responsive wrapping */}
            <div className="font-mono text-primary mb-6 opacity-0 hero-subtitle flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1">
              <div className="flex gap-1.5 px-2 py-1 bg-muted/30 rounded-full">
                <span className="w-2 h-2 rounded-full bg-neon-red animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <div className="flex flex-wrap items-center gap-x-2">
                <span className="text-muted-foreground whitespace-nowrap">root@v3nom95:~$</span>
                <span className="text-primary break-all">./portfolio.sh</span>
                <span className="animate-pulse bg-primary w-2 h-4" />
              </div>
            </div>

            {/* Main name with enhanced glitch effect */}
            <h1 className="hero-name text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 perspective-1000 flex flex-wrap justify-center lg:justify-start gap-x-2">
              <span className="glitch text-foreground block whitespace-nowrap" data-text="Venkatapathi">
                {splitText('Venkatapathi')}
              </span>
              <span className="text-gradient-cyber block whitespace-nowrap" ref={textRef}>
                {splitText('Babu')}
              </span>
            </h1>

            {/* Alias tag */}
            <div className="hero-subtitle opacity-0 mb-6">
              <span className="inline-block px-4 py-2 bg-card/80 border border-primary/50 rounded-lg font-mono text-primary backdrop-blur-sm">
                aka <span className="text-secondary">v3nom95</span>
              </span>
            </div>

            {/* Subtitle */}
            {/* Subtitle */}
            <p className="hero-subtitle text-sm sm:text-lg md:text-xl text-muted-foreground font-mono mb-10 opacity-0 max-w-md mx-auto lg:mx-0 leading-relaxed">
              <span className="text-primary">&lt;</span>
              AI & ML Engineer / Web3 Builder / Developer
              <span className="text-primary">/&gt;</span>
            </p>

            {/* Tags with icons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
              <div className="hero-tag opacity-0 flex items-center gap-2 px-5 py-3 bg-card/60 border border-neon-purple/50 rounded-xl backdrop-blur-sm hover:scale-105 hover:border-neon-purple transition-all duration-300 cursor-default">
                <Boxes className="w-5 h-5 text-neon-purple" />
                <span className="font-mono text-sm text-neon-purple">Web3</span>
              </div>
              <div className="hero-tag opacity-0 flex items-center gap-2 px-5 py-3 bg-card/60 border border-secondary/50 rounded-xl backdrop-blur-sm hover:scale-105 hover:border-secondary transition-all duration-300 cursor-default">
                <Brain className="w-5 h-5 text-secondary" />
                <span className="font-mono text-sm text-secondary">AI & ML</span>
              </div>
              <div className="hero-tag opacity-0 flex items-center gap-2 px-5 py-3 bg-card/60 border border-primary/50 rounded-xl backdrop-blur-sm hover:scale-105 hover:border-primary transition-all duration-300 cursor-default">
                <Code2 className="w-5 h-5 text-primary" />
                <span className="font-mono text-sm text-primary">Dev</span>
              </div>
            </div>

            {/* CTA */}
            <div className="hero-subtitle opacity-0 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-primary text-primary-foreground font-mono font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,102,0.5)]"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-primary text-primary font-mono font-semibold rounded-lg hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,255,102,0.3)] transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>

          {/* Right - 3D Cyber Globe */}
          <div
            className="hacker-scene opacity-0 block transition-transform duration-300"
            style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
          >
            <Suspense fallback={<HackerScene />}>
              <CyberGlobe3D />
            </Suspense>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">scroll</span>
          <ChevronDown className="w-6 h-6 text-primary" />
        </div>
      </div>
    </section>
  );
};
