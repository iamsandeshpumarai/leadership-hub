import React from "react";

const PoliticalLife = ({ politicalLife = [] }) => {
  return (
    <div className="transform transition-all duration-1000 delay-500 translate-y-0 opacity-100 mt-12 mb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-red-900 p-2">
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
            className="lucide lucide-users w-5 h-5 text-white"
            aria-hidden="true"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <circle cx="9" cy="7" r="4"></circle>
          </svg>
        </div>
        <h3 className="text-xl lg:text-2xl font-light text-slate-900">
          Political
          <span className="font-normal text-red-700 ml-2">Life</span>
        </h3>
      </div>

      {/* Content */}
      <div className="bg-white border border-red-200 p-8 shadow-sm">
        <div className="prose max-w-none">
          {politicalLife.map((paragraph, idx) => (
            <p key={idx} className="text-slate-600 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoliticalLife;