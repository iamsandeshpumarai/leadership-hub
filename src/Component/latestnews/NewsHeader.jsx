import React from "react";

// NewsHeader Component
const NewsHeader = () => {
  return (
    <div className="text-center transform transition-all duration-1000 tranred-y-0 opacity-100">
      
      {/* Header Badge */}
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
          className="lucide lucide-newspaper w-4 h-4 text-red-600 mr-2"
          aria-hidden="true"
        >
          <path d="M15 18h-5"></path>
          <path d="M18 14h-8"></path>
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"></path>
          <rect width="8" height="4" x="10" y="6" rx="1"></rect>
        </svg>
        <span className="text-red-700 font-medium text-sm tracking-wide">
          LATEST NEWS &amp; UPDATES
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl lg:text-5xl font-light text-red-900 mb-6 leading-tight">
        News &amp;<br />
        <span className="font-normal text-red-700">Media Coverage</span>
      </h1>

      {/* Decorative Line */}
      <div className="w-16 h-0.5 bg-red-400 mx-auto mb-8"></div>

      {/* Description */}
      <p className="text-lg text-red-800 max-w-3xl mx-auto leading-relaxed mb-12">
        Stay informed with the latest news, interviews, and media coverage of
        our ongoing initiatives, policy developments, and community engagement
        efforts across Nepal.
      </p>
    </div>
  );
};

export default NewsHeader;
