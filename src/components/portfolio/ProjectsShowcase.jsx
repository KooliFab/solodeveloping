import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';

// Sample project data - replace with actual projects
import { projects } from '@/data/projects';


const ProjectsShowcase = () => {
  const { t, i18n } = useTranslation();
  const categories = [
    { id: 'all', label: t('projects.filterAll') },
    { id: 'ai', label: t('projects.filterAI'), value: 'AI/Automation' },
    { id: 'mobile', label: t('projects.filterMobile'), value: 'Mobile' },
    { id: 'web', label: t('projects.filterWeb'), value: 'Web App' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

  const langPrefix = i18n.language === 'fr' ? '/fr' : '';

  const activeCategoryObj = categories.find(c => c.id === selectedCategory);
  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategoryObj?.value);

  return (
    <section id="projects" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-display mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('projects.title')} <span className="text-electric-500">{t('projects.titleHighlight')}</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('projects.subtitle')}
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
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-electric-500 text-white shadow-lg shadow-electric-500/30'
                  : 'bg-card text-muted-foreground hover:bg-card/80 hover:text-foreground'
              }`}
            >
              {category.label}
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-electric-500/50 transition-all duration-500 h-full hover:scale-105 hover:-translate-y-2">
                  {/* Project image with reveal effect */}
                  <div className="project-image aspect-video bg-gradient-to-br from-electric-500/20 to-background relative overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-electric-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
          <Link to={`${langPrefix}/projects`}>
            <Button
              size="lg"
              variant="outline"
              className="group border-electric-500 text-electric-500 hover:bg-electric-500 hover:text-white px-8 py-6 text-lg rounded-full transition-all duration-300"
            >
              {t('projects.viewAllButton')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
