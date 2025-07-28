// chitri_frontend/src/pages/CancellationRefundsPage.jsx
import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { CONTACT_EMAIL } from '../utils/constants';

const CancellationRefundsPage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-light font-serif flex flex-col">
      <Navbar />
      <main className="container mx-auto p-8 flex-grow mt-20">
        <h1 className="text-4xl font-bold text-taupe mb-8 text-center">Cancellation & Refunds Policy</h1>

        <div className="bg-deep-taupe p-6 rounded-lg shadow-xl space-y-4">
          <p className="text-lg font-semibold text-taupe">We understand that sometimes plans change. Please review our policy regarding cancellations and refunds.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">1. Order Cancellation</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Orders can be cancelled within <strong>24 hours</strong> of purchase for a full refund.</li>
            <li>After 24 hours, as our handmade items enter the production or packaging phase, cancellations may not be possible or may incur a cancellation fee.</li>
            <li>To request a cancellation, please contact us immediately at {CONTACT_EMAIL} with your order number.</li>
          </ul>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">2. Refunds for Damaged/Incorrect Items</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>If you receive a damaged or incorrect item, please notify us within <strong>48 hours</strong> of delivery with clear photographs of the damage/incorrect item and its packaging.</li>
            <li>Upon verification, we will offer a replacement or a full refund.</li>
            <li>Refunds will be processed to the original payment method within <strong>7-10 business days</strong> after approval.</li>
          </ul>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">3. No Refunds for Change of Mind</h2>
          <p>Due to the unique and handmade nature of our products, we do not offer refunds or exchanges for change of mind. Please ensure you review product details carefully before purchasing.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">4. Custom Orders</h2>
          <p>Customized paintings are non-cancellable and non-refundable once the production has begun, unless there is a defect or damage upon arrival.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">5. Contact Us</h2>
          <p>For any questions regarding our Cancellation & Refunds Policy, please contact us at {CONTACT_EMAIL}.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CancellationRefundsPage;
