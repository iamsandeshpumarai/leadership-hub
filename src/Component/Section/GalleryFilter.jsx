import React, { useState } from "react";

const GalleryFilter = ({ galleryData }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  // Extract unique categories from the data
  const categories = ["All", ...new Set(galleryData.map((item) => item.category))];

  // Filter data based on active category
  const filteredData =
    activeCategory === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);

  return (
    <section className="py-16 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 font-medium text-sm tracking-wide transition-all duration-200 ${
                activeCategory === category
                  ? "bg-red-800 text-white shadow-md"
                  : "bg-white text-slate-600 hover:text-red-700 border border-red-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">No items to display</p>
          ) : (
            filteredData.map((event) => (
              <div
                key={event._id} // Use MongoDB _id as key
                className="group cursor-pointer transform transition-all duration-500 opacity-100"
              >
                <div className="bg-white border border-red-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-red-200">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={event.image} // API image
                    />
                    <div className="absolute inset-0 bg-red-900/0 group-hover:bg-red-900/20 transition-all duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-800 text-white px-3 py-1 text-xs font-medium tracking-wide uppercase">
                        {event.category} {/* API category */}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-slate-900 mb-3 group-hover:text-red-800 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-slate-500">
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
                          className="lucide lucide-calendar w-4 h-4 mr-2 text-red-500"
                          aria-hidden="true"
                        >
                          <path d="M8 2v4"></path>
                          <path d="M16 2v4"></path>
                          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                          <path d="M3 10h18"></path>
                        </svg>
                        {event.year} {/* API year */}
                      </div>
                      <div className="flex items-center text-sm text-slate-500">
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
                          className="lucide lucide-map-pin w-4 h-4 mr-2 text-red-500"
                          aria-hidden="true"
                        >
                          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {event.location} {/* API location */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default GalleryFilter;
