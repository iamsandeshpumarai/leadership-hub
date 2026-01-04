import React from "react";

const Policy = () => {
  return (
    <section className="min-h-screen bg-[#82181A] text-white px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-200 mb-6">
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-gray-100 leading-relaxed text-sm md:text-base">
          <p>
            Welcome to the Giriraj Mani Pokhrel website. Your privacy is important
            to us. This Privacy Policy explains how we collect, use, and protect
            your information.
          </p>

          <h2 className="text-xl font-semibold text-white">
            Information We Collect
          </h2>
          <p>
            When you submit an inquiry through our contact form, we may collect
            your full name, email address, and message content.
          </p>

          <h2 className="text-xl font-semibold text-white">
            How We Use Your Information
          </h2>
          <p>
            Your information is used only to respond to inquiries and is visible
            only to authorized administrators through the admin panel.
          </p>

          <h2 className="text-xl font-semibold text-white">
            Data Security
          </h2>
          <p>
            We take reasonable measures to protect your data and do not sell or
            misuse your personal information.
          </p>

          <h2 className="text-xl font-semibold text-white">
            External Links
          </h2>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for their privacy practices.
          </p>

          <h2 className="text-xl font-semibold text-white">
            Changes to This Policy
          </h2>
          <p>
            This Privacy Policy may be updated from time to time. Changes will be
            posted on this page.
          </p>

          <p>
            If you have any questions regarding this policy, please contact us
            through the website’s contact form.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Policy;
