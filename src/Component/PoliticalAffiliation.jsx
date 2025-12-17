import React from "react";

// Icon component for reuse
const Icon = ({ type }) => {
  switch (type) {
    case "flag":
      return (
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
          className="lucide lucide-flag w-5 h-5 text-white"
          aria-hidden="true"
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
          <line x1="4" x2="4" y1="22" y2="15"></line>
        </svg>
      );
    case "award":
      return (
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
          className="lucide lucide-award w-5 h-5 text-white"
          aria-hidden="true"
        >
          <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
          <circle cx="12" cy="8" r="6"></circle>
        </svg>
      );
    default:
      return null;
  }
};

const PoliticalAffiliationsAndAchievements = ({ affiliations = [], achievements = [] }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-16">
      {/* Political Affiliations Section */}
      <div className="transform transition-all duration-1000 delay-300 translate-y-0 opacity-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-red-800 p-2">
            <Icon type="flag" />
          </div>
          <h3 className="text-xl lg:text-2xl font-light text-slate-900">
            Political
            <span className="font-normal text-red-700 ml-2">Affiliations</span>
          </h3>
        </div>
        <div className="space-y-4">
          {affiliations.map((affiliation, idx) => (
            <div key={idx} className="border-l-4 border-red-300 pl-6 pb-4">
              <h4 className="font-medium text-red-900 mb-1">{affiliation.name}</h4>
              <p className="text-red-800 text-sm">{affiliation.period}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Achievements Section */}
      <div className="transform transition-all duration-1000 delay-400 translate-y-0 opacity-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-red-800 p-2">
            <Icon type="award" />
          </div>
          <h3 className="text-xl lg:text-2xl font-light text-slate-900">
            Key
            <span className="font-normal text-red-700 ml-2">Achievements</span>
          </h3>
        </div>
        <div className="space-y-4">
          {achievements.map((achievement, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-800 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-red-800 leading-relaxed">{achievement}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoliticalAffiliationsAndAchievements;