import React, { useState, useEffect } from 'react';
import { X, Send, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { validateContactForm } from '../utils/validation';
import { formatQuoteWhatsAppMessage, buildWhatsAppUrl } from '../utils/whatsapp';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    serviceRequired: initialService || BUSINESS_CONFIG.services[0].name,
    projectDescription: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceRequired: initialService }));
    }
  }, [initialService]);

  if (!isOpen) return null;

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
      const existing = JSON.parse(localStorage.getItem('livingtech_enquiries') || '[]');
      const newEntry = {
        ...formData,
        id: `LT-MODAL-${Date.now()}`,
        submittedAt: new Date().toISOString(),
      };
      localStorage.setItem('livingtech_enquiries', JSON.stringify([...existing, newEntry]));
      setSubmittedData(formData);
      setIsSuccess(true);
    } catch {
      setSubmittedData(formData);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setSubmittedData(null);
    onClose();
  };

  const whatsappQuoteUrl = submittedData
    ? buildWhatsAppUrl(formatQuoteWhatsAppMessage(submittedData))
    : buildWhatsAppUrl('Hello LivingTech Brand Agency, I would like to request a quotation.');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div className="relative w-full max-w-xl rounded-3xl bg-white border-2 border-cyan-400 p-6 sm:p-8 shadow-[0_0_40px_rgba(6,182,212,0.35)] overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-cyan-100 border-2 border-cyan-400 flex items-center justify-center text-cyan-600 mx-auto shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Quotation Request Ready!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you, <strong className="text-cyan-800 font-bold">{submittedData?.fullName}</strong>. To discuss your quotation directly with founder Temitope Oluwaseun without waiting, click below to open your customized WhatsApp message.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResetAndClose}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-sm font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 pr-8">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-700 font-bold">
                Direct Consultation
              </span>
              <h3 id="modal-headline" className="text-2xl font-extrabold text-slate-900">
                Request a Custom Quotation
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Tell us about your project. We provide clear proposals with transparent timelines.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g., Samuel Sunday"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border ${
                    errors.fullName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-cyan-500'
                  } text-sm text-slate-900 placeholder-slate-400 focus:outline-none`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="e.g., 08155305685"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border ${
                      errors.phoneNumber ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-cyan-500'
                    } text-sm text-slate-900 placeholder-slate-400 focus:outline-none`}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g., you@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border ${
                      errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-cyan-500'
                    } text-sm text-slate-900 placeholder-slate-400 focus:outline-none`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Service Required <span className="text-rose-500">*</span>
                </label>
                <select
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-cyan-500 text-sm text-slate-900 focus:outline-none"
                >
                  {BUSINESS_CONFIG.services.map((svc) => (
                    <option key={svc.id} value={svc.name}>
                      {svc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Description & Goals <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="projectDescription"
                  rows={3}
                  value={formData.projectDescription}
                  onChange={handleChange}
                  placeholder="Outline your requirements, key features, and estimated timeline..."
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border ${
                    errors.projectDescription ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-cyan-500'
                  } text-sm text-slate-900 placeholder-slate-400 focus:outline-none`}
                />
                {errors.projectDescription && (
                  <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.projectDescription}
                  </p>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_16px_rgba(6,182,212,0.35)] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Preparing...' : 'Submit Quotation Request'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
