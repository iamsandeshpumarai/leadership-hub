import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link for navigation

function Footer() {
  return (
    <footer className="bg-[#82181A] text-white p-8 text-left">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Column 1: About & Social Links */}
        <div className="mb-8 md:mb-0">
          <h1 className="text-white mb-3">Giriraj Mani Pokhrel</h1>
          <p className="mb-4 text-sm text-white">
            Committed to transparent governance, sustainable development, and building stronger communities through collaborative leadership and proven experience.
          </p>
          <div>
            <button className="text-white lightbrown px-3 py-1">Nepali Politician</button>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="mb-8 md:mb-0 flex flex-col md:items-center">
          <h4 className="text-lg text-white font-bold mb-4">Navigation</h4>
          <ul>
            <li>
              <Link to="/biography" className="text-white hover:text-[#FF4930] block py-1">
                Biography
              </Link>
            </li>
            <li>
              <Link to="/events" className="text-white hover:text-[#FF4930] block py-1">
                Events
              </Link>
            </li>
            <li>
              <Link to="/news" className="text-white hover:text-[#FF4930] block py-1">
                News
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-[#FF4930] block py-1">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/bookstore" className="text-white hover:text-[#FF4930] block py-1 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF4930]" /> Bookstore
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Key Areas */}
        <div className="mb-8 md:mb-0 flex flex-col md:items-center">
          <h4 className="text-lg font-bold tracking-wide mb-4 text-white">CONTACT</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start">
              <Mail className="w-4 h-4 mr-3 mt-1 text-[#FF4930] flex-shrink-0" />
              <a href="mailto:contact@girirajpokhrel.com" className="text-gray-200 hover:text-[#FF4930] transition duration-300">
                contact@girirajpokhrel.com
              </a>
            </li>
            <li className="flex items-start">
              <Phone className="w-4 h-4 mr-3 mt-1 text-[#FF4930] flex-shrink-0" />
              <a href="tel:+15551234567" className="text-gray-200 hover:text-[#FF4930] transition duration-300">
                (555) 123-4567
              </a>
            </li>
            <li className="flex items-start">
              <MapPin className="w-4 h-4 mr-3 mt-1 text-[#FF4930] flex-shrink-0" />
              <span className="text-gray-200">
                Campaign Office, Main Street, City
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 pt-4 border-t border-primary-800 text-sm md:flex justify-between text-white">
        <div>© 2025 Giriraj Mani Pokhrel. All rights reserved.</div>
        <div className="md:flex gap-2 text-white block">
          <Link to="/privacy-policy" className="hover:text-[#FF4930]">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-[#FF4930]">Terms of Service</Link>
          <Link to="/campaign-finance-disclaimer" className="hover:text-[#FF4930]">Campaign Finance Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
