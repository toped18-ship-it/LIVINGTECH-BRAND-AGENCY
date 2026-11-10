import React from 'react';
import {
  Layers,
  Sliders,
  Sparkles,
  BookOpen,
  ShieldCheck,
  GraduationCap,
  MessageSquareText,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Layers,
  Sliders,
  Sparkles,
  BookOpen,
  ShieldCheck,
  GraduationCap,
  MessageSquareText,
  Target,
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-400 text-cyan-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
            <span>Our Value Proposition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose LivingTech Brand Agency
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            We operate on transparency, technical craft, and a deep commitment to addressing real challenges
            faced by businesses, schools, and communities.
          </p>
        </div>

        {/* 8 Reason Neon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BUSINESS_CONFIG.whyChooseUs.map((item, idx) => {
            const IconComponent = ICON_MAP[item.icon] || Sparkles;

            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border-2 border-cyan-400 hover:border-cyan-300 transition-all duration-300 shadow-[0_0_18px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-300 flex items-center justify-center text-cyan-600 mb-4 shadow-xs">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
