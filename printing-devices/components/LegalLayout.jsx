import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ArrowRight, ChevronRight, Clock } from 'lucide-react';

export default function LegalLayout({ title, lastUpdated, toc, children }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // Scroll active element intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      toc.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [toc]);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
              <span className="text-blue-600 font-semibold">Document Node</span>
              <ChevronRight className="w-3 h-3" />
              <span>Legal Agreement</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {title}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="flex-grow py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Table of Contents - Desktop Sticky Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 hidden lg:block border border-slate-200/60 bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Table of Contents
            </h3>
            <nav className="space-y-1 font-sans">
              {toc.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                    className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 translate-x-1'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.title}</span>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* Table of Contents - Mobile list */}
          <div className="lg:hidden col-span-1 border border-slate-200 bg-white rounded-2xl p-5 shadow-sm mb-6">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
              Table of Contents
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className="flex items-center gap-1.5 py-1 text-blue-600 hover:underline"
                >
                  <ArrowRight className="w-3 h-3 shrink-0" />
                  <span>{item.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Main Document Content */}
          <article className="lg:col-span-8 bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-10 shadow-sm font-sans text-slate-700 leading-relaxed max-w-none prose prose-slate">
            {children}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
