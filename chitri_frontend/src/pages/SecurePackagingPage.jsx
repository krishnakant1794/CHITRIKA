// chitri_frontend/src/pages/SecurePackagingPage.jsx
import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const SecurePackagingPage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-light font-serif flex flex-col">
      <Navbar />
      <main className="container mx-auto p-8 flex-grow mt-20">
        <h1 className="text-4xl font-bold text-taupe mb-8 text-center">Secure Packaging</h1>

        <div className="bg-deep-taupe p-6 rounded-lg shadow-xl space-y-4">
          <p className="text-lg font-semibold text-taupe">Ensuring your artwork arrives in pristine condition is our top priority.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">1. Multi-Layered Protection</h2>
          <p>Each handmade painting is carefully wrapped in multiple layers of protective materials, including:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Acid-free tissue paper to protect the artwork surface.</li>
            <li>Bubble wrap for cushioning against impacts.</li>
            <li>Sturdy cardboard corners to protect edges and corners.</li>
            <li>Water-resistant plastic film to guard against moisture.</li>
          </ul>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">2. Custom-Fit Boxes</h2>
          <p>We use high-quality, custom-sized corrugated cardboard boxes that fit your painting snugly, minimizing movement during transit.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">3. Fragile Labeling</h2>
          <p>All packages are clearly marked with "FRAGILE" and "HANDLE WITH CARE" labels to alert couriers to the delicate nature of the contents.</p>

          <h2 className="text-2xl font-bold text-taupe mt-6 mb-3">4. Quality Control</h2>
          <p>Every painting undergoes a final quality check before being meticulously packed and dispatched.</p>

          <p>We take every precaution to ensure your unique piece of art reaches your doorstep safely and ready to be displayed.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SecurePackagingPage;
