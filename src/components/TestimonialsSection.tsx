import React from 'react';
import { MessageSquareText, Sparkles, Send, HeartHandshake } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export const TestimonialsSection: React.FC = () => {
  const shareFeedbackWhatsAppUrl = buildWhatsAppUrl(
    'Hello LivingTech Brand Agency, I would like to submit client feedback / a review for a recent project or training session.'
  );

  return (
    <section className="py-16 bg-slate-900/30 relative border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-950/70 border border-slate-800 p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
            <HeartHandshake className="w-6 h-6" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Client Feedback & Partnerships</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Committed to Genuine Client Relationships
          </h3>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            At LivingTech Brand Agency, we prioritize authenticity. As we complete projects and graduate cohorts
            from our digital skills programs in Abocho and across Kogi State, verified testimonials and client
            reviews will be published here.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-xs text-slate-400">
              Have you partnered with us on a website, design, or training?
            </span>
            <a
              href={shareFeedbackWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 text-xs font-bold transition-all"
            >
              <MessageSquareText className="w-4 h-4" />
              <span>Share Your Client Feedback</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
