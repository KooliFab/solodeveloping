import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, Mail, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../components/ui/use-toast';
import { saveBookLead } from '../lib/emailService';
import { trackButtonClick, trackPageVisit } from '../utils/slackNotifier';

const Checkbox = ({ id, checked, onChange, label }) => (
  <div className="flex items-start gap-3">
    <div className="flex items-center h-5">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
      />
    </div>
    <label htmlFor={id} className="text-sm text-slate-600 cursor-pointer select-none">
      {label}
    </label>
  </div>
);

// Book to App Illustration Component - Defined outside to prevent re-mounting on parent re-renders
const BookToAppIllustration = () => {
  return (
    <div className="relative max-w-md mx-auto">
      <div className="relative">
        <div className="relative w-full h-full">
          <img
            src="/images/book/book.webp"
            alt="Book cover"
            className="rounded-2xl book-shadow w-2/3 h-auto object-contain shadow-2xl"
            loading="lazy"
          />
          <img
            src="/images/app/en/smartphone-en.webp"
            alt="App mockup"
            className="absolute right-2 sm:right-8 bottom-10 rounded-2xl w-2/5 h-auto object-contain app-mockup shadow-2xl"
            loading="lazy"
          />
        </div>
        {/* Removed glow layer to prevent visible overlap artifacts */}
      </div>
    </div>
  );
};

const BookLandingPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Extract UTM parameters
  const utmSource = searchParams.get('utm_source') || '';
  const utmMedium = searchParams.get('utm_medium') || '';
  const utmCampaign = searchParams.get('utm_campaign') || '';
  const qrSource = searchParams.get('qr') || ''; // Custom QR code identifier

  // Track page visit on mount (for QR code scans)
  const hasTrackedVisit = useRef(false);
  useEffect(() => {
    // Only track if there's a QR source or UTM params, and hasn't been tracked yet
    if (hasTrackedVisit.current) return;
    
    const hasTrackingParams = qrSource || utmSource || utmMedium || utmCampaign;
    if (hasTrackingParams) {
      hasTrackedVisit.current = true;
      trackPageVisit('Book Landing Page', {
        'QR Source': qrSource || 'None',
        'UTM Source': utmSource || 'None',
        'UTM Medium': utmMedium || 'None',
        'UTM Campaign': utmCampaign || 'None',
      });
    }
  }, [qrSource, utmSource, utmMedium, utmCampaign]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: t('bookLanding.emailRequiredTitle'),
        description: t('bookLanding.emailRequiredDesc'),
        variant: 'destructive',
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: t('bookLanding.invalidEmailTitle'),
        description: t('bookLanding.invalidEmailDesc'),
        variant: 'destructive',
      });
      return;
    }

    if (!confirmed) {
      toast({
        title: t('bookLanding.confirmRequired'),
        description: t('bookLanding.confirmRequired'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await saveBookLead(email, {
        utmSource,
        utmMedium,
        utmCampaign,
        language: t('bookLanding.currentLanguage') || 'en',
      });

      if (result.success) {
        // Track successful form submission with translated button label
        trackButtonClick(t('bookLanding.submitButton'), {
          'Email': email.replace(/(.{2})(.*)(@.*)/, '$1***$3'), // Partially hide email
          'UTM Source': utmSource || 'None',
          'UTM Medium': utmMedium || 'None',
          'UTM Campaign': utmCampaign || 'None',
          'Language': t('bookLanding.currentLanguage') || 'en',
          'Status': 'Success',
        });
        
        setIsSubmitted(true);
        toast({
          title: t('bookLanding.successTitle'),
          description: t('bookLanding.successDesc'),
        });
      } else {
        toast({
          title: t('bookLanding.errorTitle'),
          description: result.message || t('bookLanding.errorDesc'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      toast({
        title: t('bookLanding.errorTitle'),
        description: t('bookLanding.errorDesc'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Minimal layout keeps only the illustration + form card

  if (isSubmitted) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center px-4 py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 pattern-bg" aria-hidden="true" />
        <div className="relative max-w-2xl w-full bg-white/10 backdrop-blur-3xl border border-white/30 rounded-3xl p-10 text-center shadow-2xl">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white/15">
            <Mail className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">{t('bookLanding.thankYouTitle')}</h1>
          <p className="text-lg text-white/85 mb-4">{t('bookLanding.thankYouDesc')}</p>
          <p className="text-base text-white/70">{t('bookLanding.checkEmailMessage')}</p>
          <p className="mt-6 text-sm text-white/70">{t('bookLanding.thankYouHelper')}</p>
          <div className="mt-10 flex flex-col gap-4 items-center">
            <Button
              asChild
              className="bg-white text-primary hover:bg-white/90 text-base font-semibold px-8 py-6 rounded-full"
            >
              <Link to="/">{t('bookLanding.thankYouCta')}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative hero-gradient text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 pattern-bg" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-xl mx-auto">
            <div className="mb-6 lg:mb-8">
              <BookToAppIllustration />
            </div>

            <div className="relative bg-white text-slate-900 rounded-3xl shadow-2xl p-8">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-600">
                  <Sparkles className="h-4 w-4" />
                  {t('bookLanding.highlight')}
                </div>
                <h2 className="mt-4 text-2xl font-bold text-slate-900">
                  {t('bookLanding.formTitle')}
                </h2>
                <p className="text-base text-slate-500 mt-2">
                  {t('bookLanding.formSubtitle')}
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    {t('bookLanding.emailLabel')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('bookLanding.emailPlaceholder')}
                      className="w-full pl-12 h-12 rounded-2xl border-slate-200 text-base"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Checkbox
                  id="confirm-purchase"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  label={t('bookLanding.confirmLabel')}
                />

                <Button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold h-12 text-base shadow-lg shadow-purple-500/30"
                  disabled={isLoading}
                >
                  {isLoading ? t('bookLanding.sendingButton') : t('bookLanding.submitButton')}
                </Button>
              </form>

              <p className="mt-4 text-sm text-slate-500">
                {t('bookLanding.helperDesc')}
              </p>

              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <ShieldCheck className="h-5 w-5 text-purple-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t('bookLanding.secureLabel')}
                  </p>
                  <p className="text-sm text-slate-500">
                    {t('bookLanding.privacyNote')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookLandingPage;
