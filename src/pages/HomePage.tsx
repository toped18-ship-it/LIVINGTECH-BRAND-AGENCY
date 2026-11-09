import React from 'react';
import {
  ArrowRight,
  Globe,
  Palette,
  GraduationCap,
  CodeXml,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  BookOpen,
  FolderGit2,
  Layers,
  Phone,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { BUSINESS_CONFIG } from '../config/business';
import { AdminStore } from '../services/adminStore';
import { navigateTo } from '../utils/navigation';
import { getWhatsAppServiceUrl } from '../utils/whatsapp';

interface HomePageProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuoteModal }) => {
  const config = AdminStore.getConfig();
  const whatsappUrl = getWhatsAppServiceUrl('general');
  const recentPosts = AdminStore.getBlogPosts().filter((p) => p.isPublished).slice(0, 2);
  const featuredPortfolio = config.portfolio.slice(0, 3);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Section */}
      <Hero onOpenQuoteModal={() => onOpenQuoteModal()} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Core Services at a Glance */}
        <section className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>Our Core Offerings</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Comprehensive Digital & Creative Solutions
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Explore our primary technical capabilities tailored for businesses, schools, churches, and individuals in Nigeria.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('/services')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all self-start md:self-auto cursor-pointer"
            >
              <span>View All 8 Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Web Design */}
            <div
              onClick={() => navigateTo('/services')}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Website Design
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Responsive, high-speed websites for businesses, schools, churches, and personal brands.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 2. Graphic Design */}
            <div
              onClick={() => navigateTo('/services')}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-teal-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Palette className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  Graphic Design & Branding
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Church flyers, logos, corporate banners, social media assets, and brand visual identities.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between text-xs text-teal-400 font-semibold">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 3. Computer Training */}
            <div
              onClick={() => navigateTo('/training')}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Computer Training (₦1,500)
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Hands-on computer literacy, graphic design, and workplace technology cohorts in Abocho.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span>Join Cohort</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 4. App Development */}
            <div
              onClick={() => navigateTo('/services')}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <CodeXml className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  Application Engineering
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  School portal suites, learning management tools, and custom workflow software.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between text-xs text-blue-400 font-semibold">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Youth Training Highlight */}
        <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30 border border-emerald-800/40 p-6 sm:p-10 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Special Cohort Now Registering</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {config.youthTraining.title}
              </h2>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-2xl">
                {config.youthTraining.programOverview}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  Program Fee:{' '}
                  <strong className="text-emerald-400 text-base">
                    {config.youthTraining.currencySymbol}
                    {config.youthTraining.advertisedPrice.toLocaleString()}
                  </strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  Duration: <strong className="text-white">{config.youthTraining.duration}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  Location: <strong className="text-white">{config.youthTraining.location}</strong>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigateTo('/training')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Explore Syllabus & Enroll</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 text-xs font-semibold"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>
            </div>

            {config.youthTraining.imageUrl && (
              <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-emerald-800/40 shadow-xl max-h-60">
                <img
                  src={config.youthTraining.imageUrl}
                  alt="Youth Training"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* About & Founder Spotlight Teaser */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-slate-900/50 border border-slate-800 p-6 sm:p-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Agency Leadership</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Technology Meets Creativity in Abocho, Kogi State
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Founded by <strong>{config.ownerName}</strong>, LivingTech Brand Agency is built on the belief that practical digital tools, sharp visual design, and hands-on technological literacy empower communities and accelerate business growth.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigateTo('/about')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Read Full About Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigateTo('/process')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                <span>How Our Process Works</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
            {config.founderAvatarUrl ? (
              <img
                src={config.founderAvatarUrl}
                alt={config.ownerName}
                className="w-20 h-20 rounded-2xl object-cover mx-auto border border-cyan-500/40 shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-slate-950 font-extrabold text-2xl mx-auto shadow-md">
                TO
              </div>
            )}
            <div>
              <h3 className="font-bold text-white text-base">{config.ownerName}</h3>
              <p className="text-xs text-cyan-400 font-mono mt-0.5">Founder & Lead Developer</p>
              <p className="text-[11px] text-slate-400 mt-1">Abocho, Dekina LGA, Kogi State</p>
            </div>
          </div>
        </section>

        {/* Featured Portfolio Preview */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Showcase</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Featured Projects & Initiatives
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('/portfolio')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer self-start sm:self-auto"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPortfolio.map((item) => (
              <div
                key={item.id}
                onClick={() => navigateTo('/portfolio')}
                className="rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {item.imageUrl && (
                    <div className="relative h-40 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-4">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-slate-800">
                        {item.category}
                      </span>
                    </div>
                  )}
                  <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                  <span>View Project Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Blog Articles Preview */}
        {recentPosts.length > 0 && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Educational Articles</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Latest Insights & Tutorials
                </h2>
              </div>

              <button
                type="button"
                onClick={() => navigateTo('/blog')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer self-start sm:self-auto"
              >
                <span>Read All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => navigateTo('/blog')}
                  className="rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-2">
                      <span>{post.category}</span>
                      <span>&bull;</span>
                      <span className="text-slate-400">{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Global Action Banner */}
        <section className="rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border border-cyan-800/40 p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            Ready to Build Your Brand or Master Digital Skills?
          </h2>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get in touch with LivingTech Brand Agency today. We provide clear proposals, transparent timelines, and practical skills instruction.
          </p>
          <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenQuoteModal()}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              Request a Custom Quote
            </button>
            <button
              type="button"
              onClick={() => navigateTo('/contact')}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm border border-slate-700 cursor-pointer"
            >
              Contact LivingTech
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 text-xs sm:text-sm font-semibold hover:bg-emerald-600/30"
            >
              Chat on WhatsApp
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
