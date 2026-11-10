import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageSquare } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { getWhatsAppServiceUrl } from '../utils/whatsapp';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const whatsappGeneralUrl = getWhatsAppServiceUrl('general');

  return (
    <section className="py-20 bg-white relative border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border-2 border-cyan-400 text-cyan-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Quick answers about our digital solutions, web design, creative branding, and computer training programs.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {BUSINESS_CONFIG.faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-2xl bg-white border-2 border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.2)] hover:shadow-[0_0_28px_rgba(6,182,212,0.38)] transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <span className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600 shrink-0 border border-cyan-300">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-cyan-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-10 p-6 rounded-2xl bg-white border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-center">
          <p className="text-xs sm:text-sm text-slate-700 font-medium mb-3">
            Have a question that is not covered here? Reach out to us directly on WhatsApp.
          </p>
          <a
            href={whatsappGeneralUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask LivingTech on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
