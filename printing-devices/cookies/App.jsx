import React from 'react';
import LegalLayout from '../components/LegalLayout';

export default function App() {
  const toc = [
    { id: 'definition', title: '1. What are Cookies?' },
    { id: 'usage', title: '2. How We Use Cookies' },
    { id: 'types', title: '3. Types of Cookies We Use' },
    { id: 'third-party', title: '4. Third-Party Cookies' },
    { id: 'control', title: '5. Controlling Cookies' },
    { id: 'updates', title: '6. Policy Updates' }
  ];

  return (
    <LegalLayout 
      title="Cookie Policy" 
      lastUpdated="August 5, 2026" 
      toc={toc}
    >
      <div className="space-y-8 font-sans">
        <p className="text-slate-600 leading-relaxed text-sm">
          This Cookie Policy explains how our website uses cookies and similar tracking technologies to recognize you when you visit our educational portal under the <code>/printing-devices</code> path. It explains what these technologies are, why we use them, and your rights to control their use.
        </p>

        <section id="definition" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">1. What are Cookies?</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Cookies set by the website owner (in this case, us) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
          </p>
        </section>

        <section id="usage" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">2. How We Use Cookies</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our online properties. Third parties serve cookies through our website for advertising, analytics, and other purposes.
          </p>
        </section>

        <section id="types" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">3. Types of Cookies We Use</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            The specific types of first-party and third-party cookies served through our website and the purposes they perform are described below:
          </p>
          <ul className="list-disc pl-5 text-slate-600 text-sm space-y-3">
            <li>
              <strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as accessing secure areas or saving search inputs.
            </li>
            <li>
              <strong>Analytics &amp; Performance Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used, or how effective our marketing campaigns are, or to help us customize our website for you.
            </li>
            <li>
              <strong>Advertising &amp; Targeting Cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.
            </li>
          </ul>
        </section>

        <section id="third-party" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">4. Third-Party Cookies</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            When you visit our site, you may receive cookies placed by our marketing and advertising partners (such as Google Ads or Google Analytics). These platforms collect anonymous statistics about page views, scrolling patterns, device details, and ad clicks.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            We do not share any personally identifiable information (such as your phone records or email logs) with these third-party trackers. All cookies are processed in accordance with the respective third-party privacy statements.
          </p>
        </section>

        <section id="control" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">5. Controlling Cookies</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit standard digital advertising compliance hubs such as the Network Advertising Initiative (NAI) or the Digital Advertising Alliance (DAA).
          </p>
        </section>

        <section id="updates" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">6. Policy Updates</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
