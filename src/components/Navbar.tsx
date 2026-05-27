import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Sparkles, Sun, Moon } from "lucide-react";
import { useCurrency, CURRENCIES } from "../CurrencyContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { currentCurrency, setCurrencyByCode } = useCurrency();
  
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") return stored;
      return "light"; // Premium light mode as standard default
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Track active section for indicator line
      const sections = ["hero", "about", "services", "process"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Our Process", id: "process" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border-primary bg-bg-secondary/85 py-4 backdrop-blur-md"
          : "bg-transparent py-6"
      }`}
      id="main-nav-header"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2 cursor-pointer"
          id="nav-logo-btn"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-tr from-brand-blue to-brand-pink p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-bg-secondary transition-all duration-300 group-hover:bg-bg-secondary/20">
              <Sparkles className="h-5 w-5 text-brand-pink transition-transform duration-300 group-hover:rotate-12" />
            </div>
          </div>
          <span className="font-display text-xl md:text-2xl font-extrabold tracking-tighter text-text-primary transition-opacity duration-300 group-hover:opacity-80">
            MAGNIAR <span className="text-gradient">& CO.</span>
          </span>
        </button>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-8 md:flex" id="desktop-nav">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="relative py-1 font-sans text-sm font-bold tracking-widest text-text-tertiary uppercase transition-colors duration-200 hover:text-text-primary cursor-pointer"
              id={`nav-link-${link.id}`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-linear-to-r from-brand-blue to-brand-pink" />
              )}
            </button>
          ))}
        </nav>

        {/* Dynamic Currency Selector, Theme Switcher & CTA Button */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Theme Switcher Desktop */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-card-bg border border-border-primary text-text-secondary hover:text-text-primary hover:border-brand-blue/50 transition-all cursor-pointer shadow-sm"
            aria-label="Toggle Theme"
            id="theme-switcher-desktop"
          >
            {theme === "light" ? (
              <Moon className="h-4.5 w-4.5 text-text-secondary" />
            ) : (
              <Sun className="h-4.5 w-4.5 text-brand-pink" />
            )}
          </button>

          <div className="relative inline-block">
            <select
              value={currentCurrency.code}
              onChange={(e) => setCurrencyByCode(e.target.value)}
              className="appearance-none bg-card-bg border border-border-primary hover:border-brand-pink/50 rounded-full px-4 py-2 text-xs font-bold text-text-secondary hover:text-text-primary transition-all outline-none cursor-pointer pr-8 uppercase tracking-wider"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
              }}
              id="currency-selector"
            >
              {Object.keys(CURRENCIES).map((code) => (
                <option key={code} value={code} className="bg-bg-secondary text-text-primary font-mono text-xs">
                  {CURRENCIES[code].label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => scrollToSection("contact")}
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-text-primary text-bg-primary px-6 py-2.5 text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:bg-brand-blue hover:text-white cursor-pointer shadow-[0_4px_20px_var(--border-primary)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.3)]"
            id="nav-cta-desktop"
          >
            <span>Start a Project</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Header Buttons */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Theme Switcher Mobile Header */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-card-bg border border-border-primary text-text-secondary hover:text-text-primary transition-all cursor-pointer shadow-sm"
            aria-label="Toggle Theme"
            id="theme-switcher-mobile-header"
          >
            {theme === "light" ? (
              <Moon className="h-4.5 w-4.5 text-text-secondary" />
            ) : (
              <Sun className="h-4.5 w-4.5 text-brand-pink" />
            )}
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-card-bg border border-border-primary text-text-primary hover:bg-bg-secondary cursor-pointer"
            aria-label="Toggle Menu"
            id="nav-mobile-hamburger"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[69px] z-40 flex flex-col bg-bg-secondary/95 px-6 py-12 backdrop-blur-lg md:hidden border-t border-border-primary animate-fade-in">
          <div className="flex flex-col gap-6 text-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="font-display text-2xl font-bold tracking-tight text-text-secondary hover:text-text-primary"
                id={`mobile-nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}

            {/* Mobile Currency Selector */}
            <div className="mt-4 flex flex-col items-center justify-center gap-2 border-t border-border-primary pt-6">
              <span className="font-mono text-xs uppercase tracking-widest text-text-tertiary">SELECT CURRENCY</span>
              <select
                value={currentCurrency.code}
                onChange={(e) => setCurrencyByCode(e.target.value)}
                className="bg-card-bg border border-border-primary text-text-primary text-sm font-bold rounded-full py-2 px-4 outline-none cursor-pointer text-center w-full max-w-xs"
                id="currency-selector-mobile"
              >
                {Object.keys(CURRENCIES).map((code) => (
                  <option key={code} value={code} className="bg-bg-secondary text-text-primary font-mono">
                    {CURRENCIES[code].label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => scrollToSection("contact")}
                className="group flex w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand-blue to-brand-pink py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:scale-105"
                id="nav-cta-mobile"
              >
                <span>Free Assessment Call</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

