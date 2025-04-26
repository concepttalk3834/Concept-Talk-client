import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <p className="mb-4">Effective Date: April 22, 2025</p>

      <p className="mb-4">
        Welcome to <strong>Concept Talk</strong>! These Terms and Conditions outline the rules and regulations for the use of our platform.
        By using this application, you agree to these terms. If you do not agree with any part of these terms, please do not use the service.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Use of the Service</h2>
      <p className="mb-4">
        You agree to use the service only for lawful purposes. You must not use our services to distribute spam, engage in fraudulent activity, or upload malicious content.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">User Account</h2>
      <p className="mb-4">
        We use Google OAuth for authentication. You are responsible for maintaining the security of your login credentials. We store basic user data (name, email, and profile picture) to support your account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Payments & Transactions</h2>
      <p className="mb-4">
        Concept Talk uses <strong>Razorpay</strong> to process payments securely. When you make a payment, you agree to provide accurate and complete billing information. All payments are subject to validation and authorization by Razorpay.
      </p>
      <p className="mb-4">
        We do not store any sensitive payment information such as your credit/debit card details. Payments are handled by Razorpay in accordance with their terms and security standards. You can view their terms at&nbsp;
        <a
          href="https://razorpay.com/terms/"
          className="text-blue-600 underline"
          target="_blank"
          rel="noreferrer"
        >
          Razorpay Terms & Conditions
        </a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Refund and Cancellation</h2>
      <p className="mb-4">
        All payments made through Concept Talk are considered final. No refunds or cancellations are allowed once the transaction is successfully processed, unless otherwise explicitly stated.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
      <p className="mb-4">
        We are not liable for any direct or indirect losses or damages resulting from the use of our platform, including but not limited to payment failures or unauthorized transactions. All payments are processed by Razorpay, and their policies apply.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Termination</h2>
      <p className="mb-4">
        We reserve the right to suspend or terminate your account without prior notice if you violate these terms or engage in any harmful activities.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Modifications</h2>
      <p className="mb-4">
        We may update these Terms and Conditions at any time. Continued use of the platform after changes are made implies your acceptance of the updated terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="mb-4">
        If you have any questions or concerns, please reach out to us at&nbsp;
        <a href="mailto:rakeshranjan9799@gmail.com" className="text-blue-600 underline">
          rakeshranjan9799@gmail.com
        </a>.
      </p>
    </div>
  );
};

export default TermsAndConditions;