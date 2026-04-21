import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { sendContactNotification } from '@/utils/contactNotifier';

const ContactSection = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    const result = await sendContactNotification(formData);

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', project: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } else {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden bg-neutral-900">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="font-display text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('contact.title')} <span className="text-green-500">{t('contact.titleHighlight')}</span>
          </motion.h2>
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>

        <motion.div
          className="backdrop-blur-[20px] bg-[rgba(20,20,20,0.6)] rounded-xl overflow-hidden border border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Terminal Header */}
          <div className="bg-black/50 px-4 py-2 border-b border-white/10 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 font-mono text-xs text-gray-500">{t('contact.terminalHeader')}</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-10">
            <div className="font-mono text-sm text-green-500 mb-6">
              {t('contact.terminalInit1')}<br />
              {t('contact.terminalInit2')}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs text-gray-500 font-mono mb-2 uppercase tracking-wider">
                    {t('contact.labelName')}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/20 rounded-lg p-4 text-white font-mono focus:border-green-500 focus:outline-none transition-colors"
                    placeholder={t('contact.placeholderName')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs text-gray-500 font-mono mb-2 uppercase tracking-wider">
                    {t('contact.labelEmail')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/20 rounded-lg p-4 text-white font-mono focus:border-green-500 focus:outline-none transition-colors"
                    placeholder={t('contact.placeholderEmail')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="project" className="block text-xs text-gray-500 font-mono mb-2 uppercase tracking-wider">
                  {t('contact.labelProject')}
                </label>
                <select
                  id="project"
                  name="project"
                  required
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/20 rounded-lg p-4 text-white font-mono focus:border-green-500 focus:outline-none transition-colors"
                >
                  <option value="">{t('contact.placeholderProject')}</option>
                  <option value="ai">{t('contact.projectTypeAI')}</option>
                  <option value="mobile">{t('contact.projectTypeMobile')}</option>
                  <option value="web">{t('contact.projectTypeWeb')}</option>
                  <option value="consulting">{t('contact.projectTypeConsulting')}</option>
                  <option value="other">{t('contact.projectTypeOther')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs text-gray-500 font-mono mb-2 uppercase tracking-wider">
                  {t('contact.labelMessage')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-black/50 border border-white/20 rounded-lg p-4 text-white font-mono focus:border-[#2563EB] focus:outline-none transition-colors resize-none"
                  placeholder={t('contact.placeholderMessage')}
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 font-mono">
                  STATUS: {isSubmitting ? t('contact.statusSending') : isSubmitted ? t('contact.statusSent') : submitError ? t('contact.statusError') : t('contact.statusReady')}
                </span>
                <button
                  type="submit"
                  disabled={isSubmitted || isSubmitting}
                  className="bg-white text-black px-6 py-3 font-bold font-display uppercase tracking-wider hover:bg-green-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5 animate-pulse" />
                      {t('contact.buttonSending')}
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      {t('contact.buttonSubmitted')}
                    </span>
                  ) : submitError ? (
                    <span className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      {t('contact.buttonRetry')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      {t('contact.buttonSubmit')}
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-mono text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-green-500" />
                  <a
                    href="mailto:hello@solodeveloping.com"
                    className="hover:text-green-500 transition-colors"
                  >
                    {t('contact.email')}
                  </a>
                </div>
                <span className="hidden md:block text-gray-700">|</span>
                <span className="text-gray-600">{t('contact.responseTime')}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust signals with terminal styling */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="backdrop-blur-[20px] bg-[rgba(20,20,20,0.6)] border border-white/10 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold font-display text-green-500 mb-2">{t('contact.metric1Value')}</div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">{t('contact.metric1Label')}</div>
          </div>
          <div className="backdrop-blur-[20px] bg-[rgba(20,20,20,0.6)] border border-white/10 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold font-display text-green-500 mb-2">{t('contact.metric2Value')}</div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">{t('contact.metric2Label')}</div>
          </div>
          <div className="backdrop-blur-[20px] bg-[rgba(20,20,20,0.6)] border border-white/10 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold font-display text-green-500 mb-2">{t('contact.metric3Value')}</div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">{t('contact.metric3Label')}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
