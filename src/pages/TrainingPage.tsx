import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { YouthTrainingSection } from '../components/YouthTrainingSection';
import { navigateTo } from '../utils/navigation';
import { MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getWhatsAppServiceUrl } from '../utils/whatsapp';

export const TrainingPage: React.FC = () => {
  const whatsappUrl = getWhatsAppServiceUrl('youth-skills');

  return (
    <div className="space-y-12 pb-16">
      {/* Dedicated Header Banner */}
      <PageBanner
        badge="Community Empowerment Program"
        title="Youth Computer Training & Digital Skills"
        subtitle="Practical, hands-on computer training in Abocho, Dekina LGA, Kogi State. Master computer operations, graphic design essentials, and workplace digital tools at a subsidized ₦1,500 cohort rate."
        breadcrumb="Training"
      >
        <div className="flex flex-wrap gap-2.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Confirm Seat on WhatsApp</span>
          </a>
        </div>
      </PageBanner>

      {/* Main Youth Training Section with Syllabus & Registration Form */}
      <YouthTrainingSection />

      {/* Community Impact Guarantee */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto sm:mx-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Hands-On Practice</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct computer keyboard interaction from day one, not theoretical chalkboard lectures.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto sm:mx-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Commercial Skills</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Learn flyer design, typing, document formatting, and digital tools you can monetize immediately.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto sm:mx-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Direct Mentorship</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Guided by founder Temitope Oluwaseun at the LivingTech Training Hub in Abocho.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
