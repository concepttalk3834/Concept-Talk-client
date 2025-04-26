import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Effective Date: April 22, 2025</p>

      <p className="mb-4">
        Welcome to <strong>Concept Talk</strong> (“we,” “our,” or “us”). We are committed to protecting your personal
        information and your right to privacy. This Privacy Policy explains what information we collect, how we use it,
        and what rights you have regarding it.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your public Google profile picture</li>
        <li>Transaction and payment-related details (via Razorpay)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <p className="mb-4">
        We use your information to authenticate your login, personalize your experience, process payments, and maintain basic user records.
        Your information is stored securely and is not shared with third-party services except for payment processing through Razorpay.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Payments & Razorpay</h2>
      <p className="mb-4">
        We use <strong>Razorpay</strong> as our third-party payment gateway. When you make a payment, Razorpay may collect certain
        information required to process the transaction, such as your name, email, contact number, and payment details.
      </p>
      <p className="mb-4">
        <strong>We do not store your card or banking details</strong> on our servers. All sensitive payment data is securely handled
        and encrypted by Razorpay as per PCI-DSS standards. You can review their privacy policy here:{' '}
        <a
          href="https://razorpay.com/privacy/"
          className="text-blue-600 underline"
          target="_blank"
          rel="noreferrer"
        >
          Razorpay Privacy Policy
        </a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Storage</h2>
      <p className="mb-4">
        Your data is securely stored in our database and used only to support your user account and order history. We do not share
        or sell your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Google OAuth</h2>
      <p className="mb-4">
        We use Google OAuth 2.0 for login. You may revoke access at any time via{' '}
        <a href="https://myaccount.google.com/permissions" className="text-blue-600 underline" target="_blank" rel="noreferrer">
          Google Account Permissions
        </a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Security</h2>
      <p className="mb-4">
        We implement reasonable security measures to protect your data. However, no system is completely secure. We encourage you to
        use strong passwords and sign out when finished.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="mb-4">
        You may request deletion or review of your data at any time. Contact us at{' '}
        <a href="mailto:rakeshranjan9799@gmail.com" className="text-blue-600 underline">rakeshranjan9799@gmail.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;