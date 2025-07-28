// chitri_frontend/src/pages/PrivacyPolicyPage.jsx
import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { CONTACT_EMAIL } from '../utils/constants';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-light font-serif flex flex-col">
      <Navbar />
      <main className="container mx-auto p-8 flex-grow mt-20">
        <h1 className="text-4xl font-bold text-taupe mb-8 text-center">Privacy Policy</h1>

        <div className="bg-deep-taupe p-6 rounded-lg shadow-xl space-y-4">
          <p className="text-lg font-semibold text-taupe">Your privacy is important to us.</p>
          <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from CHITRIKA.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">1. Personal Information We Collect</h2>
          <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>
          <p>Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including Razorpay transaction details), email address, and phone number. We refer to this information as “Order Information.”</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">2. How We Use Your Personal Information</h2>
          <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).</p>
          <p>Additionally, we use this Order Information to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Communicate with you.</li>
            <li>Screen our orders for potential risk or fraud.</li>
            <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
          </ul>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">3. Sharing Your Personal Information</h2>
          <p>We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Razorpay for online payments. We may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">4. Your Rights</h2>
          <p>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">5. Data Retention</h2>
          <p>When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to erase this information.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">6. Changes</h2>
          <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">7. Contact Us</h2>
          <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at {CONTACT_EMAIL}.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
