import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ExpertiseSection } from '@/components/ExpertiseSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { Background3D } from '@/components/Background3D';
import { ScrollReveal } from '@/components/ParallaxSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Background3D />
      <ScrollProgressBar />
      <Navbar />
      <main className="relative z-10 w-full overflow-hidden">
        <HeroSection />
        <AboutSection />
        <ExpertiseSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
