import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { ProcessSection } from '../components/ProcessSection';
import { FAQSection } from '../components/FAQSection';
import { navigateTo } from '../utils/navigation';
import { ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { getWhatsAppServiceUrl } from '../utils/whatsapp';

interface ProcessPageProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onOpenQuoteModal }) => {
  const whatsappUrl = getWhatsAppServiceUrl('general');

  return (
    <div className="space-y-12 pb-16">
      {/* Dedicated Header Banner */}
      <PageBanner
        badge="How We Work & FAQ"
        title="Our Delivery Process & Common Questions"
        subtitle="Learn how LivingTech Brand Agency partners with you from initial consultation and scoping to final handover, along with clear answers to frequently asked client questions."
        breadcrumb="Process"
      >
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => onOpenQuoteModal()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            <span>Start Step 1: Tell Us Your Needs</span>
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

      {/* Main 4-Step Process Section */}
      <ProcessSection />

      {/* Comprehensive Client FAQ Section */}
      <FAQSection />

      {/* Next Step CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 p-8 sm:p-10 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Ready to kick off your project?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Get in touch directly. We review your requirements and provide an honest, transparent estimate with no hidden costs.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenQuoteModal()}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer shadow-md"
            >
              Request a Project Quote
            </button>
            <button
              type="button"
              onClick={() => navigateTo('/contact')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold cursor-pointer"
            >
              Contact LivingTech
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
