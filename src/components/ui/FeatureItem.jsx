import React from 'react';

/**
 * Reusable feature item component with consistent styling
 * @param {object} props - Component props
 * @param {React.ReactNode} props.icon - Icon component to display
 * @param {string} props.title - Feature title
 * @param {string} props.description - Feature description
 * @param {string} props.iconBgColor - Background color class for the icon container
 * @param {string} props.iconColor - Text color class for the icon
 */
const FeatureItem = ({ 
  icon, 
  title, 
  description, 
  iconBgColor = "bg-primary/10", 
  iconColor = "text-primary" 
}) => {
  return (
    <div className="flex items-start gap-3 md:gap-4">
      <div className={`${iconBgColor} p-2.5 md:p-3 rounded-full flex-shrink-0`}>
        {React.cloneElement(icon, { className: `h-5 w-5 md:h-6 md:w-6 ${iconColor}` })}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-lg md:text-xl font-semibold mb-1.5 md:mb-2">{title}</h4>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed break-words">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureItem;