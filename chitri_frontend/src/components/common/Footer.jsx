// chitri_frontend/src/components/common/Footer.jsx
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { CONTACT_PHONE, CONTACT_EMAIL, ADDRESS } from '../../utils/constants'; // Import constants

const Footer = () => {
  return (
    <footer className="bg-deep-taupe text-gray-light py-8 mt-auto shadow-inner">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About Us / Tagline */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-bold text-white mb-3 font-serif">CHITRIKA</h3>
          <p className="text-sm">"100% Handmade Paintings"</p>
          <p className="text-sm mt-2">Crafting beauty, one stroke at a time.</p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-bold text-white mb-3 font-serif">Contact Us</h3>
          <p className="flex items-center text-sm mb-1">
            <Phone className="h-4 w-4 mr-2" /> {CONTACT_PHONE}
          </p>
          <p className="flex items-center text-sm mb-1">
            <Mail className="h-4 w-4 mr-2" /> {CONTACT_EMAIL}
          </p>
          <p className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2" /> {ADDRESS}
          </p>
        </div>

        {/* Policies */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-bold text-white mb-3 font-serif">Policies & Info</h3>
          <ul className="space-y-1">
            <li><a href="#" className="text-sm hover:text-black transition-colors duration-200">Terms & Conditions</a></li>
            <li><a href="#" className="text-sm hover:text-black transition-colors duration-200">Delivery Information</a></li>
            <li><a href="#" className="text-sm hover:text-black transition-colors duration-200">Secure Packaging</a></li>
            <li><a href="#" className="text-sm hover:text-black transition-colors duration-200">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-white">
        &copy; {new Date().getFullYear()} CHITRIKA. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
