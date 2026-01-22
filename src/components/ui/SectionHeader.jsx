import React from 'react';
import { motion } from 'framer-motion';
import { sectionHeaderAnimation } from '@/lib/utils/animationUtils';

/**
 * Reusable section header component with consistent styling and animations
 * @param {object} props - Component props
 * @param {string} props.title - Section title
 * @param {string} props.description - Section description
 * @param {string} props.className - Additional CSS classes
 */
const SectionHeader = ({ title, description, className = '' }) => {
  return (
    <motion.div
      {...sectionHeaderAnimation}
      className={`text-center mb-16 ${className}`}
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">{title}</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        {description}
      </p>
      <div className="w-20 h-1 bg-[hsl(var(--primary))] mx-auto mt-8"></div>
    </motion.div>
  );
};

export default SectionHeader;