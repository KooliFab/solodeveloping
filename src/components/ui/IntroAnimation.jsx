import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  'iOS',
  'Android',
  'Web',
  'Blockchain',
  'Automation',
  'AI',
  'Cloud',
  'Full Stack'
];

const IntroAnimation = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (currentIndex < words.length - 1) {
      // Cycle through words faster
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // Last word - hold longer then exit
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 800);
      return () => clearTimeout(exitTimer);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (isExiting) {
      const completeTimer = setTimeout(() => {
        onComplete?.();
      }, 600);
      return () => clearTimeout(completeTimer);
    }
  }, [isExiting, onComplete]);

  const isLastWord = currentIndex === words.length - 1;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary)) 0%, transparent 50%)'
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Word container */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="text-center"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  y: -40, 
                  scale: 0.9,
                  transition: {
                    duration: 0.2,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
              >
                <motion.span 
                  className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight ${
                    isLastWord ? 'text-primary' : 'text-foreground'
                  }`}
                  animate={isLastWord ? {
                    textShadow: [
                      '0 0 0px hsl(var(--primary))',
                      '0 0 30px hsl(var(--primary))',
                      '0 0 0px hsl(var(--primary))'
                    ]
                  } : {}}
                  transition={{
                    duration: 0.8,
                    repeat: isLastWord ? 1 : 0
                  }}
                >
                  {words[currentIndex]}
                </motion.span>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-12">
              {words.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index <= currentIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ 
                    scale: index === currentIndex ? 1.3 : 1,
                    opacity: index <= currentIndex ? 1 : 0.3
                  }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/30"
            initial={{ opacity: 0, x: -20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary/30"
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
