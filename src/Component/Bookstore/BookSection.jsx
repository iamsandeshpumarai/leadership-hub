import React from 'react';

const BooksSection = ({ books }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Grid of books */}
        <div className="grid lg:grid-cols-2 gap-8"> {/* Consider xl:grid-cols-3 for larger screens */}
          {books.map((book, index) => (
            <div
              key={book._id} // Use real ID for React key (better than index)
              className={`transform transition-all duration-1000 delay-${index * 100} translate-y-0 opacity-100`}
            >
              {/* Book Card */}
              <div className="bg-white p-8 h-full hover:shadow-lg transition-all duration-300 border border-red-100 hover:border-red-200">
                <div className="flex gap-6">
                  {/* Book Cover - Kept as is; consider real images if schema adds imageUrl */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-40 bg-gradient-to-br from-red-100 to-red-200 border border-red-200 flex items-center justify-center">
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
                        className="lucide lucide-book-open w-8 h-8 text-red-600"
                        aria-hidden="true"
                      >
                        <path d="M12 7v14"></path>
                        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                      </svg>
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="flex-1">
                    {/* Tags as Badges - At top, as requested */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {book.tags.map((tag, tagIndex) => (
                        <div key={tagIndex} className="inline-block bg-red-50 border border-red-200 px-3 py-1 rounded-sm">
                          <span className="text-red-700 font-medium text-xs tracking-wide uppercase">
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Title and Subtitle */}
                    <h3 className="text-xl font-medium text-slate-900 mb-1">
                      {book.title}
                    </h3>
                    <p className="text-slate-600 font-medium mb-2">
                      {book.subtitle}
                    </p>

                    {/* Published Date - Extract year from Date */}
                    <div className="flex items-center text-sm text-slate-500 mb-4">
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
                      Published {new Date(book.publishTime).getFullYear()}
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                      {book.publishDesc}
                    </p>

                    {/* Price & Buy Button */}
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-medium text-red-800">
                        NPR {book.price.toLocaleString()} {/* Format number, assume NPR */}
                      </div>
                      <button className="bg-red-800 hover:bg-red-900 text-white px-6 py-2 font-medium tracking-wide flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-shopping-cart"
                          aria-hidden="true"
                        >
                          <circle cx="8" cy="21" r="1"></circle>
                          <circle cx="19" cy="21" r="1"></circle>
                          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                        </svg>
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksSection;