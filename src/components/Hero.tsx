import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageSquare, Sparkles, Code2, Palette, Laptop, CheckCircle2, ChevronDown } from 'lucide-react';
import { BUSINESS_CONFIG, BusinessConfig } from '../config/business';
import { AdminStore } from '../services/adminStore';
import { getWhatsAppServiceUrl } from '../utils/whatsapp';
import { navigateTo } from '../utils/navigation';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  const [config, setConfig] = useState<BusinessConfig>(() => AdminStore.getConfig());
  const whatsappUrl = getWhatsAppServiceUrl('general');

  useEffect(() => {
    const handleUpdate = () => {
      setConfig(AdminStore.getConfig());
    };
    window.addEventListener('livingtech_config_updated', handleUpdate);
    return () => window.removeEventListener('livingtech_config_updated', handleUpdate);
  }, []);

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white"
    >
      {/* Subtle atmospheric ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] bg-gradient-to-tr from-cyan-400/15 via-blue-400/10 to-teal-400/15 blur-3xl pointer-events-none rounded-full"
        aria-hidden="true"
      />
      <div
        className="absolute top-12 right-10 w-72 h-72 bg-cyan-400/10 blur-2xl pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Main Hero Copy (Left Column) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-400 text-cyan-800 text-xs font-semibold mb-6 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Digital Agency &bull; Abocho, Kogi State, Nigeria</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-extrabold text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.15]">
              Building Brands.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600">
                Creating Digital Solutions.
              </span>{' '}
              Empowering People.
            </h1>

            {/* Supporting Text */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {BUSINESS_CONFIG.heroSupportingText}
            </p>

            {/* Quick Who We Serve Badges */}
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2 text-xs text-slate-600 font-medium">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">Businesses</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">Schools</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">Churches & Ministries</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">Entrepreneurs</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">Youths & Students</span>
            </div>

            {/* CTA Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigateTo('/portfolio')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-800 hover:text-cyan-600 hover:border-cyan-400 font-bold text-sm sm:text-base transition-all shadow-sm cursor-pointer"
              >
                <span>View Projects Handled</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-400 text-emerald-700 font-bold text-sm sm:text-base shadow-[0_0_12px_rgba(16,185,129,0.2)] transition-all"
                title="Open WhatsApp chat with LivingTech"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Technology & Creative Preview Composition (Right Column with Neon Card) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl bg-white border-2 border-cyan-400 p-5 sm:p-6 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_42px_rgba(6,182,212,0.45)] transition-all">
              {/* Window Controls Top bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[11px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                  livingtech.name.ng
                </div>
              </div>

              {/* Optional Custom Hero Banner Showcase Image */}
              {config.heroBannerUrl && (
                <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-slate-200 shadow-md">
                  <img
                    src={config.heroBannerUrl}
                    alt="LivingTech Showcase Banner"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              )}

              {/* Project Showcase Highlights */}
              <div className="space-y-3">
                <div
                  onClick={() => navigateTo('/portfolio')}
                  className="p-3.5 rounded-xl bg-slate-50 border border-cyan-200 hover:border-cyan-400 hover:shadow-[0_0_14px_rgba(6,182,212,0.25)] transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-100 border border-cyan-300 text-cyan-700 shrink-0 group-hover:scale-105 transition-transform">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">LivingstoneEdu Platform</h2>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800 border border-cyan-300 font-semibold">
                          EdTech
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Interactive digital learning ecosystem, student records, and modern educational resources.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => navigateTo('/portfolio')}
                  className="p-3.5 rounded-xl bg-slate-50 border border-teal-200 hover:border-teal-400 hover:shadow-[0_0_14px_rgba(20,184,166,0.25)] transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-teal-100 border border-teal-300 text-teal-700 shrink-0 group-hover:scale-105 transition-transform">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors">Brand Identity & Print Suites</h2>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-300 font-semibold">
                          Branding
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        High-impact visual communication, event banners, and church media packages across Kogi State.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => navigateTo('/portfolio')}
                  className="p-3.5 rounded-xl bg-slate-50 border border-emerald-200 hover:border-emerald-400 hover:shadow-[0_0_14px_rgba(16,185,129,0.25)] transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-700 shrink-0 group-hover:scale-105 transition-transform">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">School Management & Portals</h2>
                        <span className="text-[10px] font-sans font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                          Completed
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Custom digital architecture deployed for administrative workflows and termly result portals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Trust Metrics */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-1 text-emerald-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-[11px] text-slate-700 font-semibold">Live Client Deployments</span>
                </div>
                <div className="flex items-center gap-1 text-cyan-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-[11px] text-slate-700 font-semibold">Custom Built Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explore projects indicator */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('featured-projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-cyan-600 font-semibold transition-colors cursor-pointer"
            aria-label="Explore projects handled"
          >
            <span>Explore Projects Handled</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-cyan-600" />
          </button>
        </div>
      </div>
    </section>
  );
};
