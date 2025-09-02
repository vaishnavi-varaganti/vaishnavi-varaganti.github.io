import { useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { BackgroundCanvas } from "@/components/BackgroundCanvas";
import { initAnimations } from "@/lib/animations";

const Home = () => {
  useEffect(() => {
    // Initialize animations
    const cleanup = initAnimations();
    
    return () => {
      cleanup();
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundCanvas />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
