import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../utils/api";
import { useMutation } from "@tanstack/react-query";

const InfoItem = ({ text }) => (
  <div className="flex items-center gap-3 text-red-600">
    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
    <span className="text-sm">{text}</span>
  </div>
);

const SendMessageSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  // FIXED: Added the mutationFn and corrected the options object
  const sendMessageMutation = useMutation({
    mutationFn: async (data) => {
      // This assumes your api util is an axios instance or similar
      const response = await api.post("/inquiry/insertmessage", data); 
      return response.data;
    },
    onMutate: () => {
      toast.loading("Sending message...", { id: "send-msg" }); // Give it an ID to update later
    },
    onSuccess: () => {
      toast.success("Message sent successfully!", { id: "send-msg" });
      setFormData({ fullName: "", email: "", subject: "", message: "" });
    },
    onError: (err) => {
      toast.error(`Error: ${err.response?.data?.message || err.message}`, { id: "send-msg" });
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessageMutation.mutate(formData);
  };

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
          {/* FIXED: Changed tranred-y-0 to translate-y-0 */}
          <div className="transform transition-all duration-1000 delay-300 translate-y-0 opacity-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-800 p-2">
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
                  className="lucide lucide-send w-5 h-5 text-white"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-light text-red-900">
                Send a<span className="font-normal text-red-700 ml-2">Message</span>
              </h2>
            </div>
            <p className="text-red-800 leading-relaxed mb-8">
              Have a specific question or concern? Use the form below to send us a direct message.
            </p>
            <div className="space-y-4">
              {infoList.map((item, idx) => (
                <InfoItem key={idx} text={item} />
              ))}
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="transform transition-all duration-1000 delay-500 translate-y-0 opacity-100">
            <div className="bg-slate-50 p-8 border border-red-200">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-red-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-red-300 bg-white text-red-800 placeholder-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-red-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-red-300 bg-white text-red-800 placeholder-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-red-700 mb-2">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
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
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 border border-red-300 bg-white text-red-800 placeholder-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent resize-vertical"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-800 hover:bg-red-900 text-white px-8 py-3 font-medium tracking-wide flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
                  disabled={sendMessageMutation.isPending}
                >
                  {sendMessageMutation.isPending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SendMessageSection;