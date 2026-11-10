import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FolderGit2,
  Calendar,
  Building,
  CheckCircle2,
  ArrowRight,
  Pause,
  Play,
  Sparkles,
} from 'lucide-react';
import { PortfolioItem } from '../config/business';
import { navigateTo } from '../utils/navigation';

interface ProjectSliderProps {
  projects: PortfolioItem[];
  onOpenProjectModal?: (project: PortfolioItem) => void;
  onOpenQuoteModal?: () => void;
}

export const ProjectSlider: React.FC<ProjectSliderProps> = ({
  projects,
  onOpenProjectModal,
  onOpenQuoteModal,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = projects.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Autoplay effect
  useEffect(() => {
    if (!isAutoPlaying || total <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, total, currentIndex]);

  if (!projects || projects.length === 0) return null;

  const current = projects[currentIndex];

  return (
    <div
      id="featured-projects"
      className="rounded-3xl bg-white border-2 border-cyan-400 shadow-[0_0_32px_rgba(6,182,212,0.25)] hover:shadow-[0_0_42px_rgba(6,182,212,0.4)] p-6 sm:p-10 transition-all relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Header bar of Slider Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-400 text-cyan-800 text-xs font-semibold uppercase tracking-wider mb-2 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-600" />
            <span>Showcase & Work Done</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Projects Handled & Delivered
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Real software systems, web platforms, branding packages, and educational tech projects built and deployed for businesses, schools, and organizations.
          </p>
        </div>

        {/* Slider Controls Top */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            title={isAutoPlaying ? 'Pause Slideshow' : 'Resume Slideshow'}
            aria-label={isAutoPlaying ? 'Pause Slideshow' : 'Resume Slideshow'}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4 text-cyan-700" /> : <Play className="w-4 h-4 text-emerald-600" />}
          </button>

          <button
            type="button"
            onClick={prevSlide}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-cyan-400 hover:text-cyan-600 shadow-sm transition-all cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-cyan-400 hover:text-cyan-600 shadow-sm transition-all cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => navigateTo('/portfolio')}
            className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_14px_rgba(6,182,212,0.35)] transition-all cursor-pointer"
          >
            <span>All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Card Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/70 border border-slate-200 rounded-2xl p-5 sm:p-7">
        {/* Left Column: Visual Slide Picture */}
        <div className="lg:col-span-7 relative">
          <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border-2 border-cyan-400/80 shadow-[0_0_24px_rgba(6,182,212,0.22)] bg-slate-900 group">
            {current.imageUrl ? (
              <img
                src={current.imageUrl}
                alt={current.title}
                key={current.id}
                className="w-full h-full object-cover animate-fade-in transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-400">
                <FolderGit2 className="w-16 h-16 text-cyan-400" />
              </div>
            )}

            {/* Top Tag & Category Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-900/90 text-cyan-300 border border-cyan-400 text-xs font-bold shadow-md">
                {current.category}
              </span>
              {current.status && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500 text-[11px] font-semibold">
                  {current.status}
                </span>
              )}
            </div>

            {/* Slide Count Indicator */}
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-slate-950/85 text-white font-mono text-xs border border-slate-700 shadow-md">
              {currentIndex + 1} / {total}
            </div>
          </div>
        </div>

        {/* Right Column: Project Write-up & Highlights */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-cyan-700 font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Project Write-up & Specifications</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {current.title}
            </h3>

            {/* Client and Date Metadata */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-600">
              {current.clientName && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-medium">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>{current.clientName}</span>
                </div>
              )}
              {current.completionDate && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{current.completionDate}</span>
                </div>
              )}
            </div>

            {/* Detailed Project Description / Write-up */}
            <p className="mt-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {current.description}
            </p>

            {/* Technology & Deliverable Stack Tags */}
            {current.technologies && current.technologies.length > 0 && (
              <div className="mt-4">
                <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Delivered Capabilities
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {current.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-white border border-cyan-300 text-cyan-800 text-xs font-semibold shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-3">
            {onOpenProjectModal ? (
              <button
                type="button"
                onClick={() => onOpenProjectModal(current)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all cursor-pointer"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigateTo('/portfolio')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all cursor-pointer"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {current.liveUrl && (
              <a
                href={current.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-semibold shadow-sm transition-colors"
              >
                <span>Live Link</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            )}

            {onOpenQuoteModal && (
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-cyan-600 border border-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Request Similar Project</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail Slide Navigator Dots */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {projects.map((proj, idx) => {
          const isSelected = idx === currentIndex;
          return (
            <button
              key={proj.id}
              type="button"
              onClick={() => goToSlide(idx)}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-50 border-2 border-cyan-400 text-cyan-800 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-600'
              }`}
              title={proj.title}
            >
              <span
                className={`w-2 h-2 rounded-full transition-all ${
                  isSelected ? 'bg-cyan-500 w-3' : 'bg-slate-300 group-hover:bg-cyan-400'
                }`}
              />
              <span className="hidden sm:inline max-w-[130px] truncate">{proj.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
