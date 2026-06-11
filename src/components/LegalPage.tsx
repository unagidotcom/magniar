import React from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

interface LegalPageProps {
  type: "privacy" | "terms";
}

export default function LegalPage({ type }: LegalPageProps) {
  const handleGoHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new Event("navigate"));
  };

  const renderContent = () => {
    if (type === "privacy") {
      return (
        <div className="space-y-8 text-base md:text-lg leading-relaxed text-text-secondary">
          <p className="font-mono text-xs text-brand-blue uppercase tracking-widest font-bold">
            Last Updated: June 11, 2026
          </p>
          <p>
            At Magniar & Co. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we respect your privacy and are committed to protecting your personal data. This Privacy Policy describes how we collect, use, and share your information when you visit magniar.com and use our Growth Diagnostics tools.
          </p>

          <span className="block h-[1px] w-full bg-border-primary my-6" />

          <div className="space-y-4">
            <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary">1. Information We Collect</h3>
            <p>We collect information to help customize our consulting sessions and marketing recommendations:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Information:</strong> Representative name and contact email address.</li>
              <li><strong>Marketing & Brand Data:</strong> Company website URL, monthly advertising budget tier, and custom details regarding your growth bottlenecks.</li>
              <li><strong>Google Authentication Data:</strong> If you choose to book a consultation via our interactive scheduling calendar, we request access to your Google account via Google OAuth.</li>
            </ul>
          </div>

          <span className="block h-[1px] w-full bg-border-primary my-6" />

          <div className="space-y-4">
            <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary">2. How We Use Google User Data</h3>
            <p>
              Our application requests scopes to send email notifications on your behalf (Gmail API) and manage scheduling invites (Google Calendar API).
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Authentication tokens are processed securely and held strictly in-memory or within your local browser session.</li>
              <li>We use these credentials and APIs solely to send diagnostic invitations and insert calendar events for your consultation.</li>
              <li>We do not store, compile, or share your Google profile details, calendar events, or emails with third parties.</li>
            </ul>
          </div>

          <span className="block h-[1px] w-full bg-border-primary my-6" />

          <div className="space-y-4">
            <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary">3. Third-Party Data Processors</h3>
            <p>
              We utilize secure, industry-standard tools to process form data and authenticate sessions:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Brevo:</strong> Used to securely route growth diagnostic inquiry forms and manage subscriber metadata.</li>
              <li><strong>Firebase:</strong> Used to manage user authentication flows securely.</li>
            </ul>
          </div>

          <span className="block h-[1px] w-full bg-border-primary my-6" />

          <div className="space-y-4">
            <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary">4. Data Retention & Security</h3>
            <p>
              We employ appropriate administrative, technical, and physical safeguards to secure your details against unauthorized access. We retain diagnostic leads only as long as necessary to provide consulting services and answer direct inquiries.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8 text-base md:text-lg leading-relaxed text-text-secondary">
        <p className="font-mono text-xs text-brand-blue uppercase tracking-widest font-bold">
          Last Updated: June 11, 2026
        </p>
        <p>
          Welcome to Magniar & Co. (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing magniar.com (the &quot;Site&quot;) or booking diagnostic services, you agree to comply with and be bound by these Terms & Conditions.
        </p>

        <span className="block h-[1px] w-full bg-border-primary my-6" />

        <div className="space-y-4">
          <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary">1. Growth Assessments & Consultations</h3>
          <p>
            All diagnostic recommendations, audit results, and consultations provided through the Site are for educational and informational purposes. We do not guarantee specific advertising ROAS, growth metrics, or performance outcomes.
          </p>
        </div>

        <span className="block h-[1px] w-full bg-border-primary my-6" />

        <div className="space-y-4">
          <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary">2. Google Integration and Consent</h3>
          <p>
            Our Site features an interactive scheduling calendar integrated with Google APIs.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>When you authenticate your Google Account, you grant us permission to schedule calendar events and dispatch event emails to magniarventures@gmail.com and your provided contact email.</li>
            <li>You may disconnect your Google Account at any time using the &quot;Disconnect&quot; control inside the CTA section.</li>
          </ul>
        </div>

        <span className="block h-[1px] w-full bg-border-primary my-6" />

        <div className="space-y-4">
          <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary">3. Intellectual Property</h3>
          <p>
            All design systems, layouts, animations, visual elements, code architectures, and branding elements on magniar.com are the exclusive intellectual property of Magniar & Co. Copying or redistribution is prohibited without prior written consent.
          </p>
        </div>

        <span className="block h-[1px] w-full bg-border-primary my-6" />

        <div className="space-y-4">
          <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary">4. Limitations of Liability</h3>
          <p>
            In no event shall Magniar & Co. be liable for any direct, indirect, incidental, or consequential damages resulting from your use of the Site or our consultation recommendations.
          </p>
        </div>
      </div>
    );
  };

  return (
    <article className="relative min-h-screen bg-bg-primary pt-32 pb-24" id={`legal-page-${type}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-primary)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative Orbs */}
      <div className="absolute top-[10%] left-[10%] h-[300px] w-[300px] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none animate-orb-1" />
      <div className="absolute bottom-[20%] right-[10%] h-[300px] w-[300px] rounded-full bg-brand-pink/5 blur-[100px] pointer-events-none animate-orb-2" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-12">
        {/* Navigation Breadcrumb */}
        <a
          href="/"
          onClick={handleGoHome}
          className="group inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-text-tertiary hover:text-brand-pink transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </a>

        {/* Page Title Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-brand-pink" />
            <span className="font-mono text-xs uppercase tracking-widest text-brand-blue font-bold">Magniar & Co. Legal Hub</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
            {type === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
          </h1>
        </div>

        {/* Legal Document Glass Card */}
        <div className="glass-panel rounded-3xl border border-border-primary p-6 md:p-10 backdrop-blur-md shadow-2xl">
          {renderContent()}
        </div>

        {/* Footer Back Link */}
        <div className="mt-12 flex justify-center">
          <a
            href="/"
            onClick={handleGoHome}
            className="group flex items-center gap-2 rounded-full bg-card-bg px-8 py-3.5 text-sm font-bold tracking-widest text-text-primary uppercase border border-border-primary transition-all duration-300 hover:bg-bg-secondary hover:border-brand-blue cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Return to Homepage</span>
          </a>
        </div>
      </div>
    </article>
  );
}
