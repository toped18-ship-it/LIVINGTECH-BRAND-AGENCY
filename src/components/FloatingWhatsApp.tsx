import React, { useState } from 'react';
import { MessageSquare, X, ArrowUpRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { getWhatsAppServiceUrl, WhatsAppTopic } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickTopics: { label: string; topic: WhatsAppTopic }[] = [
    { label: 'Website Design', topic: 'website-design' },
    { label: 'Graphic Design & Flyers', topic: 'graphic-design' },
    { label: 'Computer Training (₦1,500)', topic: 'youth-skills' },
    { label: 'App Development', topic: 'app-development' },
    { label: 'General Project Discussion', topic: 'discuss-project' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Menu Popover */}
      {isOpen && (
        <div className="mb-3 w-72 rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-2xl shadow-black/60 animate-fade-in text-left">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">Chat with LivingTech</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
              aria-label="Close WhatsApp topics"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-400 mb-2.5">
            Select what you would like to discuss with Temitope Oluwaseun:
          </p>

          <div className="space-y-1.5">
            {quickTopics.map((item) => (
              <a
                key={item.topic}
                href={getWhatsAppServiceUrl(item.topic)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-900 hover:bg-emerald-950/50 border border-slate-800/80 hover:border-emerald-500/40 text-xs text-slate-200 hover:text-emerald-300 transition-colors"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
              </a>
            ))}
          </div>

          <div className="mt-3 pt-2 text-[10px] text-slate-400 font-mono text-center">
            08155305685 &bull; Abocho, Kogi State
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/40 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        aria-label="Chat on WhatsApp"
        aria-expanded={isOpen}
      >
        <MessageSquare className="w-5 h-5 text-slate-950 fill-current" />
        <span className="hidden sm:inline font-semibold">Chat on WhatsApp</span>
      </button>
    </div>
  );
};
