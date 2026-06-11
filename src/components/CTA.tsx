import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, CheckCircle, Mail, Globe, Calendar, MessageSquareCode, LogOut, Loader2, AlertCircle } from "lucide-react";
import { useCurrency } from "../CurrencyContext";
import { googleSignIn, createCalendarEvent, logout, initAuth } from "../lib/googleAuth";
import { submitContactForm } from "../lib/contact";
import { User } from "firebase/auth";

export default function CTA() {
  const { currentCurrency, formatValue } = useCurrency();

  const [inquired, setInquired] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "calendar">("form");
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);

  // User auth state cached in memory
  const [user, setUser] = useState<User | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Submit and loading states
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [calendarLink, setCalendarLink] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    spend: "",
    details: "",
  });

  // Dynamically formatted spent tiers based on currency selection
  const adSpendTiers = [
    `< ${formatValue(600)} / mo`,
    `${formatValue(600)} - ${formatValue(3000)} / mo`,
    `${formatValue(3000)} - ${formatValue(15000)} / mo`,
    `${formatValue(15000)}+ / mo`,
  ];

  // Align active spend with selected tier when currency changes
  useEffect(() => {
    if (!formData.spend || !adSpendTiers.includes(formData.spend)) {
      setFormData((prev) => ({ ...prev, spend: adSpendTiers[0] })); // default to first tier (< 50,000)
    }
  }, [currentCurrency]);

  // Handle auto-signin listen
  useEffect(() => {
    const unsubscribe = initAuth(
      (u, token) => {
        setUser(u);
        if (token) {
          setUserToken(token);
          // Auto-fill Google details
          setFormData((prev) => ({
            ...prev,
            name: prev.name || u.displayName || "",
            email: prev.email || u.email || "",
          }));
        }
      },
      () => {
        setUser(null);
        setUserToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleConnectGoogle = async () => {
    setIsAuthenticating(true);
    setSubmitError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setUserToken(res.accessToken);
        setFormData((prev) => ({
          ...prev,
          name: prev.name || res.user.displayName || "",
          email: prev.email || res.user.email || "",
        }));
      }
    } catch (err: any) {
      setSubmitError(err.message || "Failed to authorize Google integration.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setUserToken(null);
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setSubmitError("Representative Name and Contact Email are required.");
      return;
    }

    setSubmitStatus("submitting");
    setSubmitError(null);

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        website: formData.website,
        spend: formData.spend,
        details: formData.details,
      });

      setSubmitStatus("success");
      setInquired(true);
    } catch (err: unknown) {
      console.error(err);
      setSubmitStatus("error");
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Failed to send inquiry. Please try again."
      );
    }
  };

  const handleBookSpot = async (dayLabel: string, timeLabel: string) => {
    if (!formData.name || !formData.email) {
      setSubmitError("Please fill out your Name and Contact Email above to reserve an interactive slot.");
      return;
    }

    setSubmitStatus("submitting");
    setSubmitError(null);
    setSelectedSpot(`${dayLabel} at ${timeLabel}`);

    try {
      let activeToken = userToken;

      if (!activeToken) {
        const loginVal = await googleSignIn();
        if (loginVal) {
          setUser(loginVal.user);
          setUserToken(loginVal.accessToken);
          activeToken = loginVal.accessToken;
        } else {
          throw new Error("Calendar reservation requires Google account authority.");
        }
      }

      const result = await createCalendarEvent({
        name: formData.name,
        senderEmail: formData.email,
        dayLabel,
        timeLabel,
      }, activeToken!);

      if (result.htmlLink) {
        setCalendarLink(result.htmlLink);
      }

      setSubmitStatus("success");
      setInquired(true);
    } catch (err: any) {
      console.error(err);
      setSubmitStatus("error");
      setSubmitError(err.message || "Failed to schedule on Google Calendar.");
    }
  };

  const calendarSpots = [
    { id: "s1", time: "10:30 AM", day: "Tomorrow (Wed)" },
    { id: "s2", time: "2:00 PM", day: "Tomorrow (Wed)" },
    { id: "s3", time: "11:00 AM", day: "Thursday" },
    { id: "s4", time: "4:30 PM", day: "Thursday" },
  ];

  return (
    <section className="relative overflow-hidden bg-bg-primary py-28 border-t border-border-primary" id="contact">
      
      {/* Dynamic Mesh Grid Background overlay */}
      <div className="absolute inset-0 bg-bg-primary/95" />
      
      {/* Drifting gradient visual spots */}
      <div className="absolute top-[-10%] left-[20%] h-[400px] w-[400px] rounded-full bg-linear-to-tr from-brand-blue/15 to-brand-pink/15 blur-[120px] animate-orb-1" />
      <div className="absolute bottom-[20%] right-[10%] h-[350px] w-[350px] rounded-full bg-brand-pink/10 to-transparent blur-[110px] animate-orb-2" />

      {/* Structured Layout grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* Left Panel text branding - 5 cols */}
          <div className="lg:col-span-12 xl:col-span-5 text-left" id="cta-heading-pane">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-sm font-bold uppercase tracking-widest text-brand-blue">
                UNLOCK SYSTEM
              </span>
              <h2 className="mt-3 font-display text-5xl font-bold tracking-tight text-text-primary sm:text-6xl">
                Ready to Scale <br />
                <span className="text-gradient">Your Brand?</span>
              </h2>
              <p className="mt-6 font-sans text-lg leading-relaxed text-text-secondary">
                Book a structured growth assessment. Our lead diagnostic engineers will audit your current Google/Meta performance and outline concrete execution milestones, linked securely with your custom channels.
              </p>

              {/* Trust validation checklist */}
              <div className="mt-8 space-y-3" id="cta-trust-items">
                <div className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                    <CheckCircle className="h-3 w-3" />
                  </div>
                  <span className="font-sans text-lg font-semibold text-text-secondary">Detailed Paid Advertising Audit included</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                    <CheckCircle className="h-3 w-3" />
                  </div>
                  <span className="font-sans text-lg font-semibold text-text-secondary">Website load speed diagnostics report</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                    <CheckCircle className="h-3 w-3" />
                  </div>
                  <span className="font-sans text-lg font-semibold text-text-secondary">No retainer locked under test periods</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Interactive Booking Platform Card - 7 cols */}
          <div className="lg:col-span-12 xl:col-span-7" id="cta-interactive-widget">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-border-primary bg-card-bg p-6 md:p-8 backdrop-blur-md shadow-2xl"
            >
              {/* Google sign-in only required for calendar booking */}
              {activeTab === "calendar" && (
                <div className="mb-6 flex items-center justify-between rounded-2xl bg-bg-secondary border border-border-primary p-4 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${user ? "bg-emerald-400" : "bg-zinc-600"}`}></span>
                      <span className={`relative inline-flex h-2 w-2 rounded-full ${user ? "bg-emerald-500" : "bg-zinc-500"}`}></span>
                    </span>
                    <span className="font-sans text-text-tertiary text-xs text-left">
                      {user ? (
                        <span>Google Calendar: <strong className="text-text-primary font-semibold">{user.email}</strong></span>
                      ) : (
                        <span>Connect Google to book a calendar slot</span>
                      )}
                    </span>
                  </div>
                  {user ? (
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-1 font-mono text-[9px] text-brand-blue hover:text-text-primary uppercase tracking-widest font-bold border border-border-primary rounded-full px-3 py-1 cursor-pointer transition-colors hover:bg-card-hover-bg"
                    >
                      <LogOut className="h-2.5 w-2.5" />
                      <span>Disconnect</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleConnectGoogle}
                      disabled={isAuthenticating}
                      className="font-mono text-[9px] text-brand-blue hover:text-white uppercase tracking-widest font-bold border border-brand-blue/30 rounded-full px-3 py-1 cursor-pointer transition-colors bg-brand-blue/10"
                    >
                      {isAuthenticating ? "Connecting..." : "Connect"}
                    </button>
                  )}
                </div>
              )}

              <AnimatePresence mode="wait">
                {!inquired ? (
                  <motion.div
                    key="booking-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Toggles between Contact form and Calendar */}
                    <div className="flex rounded-xl bg-bg-secondary p-1 border border-border-primary uppercase" id="cta-selector-headers">
                      <button
                        type="button"
                        onClick={() => setActiveTab("form")}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 font-display text-xs font-bold transition-all duration-300 cursor-pointer ${
                          activeTab === "form" ? "bg-brand-blue text-white shadow-md" : "text-text-tertiary hover:text-text-primary"
                        }`}
                      >
                        <MessageSquareCode className="h-3.5 w-3.5" />
                        <span>Instant Request</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab("calendar")}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 font-display text-xs font-bold transition-all duration-300 cursor-pointer ${
                          activeTab === "calendar" ? "bg-brand-blue text-white shadow-md" : "text-text-tertiary hover:text-text-primary"
                        }`}
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Interactive Calendar</span>
                      </button>
                    </div>

                    {/* Shared Info Fields */}
                    <div className="grid gap-4 sm:grid-cols-2" id="cta-contact-basics">
                      <div>
                        <label className="block font-mono text-xs uppercase tracking-widest text-text-tertiary mb-1.5" htmlFor="field-name">NAME / REPRESENTATIVE *</label>
                        <input
                          type="text"
                          id="field-name"
                          required
                          placeholder="e.g. Liam Cross"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-xl border border-border-primary bg-bg-secondary px-4 py-3 font-sans text-base text-text-primary placeholder-text-tertiary outline-none transition-all focus:border-brand-blue focus:bg-card-hover-bg"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-xs uppercase tracking-widest text-text-tertiary mb-1.5" htmlFor="field-email">CONTACT EMAIL *</label>
                        <input
                          type="email"
                          id="field-email"
                          required
                          placeholder="e.g. liam@lumina.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-xl border border-border-primary bg-bg-secondary px-4 py-3 font-sans text-base text-text-primary placeholder-text-tertiary outline-none transition-all focus:border-brand-blue focus:bg-card-hover-bg"
                        />
                      </div>
                    </div>

                    {/* Submit Status notification line */}
                    {submitError && (
                      <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-red-400 text-xs">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span className="text-left">{submitError}</span>
                      </div>
                    )}

                    {/* Rendering target panels */}
                    {activeTab === "form" && (
                      <form onSubmit={handleSubmitInquiry} className="space-y-4 animate-fade-in" id="inquiry-submit-form">
                        
                        {/* Company Website */}
                        <div>
                          <label className="block font-mono text-xs uppercase tracking-widest text-text-tertiary mb-1.5" htmlFor="field-web">BRAND WEBSITE URL</label>
                          <div className="relative">
                            <input
                              type="url"
                              id="field-web"
                              placeholder="e.g. https://lumina.com"
                              value={formData.website}
                              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                              className="w-full rounded-xl border border-border-primary bg-bg-secondary px-4 py-3 font-sans text-base text-text-primary placeholder-text-tertiary outline-none transition-all focus:border-brand-blue focus:bg-card-hover-bg"
                            />
                            <Globe className="absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-tertiary" />
                          </div>
                        </div>

                        {/* Monthly ad spend tiers */}
                        <div>
                          <label className="block font-mono text-xs uppercase tracking-widest text-text-tertiary mb-2">MONTHLY MARKETING SPEND</label>
                          <div className="grid grid-cols-2 gap-2" id="spend-pills-selection">
                            {adSpendTiers.map((tier) => (
                              <button
                                key={tier}
                                type="button"
                                onClick={() => setFormData({ ...formData, spend: tier })}
                                className={`rounded-xl border py-3 text-center font-sans text-sm font-semibold cursor-pointer transition-all duration-300 ${
                                  formData.spend === tier
                                    ? "border-brand-blue bg-brand-blue/10 text-brand-blue font-bold"
                                    : "border-border-primary bg-bg-secondary text-text-tertiary hover:border-border-primary hover:bg-card-hover-bg hover:text-text-primary"
                                }`}
                              >
                                {tier}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Custom project descriptors */}
                        <div>
                          <label className="block font-mono text-xs uppercase tracking-widest text-text-tertiary mb-1.5" htmlFor="field-desc">Briefly describe your bottlenecks</label>
                          <textarea
                            id="field-desc"
                            rows={3}
                            placeholder="Tell us about your meta limits, Amazon listing penalties, or conversion goals..."
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            className="w-full rounded-xl border border-border-primary bg-bg-secondary px-4 py-3 font-sans text-base text-text-primary placeholder-text-tertiary outline-none transition-all focus:border-brand-blue focus:bg-card-hover-bg"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={submitStatus === "submitting"}
                          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue py-4 font-display text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer disabled:opacity-50"
                          id="submit-inquiry-btn"
                        >
                          {submitStatus === "submitting" ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin text-white" />
                              <span>Sending inquiry...</span>
                            </>
                          ) : (
                            <>
                              <span>Secure Free Growth Diagnosis</span>
                              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </>
                          )}
                        </button>

                      </form>
                    )}

                    {activeTab === "calendar" && (
                      <div className="space-y-6 animate-fade-in" id="calendar-booking-pnl">
                        <div className="text-center rounded-xl bg-brand-pink/5 border border-brand-pink/20 p-4">
                          <span className="font-mono text-[10px] text-brand-pink font-bold uppercase">AVAILABLE SLOTS METRICS</span>
                          <p className="mt-1 font-sans text-xs text-text-tertiary">
                            Select an interactive slot below to link on the Google Calendar.
                          </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2" id="calendar-pills-deck">
                          {calendarSpots.map((spot) => (
                            <button
                              key={spot.id}
                              type="button"
                              disabled={submitStatus === "submitting"}
                              onClick={() => handleBookSpot(spot.day, spot.time)}
                              className="group flex flex-col items-center justify-center rounded-2xl border border-border-primary bg-bg-secondary p-4 text-center cursor-pointer transition-all duration-300 hover:border-brand-pink hover:bg-brand-pink/10 disabled:opacity-50"
                            >
                              <span className="font-sans text-[11px] text-text-tertiary group-hover:text-text-secondary">{spot.day}</span>
                              <span className="mt-1 font-display text-lg font-extrabold text-text-primary">{spot.time}</span>
                              <span className="mt-1 font-mono text-[8px] tracking-widest uppercase text-brand-blue group-hover:text-brand-pink font-semibold">
                                {submitStatus === "submitting" && selectedSpot?.includes(spot.time) ? "BOOKING..." : "CLICK TO BOOK"}
                              </span>
                            </button>
                          ))}
                        </div>

                        <p className="text-center font-mono text-[9px] text-text-tertiary">
                          UTC timezone selected matching standard server.
                        </p>
                      </div>
                    )}

                  </motion.div>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                    id="cta-success-feedback"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    
                    <h3 className="mt-6 font-display text-2xl font-bold text-text-primary">
                      Diagnostic Allocated!
                    </h3>

                    {activeTab === "form" ? (
                      <p className="mx-auto mt-4 max-w-sm font-sans text-base leading-relaxed text-text-secondary">
                        Thanks <span className="text-brand-blue font-bold">{formData.name || "partner"}</span> — your inquiry was received. Our team at <span className="text-brand-blue font-bold">magniarventures@gmail.com</span> will follow up shortly.
                      </p>
                    ) : (
                      <div className="mx-auto mt-4 max-w-sm space-y-4">
                        <p className="font-sans text-base leading-relaxed text-text-secondary">
                          Successfully reserved spot: <span className="text-brand-blue font-bold">{selectedSpot}</span>. Your Google Calendar event has been injected into your primary node, inviting <span className="text-text-primary font-bold">magniarventures@gmail.com</span>.
                        </p>
                        {calendarLink && (
                          <div className="pt-2">
                            <a
                              href={calendarLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-sm font-mono text-brand-blue hover:text-text-primary underline uppercase tracking-widest"
                            >
                              <span>Inspect Calendar Event</span>
                              <ArrowRight className="h-3 w-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-8 flex gap-3">
                      <button
                        onClick={() => {
                          setInquired(false);
                          setSelectedSpot(null);
                          setSubmitStatus("idle");
                          setCalendarLink("");
                        }}
                        className="rounded-xl border border-border-primary bg-bg-secondary px-6 py-3 font-display text-xs font-bold tracking-wider text-text-primary uppercase hover:bg-card-hover-bg"
                        id="cta-reset-btn"
                      >
                        Book another spot
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-tr from-transparent to-brand-blue/10" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
