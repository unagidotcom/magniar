/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustLogos from "./components/TrustLogos";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import HandledClients from "./components/HandledClients";
import Blog from "./components/Blog";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import LegalPage from "./components/LegalPage";
import { CurrencyProvider } from "./CurrencyContext";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0); // Reset scroll position to top on change
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("navigate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("navigate", handleLocationChange);
    };
  }, []);

  // Callback handle to navigate from CTAs to section blocks cleanly
  const handleScrollToSection = (targetId: string) => {
    // If not on the homepage, redirect to homepage with target hash
    if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
      window.location.href = `/#${targetId}`;
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const normalizedPath = currentPath.replace(/\/$/, "");

  return (
    <CurrencyProvider>
      <div className="relative min-h-screen bg-brand-dark overflow-x-hidden selection:bg-brand-blue/30 selection:text-white" id="root-portal">
        {/* Laser Mouse Glow tracing */}
        <CursorGlow />

        {/* Primary Sticky Top Bar */}
        <Navbar />

        {/* Main Agency Core Layout Panels */}
        <main id="main-content-stream">
          {normalizedPath === "/privacy-policy" ? (
            <LegalPage type="privacy" />
          ) : normalizedPath === "/terms-and-conditions" ? (
            <LegalPage type="terms" />
          ) : (
            <>
              {/* Full-screen high-end display Hero */}
              <Hero onCtaclick={handleScrollToSection} />

              {/* 8-Node platform mesh network trust indicators */}
              <TrustLogos />

              {/* Narrative positioning and animated count tickers */}
              <About />

              {/* Categories Tab Pill Swapper & 11 core-services */}
              <Services />

              {/* 5-stage scale framework vertical timeline */}
              <Process />

              {/* Real Handled Clients & Spend Dashboard */}
              <HandledClients />

              {/* Connected Blog System */}
              <Blog />

              {/* Double Conversion inquiry & calendar module */}
              <CTA />
            </>
          )}
        </main>

        {/* Logos, socials & direct email click-to-copy */}
        <Footer />
      </div>
    </CurrencyProvider>
  );
}


