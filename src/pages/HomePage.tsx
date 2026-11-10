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
import { ProjectSlider } from '../components/ProjectSlider';
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
        {/* Interactive Projects Handled Slider with Pictures & Write-ups */}
        <ProjectSlider
          projects={config.portfolio}
          onOpenQuoteModal={() => onOpenQuoteModal()}
        />

        {/* About & Founder Spotlight Teaser */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-slate-50/70 border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-400 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Agency Leadership</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Technology Meets Creativity in Abocho, Kogi State
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Founded by <strong>{config.ownerName}</strong>, LivingTech Brand Agency is built on the belief that practical digital tools, sharp visual design, and hands-on technological literacy empower communities and accelerate business growth.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigateTo('/about')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all cursor-pointer"
              >
                <span>Read Full About Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigateTo('/process')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                <span>How Our Process Works</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 p-5 rounded-2xl bg-white border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] text-center space-y-3 transition-all">
            {config.founderAvatarUrl ? (
              <img
                src={config.founderAvatarUrl}
                alt={config.ownerName}
                className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-cyan-400 shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-2xl mx-auto shadow-md">
                TO
              </div>
            )}
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">{config.ownerName}</h3>
              <p className="text-xs text-cyan-600 font-mono font-semibold mt-0.5">Founder & Lead Developer</p>
              <p className="text-[11px] text-slate-500 mt-1">Abocho, Dekina LGA, Kogi State</p>
            </div>
          </div>
        </section>

        {/* Featured Portfolio Preview */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-400 text-cyan-800 text-xs font-semibold uppercase tracking-wider mb-2 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                <FolderGit2 className="w-3.5 h-3.5 text-cyan-600" />
                <span>Showcase</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Featured Projects & Initiatives
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('/portfolio')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer self-start sm:self-auto shadow-sm"
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
                className="rounded-2xl bg-white border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.22)] hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] hover:border-cyan-300 p-5 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {item.imageUrl && (
                    <div className="relative h-40 rounded-xl overflow-hidden bg-slate-100 border border-cyan-200 mb-4">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-cyan-800 border border-cyan-300 shadow-sm">
                        {item.category}
                      </span>
                    </div>
                  )}
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-cyan-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-cyan-600 font-bold">
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-400 text-cyan-800 text-xs font-semibold uppercase tracking-wider mb-2 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Educational Articles</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Latest Insights & Tutorials
                </h2>
              </div>

              <button
                type="button"
                onClick={() => navigateTo('/blog')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer self-start sm:self-auto shadow-sm"
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
                  className="rounded-2xl bg-white border-2 border-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.22)] hover:shadow-[0_0_35px_rgba(20,184,166,0.45)] hover:border-teal-300 p-6 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-teal-600 font-bold mb-2">
                      <span>{post.category}</span>
                      <span>&bull;</span>
                      <span className="text-slate-500 font-medium">{post.readTime}</span>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-teal-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-teal-600 font-bold">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Global Action Banner Neon Card */}
        <section className="rounded-3xl bg-gradient-to-r from-cyan-50 via-teal-50 to-blue-50 border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)] p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            Ready to Build Your Brand or Master Digital Skills?
          </h2>
          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Get in touch with LivingTech Brand Agency today. We provide clear proposals, transparent timelines, and practical skills instruction.
          </p>
          <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenQuoteModal()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all cursor-pointer"
            >
              Request a Custom Quote
            </button>
            <button
              type="button"
              onClick={() => navigateTo('/contact')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 shadow-sm cursor-pointer"
            >
              Contact LivingTech
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-400 text-xs sm:text-sm font-bold shadow-[0_0_12px_rgba(16,185,129,0.2)] hover:bg-emerald-100"
            >
              Chat on WhatsApp
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
