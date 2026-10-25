import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { YouthTrainingSection } from './components/YouthTrainingSection';
import { AboutSection } from './components/AboutSection';
import { PortfolioSection } from './components/PortfolioSection';
import { BlogSection } from './components/BlogSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { PolicyModal } from './components/PolicyModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminStore } from './services/adminStore';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>(
    undefined
  );
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | null>(null);

  // Check URL pathname or hash for /admin route
  const checkAdminRoute = useCallback(() => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const query = window.location.search.toLowerCase();

    const isAdminPath =
      path === '/admin' ||
      path === '/admin/' ||
      path.startsWith('/admin') ||
      path === '/portal' ||
      path === '/login' ||
      hash === '#admin' ||
      hash === '#/admin' ||
      query.includes('admin=1') ||
      query.includes('admin=true');

    if (isAdminPath) {
      if (AdminStore.isAuthenticated()) {
        setIsAdminView(true);
        setIsAdminLoginOpen(false);
      } else {
        setIsAdminView(false);
        setIsAdminLoginOpen(true);
      }
    } else {
      setIsAdminView(false);
      setIsAdminLoginOpen(false);
    }
  }, []);

  useEffect(() => {
    checkAdminRoute();

    const handlePopState = () => {
      checkAdminRoute();
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

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
        checkAdminRoute();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [checkAdminRoute]);

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
    if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/admin')) {
      window.history.pushState({}, '', '/admin');
    }
  };

  const handleBackToSite = () => {
    setIsAdminView(false);
    setIsAdminLoginOpen(false);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
    }
  };

  const handleAdminLogout = () => {
    AdminStore.logout();
    setIsAdminView(false);
    setIsAdminLoginOpen(false);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
    }
  };

  // If in Admin Portal Mode, render full-featured Management Dashboard
  if (isAdminView) {
    return (
      <AdminDashboard
        onBackToSite={handleBackToSite}
        onLogout={handleAdminLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Navigation Header without any visible Admin button */}
      <Header onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* Services Section */}
        <ServicesSection onSelectServiceForQuote={handleOpenQuoteModal} />

        {/* Youth Computer Training & Skill Acquisition */}
        <YouthTrainingSection />

        {/* About LivingTech & Founder Profile */}
        <AboutSection onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* Portfolio & Project Showcase */}
        <PortfolioSection />

        {/* Blog & Educational Articles */}
        <BlogSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* Why Choose LivingTech */}
        <WhyChooseUs />

        {/* How the Process Works */}
        <ProcessSection />

        {/* Genuine Client Feedback & Partnership Invitation */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Contact & Request a Quotation */}
        <ContactSection preselectedService={selectedServiceForQuote} />
      </main>

      {/* Website Footer without any visible Admin link */}
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
