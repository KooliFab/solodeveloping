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
    <div className="flex items-start gap-4">
      <div className={`${iconBgColor} p-3 rounded-full`}>
        {React.cloneElement(icon, { className: `h-6 w-6 ${iconColor}` })}
      </div>
      <div>
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureItem;