import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PassportSizePhoto from '../assets/image/smallpic.jpg'; // Fallback image if needed
import PoliticalPositions from '../Component/PoliticalPositionData';
import PoliticalAffiliationsAndAchievements from '../Component/PoliticalAffiliation';
import PoliticalLife from '../Component/PoliticalLife';
import { fetchBioData } from '../../utils/fetchData';


const calculateAge = (birthDateStr) => {
  const today = new Date();
  const birthDate = new Date(birthDateStr);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const Biography = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['bio'],
    queryFn: fetchBioData
  });
console.log(data?.data.data[0] , "this si the biodata")
  if (isLoading) return <div className="text-center mt-[100px]">Loading...</div>;
  if (error) return <div className="text-center mt-[100px] text-red-600">Error: {error.message}</div>;

  const bornDisplay = `${new Date(data?.data.data[0].profile.birthDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} (age ${calculateAge(data?.data.data[0].profile.birthDate)})`;

  return (
    <>
      <div className="biography-section mt-[100px] w-[85%] mx-auto">
        {/* --- Political Biography Badge --- */}
        <div className="text-center transform transition-all duration-1000 translate-y-0 opacity-100">
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
              className="lucide lucide-user w-4 h-4 text-red-800 mr-2"
              aria-hidden="true"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="text-red-800 font-medium text-sm tracking-wide">
              POLITICAL BIOGRAPHY
            </span>
          </div>

          {/* --- Profile Image --- */}
          <div className="w-40 h-40 bg-gradient-to-br from-red-50 to-red-100 rounded-full mx-auto mb-8 flex items-center justify-center border-4 border-red-800">
            <img
              className="rounded-full object-cover object-center w-full h-full"
              alt={`${data?.data.data[0].profile.firstName} ${data?.data.data[0].profile.lastName}`}
              src={data?.data.data[0].profile.photoUrl || PassportSizePhoto}
            />
          </div>

          {/* --- Name --- */}
          <h1 className="text-4xl lg:text-5xl font-light text-slate-900 mb-6 leading-tight">
            {data?.data.data[0].profile.firstName}<br />
            <span className="font-normal text-red-700">{data?.data.data[0].profile.lastName}</span>
          </h1>

          {/* --- Divider --- */}
          <div className="w-16 h-0.5 bg-white0 mx-auto mb-8"></div>

          {/* --- Basic Info Cards --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white border border-red-200 p-4 text-center">
              <div className="text-sm text-red-800 font-medium tracking-wider uppercase mb-2">
                Born
              </div>
              <div className="text-red-900">{bornDisplay}</div>
            </div>

            <div className="bg-white border border-red-200 p-4 text-center">
              <div className="text-sm text-red-800 font-medium tracking-wider uppercase mb-2">
                Birthplace
              </div>
              <div className="text-red-900">{data?.data.data[0].profile.birthPlace}</div>
            </div>

            <div className="bg-white border border-red-200 p-4 text-center">
              <div className="text-sm text-red-800 font-medium tracking-wider uppercase mb-2">
                Residence
              </div>
              <div className="text-red-900">{data?.data.data[0].profile.residence}</div>
            </div>
          </div>

          {/* --- Biography Paragraph --- */}
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
            {data.biographyDesc}
          </p>

          {/* --- Stats --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-light text-red-800 mb-2">{data?.data.data[0].stats.ministerialPositions}</div>
              <div className="text-sm text-red-600 font-medium tracking-wider uppercase">
                Ministerial Positions
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-light text-red-800 mb-2">{data?.data.data[0].stats.yearsInPolitics}</div>
              <div className="text-sm text-red-600 font-medium tracking-wider uppercase">
                Years in Politics
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-light text-red-800 mb-2">{data?.data.data[0].stats.mpStatus}</div>
              <div className="text-sm text-red-600 font-medium tracking-wider uppercase">
                MP Status
              </div>
            </div>
          </div>
        </div>
        <div className="mb-16 transform transition-all duration-1000 translate-y-0 opacity-100 mt-5">
          {/* --- Section Header --- */}
          <div className="flex items-center gap-4 mb-6">
            {/* Icon Badge */}
            <div className="bg-red-800 p-2">
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
                className="lucide lucide-building w-5 h-5 text-white"
                aria-hidden="true"
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
            </div>

            {/* Section Title */}
            <h2 className="text-2xl lg:text-3xl font-light text-slate-900">
              Political
              <span className="font-normal text-red-700 ml-2">Positions</span>
            </h2>
          </div>

          {/* Section Description */}
          <p className="text-red-900 leading-relaxed max-w-2xl">
            {data.politicalPositionDesc}
          </p>
        </div>
        <PoliticalPositions positions={data?.data.data[0].politicalPositions} />
        <PoliticalAffiliationsAndAchievements 
          affiliations={data?.data.data[0].politicalAffiliations}
          achievements={data?.data.data[0].keyAchievements}
        />
        <PoliticalLife politicalLife={data?.data.data[0].politicalLife} />
      </div>
    </>
  );
};

export default Biography;