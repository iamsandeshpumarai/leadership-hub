import React from "react";

// Sample book data
const books = [
  {
    category: "Political Memoir",
    title: "Healthcare Reform in Nepal",
    subtitle: "A Minister's Journey",
    published: "2010",
    description:
      "Insights from serving as Minister of Health and Population, covering policy reforms and public health initiatives.",
    price: "NPR 1,200",
  },
  {
    category: "Political Analysis",
    title: "Constitutional Democracy",
    subtitle: "Nepal's Democratic Transition",
    published: "2012",
    description:
      "Experiences from the Constituent Assembly and the journey toward Nepal's new constitution.",
    price: "NPR 1,500",
  },
  {
    category: "Political Theory",
    title: "Party Politics and Unity",
    subtitle: "Lessons from Nepal's Left Movement",
    published: "2015",
    description:
      "Reflections on party unification and leadership within Nepal's communist movement.",
    price: "NPR 1,300",
  },
  {
    category: "Leadership",
    title: "Public Service Leadership",
    subtitle: "Building Stronger Communities",
    published: "2018",
    description:
      "A comprehensive guide to effective public service and community development.",
    price: "NPR 1,400",
  },
];

const BooksSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Grid of books */}
        <div className="grid lg:grid-cols-2 gap-8">
          {books.map((book, index) => (
            <div
              key={index}
              className={`transform transition-all duration-1000 delay-${index * 100} translate-y-0 opacity-100`}
            >
              {/* Book Card */}
              <div className="bg-white p-8 h-full hover:shadow-lg transition-all duration-300 border border-red-100 hover:border-red-200">
                <div className="flex gap-6">
                  {/* Book Cover */}
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
                    {/* Category */}
                    <div className="inline-block bg-red-50 border border-red-200 px-3 py-1 rounded-sm mb-3">
                      <span className="text-red-700 font-medium text-xs tracking-wide uppercase">
                        {book.category}
                      </span>
                    </div>

                    {/* Title and Subtitle */}
                    <h3 className="text-xl font-medium text-slate-900 mb-1">
                      {book.title}
                    </h3>
                    <p className="text-slate-600 font-medium mb-2">
                      {book.subtitle}
                    </p>

                    {/* Published Date */}
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
                      Published {book.published}
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                      {book.description}
                    </p>

                    {/* Price & Buy Button */}
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-medium text-red-800">
                        {book.price}
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
