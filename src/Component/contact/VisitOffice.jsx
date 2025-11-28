import React from "react";

const VisitOfficeSection = () => {
  return (
    <section className="py-20 bg-red-800">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center transform transition-all duration-1000 delay-700 tranred-y-0 opacity-100">
          <h3 className="text-2xl lg:text-3xl font-light text-white mb-6">
            Visit Our
            <span className="font-normal text-red-300 ml-2">Office</span>
          </h3>
          <div className="w-16 h-0.5 bg-red-400 mx-auto mb-8"></div>
          <p className="text-red-300 leading-relaxed text-lg mb-12 max-w-2xl mx-auto">
            Our office is located in the heart of Kathmandu. We welcome scheduled visits and meetings during our regular office hours.
          </p>
        </div>

        {/* Map / Location Placeholder */}
        <div className="bg-red-700 border border-red-600 h-64 flex items-center justify-center mb-8">
          <div className="text-red-200 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-map-pin w-16 h-16 mx-auto mb-4"
              aria-hidden="true"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <p className="text-lg">Interactive Map</p>
            <p className="text-sm">Kathmandu, Bagmati Province, Nepal</p>
          </div>
        </div>

        {/* Office Highlights */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-light text-white mb-2">Central</div>
            <div className="text-sm text-red-400 tracking-wide uppercase">Location</div>
          </div>
          <div>
            <div className="text-2xl font-light text-white mb-2">Accessible</div>
            <div className="text-sm text-red-400 tracking-wide uppercase">By Public Transport</div>
          </div>
          <div>
            <div className="text-2xl font-light text-white mb-2">Parking</div>
            <div className="text-sm text-red-400 tracking-wide uppercase">Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitOfficeSection;
