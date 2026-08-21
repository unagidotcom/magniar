import React, { useEffect, useState } from 'react';
import { Building2, RefreshCw, Save } from 'lucide-react';
import { AdminPageHeader } from '../AdminPageHeader';
import { AdminErrorState } from '../AdminErrorState';
import { AdminSkeletonTable } from '../AdminSkeleton';
import {
  BusinessSettings,
  defaultBusinessSettings,
  getBusinessSettings,
  saveBusinessSettings,
} from '../../../services/businessSettingsService';
import {
  AdminDisplayProfile,
  saveCurrentAdminDisplayProfile,
} from '../../../services/adminProfileService';

interface SettingsPageProps {
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
  simulatedState?: 'normal' | 'skeleton' | 'empty' | 'error';
  adminProfile: AdminDisplayProfile;
  onAdminProfileChange: (profile: AdminDisplayProfile) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  onTriggerToast,
  simulatedState = 'normal',
  adminProfile,
  onAdminProfileChange,
}) => {
  const [settings, setSettings] = useState<BusinessSettings>(defaultBusinessSettings);
  const [profileDraft, setProfileDraft] = useState<AdminDisplayProfile>(adminProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadSettings = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const row = await getBusinessSettings();
      setSettings(row);
    } catch (err: any) {
      console.error('Business settings load failed:', err);
      setLoadError(err?.message || 'Failed to load business settings.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadSettings();
  }, []);

  useEffect(() => {
    setProfileDraft(adminProfile);
  }, [adminProfile]);

  const updateField = (field: keyof BusinessSettings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateProfileField = (field: keyof AdminDisplayProfile, value: string) => {
    setProfileDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      const [saved, savedProfile] = await Promise.all([
        saveBusinessSettings(settings),
        saveCurrentAdminDisplayProfile(profileDraft),
      ]);
      setSettings(saved);
      setProfileDraft(savedProfile);
      onAdminProfileChange(savedProfile);
      onTriggerToast('success', 'Settings Saved', 'Business details and admin display profile were updated.');
    } catch (err: any) {
      console.error('Business settings save failed:', err);
      onTriggerToast('error', 'Settings Not Saved', err?.message || 'Could not save business settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass =
    'w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]';

  if (simulatedState === 'skeleton' || isLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 font-mono">
        <AdminPageHeader
          title="System Settings"
          subtitle="Business details used by invoice templates and operational documents."
          moduleCode="SYS-12 / SETTINGS"
        />
        <AdminSkeletonTable />
      </div>
    );
  }

  if (simulatedState === 'error' || loadError) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 font-mono">
        <AdminPageHeader
          title="System Settings"
          subtitle="Business details used by invoice templates and operational documents."
          moduleCode="SYS-12 / SETTINGS"
        />
        <AdminErrorState
          title="Failed to load business settings"
          message={loadError || 'Settings could not be loaded.'}
          onRetry={() => void loadSettings()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-mono text-xs">
      <AdminPageHeader
        title="System Settings"
        subtitle="Business details used by invoice templates and operational documents."
        moduleCode="SYS-12 / SETTINGS"
        showRefresh
        onRefresh={() => void loadSettings()}
      />

      <form onSubmit={handleSubmit} className="bg-[#0A0A0C] border border-white/10 rounded-[2px] p-5 space-y-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <Building2 className="w-4 h-4 text-[#0099FF]" />
          <h2 className="text-sm font-bold text-white uppercase">Admin Display Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Admin Display Name</label>
            <input
              value={profileDraft.displayName}
              onChange={(event) => updateProfileField('displayName', event.target.value)}
              className={inputClass}
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Display Email</label>
            <input
              type="email"
              value={profileDraft.displayEmail}
              onChange={(event) => updateProfileField('displayEmail', event.target.value)}
              className={inputClass}
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Role Label</label>
            <input
              value={profileDraft.roleLabel}
              onChange={(event) => updateProfileField('roleLabel', event.target.value)}
              className={inputClass}
              placeholder="Super Admin"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-white/10" />

        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <Building2 className="w-4 h-4 text-[#0099FF]" />
          <h2 className="text-sm font-bold text-white uppercase">Business & Invoice Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Legal Business Name</label>
            <input
              value={settings.legal_name}
              onChange={(event) => updateField('legal_name', event.target.value)}
              className={inputClass}
              placeholder="Registered legal business name"
            />
          </div>
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Display Name</label>
            <input
              value={settings.display_name}
              onChange={(event) => updateField('display_name', event.target.value)}
              className={inputClass}
              placeholder="Magniar"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Business Email</label>
            <input
              type="email"
              value={settings.email || ''}
              onChange={(event) => updateField('email', event.target.value)}
              className={inputClass}
              placeholder="billing@example.com"
            />
          </div>
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Phone</label>
            <input
              value={settings.phone || ''}
              onChange={(event) => updateField('phone', event.target.value)}
              className={inputClass}
              placeholder="+1 555 000 0000"
            />
          </div>
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Website</label>
            <input
              value={settings.website || ''}
              onChange={(event) => updateField('website', event.target.value)}
              className={inputClass}
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Default Currency</label>
            <input
              value={settings.default_currency}
              onChange={(event) => updateField('default_currency', event.target.value)}
              className={inputClass}
              placeholder="USD"
              maxLength={3}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Address Line 1</label>
            <input
              value={settings.address_line_1 || ''}
              onChange={(event) => updateField('address_line_1', event.target.value)}
              className={inputClass}
              placeholder="Street address"
            />
          </div>
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Address Line 2</label>
            <input
              value={settings.address_line_2 || ''}
              onChange={(event) => updateField('address_line_2', event.target.value)}
              className={inputClass}
              placeholder="Suite, unit, floor"
            />
          </div>
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">City</label>
            <input
              value={settings.city || ''}
              onChange={(event) => updateField('city', event.target.value)}
              className={inputClass}
              placeholder="City"
            />
          </div>
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">State / Region</label>
            <input
              value={settings.region || ''}
              onChange={(event) => updateField('region', event.target.value)}
              className={inputClass}
              placeholder="State or region"
            />
          </div>
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Postal Code</label>
            <input
              value={settings.postal_code || ''}
              onChange={(event) => updateField('postal_code', event.target.value)}
              className={inputClass}
              placeholder="Postal code"
            />
          </div>
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Country</label>
            <input
              value={settings.country || ''}
              onChange={(event) => updateField('country', event.target.value)}
              className={inputClass}
              placeholder="Country"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Tax ID Label</label>
            <input
              value={settings.tax_id_label || ''}
              onChange={(event) => updateField('tax_id_label', event.target.value)}
              className={inputClass}
              placeholder="EIN, VAT, GSTIN"
            />
          </div>
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Tax ID Value</label>
            <input
              value={settings.tax_id_value || ''}
              onChange={(event) => updateField('tax_id_value', event.target.value)}
              className={inputClass}
              placeholder="Tax registration number"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Payment Instructions</label>
            <textarea
              rows={5}
              value={settings.payment_instructions || ''}
              onChange={(event) => updateField('payment_instructions', event.target.value)}
              className={inputClass}
              placeholder="Bank transfer, UPI, wire, or provider-specific instructions."
            />
          </div>
          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Invoice Footer</label>
            <textarea
              rows={5}
              value={settings.invoice_footer || ''}
              onChange={(event) => updateField('invoice_footer', event.target.value)}
              className={inputClass}
              placeholder="Thank you note, late payment terms, or legal footer."
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 bg-[#0099FF] hover:bg-[#0099FF]/80 disabled:opacity-50 text-white font-bold rounded-[2px] inline-flex items-center gap-2"
          >
            {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save Business Details
          </button>
        </div>
      </form>
    </div>
  );
};
