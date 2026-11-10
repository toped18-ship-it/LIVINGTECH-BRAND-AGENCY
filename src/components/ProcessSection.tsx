import React from 'react';
import { MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { getWhatsAppServiceUrl } from '../utils/whatsapp';

export const ProcessSection: React.FC = () => {
  const whatsappDiscussUrl = getWhatsAppServiceUrl('discuss-project');

  return (
    <section id="process" className="py-20 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-400 text-cyan-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Clear & Transparent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How the Process Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From your first message to project completion, our collaboration is straightforward,
            communicative, and aligned with your timeline.
          </p>
        </div>

        {/* 4 Steps Neon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {BUSINESS_CONFIG.processSteps.map((stepItem) => (
            <div
              key={stepItem.step}
              className="relative p-6 rounded-2xl bg-white border-2 border-cyan-400 hover:border-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_32px_rgba(6,182,212,0.45)] flex flex-col justify-between"
            >
              <div>
                {/* Step Number Badge */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-lg mb-4 shadow-[0_0_12px_rgba(6,182,212,0.35)]">
                  {stepItem.step}
                </div>

                <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-600 font-bold mb-1">
                  Step 0{stepItem.step}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {stepItem.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {stepItem.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                LIVINGTECH WORKFLOW
              </div>
            </div>
          ))}
        </div>

        {/* Action CTA */}
        <div className="mt-12 text-center">
          <a
            href={whatsappDiscussUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base shadow-[0_0_18px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-95 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="mt-2 text-xs text-slate-500">
            Opens direct WhatsApp conversation with Temitope Oluwaseun (08155305685)
          </p>
        </div>
      </div>
    </section>
  );
};
