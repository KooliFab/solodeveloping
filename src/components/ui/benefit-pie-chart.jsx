import React from 'react';
import { motion } from 'framer-motion';
import { PieChart as MinimalPieChart } from 'react-minimal-pie-chart';

// PieChartIcon component for displaying icons on the pie chart
const PieChartIcon = ({ position, children }) => (
  <div
    className="absolute"
    style={{
      left: `${position.x}px`,
      top: `${position.y}px`,
      transform: "translate(-50%, -50%)",
      pointerEvents: "none"
    }}
  >
    {children}
  </div>
);

const BenefitPieChart = ({
  data,
  iconPositions,
  className,
  ...props
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className={className}
      {...props}
    >
      {/* Desktop version */}
      <div 
        className="relative z-10 w-[300px] h-[300px] hidden md:block" 
        aria-label="Educational benefits distribution chart"
      > 
        <MinimalPieChart 
          data={data} 
          lineWidth={100} 
          style={{ height: "100%", width: "100%" }} 
          startAngle={-90} 
          segmentsShift={2} 
          radius={48} 
        /> 
        {/* Overlay icons at the center of each slice */} 
        {data.map((item, idx) => ( 
          <PieChartIcon 
            key={item.title} 
            position={iconPositions[idx]}
          > 
            <item.icon className="h-6 w-6 text-white" />
          </PieChartIcon> 
        ))} 
      </div>
      
      {/* Mobile fallback - now using MinimalPieChart */}
      <div 
        className="relative z-10 w-[200px] h-[200px] md:hidden mx-auto" 
        aria-label="Educational benefits distribution chart (mobile)"
      >
        <MinimalPieChart 
          data={data} 
          lineWidth={100} 
          style={{ height: "100%", width: "100%" }} 
          startAngle={-90} 
          segmentsShift={1} 
          radius={48} 
        />
        {/* Overlay icons at the center of each slice for mobile */}
        {data.map((item, idx) => {
          // Calculate mobile positions - scale down from desktop positions
          const mobilePosition = {
            x: iconPositions[idx].x * 0.67,
            y: iconPositions[idx].y * 0.67
          };
          
          return (
            <PieChartIcon 
              key={item.title} 
              position={mobilePosition}
            > 
              <item.icon className="h-5 w-5 text-white" />
            </PieChartIcon>
          );
        })}
      </div>
    </motion.div>
  );
};

export { BenefitPieChart };