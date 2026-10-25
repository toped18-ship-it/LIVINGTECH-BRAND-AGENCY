/**
 * Admin Data Store & Synchronization Service
 * Provides reactive persistence in localStorage with fallback to BUSINESS_CONFIG
 */

import { BUSINESS_CONFIG, BusinessConfig, ServiceItem, PortfolioItem, TrainingProgramConfig, BlogPost } from '../config/business';

export type EnquiryStatus = 'New' | 'In Discussion' | 'Quotation Sent' | 'Completed' | 'Archived';
export type EnrollmentStatus = 'Registered' | 'Contacted' | 'Confirmed / Paid' | 'Completed' | 'Cancelled';

export { type BlogPost };

export interface EnquiryRecord {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  serviceRequired: string;
  projectDescription: string;
  status: EnquiryStatus;
  submittedAt: string;
  notes?: string;
}

export interface EnrollmentRecord {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  preferredCategory: string;
  trainingFormat: string;
  additionalInfo?: string;
  status: EnrollmentStatus;
  submittedAt: string;
  notes?: string;
}

const STORAGE_KEYS = {
  CONFIG: 'livingtech_admin_config_v1',
  ENQUIRIES: 'livingtech_enquiries',
  ENROLLMENTS: 'livingtech_enrollments',
  AUTH: 'livingtech_admin_auth',
  BLOG: 'livingtech_blog_posts',
};

// In-memory fallback for non-browser / node test environments
const memoryStorage: Record<string, string> = {};

function getStoredItem(key: string): string | null {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  }
  return memoryStorage[key] || null;
}

function setStoredItem(key: string, val: string): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, val);
  } else {
    memoryStorage[key] = val;
  }
}

function removeStoredItem(key: string): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(key);
  } else {
    delete memoryStorage[key];
  }
}

let memorySessionAuth = false;

// Seed sample enquiries if empty
const DEFAULT_ENQUIRIES: EnquiryRecord[] = [
  {
    id: 'LT-ENQ-1730000001',
    fullName: 'David Onoja',
    phoneNumber: '08123456789',
    email: 'david.onoja@example.com',
    serviceRequired: 'Website Design and Development',
    projectDescription: 'We need an official web portal and student admission page for our private secondary school in Dekina LGA.',
    status: 'In Discussion',
    submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    notes: 'Discussed requirements on WhatsApp. Sent initial domain and hosting guidance.',
  },
  {
    id: 'LT-ENQ-1730000002',
    fullName: 'Pastor Emmanuel Attah',
    phoneNumber: '07033445566',
    email: 'graceassembly.abocho@gmail.com',
    serviceRequired: 'Church and Ministry Solutions',
    projectDescription: 'Requesting flyers and digital banners for our upcoming 3-day regional youth revival meeting.',
    status: 'New',
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'LT-ENQ-1730000003',
    fullName: 'Halimat Ibrahim',
    phoneNumber: '08099887766',
    serviceRequired: 'Graphic Design and Branding',
    projectDescription: 'Need a modern logo and brand identity package for a new agribusiness and bakery enterprise.',
    status: 'Quotation Sent',
    submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    notes: 'Quotation sent for logo and brand identity assets.',
  },
];

// Seed sample youth enrollments if empty
const DEFAULT_ENROLLMENTS: EnrollmentRecord[] = [
  {
    id: 'LT-ENR-1730000001',
    fullName: 'Solomon Peter',
    phoneNumber: '08155305685',
    email: 'solomon.p@gmail.com',
    preferredCategory: 'Graphic Design Essentials & Visual Branding',
    trainingFormat: 'In-Person (LivingTech Training Hub, Abocho)',
    status: 'Confirmed / Paid',
    submittedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    notes: 'Paid ₦1,500 cohort fee. Assigned to Morning Cohort.',
  },
  {
    id: 'LT-ENR-1730000002',
    fullName: 'Blessing Ocholi',
    phoneNumber: '07067048471',
    email: 'blessing.ocholi@yahoo.com',
    preferredCategory: 'Computer Fundamentals & Office Productivity',
    trainingFormat: 'In-Person (LivingTech Training Hub, Abocho)',
    status: 'Registered',
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
    notes: 'Pending phone confirmation for upcoming Friday start.',
  },
  {
    id: 'LT-ENR-1730000003',
    fullName: 'Gideon Ameh',
    phoneNumber: '08055667788',
    preferredCategory: 'Introductory Website Design & Digital Literacy',
    trainingFormat: 'Hybrid / Guided Digital Sessions',
    status: 'Contacted',
    submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

// Seed sample blog articles if empty
export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-kogi-graphic-design',
    title: 'Why High-Quality Graphic Design is Crucial for Growing Businesses in Kogi State',
    slug: 'graphic-design-crucial-for-kogi-businesses',
    category: 'Graphic Design',
    excerpt: 'In competitive markets across Abocho, Dekina, and Kogi State, visual branding is often the first impression a customer has of your credibility.',
    content: `In today's fast-moving business world, first impressions happen in seconds. Whether you run a private academy, an agricultural venture, a retail shop, or a church ministry, how you present yourself visually defines how customers perceive your value.

### 1. Visual Consistency Builds Immediate Trust
When a customer sees a flyer, logo, banner, and receipt that share professional colors, readable typography, and balanced layouts, they immediately know they are dealing with an established enterprise. Cheap, pixelated graphics erode confidence before you even get a chance to explain your services.

### 2. Standing Out on Social Media and WhatsApp
In Nigeria, WhatsApp statuses, Facebook groups, and Instagram feeds are primary sales channels. High-contrast, professionally composed flyers with clear calls-to-action (CTAs) consistently generate more customer inquiries and conversions than amateur templates.

### 3. Printing Matters: Resolution & Precision
At LivingTech Brand Agency, we prepare graphic design files with exact color calibrations (CMYK for print, RGB for digital screens) and high DPI vectors. Whether you are printing 1,000 handbills for an event or mounting a roadside flex banner in Abocho, your visuals remain razor-sharp.

### Get Professional Design with LivingTech
Ready to elevate your brand identity? Contact LivingTech today for logos, brand style guides, marketing collateral, church flyers, and custom digital advertisements.`,
    coverImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
    author: 'Temitope Oluwaseun',
    authorRole: 'Founder & Lead Designer',
    readTime: '4 min read',
    publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    isPublished: true,
    tags: ['Graphic Design', 'Branding', 'Kogi State', 'Visual Identity', 'Marketing'],
  },
  {
    id: 'blog-youth-computer-skills',
    title: 'Empowering Suburban & Rural Youths Through Practical Computer Training in Abocho',
    slug: 'empowering-youth-through-computer-training-abocho',
    category: 'Computer Training',
    excerpt: 'How our 3-Day Youth Skill Acquisition program is equipping young Nigerians in Dekina LGA with real-world digital skills that unlock economic opportunities.',
    content: `Digital literacy is no longer an optional luxury—it is the foundational literacy of the modern economy. Across Kogi State and Dekina LGA, thousands of vibrant young people have the ambition to succeed, but lack access to guided, hands-on computer training.

### Why Hands-On Practice Trumps Theory
Many traditional programs teach computer studies through blackboard diagrams. At LivingTech Brand Agency, we believe in practical immersion. From day one, participants get hands-on keyboard time:
- Navigating modern operating systems and file management
- Mastering Word processing, spreadsheets, and Google Docs for workplace readiness
- Learning beginner Canva and visual design principles to create commercial flyers
- Understanding safe internet research, email etiquette, and cloud storage

### Affordable and Impactful: The ₦1,500 Cohort Model
We deliberately set the registration for our 3-Day Skill Acquisition program at a community-accessible ₦1,500 commitment fee. This ensures that school leavers, students, and aspiring entrepreneurs can access quality mentorship without financial barriers.

### From Learner to Freelance Earner
Several of our past cohort participants have gone on to design church flyers for their local assemblies, format school exam papers, and offer typing services within their communities.

Join our next cohort or sponsor a youth today through LivingTech Brand Agency!`,
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    author: 'Temitope Oluwaseun',
    authorRole: 'Lead Instructor & Digital Strategist',
    readTime: '5 min read',
    publishedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    isPublished: true,
    tags: ['Computer Training', 'Youth Empowerment', 'Abocho', 'Digital Skills', 'Education'],
  },
  {
    id: 'blog-websites-vs-social-media',
    title: 'Modern Websites vs Social Media: Why Every School and Ministry Needs an Official Portal',
    slug: 'why-schools-and-ministries-need-websites',
    category: 'Website Design',
    excerpt: 'Social media algorithms change constantly, but an official website gives your institution a permanent, credible digital home.',
    content: `While having a Facebook page or WhatsApp business number is great for day-to-day announcements, it cannot replace an official institutional website. Here is why schools, churches, and growing organizations in Nigeria are investing in dedicated web portals.

### 1. Ownership & Control
You do not own your social media audience. Algorithm shifts or account suspensions can disconnect you from parents, students, or partners overnight. Your website at your custom domain (like livingtech.name.ng) is your permanent digital property.

### 2. Centralized Portals for Admissions & Results
For schools in Dekina LGA and beyond, an online portal allows parents to download admission forms, check academic calendars, verify fees, and inspect school achievements 24 hours a day without traveling physically to the bursary.

### 3. Google Search Visibility & Local SEO
When prospective clients or church members search Google for services in Abocho or Kogi State, social media pages rarely rank at the top. A well-coded website optimized with Schema.org structured data appears directly in search results.

### Partner With LivingTech for Your Web Project
Whether you need a school portal, an online ministry library, or a fast business brochure website, LivingTech Brand Agency builds responsive, mobile-first web platforms built for Nigerian internet speeds.`,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    author: 'Temitope Oluwaseun',
    authorRole: 'Founder & Web Developer',
    readTime: '4 min read',
    publishedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    isPublished: true,
    tags: ['Website Design', 'School Solutions', 'SEO', 'Digital Presence'],
  },
];

export class AdminStore {
  /**
   * Retrieves active business configuration from localStorage, or returns default.
   */
  static getConfig(): BusinessConfig {
    try {
      const stored = getStoredItem(STORAGE_KEYS.CONFIG);
      if (!stored) return BUSINESS_CONFIG;
      const parsed = JSON.parse(stored);
      return { ...BUSINESS_CONFIG, ...parsed };
    } catch {
      return BUSINESS_CONFIG;
    }
  }

  static saveConfig(config: BusinessConfig): void {
    setStoredItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('livingtech_config_updated', { detail: config }));
    }
  }

  static updateTraining(training: Partial<TrainingProgramConfig>): BusinessConfig {
    const current = this.getConfig();
    const updated: BusinessConfig = {
      ...current,
      youthTraining: {
        ...current.youthTraining,
        ...training,
      },
    };
    this.saveConfig(updated);
    return updated;
  }

  static updateService(service: ServiceItem): BusinessConfig {
    const current = this.getConfig();
    const updatedServices = current.services.map((s) => (s.id === service.id ? service : s));
    const updated: BusinessConfig = {
      ...current,
      services: updatedServices,
    };
    this.saveConfig(updated);
    return updated;
  }

  static addService(service: ServiceItem): BusinessConfig {
    const current = this.getConfig();
    const updated: BusinessConfig = {
      ...current,
      services: [...current.services, service],
    };
    this.saveConfig(updated);
    return updated;
  }

  static deleteService(id: string): BusinessConfig {
    const current = this.getConfig();
    const updated: BusinessConfig = {
      ...current,
      services: current.services.filter((s) => s.id !== id),
    };
    this.saveConfig(updated);
    return updated;
  }

  static updatePortfolioItem(item: PortfolioItem): BusinessConfig {
    const current = this.getConfig();
    const updatedPortfolio = current.portfolio.map((p) => (p.id === item.id ? item : p));
    const updated: BusinessConfig = {
      ...current,
      portfolio: updatedPortfolio,
    };
    this.saveConfig(updated);
    return updated;
  }

  static addPortfolioItem(item: PortfolioItem): BusinessConfig {
    const current = this.getConfig();
    const updated: BusinessConfig = {
      ...current,
      portfolio: [...current.portfolio, item],
    };
    this.saveConfig(updated);
    return updated;
  }

  static deletePortfolioItem(id: string): BusinessConfig {
    const current = this.getConfig();
    const updated: BusinessConfig = {
      ...current,
      portfolio: current.portfolio.filter((p) => p.id !== id),
    };
    this.saveConfig(updated);
    return updated;
  }

  static getEnquiries(): EnquiryRecord[] {
    try {
      const stored = getStoredItem(STORAGE_KEYS.ENQUIRIES);
      if (!stored) {
        setStoredItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(DEFAULT_ENQUIRIES));
        return DEFAULT_ENQUIRIES;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_ENQUIRIES;
    }
  }

  static saveEnquiries(enquiries: EnquiryRecord[]): void {
    setStoredItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('livingtech_enquiries_updated'));
    }
  }

  static addEnquiry(item: Omit<EnquiryRecord, 'id' | 'status' | 'submittedAt'>): EnquiryRecord {
    const list = this.getEnquiries();
    const newRecord: EnquiryRecord = {
      ...item,
      id: `LT-ENQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'New',
      submittedAt: new Date().toISOString(),
    };
    this.saveEnquiries([newRecord, ...list]);
    return newRecord;
  }

  static updateEnquiryStatus(id: string, status: EnquiryStatus, notes?: string): void {
    const list = this.getEnquiries();
    const updated = list.map((item) =>
      item.id === id ? { ...item, status, ...(notes !== undefined ? { notes } : {}) } : item
    );
    this.saveEnquiries(updated);
  }

  static deleteEnquiry(id: string): void {
    const list = this.getEnquiries();
    this.saveEnquiries(list.filter((item) => item.id !== id));
  }

  static getEnrollments(): EnrollmentRecord[] {
    try {
      const stored = getStoredItem(STORAGE_KEYS.ENROLLMENTS);
      if (!stored) {
        setStoredItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(DEFAULT_ENROLLMENTS));
        return DEFAULT_ENROLLMENTS;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_ENROLLMENTS;
    }
  }

  static saveEnrollments(enrollments: EnrollmentRecord[]): void {
    setStoredItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(enrollments));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('livingtech_enrollments_updated'));
    }
  }

  static addEnrollment(
    item: Omit<EnrollmentRecord, 'id' | 'status' | 'submittedAt'>
  ): EnrollmentRecord {
    const list = this.getEnrollments();
    const newRecord: EnrollmentRecord = {
      ...item,
      id: `LT-ENR-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'Registered',
      submittedAt: new Date().toISOString(),
    };
    this.saveEnrollments([newRecord, ...list]);
    return newRecord;
  }

  static updateEnrollmentStatus(id: string, status: EnrollmentStatus, notes?: string): void {
    const list = this.getEnrollments();
    const updated = list.map((item) =>
      item.id === id ? { ...item, status, ...(notes !== undefined ? { notes } : {}) } : item
    );
    this.saveEnrollments(updated);
  }

  static deleteEnrollment(id: string): void {
    const list = this.getEnrollments();
    this.saveEnrollments(list.filter((item) => item.id !== id));
  }

  static isAuthenticated(): boolean {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    }
    return memorySessionAuth;
  }

  static login(password: string): boolean {
    const validPasswords = ['livingtech2026', 'admin123', 'abocho2026'];
    if (validPasswords.includes(password.trim())) {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      }
      memorySessionAuth = true;
      return true;
    }
    return false;
  }

  static logout(): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    }
    memorySessionAuth = false;
  }

  static getBlogPosts(): BlogPost[] {
    try {
      const stored = getStoredItem(STORAGE_KEYS.BLOG);
      if (!stored) {
        setStoredItem(STORAGE_KEYS.BLOG, JSON.stringify(DEFAULT_BLOG_POSTS));
        return DEFAULT_BLOG_POSTS;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_BLOG_POSTS;
    }
  }

  static saveBlogPosts(posts: BlogPost[]): void {
    setStoredItem(STORAGE_KEYS.BLOG, JSON.stringify(posts));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('livingtech_blog_updated', { detail: posts }));
    }
  }

  static addBlogPost(post: Omit<BlogPost, 'id' | 'publishedAt'> & { publishedAt?: string }): BlogPost {
    const posts = this.getBlogPosts();
    const newPost: BlogPost = {
      ...post,
      id: `LT-BLOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      publishedAt: post.publishedAt || new Date().toISOString(),
    };
    this.saveBlogPosts([newPost, ...posts]);
    return newPost;
  }

  static updateBlogPost(post: BlogPost): void {
    const posts = this.getBlogPosts();
    const updated = posts.map((p) => (p.id === post.id ? post : p));
    this.saveBlogPosts(updated);
  }

  static deleteBlogPost(id: string): void {
    const posts = this.getBlogPosts();
    this.saveBlogPosts(posts.filter((p) => p.id !== id));
  }

  static getBlogPostBySlug(slug: string): BlogPost | undefined {
    const posts = this.getBlogPosts();
    return posts.find((p) => p.slug === slug || p.id === slug);
  }

  static exportAllData(): string {
    const data = {
      exportedAt: new Date().toISOString(),
      businessConfig: this.getConfig(),
      enquiries: this.getEnquiries(),
      enrollments: this.getEnrollments(),
      blogPosts: this.getBlogPosts(),
    };
    return JSON.stringify(data, null, 2);
  }

  static resetToDefaults(): void {
    removeStoredItem(STORAGE_KEYS.CONFIG);
    setStoredItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(DEFAULT_ENQUIRIES));
    setStoredItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(DEFAULT_ENROLLMENTS));
    setStoredItem(STORAGE_KEYS.BLOG, JSON.stringify(DEFAULT_BLOG_POSTS));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('livingtech_config_updated', { detail: BUSINESS_CONFIG }));
      window.dispatchEvent(new CustomEvent('livingtech_blog_updated', { detail: DEFAULT_BLOG_POSTS }));
    }
  }
}
