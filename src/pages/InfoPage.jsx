import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SITE_URL } from '@/constants/site';
import { profile } from '@/data/profile';

// Plain text pages (contact, privacy, developer resources) whose content lives
// in the translation files under `<page>Page`: an intro, then sections made of
// paragraphs, a list of terms (optionally linked) and an optional code sample.
const SCHEMAS = {
  contact: (pageUrl, t) => ({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t('contactPage.title'),
    url: pageUrl,
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      email: profile.email,
      address: { '@type': 'PostalAddress', ...profile.address },
      sameAs: profile.sameAs,
    },
  }),
  privacy: (pageUrl, t) => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('privacyPage.title'),
    url: pageUrl,
  }),
  developers: (pageUrl, t) => ({
    '@context': 'https://schema.org',
    '@type': 'WebAPI',
    name: 'Solo Developing API',
    description: t('developersPage.seoDescription'),
    url: `${SITE_URL}/api/`,
    documentation: `${SITE_URL}/openapi.json`,
    provider: { '@type': 'Person', name: profile.name, url: SITE_URL },
  }),
};

const Term = ({ item }) => {
  const className = item.code ? 'font-mono text-electric-500' : 'font-semibold text-foreground';
  if (!item.href) return <span className={className}>{item.term}</span>;

  const external = /^https?:/.test(item.href) && !item.href.startsWith(SITE_URL);
  return (
    <a
      href={item.href}
      className={`${className} underline decoration-white/20 underline-offset-4 hover:text-electric-500 hover:decoration-electric-500 transition-colors`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {item.term}
    </a>
  );
};

Term.propTypes = {
  item: PropTypes.shape({ term: PropTypes.string, href: PropTypes.string, code: PropTypes.bool }).isRequired,
};

const InfoPage = ({ page }) => {
  const { t, i18n } = useTranslation();
  const key = `${page}Page`;
  const sectionsRaw = t(`${key}.sections`, { returnObjects: true });
  const sections = Array.isArray(sectionsRaw) ? sectionsRaw : [];
  const updated = i18n.exists?.(`${key}.updated`) ? t(`${key}.updated`) : null;
  const pageUrl = `${SITE_URL}${i18n.language === 'fr' ? '/fr' : ''}/${page}`;

  return (
    <>
      <SEO
        titleKey={`${key}.seoTitle`}
        descriptionKey={`${key}.seoDescription`}
        path={`/${page}`}
        image="/images/og-default.webp"
        schema={SCHEMAS[page](pageUrl, t)}
      />

      <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/30 selection:text-primary-foreground">
        <Navbar />

        <main className="pt-24 pb-20">
          <article className="container mx-auto max-w-3xl px-6 py-12 md:py-20">
            <header className="mb-8">
              <p className="font-mono text-electric-500 text-xs md:text-sm tracking-[0.2em] uppercase mb-6">
                {t(`${key}.eyebrow`)}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display tracking-tight">
                {t(`${key}.title`)}
              </h1>
              <div className="h-1 w-20 bg-primary mb-8 rounded-full" />
              <p className="text-xl text-muted-foreground leading-relaxed">{t(`${key}.intro`)}</p>
              {updated && <p className="mt-4 text-sm font-mono text-gray-500">{updated}</p>}
            </header>

            {sections.map((section) => (
              <section key={section.id} id={section.id} className="border-t border-white/10 py-10 scroll-mt-28">
                <h2 className="text-2xl md:text-3xl font-bold mb-5 font-display">{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="text-lg text-muted-foreground leading-relaxed mb-4 break-words">
                    {paragraph}
                  </p>
                ))}
                {section.items?.length > 0 && (
                  <ul className="mt-2 space-y-3 text-lg">
                    {section.items.map((item) => (
                      <li key={item.term} className="break-words">
                        <Term item={item} />
                        {item.description && <span className="text-muted-foreground"> — {item.description}</span>}
                      </li>
                    ))}
                  </ul>
                )}
                {section.code && (
                  <pre className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-sm text-electric-500">
                    <code>{section.code}</code>
                  </pre>
                )}
              </section>
            ))}
          </article>

          <Footer />
        </main>
      </div>
    </>
  );
};

InfoPage.propTypes = {
  page: PropTypes.oneOf(Object.keys(SCHEMAS)).isRequired,
};

export default InfoPage;
