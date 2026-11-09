import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { ContactSection } from '../components/ContactSection';
import { BUSINESS_CONFIG } from '../config/business';
import { Phone, MessageSquare, Mail, MapPin } from 'lucide-react';

interface ContactPageProps {
  preselectedService?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ preselectedService }) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Dedicated Header Banner */}
      <PageBanner
        badge="Direct Consultation & Support"
        title="Contact LivingTech & Request a Quotation"
        subtitle="Have a project in mind or want to enquire about computer training? Reach out to founder Temitope Oluwaseun via phone, WhatsApp, or submit your project requirements below."
        breadcrumb="Contact"
      >
        <div className="flex flex-wrap gap-2.5">
          <a
            href={`https://wa.me/${BUSINESS_CONFIG.contact.whatsappInternational}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={`tel:${BUSINESS_CONFIG.contact.phone}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition-all"
          >
            <Phone className="w-4 h-4 text-cyan-400" />
            <span>Call {BUSINESS_CONFIG.contact.phoneFormatted}</span>
          </a>
        </div>
      </PageBanner>

      {/* Main Interactive Contact Section */}
      <ContactSection preselectedService={preselectedService} />
    </div>
  );
};
