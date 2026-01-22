import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

const TermsAndConditions = () => {
  const { t } = useTranslation();

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Terms and Conditions - Cogni's Adventures</title>
        <meta name="description" content="Terms and Conditions for Cogni's Adventures educational content and services." />
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Terms and Conditions</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-500 mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-CA')}
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p>
                Welcome to Cogni's Adventures. These Terms and Conditions ("Terms") govern your use of our website, 
                educational content, mobile application, and related services (collectively, the "Services") provided 
                by Cogni's Adventures, operated from Montreal, Quebec, Canada.
              </p>
              <p>
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree with 
                any part of these Terms, you may not access or use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Services</h2>
              <p>
                Cogni's Adventures provides educational content for children, including:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Interactive children's books featuring Cogni the corgi</li>
                <li>Educational mobile applications with games and activities</li>
                <li>Digital content for cognitive, motor, language, and social-emotional development</li>
                <li>Newsletter services with free educational content</li>
                <li>Print-on-demand services for custom stories</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts and Registration</h2>
              <p>
                To access certain features of our Services, you may be required to create an account. You are 
                responsible for maintaining the confidentiality of your account credentials and for all activities 
                that occur under your account.
              </p>
              <p>
                You must be at least 13 years old to create an account. If you are under 18, you must have 
                parental consent to use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Children's Privacy and Safety</h2>
              <p>
                Our Services are designed for children aged 3-10 years. We are committed to protecting children's 
                privacy and comply with applicable children's privacy laws, including:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Canada's Personal Information Protection and Electronic Documents Act (PIPEDA)</li>
                <li>Children's Online Privacy Protection Act (COPPA) where applicable</li>
                <li>Quebec's Act respecting the protection of personal information in the private sector</li>
              </ul>
              <p>
                We do not knowingly collect personal information from children under 13 without verifiable 
                parental consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Intellectual Property Rights</h2>
              <p>
                All content included in our Services, including but not limited to text, graphics, logos, images, 
                audio clips, digital downloads, and software, is the property of Cogni's Adventures or its content 
                suppliers and is protected by Canadian and international copyright laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, or create derivative works of our content without our 
                express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Prohibited Uses</h2>
              <p>You may not use our Services:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or local regulations or laws</li>
                <li>To transmit or procure the sending of advertising or promotional material without our consent</li>
                <li>To impersonate or attempt to impersonate us, our employees, another user, or any other person</li>
                <li>In any way that infringes upon the rights of others or restricts or inhibits anyone's use of the Services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Purchases and Payments</h2>
              <p>
                All purchases are processed securely through third-party payment processors. Prices are listed in 
                Canadian dollars (CAD) unless otherwise specified. All sales are final unless otherwise stated in 
                our refund policy.
              </p>
              <p>
                Quebec consumers have additional rights under the Quebec Consumer Protection Act.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Disclaimers and Limitation of Liability</h2>
              <p>
                Our Services are provided "as is" without warranties of any kind. To the fullest extent permitted 
                by law, we disclaim all warranties, express or implied, including but not limited to implied 
                warranties of merchantability and fitness for a particular purpose.
              </p>
              <p>
                We shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                resulting from your use of our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Governing Law</h2>
              <p>
                These Terms shall be interpreted and governed by the laws of the Province of Quebec and the laws 
                of Canada applicable therein, without regard to conflict of law principles.
              </p>
              <p>
                Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts 
                of Montreal, Quebec, Canada.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of significant changes 
                by posting the new Terms on our website and updating the "Last updated" date.
              </p>
              <p>
                Continued use of our Services after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <p><strong>Cogni's Adventures</strong></p>
                <p>Montreal, Quebec, Canada</p>
                <p>Email: hello@cognibook.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Severability</h2>
              <p>
                If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions 
                will remain in full force and effect.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;