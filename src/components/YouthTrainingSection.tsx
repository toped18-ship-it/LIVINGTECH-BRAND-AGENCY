import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Users,
  Clock,
  Sparkles,
  MessageSquare,
  Send,
  AlertCircle,
  HelpCircle,
  Share2,
  Check,
} from 'lucide-react';
import { BUSINESS_CONFIG, TrainingProgramConfig } from '../config/business';
import { validateEnrollmentForm } from '../utils/validation';
import { formatEnrollmentWhatsAppMessage, buildWhatsAppUrl } from '../utils/whatsapp';
import { AdminStore } from '../services/adminStore';
import { copyToClipboard, getSectionShareUrl } from '../utils/shareUtils';

export const YouthTrainingSection: React.FC = () => {
  const [training, setTraining] = useState<TrainingProgramConfig>(
    () => AdminStore.getConfig().youthTraining
  );

  useEffect(() => {
    const handleUpdate = () => {
      setTraining(AdminStore.getConfig().youthTraining);
    };
    window.addEventListener('livingtech_config_updated', handleUpdate);
    return () => window.removeEventListener('livingtech_config_updated', handleUpdate);
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    preferredCategory: training.categories[0] || '',
    trainingFormat: training.trainingFormats[0] || 'In-Person (LivingTech Training Hub, Abocho)',
    additionalInfo: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<typeof formData | null>(null);

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
    const validation = validateEnrollmentForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Store deterministic enrollment record in localStorage
      const existing = JSON.parse(localStorage.getItem('livingtech_enrollments') || '[]');
      const newEntry = {
        ...formData,
        id: `LT-ENR-${Date.now()}`,
        submittedAt: new Date().toISOString(),
      };
      localStorage.setItem('livingtech_enrollments', JSON.stringify([...existing, newEntry]));

      setLastSubmittedData(formData);
      setSubmissionSuccess(true);
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        preferredCategory: training.categories[0] || '',
        trainingFormat: training.trainingFormats[0] || '',
        additionalInfo: '',
      });
    } catch {
      // fallback
      setLastSubmittedData(formData);
      setSubmissionSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmissionSuccess(false);
    setLastSubmittedData(null);
  };

  // Direct WhatsApp Enrollment Message
  const whatsappEnrollUrl = lastSubmittedData
    ? buildWhatsAppUrl(formatEnrollmentWhatsAppMessage(lastSubmittedData))
    : buildWhatsAppUrl(
        `Hello LivingTech Brand Agency, I am interested in enrolling for the ${training.title}. Please provide enrollment guidelines.`
      );

  const [copiedSection, setCopiedSection] = useState(false);

  const handleCopySectionLink = async () => {
    const url = getSectionShareUrl('training');
    await copyToClipboard(url, 'Youth Computer Skill Acquisition Program');
    setCopiedSection(true);
    setTimeout(() => setCopiedSection(false), 2500);
  };

  return (
    <section id="training" className="py-20 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Digital Empowerment</span>
            </div>
            <button
              type="button"
              onClick={handleCopySectionLink}
              className={`p-1 px-2.5 rounded-full text-[11px] font-semibold border flex items-center gap-1 transition-colors cursor-pointer ${
                copiedSection
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
              }`}
              title="Copy link to Youth Training section"
            >
              {copiedSection ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3 text-emerald-400" />}
              <span>{copiedSection ? 'Copied' : 'Share Section'}</span>
            </button>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {training.shortHeadline}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {training.programOverview}
          </p>
        </div>

        {/* Featured Program Highlight Banner */}
        <div
          id="youth-training"
          itemScope
          itemType="https://schema.org/Course"
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 lg:p-10 mb-14 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

          {/* Microdata tags for search engines */}
          <meta itemProp="courseCode" content="LT-YOUTH-2026" />
          <meta itemProp="educationalCredentialAwarded" content="Certificate in Youth Digital Skills" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Program Details */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/80 text-xs font-bold uppercase tracking-wider">
                  Featured Program
                </span>
                {training.isAvailable && (
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/80 text-xs font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Registration Open
                  </span>
                )}
              </div>

              <h3 itemProp="name" className="text-2xl sm:text-3xl font-extrabold text-white">
                {training.title}
              </h3>

              <p itemProp="description" className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                A hands-on, practical intensive program designed to equip youths, students, and beginners
                with real-world digital skills that build self-reliance and open opportunities in tech and design.
              </p>

              {/* Price Callout (displayed ONLY when configured as available) */}
              {training.isAvailable && (
                <div
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                  className="mt-5 inline-flex items-center gap-3 p-3 px-4 rounded-xl bg-slate-950 border border-cyan-500/30"
                >
                  <meta itemProp="priceCurrency" content="NGN" />
                  <meta itemProp="price" content={training.advertisedPrice.toString()} />
                  <div className="text-xs text-slate-400">Program Fee:</div>
                  <div className="text-2xl font-extrabold text-cyan-400">
                    {training.currencySymbol}{training.advertisedPrice.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Special Subsidized Rate
                  </div>
                </div>
              )}

              {/* Meta information: Duration & Location */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Duration: <strong className="text-white">{training.duration}</strong></span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Location: <strong className="text-white">Abocho, Dekina LGA</strong></span>
                </div>
              </div>

              {/* Target Audience */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-cyan-400" />
                  Intended Audience:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {training.targetAudience.map((aud, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-200 border border-slate-700/60"
                    >
                      {aud}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Curriculum Tracks / Syllabus & Promotional Flyer Image */}
            <div className="lg:col-span-5 space-y-4">
              {training.imageUrl && (
                <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group relative">
                  <div className="relative h-48 sm:h-56 w-full">
                    <img
                      src={training.imageUrl}
                      alt="Youth Skill Acquisition Promotional Flyer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-800/80 px-2.5 py-0.5 rounded-full">
                        Official Cohort Flyer
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Training Modules Covered
                </h4>
                <ul className="space-y-3">
                  {training.categories.map((cat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{cat}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <a
                    href={whatsappEnrollUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-semibold text-xs sm:text-sm transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Enquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollment Form Section */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Enroll for Training or Request Cohort Updates
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Fill in your details below to register interest. No payment is taken online; our team in Abocho will follow up via phone and WhatsApp.
            </p>
          </div>

          {submissionSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">
                Registration Submitted Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                Thank you, <strong className="text-emerald-300">{lastSubmittedData?.fullName}</strong>. Your training interest has been recorded locally. To finalize your seat immediately and receive cohort schedule instructions, click below to confirm on WhatsApp.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href={whatsappEnrollUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Confirm on WhatsApp Now</span>
                </a>
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Submit Another Response
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="training-name" className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="training-name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g., Samuel Sunday"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
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

                {/* Phone Number */}
                <div>
                  <label htmlFor="training-phone" className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number (WhatsApp preferred) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="training-phone"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="e.g., 08155305685 or 07067048471"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
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

              {/* Email Address (Optional) */}
              <div>
                <label htmlFor="training-email" className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  id="training-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g., yourname@gmail.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Preferred Training Category */}
                <div>
                  <label htmlFor="training-category" className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Training Category <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="training-category"
                    name="preferredCategory"
                    value={formData.preferredCategory}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-sm text-white focus:outline-none"
                  >
                    {training.categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Training Format */}
                <div>
                  <label htmlFor="training-format" className="block text-xs font-semibold text-slate-300 mb-1">
                    Training Format <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="training-format"
                    name="trainingFormat"
                    value={formData.trainingFormat}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-sm text-white focus:outline-none"
                  >
                    {training.trainingFormats.map((fmt, idx) => (
                      <option key={idx} value={fmt}>
                        {fmt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label htmlFor="training-info" className="block text-xs font-semibold text-slate-300 mb-1">
                  Additional Information or Questions <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="training-info"
                  name="additionalInfo"
                  rows={2}
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Tell us about your learning goals or any questions..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                  We do not ask for online card details.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Registering...' : 'Enroll for Training'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
