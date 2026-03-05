import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Brain, Code, Boxes } from 'lucide-react';
import { Web3Visualization } from './Web3Visualization';
import { NetworkSecurityViz } from './NetworkSecurityViz';
import { FloatingElements } from './FloatingElements';
import { ScrollReveal } from './ParallaxSection';

const expertiseAreas = [
  {
    id: 'web3',
    title: 'Web3 Development',
    subtitle: 'Blockchain & DApps',
    color: 'neon-purple',
    icon: Boxes,
    description: 'Building decentralized applications, smart contracts, and exploring the future of the internet.',
    skills: ['Smart Contracts', 'DeFi', 'NFTs', 'DAOs'],
    tools: ['Solidity', 'Hardhat', 'ethers.js', 'IPFS'],
    visualization: 'web3',
  },
  {
    id: 'ai-ml',
    title: 'AI & ML',
    subtitle: 'Intelligence Systems',
    color: 'neon-blue',
    icon: Brain,
    description: 'Developing intelligent systems, neural networks, and machine learning models to solve complex problems and automate decision making.',
    skills: ['Deep Learning', 'Neural Networks', 'NLP', 'Computer Vision'],
    tools: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas'],
    visualization: 'ai',
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    subtitle: 'Full Stack',
    color: 'primary',
    icon: Code,
    description: 'Creating modern, responsive web applications with cutting-edge technologies and best practices.',
    skills: ['Frontend', 'Backend', 'APIs', 'Databases'],
    tools: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    visualization: 'webdev',
  },
];

export const ExpertiseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            animate('.expertise-title', {
              translateX: [-50, 0],
              opacity: [0, 1],
              duration: 800,
              ease: 'outExpo',
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color: string) => ({
    border: color === 'neon-red' ? 'border-neon-red/30 hover:border-neon-red/60' 
          : color === 'secondary' ? 'border-secondary/30 hover:border-secondary/60'
          : color === 'neon-purple' ? 'border-neon-purple/30 hover:border-neon-purple/60'
          : 'border-primary/30 hover:border-primary/60',
    text: color === 'neon-red' ? 'text-neon-red' 
        : color === 'secondary' ? 'text-secondary'
        : color === 'neon-purple' ? 'text-neon-purple'
        : 'text-primary',
    bg: color === 'neon-red' ? 'bg-neon-red/10' 
      : color === 'secondary' ? 'bg-secondary/10'
      : color === 'neon-purple' ? 'bg-neon-purple/10'
      : 'bg-primary/10',
    glow: color === 'neon-red' ? 'hover:shadow-[0_0_40px_rgba(255,77,77,0.4)]' 
          : color === 'secondary' || color === 'neon-blue' ? 'hover:shadow-[0_0_40px_rgba(0,230,255,0.4)]'
          : color === 'neon-purple' ? 'hover:shadow-[0_0_40px_rgba(153,51,255,0.4)]'
          : 'hover:shadow-[0_0_40px_rgba(0,255,102,0.4)]',
    floatingColor: (color === 'neon-red' ? 'neon-red' 
                  : (color === 'secondary' || color === 'neon-blue') ? 'secondary'
                  : color === 'neon-purple' ? 'neon-purple'
                  : 'primary') as 'neon-red' | 'secondary' | 'neon-purple' | 'primary',
  });

  const renderVisualization = (vizType: string) => {
    switch (vizType) {
      case 'web3':
        return <Web3Visualization />;
      case 'ai':
        return <NetworkSecurityViz type="ai" />;
      case 'webdev':
        return (
          <div className="relative w-full h-[300px] flex items-center justify-center">
            <svg viewBox="0 0 300 200" className="w-full h-full max-w-[300px]">
              <defs>
                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(142 100% 50%)" />
                  <stop offset="100%" stopColor="hsl(188 100% 50%)" />
                </linearGradient>
              </defs>
              
              {/* Browser window */}
              <rect x="50" y="20" width="200" height="140" rx="8" fill="hsl(220 20% 10%)" stroke="hsl(142 100% 50% / 0.5)" strokeWidth="2" className="webdev-element" />
              <circle cx="70" cy="35" r="5" fill="hsl(0 100% 60%)" className="webdev-dot" />
              <circle cx="85" cy="35" r="5" fill="hsl(45 100% 50%)" className="webdev-dot" />
              <circle cx="100" cy="35" r="5" fill="hsl(142 100% 50%)" className="webdev-dot" />
              
              {/* Code lines */}
              <rect x="65" y="55" width="80" height="8" rx="2" fill="hsl(142 100% 50% / 0.6)" className="code-line" />
              <rect x="65" y="70" width="120" height="8" rx="2" fill="hsl(188 100% 50% / 0.5)" className="code-line" />
              <rect x="75" y="85" width="100" height="8" rx="2" fill="hsl(270 100% 60% / 0.5)" className="code-line" />
              <rect x="75" y="100" width="60" height="8" rx="2" fill="hsl(142 100% 50% / 0.4)" className="code-line" />
              <rect x="65" y="115" width="140" height="8" rx="2" fill="hsl(188 100% 50% / 0.6)" className="code-line" />
              <rect x="65" y="130" width="40" height="8" rx="2" fill="hsl(0 100% 60% / 0.5)" className="code-line" />
              
              {/* React logo */}
              <g transform="translate(150, 170)">
                <ellipse cx="0" cy="0" rx="25" ry="10" fill="none" stroke="hsl(188 100% 50%)" strokeWidth="1.5" className="react-orbit" />
                <ellipse cx="0" cy="0" rx="25" ry="10" fill="none" stroke="hsl(188 100% 50%)" strokeWidth="1.5" transform="rotate(60)" className="react-orbit" />
                <ellipse cx="0" cy="0" rx="25" ry="10" fill="none" stroke="hsl(188 100% 50%)" strokeWidth="1.5" transform="rotate(-60)" className="react-orbit" />
                <circle cx="0" cy="0" r="5" fill="hsl(188 100% 50%)" className="react-core" />
              </g>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    // Animate webdev elements
    animate('.code-line', {
      scaleX: [0, 1],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(100),
      ease: 'outExpo',
    });

    animate('.react-orbit', {
      rotate: [0, 360],
      duration: 8000,
      loop: true,
      ease: 'linear',
    });

    animate('.react-core', {
      scale: [0.8, 1.2, 0.8],
      duration: 2000,
      loop: true,
      ease: 'inOutSine',
    });

    animate('.webdev-dot', {
      scale: [1, 1.3, 1],
      duration: 1000,
      delay: stagger(200),
      loop: true,
      ease: 'inOutSine',
    });
  }, []);

  return (
    <section id="expertise" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="expertise-title opacity-0 flex items-center gap-4 mb-16">
          <span className="text-primary font-mono">02.</span>
          <h2 className="text-3xl md:text-4xl font-bold">Expertise</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Full-width expertise blocks */}
        <div className="space-y-24">
          {expertiseAreas.map((area, index) => {
            const colors = getColorClasses(area.color);
            const Icon = area.icon;
            const isEven = index % 2 === 0;

            return (
              <ScrollReveal
                key={area.id}
                direction={isEven ? 'left' : 'right'}
                delay={index * 100}
              >
                <div
                  className={`relative card-cyber p-8 border ${colors.border} ${colors.glow} transition-all duration-700 group overflow-hidden`}
                >
                  <FloatingElements count={10} type="hexagons" color={colors.floatingColor} />
                  
                  <div className={`grid lg:grid-cols-2 gap-8 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Content */}
                    <div className={`space-y-6 ${!isEven ? 'lg:col-start-2' : ''}`}>
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.bg} mb-4`}>
                            <Icon className={`w-5 h-5 ${colors.text}`} />
                            <span className={`font-mono text-sm ${colors.text}`}>{area.subtitle}</span>
                          </div>
                          <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {area.title}
                          </h3>
                        </div>
                        <div className={`p-4 rounded-xl ${colors.bg} group-hover:scale-110 transition-transform duration-500`}>
                          <Icon className={`w-8 h-8 ${colors.text}`} />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {area.description}
                      </p>

                      {/* Skills */}
                      <div>
                        <div className="font-mono text-xs text-muted-foreground mb-3">// Skills</div>
                        <div className="flex flex-wrap gap-3">
                          {area.skills.map((skill) => (
                            <span
                              key={skill}
                              className={`px-4 py-2 bg-muted/50 text-foreground text-sm font-mono rounded-lg border border-border hover:${colors.border} transition-colors cursor-default`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tools */}
                      <div>
                        <div className="font-mono text-xs text-muted-foreground mb-3">// Tools & Technologies</div>
                        <div className="flex flex-wrap gap-3">
                          {area.tools.map((tool) => (
                            <span
                              key={tool}
                              className={`px-4 py-2 border ${colors.border} text-sm font-mono rounded-lg ${colors.text} hover:${colors.bg} transition-colors cursor-default`}
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Visualization */}
                    <div className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      {renderVisualization(area.visualization)}
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-32 h-32 ${colors.bg} blur-3xl opacity-50 group-hover:opacity-80 transition-opacity`} />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
