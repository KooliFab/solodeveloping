import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Brain, Code2, Zap, Database, Cloud } from 'lucide-react';

const expertiseAreas = [
  {
    icon: Brain,
    title: 'AI/Automation',
    description: 'Build intelligent systems that save time and reduce costs. Document processing, data analysis, workflow automation.',
    highlights: ['OpenAI Integration', 'Custom ML Models', 'Process Automation'],
    color: 'from-electric-400 to-electric-600'
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Native-quality apps for iOS and Android. Cross-platform with React Native or native Swift/Kotlin.',
    highlights: ['React Native', 'iOS/Android', 'App Store Deployment'],
    color: 'from-purple-400 to-purple-600'
  },
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'End-to-end web applications. Modern React frontends, scalable Node.js backends, cloud infrastructure.',
    highlights: ['React/Next.js', 'Node.js/Python', 'API Design'],
    color: 'from-cyan-400 to-cyan-600'
  },
  {
    icon: Database,
    title: 'Database Architecture',
    description: 'Design and optimize database systems. SQL, NoSQL, caching strategies, performance tuning.',
    highlights: ['PostgreSQL', 'MongoDB', 'Redis'],
    color: 'from-green-400 to-green-600'
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Deploy and scale applications on AWS, GCP, or Azure. CI/CD pipelines, monitoring, infrastructure as code.',
    highlights: ['AWS/GCP', 'Docker/K8s', 'CI/CD'],
    color: 'from-orange-400 to-orange-600'
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Make applications blazingly fast. Code optimization, caching, CDN setup, lighthouse scoring.',
    highlights: ['Code Splitting', 'Caching', 'Lighthouse 90+'],
    color: 'from-yellow-400 to-yellow-600'
  }
];

const ExpertiseSection = () => {
  return (
    <section className="py-24 px-4 bg-card/30">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-display mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Areas of <span className="text-electric-500">Expertise</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Full-stack capabilities with deep specialization in AI, mobile, and modern web technologies.
          </motion.p>
        </div>

        {/* Expertise grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-full p-6 rounded-2xl bg-card border border-border/50 hover:border-electric-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-electric-500/10">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${area.color} p-2.5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-electric-500 transition-colors">
                    {area.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {area.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2">
                    {area.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-center text-xs text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-electric-500 mr-2" />
                        <span className="font-mono">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-electric-500/0 to-electric-500/0 group-hover:from-electric-500/5 group-hover:to-electric-500/0 transition-all duration-500 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-muted-foreground mb-4">
            Not sure which stack fits your project?
          </p>
          <a
            href="#contact"
            className="text-electric-500 font-semibold hover:underline inline-flex items-center gap-2"
          >
            Let's discuss your needs
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
