import React from "react";

const pastEventsData = [
  {
    id: 1,
    title: "Clean City Campaign",
    date: "Saturday, June 28, 2025",
    day: "28",
    month: "Jun",
    description: "Join our movement to clean and beautify our city with local volunteers.",
    status: "Past Event",
  },
  {
    id: 2,
    title: "Health Check-up Camp",
    date: "Saturday, July 5, 2025",
    day: "5",
    month: "Jul",
    description: "Free health check-up camp organized for underprivileged families.",
    status: "Past Event",
  },
  {
    id: 3,
    title: "Youth Empowerment Rally",
    date: "Thursday, July 10, 2025",
    day: "10",
    month: "Jul",
    description: "A large-scale rally focused on empowering the youth with skills and opportunities.",
    status: "Past Event",
  },
];

const PastEvents = () => {
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
        {pastEventsData.map((event, index) => (
          <div
            key={event.id}
            className={`transform transition-all duration-1000 delay-${index * 100} translate-y-0 opacity-100`}
          >
            <div className="bg-white border border-red-200 hover:shadow-lg transition-all duration-300 overflow-hidden group opacity-75">
              <div className="relative h-48 bg-gradient-to-br from-white to-red-50 overflow-hidden">
                {/* Event Image Placeholder */}
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

                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white shadow-sm border border-red-200 p-3 text-center bg-red-100">
                  <div className="text-2xl font-light text-red-600 leading-none">{event.day}</div>
                  <div className="text-xs font-medium tracking-wide uppercase text-red-500">{event.month}</div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-xs font-medium tracking-wide uppercase">
                  {event.status}
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-medium mb-2 group-hover:text-red-900 transition-colors text-red-600">
                    {event.title}
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
                    {event.date}
                  </div>
                </div>
                <p className="leading-relaxed mb-6 text-red-500">{event.description}</p>
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
