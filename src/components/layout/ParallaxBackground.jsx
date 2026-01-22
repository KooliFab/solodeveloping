import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  
  // Create multiple layers of parallax movement
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 45]);
  const rotate2 = useTransform(scrollY, [0, 1000], [0, -60]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Floating Geometric Shapes */}
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[-5%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px]"
      />
      
      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-secondary/10 blur-[120px]"
      />

      {/* Abstract Code Symbols */}
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 1000], [0, 100]) }}
        className="absolute top-[20%] right-[15%] text-primary/10 text-9xl font-mono font-bold select-none"
      >
        {`{ }`}
      </motion.div>
      
       <motion.div 
        style={{ y: useTransform(scrollY, [0, 1000], [0, -80]) }}
        className="absolute bottom-[30%] left-[10%] text-secondary/10 text-8xl font-mono font-bold select-none"
      >
        {`</>`}
      </motion.div>
      
      {/* Subtle Grain Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>
  );
};

export default ParallaxBackground;
