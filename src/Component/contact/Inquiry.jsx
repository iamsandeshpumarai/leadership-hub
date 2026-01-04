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

  const [agreed, setAgreed] = useState(false);

  const sendMessageMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/inquiry/insertmessage", data);
      return response.data;
    },
    onMutate: () => {
      toast.loading("Sending message...", { id: "send-msg" });
    },
    onSuccess: () => {
      toast.success("Message sent successfully!", { id: "send-msg" });
      setFormData({ fullName: "", email: "", subject: "", message: "" });
      setAgreed(false);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Something went wrong",
        { id: "send-msg" }
      );
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agreed) {
      toast.error("You must agree to the Privacy Policy and Terms of Service");
      return;
    }

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
          <div className="transition-all duration-1000 translate-y-0 opacity-100">
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
                  className="w-5 h-5 text-white"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-light text-red-900">
                Send a
                <span className="font-normal text-red-700 ml-2">Message</span>
              </h2>
            </div>

            <p className="text-red-800 mb-8">
              Have a specific question or concern? Use the form below to send us a
              direct message.
            </p>

            <div className="space-y-4">
              {infoList.map((item, idx) => (
                <InfoItem key={idx} text={item} />
              ))}
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="transition-all duration-1000 translate-y-0 opacity-100">
            <div className="bg-slate-50 p-8 border border-red-200">
              <form className="space-y-6" onSubmit={handleSubmit}>
                
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-red-300 focus:ring-2 focus:ring-red-400"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-red-300 focus:ring-2 focus:ring-red-400"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-red-300 focus:ring-2 focus:ring-red-400"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    rows="6"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-red-300 focus:ring-2 focus:ring-red-400"
                  />
                </div>

                {/* Privacy & Terms Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 accent-red-800"
                    required
                  />
                  <p className="text-sm text-red-700">
                    I agree to the{" "}
                    <a href="/privacy" target="_blank" className="underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="/terms" target="_blank" className="underline">
                      Terms of Service
                    </a>
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sendMessageMutation.isPending || !agreed}
                  className="w-full bg-red-800 hover:bg-red-900 text-white py-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
