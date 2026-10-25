import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Globe,
  Send,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  Share2,
  Check,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { validateContactForm } from '../utils/validation';
import { formatQuoteWhatsAppMessage, buildWhatsAppUrl } from '../utils/whatsapp';
import { copyToClipboard, getSectionShareUrl } from '../utils/shareUtils';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    serviceRequired: preselectedService || BUSINESS_CONFIG.services[0].name,
    projectDescription: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Deterministically persist the enquiry in localStorage
      const existing = JSON.parse(localStorage.getItem('livingtech_enquiries') || '[]');
      const newEntry = {
        ...formData,
        id: `LT-ENQ-${Date.now()}`,
        submittedAt: new Date().toISOString(),
      };
      localStorage.setItem('livingtech_enquiries', JSON.stringify([...existing, newEntry]));

      setSubmittedData(formData);
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        serviceRequired: BUSINESS_CONFIG.services[0].name,
        projectDescription: '',
      });
    } catch {
      setSubmittedData(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedData(null);
  };

  const whatsappDirectQuoteUrl = submittedData
    ? buildWhatsAppUrl(formatQuoteWhatsAppMessage(submittedData))
    : buildWhatsAppUrl(
        'Hello LivingTech Brand Agency, I would like to request a quotation for my project.'
      );

  const [copiedSection, setCopiedSection] = useState(false);

  const handleCopySectionLink = async () => {
    const url = getSectionShareUrl('contact');
    await copyToClipboard(url, 'Contact LivingTech Brand Agency');
    setCopiedSection(true);
    setTimeout(() => setCopiedSection(false), 2500);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900/40 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </div>
            <button
              type="button"
              onClick={handleCopySectionLink}
              className={`p-1 px-2.5 rounded-full text-[11px] font-semibold border flex items-center gap-1 transition-colors cursor-pointer ${
                copiedSection
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
              }`}
              title="Copy share link for Contact section"
            >
              {copiedSection ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3 text-cyan-400" />}
              <span>{copiedSection ? 'Copied' : 'Share Section'}</span>
            </button>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact & Request a Quotation
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Ready to build a website, develop an application, order branding materials, or join a digital skills cohort?
            Reach out via phone, email, WhatsApp, or through the direct form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Business Contact Cards (Left Column) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-2">
                {BUSINESS_CONFIG.businessName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {BUSINESS_CONFIG.positioning}
              </p>

              <div className="mt-6 space-y-4 text-xs sm:text-sm">
                {/* Physical Location */}
                <div className="flex items-start gap-3 text-slate-300">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Location
                    </span>
                    <span className="text-white font-medium">
                      {BUSINESS_CONFIG.contact.locationFull}
                    </span>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3 text-slate-300">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Telephone (Direct Call)
                    </span>
                    <a
                      href={`tel:${BUSINESS_CONFIG.contact.phone}`}
                      className="text-white font-medium hover:text-cyan-400 transition-colors"
                    >
                      {BUSINESS_CONFIG.contact.phoneFormatted}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3 text-slate-300">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Official WhatsApp
                    </span>
                    <a
                      href={`https://wa.me/${BUSINESS_CONFIG.contact.whatsappInternational}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:text-emerald-400 transition-colors font-mono"
                    >
                      08155305685
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 text-slate-300">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                      className="text-white font-medium hover:text-cyan-400 transition-colors font-mono"
                    >
                      {BUSINESS_CONFIG.contact.email}
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-3 text-slate-300">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Official Website
                    </span>
                    <a
                      href={BUSINESS_CONFIG.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:text-cyan-400 transition-colors font-mono"
                    >
                      {BUSINESS_CONFIG.contact.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Box */}
            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center">
              <h4 className="text-sm font-bold text-white mb-1">
                Prefer Instant Chat?
              </h4>
              <p className="text-xs text-slate-300 mb-4">
                Chat with founder Temitope Oluwaseun right now on WhatsApp.
              </p>
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.contact.whatsappInternational}?text=${encodeURIComponent(
                  'Hello LivingTech Brand Agency, I would like to make an enquiry.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Interactive Quotation Form (Right Column) */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Request a Project Quotation
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Complete the form below with your requirements. We evaluate every request thoroughly.
            </p>

            {submittedData ? (
              <div className="p-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  Enquiry Prepared Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                  Thank you, <strong className="text-cyan-300">{submittedData.fullName}</strong>. Your project inquiry for{' '}
                  <strong className="text-white">{submittedData.serviceRequired}</strong> has been saved locally.
                  To forward your specifications immediately to our team, click the WhatsApp button below.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <a
                    href={whatsappDirectQuoteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp with 1-Click</span>
                  </a>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g., Samuel Sunday"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border ${
                        errors.fullName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
                      } text-sm text-white placeholder-slate-500 focus:outline-none transition-all`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="e.g., 08155305685"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border ${
                        errors.phoneNumber ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
                      } text-sm text-white placeholder-slate-500 focus:outline-none transition-all`}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email (Optional) */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g., info@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border ${
                        errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
                      } text-sm text-white placeholder-slate-500 focus:outline-none transition-all`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Service Required */}
                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-semibold text-slate-300 mb-1">
                      Service Required <span className="text-rose-400">*</span>
                    </label>
                    <select
                      id="contact-service"
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 text-sm text-white focus:outline-none"
                    >
                      {BUSINESS_CONFIG.services.map((svc) => (
                        <option key={svc.id} value={svc.name}>
                          {svc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="contact-desc" className="block text-xs font-semibold text-slate-300 mb-1">
                    Project Description & Requirements <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="contact-desc"
                    name="projectDescription"
                    rows={4}
                    value={formData.projectDescription}
                    onChange={handleChange}
                    placeholder="Describe your organization, objectives, preferred features, and expected timeline..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border ${
                      errors.projectDescription ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
                    } text-sm text-white placeholder-slate-500 focus:outline-none transition-all`}
                  />
                  {errors.projectDescription && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.projectDescription}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Transparent communication. No spam guaranteed.
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Processing...' : 'Submit Quotation Request'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
