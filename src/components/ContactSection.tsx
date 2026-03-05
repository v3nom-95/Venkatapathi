import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/v3nom-95', label: 'GitHub' },
  { icon: Linkedin, href: 'https://in.linkedin.com/in/venkatapathi-babu-idukuda-3237b92a7', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:idukudavenkatapathi@gmail.com', label: 'Email' },
];

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            animate('.contact-title', {
              translateX: [-50, 0],
              opacity: [0, 1],
              duration: 800,
              ease: 'outExpo',
            });

            animate('.contact-content', {
              translateY: [40, 0],
              opacity: [0, 1],
              duration: 800,
              delay: 300,
              ease: 'outExpo',
            });

            animate('.social-link', {
              scale: [0, 1],
              opacity: [0, 1],
              duration: 600,
              delay: stagger(100, { start: 600 }),
              ease: 'outBack',
            });

            // Terminal cursor blink
            animate('.terminal-cursor', {
              opacity: [1, 0],
              duration: 500,
              loop: true,
              alternate: true,
              ease: 'linear',
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
    <section id="contact" ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="contact-title opacity-0 flex items-center gap-4 mb-8 md:mb-12">
          <span className="text-primary font-mono">04.</span>
          <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="max-w-2xl mx-auto text-center">
          {/* Terminal style message */}
          <div className="contact-content opacity-0 card-cyber p-5 md:p-6 mb-8 text-left">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-neon-red/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-primary/70" />
              </div>
              <span className="ml-4 font-mono text-xs text-muted-foreground">v3nom95@portfolio:~</span>
            </div>

            <div className="font-mono text-sm space-y-2">
              <div className="text-muted-foreground">
                <span className="text-primary">$</span> cat contact.txt
              </div>
              <div className="terminal-text text-foreground leading-relaxed">
                Looking to collaborate on security research, Web3 projects,
                or just want to chat about the latest vulnerabilities?
                My inbox is always open. Whether you have a question or
                just want to say hi, I'll get back to you ASAP!
              </div>
              <div className="flex items-center text-muted-foreground mt-4">
                <span className="text-primary">$</span>
                <span className="terminal-cursor ml-2 inline-block w-2 h-4 bg-primary" />
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="contact-content opacity-0 mb-12">
            <a
              href="mailto:idukudavenkatapathi@gmail.com"
              aria-label="Send email"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-mono font-semibold rounded hover:glow-green transition-all duration-300"
            >
              <Send className="w-5 h-5" />
              Send Message
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="social-link opacity-0 p-3 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary/50 hover:glow-green transition-all duration-300"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
