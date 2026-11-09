import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { ServicesSection } from '../components/ServicesSection';
import { navigateTo } from '../utils/navigation';
import { MessageSquare, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { getWhatsAppServiceUrl } from '../utils/whatsapp';

interface ServicesPageProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenQuoteModal }) => {
  const whatsappUrl = getWhatsAppServiceUrl('general');

  return (
    <div className="space-y-12 pb-16">
      {/* Dedicated Header Banner */}
      <PageBanner
        badge="Full Service Catalog"
        title="Professional Services & Digital Solutions"
        subtitle="Explore our comprehensive suite of 8 core technical, design, educational, and business digitalization services built to strengthen operations, credibility, and revenue."
        breadcrumb="Services"
      >
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => onOpenQuoteModal()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition-all"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </PageBanner>

      {/* Main Interactive Services Catalog */}
      <ServicesSection onSelectServiceForQuote={onOpenQuoteModal} />

      {/* Custom Enterprise & Organization Consulting Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 border border-slate-800 p-8 sm:p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need a Customized Digital Package?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether you represent a private school requiring a custom management portal, a church planning a major crusade event, or an enterprise digitizing operations, we craft custom proposals tailored to your budget.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenQuoteModal()}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer shadow-md"
            >
              Request Custom Package Proposal
            </button>
            <button
              type="button"
              onClick={() => navigateTo('/contact')}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold cursor-pointer"
            >
              Visit Contact Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
