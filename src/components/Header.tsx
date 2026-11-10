import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, ArrowRight, Phone } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { getWhatsAppServiceUrl } from '../utils/whatsapp';

import { NAV_ITEMS, navigateTo, AppRoute } from '../utils/navigation';

interface HeaderProps {
  onOpenQuoteModal: (serviceName?: string) => void;
  currentRoute?: AppRoute;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal, currentRoute = 'home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(path);
    setIsMobileMenuOpen(false);
  };

  const whatsappGeneralUrl = getWhatsAppServiceUrl('general');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md shadow-slate-200/50 py-3'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/70 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo / Treatment */}
          <a
            href="/"
            onClick={(e) => handleNavClick('/', e)}
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1 cursor-pointer"
            aria-label="LivingTech Brand Agency Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform">
              <span className="tracking-tighter">LT</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-wider text-slate-900 group-hover:text-cyan-600 transition-colors uppercase font-mono">
                LIVINGTECH
              </span>
              <span className="text-[10px] sm:text-xs text-cyan-600 font-semibold tracking-widest uppercase">
                BRAND AGENCY
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2" aria-label="Main Navigation">
            {NAV_ITEMS.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleNavClick(link.path, e)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer ${
                    isActive
                      ? 'text-cyan-700 bg-cyan-50 border-2 border-cyan-400 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-2 border-transparent'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-50 border border-emerald-400 text-emerald-700 hover:bg-emerald-100 shadow-[0_0_12px_rgba(16,185,129,0.25)] transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
              title="Chat with LivingTech on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal()}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_16px_rgba(6,182,212,0.4)] hover:shadow-[0_0_24px_rgba(6,182,212,0.6)] transition-all focus:outline-none focus:ring-2 focus:ring-cyan-300 active:scale-95 cursor-pointer"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenQuoteModal()}
              type="button"
              className="px-3 py-1.5 text-xs font-bold rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]"
            >
              Quote
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Collapsible Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden bg-white border-b border-slate-200 shadow-2xl px-4 pt-3 pb-6 transition-all"
          id="mobile-menu"
        >
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleNavClick(link.path, e)}
                  className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'text-cyan-700 bg-cyan-50 font-bold border-2 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                      : 'text-slate-700 hover:text-cyan-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />}
                </a>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-slate-600 px-1">
              <span>Abocho, Kogi State</span>
              <a href={`tel:${BUSINESS_CONFIG.contact.phone}`} className="text-cyan-600 hover:underline flex items-center gap-1 font-semibold">
                <Phone className="w-3 h-3" />
                {BUSINESS_CONFIG.contact.phone}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-400 text-sm font-semibold hover:bg-emerald-100 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold shadow-[0_0_14px_rgba(6,182,212,0.35)]"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
