// chitri_frontend/src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
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
          {/* UPDATED: Make phone number clickable with tel: protocol and hover effect */}
          <p className="flex items-center text-sm mb-1">
            <Phone className="h-4 w-4 mr-2" />
            <a href={`tel:${CONTACT_PHONE}`} className="hover:text-white transition-colors duration-200">
              {CONTACT_PHONE}
            </a>
          </p>
          {/* UPDATED: Make email clickable with mailto: protocol and hover effect */}
          <p className="flex items-center text-sm mb-1">
            <Mail className="h-4 w-4 mr-2" />
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors duration-200">
              {CONTACT_EMAIL}
            </a>
          </p>
          {/* Address remains non-clickable */}
          <p className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2" /> {ADDRESS}
          </p>
        </div>

        {/* Policies */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-bold text-white mb-3 font-serif">Policies & Info</h3>
          <ul className="space-y-1">
            <li><Link to="/terms-and-conditions" className="text-sm hover:text-taupe transition-colors duration-200">Terms & Conditions</Link></li>
            <li><Link to="/delivery-information" className="text-sm hover:text-taupe transition-colors duration-200">Delivery Information</Link></li>
            <li><Link to="/secure-packaging" className="text-sm hover:text-taupe transition-colors duration-200">Secure Packaging</Link></li>
            <li><Link to="/privacy-policy" className="text-sm hover:text-taupe transition-colors duration-200">Privacy Policy</Link></li>
            <li><Link to="/cancellation-refunds" className="text-sm hover:text-taupe transition-colors duration-200">Cancellation & Refunds</Link></li>
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
