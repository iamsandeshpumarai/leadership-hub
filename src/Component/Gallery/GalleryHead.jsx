import React from "react";

// GalleryHead Component
// This component renders the header section for the Photo & Video Gallery
const GalleryHead = () => {
  return (
    <div className="text-center transform transition-all duration-1000 translate-y-0 opacity-100 mt-12">
      
      {/* Badge/Label */}
      <div className="inline-flex items-center bg-white border border-red-200 px-4 py-2 rounded-sm mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-camera w-4 h-4 text-red-600 mr-2"
          aria-hidden="true"
        >
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
          <circle cx="12" cy="13" r="3"></circle>
        </svg>
        <span className="text-red-700 font-medium text-sm tracking-wide">
          PHOTO &amp; VIDEO GALLERY
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl lg:text-5xl font-light text-slate-900 mb-6 leading-tight">
        Visual Journey of
        <br />
        <span className="font-normal text-red-800">Public Service</span>
      </h1>

      {/* Decorative Divider */}
      <div className="w-16 h-0.5 bg-white0 mx-auto mb-8"></div>
    </div>
  );
};

export default GalleryHead;
