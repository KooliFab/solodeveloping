import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Linkedin, Star, Award, Code, Terminal } from 'lucide-react';
import profilePoster from '@/assets/images/profile-poster.jpg';
import profileVideo from '@/assets/videos/profile-loop.mp4';

const About = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const testimonials = t('aboutPage.recommendations.list', { returnObjects: true });
  const testimonialsList = Array.isArray(testimonials) ? testimonials : [];

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>{t('aboutPage.title')} | SOLODEVELOPING</title>
        <meta name="description" content={t('aboutPage.inspiration.content')} />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/30 selection:text-primary-foreground">
        <Navbar />

        <main className="pt-24 pb-20">
          {/* Inspiration Section */}
          <section className="container mx-auto px-6 py-12 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display tracking-tight">
                {t('aboutPage.inspiration.title')}
              </h1>
              <div className="h-1 w-20 bg-primary mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light whitespace-pre-line">
                {t('aboutPage.inspiration.content')}
              </p>
            </motion.div>
          </section>

          {/* Profile Section */}
          <section className="bg-card/30 py-20 border-y border-white/5">
            <div className="container mx-auto px-6">
              <div className="flex flex-col gap-12 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full"
                >
                  <div className="relative aspect-video w-full rounded-3xl overflow-hidden border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-primary/10 to-transparent group">
                     {/* Video Profile */}
                     <video 
                       className="w-full h-full object-cover"
                       autoPlay 
                       loop 
                       muted 
                       playsInline
                       poster={profilePoster}
                     >
                        <source src={profileVideo} type="video/mp4" />
                        {/* Fallback for when video is loading or unsupported */}
                        <div className="w-full h-full bg-black/50 flex items-center justify-center">
                          <span className="text-6xl">👨‍💻</span>
                        </div>
                     </video>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full space-y-6 text-center md:text-left"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <h2 className="text-3xl md:text-5xl font-bold">
                      {t('aboutPage.profile.name')}
                    </h2>
                    <span className="w-fit text-primary text-xl px-4 py-1 bg-primary/10 rounded-full border border-primary/20">
                      {t('aboutPage.profile.role')}
                    </span>
                  </div>
                  <p className="text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
                    {t('aboutPage.profile.bio')}
                  </p>
                  <div className="pt-4 flex justify-center md:justify-start">
                    <Button
                      variant="outline"
                      size="lg"
                      className="gap-2 border-primary/50 text-primary hover:bg-primary/10 rounded-full"
                      onClick={() => window.open('https://www.linkedin.com/in/%F0%9F%92%BB-fabien-chung-a1793830/', '_blank')}
                    >
                      <Linkedin className="w-5 h-5" />
                      LinkedIn Profile
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Recommendations Section */}
          <section id="recommendations" className="container mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('aboutPage.recommendations.title')}</h2>
              <p className="text-muted-foreground">{t('aboutPage.recommendations.subtitle')}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {testimonialsList.map((rec, i) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-colors shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 mb-4 text-amber-500">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="italic text-muted-foreground mb-6">
                      "{rec.text}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                      {rec.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{rec.author}</div>
                      <div className="text-xs text-muted-foreground">{rec.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Price & Distinctions Section */}
          <section className="bg-card/20 py-20 border-t border-white/5">
            <div className="container mx-auto px-6">
               <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('aboutPage.pricing.title')}</h2>
                <p className="text-muted-foreground">{t('aboutPage.pricing.subtitle')}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                 {/* Distinctions */}
                 <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-background rounded-3xl p-8 border border-white/10"
                 >
                    <div className="w-14 h-14 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 text-yellow-500">
                      <Award className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-6">Distinctions</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs shrink-0">✓</div>
                        <span>Prix Coup de Cœur - Coopérathon 2024</span>
                      </li>
                       <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs shrink-0">✓</div>
                        <span>Business Impact Award - Westford 2024</span>
                      </li>
                       <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs shrink-0">✓</div>
                        <span>11+ Years Experience</span>
                      </li>
                    </ul>
                 </motion.div>

                 {/* Pricing */}
                 <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-primary/20 to-background rounded-3xl p-8 border border-primary/30 relative overflow-hidden"
                 >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Terminal className="w-32 h-32" />
                    </div>
                    <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 text-primary">
                      <Code className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-6">Engagement Models</h3>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <span className="text-muted-foreground">{t('aboutPage.pricing.hourly')}</span>
                        <span className="text-xl font-bold">On Request</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <span className="text-muted-foreground">{t('aboutPage.pricing.project')}</span>
                        <span className="text-xl font-bold">Custom Quote</span>
                      </div>
                      <Button className="w-full mt-4 gap-2" size="lg">
                        {t('aboutPage.pricing.contact')} <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                 </motion.div>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </>
  );
};

export default About;
