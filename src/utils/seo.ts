/**
 * SEO & Schema.org Structured Data Utilities for LIVINGTECH BRAND AGENCY
 * 
 * Provides search-engine-optimized meta tag updates and rich JSON-LD snippets
 * targeting specific search queries such as 'Graphic design' and 'Computer training'.
 */

export interface ServiceSEOMetadata {
  id: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  targetKeywords: string[];
  canonicalUrl: string;
  schemaType: 'Service' | 'Course' | ['Service', 'Course'];
  schemaData: Record<string, unknown>;
}

export const BASE_URL = 'https://www.livingtech.name.ng';

export const BUSINESS_PROVIDER_REF = {
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#business`,
  'name': 'LIVINGTECH BRAND AGENCY',
  'telephone': '+2347067048471',
  'url': BASE_URL,
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Abocho',
    'addressRegion': 'Kogi State',
    'addressCountry': 'NG'
  }
};

export const SERVICE_SEO_REGISTRY: Record<string, ServiceSEOMetadata> = {
  'graphic-design-branding': {
    id: 'graphic-design-branding',
    title: 'Graphic Design and Branding',
    metaTitle: 'Graphic Design & Brand Identity in Kogi State | LivingTech',
    metaDescription: 'Top-tier Graphic Design services in Kogi State, Nigeria. Custom logo design, brand identity, business & church flyers, posters, banners, and digital marketing graphics.',
    targetKeywords: [
      'Graphic design',
      'Graphic designer in Kogi State',
      'Graphic design in Nigeria',
      'Logo design Abocho',
      'Brand identity design',
      'Business flyer design',
      'Church flyer design',
      'Poster and banner design',
      'Social media graphics designer'
    ],
    canonicalUrl: `${BASE_URL}/#service-graphic-design-branding`,
    schemaType: 'Service',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${BASE_URL}/#service-graphic-design-branding`,
      'name': 'Graphic Design and Branding Services',
      'alternateName': 'Graphic Design',
      'serviceType': 'Graphic Design',
      'category': 'Creative & Graphic Design',
      'url': `${BASE_URL}/#service-graphic-design-branding`,
      'description': 'Professional graphic design and creative visual branding services in Kogi State, Nigeria. Custom business logos, event flyers, church graphics, banners, promotional assets, and complete brand identity.',
      'provider': BUSINESS_PROVIDER_REF,
      'areaServed': [
        { '@type': 'AdministrativeArea', 'name': 'Abocho' },
        { '@type': 'State', 'name': 'Kogi State' },
        { '@type': 'Country', 'name': 'Nigeria' }
      ],
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Graphic Design & Creative Services Catalog',
        'itemListElement': [
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Logo Design & Visual Identity',
              'description': 'Unique, scalable vector logos and brand identity packages for startups and businesses.'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Event & Church Flyer Design',
              'description': 'High-impact promotional flyers for business events, churches, and social campaigns.'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Business Cards, Posters & Banners',
              'description': 'Print-ready branding materials with crisp typography and professional layout.'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Social Media & Digital Ads Graphics',
              'description': 'Engaging visual assets tailored for Instagram, Facebook, and WhatsApp marketing.'
            }
          }
        ]
      }
    }
  },

  'computer-training': {
    id: 'computer-training',
    title: 'Computer Training and Digital Skills',
    metaTitle: 'Computer Training & Digital Skills Academy in Abocho, Kogi State | LivingTech',
    metaDescription: 'Practical Computer Training in Abocho, Dekina LGA, Kogi State. Master computer basics, office productivity, graphic design, and web development with hands-on mentorship.',
    targetKeywords: [
      'Computer training',
      'Computer training in Abocho',
      'Computer training in Kogi State',
      'Digital skills training Nigeria',
      'Practical computer classes Abocho',
      'Youth computer training program',
      'Graphic design training',
      'Computer literacy course',
      'LivingTech Academy'
    ],
    canonicalUrl: `${BASE_URL}/#service-computer-training`,
    schemaType: ['Service', 'Course'],
    schemaData: {
      '@context': 'https://schema.org',
      '@type': ['Service', 'Course'],
      '@id': `${BASE_URL}/#service-computer-training`,
      'name': 'Computer Training and Digital Skills Academy',
      'alternateName': 'Computer Training',
      'serviceType': 'Computer Training & Digital Skills Education',
      'category': 'Information Technology & Vocational Training',
      'url': `${BASE_URL}/#service-computer-training`,
      'description': 'Comprehensive hands-on computer training in Abocho, Kogi State. Teaching computer fundamentals, office productivity, digital literacy, graphic design, and web design for students, youths, and professionals.',
      'courseCode': 'LT-COMP-101',
      'educationalCredentialAwarded': 'Certificate of Completion in Computer & Digital Skills',
      'provider': BUSINESS_PROVIDER_REF,
      'educationalLevel': 'Beginner to Intermediate',
      'teaches': [
        'Computer Fundamentals & OS Navigation',
        'Office Productivity Applications (Word, Excel, Docs)',
        'Internet Research, Email, and Cloud Collaboration',
        'Introductory Graphic Design (Canva & Photoshop Basics)',
        'Web Design Principles and Practical Skills'
      ],
      'areaServed': [
        { '@type': 'AdministrativeArea', 'name': 'Abocho' },
        { '@type': 'AdministrativeArea', 'name': 'Dekina Local Government' },
        { '@type': 'State', 'name': 'Kogi State' },
        { '@type': 'Country', 'name': 'Nigeria' }
      ],
      'hasCourseInstance': {
        '@type': 'CourseInstance',
        'courseMode': ['IN_PERSON', 'BLENDED'],
        'courseWorkload': 'PT15H',
        'location': {
          '@type': 'Place',
          'name': 'LivingTech Training Hub',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Abocho',
            'addressRegion': 'Kogi State',
            'addressCountry': 'NG'
          }
        }
      }
    }
  },

  'youth-training': {
    id: 'youth-training',
    title: '3-Day Youth Empowerment Computer Training',
    metaTitle: 'Youth Computer Training Program in Abocho (₦1,500) | LivingTech',
    metaDescription: 'Join the LivingTech 3-Day Youth Computer Training in Abocho, Kogi State. Practical digital skills, computer basics, and design empowerment for students and youths.',
    targetKeywords: [
      'Youth computer training',
      'Affordable computer training Kogi State',
      'Abocho youth empowerment program',
      'Computer training Abocho',
      '3-day digital skills workshop',
      'Learn computer in Abocho'
    ],
    canonicalUrl: `${BASE_URL}/#youth-training`,
    schemaType: 'Course',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      '@id': `${BASE_URL}/#youth-training`,
      'name': '3-Day Youth Digital Empowerment & Computer Training',
      'alternateName': 'Youth Computer Training',
      'description': 'Subsidized 3-day practical computer training for youths and secondary school leavers in Abocho, Kogi State. Covers computer literacy, productivity tools, and digital career guidance.',
      'provider': BUSINESS_PROVIDER_REF,
      'courseCode': 'LT-YOUTH-2026',
      'educationalCredentialAwarded': 'Youth Digital Skills Certificate',
      'isAccessibleForFree': false,
      'offers': {
        '@type': 'Offer',
        'price': '1500',
        'priceCurrency': 'NGN',
        'availability': 'https://schema.org/InStock',
        'url': `${BASE_URL}/#youth-training`
      }
    }
  },

  'website-design': {
    id: 'website-design',
    title: 'Website Design and Development',
    metaTitle: 'Website Design & Development in Kogi State, Nigeria | LivingTech',
    metaDescription: 'Fast, modern, mobile-friendly websites for businesses, schools, churches, and personal brands in Kogi State. Search engine optimized with custom layouts.',
    targetKeywords: [
      'Website designer in Kogi State',
      'Website design in Nigeria',
      'School website design',
      'Church website design',
      'Business website development'
    ],
    canonicalUrl: `${BASE_URL}/#service-website-design`,
    schemaType: 'Service',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${BASE_URL}/#service-website-design`,
      'name': 'Website Design and Development',
      'alternateName': 'Website Design',
      'serviceType': 'Web Design and Development',
      'url': `${BASE_URL}/#service-website-design`,
      'description': 'Modern, high-performance responsive web design for businesses, schools, churches, and organizations in Nigeria.',
      'provider': BUSINESS_PROVIDER_REF
    }
  },

  'app-development': {
    id: 'app-development',
    title: 'Application Development',
    metaTitle: 'Custom Web & Mobile App Development in Nigeria | LivingTech',
    metaDescription: 'Tailored software applications, school management portals, and workflow automation systems built for reliability and scale by LivingTech.',
    targetKeywords: [
      'Application development in Nigeria',
      'Custom software developer Kogi State',
      'School management application',
      'Web application developer'
    ],
    canonicalUrl: `${BASE_URL}/#service-app-development`,
    schemaType: 'Service',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${BASE_URL}/#service-app-development`,
      'name': 'Application Development',
      'serviceType': 'Software and Application Development',
      'url': `${BASE_URL}/#service-app-development`,
      'description': 'Custom web applications, educational portals, and business workflow software built to streamline daily operations.',
      'provider': BUSINESS_PROVIDER_REF
    }
  },

  'digital-content-creation': {
    id: 'digital-content-creation',
    title: 'Digital Content Creation',
    metaTitle: 'Digital Content Creation & Copywriting | LivingTech',
    metaDescription: 'Compelling promotional copy, social media content, and visual storytelling that strengthens brand engagement and customer trust.',
    targetKeywords: [
      'Digital content creation',
      'Social media marketing Nigeria',
      'Brand copywriting',
      'Visual storytelling'
    ],
    canonicalUrl: `${BASE_URL}/#service-digital-content-creation`,
    schemaType: 'Service',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${BASE_URL}/#service-digital-content-creation`,
      'name': 'Digital Content Creation',
      'serviceType': 'Content Creation and Digital Marketing',
      'url': `${BASE_URL}/#service-digital-content-creation`,
      'description': 'Strategic digital content creation, promotional copywriting, and visual storytelling for businesses and organizations.',
      'provider': BUSINESS_PROVIDER_REF
    }
  },

  'business-digitalization': {
    id: 'business-digitalization',
    title: 'Business Digitalization',
    metaTitle: 'Business Digitalization & Tech Setup | LivingTech',
    metaDescription: 'Transform traditional operations into modern digital workflows. Digital record keeping, online profiles, and tech adoption for small businesses.',
    targetKeywords: [
      'Business digitalization Nigeria',
      'SME digital transformation',
      'Digital business setup Kogi State'
    ],
    canonicalUrl: `${BASE_URL}/#service-business-digitalization`,
    schemaType: 'Service',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${BASE_URL}/#service-business-digitalization`,
      'name': 'Business Digitalization',
      'serviceType': 'Business Digital Transformation',
      'url': `${BASE_URL}/#service-business-digitalization`,
      'description': 'Assisting small and growing businesses in adopting digital tools, streamlined customer communications, and online operations.',
      'provider': BUSINESS_PROVIDER_REF
    }
  },

  'school-solutions': {
    id: 'school-solutions',
    title: 'School Solutions & Management Portals',
    metaTitle: 'School Management Systems & Portals | LivingTech',
    metaDescription: 'Digital school management solutions: student record systems, result computation portals, and digital administrative tools in Kogi State.',
    targetKeywords: [
      'School portal developer Kogi State',
      'School management system Nigeria',
      'Digital result processing system'
    ],
    canonicalUrl: `${BASE_URL}/#service-school-solutions`,
    schemaType: 'Service',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${BASE_URL}/#service-school-solutions`,
      'name': 'School Solutions and Management Systems',
      'serviceType': 'Educational Technology and Administration',
      'url': `${BASE_URL}/#service-school-solutions`,
      'description': 'End-to-end digital tools for schools including student database records, termly result computation, and online presence.',
      'provider': BUSINESS_PROVIDER_REF
    }
  },

  'church-ministry-solutions': {
    id: 'church-ministry-solutions',
    title: 'Church and Ministry Media Solutions',
    metaTitle: 'Church Media & Ministry Digital Solutions | LivingTech',
    metaDescription: 'Digital solutions for faith ministries: sermon publishing, event branding, program flyers, and church website platforms.',
    targetKeywords: [
      'Church website designer',
      'Ministry graphic design',
      'Church media solutions Nigeria'
    ],
    canonicalUrl: `${BASE_URL}/#service-church-ministry-solutions`,
    schemaType: 'Service',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${BASE_URL}/#service-church-ministry-solutions`,
      'name': 'Church and Ministry Digital Solutions',
      'serviceType': 'Religious & Ministry Media Solutions',
      'url': `${BASE_URL}/#service-church-ministry-solutions`,
      'description': 'Dedicated digital solutions for churches and ministries: event publicity designs, sermon media, and website platforms.',
      'provider': BUSINESS_PROVIDER_REF
    }
  }
};

/**
 * Returns complete Schema.org JSON-LD graph for homepage static embedding
 */
export function generateComprehensiveHomepageSchema() {
  const serviceSchemas = Object.values(SERVICE_SEO_REGISTRY).map((meta) => meta.schemaData);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'EducationalOrganization', 'ProfessionalService'],
        '@id': `${BASE_URL}/#business`,
        'name': 'LIVINGTECH BRAND AGENCY',
        'alternateName': ['LivingTech', 'LivingTech Academy'],
        'url': BASE_URL,
        'telephone': '+2347067048471',
        'email': 'livinglsuccess@gmail.com',
        'priceRange': '₦₦',
        'founder': {
          '@type': 'Person',
          'name': 'Temitope Oluwaseun',
          'jobTitle': 'Website Designer | Graphic Designer | Digital Skills Instructor'
        },
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Abocho',
          'addressRegion': 'Kogi State',
          'addressCountry': 'NG'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'addressCountry': 'Nigeria'
        },
        'description': 'LIVINGTECH BRAND AGENCY is a digital agency and training academy providing professional Graphic Design, Computer Training, Website Design, and Application Development in Abocho, Kogi State, Nigeria.',
        'areaServed': [
          { '@type': 'AdministrativeArea', 'name': 'Abocho' },
          { '@type': 'AdministrativeArea', 'name': 'Dekina Local Government' },
          { '@type': 'State', 'name': 'Kogi State' },
          { '@type': 'Country', 'name': 'Nigeria' }
        ],
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'LivingTech Core Services and Training Programs',
          'itemListElement': Object.values(SERVICE_SEO_REGISTRY).map((meta, index) => ({
            '@type': 'OfferCatalog',
            'name': meta.title,
            'position': index + 1,
            'url': meta.canonicalUrl
          }))
        },
        'knowsAbout': [
          'Graphic Design',
          'Computer Training',
          'Website Design',
          'Application Development',
          'Digital Literacy',
          'Brand Identity',
          'Social Media Graphics',
          'School Management Portals'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        'url': BASE_URL,
        'name': 'LIVINGTECH BRAND AGENCY',
        'description': 'Official site for LivingTech Brand Agency - Graphic Design, Computer Training, and Web Solutions in Kogi State.',
        'publisher': {
          '@id': `${BASE_URL}/#business`
        }
      },
      {
        '@type': 'ItemList',
        '@id': `${BASE_URL}/#services-list`,
        'name': 'Services and Training Offerings',
        'description': 'Directory of digital services and computer training courses provided by LivingTech Brand Agency',
        'itemListElement': Object.values(SERVICE_SEO_REGISTRY).map((meta, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': meta.title,
          'item': meta.schemaData
        }))
      },
      ...serviceSchemas
    ]
  };
}

/**
 * Dynamically updates document metadata and injects service-specific JSON-LD snippet
 */
export function applyServiceSEOContext(serviceId: string | null): () => void {
  if (typeof document === 'undefined') {
    return () => {};
  }

  const defaultTitle = 'LIVINGTECH | Professional Graphic Design, Computer Training & Web Design in Kogi State';
  const defaultDesc = 'LivingTech Brand Agency delivers professional Graphic Design (logos, branding, flyers), accredited Computer Training & youth digital skills academy, custom website design, and tech solutions in Abocho, Kogi State, Nigeria.';

  const scriptId = 'livingtech-active-service-jsonld';
  let activeScript = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!serviceId || !SERVICE_SEO_REGISTRY[serviceId]) {
    // Restore defaults if no active service context
    document.title = defaultTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', defaultDesc);

    if (activeScript) {
      activeScript.remove();
    }
    return () => {};
  }

  const serviceMeta = SERVICE_SEO_REGISTRY[serviceId];

  // Update document title and description
  document.title = serviceMeta.metaTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', serviceMeta.metaDescription);
  }

  // Update or inject dynamic JSON-LD snippet for this specific context
  if (!activeScript) {
    activeScript = document.createElement('script');
    activeScript.id = scriptId;
    activeScript.type = 'application/ld+json';
    document.head.appendChild(activeScript);
  }

  // Rich breadcrumb + Service specific context
  const contextSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceMeta.schemaData,
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': BASE_URL
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Services',
            'item': `${BASE_URL}/#services`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': serviceMeta.title,
            'item': serviceMeta.canonicalUrl
          }
        ]
      }
    ]
  };

  activeScript.textContent = JSON.stringify(contextSchema, null, 2);

  // Return cleanup function
  return () => {
    document.title = defaultTitle;
    if (metaDesc) metaDesc.setAttribute('content', defaultDesc);
    const script = document.getElementById(scriptId);
    if (script) script.remove();
  };
}
