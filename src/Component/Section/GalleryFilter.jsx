import React, { useState } from "react";
import { X, Play } from "lucide-react"; // Helpful icons

const GalleryFilter = ({ galleryData }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [fullScreenMedia, setFullScreenMedia] = useState(null); // Changed to object {url, type}

  const categories = ["All", ...new Set(galleryData.map((item) => item.category))];

  const filteredData = activeCategory === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);

  // --- COMPONENT: LIGHTBOX (Supports Video & Image) ---
  const Lightbox = () => (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
      onClick={() => setFullScreenMedia(null)}
    >
      <button className="absolute top-10 right-10 text-white hover:text-red-500 transition-colors">
        <X size={40} />
      </button>
      
      <div className="max-w-7xl w-full flex justify-center" onClick={e => e.stopPropagation()}>
        {fullScreenMedia.type === "video" ? (
          <video 
            src={fullScreenMedia.url} 
            controls 
            autoPlay 
            className="max-h-[85vh] rounded-lg shadow-2xl"
          />
        ) : (
          <img 
            src={fullScreenMedia.url} 
            className="max-h-[85vh] object-contain shadow-2xl rounded-lg" 
            alt="Full View" 
          />
        )}
      </div>
    </div>
  );

  // --- COMPONENT: DETAIL VIEW ---
  if (selectedEvent) {
    // 1. Fixed Property: using galleryFiles instead of galleryImages
    const allMedia = [
      { url: selectedEvent.coverImage, type: "image" },
      ...(selectedEvent.galleryFiles || [])
    ];

    return (
      <section className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <button 
            onClick={() => setSelectedEvent(null)}
            className="mb-8 flex items-center text-red-800 font-bold hover:translate-x-[-4px] transition-transform"
          >
            ← Back to Gallery
          </button>

          <div className="mb-12 border-l-4 border-red-800 pl-6">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{selectedEvent.title}</h2>
            <div className="flex gap-4 text-xs text-slate-500 mb-6 uppercase tracking-[0.2em]">
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

          {/* Detailed Media Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {allMedia.map((item, idx) => (
              <div 
                key={idx} 
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md bg-white"
                onClick={() => setFullScreenMedia({ url: item.url, type: item.type })}
              >
                {item.type === "video" ? (
                  <div className="relative aspect-video bg-slate-900 flex items-center justify-center">
                    <video src={item.url} className="w-full h-full object-cover opacity-60" muted />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="bg-red-800 p-4 rounded-full text-white shadow-xl group-hover:scale-110 transition-transform">
                          <Play size={24} fill="white" />
                       </div>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={item.url} 
                    alt={`Gallery ${idx}`} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
        {fullScreenMedia && <Lightbox />}
      </section>
    );
  }

  // --- MAIN COMPONENT: GRID VIEW ---
  return (
    <section className="py-16 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-2.5 font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-full border ${
                activeCategory === category
                  ? "bg-red-800 text-white border-red-800 shadow-xl"
                  : "bg-white text-slate-500 border-slate-200 hover:border-red-800 hover:text-red-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredData.length === 0 ? (
            <p className="text-center col-span-full text-slate-400 py-20 font-medium">No records found.</p>
          ) : (
            filteredData.map((event) => (
              <div
                key={event._id}
                onClick={() => setSelectedEvent(event)}
                className="group cursor-pointer bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 rounded-2xl border border-slate-50"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    src={event.coverImage} 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-800 text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest shadow-lg">
                      {event.category}
                    </span>
                  </div>
                  
                  {/* Fixed property: galleryFiles instead of galleryImages */}
                  {event.galleryFiles?.length > 0 && (
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                        +{event.galleryFiles.length} Media
                    </div>
                  )}
                </div>
                
                <div className="p-7">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-800 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-6">{event.description}</p>
                  <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest pt-4 border-t border-slate-100">
                    <span>{event.location}</span>
                    <span className="text-red-800">{event.year}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {fullScreenMedia && <Lightbox />}
    </section>
  );
};

export default GalleryFilter;