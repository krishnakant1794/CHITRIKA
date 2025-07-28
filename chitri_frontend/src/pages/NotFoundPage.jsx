// chitri_frontend/src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar'; // Assuming Navbar.jsx exists
import Footer from '../components/common/Footer'; // Assuming Footer.jsx exists
import Button from '../components/ui/Button'; // Assuming Button.jsx exists

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-light font-serif flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center p-4 mt-20">
        <h1 className="text-8xl font-bold text-taupe mb-4 animate-pulse">404</h1>
        <p className="text-3xl font-semibold mb-6">Page Not Found</p>
        <p className="text-lg text-gray-400 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">Go to Homepage</Button>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;