import React from "react";

// Single Info Item Component
const InfoItem = ({ text }) => (
  <div className="flex items-center gap-3 text-red-600">
    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
    <span className="text-sm">{text}</span>
  </div>
);

const SendMessageSection = () => {
  const infoList = [
    "Policy inquiries and feedback",
    "Media and interview requests",
    "Community event invitations",
    "General questions and support",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Info Panel */}
          <div className="transform transition-all duration-1000 delay-300 tranred-y-0 opacity-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-800 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-send w-5 h-5 text-white"
                >
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                  <path d="m21.854 2.147-10.94 10.939"></path>
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-light text-red-900">
                Send a<span className="font-normal text-red-700 ml-2">Message</span>
              </h2>
            </div>
            <p className="text-red-800 leading-relaxed mb-8">
              Have a specific question or concern? Use the form below to send us a direct message. We aim to respond to all inquiries within 24-48 hours.
            </p>
            <div className="space-y-4">
              {infoList.map((item, idx) => (
                <InfoItem key={idx} text={item} />
              ))}
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="transform transition-all duration-1000 delay-500 tranred-y-0 opacity-100">
            <div className="bg-slate-50 p-8 border border-red-200">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-red-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-user absolute left-3 top-3 w-5 h-5 text-red-400"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3 border border-red-300 bg-white text-red-800 placeholder-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-red-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-mail absolute left-3 top-3 w-5 h-5 text-red-400"
                    >
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    </svg>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-3 border border-red-300 bg-white text-red-800 placeholder-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-red-700 mb-2">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Brief subject of your message"
                    className="w-full px-4 py-3 border border-red-300 bg-white text-red-800 placeholder-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-red-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    required
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 border border-red-300 bg-white text-red-800 placeholder-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent resize-vertical"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-800 hover:bg-red-900 text-white px-8 py-3 font-medium tracking-wide flex items-center justify-center gap-2 transition-all duration-200"
                >
                  Send Message
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-send"
                  >
                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                    <path d="m21.854 2.147-10.94 10.939"></path>
                  </svg>
                </button>
                <p className="text-red-500 text-sm text-center mt-2">
                  We'll get back to you within 24-48 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SendMessageSection;
