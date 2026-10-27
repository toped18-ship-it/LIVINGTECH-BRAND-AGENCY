import React from 'react';
import {
  User,
  MapPin,
  CheckCircle2,
  Code2,
  Palette,
  GraduationCap,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Share2,
  Check,
} from 'lucide-react';
import { BUSINESS_CONFIG, BusinessConfig } from '../config/business';
import { AdminStore } from '../services/adminStore';
import { getWhatsAppServiceUrl } from '../utils/whatsapp';
import { copyToClipboard, getSectionShareUrl } from '../utils/shareUtils';

interface AboutSectionProps {
  onOpenQuoteModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuoteModal }) => {
  const [copiedSection, setCopiedSection] = React.useState(false);
  const [config, setConfig] = React.useState<BusinessConfig>(() => AdminStore.getConfig());
  const whatsappUrl = getWhatsAppServiceUrl('general');

  React.useEffect(() => {
    const handleUpdate = () => {
      setConfig(AdminStore.getConfig());
    };
    window.addEventListener('livingtech_config_updated', handleUpdate);
    return () => window.removeEventListener('livingtech_config_updated', handleUpdate);
  }, []);

  const handleCopySectionLink = async () => {
    const url = getSectionShareUrl('about');
    await copyToClipboard(url, 'About LivingTech Brand Agency');
    setCopiedSection(true);
    setTimeout(() => setCopiedSection(false), 2500);
  };

  return (
    <section id="about" className="py-20 bg-slate-900/40 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story & Mission */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>About LivingTech</span>
              </div>
              <button
                type="button"
                onClick={handleCopySectionLink}
                className={`p-1 px-2.5 rounded-full text-[11px] font-semibold border flex items-center gap-1 transition-colors cursor-pointer ${
                  copiedSection
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                }`}
                title="Copy share link for About section"
              >
                {copiedSection ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3 text-cyan-400" />}
                <span>{copiedSection ? 'Copied' : 'Share Section'}</span>
              </button>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {BUSINESS_CONFIG.aboutCopy.heading}
            </h2>

            <div className="mt-6 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              {BUSINESS_CONFIG.aboutCopy.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Core Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <Code2 className="w-5 h-5 text-cyan-400 mb-2" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Practical Tech
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  Custom-tailored websites and software solving real operational tasks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <Palette className="w-5 h-5 text-teal-400 mb-2" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Creative Branding
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  Visual communication that dignifies your business or ministry.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <GraduationCap className="w-5 h-5 text-blue-400 mb-2" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Digital Skills
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  Empowering local youths and workers in Kogi State with practical skills.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <span>Work With Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Founder Profile (Temitope Oluwaseun) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
              {/* Profile Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
                {config.founderAvatarUrl ? (
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-cyan-500/40 shadow-lg shadow-cyan-500/20 shrink-0">
                    <img
                      src={config.founderAvatarUrl}
                      alt={config.ownerName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-cyan-500/20 shrink-0">
                    TO
                  </div>
                )}
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                    Founder & Lead Developer
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    {config.ownerName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Abocho, Dekina LGA, Kogi State</span>
                  </div>
                </div>
              </div>

              {/* Role & Professional Scope */}
              <div className="mt-5 space-y-4">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Professional Focus:
                  </div>
                  <div className="text-sm font-semibold text-cyan-300 mt-0.5">
                    {BUSINESS_CONFIG.ownerRole}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Temitope is dedicated to bridging the digital divide by providing dependable website design,
                  application development, graphic design, and hands-on digital skills instruction for schools,
                  churches, businesses, and youths across Kogi State and Nigeria.
                </p>

                {/* Scope points */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Specialized in responsive business & school web portals</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Creator of educational tech initiatives (LivingstoneEdu, LearnBible)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Trainer for youth digital literacy & practical design</span>
                  </div>
                </div>
              </div>

              {/* Direct Reach */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Direct Contact:</span>
                <a
                  href={`tel:${BUSINESS_CONFIG.contact.phone}`}
                  className="font-mono text-cyan-400 hover:underline"
                >
                  {BUSINESS_CONFIG.contact.phoneFormatted}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
