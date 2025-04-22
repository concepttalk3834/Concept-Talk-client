import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 mt-24">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <p className="mb-4">Effective Date: April 22, 2025</p>

      <p className="mb-4">
        Welcome to <strong>Concept Talk</strong>! These Terms and Conditions outline the rules and regulations for the use of our platform.
        By using this application, you agree to these terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Use of the Service</h2>
      <p className="mb-4">
        You agree to use the service only for lawful purposes. You must not use our services to distribute spam or malicious content.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">User Account</h2>
      <p className="mb-4">
        We use Google OAuth for authentication. You are responsible for maintaining the security of your login credentials. 
        We store basic user data (name, email, and profile picture) to support your account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Usage</h2>
      <p className="mb-4">
        Your information is used strictly within the platform and is not shared with third parties.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
      <p className="mb-4">
        We are not liable for any direct or indirect damages resulting from use of the platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Termination</h2>
      <p className="mb-4">
        We reserve the right to terminate or suspend your access for violations of these terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Modifications</h2>
      <p className="mb-4">
        We may update these terms from time to time. Continued use of the platform means you accept the changes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="mb-4">
        If you have any questions, reach out to us at{' '}
        <a href="mailto:rakeshranjan9799@gmail.com" className="text-blue-600 underline">rakeshranjan9799@gmail.com</a>.
      </p>
    </div>
  );
};

export default TermsAndConditions;