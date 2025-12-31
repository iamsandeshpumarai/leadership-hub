import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../../utils/fetchData";
import Loading from "../../Shared/Loading";

// --- Default / Fallback Data ---
const defaultEventsData = [
  
    {
        "_id": "69549d47b8448f9a7aa2aec3",
        "title": "Address at Global ICT Leadership Forum (Education Promotion)",
        "date": "2018-11-16T00:00:00.000Z",
        "day": "16",
        "month": "Nov",
        "description": "Spoke at ICT Forum in Seoul promoting Nepal’s education and technologies  initiatives.",
        "status": "Past Event",
        "imageUrl": "",
        "createdAt": "2025-12-31T03:49:27.233Z",
        "updatedAt": "2025-12-31T03:51:17.536Z",
        "__v": 0
    },
    {
        "_id": "69549d6eb8448f9a7aa2aec6",
        "title": "Handing Over Reconstructed School Building (Post-Earthquake)",
        "date": "2018-04-26T00:00:00.000Z",
        "day": "26",
        "month": "Apr",
        "description": "Inaugurated reconstructed earthquake-resistant school in Gorkha, emphasizing safety and modern facilities.",
        "status": "Past Event",
        "imageUrl": "",
        "createdAt": "2025-12-31T03:50:06.169Z",
        "updatedAt": "2025-12-31T03:50:06.169Z",
        "__v": 0
    },
    {
        "_id": "69549d95b8448f9a7aa2aec9",
        "title": "Visit & Support for Gaushala Engineering College",
        "date": "2024-01-11T00:00:00.000Z",
        "day": "11",
        "month": "Jan",
        "description": "Visited Gaushala Engineering College to support civil engineering programs and higher education.",
        "status": "Past Event",
        "imageUrl": "",
        "createdAt": "2025-12-31T03:50:45.408Z",
        "updatedAt": "2025-12-31T03:50:45.408Z",
        "__v": 0
    },
    {
        "_id": "69549e53b8448f9a7aa2aee6",
        "title": "Organizational Strengthening & Public Outreach Campaign",
        "date": "2023-03-04T00:00:00.000Z",
        "day": "4",
        "month": "Mar",
        "description": "Inaugurated party-level outreach campaign in Mechinagar, promoting community engagement and addressing local inequality issues.",
        "status": "Past Event",
        "imageUrl": "",
        "createdAt": "2025-12-31T03:53:55.957Z",
        "updatedAt": "2025-12-31T03:53:55.957Z",
        "__v": 0
    },
    {
        "_id": "69549e72b8448f9a7aa2aee9",
        "title": "CPN (Maoist Centre) Central Committee Meeting Announcement",
        "date": "2022-06-03T00:00:00.000Z",
        "day": "3",
        "month": "Jun",
        "description": "Announced virtual Central Committee meeting after nationwide leader training, focusing on committee finalization.",
        "status": "Past Event",
        "imageUrl": "",
        "createdAt": "2025-12-31T03:54:26.766Z",
        "updatedAt": "2025-12-31T03:54:26.766Z",
        "__v": 0
    },
    {
        "_id": "69549e92b8448f9a7aa2aeec",
        "title": "Teach For Nepal Children’s Day Event",
        "date": "2019-09-15T00:00:00.000Z",
        "day": "15",
        "month": "Sep",
        "description": "Served as chief guest promoting volunteer teaching and rural education on National Children’s Day.",
        "status": "Past Event",
        "imageUrl": "",
        "createdAt": "2025-12-31T03:54:58.547Z",
        "updatedAt": "2025-12-31T03:54:58.547Z",
        "__v": 0
    }

];

// --- Fetch Function ---


const PastEvents = () => {
  // Using useQuery to fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["event"],
    queryFn: fetchEvents,
    // Use the old hardcoded data as initial placeholder while fetching
    // or if the fetch fails
    // initialData: defaultEventsData, 
  });

  // Decide which data to render (API data or Default)
  // If the API returns an empty array (length 0), we might still want to show default data?
  // For now, standard behavior is: if API succeeds, show API data.
  const displayEvents =  data?.data.data || defaultEventsData;

  // Helper to format ISO dates (like 2025-10-28...) to readable strings
  const formatDate = (dateString) => {
    if (!dateString) return "";
    // If it's already formatted (like in default data), just return it
    if (dateString.includes(",")) return dateString;
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
 
if(isLoading) {
  return <Loading/>
}
  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
 
 
      {/* Section Header */}
      <div className="mb-16 transform transition-all duration-1000 delay-300 translate-y-0 opacity-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-red-600 p-2">
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
              className="lucide lucide-calendar w-5 h-5 text-white"
              aria-hidden="true"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
          </div>
          <h2 className="text-2xl lg:text-3xl font-light text-red-900">
            Past<span className="font-normal text-red-700 ml-2">Events</span>
          </h2>
        </div>
        <p className="text-red-600 leading-relaxed max-w-2xl">
          Explore our recent community initiatives and successful events that have made a positive impact.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {displayEvents?.map((event, index) => (
          <div
            // Use _id from MongoDB or id from static data
            key={event?._id || event?.id || index}
            className={`transform transition-all duration-1000 delay-${index * 100} translate-y-0 opacity-100`}
          >
            <div className="bg-white border border-red-200 hover:shadow-lg transition-all duration-300 overflow-hidden group opacity-75 hover:opacity-100">
              
              {/* --- IMAGE SECTION --- */}
              <div className="relative h-48 bg-gradient-to-br from-white to-red-50 overflow-hidden">
                
                {/* Check if imageUrl exists */}
                {event?.imageUrl ? (
                  <img 
                    src={event.imageUrl} 
                    alt={event?.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  /* --- NO IMAGE PLACEHOLDER (Your Custom SVG) --- */
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-red-500 text-center">
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
                        className="lucide lucide-megaphone w-12 h-12 mx-auto mb-2"
                        aria-hidden="true"
                      >
                        <path d="m3 11 18-5v12L3 14v-3z"></path>
                        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                      </svg>
                      <p className="text-sm">Event Image</p>
                    </div>
                  </div>
                )}

                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white shadow-sm border border-red-200 p-3 text-center bg-red-100 min-w-[60px]">
                  <div className="text-2xl font-light text-red-600 leading-none">
                    {event?.day}
                  </div>
                  <div className="text-xs font-medium tracking-wide uppercase text-red-500">
                    {event?.month}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-xs font-medium tracking-wide uppercase shadow-md">
                  {event?.status || "Past Event"}
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-medium mb-2 group-hover:text-red-900 transition-colors text-red-600 line-clamp-1">
                    {event?.title}
                  </h3>
                  <div className="flex items-center text-sm text-red-500 mb-3">
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
                    {/* Format the date cleanly */}
                    {formatDate(event?.date)}
                  </div>
                </div>
                <p className="leading-relaxed mb-6 text-red-500 line-clamp-3">
                  {event?.description}
                </p>
                <button className="flex items-center gap-2 font-medium tracking-wide transition-all duration-200 text-red-500 cursor-default">
                  Event Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastEvents;