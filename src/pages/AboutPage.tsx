import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { AboutSection } from '../components/AboutSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { navigateTo } from '../utils/navigation';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { getWhatsAppServiceUrl } from '../utils/whatsapp';

interface AboutPageProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal }) => {
  const whatsappUrl = getWhatsAppServiceUrl('general');

  return (
    <div className="space-y-12 pb-16">
      {/* Dedicated Header Banner */}
      <PageBanner
        badge="About Our Agency"
        title="Building Brands. Creating Digital Solutions. Empowering People."
        subtitle="A digital solutions and creative technology brand in Abocho, Dekina LGA, Kogi State, dedicated to bridging the technology divide through creative design and practical digital training."
        breadcrumb="About"
      >
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => onOpenQuoteModal()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            <span>Work With Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition-all"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </PageBanner>

      {/* Main Agency Story & Founder Profile */}
      <AboutSection onOpenQuoteModal={onOpenQuoteModal} />

      {/* Why Clients & Communities Choose LivingTech */}
      <WhyChooseUs />

      {/* Testimonials & Community Feedback */}
      <TestimonialsSection />

      {/* Bottom Conversion CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 p-8 sm:p-10 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Have a project or want to learn digital skills?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Discuss your website, branding package, or computer training with founder Temitope Oluwaseun today.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenQuoteModal()}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer shadow-md"
            >
              Request a Quotation
            </button>
            <button
              type="button"
              onClick={() => navigateTo('/contact')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold cursor-pointer"
            >
              Contact Us Directly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
