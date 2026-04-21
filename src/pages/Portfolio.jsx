import React, { useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/portfolio/Hero';
import ProjectGrid from '@/components/portfolio/ProjectGrid';
import ParallaxBackground from '@/components/layout/ParallaxBackground';
import CustomCursor from '@/components/ui/CustomCursor';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/30 selection:text-primary-foreground">
      <CustomCursor />
      <ParallaxBackground />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <ProjectGrid />
        
        {/* Footer / Contact Skeleton */}
        <section className="py-24 px-6 md:px-24 border-t border-border bg-background/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to build something extraordinary?</h2>
            <a 
              href="mailto:contact@example.com" 
              className="inline-block text-xl md:text-2xl text-primary hover:text-accent underline decoration-2 underline-offset-8 transition-colors cursor-pointer"
            >
              Let's create together
            </a>
            
             <p className="mt-16 text-muted-foreground text-sm">
              © {new Date().getFullYear()} Developer Portfolio. Crafted with React & Framer Motion.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Portfolio;
