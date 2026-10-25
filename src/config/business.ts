/**
 * Centralized Configuration for LIVINGTECH BRAND AGENCY
 * 
 * All business identity, contact information, services, pricing,
 * and portfolio data can be updated from this single source of truth.
 */

export interface ServiceItem {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  ctaText: string;
  iconName: string;
  benefits: string[];
  features: string[];
  badge?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Website Design' | 'Application Development' | 'Graphic Design' | 'Branding' | 'Educational Technology' | 'Digital Projects';
  description: string;
  technologies?: string[];
  status: 'Active Project' | 'In Development' | 'Educational Initiative' | 'Proposed Concept' | 'Preview Coming Soon' | 'Completed';
  liveUrl?: string;
  buttonLabel?: string;
  imageUrl?: string;
  imageAlt?: string;
  clientName?: string;
  completionDate?: string;
  isPlaceholder?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Graphic Design' | 'Computer Training' | 'Website Design' | 'Digital Skills' | 'Tech Insights' | 'Community Impact';
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  authorRole: string;
  readTime: string;
  publishedAt: string;
  isPublished: boolean;
  tags: string[];
}

export interface TrainingProgramConfig {
  title: string;
  shortHeadline: string;
  programOverview: string;
  targetAudience: string[];
  categories: string[];
  isAvailable: boolean;
  advertisedPrice: number; // e.g. 1500 for ₦1,500
  currencySymbol: string;
  duration: string;
  dates: string;
  location: string;
  trainingFormats: string[];
}

export interface BusinessConfig {
  businessName: string;
  tagline: string;
  heroHeading: string;
  heroSupportingText: string;
  ownerName: string;
  ownerRole: string;
  positioning: string;
  aboutCopy: {
    heading: string;
    paragraphs: string[];
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    whatsappRaw: string;
    whatsappInternational: string;
    email: string;
    website: string;
    locationShort: string;
    locationFull: string;
    state: string;
    country: string;
  };
  services: ServiceItem[];
  youthTraining: TrainingProgramConfig;
  portfolio: PortfolioItem[];
  whyChooseUs: {
    title: string;
    description: string;
    icon: string;
  }[];
  processSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  socials: {
    platform: string;
    url: string;
    active: boolean;
  }[];
}

export const BUSINESS_CONFIG: BusinessConfig = {
  businessName: 'LIVINGTECH BRAND AGENCY',
  tagline: 'Building Brands. Creating Digital Solutions. Empowering People.',
  heroHeading: 'Building Brands. Creating Digital Solutions. Empowering People.',
  heroSupportingText:
    'LIVINGTECH BRAND AGENCY helps businesses, schools, churches, individuals, and organizations grow through professional website design, application development, graphic design, branding, computer training, and digital solutions.',
  ownerName: 'Temitope Oluwaseun',
  ownerRole: 'Website Designer | Graphic Designer | Digital Solutions Developer',
  positioning:
    'A digital solutions and creative technology brand helping individuals, businesses, schools, churches, and organizations establish a stronger digital presence and use technology effectively.',
  
  aboutCopy: {
    heading: 'Technology Meets Creativity.',
    paragraphs: [
      'LIVINGTECH BRAND AGENCY is a digital solutions and creative technology brand focused on helping businesses, educational institutions, churches, organizations, and individuals make better use of technology.',
      'Through website design, application development, graphic design, branding, computer training, and digital services, we help clients strengthen their online presence, communicate their ideas, and work toward their goals.',
      'Our approach combines creativity, practical technology, continuous learning, and a commitment to delivering solutions that address real needs.',
    ],
  },

  contact: {
    phone: '07067048471',
    phoneFormatted: '+234 706 704 8471',
    whatsappRaw: '08155305685',
    whatsappInternational: '2348155305685',
    email: 'livinglsuccess@gmail.com',
    website: 'https://www.livingtech.name.ng',
    locationShort: 'Abocho, Dekina LGA, Kogi State, Nigeria',
    locationFull: 'Abocho, Dekina Local Government Area, Kogi State, Nigeria',
    state: 'Kogi State',
    country: 'Nigeria',
  },

  services: [
    {
      id: 'website-design',
      name: 'Website Design and Development',
      shortDesc: 'Professional websites for businesses, schools, churches, organizations, ministries, and personal brands.',
      fullDesc: 'Modern, high-performance, and responsive web platforms built with precision, search optimization, and user-centric architecture.',
      ctaText: 'Build My Website',
      iconName: 'Globe',
      benefits: [
        'Fast loading & mobile optimized',
        'Custom layout tailored to your audience',
        'Built-in SEO & domain/hosting guidance',
      ],
      features: [
        'Business websites',
        'Landing pages',
        'Portfolio websites',
        'School websites',
        'Church and ministry websites',
        'Website redesign',
        'Responsive website development',
        'Website deployment and maintenance',
        'Domain and hosting assistance',
      ],
    },
    {
      id: 'app-development',
      name: 'Application Development',
      shortDesc: 'Digital applications designed to solve practical problems and improve business, educational, and organizational processes.',
      fullDesc: 'Custom software applications, educational management systems, and tailored digital utilities that automate workflows.',
      ctaText: 'Build My Application',
      iconName: 'CodeXml',
      benefits: [
        'Streamlined workflow automation',
        'Intuitive interface design',
        'Scalable and reliable technology stack',
      ],
      features: [
        'Web applications',
        'Educational applications',
        'Learning management systems',
        'School management solutions',
        'Business applications',
        'Custom digital tools',
        'Application interface design',
        'Application deployment assistance',
      ],
    },
    {
      id: 'graphic-design-branding',
      name: 'Graphic Design and Branding',
      shortDesc: 'Creative visual communication that helps businesses, organizations, churches, and individuals present their brands professionally.',
      fullDesc: 'Cohesive brand identities, high-impact marketing visuals, flyers, cards, and banners crafted to make your brand unforgettable.',
      ctaText: 'Request a Design',
      iconName: 'Palette',
      benefits: [
        'Distinctive and cohesive identity',
        'Print-ready & high-resolution digital assets',
        'Clear visual storytelling that drives engagement',
      ],
      features: [
        'Business flyers',
        'Event flyers',
        'Church flyers',
        'Social media graphics',
        'Business cards',
        'Logos and brand identity',
        'Posters and banners',
        'Promotional designs',
        'Marketing graphics',
        'Digital advertisements',
      ],
    },
    {
      id: 'computer-training',
      name: 'Computer Training and Digital Skills',
      shortDesc: 'Practical computer training and digital skills development for beginners, students, youths, workers, entrepreneurs, and business owners.',
      fullDesc: 'Hands-on instruction that takes learners from basic computer literacy to real-world design, web design, and digital workplace readiness.',
      ctaText: 'Enroll for Training',
      iconName: 'GraduationCap',
      badge: 'Youth Program Available',
      benefits: [
        'Practical hands-on computer sessions',
        'Beginner-friendly step-by-step curriculum',
        'Mentorship for career and digital independence',
      ],
      features: [
        'Computer fundamentals',
        'Basic computer operations',
        'Office productivity applications',
        'Internet and email usage',
        'Digital literacy',
        'Website design training',
        'Graphic design training',
        'Practical technology skills',
        'Introductory application development where offered',
      ],
    },
    {
      id: 'digital-content-creation',
      name: 'Digital Content Creation',
      shortDesc: 'Creative digital content that helps businesses and organizations communicate effectively with their audiences.',
      fullDesc: 'Compelling promotional copy, social media creative, visual assets, and content planning that elevate your brand voice.',
      ctaText: 'Create My Content',
      iconName: 'PenTool',
      benefits: [
        'Consistent voice across marketing channels',
        'Audience-centric visual storytelling',
        'Higher engagement and customer response',
      ],
      features: [
        'Promotional content',
        'Social media content',
        'Marketing copy',
        'Digital campaign materials',
        'Content planning',
        'Visual storytelling',
      ],
    },
    {
      id: 'business-digitalization',
      name: 'Business Digitalization',
      shortDesc: 'Helping businesses establish and improve their digital presence and streamline daily operational tasks.',
      fullDesc: 'Setup and integration of essential online tools: professional business emails, WhatsApp Business, Google presence, forms, and consulting.',
      ctaText: 'Grow My Business',
      iconName: 'Briefcase',
      benefits: [
        'Professional business credibility',
        'Automated customer inquiries',
        'Local discoverability on search engines',
      ],
      features: [
        'Business email setup',
        'WhatsApp Business integration',
        'Google Business Profile assistance',
        'Search engine optimization (SEO)',
        'Online business presence',
        'Digital workflow solutions',
        'Data collection and digital forms',
        'Business technology consulting',
      ],
    },
    {
      id: 'school-solutions',
      name: 'School Solutions',
      shortDesc: 'Digital solutions designed to support teaching, learning, student records, and school administration.',
      fullDesc: 'Empower primary, secondary, and higher educational institutions with dedicated websites, learning portals, and administrative tools.',
      ctaText: 'Digitize My School',
      iconName: 'School',
      benefits: [
        'Structured digital records & communication',
        'Parent, student, and teacher accessibility',
        'Enhanced institutional reputation',
      ],
      features: [
        'School websites',
        'Educational applications',
        'Learning portals',
        'Digital learning resources',
        'School technology consulting',
        'Educational content development',
      ],
    },
    {
      id: 'church-ministry-solutions',
      name: 'Church and Ministry Solutions',
      shortDesc: 'Digital tools that help churches, ministries, and Christian organizations communicate, teach, and manage their online presence.',
      fullDesc: 'Inspiring ministry websites, event graphics, sermon/media resources, and digital platforms to reach congregation and mission fields.',
      ctaText: 'Build My Ministry Website',
      iconName: 'Church',
      benefits: [
        'Dignified and inspiring visual design',
        'Effective event and service promotion',
        'Expanded ministry reach across digital channels',
      ],
      features: [
        'Church websites',
        'Ministry websites',
        'Christian content design',
        'Ministry promotional graphics',
        'Online Bible learning projects',
        'Digital ministry resources',
        'Technology support for ministry activities',
      ],
    },
  ],

  youthTraining: {
    title: 'Three-Day Youth Skill Acquisition Program',
    shortHeadline: 'Learn Digital Skills. Build Your Future.',
    programOverview:
      'Take practical steps toward digital independence with computer training, graphic design, website design, and other technology skills offered by LIVINGTECH BRAND AGENCY.',
    targetAudience: [
      'Beginners & School Leavers',
      'Students & Youths in Kogi State',
      'Aspiring Designers & Tech Enthusiasts',
      'Workers, Entrepreneurs & Business Owners',
    ],
    categories: [
      'Computer Fundamentals & Office Productivity',
      'Graphic Design Essentials & Visual Branding',
      'Introductory Website Design & Digital Literacy',
      'Practical Online Tools & Business Communication',
    ],
    isAvailable: true,
    advertisedPrice: 1500, // ₦1,500
    currencySymbol: '₦',
    duration: '3 Intensive Days',
    dates: 'Upcoming Cohort — Enrolling Now',
    location: 'Abocho, Dekina LGA, Kogi State, Nigeria',
    trainingFormats: [
      'In-Person (LivingTech Training Hub, Abocho)',
      'Hybrid / Guided Digital Sessions',
    ],
  },

  portfolio: [
    {
      id: 'livingstone-edu',
      title: 'LivingstoneEdu',
      category: 'Educational Technology',
      description:
        'An educational technology project focused on digital learning, educational resources, and academic empowerment for students and teachers.',
      technologies: ['React', 'Educational Tech', 'Web Architecture', 'UI/UX'],
      status: 'Educational Initiative',
      buttonLabel: 'Explore LivingstoneEdu',
      liveUrl: 'https://www.livingtech.name.ng',
      imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1000&q=80',
      clientName: 'Livingstone Edu Foundation',
      completionDate: '2025/2026',
      isPlaceholder: false,
    },
    {
      id: 'learn-bible',
      title: 'LearnBible',
      category: 'Educational Technology',
      description:
        'A proposed and developing Christian educational project focused on interactive Bible learning, spiritual storytelling, and scripture study resources.',
      technologies: ['Christian EdTech', 'Interactive Learning', 'Storytelling'],
      status: 'In Development',
      imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1000&q=80',
      clientName: 'Christian Digital Initiative',
      completionDate: 'In Active Progress',
      isPlaceholder: false,
    },
    {
      id: 'prayer-cloud',
      title: 'PrayerCloud',
      category: 'Digital Projects',
      description:
        'A proposed and developing ministry-oriented digital project focused on structured prayer networks, devotionals, and missionary-related activities.',
      technologies: ['Ministry Technology', 'Community Platform', 'Cloud Tools'],
      status: 'Proposed Concept',
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
      clientName: 'Missionary Network Alliance',
      completionDate: 'Concept Phase',
      isPlaceholder: false,
    },
    {
      id: 'school-portal-suite',
      title: 'School Management & Portal Suite',
      category: 'Application Development',
      description:
        'Custom web solution architecture designed for school administrative workflows, grade recording, and student records.',
      technologies: ['Web Application', 'Database Architecture', 'Role-Based Access'],
      status: 'Completed',
      imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80',
      clientName: 'Private Secondary Schools, Dekina',
      completionDate: '2025',
      isPlaceholder: false,
    },
    {
      id: 'brand-identity-showcase',
      title: 'Brand Identity & Print Design Showcase',
      category: 'Graphic Design',
      description:
        'High-resolution branding packages including church flyers, corporate business cards, and marketing banners.',
      technologies: ['Branding', 'Typography', 'Visual Communication'],
      status: 'Completed',
      imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80',
      clientName: 'Local Businesses & Church Assemblies',
      completionDate: '2025/2026',
      isPlaceholder: false,
    },
    {
      id: 'business-digital-presence',
      title: 'Small Business Web Portal',
      category: 'Website Design',
      description:
        'Clean, conversion-optimized business landing pages with integrated WhatsApp enquiry pipelines.',
      technologies: ['HTML5/CSS3', 'SEO Optimization', 'Mobile-First'],
      status: 'Completed',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      clientName: 'Agribusiness & Commercial Enterprises',
      completionDate: '2025',
      isPlaceholder: false,
    },
  ],

  whyChooseUs: [
    {
      title: 'Multiple Digital Services in One Place',
      description: 'From web development and software to graphic design, branding, and computer education, get comprehensive technology under one roof.',
      icon: 'Layers',
    },
    {
      title: 'Solutions Tailored to Client Requirements',
      description: 'We do not sell one-size-fits-all packages. Every website, design, or training plan is customized to your actual operational needs.',
      icon: 'Sliders',
    },
    {
      title: 'Professional and Creative Design',
      description: 'Clean visual hierarchies, elegant brand colors, and functional layouts that help your business or ministry stand out with dignity.',
      icon: 'Sparkles',
    },
    {
      title: 'Practical Technology Training',
      description: 'Direct hands-on skills instruction centered on real-world software, design principles, and workplace productivity.',
      icon: 'BookOpen',
    },
    {
      title: 'Support for Businesses and Organizations',
      description: 'We partner with local enterprises, schools, and Christian ministries to establish durable digital systems that simplify daily tasks.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Educational Technology Experience',
      description: 'Demonstrated initiative in creating educational platforms (LivingstoneEdu, LearnBible) with a focus on student growth and learning.',
      icon: 'GraduationCap',
    },
    {
      title: 'Convenient Communication Through WhatsApp',
      description: 'Quick responses, easy project discussions, and smooth feedback directly via your preferred mobile messaging app.',
      icon: 'MessageSquareText',
    },
    {
      title: 'Solutions Designed Around Real Needs',
      description: 'We build technology that solves practical local challenges without unnecessary complexity or hidden costs.',
      icon: 'Target',
    },
  ],

  processSteps: [
    {
      step: 1,
      title: 'Tell us what you need',
      description: 'Reach out through our online request form or send a message directly on WhatsApp describing your project or training goal.',
    },
    {
      step: 2,
      title: 'Discuss your requirements and objectives',
      description: 'We evaluate your timeline, design preferences, and functional needs to outline the most effective technological approach.',
    },
    {
      step: 3,
      title: 'Receive a suitable proposal or quotation',
      description: 'Get a clear, honest breakdown of project scope, timelines, deliverables, and transparent pricing tailored to your scale.',
    },
    {
      step: 4,
      title: 'Proceed with the agreed project or service',
      description: 'We execute the project with precision, keeping you informed at every milestone until your solution or training is delivered.',
    },
  ],

  faqs: [
    {
      question: 'What services does LivingTech Brand Agency offer?',
      answer: 'We provide website design and development, custom application development, graphic design and branding, practical computer training and digital skills acquisition, digital content creation, business digitalization (email, SEO, WhatsApp Business), school solutions, and church/ministry solutions.',
    },
    {
      question: 'Can you design a website for my business?',
      answer: 'Yes. We build responsive, fast-loading, and professional websites for businesses, personal brands, schools, churches, and organizations, complete with domain and hosting setup assistance.',
    },
    {
      question: 'Do you develop educational applications?',
      answer: 'Yes. We develop practical educational tools and learning management solutions, including our own initiatives like LivingstoneEdu, and customized systems for schools and learning centers.',
    },
    {
      question: 'Do you offer computer training?',
      answer: 'Yes. We conduct practical computer training in Abocho, Kogi State, covering basic computer operations, office productivity software, graphic design, digital literacy, and our affordable 3-day youth skill acquisition cohorts.',
    },
    {
      question: 'Can I request a custom graphic design?',
      answer: 'Yes. We design business flyers, church event posters, social media graphics, professional business cards, logos, and promotional marketing materials tailored to your specific brand.',
    },
    {
      question: 'Do you work with schools and churches?',
      answer: 'Yes. We specifically provide dedicated digital solutions for educational institutions (school websites, student portals) and Christian ministries (church websites, media graphics, devotional projects).',
    },
    {
      question: 'How do I request a quotation?',
      answer: 'You can submit the online project quotation form on this website or click any "Request This Service" or "Discuss Your Project" button to discuss your requirements directly with us on WhatsApp.',
    },
    {
      question: 'How can I contact LivingTech?',
      answer: 'You can call us directly on 07067048471, chat with us on WhatsApp at 08155305685, email livinglsuccess@gmail.com, or visit us in Abocho, Dekina LGA, Kogi State, Nigeria.',
    },
    {
      question: 'How do I enroll in a training program?',
      answer: 'Fill out the digital skills enrollment form in the Training section of this website, or click the WhatsApp enrollment button to register your interest for the upcoming cohort.',
    },
  ],

  socials: [
    // Real, verified channels only. No fake profile links.
    {
      platform: 'WhatsApp',
      url: 'https://wa.me/2348155305685',
      active: true,
    },
    {
      platform: 'Email',
      url: 'mailto:livinglsuccess@gmail.com',
      active: true,
    },
    {
      platform: 'Phone',
      url: 'tel:07067048471',
      active: true,
    },
  ],
};
