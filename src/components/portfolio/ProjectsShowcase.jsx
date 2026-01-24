import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample project data - replace with actual projects
const projects = [
  {
    id: 1,
    title: 'AI Document Processor',
    category: 'AI/Automation',
    description: 'Built an AI document processor that reduced manual review from 4 hours to 15 minutes—with 98% accuracy',
    image: '/projects/ai-processor.jpg',
    tags: ['React', 'Python', 'OpenAI', 'FastAPI'],
    metrics: {
      timeSaved: '93%',
      accuracy: '98%',
      roi: '10x'
    },
    link: '#',
    github: '#'
  },
  {
    id: 2,
    title: 'E-Commerce Mobile App',
    category: 'Mobile',
    description: 'Increased conversions 40% with a custom dashboard and streamlined checkout flow',
    image: '/projects/ecommerce.jpg',
    tags: ['React Native', 'Node.js', 'Stripe', 'MongoDB'],
    metrics: {
      conversion: '+40%',
      users: '50K+',
      rating: '4.8★'
    },
    link: '#',
    github: '#'
  },
  {
    id: 3,
    title: 'Real-Time Analytics Dashboard',
    category: 'Web App',
    description: 'Enterprise analytics platform processing 1M+ events per day with real-time insights',
    image: '/projects/analytics.jpg',
    tags: ['React', 'WebSocket', 'D3.js', 'PostgreSQL'],
    metrics: {
      events: '1M+/day',
      latency: '<100ms',
      uptime: '99.9%'
    },
    link: '#',
    github: '#'
  }
];

const categories = ['All', 'AI/Automation', 'Mobile', 'Web App'];

const ProjectsShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-display mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured <span className="text-electric-500">Projects</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Curated selection of impactful work. Each project delivered on time, on budget.
          </motion.p>
        </div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-electric-500 text-white shadow-lg shadow-electric-500/30'
                  : 'bg-card text-muted-foreground hover:bg-card/80 hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-electric-500/50 transition-all duration-500 h-full">
                  {/* Project image */}
                  <div className="aspect-video bg-gradient-to-br from-electric-500/20 to-background relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-electric-500/10"
                      animate={{
                        opacity: hoveredProject === project.id ? 0.3 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold text-electric-500/20">
                        {project.category.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Project info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-electric-500 uppercase tracking-wider">
                        {project.category}
                      </span>
                      <div className="flex gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            className="text-muted-foreground hover:text-electric-500 transition-colors"
                            aria-label="View on GitHub"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        <a
                          href={project.link}
                          className="text-muted-foreground hover:text-electric-500 transition-colors"
                          aria-label="View project"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-electric-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-background/50 rounded-lg">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-sm font-bold text-electric-500">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 bg-electric-500/10 text-electric-500 rounded-full font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-electric-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all projects CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            variant="outline"
            className="group border-electric-500 text-electric-500 hover:bg-electric-500 hover:text-white px-8 py-6 text-lg rounded-full transition-all duration-300"
          >
            View All Projects
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
