import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    animate('.nav-item', {
      translateY: [-20, 0],
      opacity: [0, 1],
      delay: stagger(100, { start: 500 }),
      ease: 'outExpo',
      duration: 800,
    });
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : ''
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('#home')}
            className="font-mono text-xl font-bold text-primary text-glow-green"
          >
            &lt;v3nom95 /&gt;
          </button>
          
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label} className="nav-item opacity-0">
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          <button className="nav-item opacity-0 px-4 py-2 border border-primary text-primary font-mono text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-green">
            Resume
          </button>
        </div>
      </div>
    </nav>
  );
};
