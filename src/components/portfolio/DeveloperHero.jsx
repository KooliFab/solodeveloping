import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

const DeveloperHero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // GSAP text reveal animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      titleRef.current?.children || [],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }
    ).fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-radial from-electric-500/10 via-background to-background" />

      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main headline */}
          <div ref={titleRef} className="mb-6">
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="block text-foreground">I build intelligent</span>
              <span className="block bg-gradient-to-r from-electric-400 to-electric-600 bg-clip-text text-transparent animate-glow">
                mobile experiences
              </span>
              <span className="block text-foreground">for founders who</span>
              <span className="block text-electric-500">level up fast</span>
            </motion.h1>
          </div>

          {/* Subtitle with proof */}
          <motion.p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="font-semibold text-foreground">10+ years.</span>{' '}
            <span className="font-semibold text-foreground">15+ apps shipped.</span>{' '}
            <span className="font-semibold text-electric-500">Zero missed deadlines.</span>
            <br />
            <span className="text-lg mt-4 block">
              AI automation • Mobile apps • Full-stack development
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-electric-500 hover:bg-electric-600 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Let's Build Something
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-electric-600 to-electric-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-electric-500 text-electric-500 hover:bg-electric-500/10 px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
            >
              <Code2 className="w-5 h-5 mr-2" />
              View Projects
            </Button>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="glass-panel p-6 rounded-2xl">
              <Zap className="w-8 h-8 text-electric-500 mb-3 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Fast Start</h3>
              <p className="text-sm text-muted-foreground">
                No agency onboarding. No team coordination delays. Ship faster.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
              <Sparkles className="w-8 h-8 text-electric-500 mb-3 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Direct Communication</h3>
              <p className="text-sm text-muted-foreground">
                Work directly with who builds your product. No middlemen.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
              <Code2 className="w-8 h-8 text-electric-500 mb-3 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Full Ownership</h3>
              <p className="text-sm text-muted-foreground">
                One person. Complete accountability. Better value.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex flex-col items-center text-muted-foreground">
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default DeveloperHero;
