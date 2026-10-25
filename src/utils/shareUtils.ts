/**
 * Shareable Links and Social Sharing Utilities for LivingTech Brand Agency
 */

import { BASE_URL } from './seo';

export interface SectionShareItem {
  id: string;
  name: string;
  hash: string;
  description: string;
  category: 'Core Pages' | 'Key Services' | 'Programs & Media';
}

export const SECTION_SHARE_DIRECTORY: SectionShareItem[] = [
  {
    id: 'home',
    name: 'Homepage / LivingTech Overview',
    hash: '#home',
    description: 'Main landing page featuring agency mission, founder profile, and solutions.',
    category: 'Core Pages',
  },
  {
    id: 'services',
    name: 'All Digital Services Catalog',
    hash: '#services',
    description: 'Comprehensive directory of 8 core technical, branding, and digitalization services.',
    category: 'Key Services',
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design & Visual Branding',
    hash: '#service-graphic-design-branding',
    description: 'Custom logos, flyers, banners, social media marketing, and brand identity.',
    category: 'Key Services',
  },
  {
    id: 'computer-training',
    name: 'Computer Training & Digital Skills',
    hash: '#service-computer-training',
    description: 'Practical computer literacy, office tools, design, and web training classes.',
    category: 'Key Services',
  },
  {
    id: 'web-dev',
    name: 'Website & Application Development',
    hash: '#service-website-design',
    description: 'Custom responsive web platforms, portals, and software development.',
    category: 'Key Services',
  },
  {
    id: 'training',
    name: 'Youth Skill Acquisition Program (3-Day)',
    hash: '#training',
    description: '₦1,500 hands-on cohort program in Abocho, Dekina LGA, Kogi State.',
    category: 'Programs & Media',
  },
  {
    id: 'portfolio',
    name: 'Portfolio, EdTech & Project Showcase',
    hash: '#portfolio',
    description: 'Interactive gallery of client projects, LivingstoneEdu, and digital work.',
    category: 'Programs & Media',
  },
  {
    id: 'blog',
    name: 'LivingTech Blog & Tech Insights',
    hash: '#blog',
    description: 'Articles, practical tutorials, and digital growth strategies for Nigeria.',
    category: 'Programs & Media',
  },
  {
    id: 'about',
    name: 'About LivingTech & Leadership',
    hash: '#about',
    description: 'Agency story, vision, and profile of founder Temitope Oluwaseun.',
    category: 'Core Pages',
  },
  {
    id: 'process',
    name: 'How We Work (4-Step Process)',
    hash: '#process',
    description: 'Consultation, planning, precision creation, and ongoing support.',
    category: 'Core Pages',
  },
  {
    id: 'testimonials',
    name: 'Client Feedback & Partnerships',
    hash: '#testimonials',
    description: 'Genuine testimonials from business owners, schools, and past students.',
    category: 'Core Pages',
  },
  {
    id: 'contact',
    name: 'Contact & Quotation Request',
    hash: '#contact',
    description: 'Direct contact info, WhatsApp links, and instant project quote forms.',
    category: 'Core Pages',
  },
];

/**
 * Converts a title string into a clean, URL-safe slug.
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Returns the absolute canonical share URL for any section.
 */
export function getSectionShareUrl(sectionIdOrHash: string): string {
  const clean = sectionIdOrHash.startsWith('#')
    ? sectionIdOrHash
    : `#${sectionIdOrHash.replace(/^#/, '')}`;
  return `${BASE_URL}/${clean}`;
}

/**
 * Returns the absolute canonical share URL for a specific blog post.
 */
export function getBlogShareUrl(slugOrId: string): string {
  return `${BASE_URL}/#blog/${slugOrId}`;
}

/**
 * Returns the absolute canonical share URL for a specific portfolio project.
 */
export function getPortfolioShareUrl(id: string): string {
  return `${BASE_URL}/#portfolio/${id}`;
}

/**
 * Constructs a pre-filled WhatsApp share link.
 */
export function generateWhatsAppShareUrl(url: string, message: string): string {
  const text = `${message}\n\n${url}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/**
 * Constructs a pre-filled Twitter / X share intent URL.
 */
export function generateTwitterShareUrl(url: string, text: string): string {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
}

/**
 * Constructs a Facebook share dialogue link.
 */
export function generateFacebookShareUrl(url: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

/**
 * Copies the shareable link to clipboard and handles browser notifications / web share API.
 */
export async function copyToClipboard(
  url: string,
  title?: string
): Promise<{ success: boolean; method: 'clipboard' | 'webshare' | 'failed' }> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
      return { success: true, method: 'clipboard' };
    }
  } catch {
    // Fall back to document.execCommand if clipboard API restricted
    try {
      if (typeof document !== 'undefined') {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return { success: true, method: 'clipboard' };
      }
    } catch {
      // Ignore
    }
  }

  // Attempt Web Share API as alternative
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: title || 'LivingTech Brand Agency',
        url,
      });
      return { success: true, method: 'webshare' };
    } catch {
      // User cancelled or share failed
    }
  }

  return { success: false, method: 'failed' };
}
