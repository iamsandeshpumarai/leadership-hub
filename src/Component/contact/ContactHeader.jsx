import React from "react";

const ContactHeader = () => {
  return (
    <section className="py-20 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Content */}
        <div className="text-center transform transition-all duration-1000 tranred-y-0 opacity-100">
          
          {/* Label / Badge */}
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
              className="lucide lucide-message-square w-4 h-4 text-red-700 mr-2"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="text-red-700 font-medium text-sm tracking-wide">GET IN TOUCH</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-5xl font-light text-red-900 mb-6 leading-tight">
            Contact & <br />
            <span className="font-normal text-red-700">Connect</span>
          </h1>

          {/* Divider */}
          <div className="w-16 h-0.5 bg-red-400 mx-auto mb-8"></div>

          {/* Description */}
          <p className="text-lg text-red-800 max-w-3xl mx-auto leading-relaxed mb-12">
            We welcome your questions, feedback, and opportunities for collaboration. 
            Reach out to us through any of the channels below or use our contact form for direct communication.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHeader;
