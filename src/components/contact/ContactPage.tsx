import React from 'react';
import { ContactHero } from './ContactHero';
import { ContactForm } from './ContactForm';
import { ContactOtherWays } from './ContactOtherWays';
import { ContactProjectCTA } from './ContactProjectCTA';

interface ContactPageProps {
  onStartProject?: () => void;
  onGoToPortal?: () => void;
  forceErrorDemo?: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onStartProject,
  onGoToPortal,
  forceErrorDemo = false,
}) => {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F7FA] font-sans antialiased">
      {/* HERO */}
      <ContactHero onStartProject={onStartProject} />

      {/* FORM */}
      <ContactForm onGoToPortal={onGoToPortal} forceErrorDemo={forceErrorDemo} />

      {/* OTHER WAYS TO CONNECT */}
      <ContactOtherWays />

      {/* CROSSOVER CTA TO START A PROJECT */}
      <ContactProjectCTA onStartProject={onStartProject} />
    </div>
  );
};
