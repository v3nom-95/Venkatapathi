import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Github, ExternalLink, Folder, Star } from 'lucide-react';

const featuredProjects = [
  {
    title: 'SecureVault DeFi',
    description: 'A decentralized vault protocol with advanced security features including multi-sig, time-locks, and automated threat detection.',
    tags: ['Solidity', 'React', 'Web3.js', 'Hardhat'],
    github: '#',
    live: '#',
    color: 'neon-purple',
  },
  {
    title: 'NetworkSentinel',
    description: 'Real-time network intrusion detection system with ML-powered anomaly detection and automated response capabilities.',
    tags: ['Python', 'TensorFlow', 'Flask', 'Elasticsearch'],
    github: '#',
    live: '#',
    color: 'secondary',
  },
  {
    title: 'RedOps Toolkit',
    description: 'A comprehensive penetration testing framework with automated reconnaissance, exploitation, and reporting modules.',
    tags: ['Python', 'Bash', 'Docker', 'PostgreSQL'],
    github: '#',
    color: 'neon-red',
  },
];

const otherProjects = [
  {
    title: 'Smart Contract Auditor',
    description: 'Automated vulnerability scanner for Solidity smart contracts.',
    tags: ['Python', 'Slither', 'Mythril'],
  },
  {
    title: 'Phishing Analyzer',
    description: 'ML-based phishing detection tool with browser extension.',
    tags: ['JavaScript', 'TensorFlow.js', 'Chrome API'],
  },
  {
    title: 'Blockchain Explorer',
    description: 'Custom block explorer for EVM-compatible chains.',
    tags: ['React', 'ethers.js', 'Node.js'],
  },
  {
    title: 'CTF Platform',
    description: 'Self-hosted capture the flag platform for security training.',
    tags: ['Docker', 'Python', 'React'],
  },
  {
    title: 'Password Manager',
    description: 'Zero-knowledge encrypted password manager with WebAuthn.',
    tags: ['TypeScript', 'WebCrypto', 'IndexedDB'],
  },
  {
    title: 'Log Analyzer',
    description: 'SIEM-lite tool for parsing and analyzing security logs.',
    tags: ['Go', 'Elasticsearch', 'Grafana'],
  },
];

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

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

            animate('.featured-project', {
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 800,
              delay: stagger(200, { start: 300 }),
              ease: 'outExpo',
            });

            animate('.other-project', {
              translateY: [40, 0],
              opacity: [0, 1],
              duration: 600,
              delay: stagger(100, { start: 1000 }),
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
    border: color === 'neon-red' ? 'hover:border-neon-red/50' 
          : color === 'secondary' ? 'hover:border-secondary/50'
          : color === 'neon-purple' ? 'hover:border-neon-purple/50'
          : 'hover:border-primary/50',
    star: color === 'neon-red' ? 'text-neon-red' 
        : color === 'secondary' ? 'text-secondary'
        : color === 'neon-purple' ? 'text-neon-purple'
        : 'text-primary',
    folder: color === 'neon-red' ? 'from-neon-red/20' 
          : color === 'secondary' ? 'from-secondary/20'
          : color === 'neon-purple' ? 'from-neon-purple/20'
          : 'from-primary/20',
    folderBorder: color === 'neon-red' ? 'border-neon-red/20' 
                : color === 'secondary' ? 'border-secondary/20'
                : color === 'neon-purple' ? 'border-neon-purple/20'
                : 'border-primary/20',
    folderIcon: color === 'neon-red' ? 'text-neon-red/50' 
              : color === 'secondary' ? 'text-secondary/50'
              : color === 'neon-purple' ? 'text-neon-purple/50'
              : 'text-primary/50',
  });

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="projects-title opacity-0 flex items-center gap-4 mb-12">
          <span className="text-primary font-mono">03.</span>
          <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Featured Projects */}
        <div className="space-y-8 mb-16">
          {featuredProjects.map((project) => {
            const colors = getColorClasses(project.color);
            return (
              <div
                key={project.title}
                className={`featured-project opacity-0 card-cyber p-6 md:p-8 border border-border ${colors.border} transition-all duration-500 group`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Star className={`w-5 h-5 ${colors.star}`} />
                      <span className="font-mono text-xs text-muted-foreground">Featured Project</span>
                    </div>
                    
                    <h3 className={`text-2xl font-bold mb-3 group-hover:${colors.star} transition-colors`}>
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-muted/50 text-foreground text-xs font-mono rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <a
                        href={project.github}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project visual placeholder */}
                  <div className={`w-full md:w-48 h-32 bg-gradient-to-br ${colors.folder} to-transparent rounded-lg border ${colors.folderBorder} flex items-center justify-center`}>
                    <Folder className={`w-12 h-12 ${colors.folderIcon}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-center">Other Noteworthy Projects</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProjects.map((project) => (
              <div
                key={project.title}
                className="other-project opacity-0 card-cyber p-5 border border-border hover:border-primary/50 hover:translate-y-[-4px] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <Folder className="w-8 h-8 text-primary" />
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>

                <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
