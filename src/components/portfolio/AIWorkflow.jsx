import { motion } from 'framer-motion';
import { Bot, ClipboardList, ShieldCheck, Network } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ICONS = [Bot, ClipboardList, ShieldCheck, Network];

/**
 * "How I build with AI" section — agentic workflow, delegation contract,
 * guardrails and project knowledge base. Content lives in `aiWorkflow.*`.
 */
const AIWorkflow = () => {
  const { t } = useTranslation();
  const items = t('aiWorkflow.items', { returnObjects: true });
  const list = Array.isArray(items) ? items : [];

  return (
    <section id="ai-workflow" className="py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-7xl md:text-8xl font-bold font-display text-foreground/[0.06] mb-0 leading-none select-none">
            AI
          </p>
          <div className="-mt-4 md:-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-electric-500 text-base font-bold phosphor-glow select-none">$</span>
              <span className="text-sm font-mono text-electric-500 uppercase tracking-widest phosphor-glow">
                {t('aiWorkflow.badge')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              {t('aiWorkflow.title1')}{' '}
              <span className="text-electric-500">{t('aiWorkflow.title2')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {t('aiWorkflow.subtitle')}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="p-6 md:p-8 rounded-3xl bg-card/30 border border-electric-500/20 hover:border-electric-500/50 transition-colors duration-300"
              >
                <Icon className="w-8 h-8 text-electric-500 mb-4" aria-hidden="true" />
                <h3 className="font-bold text-xl mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AIWorkflow;
