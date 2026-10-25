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
    <section className="py-20 bg-slate-900/40 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Our Value Proposition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Choose LivingTech Brand Agency
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            We operate on transparency, technical craft, and a deep commitment to addressing real challenges
            faced by businesses, schools, and communities.
          </p>
        </div>

        {/* 8 Reason Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BUSINESS_CONFIG.whyChooseUs.map((item, idx) => {
            const IconComponent = ICON_MAP[item.icon] || Sparkles;

            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
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
