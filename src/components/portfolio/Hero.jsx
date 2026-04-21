import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center px-6 md:px-24 overflow-hidden">
      <div className="z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="inline-block py-1 px-3 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono mb-4 backdrop-blur-sm">
            Available for freelance
          </span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
            className="text-6xl md:text-9xl font-bold tracking-tighter leading-none mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50"
          >
            Digital
          </motion.h1>
        </div>
        
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.35 }}
            className="text-6xl md:text-9xl font-bold tracking-tighter leading-none mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
          >
            Architect.
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed font-light"
        >
          Crafting immersive web experiences with code and creativity. 
          Specializing in React, Next.js, and motion design.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex gap-6"
        >
          <button className="group relative px-8 py-4 bg-primary text-primary-foreground font-medium text-lg rounded-sm overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]">
            <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10">View Projects</span>
          </button>
          
          <button className="px-8 py-4 bg-transparent border border-input text-foreground font-medium text-lg rounded-sm hover:bg-accent/10 hover:border-accent hover:text-accent transition-colors">
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute inset-0 flex justify-between px-6 md:px-24 pointer-events-none opacity-[0.03]">
        <div className="w-[1px] h-full bg-foreground" />
        <div className="w-[1px] h-full bg-foreground" />
        <div className="w-[1px] h-full bg-foreground" />
        <div className="w-[1px] h-full bg-foreground hidden md:block" />
        <div className="w-[1px] h-full bg-foreground hidden md:block" />
      </div>
    </section>
  );
};

export default Hero;
