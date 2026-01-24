import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-display mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's Build <span className="text-electric-500">Something Great</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Tell me about your project. I typically respond within 24 hours.
          </motion.p>
        </div>

        <motion.div
          className="glass-panel p-8 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-background border-border focus:border-electric-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-background border-border focus:border-electric-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="project" className="block text-sm font-medium mb-2">
                Project Type
              </label>
              <select
                id="project"
                name="project"
                required
                value={formData.project}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
              >
                <option value="">Select a project type</option>
                <option value="ai">AI/Automation</option>
                <option value="mobile">Mobile App</option>
                <option value="web">Web Application</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Tell Me About Your Project
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20 resize-none"
                placeholder="Describe your project, timeline, and budget..."
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitted}
              className="w-full bg-electric-500 hover:bg-electric-600 text-white py-6 text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] disabled:opacity-50"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-electric-500" />
                <a href="mailto:hello@solodeveloping.com" className="hover:text-electric-500 transition-colors">
                  hello@solodeveloping.com
                </a>
              </div>
              <span className="hidden md:block">•</span>
              <span>Response time: Usually within 24 hours</span>
            </div>
          </div>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-4">
            <div className="text-3xl font-bold text-electric-500 mb-2">100%</div>
            <div className="text-sm text-muted-foreground">On-Time Delivery</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-electric-500 mb-2">10+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-electric-500 mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Apps Shipped</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
