import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const VisitOfficeSection = ({ contactData }) => {
  const [coords, setCoords] = useState([27.7172, 85.3240]); // Default Kathmandu
console.log(contactData,"this is mine contactdata")
  const city = contactData.cityState || 'Kathmandu, Nepal';
  const popupContent = contactData?.visitDescription.replace('Interactive Map\n', '') || city;
  const heading = contactData.visitHeading;

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
        );
        const data = await res.json();
        if (data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch (error) {
        console.error('Failed to fetch coordinates:', error);
      }
    };
    fetchCoords();
  }, [city]);

  // Highlights from data
  const highlights = [
    { value: contactData.location, label: 'Location' },
    { value: 'Accessible', label: contactData.Accessible },
    { value: 'Parking', label: contactData.Parking },
  ];

  return (
    <section className="py-20 bg-red-800">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center transform transition-all duration-1000 delay-700 translate-y-0 opacity-100">
          <h3 className="text-2xl lg:text-3xl font-light text-white mb-6">
            Visit Our
            <span className="font-normal text-red-300 ml-2">Office</span>
          </h3>
          <div className="w-16 h-0.5 bg-red-400 mx-auto mb-8"></div>
          <p className="text-red-300 leading-relaxed text-lg mb-12 max-w-2xl mx-auto">
            {heading}
          </p>
        </div>

        {/* Map / Location */}
        <div className="mb-8 border border-red-600 rounded overflow-hidden">
          <MapContainer center={coords} zoom={15} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={coords}>
              <Popup>{popupContent}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Office Highlights */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {highlights.map((hl, idx) => (
            <div key={idx}>
              <div className="text-2xl font-light text-white mb-2">{hl.value}</div>
              <div className="text-sm text-red-400 tracking-wide uppercase">{hl.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisitOfficeSection;