import React from "react";
import { useQuery } from "@tanstack/react-query";
import PassportSizePhoto from "../assets/image/smallpic.jpg";
import PoliticalPositions from "../Component/PoliticalPositionData";
import PoliticalAffiliationsAndAchievements from "../Component/PoliticalAffiliation";
import PoliticalLife from "../Component/PoliticalLife";
import { fetchBioData } from "../../utils/fetchData";
import Loading from "../Shared/Loading";
import { Navigate } from "react-router-dom";

/* -------------------- DEFAULT DATA -------------------- */
const DEFAULT_BIO_DATA = {
  profile: {
    firstName: "Giriraj Mani",
    lastName: "Pokharel",
    photoUrl: PassportSizePhoto,
    birthDate: "1995-01-01",
    birthPlace: "Khotang, Nepal",
    residence: "Kathmandu, Nepal"
  },
  stats: {
    ministerialPositions: "2",
    yearsInPolitics: "15+",
    mpStatus: "Current"
  },
  biographyDesc: "Loading biography...",
  politicalPositionDesc: "Loading political positions...",
  politicalPositions: [],
  politicalAffiliations: [],
  keyAchievements: [],
  politicalLife: []
};

/* -------------------- HELPERS -------------------- */
const calculateAge = (birthDateStr) => {
  if (!birthDateStr) return "-";
  const today = new Date();
  const birthDate = new Date(birthDateStr);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

/* -------------------- COMPONENT -------------------- */
const Biography = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bio"],
    queryFn: fetchBioData
  });

  // Extract API data safely
  const apiBio = data?.data?.data?.[0];

  // Merge DEFAULT + API data
  const bioData = {
    ...DEFAULT_BIO_DATA,
    ...apiBio,
    profile: {
      ...DEFAULT_BIO_DATA.profile,
      ...apiBio?.profile
    },
    stats: {
      ...DEFAULT_BIO_DATA.stats,
      ...apiBio?.stats
    }
  };

  const bornDisplay = bioData.profile.birthDate
    ? `${new Date(bioData.profile.birthDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
      })} (age ${calculateAge(bioData.profile.birthDate)})`
    : "—";

  if (error) return <Navigate to="/" />;

  return (
    <>
      {isLoading && <Loading />}

      <div className="biography-section mt-[100px] w-[85%] mx-auto">
        {/* BADGE */}
        <div className="text-center">
          <div className="inline-flex items-center bg-white border border-red-200 px-4 py-2 rounded-sm mb-8">
            <span className="text-red-800 font-medium text-sm tracking-wide">
              POLITICAL BIOGRAPHY
            </span>
          </div>

          {/* PROFILE IMAGE */}
          <div className="w-40 h-40 rounded-full mx-auto mb-8 border-4 border-red-800 overflow-hidden">
            <img
              src={bioData.profile.photoUrl}
              alt={`${bioData.profile.firstName} ${bioData.profile.lastName}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* NAME */}
          <h1 className="text-4xl lg:text-5xl font-light text-slate-900 mb-6">
            {bioData.profile.firstName}
            <br />
            <span className="font-normal text-red-700">
              {bioData.profile.lastName}
            </span>
          </h1>

          {/* BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <InfoCard label="Born" value={bornDisplay} />
            <InfoCard label="Birthplace" value={bioData.profile.birthPlace} />
            <InfoCard label="Residence" value={bioData.profile.residence} />
          </div>

          {/* BIO */}
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12">
            {bioData.biographyDesc}
          </p>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <Stat value={bioData.stats.ministerialPositions} label="Ministerial Positions" />
            <Stat value={bioData.stats.yearsInPolitics} label="Years in Politics" />
            <Stat value={bioData.stats.mpStatus} label="MP Status" />
          </div>
        </div>

        {/* POLITICAL POSITIONS */}
        <SectionTitle title="Political" highlight="Positions" />
        <p className="text-red-900 max-w-2xl mb-6">
          {bioData.politicalPositionDesc}
        </p>

        <PoliticalPositions positions={bioData.politicalPositions} />

        {/* AFFILIATIONS & ACHIEVEMENTS */}
        <PoliticalAffiliationsAndAchievements
          affiliations={bioData.politicalAffiliations}
          achievements={bioData.keyAchievements}
        />

        {/* POLITICAL LIFE */}
        <PoliticalLife politicalLife={bioData.politicalLife} />
      </div>
    </>
  );
};

/* -------------------- SMALL COMPONENTS -------------------- */

const InfoCard = ({ label, value }) => (
  <div className="bg-white border border-red-200 p-4 text-center">
    <div className="text-sm text-red-800 font-medium uppercase mb-2">
      {label}
    </div>
    <div className="text-red-900">{value}</div>
  </div>
);

const Stat = ({ value, label }) => (
  <div className="text-center">
    <div className="text-3xl font-light text-red-800 mb-2">{value}</div>
    <div className="text-sm text-red-600 font-medium uppercase">
      {label}
    </div>
  </div>
);

const SectionTitle = ({ title, highlight }) => (
  <div className="flex items-center gap-4 mb-6 mt-16">
    <h2 className="text-2xl lg:text-3xl font-light text-slate-900">
      {title}
      <span className="font-normal text-red-700 ml-2">{highlight}</span>
    </h2>
  </div>
);

export default Biography;
