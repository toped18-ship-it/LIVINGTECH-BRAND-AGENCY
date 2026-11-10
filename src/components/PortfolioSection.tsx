import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ExternalLink,
  Code2,
  FolderGit2,
  Clock,
  Layers,
  ArrowRight,
  Eye,
  FileCode2,
  Share2,
  Check,
  X,
  MessageSquare,
  Maximize2,
  Calendar,
  Building,
} from 'lucide-react';
import { PortfolioItem } from '../config/business';
import { AdminStore } from '../services/adminStore';
import { getPortfolioShareUrl, generateWhatsAppShareUrl, copyToClipboard, getSectionShareUrl } from '../utils/shareUtils';

export const PortfolioSection: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(AdminStore.getConfig().portfolio);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState(false);

  // Sync state when admin updates portfolio
  useEffect(() => {
    const handleUpdate = () => {
      setPortfolioItems(AdminStore.getConfig().portfolio);
    };
    window.addEventListener('livingtech_config_updated', handleUpdate);
    return () => window.removeEventListener('livingtech_config_updated', handleUpdate);
  }, []);

  // Resolve deep link #portfolio/:id on mount / hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#portfolio/')) {
        const id = hash.replace('#portfolio/', '').trim();
        const found = AdminStore.getConfig().portfolio.find((p) => p.id === id);
        if (found) {
          setSelectedProject(found);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const categories = [
    'All',
    'Website Design',
    'Application Development',
    'Graphic Design',
    'Branding',
    'Educational Technology',
    'Digital Projects',
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  const getStatusBadge = (status: PortfolioItem['status']) => {
    switch (status) {
      case 'Active Project':
      case 'Completed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'Educational Initiative':
        return 'bg-cyan-50 text-cyan-800 border-cyan-300';
      case 'In Development':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'Proposed Concept':
        return 'bg-purple-50 text-purple-800 border-purple-300';
      case 'Preview Coming Soon':
      default:
        return 'bg-slate-100 text-slate-600 border-slate-300';
    }
  };

  const handleCopyProjectLink = async (project: PortfolioItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = getPortfolioShareUrl(project.id);
    await copyToClipboard(url, project.title);
    setCopiedId(project.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopySectionLink = async () => {
    const url = getSectionShareUrl('portfolio');
    await copyToClipboard(url, 'LivingTech Portfolio & Showcase');
    setCopiedSection(true);
    setTimeout(() => setCopiedSection(false), 2500);
  };

  const handleOpenProjectModal = (project: PortfolioItem) => {
    setSelectedProject(project);
    try {
      window.history.pushState(null, '', `#portfolio/${project.id}`);
    } catch {
      // Ignore
    }
  };

  const handleCloseProjectModal = () => {
    setSelectedProject(null);
    try {
      window.history.pushState(null, '', '#portfolio');
    } catch {
      // Ignore
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-400 text-cyan-800 text-xs font-semibold uppercase tracking-wider shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-600" />
              <span>Showcase & Work Portfolio</span>
            </div>
            <button
              type="button"
              onClick={handleCopySectionLink}
              className={`p-1 px-2.5 rounded-full text-[11px] font-semibold border flex items-center gap-1 transition-colors cursor-pointer ${
                copiedSection
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-white text-slate-700 hover:text-slate-900 border-slate-300 shadow-xs'
              }`}
              title="Copy link to this section"
            >
              {copiedSection ? <Check className="w-3 h-3 text-emerald-600" /> : <Share2 className="w-3 h-3 text-cyan-600" />}
              <span>{copiedSection ? 'Copied' : 'Share Section'}</span>
            </button>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Featured Projects & Digital Work
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Real portfolio designs, educational technology developments, client portals, and brand
            identities created by LivingTech in Abocho, Kogi State.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-white font-bold shadow-md shadow-cyan-500/25'
                  : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-300 shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid with Neon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: PortfolioItem) => {
            const projectUrl = getPortfolioShareUrl(project.id);
            const isCopied = copiedId === project.id;
            const whatsappUrl = generateWhatsAppShareUrl(
              projectUrl,
              `Check out "${project.title}" (${project.category}) by LivingTech Brand Agency:`
            );

            return (
              <div
                key={project.id}
                onClick={() => handleOpenProjectModal(project)}
                className="group flex flex-col justify-between rounded-2xl bg-white border-2 border-cyan-400 hover:border-cyan-300 overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.22)] hover:shadow-[0_0_36px_rgba(6,182,212,0.5)] cursor-pointer"
              >
                <div>
                  {/* Image / Preview Frame */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden border-b border-cyan-200">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-slate-100 to-cyan-50">
                        <FolderGit2 className="w-8 h-8 text-cyan-600 mb-2" />
                        <span className="text-xs font-mono text-slate-600 font-semibold">{project.title}</span>
                      </div>
                    )}

                    {/* Category & Status Overlay */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-sm text-cyan-800 border border-cyan-300 shadow-sm">
                        {project.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-sm shadow-xs ${getStatusBadge(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/95 text-cyan-800 text-[10px] font-bold border border-cyan-300 shadow-sm">
                        <Maximize2 className="w-3 h-3" /> Zoom
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    {project.clientName && (
                      <div className="text-[11px] text-cyan-600 font-bold mb-1 flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        <span>{project.clientName}</span>
                      </div>
                    )}

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Link & Share Actions */}
                <div
                  className="p-5 pt-0 mt-2 border-t border-slate-100 flex items-center justify-between"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 hover:underline"
                    >
                      <span>{project.buttonLabel || 'Live Preview'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenProjectModal(project)}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View Details</span>
                    </button>
                  )}

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleCopyProjectLink(project, e)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isCopied
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200'
                      }`}
                      title="Copy shareable link"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 transition-colors"
                      title="Share to WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Lightbox & Details Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl my-8 rounded-2xl bg-white border-2 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.35)] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white sticky top-0 z-10 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-50 text-cyan-800 border border-cyan-300">
                  {selectedProject.category}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(
                    selectedProject.status
                  )}`}
                >
                  {selectedProject.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyProjectLink(selectedProject)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    copiedId === selectedProject.id
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-300'
                  }`}
                >
                  {copiedId === selectedProject.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Copied Link!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3 h-3 text-cyan-600" />
                      <span>Share Project</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCloseProjectModal}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Image Preview / Lightbox */}
              {selectedProject.imageUrl && (
                <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200 max-h-96 flex items-center justify-center">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-auto max-h-96 object-contain"
                  />
                </div>
              )}

              {/* Title & Metadata */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {selectedProject.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-600 border-b border-slate-200 pb-4">
                  {selectedProject.clientName && (
                    <span className="flex items-center gap-1.5 text-slate-800">
                      <Building className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Client: <strong>{selectedProject.clientName}</strong></span>
                    </span>
                  )}
                  {selectedProject.completionDate && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>Timeline: {selectedProject.completionDate}</span>
                    </span>
                  )}
                  <span className="text-cyan-600 font-mono font-semibold">Location: Abocho, Kogi State</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Project Overview & Scope
                </h4>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedProject.description}
                </p>
              </div>

              {/* Technologies */}
              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Technologies & Skills Applied
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-3 py-1 rounded-md bg-cyan-50 text-cyan-800 border border-cyan-200 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Bar in Modal */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                {selectedProject.liveUrl ? (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                  >
                    <span>Visit Live Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-600" />
                    <span>Project deployed or maintained by LivingTech</span>
                  </span>
                )}

                <a
                  href={generateWhatsAppShareUrl(
                    getPortfolioShareUrl(selectedProject.id),
                    `Inquire about ${selectedProject.title} (${selectedProject.category})`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-50 border border-emerald-400 text-emerald-700 hover:bg-emerald-100 text-xs font-bold shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Ask about this project</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
