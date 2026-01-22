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
    className={cn("benefit-card flex flex-col items-center", className)}
    {...props}
  >
    <Icon className={`h-10 w-10 mb-4 ${iconColor}`} strokeWidth={1.5} />
    <h3 className="text-xl font-semibold mb-3 text-[hsl(var(--benefit-title))]">{title}</h3>
    <p className="text-[hsl(var(--benefit-text))] text-sm leading-relaxed">
      {description}
    </p>
  </motion.div>
));

BenefitCard.displayName = "BenefitCard";

export { BenefitCard };