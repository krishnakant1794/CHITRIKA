// chitri_frontend/src/pages/TermsAndConditionsPage.jsx
import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { CONTACT_PHONE, CONTACT_EMAIL, ADDRESS } from '../utils/constants';

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-light font-serif flex flex-col">
      <Navbar />
      <main className="container mx-auto p-8 flex-grow mt-20">
        <h1 className="text-4xl font-bold text-taupe mb-8 text-center">Terms & Conditions</h1>

        <div className="bg-deep-taupe p-6 rounded-lg shadow-xl space-y-4">
          <p className="text-lg font-semibold text-taupe">Welcome to CHITRIKA!</p>
          <p>By accessing and using our website, you agree to comply with and be bound by the following terms and conditions of use. Please review them carefully.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">1. General</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>All items sold by CHITRIKA are 100% handmade with love and care.</li>
            <li>We strive to deliver your orders within a timeframe of 7-8 days from the date of purchase.</li>
            <li>All charges, including shipping fees, are inclusive in the product price unless explicitly stated otherwise.</li>
            <li>We assure secure packaging for all our products to prevent damage during transit.</li>
          </ul>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">2. Customization</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>For any customization requests, please contact us directly:
              <ul className="list-disc list-inside ml-5">
                <li>Phone: {CONTACT_PHONE}</li>
                <li>Email: {CONTACT_EMAIL}</li>
              </ul>
            </li>
            <li>Customization requests are subject to feasibility and may incur additional charges and extended delivery times, which will be communicated upfront.</li>
          </ul>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">3. Product Information</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>We make every effort to display the colors and images of our products as accurately as possible. However, due to the handmade nature and variations in monitor displays, actual colors may vary slightly.</li>
            <li>Dimensions provided are approximate.</li>
          </ul>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">4. Intellectual Property</h2>
          <p>All content on this site, including text, graphics, logos, images, and artwork, is the property of CHITRIKA and protected by copyright laws.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">5. Contact Information</h2>
          <p>For any questions regarding these Terms and Conditions, please contact us at:</p>
          <p>Email: {CONTACT_EMAIL}</p>
          <p>Phone: {CONTACT_PHONE}</p>
          <p>Address: {ADDRESS}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
