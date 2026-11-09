import React from 'react';
import { ArrowLeft, Sparkles, ChevronRight } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

interface PageBannerProps {
  badge: string;
  title: string;
  subtitle: string;
  breadcrumb: string;
  children?: React.ReactNode;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  badge,
  title,
  subtitle,
  breadcrumb,
  children,
}) => {
  return (
    <div className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 bg-gradient-to-b from-slate-950 via-[#060c20] to-slate-950 border-b border-slate-800/80 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/10 to-teal-500/10 blur-3xl pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
          <button
            type="button"
            onClick={() => navigateTo('/')}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-cyan-300 font-medium">{breadcrumb}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{badge}</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {subtitle}
            </p>
          </div>

          {children && <div className="shrink-0">{children}</div>}
        </div>
      </div>
    </div>
  );
};
