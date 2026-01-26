import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const BenefitCard = React.forwardRef(({ 
  icon: Icon, 
  title, 
  description, 
  iconColor, 
  delay = 0.1,
  className,
  ...props 
}, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={cn("benefit-card flex flex-col items-center px-4 md:px-0", className)}
    {...props}
  >
    <Icon className={`h-8 w-8 md:h-10 md:w-10 mb-3 md:mb-4 ${iconColor}`} strokeWidth={1.5} />
    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-[hsl(var(--benefit-title))] text-center">{title}</h3>
    <p className="text-[hsl(var(--benefit-text))] text-sm md:text-base leading-relaxed max-w-sm text-center">
      {description}
    </p>
  </motion.div>
));

BenefitCard.displayName = "BenefitCard";

export { BenefitCard };