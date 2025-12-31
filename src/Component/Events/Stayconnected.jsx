import React from "react";
import { useNavigate } from "react-router-dom";

const StayConnected = () => {
 const navigate =  useNavigate()
  return (
    <section className="py-20 bg-red-800 mt-12">
      {/* Container */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Content */}
        <div className="text-center transform transition-all duration-1000 delay-500 translate-y-0 opacity-100">
          
          {/* Section Title */}
          <h3 className="text-2xl lg:text-3xl font-light text-white mb-6">
            Stay Connected &amp;
            <span className="font-normal text-red-300 ml-2">Get Involved</span>
          </h3>
          
          {/* Decorative line under title */}
          <div className="w-16 h-0.5 bg-red-400 mx-auto mb-8"></div>
          
          {/* Section Description */}
          <p className="text-red-300 leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
            Be the first to know about upcoming events and opportunities to contribute to our community initiatives.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={()=>navigate("/contact")} className="bg-white text-red-800 hover:bg-red-100 px-8 py-3 font-medium tracking-wide transition-all duration-200">
              VOLUNTEER WITH US
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayConnected;
