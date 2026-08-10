import React, { useState } from 'react';
import { ClientContact, ContactRole } from '../../../types/clients';
import { X, UserPlus, ShieldCheck } from 'lucide-react';

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (contact: Omit<ClientContact, 'id'>) => void;
}

export const AddContactModal: React.FC<AddContactModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<ContactRole | string>('CMO');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onSubmit({
      name,
      role,
      email,
      phone,
      is_primary: isPrimary,
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] w-full max-w-lg p-6 space-y-5 font-mono text-xs text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-[#0099FF]" />
            <h3 className="font-bold text-sm text-white uppercase">ADD CLIENT CONTACT</h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Contact Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Maya Chen"
              className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-white/40 uppercase mb-1">Contact Role *</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
              >
                <option value="Founder">Founder</option>
                <option value="CEO">CEO</option>
                <option value="CMO">CMO</option>
                <option value="Marketing Director">Marketing Director</option>
                <option value="Head of Ecommerce">Head of Ecommerce</option>
                <option value="Developer">Developer</option>
                <option value="Finance">Finance Controller</option>
                <option value="Operations">Operations</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-white/40 uppercase mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. maya@company.com"
                className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +1 (555) 019-2831"
              className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isPrimary"
              checked={isPrimary}
              onChange={(e) => setIsPrimary(e.target.checked)}
              className="rounded bg-[#050505] border-white/20 text-[#0099FF] focus:ring-0"
            />
            <label htmlFor="isPrimary" className="text-xs text-white/80 cursor-pointer">
              Set as Primary Account Contact
            </label>
          </div>

          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Contact Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Responsibility, communication preferences, or authorization scope..."
              className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-[2px] border border-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0099FF] hover:bg-[#0099FF]/80 text-white font-bold rounded-[2px]"
            >
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
