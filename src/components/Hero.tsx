import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageSquare, Sparkles, Code2, Palette, Laptop, CheckCircle2, ChevronDown } from 'lucide-react';
import { BUSINESS_CONFIG, BusinessConfig } from '../config/business';
import { AdminStore } from '../services/adminStore';
import { getWhatsAppServiceUrl } from '../utils/whatsapp';

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
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-950 via-[#070e24] to-slate-950"
    >
      {/* Subtle atmospheric ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-teal-500/10 blur-3xl pointer-events-none rounded-full"
        aria-hidden="true"
      />
      <div
        className="absolute top-12 right-10 w-72 h-72 bg-cyan-500/5 blur-2xl pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Main Hero Copy (Left Column) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs font-medium mb-6 backdrop-blur-sm shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Digital Agency &bull; Abocho, Kogi State, Nigeria</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-extrabold text-white tracking-tight leading-[1.18] sm:leading-[1.15]">
              Building Brands.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
                Creating Digital Solutions.
              </span>{' '}
              Empowering People.
            </h1>

            {/* Supporting Text */}
            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {BUSINESS_CONFIG.heroSupportingText}
            </p>

            {/* Quick Who We Serve Badges */}
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2 text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">Businesses</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">Schools</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">Churches & Ministries</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">Entrepreneurs</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">Youths & Students</span>
            </div>

            {/* CTA Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white font-semibold text-sm sm:text-base transition-all"
              >
                <span>Explore Our Services</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-semibold text-sm sm:text-base transition-all"
                title="Open WhatsApp chat with LivingTech"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Technology & Creative Preview Composition (Right Column) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800/90 p-5 sm:p-6 shadow-2xl shadow-cyan-950/20">
              {/* Window Controls Top bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                  livingtech.name.ng
                </div>
              </div>

              {/* Optional Custom Hero Banner Showcase Image */}
              {config.heroBannerUrl && (
                <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-slate-800/80 shadow-md">
                  <img
                    src={config.heroBannerUrl}
                    alt="LivingTech Showcase Banner"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>
              )}

              {/* Service Matrix Highlights */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold text-white">Web & App Engineering</h2>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                          Production
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        High-speed websites, school portals, church platforms, and custom digital software.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-teal-500/40 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold text-white">Graphic Design & Branding</h2>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800/50">
                          Creative
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Church flyers, business logos, event banners, and high-impact visual communication.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold text-white">Computer Training & Youth Skills</h2>
                        <span className="text-[10px] font-sans font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                          ₦1,500 Cohort
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Practical hands-on computer operations, graphic design, and workplace digital skills in Abocho.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Trust Metrics (truthful & clean) */}
              <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-[11px] text-slate-300">Fast WhatsApp Response</span>
                </div>
                <div className="flex items-center gap-1 text-cyan-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-[11px] text-slate-300">Custom Built Solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator to tease services without scrolling friction */}
        <div className="mt-10 flex justify-center">
          <a
            href="#services"
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
            aria-label="Scroll to services"
          >
            <span>Explore Services</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
