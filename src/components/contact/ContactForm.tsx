import React, { useState } from 'react';
import { CONTACT_SUBJECTS } from '../../data/contactData';
import { Send, CheckCircle2, AlertTriangle, Loader2, Lock, ExternalLink } from 'lucide-react';

interface ContactFormProps {
  onGoToPortal?: () => void;
  forceErrorDemo?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onGoToPortal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: 'general',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  const selectedSubjectObj = CONTACT_SUBJECTS.find((s) => s.id === formData.subject);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setFormError('Please complete the required fields: Name, Email, and Message.');
      return;
    }

    setStatus('error');
    setFormError('Direct message delivery is not connected yet. Please email magniarventures@gmail.com or call 8798250520.');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: 'general',
      message: '',
    });
    setStatus('idle');
    setFormError('');
  };

  return (
    <section className="py-16 sm:py-24 border-b border-white/10 bg-[#080B10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10 space-y-2">
            <span className="font-mono text-xs text-[#B89A72] tracking-[0.2em] uppercase font-semibold block">
              [ 01 — GENERAL CONTACT FORM ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight">
              SEND US A NOTE
            </h2>
            <p className="text-xs sm:text-sm text-[#8D949E]">
              Fill out the details below. For new client inquiries or growth projects, please use Start a Project.
            </p>
          </div>

          {/* Form / State Container */}
          <div className="p-6 sm:p-10 bg-[#050505] border border-white/10 relative">
            {status === 'success' ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 bg-[#B89A72]/10 border border-[#B89A72]/40 rounded-full flex items-center justify-center mx-auto text-[#B89A72]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#B89A72] uppercase tracking-widest font-bold">
                    [ SUBMISSION RECEIVED ]
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">
                    MESSAGE SENT.
                  </h3>
                  <p className="text-sm text-[#8D949E] max-w-md mx-auto leading-relaxed">
                    Thanks for reaching out. We'll review your message and get back to you if a response is required.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-white/5 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Banner if submit error */}
                {status === 'error' && (
                  <div className="p-4 bg-red-950/40 border border-red-500/50 text-red-300 text-xs font-mono flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                    <div>
                      <span className="font-bold block">MESSAGE COULD NOT BE SENT.</span>
                      <span>{formError || 'Please check required fields (Name, Email, Message) and try again.'}</span>
                    </div>
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="block font-mono text-xs text-white uppercase font-semibold">
                      NAME <span className="text-[#B89A72]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#080B10] border border-white/15 focus:border-[#B89A72] text-white text-sm focus:outline-none transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="block font-mono text-xs text-white uppercase font-semibold">
                      WORK EMAIL <span className="text-[#B89A72]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#080B10] border border-white/15 focus:border-[#B89A72] text-white text-sm focus:outline-none transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* Company & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-company" className="block font-mono text-xs text-white uppercase font-semibold">
                      COMPANY
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      placeholder="e.g. Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-[#080B10] border border-white/15 focus:border-[#B89A72] text-white text-sm focus:outline-none transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-phone" className="block font-mono text-xs text-white uppercase font-semibold">
                      PHONE <span className="text-[#8D949E] text-[10px] font-normal">(OPTIONAL)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="e.g. +1 (555) 019-2831"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#080B10] border border-white/15 focus:border-[#B89A72] text-white text-sm focus:outline-none transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* Subject Selector */}
                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="block font-mono text-xs text-white uppercase font-semibold">
                    SUBJECT <span className="text-[#B89A72]">*</span>
                  </label>
                  <select
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[#080B10] border border-white/15 focus:border-[#B89A72] text-white text-sm focus:outline-none transition-colors font-mono cursor-pointer"
                  >
                    {CONTACT_SUBJECTS.map((s) => (
                      <option key={s.id} value={s.id} className="bg-[#050505] text-white">
                        {s.label} — {s.description}
                      </option>
                    ))}
                  </select>

                  {/* Existing Client Specific Notice */}
                  {selectedSubjectObj?.hintMessage && (
                    <div className="mt-3 p-4 bg-[#0A0D12] border border-[#B89A72]/40 text-xs text-[#B89A72] font-mono flex items-start gap-3">
                      <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-white font-bold">{selectedSubjectObj.hintMessage}</p>
                        {onGoToPortal && (
                          <button
                            type="button"
                            onClick={onGoToPortal}
                            className="underline text-[#B89A72] hover:text-white inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>GO TO CLIENT PORTAL</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="block font-mono text-xs text-white uppercase font-semibold">
                    MESSAGE <span className="text-[#B89A72]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Describe what you would like to discuss..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#080B10] border border-white/15 focus:border-[#B89A72] text-white text-sm focus:outline-none transition-colors font-sans resize-y"
                  />
                </div>

                {/* Privacy Notice */}
                <p className="text-[11px] text-[#8D949E] font-mono leading-relaxed">
                  By submitting this form, you agree that Magniar may use the information provided to respond to your request.
                </p>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto px-8 py-4 bg-[#B89A72] text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#8F714D] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(184,154,114,0.25)]"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
