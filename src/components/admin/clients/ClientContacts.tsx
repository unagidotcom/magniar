import React, { useState } from 'react';
import { ClientContact } from '../../../types/clients';
import { AddContactModal } from './AddContactModal';
import { User, Mail, Phone, Plus, Star, Shield, CheckCircle2 } from 'lucide-react';

interface ClientContactsProps {
  contacts: ClientContact[];
  onAddContact: (contact: Omit<ClientContact, 'id'>) => void;
}

export const ClientContacts: React.FC<ClientContactsProps> = ({ contacts, onAddContact }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between bg-[#0A0A0C] p-4 border border-white/10 rounded-[2px]">
        <div>
          <h3 className="font-bold text-white text-sm uppercase">CLIENT CONTACT DIRECTORY</h3>
          <p className="text-white/40 text-[11px] mt-0.5">
            Key personnel, executive sponsors, and operational stakeholders at this client organization.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-3 py-2 bg-[#0099FF] hover:bg-[#0099FF]/80 text-white font-bold rounded-[2px] flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Contact</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((cnt) => (
          <div
            key={cnt.id}
            className={`p-4 bg-[#0A0A0C] border rounded-[2px] space-y-3 relative ${
              cnt.is_primary ? 'border-[#0099FF]' : 'border-white/10'
            }`}
          >
            {cnt.is_primary && (
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 bg-[#0099FF]/10 border border-[#0099FF]/30 text-[#0099FF] font-bold text-[9px] rounded-[2px]">
                <Star className="w-3 h-3 fill-[#0099FF]" />
                <span>PRIMARY CONTACT</span>
              </div>
            )}

            <div className="space-y-1">
              <h4 className="font-bold text-white text-sm">{cnt.name}</h4>
              <p className="text-white/60 text-xs font-semibold">{cnt.role}</p>
            </div>

            <div className="space-y-1.5 text-xs border-t border-white/5 pt-2">
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="w-3.5 h-3.5 text-[#0099FF]" />
                <a href={`mailto:${cnt.email}`} className="hover:underline truncate">
                  {cnt.email}
                </a>
              </div>
              {cnt.phone && (
                <div className="flex items-center gap-2 text-white/80">
                  <Phone className="w-3.5 h-3.5 text-white/40" />
                  <span>{cnt.phone}</span>
                </div>
              )}
            </div>

            {cnt.notes && (
              <div className="p-2 bg-[#050505] border border-white/5 rounded-[2px] text-[11px] text-white/50 italic">
                "{cnt.notes}"
              </div>
            )}
          </div>
        ))}
      </div>

      <AddContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={onAddContact}
      />
    </div>
  );
};
