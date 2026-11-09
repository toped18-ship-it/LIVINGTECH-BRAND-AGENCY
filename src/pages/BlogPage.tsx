import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { BlogSection } from '../components/BlogSection';
import { navigateTo } from '../utils/navigation';
import { BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

interface BlogPageProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Dedicated Header Banner */}
      <PageBanner
        badge="Insights & Education"
        title="LivingTech Blog & Tech Knowledge Hub"
        subtitle="Explore practical articles, graphic design guides, local SEO strategies, and technology empowerment tutorials written by founder Temitope Oluwaseun."
        breadcrumb="Blog"
      >
        <button
          type="button"
          onClick={() => navigateTo('/training')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Explore Computer Training</span>
        </button>
      </PageBanner>

      {/* Main Blog Section with Reader Modal */}
      <BlogSection onOpenQuoteModal={onOpenQuoteModal} />

      {/* Educational Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-800/40 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Want hands-on digital skills instruction?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Join our 3-Day Youth Skill Acquisition Cohort in Abocho for practical training in computer fundamentals, graphic design, and workplace productivity at ₦1,500.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('/training')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer"
          >
            <span>Learn About the Training</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
