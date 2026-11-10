import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border-2 border-cyan-400 p-6 sm:p-8 shadow-[0_0_40px_rgba(6,182,212,0.35)] overflow-y-auto max-h-[85vh]">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-cyan-50 border-2 border-cyan-400 text-cyan-600 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
            {isPrivacy ? <ShieldCheck className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              {BUSINESS_CONFIG.businessName} &bull; Abocho, Kogi State
            </p>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
          {isPrivacy ? (
            <>
              <p>
                At <strong>{BUSINESS_CONFIG.businessName}</strong>, we respect your personal privacy.
                This Privacy Policy explains how information provided through our website, contact forms,
                training registration, or WhatsApp channels is handled.
              </p>
              <h4 className="font-bold text-slate-900 text-sm">1. Information We Collect</h4>
              <p>
                We only collect information voluntarily submitted by you, such as your full name, telephone/WhatsApp
                number, email address, and project or training preferences when requesting quotes or enrolling in
                our digital skills programs.
              </p>
              <h4 className="font-bold text-slate-900 text-sm">2. Use of Information</h4>
              <p>
                Your contact details are used strictly to communicate project proposals, discuss service requirements,
                and send educational updates regarding computer training cohorts in Abocho, Kogi State. We never sell,
                rent, or distribute your personal details to third parties.
              </p>
              <h4 className="font-bold text-slate-900 text-sm">3. Contact Us</h4>
              <p>
                If you have questions about your data or wish to update your details, contact us directly at{' '}
                <a href={`mailto:${BUSINESS_CONFIG.contact.email}`} className="text-cyan-600 font-semibold underline">
                  {BUSINESS_CONFIG.contact.email}
                </a>{' '}
                or call {BUSINESS_CONFIG.contact.phoneFormatted}.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to <strong>{BUSINESS_CONFIG.businessName}</strong>. By accessing our website or engaging
                our professional digital services, you acknowledge the following terms:
              </p>
              <h4 className="font-bold text-slate-900 text-sm">1. Scope of Services</h4>
              <p>
                LivingTech Brand Agency delivers digital design, website development, application engineering,
                computer training, and business technology consulting. All specific project scopes, timelines,
                and milestone deliverables are outlined and agreed upon individually in official project proposals.
              </p>
              <h4 className="font-bold text-slate-900 text-sm">2. Intellectual Property & Deliverables</h4>
              <p>
                Upon completion and full settlement of an agreed project, client-specific assets (logos, custom website
                code, graphics) are transferred according to project agreement terms. Proprietary templates,
                curriculum materials, and core frameworks remain the intellectual property of LivingTech Brand Agency.
              </p>
              <h4 className="font-bold text-slate-900 text-sm">3. Training Programs</h4>
              <p>
                Registration for our youth skill acquisition cohorts is confirmed in-person or via official WhatsApp
                channels. Seat allocation and schedule details are provided upon verification.
              </p>
            </>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-slate-200 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
