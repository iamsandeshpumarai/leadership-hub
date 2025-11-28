import React from "react";

// Array of political positions data
const politicalPositionsData = [
  {
    id: 1,
    title: "Minister of Education, Science and Technology",
    period: "16 March 2018 – 20 December 2020",
    icon: "building",
    badge: null,
    details: [
      { label: "President", value: "Bidhya Devi Bhandari" },
      { label: "PM", value: "Khadga Prasad Sharma Oli" },
      { label: "Preceded", value: "Chitra Lekha Yadav" },
      { label: "Succeeded", value: "Dhaniram Paudel" },
    ],
  },
  {
    id: 2,
    title: "Minister of Health and Population",
    period: "29 April 2007 – 4 May 2009",
    icon: "building",
    badge: null,
    details: [{ label: "PM", value: "Pushpa Kamal Dahal" }],
  },
  {
    id: 3,
    title: "Member of Parliament, Pratinidhi Sabha",
    period: "4 March 2018 – Present",
    icon: "users",
    badge: "Incumbent",
    details: [{ label: "Constituency", value: "Mahottari 1" }],
  },
  {
    id: 4,
    title: "Member of Constituent Assembly",
    period: "28 May 2008 – 14 October 2017",
    icon: "users",
    badge: null,
    details: [
      { label: "Constituency", value: "Mahottari 1" },
      { label: "Preceded", value: "Mahendra Yadav (as MP)" },
    ],
  },
];

// Component to render individual SVG icons
const Icon = ({ name }) => {
  switch (name) {
    case "building":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-building w-5 h-5 text-white"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
          <path d="M9 22v-4h6v4"></path>
          <path d="M8 6h.01"></path>
          <path d="M16 6h.01"></path>
          <path d="M12 6h.01"></path>
          <path d="M12 10h.01"></path>
          <path d="M12 14h.01"></path>
          <path d="M16 10h.01"></path>
          <path d="M16 14h.01"></path>
          <path d="M8 10h.01"></path>
          <path d="M8 14h.01"></path>
        </svg>
      );
    case "users":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-users w-5 h-5 text-white"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <circle cx="9" cy="7" r="4"></circle>
        </svg>
      );
    default:
      return null;
  }
};

const PoliticalPositions = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 mb-16">
      {politicalPositionsData.map((position, index) => (
        <div
          key={position.id}
          className={`transform transition-all duration-1000 delay-${index * 100} translate-y-0 opacity-100`}
        >
          <div className="bg-white border border-red-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
            {/* Card Header */}
            <div className="bg-gradient-to-br from-white to-red-50 p-6 border-b border-red-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="bg-red-800 p-2">
                    <Icon name={position.icon} />
                  </div>

                  {/* Title and Period */}
                  <div>
                    <h3 className="text-xl font-medium text-red-800 mb-1">
                      {position.title}
                    </h3>
                    <div className="flex items-center text-sm text-red-800">
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
                        className="lucide lucide-clock w-4 h-4 mr-2"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {position.period}
                    </div>
                  </div>
                </div>

                {/* Optional Badge */}
                {position.badge && (
                  <div className="bg-red-800 text-white px-3 py-1 text-xs font-medium tracking-wide uppercase">
                    {position.badge}
                  </div>
                )}
              </div>
            </div>

            {/* Card Details */}
            <div className="p-6">
              <div className="grid gap-4">
                {position.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {detail.icon && (
                      <detail.icon className="w-4 h-4 text-red-700" />
                    )}
                    <span className="text-sm font-medium text-red-700 w-24">
                      {detail.label}:
                    </span>
                    <span className="text-red-800">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PoliticalPositions;
