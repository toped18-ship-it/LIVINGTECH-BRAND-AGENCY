/**
 * Application Routing & Navigation Utilities
 * Provides clean multi-page URL routing and path resolution for LivingTech Brand Agency
 */

export type AppRoute =
  | 'home'
  | 'about'
  | 'services'
  | 'portfolio'
  | 'blog'
  | 'training'
  | 'process'
  | 'contact'
  | 'admin';

export interface RouteInfo {
  route: AppRoute;
  path: string;
  title: string;
  param?: string;
}

export const NAV_ITEMS: { name: string; path: string; route: AppRoute }[] = [
  { name: 'Home', path: '/', route: 'home' },
  { name: 'About', path: '/about', route: 'about' },
  { name: 'Services', path: '/services', route: 'services' },
  { name: 'Portfolio', path: '/portfolio', route: 'portfolio' },
  { name: 'Blog', path: '/blog', route: 'blog' },
  { name: 'Training', path: '/training', route: 'training' },
  { name: 'Process', path: '/process', route: 'process' },
  { name: 'Contact', path: '/contact', route: 'contact' },
];

/**
 * Normalizes any pathname or hash into a recognized AppRoute
 */
export function resolveRoute(pathname: string = '/', hash: string = '', search: string = ''): RouteInfo {
  const cleanPath = pathname.toLowerCase().trim().replace(/\/+$/, '') || '/';
  const cleanHash = hash.toLowerCase().trim().replace(/^#\/?/, '');
  const cleanSearch = search.toLowerCase().trim();

  // 1. Check for Admin paths
  if (
    cleanPath === '/admin' ||
    cleanPath.startsWith('/admin/') ||
    cleanPath === '/portal' ||
    cleanPath === '/login' ||
    cleanHash === 'admin' ||
    cleanSearch.includes('admin=1') ||
    cleanSearch.includes('admin=true')
  ) {
    return {
      route: 'admin',
      path: '/admin',
      title: 'Admin Portal | LivingTech Brand Agency',
    };
  }

  // 2. Direct pathname matching
  if (cleanPath === '/' || cleanPath === '/home') {
    // Check if hash points to a distinct page route (legacy hash compatibility)
    if (cleanHash && ['about', 'services', 'portfolio', 'blog', 'training', 'process', 'contact'].includes(cleanHash)) {
      return resolveRoute(`/${cleanHash}`);
    }
    return {
      route: 'home',
      path: '/',
      title: 'Home | LivingTech Brand Agency - Building Brands & Digital Solutions',
    };
  }

  if (cleanPath === '/about') {
    return {
      route: 'about',
      path: '/about',
      title: 'About LivingTech | Creative Tech Brand in Abocho, Kogi State',
    };
  }

  if (cleanPath === '/services' || cleanPath.startsWith('/services/')) {
    const param = cleanPath.startsWith('/services/') ? cleanPath.replace('/services/', '') : undefined;
    return {
      route: 'services',
      path: '/services',
      title: 'Services & Digital Solutions | LivingTech Brand Agency',
      param,
    };
  }

  if (cleanPath === '/portfolio' || cleanPath.startsWith('/portfolio/')) {
    const param = cleanPath.startsWith('/portfolio/') ? cleanPath.replace('/portfolio/', '') : undefined;
    return {
      route: 'portfolio',
      path: '/portfolio',
      title: 'Portfolio & Initiatives | LivingTech Brand Agency',
      param,
    };
  }

  if (cleanPath === '/blog' || cleanPath.startsWith('/blog/')) {
    const param = cleanPath.startsWith('/blog/') ? cleanPath.replace('/blog/', '') : undefined;
    return {
      route: 'blog',
      path: '/blog',
      title: 'Blog & Tech Insights | LivingTech Brand Agency',
      param,
    };
  }

  if (cleanPath === '/training' || cleanPath === '/youth-training') {
    return {
      route: 'training',
      path: '/training',
      title: 'Youth Computer Skill Acquisition Program | LivingTech Training Hub',
    };
  }

  if (cleanPath === '/process' || cleanPath === '/faq') {
    return {
      route: 'process',
      path: '/process',
      title: 'Our Working Process & FAQs | LivingTech Brand Agency',
    };
  }

  if (cleanPath === '/contact' || cleanPath === '/quote') {
    return {
      route: 'contact',
      path: '/contact',
      title: 'Contact Us & Request a Quote | LivingTech Brand Agency',
    };
  }

  // 3. Fallback to Home for unknown routes
  return {
    route: 'home',
    path: '/',
    title: 'LivingTech Brand Agency | Professional Web Design, Graphic Design & Training',
  };
}

/**
 * Updates browser history and dispatches navigation event
 */
export function navigateTo(path: string): void {
  if (typeof window === 'undefined') return;
  const targetPath = path.startsWith('/') ? path : `/${path}`;
  window.history.pushState({}, '', targetPath);
  window.dispatchEvent(new Event('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
