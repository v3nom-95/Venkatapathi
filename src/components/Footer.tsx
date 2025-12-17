import { Github, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">&lt;</span>
            Designed & Built by v3nom95
            <span className="text-primary">/&gt;</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-neon-red fill-neon-red" />
            <span>and lots of</span>
            <span className="text-primary font-mono">{'</>'}</span>
          </div>

          <a
            href="#"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="font-mono">View Source</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
