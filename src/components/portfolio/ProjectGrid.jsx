import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "Neon Finance",
    category: "Fintech Dashboard",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=3000&ixlib=rb-4.0.3",
    size: "large"
  },
  {
    id: 2,
    title: "Aether Lens",
    category: "Photography Portfolio",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2864&ixlib=rb-4.0.3",
    size: "small"
  },
  {
    id: 3,
    title: "EcoSphere",
    category: "Sustainability App",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2813&ixlib=rb-4.0.3",
    size: "tall"
  },
  {
    id: 4,
    title: "Hyperion",
    category: "SaaS Landing Page",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=2874&ixlib=rb-4.0.3",
    size: "small"
  }
];

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`group relative rounded-lg overflow-hidden bg-muted ${
        project.size === 'large' ? 'col-span-1 md:col-span-2 row-span-2' : 
        project.size === 'tall' ? 'row-span-2' : ''
      } min-h-[300px] border border-transparent hover:border-primary/50 transition-all duration-500`}
    >
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
      
      <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" />
      
      <div className="absolute bottom-0 left-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-secondary-foreground/80 text-sm font-mono mb-2 uppercase tracking-wider">{project.category}</p>
        <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
        <span className="inline-block w-8 h-[2px] bg-primary group-hover:w-16 transition-all duration-500" />
      </div>
    </motion.div>
  );
};

const ProjectGrid = () => {
  return (
    <section className="py-32 px-6 md:px-24">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16 max-w-2xl"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Works</h2>
        <p className="text-muted-foreground text-lg">A collection of digital experiences designed for impact.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;
