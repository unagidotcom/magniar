export interface ContactSubjectOption {
  id: string;
  label: string;
  description: string;
  hintMessage?: string;
}

export const CONTACT_SUBJECTS: ContactSubjectOption[] = [
  {
    id: 'general',
    label: 'GENERAL QUESTION',
    description: 'Inquiries about Magniar services, team, or general operations.',
  },
  {
    id: 'partnership',
    label: 'PARTNERSHIP',
    description: 'Technology integration, agency co-marketing, or vendor partnerships.',
  },
  {
    id: 'media',
    label: 'MEDIA / PRESS',
    description: 'Press inquiries, interview requests, or industry commentary.',
  },
  {
    id: 'technology',
    label: 'TECHNOLOGY',
    description: 'Engineering, security, or platform capability inquiries.',
  },
  {
    id: 'existing-client',
    label: 'EXISTING CLIENT',
    description: 'Active client communications or account coordination.',
    hintMessage: "If you're already a Magniar client, please use your Client Portal for account-specific requests.",
  },
  {
    id: 'other',
    label: 'OTHER',
    description: 'All other non-project inquiries.',
  },
];

export interface TimezoneOption {
  value: string;
  label: string;
  offset: string;
}

export const TIMEZONE_OPTIONS: TimezoneOption[] = [
  { value: 'Asia/Kolkata', label: 'Asia/Kolkata (IST)', offset: 'UTC+05:30' },
  { value: 'UTC', label: 'Coordinated Universal Time (UTC)', offset: 'UTC+00:00' },
  { value: 'America/New_York', label: 'Eastern Time (US & Canada)', offset: 'UTC-05:00' },
  { value: 'America/Chicago', label: 'Central Time (US & Canada)', offset: 'UTC-06:00' },
  { value: 'America/Denver', label: 'Mountain Time (US & Canada)', offset: 'UTC-07:00' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)', offset: 'UTC-08:00' },
  { value: 'Europe/London', label: 'London / GMT / BST', offset: 'UTC+00:00' },
  { value: 'Europe/Berlin', label: 'Berlin / Paris / CET', offset: 'UTC+01:00' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)', offset: 'UTC+08:00' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: 'UTC+09:00' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)', offset: 'UTC+10:00' },
];

export interface TimeSlot {
  id: string;
  time24: string;
  time12: string;
  available: boolean;
}

export const DEMO_TIME_SLOTS: TimeSlot[] = [
  { id: 'slot-1', time24: '09:00', time12: '09:00 AM', available: true },
  { id: 'slot-2', time24: '10:30', time12: '10:30 AM', available: true },
  { id: 'slot-3', time24: '12:00', time12: '12:00 PM', available: false },
  { id: 'slot-4', time24: '14:00', time12: '02:00 PM', available: true },
  { id: 'slot-5', time24: '15:30', time12: '03:30 PM', available: true },
  { id: 'slot-6', time24: '17:00', time12: '05:00 PM', available: true },
];

export interface ContactInfoField {
  label: string;
  value: string;
  subValue?: string;
  iconName: string;
}

export const CONTACT_OTHER_WAYS: ContactInfoField[] = [
  {
    label: 'GENERAL EMAIL',
    value: 'contact@magniar.com',
    subValue: 'Response time: Within 1-2 business days',
    iconName: 'Mail',
  },
  {
    label: 'BUSINESS HOURS',
    value: '09:00 - 18:00 UTC',
    subValue: 'Monday through Friday',
    iconName: 'Clock',
  },
  {
    label: 'GLOBAL DELIVERY',
    value: 'Americas • EMEA • APAC',
    subValue: 'Distributed technical team',
    iconName: 'Globe',
  },
  {
    label: 'SECURE PORTAL',
    value: 'portal.magniar.com',
    subValue: 'For active accounts & client requests',
    iconName: 'Lock',
  },
];
