import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { PolicyModal } from './components/PolicyModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminStore } from './services/adminStore';
import { resolveRoute, AppRoute } from './utils/navigation';

// Dedicated Page Components
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { BlogPage } from './pages/BlogPage';
import { TrainingPage } from './pages/TrainingPage';
import { ProcessPage } from './pages/ProcessPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('home');
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>(undefined);
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | null>(null);

  // Sync route based on browser pathname, hash, or query
  const syncRoute = useCallback(() => {
    if (typeof window === 'undefined') return;

    const resolved = resolveRoute(
      window.location.pathname,
      window.location.hash,
      window.location.search
    );

    // Update browser tab document title
    if (resolved.title) {
      document.title = resolved.title;
    }

    if (resolved.route === 'admin') {
      const isAuth = AdminStore.isAuthenticated();
      setIsAdminView(isAuth);
      setIsAdminLoginOpen(false);
      setCurrentRoute('admin');
    } else {
      setIsAdminView(false);
      setIsAdminLoginOpen(false);
      setCurrentRoute(resolved.route);
    }
  }, []);

  useEffect(() => {
    syncRoute();

    const handleRouteChange = () => {
      syncRoute();
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    // Keyboard shortcut for administrator: press '/' (when not focused in form input) or Ctrl+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputFocused =
        activeEl &&
        ['input', 'textarea', 'select'].includes(activeEl.tagName.toLowerCase());

      if (
        (!isInputFocused && e.key === '/') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a')
      ) {
        e.preventDefault();
        window.history.pushState({}, '', '/admin');
        syncRoute();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [syncRoute]);

  const handleOpenQuoteModal = (serviceName?: string) => {
    setSelectedServiceForQuote(serviceName);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedServiceForQuote(undefined);
  };

  const handleLoginSuccess = () => {
    setIsAdminLoginOpen(false);
    setIsAdminView(true);
    setCurrentRoute('admin');
    if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/admin')) {
      window.history.pushState({}, '', '/admin');
    }
  };

  const handleBackToSite = () => {
    setIsAdminView(false);
    setIsAdminLoginOpen(false);
    setCurrentRoute('home');
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAdminLogout = () => {
    AdminStore.logout();
    setIsAdminView(false);
    setIsAdminLoginOpen(false);
    setCurrentRoute('home');
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Dedicated Admin Route: Render Dashboard if authenticated, else dedicated full AdminPage
  if (currentRoute === 'admin') {
    if (isAdminView || AdminStore.isAuthenticated()) {
      return (
        <AdminDashboard
          onBackToSite={handleBackToSite}
          onLogout={handleAdminLogout}
        />
      );
    }
    return (
      <AdminPage
        onLoginSuccess={handleLoginSuccess}
        onBackToSite={handleBackToSite}
      />
    );
  }

  // Render the dedicated page matching the URL route
  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'about':
        return <AboutPage onOpenQuoteModal={handleOpenQuoteModal} />;
      case 'services':
        return <ServicesPage onOpenQuoteModal={handleOpenQuoteModal} />;
      case 'portfolio':
        return <PortfolioPage onOpenQuoteModal={handleOpenQuoteModal} />;
      case 'blog':
        return <BlogPage onOpenQuoteModal={handleOpenQuoteModal} />;
      case 'training':
        return <TrainingPage />;
      case 'process':
        return <ProcessPage onOpenQuoteModal={handleOpenQuoteModal} />;
      case 'contact':
        return <ContactPage preselectedService={selectedServiceForQuote} />;
      case 'home':
      default:
        return <HomePage onOpenQuoteModal={handleOpenQuoteModal} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Navigation Header with active menu tracking */}
      <Header
        onOpenQuoteModal={handleOpenQuoteModal}
        currentRoute={currentRoute}
      />

      {/* Main Multi-Page Content Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Website Footer with Multi-Page Navigation */}
      <Footer
        onOpenPolicy={(type) => setActivePolicy(type)}
        onSelectService={(serviceName) => handleOpenQuoteModal(serviceName)}
      />

      {/* Interactive Quotation Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        initialService={selectedServiceForQuote}
      />

      {/* Policy & Terms Modal */}
      <PolicyModal type={activePolicy} onClose={() => setActivePolicy(null)} />

      {/* Admin Login Modal (Triggered when accessing /admin) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={handleBackToSite}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}
