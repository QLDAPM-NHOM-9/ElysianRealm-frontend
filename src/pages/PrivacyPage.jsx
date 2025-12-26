import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-brand-primary mb-8 font-serif">Privacy Policy</h1>
      
      <div className="space-y-8 text-text-secondary leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">1. Introduction</h2>
          <p>
            Elysian Realm ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">2. Information We Collect</h2>
          <p className="mb-3"><strong>Personal Information:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Name, email address, phone number</li>
            <li>Mailing address and travel preferences</li>
            <li>Payment and billing information</li>
            <li>Booking history and preferences</li>
            <li>Profile information and avatar</li>
          </ul>
          
          <p className="mt-4 mb-3"><strong>Automatically Collected Information:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Browser type and operating system</li>
            <li>IP address and device identifiers</li>
            <li>Pages visited and time spent on each page</li>
            <li>Search queries and interaction data</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Processing and fulfilling your bookings and reservations</li>
            <li>Sending confirmations, updates, and customer support</li>
            <li>Improving our website and services</li>
            <li>Personalizing your experience and recommendations</li>
            <li>Conducting marketing activities and promotions</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">4. Sharing Your Information</h2>
          <p className="mb-3">
            We may share your information with:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Airlines, hotels, and tour operators (to fulfill bookings)</li>
            <li>Payment processors and financial institutions</li>
            <li>Service providers and contractors</li>
            <li>Legal authorities when required by law</li>
          </ul>
          <p className="mt-4">
            We do not sell, trade, or rent your personal information to third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">5. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information, including SSL encryption, secure servers, and access controls. However, no method of transmission over the Internet is 100% secure. Please use strong passwords and protect your account information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">6. Your Rights and Choices</h2>
          <p className="mb-3">
            You have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Access, update, or delete your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Disable cookies in your browser settings</li>
            <li>Request information about data we hold about you</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">7. Cookies and Tracking</h2>
          <p>
            We use cookies to enhance your experience, remember preferences, and analyze website usage. You can control cookie settings in your browser. Disabling cookies may limit some website functionality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">8. Third-Party Links</h2>
          <p>
            Our website may contain links to external websites. We are not responsible for the privacy practices or content of third-party sites. Please review their privacy policies before providing personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">9. Children's Privacy</h2>
          <p>
            Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children. If we become aware of such collection, we will take steps to delete the information and terminate the child's account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-border-primary">
            <p><strong>Elysian Realm</strong></p>
            <p>Email: privacy@elysianrealm.com</p>
            <p>Address: 123 Đường Mộng Mơ, Quận 1, TP.HCM</p>
            <p>Phone: +84 123 456 789</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">11. Policy Updates</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on our website. Your continued use of our services constitutes acceptance of the updated policy.
          </p>
          <p className="mt-4 text-sm text-text-tertiary">
            Last Updated: December 26, 2025
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
