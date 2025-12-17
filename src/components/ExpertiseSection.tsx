import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Shield, Skull, Code, Boxes } from 'lucide-react';

const expertiseAreas = [
  {
    id: 'red-team',
    title: 'Red Teaming',
    subtitle: 'Offensive Security',
    color: 'neon-red',
    icon: Skull,
    description: 'Penetration testing, vulnerability assessment, and adversary simulation to identify and exploit security weaknesses.',
    skills: ['Penetration Testing', 'Social Engineering', 'Exploit Development', 'OSINT'],
    tools: ['Burp Suite', 'Metasploit', 'Nmap', 'Wireshark'],
  },
  {
    id: 'blue-team',
    title: 'Blue Teaming',
    subtitle: 'Defensive Security',
    color: 'secondary',
    icon: Shield,
    description: 'Security monitoring, incident response, and building robust defenses to protect systems and data.',
    skills: ['Incident Response', 'SIEM', 'Threat Hunting', 'Forensics'],
    tools: ['Splunk', 'ELK Stack', 'Snort', 'YARA'],
  },
  {
    id: 'web3',
    title: 'Web3 Development',
    subtitle: 'Blockchain & DApps',
    color: 'neon-purple',
    icon: Boxes,
    description: 'Building decentralized applications, smart contracts, and exploring the future of the internet.',
    skills: ['Smart Contracts', 'DeFi', 'NFTs', 'DAOs'],
    tools: ['Solidity', 'Hardhat', 'ethers.js', 'IPFS'],
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

            animate('.expertise-card', {
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 800,
              delay: stagger(150, { start: 300 }),
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
    glow: color === 'neon-red' ? 'hover:shadow-[0_0_30px_rgba(255,77,77,0.3)]' 
          : color === 'secondary' ? 'hover:shadow-[0_0_30px_rgba(0,230,255,0.3)]'
          : color === 'neon-purple' ? 'hover:shadow-[0_0_30px_rgba(153,51,255,0.3)]'
          : 'hover:shadow-[0_0_30px_rgba(0,255,102,0.3)]',
  });

  return (
    <section id="expertise" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="expertise-title opacity-0 flex items-center gap-4 mb-12">
          <span className="text-primary font-mono">02.</span>
          <h2 className="text-3xl md:text-4xl font-bold">Expertise</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {expertiseAreas.map((area) => {
            const colors = getColorClasses(area.color);
            const Icon = area.icon;

            return (
              <div
                key={area.id}
                className={`expertise-card opacity-0 card-cyber p-6 border ${colors.border} ${colors.glow} transition-all duration-500 group`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg} mb-3`}>
                      <Icon className={`w-4 h-4 ${colors.text}`} />
                      <span className={`font-mono text-xs ${colors.text}`}>{area.subtitle}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {area.title}
                    </h3>
                  </div>
                  <div className={`p-3 rounded-lg ${colors.bg} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {area.description}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <div className="font-mono text-xs text-muted-foreground mb-2">// Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-muted/50 text-foreground text-xs font-mono rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <div className="font-mono text-xs text-muted-foreground mb-2">// Tools</div>
                  <div className="flex flex-wrap gap-2">
                    {area.tools.map((tool) => (
                      <span
                        key={tool}
                        className={`px-2 py-1 border border-border text-xs font-mono rounded ${colors.text}`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
