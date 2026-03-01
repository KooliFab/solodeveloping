import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20 pattern-bg" aria-hidden="true" />
      
      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 text-white/30"
      >
        <Sparkles className="h-16 w-16" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 text-white/30"
      >
        <Sparkles className="h-12 w-12" />
      </motion.div>

      <div className="relative text-center text-white max-w-2xl mx-auto">
        {/* Swooosh text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold leading-none text-white/30 select-none italic">
            Swooosh!
          </h1>
        </motion.div>

        {/* 404 illustration with glow and vignette effect */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mt-4 mb-8"
        >
          {/* Glow effect behind image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-white/20 rounded-full blur-3xl" />
          </div>
          
          {/* Image container with vignette */}
          <motion.div 
            className="relative w-72 h-72 mx-auto rounded-3xl overflow-hidden drop-shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/illustrations/404.webp"
              alt="Page not found"
              decoding="async"
              className="w-full h-full object-cover"
            />
            {/* Radial vignette overlay */}
            <div 
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background: 'radial-gradient(circle, transparent 40%, rgba(99, 102, 241, 0.3) 100%)',
              }}
            />
          </motion.div>
          
          {/* Sparkle accents around image */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-4 right-1/4 text-yellow-300"
          >
            <Sparkles className="h-6 w-6" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-8 left-1/4 text-pink-300"
          >
            <Sparkles className="h-5 w-5" />
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('notFound.title')}
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-md mx-auto">
            {t('notFound.description')}
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90 rounded-full font-semibold"
          >
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              {t('notFound.homeButton')}
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/20 rounded-full font-semibold bg-white/10"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t('notFound.backButton')}
          </Button>
        </motion.div>

        {/* Fun message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-sm text-white/60"
        >
          {t('notFound.funMessage')}
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
