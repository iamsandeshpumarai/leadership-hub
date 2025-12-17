import React from 'react';

const experienceCards = [
  {
    id: 1,
    title: "Minister of Health and Population",
    organization: "Government of Nepal",
    period: "2007-2009",
    description:
      "Led national healthcare initiatives and population policies. Served two terms under different government formations.",
    icon: "heart",
    achievements: [
      "Healthcare Policy Reform",
      "Population Management",
      "Public Health Initiatives",
    ],
    badge: null, // optional badge
  },
  {
    id: 2,
    title: "Member of Constituent Assembly",
    organization: "Mahottari-1 Constituency",
    period: "2008",
    description:
      "Elected representative contributing to Nepal's constitutional framework and democratic transition.",
    icon: "building",
    achievements: [
      "Constitutional Development",
      "Democratic Governance",
      "Legislative Leadership",
    ],
    badge: null,
  },
  {
    id: 3,
    title: "Vice-Chairman",
    organization: "Janamorcha Nepal",
    period: "2007",
    description:
      "Senior leadership role in political party organization and strategic decision-making.",
    icon: "users",
    achievements: ["Party Leadership", "Strategic Planning", "Political Coordination"],
    badge: "VIP",
  },
  {
    id: 4,
    title: "Standing Committee Member",
    organization: "Unified Communist Party of Nepal (Maoist)",
    period: "2009-Present",
    description:
      "Key leadership position following party unification, overseeing health department operations.",
    icon: "award",
    achievements: [
      "Party Unification",
      "Health Department Leadership",
      "Policy Development",
    ],
    badge: null,
  },
];

const iconMap = {
  heart: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-red-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
      />
    </svg>
  ),
  building: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-red-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
    </svg>
  ),
  users: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-red-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  ),
  award: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-red-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
      <circle cx="12" cy="8" r="6" />
    </svg>
  ),
};

const ExperienceCard = ({listexpn}) => {
  console.log(listexpn,'this is the list of experience')
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {listexpn?.map((card, index) => (
        <div
          key={card.id}
          className={`transform transition-all duration-1000 delay-${index * 100} translate-y-0 opacity-100`}
        >
          <div className="bg-white p-8 h-full hover:shadow-lg transition-all duration-300 border border-red-100 hover:border-red-200">
            {/* ICON + HEADER */}
            <div className="flex items-start gap-4 mb-6">
              <div className="relative">
                <div className="bg-white p-3 shadow-sm border border-red-200 rounded-full w-12 h-12 flex items-center justify-center">
                  {iconMap[card.icon]}
                </div>
                {card.badge && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    {card.badge}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-medium text-slate-900 mb-1">{card.title}</h3>
                <p className="text-slate-600 font-medium mb-1">{card.organization}</p>
                <div className="flex items-center text-sm text-slate-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-2 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4M3 10h18M3 4h18v18H3z" />
                  </svg>
                  {card.period}
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-slate-600 mb-6 leading-relaxed">{card.description}</p>

            {/* ACHIEVEMENTS */}
            <div>
              <h4 className="text-sm font-medium text-slate-800 mb-3 tracking-wide uppercase">
                Key Achievements
              </h4>
              <div className="space-y-2">
                {card.keyAchievements.map((item, idx) => (
                  <div key={idx} className="flex items-center text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3"></div>
                    {item.text}
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

export default ExperienceCard;
