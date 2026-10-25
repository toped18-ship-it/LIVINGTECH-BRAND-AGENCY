import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { getWhatsAppServiceUrl } from '../utils/whatsapp';

interface HeaderProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Blog', href: '#blog' },
    { name: 'Training', href: '#training' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const whatsappGeneralUrl = getWhatsAppServiceUrl('general');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo / Treatment */}
          <a
            href="#home"
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1"
            aria-label="LivingTech Brand Agency Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <span className="tracking-tighter">LT</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-wider text-white group-hover:text-cyan-400 transition-colors uppercase font-mono">
                LIVINGTECH
              </span>
              <span className="text-[10px] sm:text-xs text-cyan-400/90 font-medium tracking-widest uppercase">
                BRAND AGENCY
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/25 hover:border-emerald-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
              title="Chat with LivingTech on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal()}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-300 active:scale-95"
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
              className="px-3 py-1.5 text-xs font-semibold rounded-md bg-cyan-500 text-slate-950 font-semibold"
            >
              Quote
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
          className="lg:hidden bg-slate-950 border-b border-slate-800 shadow-2xl px-4 pt-3 pb-6 transition-all"
          id="mobile-menu"
        >
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Abocho, Kogi State</span>
              <a href={`tel:${BUSINESS_CONFIG.contact.phone}`} className="text-cyan-400 hover:underline flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {BUSINESS_CONFIG.contact.phone}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-sm font-medium hover:bg-emerald-600/30"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  handleLinkClick();
                  onOpenQuoteModal();
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-semibold"
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
