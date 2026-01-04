import React from "react";

const TermsOfService = () => {
  return (
    <section className="min-h-screen bg-[#82181A] text-white px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Terms of Service
        </h1>

        <p className="text-gray-200 mb-6">
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-gray-100 leading-relaxed text-sm md:text-base">
          <p>
            By accessing or using the Giriraj Mani Pokhrel website, you agree to
            comply with these Terms of Service.
          </p>

          <h2 className="text-xl font-semibold text-white">
            Website Purpose
          </h2>
          <p>
            This website provides information, news, events, galleries, and a
            contact platform related to Giriraj Mani Pokhrel.
          </p>

          <h2 className="text-xl font-semibold text-white">
            User Responsibilities
          </h2>
          <p>
            Users must provide accurate information and must not submit abusive,
            misleading, or unlawful content through the contact form.
          </p>

          <h2 className="text-xl font-semibold text-white">
            Inquiry Submissions
          </h2>
          <p>
            Submission of an inquiry does not guarantee a response. We reserve
            the right to remove inappropriate messages.
          </p>

          <h2 className="text-xl font-semibold text-white">
            Intellectual Property
          </h2>
          <p>
            All website content is the property of Giriraj Mani Pokhrel unless
            otherwise stated and may not be reused without permission.
          </p>

          <h2 className="text-xl font-semibold text-white">
            Limitation of Liability
          </h2>
          <p>
            We do not guarantee accuracy or uninterrupted availability of the
            website and are not liable for any damages arising from its use.
          </p>

          <h2 className="text-xl font-semibold text-white">
            Modifications
          </h2>
          <p>
            We reserve the right to update or modify these terms at any time.
          </p>

          <p>
            Continued use of the website signifies acceptance of these Terms of
            Service.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;
