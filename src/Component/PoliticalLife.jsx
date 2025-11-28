import React from "react";

// Content for Political Life
const politicalLifeContent = [
  "On April 12, 2007, Janamorcha Nepal, of which he was then a vice-chairman, nominated him as the new Minister of Health. Pokharel was appointed to the said position on April 29, 2007. In April 2008, he won the Mahottari-1 seat in the Constituent Assembly election as a candidate of Janamorcha Nepal (People's Front Nepal).",
  "He then served a second term as Minister of Health and Population, in the government formed under the leadership of the Communist Party of Nepal (Maoist) after it won the most seats in the Constituent Assembly election. Pokharel's second term as Minister of Health and Population was from 31 August 2008 until 4 May 2009, when then Prime Minister Pushpa Kamal Dahal (Prachanda) resigned along with his cabinet and dissolved the government.",
  "After the unification of the two parties, Pokharel was elected to the party's Standing Committee. He is also in-charge of the party's Health Department, continuing his commitment to public health and social welfare."
];

const PoliticalLife = () => {
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
          {politicalLifeContent.map((paragraph, idx) => (
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
