import React from 'react'
import { useNavigate } from 'react-router-dom'
import imageplaceholder from '../../assets/image/ministerphoto.jpg'
const Herosection = ({ herodata }) => {
    const navigate = useNavigate()

    // Destructuring or providing defaults from your specific JSON structure
    const tag = herodata?.headerTag || "EXPERIENCE & LEADERSHIP";
    const titleBase = herodata?.headerHalfTitle || "A Legacy of";
    const titleHighlight = herodata?.headerHighlight || "Public Service";
    const subtitle = herodata?.politicalHighlihtTitle || "Party Leadership";
    const description = herodata?.headerDescription || "From healthcare ministry to constitutional development, a distinguished career spanning multiple government formations and party leadership roles, dedicated to serving Nepal's democratic progress.";
    
    // Mapping Stats from the "cards" array or providing defaults
    const statYears = "15+"; // Defaulting as it's not a direct key in JSON
    const statTerms = "2";   // Based on your description "two terms"
    const statRoles = herodata?.cards?.length || "4";

    return (
        <div className="font-sans p-4 md:p-8 mt-[70px]">
            <div className="max-w-7xl mx-auto rounded-xl overflow-hidden">
                <div className="flex flex-col md:grid md:grid-cols-2 min-h-[70vh]">

                    {/* LEFT COLUMN: Content Section */}
                    <div className="p-6 md:p-12 lg:p-16 flex flex-col justify-center space-y-8">
                        
                        {/* Tag */}
                        <div className="inline-flex items-center text-red-700 text-sm font-semibold tracking-wider bg-red-50 py-1 px-3 rounded-full w-fit">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 fill-current" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {tag}
                        </div>

                        {/* Title Block */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
                            {titleBase} <span className="text-red-700">{titleHighlight}</span>
                        </h1>
                        
                        <p className="text-xl font-medium text-gray-700">
                            {subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-lg text-gray-500 max-w-lg">
                            {description}
                        </p>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            <div className="p-4 rounded-lg border border-gray-100 bg-white transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
                                <p className="text-3xl font-bold text-red-700">{statYears}</p>
                                <p className="text-xs font-medium uppercase text-gray-500 mt-1">Years Service</p>
                            </div>
                            
                            <div className="p-4 rounded-lg border border-gray-100 bg-white transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
                                <p className="text-3xl font-bold text-red-700">{statTerms}</p>
                                <p className="text-xs font-medium uppercase text-gray-500 mt-1">Ministerial Terms</p>
                            </div>
                            
                            <div className="p-4 rounded-lg border border-gray-100 bg-white transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
                                <p className="text-3xl font-bold text-red-700">{statRoles}</p>
                                <p className="text-xs font-medium uppercase text-gray-500 mt-1">Leadership Roles</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                            <button onClick={() => navigate('/biography')} className="flex items-center justify-center px-8 py-3 bg-red-700 text-white font-semibold rounded-lg shadow-lg hover:bg-red-800 transition duration-300">
                                Learn More
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button onClick={() => navigate('/contact')} className="px-8 py-3 border border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition duration-300">
                                GET INVOLVED
                            </button>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Responsive Image Section */}
                    <div className="relative h-96 md:h-auto overflow-hidden">
                        <img 
                            src={herodata?.imageUrl || imageplaceholder} 
                            alt="Public servant profile" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src="https://placehold.co/1200x1200/B91C1C/FFFFFF/png?text=Giriraj+Mani+Pokharel";
                            }}
                        />

                        {/* ABSOLUTE DIV: Image Caption */}
                        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white p-4">
                            <p className="font-bold text-sm">{herodata?.captionName || "Giriraj Mani Pokharel"}</p>
                            <p className="text-xs mt-1 text-gray-300">
                                {herodata?.imageDesc || "Standing Committee Member & Former Minister"}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Herosection