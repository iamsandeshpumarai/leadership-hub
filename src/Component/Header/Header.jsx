// Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react';

/**
 * Dropdown menu for Events in desktop view
 */
export const DropdownMenu = ({ isEventsHovered, setIsEventsHovered }) => (
  <div 
    className="relative h-full flex items-center"
    onMouseEnter={() => setIsEventsHovered(true)}
    onMouseLeave={() => setIsEventsHovered(false)}
  >
    <span className="flex items-center space-x-1 hover:text-[#FF4930] transition duration-300 h-full cursor-pointer">
      EVENTS
      <ChevronDown 
        className={`w-3 h-3 transition-transform duration-300 ${isEventsHovered ? 'rotate-180' : 'rotate-0'}`} 
      />
    </span>

    {isEventsHovered && (
      <div className="absolute top-10 left-0 pt-4 z-20 w-40">
        <div className="bg-[#82181A] shadow-xl rounded-b-md overflow-hidden border-t-2 border-[#FF4930]">
          <Link to="/events" className="block px-4 py-3 text-white hover:bg-[#962224] hover:text-[#FF4930] transition duration-300 text-sm border-b border-red-900/30">
            Events
          </Link>
          <Link to="/gallery" className="block px-4 py-3 text-white hover:bg-[#962224] hover:text-[#FF4930] transition duration-300 text-sm">
            Gallery
          </Link>
        </div>
      </div>
    )}
  </div>
);

/**
 * Desktop navigation
 */
const DesktopNav = ({ isEventsHovered, setIsEventsHovered }) => (
  <div className="hidden min-[886px]:flex justify-between items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[10vh]">
    {/* Logo */}
    <div className="text-xl font-bold tracking-wider text-white">
      GIRIRAJ MANI POKHREL
    </div>

    {/* Menu */}
    <nav className="flex space-x-8 text-sm font-medium tracking-wide h-full items-center">
      <Link to="/" className="hover:text-[#FF4930] transition duration-300">HOME</Link>
      <Link to="/biography" className="hover:text-[#FF4930] transition duration-300">BIOGRAPHY</Link>

      <DropdownMenu isEventsHovered={isEventsHovered} setIsEventsHovered={setIsEventsHovered} />

      <Link to="/news" className="hover:text-[#FF4930] transition duration-300">LATEST NEWS</Link>
      <Link to="/contact" className="hover:text-[#FF4930] transition duration-300">CONTACT</Link>
    </nav>

    {/* Bookstore */}
    <Link to="/bookstore" className="flex items-center px-5 py-2.5 bg-white text-[#82181A] text-sm font-bold rounded shadow-md hover:bg-gray-100 transition duration-300">
      <ShoppingCart className="w-4 h-4 mr-2" /> Bookstore
    </Link>
  </div>
);

/**
 * Mobile navigation header (logo + hamburger)
 */
const MobileNav = ({ isMenuOpen, setIsMenuOpen }) => (
  <div className="min-[886px]:hidden flex justify-between items-center w-full max-w-7xl mx-auto px-4 sm:px-6 h-full">
    <div className="text-lg font-bold tracking-wider text-white">
      GIRIRAJ MANI POKHREL
    </div>

    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-[#FF4930] transition duration-300 p-2" aria-label="Toggle navigation">
      {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  </div>
);

/**
 * Header component with Desktop and Mobile menus
 */
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventsHovered, setIsEventsHovered] = useState(false);

  return (
    <header className="bg-[#82181A] text-white shadow-lg fixed top-0 left-0 w-full z-50 h-20">
      <div className="h-full flex items-center w-full">
        <DesktopNav isEventsHovered={isEventsHovered} setIsEventsHovered={setIsEventsHovered} />
        <MobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="min-[886px]:hidden absolute top-20 left-0 w-full bg-[#82181A] shadow-2xl border-t border-red-900/50 flex flex-col animate-fadeIn">
          <div className="flex flex-col py-4 px-6 space-y-4">
            <Link to="/" className="text-white hover:text-[#FF4930] font-medium transition duration-300 border-b border-white/10 pb-2">HOME</Link>
            <Link to="/biography" className="text-white hover:text-[#FF4930] font-medium transition duration-300 border-b border-white/10 pb-2">BIOGRAPHY</Link>

            <div className="flex flex-col space-y-3 pb-2 border-b border-white/10">
              <span className="text-[#FF4930] font-medium">EVENTS</span>
              <Link to="/events" className="pl-4 text-sm text-gray-300 hover:text-white transition duration-300">Events</Link>
              <Link to="/gallery" className="pl-4 text-sm text-gray-300 hover:text-white transition duration-300">Gallery</Link>
            </div>

            <Link to="/news" className="text-white hover:text-[#FF4930] font-medium transition duration-300 border-b border-white/10 pb-2">LATEST NEWS</Link>
            <Link to="/contact" className="text-white hover:text-[#FF4930] font-medium transition duration-300 border-b border-white/10 pb-2">CONTACT</Link>

            <Link to="/bookstore" className="mt-2 w-full flex items-center justify-center px-4 py-3 bg-white text-[#82181A] font-bold rounded shadow hover:bg-gray-100 transition duration-300">
              <ShoppingCart className="w-4 h-4 mr-2" /> Bookstore
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
