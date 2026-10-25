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
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'Educational Initiative':
        return 'bg-cyan-950 text-cyan-300 border-cyan-800';
      case 'In Development':
        return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'Proposed Concept':
        return 'bg-purple-950 text-purple-300 border-purple-800';
      case 'Preview Coming Soon':
      default:
        return 'bg-slate-900 text-slate-400 border-slate-700';
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
    <section id="portfolio" className="py-20 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Showcase & Work Portfolio</span>
            </div>
            <button
              type="button"
              onClick={handleCopySectionLink}
              className={`p-1 px-2.5 rounded-full text-[11px] font-semibold border flex items-center gap-1 transition-colors ${
                copiedSection
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
              }`}
              title="Copy link to this section"
            >
              {copiedSection ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3 text-cyan-400" />}
              <span>{copiedSection ? 'Copied' : 'Share Section'}</span>
            </button>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects & Digital Work
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
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
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
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
                className="group flex flex-col justify-between rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 cursor-pointer"
              >
                <div>
                  {/* Image / Preview Frame */}
                  <div className="relative h-48 bg-slate-950 overflow-hidden">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-slate-950 to-cyan-950/60">
                        <FolderGit2 className="w-8 h-8 text-cyan-400 mb-2" />
                        <span className="text-xs font-mono text-slate-300">{project.title}</span>
                      </div>
                    )}

                    {/* Category & Status Overlay */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/85 backdrop-blur-sm text-cyan-300 border border-cyan-800/60">
                        {project.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-sm ${getStatusBadge(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-900/90 text-cyan-300 text-[10px] font-semibold border border-slate-700">
                        <Maximize2 className="w-3 h-3" /> Zoom
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    {project.clientName && (
                      <div className="text-[11px] text-cyan-400 font-semibold mb-1 flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        <span>{project.clientName}</span>
                      </div>
                    )}

                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800 font-mono"
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
                  className="p-5 pt-0 mt-2 border-t border-slate-800/60 flex items-center justify-between"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:underline"
                    >
                      <span>{project.buttonLabel || 'Live Preview'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenProjectModal(project)}
                      className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1"
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
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                          : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                      }`}
                      title="Copy shareable link"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/80 hover:bg-emerald-900/60 transition-colors"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl my-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
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
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-slate-800 text-slate-200 hover:text-white border-slate-700'
                  }`}
                >
                  {copiedId === selectedProject.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied Link!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3 h-3 text-cyan-400" />
                      <span>Share Project</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCloseProjectModal}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
                <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 max-h-96 flex items-center justify-center">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-auto max-h-96 object-contain"
                  />
                </div>
              )}

              {/* Title & Metadata */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {selectedProject.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400 border-b border-slate-800 pb-4">
                  {selectedProject.clientName && (
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Building className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Client: <strong>{selectedProject.clientName}</strong></span>
                    </span>
                  )}
                  {selectedProject.completionDate && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Timeline: {selectedProject.completionDate}</span>
                    </span>
                  )}
                  <span className="text-cyan-400 font-mono">Location: Abocho, Kogi State</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Project Overview & Scope
                </h4>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-line">
                  {selectedProject.description}
                </p>
              </div>

              {/* Technologies */}
              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Technologies & Skills Applied
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-3 py-1 rounded-md bg-slate-950 text-cyan-300 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Bar in Modal */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                {selectedProject.liveUrl ? (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all"
                  >
                    <span>Visit Live Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-400" />
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
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30 text-xs font-semibold"
                >
                  <MessageSquare className="w-4 h-4" />
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
