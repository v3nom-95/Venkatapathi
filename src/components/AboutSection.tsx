import { useEffect, useRef, Suspense } from 'react';
import { animate, stagger } from 'animejs';
import { User, MapPin, GraduationCap, Coffee } from 'lucide-react';
import { CyberOrb } from './CyberOrb';
import { TerminalTyping } from './TerminalTyping';
import { Character3D } from './Character3D';
import { ReactiveCharacter } from './ReactiveCharacter';

const skills = [
  { name: 'Python', level: 85 },
  { name: 'JavaScript/TypeScript', level: 80 },
  { name: 'Solidity', level: 70 },
  { name: 'Penetration Testing', level: 75 },
  { name: 'Network Security', level: 80 },
  { name: 'React/Next.js', level: 85 },
];

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            // Animate section title
            animate('.about-title', {
              translateX: [-50, 0],
              opacity: [0, 1],
              duration: 800,
              ease: 'outExpo',
            });

            // Animate content
            animate('.about-content', {
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 800,
              delay: 300,
              ease: 'outExpo',
            });

            // Animate cyber orb
            animate('.cyber-orb-container', {
              scale: [0.5, 1],
              opacity: [0, 1],
              rotate: [0, 360],
              duration: 1500,
              delay: 500,
              ease: 'outExpo',
            });

            // Animate skill bars
            const skillBars = document.querySelectorAll('.skill-bar');
            skillBars.forEach((bar, index) => {
              const level = bar.getAttribute('data-level');
              animate(bar, {
                width: `${level}%`,
                duration: 1500,
                delay: 600 + index * 100,
                ease: 'outExpo',
              });
            });

            // Animate stats
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
              const target = parseInt(stat.getAttribute('data-value') || '0');
              const obj = { value: 0 };
              animate(obj, {
                value: target,
                duration: 2000,
                delay: 800 + index * 200,
                ease: 'outExpo',
                onUpdate: () => {
                  stat.textContent = Math.round(obj.value).toString();
                },
              });
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="about-title opacity-0 flex items-center gap-4 mb-12">
          <span className="text-primary font-mono">01.</span>
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Bio + 3D Character */}
          <div className="about-content opacity-0 space-y-6">
            {/* 3D Reactive Character */}
            <div className="cyber-orb-container">
              <Suspense fallback={<CyberOrb />}>
                <Character3D className="hidden lg:block" />
                <ReactiveCharacter className="lg:hidden" />
              </Suspense>
            </div>

            <div className="card-cyber p-6 space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <User className="w-5 h-5" />
                <span className="font-mono text-sm">whoami</span>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                Hey there! I'm <span className="text-primary font-semibold">Venkatapathi Babu</span>, 
                also known as <span className="text-secondary font-mono">v3nom95</span> in the digital realm.
                I'm a passionate student diving deep into the fascinating worlds of cybersecurity, 
                Web3, and web development.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                My journey involves exploring both offensive and defensive security - from 
                <span className="text-neon-red"> penetration testing</span> and vulnerability research 
                to <span className="text-secondary">security architecture</span> and incident response.
                I believe understanding both sides makes you a better security professional.
              </p>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card-cyber p-4 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">India</span>
              </div>
              <div className="card-cyber p-4 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-secondary" />
                <span className="text-sm text-muted-foreground">Student</span>
              </div>
              <div className="card-cyber p-4 flex items-center gap-3 col-span-2">
                <Coffee className="w-5 h-5 text-neon-red" />
                <span className="text-sm text-muted-foreground">Fueled by curiosity and caffeine</span>
              </div>
            </div>
          </div>

          {/* Right - Skills + Terminal */}
          <div className="about-content opacity-0 space-y-6">
            {/* Terminal Typing Animation */}
            <TerminalTyping />

            <div className="card-cyber p-6">
              <div className="flex items-center gap-3 text-primary mb-6">
                <span className="font-mono text-sm">./skills.sh</span>
              </div>

              <div className="space-y-5">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-sm text-foreground">{skill.name}</span>
                      <span className="font-mono text-sm text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="skill-bar h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        data-level={skill.level}
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="card-cyber p-4 text-center">
                <div className="stat-number text-2xl font-bold text-primary" data-value="15">0</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">Projects</div>
              </div>
              <div className="card-cyber p-4 text-center">
                <div className="stat-number text-2xl font-bold text-secondary" data-value="500">0</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">Commits</div>
              </div>
              <div className="card-cyber p-4 text-center">
                <div className="stat-number text-2xl font-bold text-neon-red" data-value="10">0</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">CTFs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
