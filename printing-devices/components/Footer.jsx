import React from 'react';
import { Printer } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                <Printer className="w-5 h-5" />
              </div>
              <span className="font-display text-lg font-bold text-white tracking-tight">
                Device <span className="text-blue-500">Guides</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-xs">
              A comprehensive knowledge center offering educational guides, setup support instructions, wireless connectivity walkthroughs, and troubleshooting resources for HP printing devices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Resources</h4>
            <ul className="text-xs space-y-2.5">
              <li><a href="/printing-devices#setup" class="hover:text-white transition-colors">Printer Setup Guide</a></li>
              <li><a href="/printing-devices#wireless" class="hover:text-white transition-colors">Wireless Configuration</a></li>
              <li><a href="/printing-devices#scanning" class="hover:text-white transition-colors">Scanning Instructions</a></li>
              <li><a href="/printing-devices#maintenance" class="hover:text-white transition-colors">Device Maintenance</a></li>
            </ul>
          </div>

          {/* Compliance & Legal */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Legal &amp; Policy</h4>
            <ul className="text-xs space-y-2.5">
              <li><a href="/printing-devices/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/printing-devices/cookies" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="/printing-devices/terms" className="hover:text-white transition-colors">Terms of Use</a></li>
            </ul>
          </div>

          {/* Contact Node */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">General Inquiries</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              If you have general questions or need help finding specific printing resources, our team is available to assist:
            </p>
            <div className="text-xs space-y-1">
              <p className="text-white font-semibold">Phone: +1 (805) 994-0590</p>
              <p>Hours: Mon – Sat, 9:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Disclaimer Area */}
        <div className="border-t border-slate-800 pt-8 pb-4">
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-500 leading-relaxed max-w-4xl">
            <span className="font-bold text-slate-400 block mb-1">Independent Service Disclaimer</span>
            We provide independent educational content and general information about printing devices. We are not affiliated with, endorsed by, or sponsored by HP Inc. HP, Hewlett-Packard, OfficeJet, LaserJet, and related trademarks are the property of their respective owners. Any reference to HP products is for identification and informational purposes only.
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-mono">
          <p>&copy; {currentYear} Device Guides. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/printing-devices/privacy" className="hover:text-white transition-colors">Privacy</a>
            <span>|</span>
            <a href="/printing-devices/cookies" className="hover:text-white transition-colors">Cookies</a>
            <span>|</span>
            <a href="/printing-devices/terms" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
