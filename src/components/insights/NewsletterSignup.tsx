import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#0A0C0F] border border-white/10 rounded-[2px] p-8 sm:p-12 relative overflow-hidden my-12">
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#B89A72]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-6 relative z-10 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 bg-[#B89A72]/10 text-[#B89A72] border border-[#B89A72]/30 font-mono text-[10px] font-semibold rounded-[2px] uppercase tracking-wider inline-flex items-center gap-1.5">
              <Mail className="w-3 h-3" />
              EDITORIAL DISPATCH
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F7FA] font-sans">
              SIGNAL, NOT NOISE.
            </h3>
          </div>

          <p className="text-xs font-mono text-[#8D949E] max-w-sm leading-relaxed">
            Occasional notes on growth economics, performance marketing, commerce, technology, and AI strategy.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-[#10B981]/10 border border-[#10B981]/30 rounded-[2px] flex items-center justify-center sm:justify-start gap-3 font-mono text-xs text-[#10B981]">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>YOU'RE ON THE LIST. WE DISPATCH WHEN THERE IS SOMETHING WORTH SAYING.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER YOUR WORK EMAIL ADDRESS..."
              required
              className="flex-1 bg-[#050505] border border-white/15 focus:border-[#B89A72] text-[#F5F7FA] placeholder-[#5A626E] font-mono text-xs px-4 py-3 rounded-[2px] focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#B89A72] hover:bg-[#8F714D] text-white font-mono text-xs font-semibold rounded-[2px] transition-colors flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <span>SUBSCRIBE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="text-[10px] font-mono text-[#5A626E] flex items-center justify-center sm:justify-start gap-2">
          <span>NO SPAM. NO DAILY NAGGING. UNSUBSCRIBE ANY TIME.</span>
        </div>
      </div>
    </div>
  );
}
