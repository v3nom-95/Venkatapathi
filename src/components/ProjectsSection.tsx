import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { Github, ExternalLink, Folder, Star, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ParallaxSection';
import { FloatingElements } from './FloatingElements';

const featuredProjects = [
  {
    title: 'SurakshaNet',
    description: 'An advanced, enterprise-grade fraud detection system for healthcare claims. Integrates machine learning for anomaly detection, Algorand blockchain for immutable audit trails, and quantum-resistant security to safeguard against emerging threats.',
    tags: ['Python', 'TypeScript', 'Algorand', 'Blockchain', 'FastAPI', 'React'],
    github: 'https://github.com/v3nom-95/SurakshaNet',
    live: '',
    color: 'neon-purple',
    category: 'AI & ML | Blockchain | Quantum Resistant',
  },
  {
    title: 'Responsible AI Medical Assistant (REAI v2)',
    description: 'A trustworthy, blockchain-backed AI medical assistant that provides responsible health advice while ensuring accountability through immutable storage on the Algorand blockchain. Features an adaptive learning system and transparent transaction logging.',
    tags: ['Python', 'Flask', 'Algorand', 'PyTorch', 'Transformers', 'Numpy'],
    github: 'https://github.com/v3nom-95/reaiv2',
    live: '',
    color: 'secondary',
    category: 'AI & ML',
  },
  {
    title: 'Doc Verification',
    description: 'A comprehensive document verification system utilizing advanced validation techniques and security protocols to ensure document authenticity and integrity. Implements blockchain integration for immutable verification records and audit trails.',
    tags: ['TypeScript', 'React', 'Blockchain', 'Security', 'Node.js'],
    github: 'https://github.com/v3nom-95/doc-verification',
    live: '',
    color: 'neon-red',
    category: 'Blockchain | Security',
  },
];



export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            animate('.projects-title', {
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
    border: color === 'neon-red' ? 'border-neon-red/30 group-hover:border-neon-red/60'
      : color === 'secondary' ? 'border-secondary/30 group-hover:border-secondary/60'
        : color === 'neon-purple' ? 'border-neon-purple/30 group-hover:border-neon-purple/60'
          : 'border-primary/30 group-hover:border-primary/60',
    text: color === 'neon-red' ? 'text-neon-red'
      : color === 'secondary' ? 'text-secondary'
        : color === 'neon-purple' ? 'text-neon-purple'
          : 'text-primary',
    bg: color === 'neon-red' ? 'bg-neon-red/10'
      : color === 'secondary' ? 'bg-secondary/10'
        : color === 'neon-purple' ? 'bg-neon-purple/10'
          : 'bg-primary/10',
    glow: color === 'neon-red' ? 'group-hover:shadow-[0_0_50px_rgba(255,77,77,0.3)]'
      : color === 'secondary' ? 'group-hover:shadow-[0_0_50px_rgba(0,230,255,0.3)]'
        : color === 'neon-purple' ? 'group-hover:shadow-[0_0_50px_rgba(153,51,255,0.3)]'
          : 'group-hover:shadow-[0_0_50px_rgba(0,255,102,0.3)]',
    gradient: color === 'neon-red' ? 'from-neon-red/20 to-transparent'
      : color === 'secondary' ? 'from-secondary/20 to-transparent'
        : color === 'neon-purple' ? 'from-neon-purple/20 to-transparent'
          : 'from-primary/20 to-transparent',
  });

  const getCategoryColor = (category: string) => {
    if (category.includes('Blockchain') && category.includes('AI')) return 'text-neon-purple border-neon-purple/50';
    switch (category) {
      case 'Web3': return 'text-neon-purple border-neon-purple/50';
      case 'AI & ML': return 'text-secondary border-secondary/50';
      default: return 'text-primary border-primary/50';
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <FloatingElements count={12} type="hexagons" color="primary" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="projects-title opacity-0 flex items-center gap-4 mb-8 md:mb-16">
          <span className="text-primary font-mono">03.</span>
          <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Featured Projects */}
        <div className="space-y-8 mb-20">
          {featuredProjects.map((project, index) => {
            const colors = getColorClasses(project.color);
            const isHovered = hoveredProject === project.title;

            return (
              <ScrollReveal key={project.title} direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 100}>
                <div
                  className={`group relative card-cyber p-4 sm:p-8 border ${colors.border} ${colors.glow} transition-all duration-500 overflow-hidden`}
                  onMouseEnter={() => setHoveredProject(project.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-start gap-6 md:gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <Star className={`w-6 h-6 ${colors.text}`} />
                        <span className={`font-mono text-[10px] sm:text-sm px-2 sm:px-3 py-1 border rounded-full ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">Featured</span>
                      </div>

                      <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${colors.text} group-hover:translate-x-2 transition-transform duration-300`}>
                        {project.title}
                      </h3>

                      <p className="text-muted-foreground text-base sm:text-lg mb-6 leading-relaxed max-w-2xl">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-3 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 md:px-4 py-1.5 md:py-2 bg-muted/50 text-foreground text-sm font-mono rounded-lg border border-border group-hover:border-primary/30 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6">
                        <a
                          href={project.github}
                          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/link"
                          aria-label="GitHub"
                        >
                          <Github className="w-5 h-5" />
                          <span className="font-mono text-sm group-hover/link:underline">Code</span>
                        </a>
                        {project.live && (
                          <a
                            href={project.live}
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/link"
                            aria-label="Live Demo"
                          >
                            <ExternalLink className="w-5 h-5" />
                            <span className="font-mono text-sm group-hover/link:underline">Live Demo</span>
                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Project visual */}
                    <div className={`w-full lg:w-64 h-32 md:h-48 bg-gradient-to-br ${colors.gradient} rounded-xl border ${colors.border} flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                      <div className="absolute inset-0 cyber-grid opacity-20" />
                      <Folder className={`w-16 h-16 ${colors.text} opacity-50 group-hover:scale-110 transition-transform`} />

                      {/* Animated corner */}
                      <div className={`absolute top-0 right-0 w-16 h-16 ${colors.bg} blur-xl group-hover:w-24 group-hover:h-24 transition-all duration-500`} />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Other Projects removed based on user request */}
      </div>
    </section>
  );
};
