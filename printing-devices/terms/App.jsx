import React from 'react';
import LegalLayout from '../components/LegalLayout';

export default function App() {
  const toc = [
    { id: 'agreement', title: '1. Agreement to Terms' },
    { id: 'intellectual', title: '2. Intellectual Property & Use' },
    { id: 'disclaimer', title: '3. Disclaimer of Warranties' },
    { id: 'liability', title: '4. Limitations of Liability' },
    { id: 'helpline', title: '5. Resource Helpline Rules' },
    { id: 'governing', title: '6. Governing Law' }
  ];

  return (
    <LegalLayout 
      title="Terms of Use" 
      lastUpdated="August 5, 2026" 
      toc={toc}
    >
      <div className="space-y-8 font-sans">
        <p className="text-slate-600 leading-relaxed text-sm">
          Please read these Terms of Use carefully before using our educational printer resource center under the <code>/printing-devices</code> path. By accessing this site or calling our resource lines, you agree to be bound by these terms.
        </p>

        <section id="agreement" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">1. Agreement to Terms</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and our organization, concerning your access to and use of this resource website.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            If you do not agree with all of these Terms of Use, then you are expressly prohibited from using the site and you must discontinue use immediately.
          </p>
        </section>

        <section id="intellectual" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">2. Intellectual Property &amp; Use License</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Unless otherwise indicated, all educational text, layout designs, and formatting on these pages are our proprietary property. We grant you a limited, non-exclusive, non-transferable license to access, view, and print pages of this site solely for your personal, non-commercial use.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed text-amber-800 bg-amber-50 border border-amber-100 rounded-xl p-3">
            <strong>Trademarks Note:</strong> The terms "HP", "Hewlett-Packard", "LaserJet", "OfficeJet", and related printer names are registered trademarks of HP Inc. We reference these trademarked terms strictly for educational and identification purposes. We make no claim to ownership of these marks.
          </p>
        </section>

        <section id="disclaimer" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">3. Disclaimer of Warranties</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            This site and its content are provided on an "as-is" and "as-available" basis. We make no representations or warranties of any kind, express or implied, as to the operation of the site or the accuracy, completeness, or reliability of the educational material.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            We do not warrant that the step-by-step guides (e.g. printhead cleaning, wireless pairing, or paper jam clearing) will resolve your specific device issue or prevent physical damage to your hardware. Always consult official manufacturer manuals before performing mechanical work.
          </p>
        </section>

        <section id="liability" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">4. Limitations of Liability</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            In no event shall we, our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or device malfunction, arising from your use of this site or reliance on our guides.
          </p>
        </section>

        <section id="helpline" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">5. Resource Helpline Rules</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Our support phone line <code>+1 (805) 994-0590</code> operates as an independent resource guidance desk. By calling the helpline:
          </p>
          <ul className="list-disc pl-5 text-slate-600 text-sm space-y-2">
            <li>You acknowledge that you are calling an independent service team and not the official HP customer support division.</li>
            <li>You agree to treat our support team with respect. Any abusive, profane, or threatening behavior will result in immediate termination of the support call.</li>
            <li>You understand that our assistance is limited to general configuration advice, and we do not dispatch local technicians or guarantee device repair.</li>
          </ul>
        </section>

        <section id="governing" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">6. Governing Law</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            These Terms of Use and your use of the site are governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any legal action or proceeding arising under these terms shall be brought exclusively in the courts located in Gurugram, Haryana.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
