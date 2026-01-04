import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { contactDatas } from '../../../utils/fetchData';

function Footer() {

  const { data } = useQuery({
    queryKey: ['contactinfo'],
    queryFn: contactDatas
  });

  return (
    <footer className="bg-[#82181A] text-white p-8 text-left">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Column 1 */}
        <div>
          <h1 className="mb-3">Giriraj Mani Pokhrel</h1>
          <p className="mb-4 text-sm">
            Committed to transparent governance, sustainable development, and building stronger communities through collaborative leadership and proven experience.
          </p>
          <button className="px-3 py-1 border border-white/30 text-sm">
            Nepali Politician
          </button>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col md:items-center">
          <h4 className="text-lg font-bold mb-4">Navigation</h4>
          <ul>
            <li><Link to="/biography" className="hover:text-[#FF4930] block py-1">Biography</Link></li>
            <li><Link to="/events" className="hover:text-[#FF4930] block py-1">Events</Link></li>
            <li><Link to="/news" className="hover:text-[#FF4930] block py-1">News</Link></li>
            <li><Link to="/contact" className="hover:text-[#FF4930] block py-1">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col md:items-center">
          <h4 className="text-lg font-bold mb-4">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start">
              <Mail className="w-4 h-4 mr-3 mt-1 text-[#FF4930]" />
              <span>{data?.data?.data.footerGmail}</span>
            </li>
            <li className="flex items-start">
              <Phone className="w-4 h-4 mr-3 mt-1 text-[#FF4930]" />
              <span>{data?.data?.data.footerPhone}</span>
            </li>
            <li className="flex items-start">
              <MapPin className="w-4 h-4 mr-3 mt-1 text-[#FF4930]" />
              <span>{data?.data?.data.footerLocation}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 pt-4 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <div>© 2025 Giriraj Mani Pokhrel. All rights reserved.</div>

        {/* Privacy & Terms */}
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-[#FF4930] transition">
            Privacy Policy
          </Link>
          <span className="opacity-50">|</span>
          <Link to="/terms" className="hover:text-[#FF4930] transition">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
