import React from "react";

// Author feature data
const authorFeatures = [
  {
    icon: (
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
        className="lucide lucide-award w-8 h-8 text-red-300 mx-auto mb-2"
        aria-hidden="true"
      >
        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
        <circle cx="12" cy="8" r="6"></circle>
      </svg>
    ),
    title: "Former Minister",
  },
  {
    icon: (
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
        className="lucide lucide-book-open w-8 h-8 text-red-300 mx-auto mb-2"
        aria-hidden="true"
      >
        <path d="M12 7v14"></path>
        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
      </svg>
    ),
    title: "Published Author",
  },
  {
    icon: (
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
        className="lucide lucide-award w-8 h-8 text-red-300 mx-auto mb-2"
        aria-hidden="true"
      >
        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
        <circle cx="12" cy="8" r="6"></circle>
      </svg>
    ),
    title: "Political Leader",
  },
];

const AboutAuthor = () => {
  return (
    <section className="mt-12 mb-12 bg-red-900 p-8 lg:p-12 transform transition-all duration-1000 delay-500 translate-y-0 opacity-100">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Title */}
        <h3 className="text-2xl font-light text-white mb-6">
          About the
          <span className="font-normal text-red-200 ml-2">Author</span>
        </h3>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-red-400 mx-auto mb-8"></div>

        {/* Author Description */}
        <p className="text-red-100 leading-relaxed text-lg mb-8">
          Giriraj Mani Pokharel brings decades of political experience to his
          writing, having served as Minister of Health and Population, Member
          of the Constituent Assembly, and in various party leadership roles.
          His books offer unique insights into Nepal's democratic transition,
          healthcare reform, and political leadership.
        </p>

        {/* Author Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {authorFeatures.map((feature, index) => (
            <div key={index}>
              {/* Feature Icon */}
              {feature.icon}

              {/* Feature Title */}
              <div className="text-sm text-red-300 tracking-wide uppercase">
                {feature.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutAuthor;
