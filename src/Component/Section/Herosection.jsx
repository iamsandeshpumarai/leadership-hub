import React from 'react'

const Herosection = ({herodata}) => {
console.log(herodata ,"this is the hero data")
    return (
     <div className=" font-sans p-4 md:p-8 mt-[70px]">
            <div className="max-w-7xl mx-auto  rounded-xl overflow-hidden ">
                {/* MAIN LAYOUT CONTAINER
                    Small Screens: flex-col (column)
                    Medium/Large Screens: grid grid-cols-2
                */}
                <div className="flex flex-col md:grid md:grid-cols-2 min-h-[70vh]">

                    {/* LEFT COLUMN: Content Section */}
                    <div className="p-6 md:p-12 lg:p-16 flex flex-col justify-center space-y-8">
                        
                        {/* Tag */}
                        <div className="inline-flex items-center text-red-700 text-sm font-semibold tracking-wider bg-red-50 py-1 px-3 rounded-full w-fit">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {herodata ?  herodata?.tag :"Nepalese Politicians"}
                        </div>

                        {/* Title Block */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
                             {herodata ?  herodata?.firstName :"Giriraj Mani"}
                            <span className="text-red-700">{herodata?.nameHighlight}</span>
                        </h1>
                        <p className="text-xl font-medium text-gray-700">
                            {herodata?.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-lg text-gray-500 max-w-lg">
                          {herodata?.description}
                        </p>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            {/* Stat 1 */}
                            
 <div  className="p-4 rounded-lg border border-gray-100 bg-white transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
                                <p className="text-3xl font-bold text-red-700">{herodata?.stats[0]?.years}</p>
                                
                                <p className="text-xs font-medium uppercase text-gray-500 mt-1">Years Service</p>
                            </div>
                            
 <div  className="p-4 rounded-lg border border-gray-100 bg-white transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
                                <p className="text-3xl font-bold text-red-700">{herodata?.stats[0]?.terms}</p>
                                <p className="text-xs font-medium uppercase text-gray-500 mt-1">Ministerial Terms </p>
                            </div>
                            
 <div  className="p-4 rounded-lg border border-gray-100 bg-white transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
                                <p className="text-3xl font-bold text-red-700">{herodata?.stats[0]?.roles}</p>
                                <p className="text-xs font-medium uppercase text-gray-500 mt-1">Leadership Roles</p>
                            </div>
                            
                           
                            
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                            <button className="flex items-center justify-center px-8 py-3 bg-red-700 text-white font-semibold rounded-lg shadow-lg hover:bg-red-800 transition duration-300">
                                Learn More
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button className="px-8 py-3 border border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition duration-300">
                                GET INVOLVED
                            </button>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Responsive Image Section */}
                    {/* The parent div is set to 'relative' and given a minimum height for mobile */}
                    <div className="relative h-96 md:h-auto overflow-hidden">
                        
                        {/* Image Tag */}
                        <img 
                            src={herodata?.imageUrl} 
                            alt="Placeholder image representing a public servant's profile" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src="https://placehold.co/1200x1200/B91C1C/FFFFFF/png?text=Image+Load+Failed";
                            }}
                        />

                        {/* ABSOLUTE DIV: Image Caption/Footnote */}
                        {/* This div uses 'absolute bottom-0 left-0 w-full' to ensure it sticks to the bottom */}
                        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white p-4">
                            <p className="font-bold text-sm">{herodata?.captionName}</p>
                            <p className="text-xs mt-1 text-gray-300">
                                {herodata?.imageDesc
}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
  )
}

export default Herosection
