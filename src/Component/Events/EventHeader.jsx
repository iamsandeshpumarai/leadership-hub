import React from "react";

const EventHeader = () => {
  return (
    <div className="text-center transform transition-all duration-1000 translate-y-0 opacity-100">
      {/* Badge */}
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
          className="lucide lucide-calendar w-4 h-4 text-red-600 mr-2"
          aria-hidden="true"
        >
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
        </svg>
        <span className="text-red-700 font-medium text-sm tracking-wide">
          COMMUNITY EVENTS
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl lg:text-5xl font-light text-red-900 mb-6 leading-tight">
        Upcoming Events &amp;
        <br />
        <span className="font-normal text-red-700">Community Gatherings</span>
      </h1>

      {/* Divider */}
      <div className="w-16 h-0.5 bg-red-400 mx-auto mb-8"></div>

      {/* Description */}
      <p className="text-lg text-red-800 max-w-3xl mx-auto leading-relaxed mb-12">
        Join us in building stronger communities through meaningful events, rallies,
        and initiatives. Together, we work towards positive change and sustainable
        development for all.
      </p>
    </div>
  );
};

export default EventHeader;
