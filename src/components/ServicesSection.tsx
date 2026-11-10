import React, { useState, useEffect } from 'react';
import {
  Globe,
  CodeXml,
  Palette,
  GraduationCap,
  PenTool,
  Briefcase,
  School,
  Church,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileCode2,
  ExternalLink,
  Copy,
  Check,
  Search,
} from 'lucide-react';
import { BUSINESS_CONFIG, ServiceItem } from '../config/business';
import { AdminStore } from '../services/adminStore';
import { getWhatsAppServiceUrl, WhatsAppTopic } from '../utils/whatsapp';
import { SERVICE_SEO_REGISTRY, applyServiceSEOContext, BASE_URL } from '../utils/seo';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceName: string) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Globe,
  CodeXml,
  Palette,
  GraduationCap,
  PenTool,
  Briefcase,
  School,
  Church,
};

const TOPIC_MAP: Record<string, WhatsAppTopic> = {
  'website-design': 'website-design',
  'app-development': 'app-development',
  'graphic-design-branding': 'graphic-design',
  'computer-training': 'computer-training',
  'digital-content-creation': 'digital-content',
  'business-digitalization': 'business-digitalization',
  'school-solutions': 'school-solutions',
  'church-ministry-solutions': 'church-solutions',
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const [servicesList, setServicesList] = useState<ServiceItem[]>(
    () => AdminStore.getConfig().services
  );
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [activeContextId, setActiveContextId] = useState<string | null>(null);
  const [showJsonLdId, setShowJsonLdId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync services with adminStore updates
  useEffect(() => {
    const handleConfigUpdate = () => {
      setServicesList(AdminStore.getConfig().services);
    };
    window.addEventListener('livingtech_config_updated', handleConfigUpdate);
    return () => window.removeEventListener('livingtech_config_updated', handleConfigUpdate);
  }, []);

  // Sync hash with active service context on mount & hashchange
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('graphic-design')) {
        setActiveContextId('graphic-design-branding');
        setExpandedServiceId('graphic-design-branding');
      } else if (hash.includes('computer-training')) {
        setActiveContextId('computer-training');
        setExpandedServiceId('computer-training');
      } else if (hash.includes('website-design')) {
        setActiveContextId('website-design');
      } else if (hash.includes('app-development')) {
        setActiveContextId('app-development');
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  // Dynamically update document meta tags & inject service-specific Schema.org JSON-LD snippet
  useEffect(() => {
    const cleanup = applyServiceSEOContext(activeContextId);
    return cleanup;
  }, [activeContextId]);

  const toggleExpand = (id: string) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  const handleSelectContext = (id: string | null) => {
    setActiveContextId(id);
    if (id) {
      setExpandedServiceId(id);
      const el = document.getElementById(`service-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      try {
        window.history.replaceState(null, '', `#service-${id}`);
      } catch {
        // ignore in restrictive frames
      }
    } else {
      try {
        window.history.replaceState(null, '', '#services');
      } catch {
        // ignore
      }
    }
  };

  const handleCopyCanonicalLink = (id: string) => {
    const url = `${BASE_URL}/#service-${id}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      });
    }
  };

  const activeServiceSEO = activeContextId ? SERVICE_SEO_REGISTRY[activeContextId] : null;

  return (
    <section id="services" className="py-20 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-400 text-cyan-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Comprehensive Solutions & Structured Indexing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Professional Services for Your Growth
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Every business, school, church, and organization has unique needs. Explore our core services
            tailored to strengthen your operations, visual identity, and digital reach.
          </p>
        </div>

        {/* Service Context Switcher for Quick Search Engine & User Navigation */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-600 flex items-center gap-1.5 mr-2 font-medium">
            <Search className="w-3.5 h-3.5 text-cyan-600" />
            <span>Search Filter Context:</span>
          </span>

          <button
            type="button"
            onClick={() => handleSelectContext(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeContextId === null
                ? 'bg-cyan-500 text-white font-bold shadow-md shadow-cyan-500/25'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 shadow-sm'
            }`}
          >
            All Services
          </button>

          {/* Highlighted core target query: Graphic Design */}
          <button
            type="button"
            onClick={() => handleSelectContext('graphic-design-branding')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeContextId === 'graphic-design-branding'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold shadow-md shadow-teal-500/25 scale-105'
                : 'bg-teal-50 text-teal-800 border border-teal-300 hover:border-teal-400 shadow-sm'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-teal-600" />
            <span>Graphic Design</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-teal-200 text-teal-900 rounded">
              Core
            </span>
          </button>

          {/* Highlighted core target query: Computer Training */}
          <button
            type="button"
            onClick={() => handleSelectContext('computer-training')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeContextId === 'computer-training'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-500/25 scale-105'
                : 'bg-blue-50 text-blue-800 border border-blue-300 hover:border-blue-400 shadow-sm'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Computer Training</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-blue-200 text-blue-900 rounded">
              Academy
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectContext('website-design')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeContextId === 'website-design'
                ? 'bg-cyan-500 text-white font-bold shadow-md shadow-cyan-500/25'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 shadow-sm'
            }`}
          >
            Website Design
          </button>

          <button
            type="button"
            onClick={() => handleSelectContext('app-development')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeContextId === 'app-development'
                ? 'bg-cyan-500 text-white font-bold shadow-md shadow-cyan-500/25'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 shadow-sm'
            }`}
          >
            App Development
          </button>
        </div>

        {/* Active Context Banner if selected */}
        {activeServiceSEO && (
          <div className="mb-8 p-4 rounded-xl bg-cyan-50 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                  Structured Search Context Active:
                </span>
                <span className="text-sm font-extrabold text-slate-900">{activeServiceSEO.title}</span>
              </div>
              <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
                {activeServiceSEO.metaDescription}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-slate-500 font-medium">Target Indexing Queries:</span>
                {activeServiceSEO.targetKeywords.slice(0, 5).map((kw, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium bg-white border border-cyan-200 text-slate-700 px-2 py-0.5 rounded shadow-xs"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleCopyCanonicalLink(activeServiceSEO.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-medium transition-all shadow-xs"
                title="Copy canonical link for this service"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copiedLink ? 'Copied Link' : 'Copy SEO Link'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowJsonLdId(showJsonLdId === activeServiceSEO.id ? null : activeServiceSEO.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-100 hover:bg-cyan-200 border border-cyan-300 text-cyan-900 text-xs font-semibold transition-all shadow-xs"
              >
                <FileCode2 className="w-3.5 h-3.5 text-cyan-700" />
                <span>{showJsonLdId === activeServiceSEO.id ? 'Hide Schema' : 'View Schema.org'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Services Grid with Microdata and Neon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList
            .filter((service) => service.isPublished !== false)
            .map((service: ServiceItem) => {
            const IconComponent = ICON_MAP[service.iconName] || Globe;
            const isExpanded = expandedServiceId === service.id;
            const isCurrentActiveContext = activeContextId === service.id;
            const topic = TOPIC_MAP[service.id] || 'general';
            const whatsappUrl = getWhatsAppServiceUrl(topic);
            const seoMeta = SERVICE_SEO_REGISTRY[service.id];
            const isShowingJsonLd = showJsonLdId === service.id;

            return (
              <div
                key={service.id}
                id={`service-${service.id}`}
                itemScope
                itemType={service.id === 'computer-training' ? 'https://schema.org/Course' : 'https://schema.org/Service'}
                className={`group flex flex-col justify-between rounded-2xl bg-white border-2 transition-all duration-300 p-5 sm:p-6 relative overflow-hidden ${
                  isCurrentActiveContext
                    ? 'border-cyan-500 ring-2 ring-cyan-400/50 shadow-[0_0_32px_rgba(6,182,212,0.45)]'
                    : 'border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.22)] hover:shadow-[0_0_36px_rgba(6,182,212,0.5)] hover:border-cyan-300'
                }`}
              >
                {/* Microdata hidden tags for search engine crawlers */}
                <meta itemProp="url" content={`${BASE_URL}/#service-${service.id}`} />
                {service.id === 'computer-training' ? (
                  <meta itemProp="courseCode" content="LT-COMP-101" />
                ) : (
                  <meta itemProp="serviceType" content={service.name} />
                )}

                <div>
                  {/* Service Cover Image Banner */}
                  {service.imageUrl && (
                    <div className="relative h-36 -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-4 overflow-hidden border-b border-cyan-200 bg-slate-100">
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        itemProp="image"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
                      {/* Top service badge if present */}
                      {service.badge && (
                        <div className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-md px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                          {service.badge}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Service Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-300 flex items-center justify-center text-cyan-600 group-hover:scale-105 group-hover:text-cyan-500 transition-all mb-4 shadow-[0_0_10px_rgba(6,182,212,0.2)] ${service.imageUrl ? '-mt-10 relative z-10 bg-white shadow-md' : ''}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Service Title */}
                  <h3
                    itemProp="name"
                    className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors"
                  >
                    {service.name}
                  </h3>

                  {/* Short Description */}
                  <p
                    itemProp="description"
                    className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed"
                  >
                    {service.shortDesc}
                  </p>

                  {/* Key Benefits */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Toggle Detailed Inclusions & SEO Snippet */}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleExpand(service.id)}
                      className="inline-flex items-center gap-1 text-xs text-cyan-600 hover:text-cyan-700 font-bold py-1 focus:outline-none cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Service Scope'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {seoMeta && (
                      <button
                        type="button"
                        onClick={() => setShowJsonLdId(isShowingJsonLd ? null : service.id)}
                        className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-cyan-600 transition-colors py-1 cursor-pointer"
                        title="View Schema.org structured data snippet"
                      >
                        <FileCode2 className="w-3 h-3 text-cyan-600" />
                        <span>{isShowingJsonLd ? 'Close Schema' : 'JSON-LD'}</span>
                      </button>
                    )}
                  </div>

                  {/* Expandable Features */}
                  {isExpanded && (
                    <div className="mt-2 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5 transition-all">
                      <div className="font-bold text-cyan-700 mb-1">Includes:</div>
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5 text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Schema.org Structured Data Inspector Box */}
                  {isShowingJsonLd && seoMeta && (
                    <div className="mt-2 p-3 rounded-lg bg-slate-900 border border-cyan-400 text-[11px] font-mono text-cyan-200 overflow-x-auto shadow-md">
                      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-700 text-slate-400 font-sans text-[10px]">
                        <span className="font-semibold text-cyan-300">
                          Schema.org JSON-LD Context ({Array.isArray(seoMeta.schemaType) ? seoMeta.schemaType.join(' + ') : seoMeta.schemaType})
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyCanonicalLink(service.id)}
                          className="hover:text-white flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Link</span>
                        </button>
                      </div>
                      <pre className="text-[10px] text-cyan-100 whitespace-pre-wrap leading-tight max-h-48 overflow-y-auto">
                        {JSON.stringify(seoMeta.schemaData, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectServiceForQuote(service.name)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all active:scale-95 cursor-pointer"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold transition-colors text-center shadow-xs"
                      title={`Chat on WhatsApp about ${service.name}`}
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleSelectContext(isCurrentActiveContext ? null : service.id)}
                      className={`inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                        isCurrentActiveContext
                          ? 'bg-cyan-50 border-cyan-400 text-cyan-800 shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 hover:text-slate-900 shadow-xs'
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span>{isCurrentActiveContext ? 'Reset SEO' : 'Focus SEO'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
