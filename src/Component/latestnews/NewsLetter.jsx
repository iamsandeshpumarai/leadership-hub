import React, { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      // Replace with your subscription logic
      alert(`Subscribed with: ${email}`);
      setEmail("");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <section className="py-20 bg-red-800">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center transform transition-all duration-1000 delay-500 tranred-y-0 opacity-100">
          <h3 className="text-2xl lg:text-3xl font-light text-white mb-6">
            Stay Informed &nbsp;
            <span className="font-normal text-red-300">Never Miss Updates</span>
          </h3>

          <div className="w-16 h-0.5 bg-red-400 mx-auto mb-8"></div>

          <p className="text-red-300 leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest news, policy updates, 
            and exclusive insights directly in your inbox.
          </p>

          {/* Email Input & Subscribe Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-white text-red-800 placeholder-red-500 rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
            />
            <button
              onClick={handleSubscribe}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-medium tracking-wide rounded transition-all duration-200"
            >
              SUBSCRIBE
            </button>
          </div>

          <p className="text-red-400 text-sm mt-4">
            Join thousands of subscribers who stay updated with our work.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
