import React from "react";

const PublishedWorks = () => {
  return (
    <section className="py-20">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center transform transition-all duration-1000 translate-y-0 opacity-100">
          
          {/* Tag / Badge */}
          <div className="inline-flex items-center bg-white border border-red-200 px-4 py-2 rounded-sm mb-8 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-book-open w-4 h-4 text-red-600 mr-2"
              aria-hidden="true"
            >
              <path d="M12 7v14"></path>
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
            </svg>
            <span className="text-red-700 font-medium text-sm tracking-wide">
              PUBLISHED WORKS
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-5xl font-light text-slate-900 mb-6 leading-tight">
            Books by
            <br />
            <span className="font-normal text-red-700">
              Giriraj Mani Pokharel
            </span>
          </h1>

          {/* Divider Line */}
          <div className="w-16 h-0.5 bg-red-600 mx-auto mb-8"></div>

          {/* Description */}
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Explore the published works of former Minister and constitutional assembly member, covering healthcare policy, democratic governance, and political leadership in Nepal.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PublishedWorks;
