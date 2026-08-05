import React from 'react';
import LegalLayout from '../components/LegalLayout';

export default function App() {
  const toc = [
    { id: 'collection', title: '1. Information Collection' },
    { id: 'cookies', title: '2. Cookies & Tracking' },
    { id: 'usage', title: '3. How We Use Information' },
    { id: 'third-party', title: '4. Third-Party Links' },
    { id: 'disclaimer', title: '5. Independent Disclaimer' },
    { id: 'contact', title: '6. Contact & Support' }
  ];

  return (
    <LegalLayout 
      title="Privacy Policy" 
      lastUpdated="August 5, 2026" 
      toc={toc}
    >
      <div className="space-y-8 font-sans">
        <p className="text-slate-600 leading-relaxed text-sm">
          We respect your privacy and are committed to protecting the personal data you share with us. This Privacy Policy describes how we collect, use, and safeguard your information when you visit our educational portal under the <code>/printing-devices</code> path, search our printing guides, or contact our support resource line.
        </p>

        <section id="collection" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">1. Information Collection</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We collect personal information that you choose to provide directly to us. This includes:
          </p>
          <ul className="list-disc pl-5 text-slate-600 text-sm space-y-2">
            <li>
              <strong>Communication Logs:</strong> If you contact us via telephone support at <code>+1 (805) 994-0590</code>, we may record the call for training purposes and maintain records of the phone number, date/time of contact, and notes regarding your printing device questions.
            </li>
            <li>
              <strong>Voluntary Feedback:</strong> If you send us emails, comments, or submit questions about printer troubleshooting, we collect your name, email address, and message contents.
            </li>
            <li>
              <strong>Device & Usage Data:</strong> We automatically collect standard diagnostic data, including your IP address, browser type, referring pages, access times, and click patterns.
            </li>
          </ul>
        </section>

        <section id="cookies" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">2. Cookies &amp; Tracking Technologies</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We use browser cookies, web beacons, and tracking pixels to analyze site traffic, personalize educational content layouts, and run targeted advertising.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            These cookies track how you interact with our pages, which guide topics are popular, and help us optimize page load speeds. You can configure your browser to reject cookies, though some interactive elements or search filters may not work as intended.
          </p>
        </section>

        <section id="usage" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">3. How We Use Your Information</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We use the information we collect to maintain and improve our educational resources. Specifically, we use it to:
          </p>
          <ul className="list-disc pl-5 text-slate-600 text-sm space-y-2">
            <li>Provide general guidance on setup, ink replacement, and scanning workflows.</li>
            <li>Analyze user search queries to create new featured guides and articles.</li>
            <li>Answer phone inquiries, coordinate resource routing, and resolve support requests.</li>
            <li>Monitor and prevent technical issues, server errors, or malicious page clicks.</li>
            <li>Comply with standard legal obligations and enforce our Terms of Use.</li>
          </ul>
        </section>

        <section id="third-party" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">4. Third-Party Links</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Our guides may contain links to official manufacturer download resources, firmware repositories, or vendor platforms. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. We encourage you to review the privacy disclosures of every site you visit.
          </p>
        </section>

        <section id="disclaimer" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">5. Independent Service Disclaimer</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Please be advised that we operate as an independent informational help portal. We are not associated with, endorsed by, or affiliated with HP Inc. All tutorials, product names, logos, and brands mentioned on this site are property of their respective owners. Users are solely responsible for verifying device compatibility and following manufacturer guidelines when performing hardware repairs or firmware updates.
          </p>
        </section>

        <section id="contact" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">6. Contact &amp; Support</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            If you have questions about this Privacy Policy, your data permissions, or our independent help guides, you can contact us at:
          </p>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-xs sm:text-sm font-medium space-y-1">
            <p className="text-slate-900 font-bold">Independent Help Line</p>
            <p>Phone: +1 (805) 994-0590</p>
            <p>Business Hours: Monday – Saturday, 9:00 AM – 6:00 PM</p>
            <p>Address: Gurugram, Haryana, India</p>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
}
