import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Globe,
  ArrowUp,
  ShieldCheck,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { getWhatsAppServiceUrl } from '../utils/whatsapp';

interface FooterProps {
  onOpenPolicy: (type: 'privacy' | 'terms') => void;
  onSelectService: (serviceName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy, onSelectService }) => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getWhatsAppServiceUrl('general');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Mission (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-cyan-500/20">
                LT
              </div>
              <div>
                <span className="font-extrabold text-base tracking-wider text-white block uppercase font-mono">
                  {BUSINESS_CONFIG.businessName}
                </span>
                <span className="text-[10px] text-cyan-400 font-medium tracking-widest uppercase">
                  Digital Solutions &bull; Abocho, Kogi State
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {BUSINESS_CONFIG.positioning}
            </p>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/25 text-xs font-semibold transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp: 08155305685</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-cyan-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  About LivingTech
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-cyan-400 transition-colors">
                  Portfolio & Initiatives
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-cyan-400 transition-colors">
                  Blog & Tech Insights
                </a>
              </li>
              <li>
                <a href="#training" className="hover:text-cyan-400 transition-colors">
                  Youth Computer Training
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-cyan-400 transition-colors">
                  Our Process
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">
                  Contact & Quotes
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links (Col 7-9) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-2 text-xs">
              {BUSINESS_CONFIG.services.map((svc) => (
                <li key={svc.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(svc.name)}
                    className="text-left hover:text-cyan-400 transition-colors"
                  >
                    {svc.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Contact Info (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact LivingTech
            </h4>
            <p className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{BUSINESS_CONFIG.contact.locationFull}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <a href={`tel:${BUSINESS_CONFIG.contact.phone}`} className="hover:text-cyan-400">
                {BUSINESS_CONFIG.contact.phoneFormatted}
              </a>
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.contact.whatsappInternational}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 font-mono"
              >
                08155305685
              </a>
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <a href={`mailto:${BUSINESS_CONFIG.contact.email}`} className="hover:text-cyan-400 font-mono break-all">
                {BUSINESS_CONFIG.contact.email}
              </a>
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
              <a
                href={BUSINESS_CONFIG.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 font-mono"
              >
                {BUSINESS_CONFIG.contact.website}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {currentYear} {BUSINESS_CONFIG.businessName}. Founded by Temitope Oluwaseun. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-cyan-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-cyan-400 transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
