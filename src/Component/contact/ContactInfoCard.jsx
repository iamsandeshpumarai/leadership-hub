import React from "react";

// Single Card Component
const ContactInfoCard = ({ icon, title, items }) => {
  return (
    <div className="transform transition-all duration-1000 tranred-y-0 opacity-100">
      <div className="bg-white p-6 border border-red-200 hover:shadow-lg transition-all duration-300 h-full">
        <div className="bg-red-100 p-3 w-fit mb-4">{icon}</div>
        <h3 className="text-lg font-medium text-red-800 mb-3">{title}</h3>
        <div className="space-y-2">
          {items.map((item, idx) => (
            <p key={idx} className="text-red-600 text-sm leading-relaxed">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Component
const ContactInfoSection = () => {
  // Data array for mapping
  const contactData = [
    {
      title: "Office Address",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-building w-6 h-6 text-red-600"
        >
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
          <path d="M9 22v-4h6v4"></path>
          <path d="M8 6h.01"></path>
          <path d="M16 6h.01"></path>
          <path d="M12 6h.01"></path>
          <path d="M12 10h.01"></path>
          <path d="M12 14h.01"></path>
          <path d="M16 10h.01"></path>
          <path d="M16 14h.01"></path>
          <path d="M8 10h.01"></path>
          <path d="M8 14h.01"></path>
        </svg>
      ),
      items: ["Political Office", "Kathmandu, Nepal", "Bagmati Province"],
    },
    {
      title: "Phone Numbers",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-phone w-6 h-6 text-red-600"
        >
          <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
        </svg>
      ),
      items: ["+977-1-XXXXXXX (Office)", "+977-98XXXXXXXX (Mobile)", "+977-1-XXXXXXX (Fax)"],
    },
    {
      title: "Email Addresses",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-mail w-6 h-6 text-red-600"
        >
          <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        </svg>
      ),
      items: ["office@girirajmanipokharel.np", "info@girirajmanipokharel.np", "media@girirajmanipokharel.np"],
    },
    {
      title: "Office Hours",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-clock w-6 h-6 text-red-600"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      items: ["Monday - Friday: 9:00 AM - 5:00 PM", "Saturday: 10:00 AM - 2:00 PM", "Sunday: Closed"],
    },
  ];

  return (
    <section className=" bg-[#F8FAFC] py-10">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 transform transition-all duration-1000 translate-y-0 opacity-100">
          <h2 className="text-2xl lg:text-3xl font-light text-red-900 mb-6">
            Contact
            <span className="font-normal text-red-700 ml-2">Information</span>
          </h2>
          <p className="text-red-600 leading-relaxed max-w-2xl mx-auto">
            Multiple ways to reach us for different types of inquiries and assistance.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactData.map((contact, idx) => (
            <ContactInfoCard key={idx} {...contact} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;
