import React from "react";

// NewsCard Component - Single News Item
const NewsCard = ({ news }) => {
  return (
    <div className="transform transition-all duration-1000 delay-0 tranred-y-0 opacity-100">
      <div className="bg-white border border-red-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
        <div className="flex">
          {/* Icon Section */}
          <div className="w-1/3 h-32 bg-gradient-to-br from-red-200 to-red-300 flex items-center justify-center">
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
              className="lucide lucide-newspaper w-8 h-8 text-red-500"
              aria-hidden="true"
            >
              <path d="M15 18h-5"></path>
              <path d="M18 14h-8"></path>
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"></path>
              <rect width="8" height="4" x="10" y="6" rx="1"></rect>
            </svg>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4">
            <div className="mb-2">
              <h3 className="text-lg font-medium text-red-800 mb-1 group-hover:text-red-900 transition-colors leading-tight">
                {news.title}
              </h3>
              <div className="flex items-center text-xs text-red-500 mb-2">
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
                  className="lucide lucide-clock w-3 h-3 mr-1"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {news.timeAgo}
              </div>
            </div>
            <p className="text-red-600 text-sm leading-relaxed mb-3 line-clamp-2">
              {news.description}
            </p>
            <button className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium transition-colors">
              Read More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// NewsArchive Component - Render All News
const NewsArchive = () => {
  // Array of news objects
  const newsList = [
    {
      title: "Giriraj Pani Pokhrel Visits Rural Schools",
      timeAgo: "5 months ago",
      description:
        "The politician visited several rural schools to assess educational needs and distribute supplies.",
    },
    {
      title: "Interview on National Development",
      timeAgo: "5 months ago",
      description:
        "A recent interview discussing plans for national infrastructure and development goals.",
    },
    {
      title: "Women's Safety Initiative Launched",
      timeAgo: "5 months ago",
      description:
        "New initiatives were launched to promote women's safety across all regions.",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
      <div className="mb-16 transform transition-all duration-1000 delay-300 tranred-y-0 opacity-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-red-700 p-2">
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
              className="lucide lucide-book-open w-5 h-5 text-white"
              aria-hidden="true"
            >
              <path d="M12 7v14"></path>
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
            </svg>
          </div>
          <h2 className="text-2xl lg:text-3xl font-light text-red-900">
            News
            <span className="font-normal text-red-700 ml-2">Archive</span>
          </h2>
        </div>
        <p className="text-red-600 leading-relaxed max-w-2xl">
          Browse through our comprehensive archive of past news articles,
          interviews, and media coverage.
        </p>
      </div>

      {/* Render News Cards */}
      <div className="grid gap-4">
        {newsList.map((news, index) => (
          <NewsCard key={index} news={news} />
        ))}
      </div>
    </div>
  );
};

export default NewsArchive;
