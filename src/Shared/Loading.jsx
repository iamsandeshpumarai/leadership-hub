// this is the loading state of the website if the data is not fetched 

// components/Loading.jsx
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div 
        role="status"
        aria-label="loading"
        className="flex flex-col items-center gap-2"
      >
        {/* SVG Spinner */}
        <svg
          className="animate-spin h-10 w-10 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className="text-gray-500 text-sm font-medium">Loading data...</span>
      </div>
    </div>
  );
};

export default Loading;