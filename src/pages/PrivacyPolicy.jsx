import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Privacy Policy - Cogni's Adventures</title>
        <meta name="description" content="Privacy Policy for Cogni's Adventures - How we collect, use, and protect your personal information." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <button 
          onClick={goBack}
          className="flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Website
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-500 mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-CA')}
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
              <p>
                Cogni's Adventures ("we," "our," or "us") respects your privacy and is committed to protecting 
                your personal information. This Privacy Policy explains how we collect, use, disclose, and 
                safeguard your information when you use our website, mobile application, and related services.
              </p>
              <p>
                We are based in Montreal, Quebec, Canada, and comply with Canadian privacy laws, including the 
                Personal Information Protection and Electronic Documents Act (PIPEDA) and Quebec's Act respecting 
                the protection of personal information in the private sector.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Personal Information</h3>
              <p>We may collect the following personal information:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Email addresses (for newsletter subscriptions and account creation)</li>
                <li>Names (when creating accounts or making purchases)</li>
                <li>Billing and shipping addresses (for purchases)</li>
                <li>Payment information (processed securely by third-party providers)</li>
                <li>Age or date of birth (to ensure age-appropriate content)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">2.2 Technical Information</h3>
              <p>We automatically collect certain technical information:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>IP addresses</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Usage data and app analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">2.3 Children's Information</h3>
              <p>
                We do not knowingly collect personal information from children under 13 years of age without 
                verifiable parental consent. Our services are designed for children aged 3-10, but we collect 
                information from parents or guardians, not directly from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
              <p>We use your information for the following purposes:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Providing and maintaining our educational services</li>
                <li>Processing transactions and delivering purchased content</li>
                <li>Sending newsletters and educational content</li>
                <li>Personalizing user experience and content recommendations</li>
                <li>Improving our services and developing new features</li>
                <li>Communicating with you about updates, promotions, and support</li>
                <li>Ensuring compliance with legal obligations</li>
                <li>Protecting against fraud and security threats</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Information Sharing and Disclosure</h2>
              <p>We do not sell, trade, or rent your personal information. We may share information in these limited circumstances:</p>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Service Providers</h3>
              <p>We work with trusted third-party service providers:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Google - for database and authentication services</li>
                <li>Payment processors - for secure transaction processing</li>
                <li>Email service providers - for newsletter delivery</li>
                <li>Analytics providers - for usage statistics (anonymized)</li>
                <li>Cloud hosting providers - for website and app hosting</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">4.2 Legal Requirements</h3>
              <p>We may disclose information when required by law or to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Comply with legal process or government requests</li>
                <li>Protect our rights, property, or safety</li>
                <li>Protect the rights, property, or safety of our users</li>
                <li>Investigate potential violations of our terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Storage and Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p>
                Your data is stored on secure servers and may be processed in Canada or other countries where our 
                service providers operate. We ensure adequate protection regardless of location.
              </p>
              <p>
                We retain your information only as long as necessary to fulfill the purposes outlined in this 
                policy or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Privacy Rights</h2>
              <p>Under Canadian privacy law, you have the right to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Access:</strong> Request copies of your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
                <li><strong>Complaint:</strong> File a complaint with privacy authorities</li>
              </ul>
              <p>
                To exercise these rights, contact us at hello@cognibook.com. We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide 
                personalized content. You can control cookie settings through your browser preferences.
              </p>
              <p>Types of cookies we use:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Essential cookies:</strong> Required for website functionality</li>
                <li><strong>Analytics cookies:</strong> Help us understand how you use our services</li>
                <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Marketing cookies:</strong> Used to deliver relevant content (with consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. International Data Transfers</h2>
              <p>
                While we are based in Canada, some of our service providers may process data outside Canada. 
                We ensure that any international transfers comply with Canadian privacy laws and include 
                appropriate safeguards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of significant changes by 
                posting the new policy on our website and updating the "Last updated" date.
              </p>
              <p>
                We encourage you to review this policy regularly to stay informed about how we protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Third-Party Links</h2>
              <p>
                Our services may contain links to third-party websites. We are not responsible for the privacy 
                practices of these external sites. We encourage you to read their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Information</h2>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <p><strong>Privacy Officer</strong></p>
                <p><strong>Cogni's Adventures</strong></p>
                <p>Montreal, Quebec, Canada</p>
                <p>Email: hello@cognibook.com</p>
                <p>Subject Line: Privacy Inquiry</p>
              </div>
              <p className="mt-4">
                If you believe we have not addressed your privacy concerns adequately, you may contact the 
                Office of the Privacy Commissioner of Canada at <strong>1-800-282-1376</strong> or visit 
                <strong> www.priv.gc.ca</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Quebec Residents</h2>
              <p>
                Quebec residents have additional rights under Quebec's privacy legislation. For information 
                about these rights, visit the Commission d'accès à l'information du Québec at 
                <strong> www.cai.gouv.qc.ca</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;