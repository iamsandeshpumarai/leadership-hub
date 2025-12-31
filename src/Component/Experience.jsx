import React from 'react'
import ExperienceCard from './ExperienceCard'

const Experience = ({expndata}) => {
  
 const DEFAULT_EXPN_DATA = {
  politicalHighlihtTitle: "Party Leadership",
  headerTag: "EXPERIENCE & LEADERSHIP",
  headerTitle: "A Legacy of",
  headerHighlight: "Public Services",
  headerDescription:
    "From healthcare ministry to constitutional development, a distinguished career spanning multiple government formations and party leadership roles, dedicated to serving Nepal's democratic progress.",

  cards: [
    {
      title: "Minister of Health and Population",
      organization: "Government of Nepal",
      period: "2007-2009",
      icon: "heart",
      description:
        "Led national healthcare initiatives and population policies. Served two terms under different government formations.",
      keyAchievements: [
        { text: "Healthcare Policy Reform" },
        { text: "Population Management" },
        { text: "Public Health Initiatives" }
      ],
      order: 0
    },
    {
      title: "Member of Constituent Assembly",
      organization: "Mahottari-1 Constituency",
      period: "2008",
      icon: "building",
      description:
        "Elected representative contributing to Nepal's constitutional framework and democratic transition.",
      keyAchievements: [
        { text: "Constitutional Development" },
        { text: "Democratic Governance" },
        { text: "Legislative Leadership" }
      ],
      order: 1
    }
  ],

  politicalFirstTitle: "Political Journey",
  politicalJourney:
    "Giriraj Mani Pokharel's political career reflects Nepal's democratic evolution.",

  timeline: [
    { year: "2007", label: "First Ministerial Appointment" },
    { year: "2009", label: "Party Unification Leadership" },
    { year: "Present", label: "Senior Party Leadership" }
  ]
};

  const data = expndata || DEFAULT_EXPN_DATA

    return (
        <>
        
        <div>
  <section id="experience" class="relative py-20 bg-white">
    <div class="w-full max-w-7xl mx-auto px-6 lg:px-8">


      <div class="text-center mb-16 transform transition-all duration-1000 translate-y-0 opacity-100">
        <div class="inline-flex items-center bg-white border border-red-200 px-4 py-2 rounded-sm mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
               viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-shield w-4 h-4 text-red-600 mr-2">
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
          </svg>
          <span class="text-red-700 font-medium text-sm tracking-wide">
            {data?.headerTag}
          </span>
        </div>

        <h2 class="text-3xl lg:text-4xl font-light text-slate-900 mb-6">
          {data?.headerTitle}
          <span class="font-normal text-red-800 ml-2">{data?.headerHighlight}</span>
        </h2>

        <div class="w-16 h-0.5 bg-white0 mx-auto mb-6"></div>

        <p class="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {data?.headerDescription}
        </p>
      </div>

      {/* <!-- GRID OF EXPERIENCE CARDS --> */}
     
<ExperienceCard listexpn={expndata?.cards}/>
      {/* <!-- BOTTOM POLITICAL TIMELINE SECTION --> */}
      <div class="mt-16 bg-red-900 p-8 lg:p-12 transform transition-all duration-1000 delay-500 translate-y-0 opacity-100">
        <div class="max-w-4xl mx-auto text-center">

          <h3 class="text-2xl font-light text-white mb-6">
            {data?.politicalFirstTitle}
            <span class="font-normal text-red-200 ml-2">{data?.politicalHighlihtTitle}</span>
          </h3>

          <div class="w-16 h-0.5 bg-red-400 mx-auto mb-8"></div>

          <p class="text-red-100 leading-relaxed text-lg mb-8">
          {data?.politicalJourney}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
{
  data?.timeline.map((data,index)=>{
    return <>
                <div key={index}>
              <div class="text-3xl font-light text-white mb-2">{data.year}</div>
              <div class="text-sm text-red-300 tracking-wide uppercase">
                {data?.label}
              </div>
            </div>
    </>
  })
}


         

          </div>

        </div>
      </div>

    </div>
  </section>
</div>

        
        </>
          )
}

export default Experience
