// chitri_frontend/src/pages/DeliveryInfoPage.jsx
import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { CONTACT_EMAIL, CONTACT_PHONE } from '../utils/constants';

const DeliveryInfoPage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-light font-serif flex flex-col">
      <Navbar />
      <main className="container mx-auto p-8 flex-grow mt-20">
        <h1 className="text-4xl font-bold text-taupe mb-8 text-center">Delivery Information</h1>

        <div className="bg-deep-taupe p-6 rounded-lg shadow-xl space-y-4">
          <p className="text-lg font-semibold text-taupe">We aim to deliver your handmade paintings safely and efficiently.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">1. Processing Time</h2>
          <p>Once your order is placed and payment is confirmed, we begin processing your handmade painting. This typically takes <strong>2-3 business days</strong> as each piece is crafted with care.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">2. Shipping Time</h2>
          <p>After processing, shipping generally takes an additional <strong>5-7 business days</strong> depending on your location. You can expect your order to arrive within <strong>7-10 business days</strong> from the date of purchase.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">3. Shipping Partners</h2>
          <p>We partner with reliable courier services to ensure your artwork reaches you in perfect condition.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">4. Shipping Charges</h2>
          <p>All shipping charges are inclusive in the product price. There are no hidden delivery fees.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">5. Tracking Your Order</h2>
          <p>Once your order is shipped, you will receive a tracking number via email, allowing you to monitor the status of your delivery.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">6. Delivery Issues</h2>
          <p>If you experience any issues with your delivery, such as delays or damaged packages, please contact us immediately:</p>
          <p>Email: {CONTACT_EMAIL}</p>
          <p>Phone: {CONTACT_PHONE}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DeliveryInfoPage;
