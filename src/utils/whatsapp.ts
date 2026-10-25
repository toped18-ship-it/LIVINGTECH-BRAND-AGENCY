/**
 * WhatsApp Link Generator for LIVINGTECH BRAND AGENCY
 * Business Number: 08155305685 -> 2348155305685
 */

import { BUSINESS_CONFIG } from '../config/business';

export const WHATSAPP_PHONE_INTL = BUSINESS_CONFIG.contact.whatsappInternational; // '2348155305685'

export type WhatsAppTopic =
  | 'website-design'
  | 'graphic-design'
  | 'computer-training'
  | 'app-development'
  | 'general'
  | 'youth-skills'
  | 'discuss-project'
  | 'school-solutions'
  | 'church-solutions'
  | 'business-digitalization'
  | 'digital-content';

export const PRESET_MESSAGES: Record<WhatsAppTopic, string> = {
  'website-design':
    'Hello LivingTech Brand Agency, I need a website for my business. Please tell me how we can get started.',
  'graphic-design':
    'Hello LivingTech Brand Agency, I need graphic design services. Please let me know the available options.',
  'computer-training':
    'Hello LivingTech Brand Agency, I am interested in your computer training and digital skills programs. Please share more details.',
  'app-development':
    'Hello LivingTech Brand Agency, I would like to discuss an application development project.',
  'general':
    'Hello LivingTech Brand Agency, I would like to learn more about your services.',
  'youth-skills':
    'Hello LivingTech Brand Agency, I would like to register for the 3-Day Youth Skill Acquisition Program (₦1,500). Please share upcoming cohort details.',
  'discuss-project':
    'Hello LivingTech Brand Agency, I have a project in mind and would like to discuss my requirements and get a quotation.',
  'school-solutions':
    'Hello LivingTech Brand Agency, I would like to discuss school management or website solutions for my educational institution.',
  'church-solutions':
    'Hello LivingTech Brand Agency, I would like to discuss digital solutions, website, or media design for our church/ministry.',
  'business-digitalization':
    'Hello LivingTech Brand Agency, I need assistance setting up business digitalization, email, or Google presence.',
  'digital-content':
    'Hello LivingTech Brand Agency, I am looking for professional digital content creation and promotional materials.',
};

/**
 * Builds a valid wa.me URL with clean URL encoding.
 */
export function buildWhatsAppUrl(message: string, phone: string = WHATSAPP_PHONE_INTL): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Convenience helper to build URL for a predefined service topic.
 */
export function getWhatsAppServiceUrl(topic: WhatsAppTopic): string {
  const message = PRESET_MESSAGES[topic] || PRESET_MESSAGES['general'];
  return buildWhatsAppUrl(message);
}

/**
 * Formats custom quote inquiry from the contact form.
 */
export interface QuoteFormData {
  fullName: string;
  phoneNumber: string;
  email?: string;
  serviceRequired: string;
  projectDescription: string;
}

export function formatQuoteWhatsAppMessage(data: QuoteFormData): string {
  const lines = [
    'Hello LivingTech Brand Agency, I am requesting a project quotation:',
    `• Name: ${data.fullName.trim()}`,
    `• Phone: ${data.phoneNumber.trim()}`,
  ];

  if (data.email && data.email.trim()) {
    lines.push(`• Email: ${data.email.trim()}`);
  }

  lines.push(`• Service: ${data.serviceRequired.trim()}`);
  lines.push(`• Project Details: ${data.projectDescription.trim()}`);
  lines.push('Looking forward to your quotation and timeline. Thank you!');

  return lines.join('\n');
}

/**
 * Formats training enrollment inquiry from the youth skills form.
 */
export interface EnrollmentFormData {
  fullName: string;
  phoneNumber: string;
  email?: string;
  preferredCategory: string;
  trainingFormat: string;
  additionalInfo?: string;
}

export function formatEnrollmentWhatsAppMessage(data: EnrollmentFormData): string {
  const lines = [
    'Hello LivingTech Brand Agency, I want to enroll for the 3-Day Youth Skill Acquisition Program:',
    `• Full Name: ${data.fullName.trim()}`,
    `• Phone Number: ${data.phoneNumber.trim()}`,
  ];

  if (data.email && data.email.trim()) {
    lines.push(`• Email: ${data.email.trim()}`);
  }

  lines.push(`• Preferred Category: ${data.preferredCategory.trim()}`);
  lines.push(`• Format: ${data.trainingFormat.trim()}`);

  if (data.additionalInfo && data.additionalInfo.trim()) {
    lines.push(`• Note: ${data.additionalInfo.trim()}`);
  }

  lines.push('Please confirm seat availability and payment instructions. Thank you!');

  return lines.join('\n');
}
