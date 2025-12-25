import React, { useState } from "react";

const GalleryFilter = ({ galleryData }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null); // For the Detail View
  const [fullScreenImage, setFullScreenImage] = useState(null); // For the Lightbox

  // 1. Extract unique categories
  const categories = ["All", ...new Set(galleryData.map((item) => item.category))];

  // 2. Filter data
  const filteredData =
    activeCategory === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);

  // --- COMPONENT: LIGHTBOX (Full Window Image) ---
  const Lightbox = () => (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
      onClick={() => setFullScreenImage(null)}
    >
      <button className="absolute top-10 right-10 text-white text-4xl">&times;</button>
      <img 
        src={fullScreenImage} 
        className="max-w-full max-h-full object-contain shadow-2xl" 
        alt="Full View" 
      />
    </div>
  );

  // --- COMPONENT: DETAIL VIEW ---
  if (selectedEvent) {
    // Combine cover image and gallery images into one list for the detail view
    const allImages = [
      selectedEvent.coverImage || selectedEvent.image,
      ...(selectedEvent.galleryImages?.map(img => img.url) || [])
    ];

    return (
      <section className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back Button */}
          <button 
            onClick={() => setSelectedEvent(null)}
            className="mb-8 flex items-center text-red-800 font-bold hover:gap-2 transition-all"
          >
            ← Back to Gallery
          </button>

          {/* Header & Description */}
          <div className="mb-12 border-l-4 border-red-800 pl-6">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{selectedEvent.title}</h2>
            <div className="flex gap-4 text-sm text-slate-500 mb-6 uppercase tracking-widest">
                <span>{selectedEvent.category}</span>
                <span>•</span>
                <span>{selectedEvent.location}</span>
                <span>•</span>
                <span>{selectedEvent.year}</span>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">
              {selectedEvent.description}
            </p>
          </div>

          {/* Detailed Image Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {allImages.map((url, idx) => (
              <div 
                key={idx} 
                className="relative group cursor-zoom-in overflow-hidden rounded-lg shadow-sm"
                onClick={() => setFullScreenImage(url)}
              >
                <img 
                  src={url} 
                  alt={`Gallery ${idx}`} 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
        {fullScreenImage && <Lightbox />}
      </section>
    );
  }

  // --- MAIN COMPONENT: GRID VIEW ---
  return (
    <section className="py-16 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 font-medium text-sm transition-all duration-200 ${
                activeCategory === category
                  ? "bg-red-800 text-white shadow-lg"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-red-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.length === 0 ? (
            <p className="text-center col-span-full text-gray-400 py-20">No items found in this category.</p>
          ) : (
            filteredData.map((event) => (
              <div
                key={event._id}
                onClick={() => setSelectedEvent(event)} // Trigger Detail View
                className="group cursor-pointer bg-white border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={event.coverImage || event.image} // Handles both schemas
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-800 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-tighter">
                      {event.category}
                    </span>
                  </div>
                  {/* Image Count Badge */}
                  {event.galleryImages?.length > 0 && (
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white text-[10px] px-2 py-1 backdrop-blur-md">
                        +{event.galleryImages.length} Photos
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-800 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4">{event.description}</p>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>{event.location}</span>
                    <span className="text-red-700">{event.year}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {fullScreenImage && <Lightbox />}
    </section>
  );
};

export default GalleryFilter;