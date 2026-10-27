import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  MessageSquareText,
  GraduationCap,
  Layers,
  FolderGit2,
  Settings,
  LogOut,
  Globe,
  Plus,
  Trash2,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Download,
  RotateCcw,
  ExternalLink,
  Edit3,
  Search,
  Filter,
  Eye,
  Check,
  AlertTriangle,
  User,
  MapPin,
  Calendar,
  Share2,
  BookOpen,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Copy,
  Tag,
  Building,
  FileText,
  Send,
  X,
} from 'lucide-react';
import {
  AdminStore,
  EnquiryRecord,
  EnrollmentRecord,
  EnquiryStatus,
  EnrollmentStatus,
  BlogPost,
} from '../../services/adminStore';
import { BusinessConfig, ServiceItem, PortfolioItem } from '../../config/business';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import {
  SECTION_SHARE_DIRECTORY,
  getSectionShareUrl,
  getBlogShareUrl,
  getPortfolioShareUrl,
  generateSlug,
  generateWhatsAppShareUrl,
  copyToClipboard,
} from '../../utils/shareUtils';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onLogout: () => void;
}

type TabKey = 'overview' | 'blog' | 'portfolio' | 'links' | 'enquiries' | 'training' | 'services' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [config, setConfig] = useState<BusinessConfig>(AdminStore.getConfig());
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>(AdminStore.getEnquiries());
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>(AdminStore.getEnrollments());
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(AdminStore.getBlogPosts());

  // Clipboard feedback map
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Search & Filter state
  const [enquirySearch, setEnquirySearch] = useState('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>('All');
  const [enrollmentSearch, setEnrollmentSearch] = useState('');
  const [enrollmentStatusFilter, setEnrollmentStatusFilter] = useState<string>('All');

  // BLOG Post Management State
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    category: 'Graphic Design' as BlogPost['category'],
    excerpt: '',
    content: '',
    coverImage: '',
    author: config.ownerName || 'Temitope Oluwaseun',
    authorRole: 'Founder & Lead Designer',
    readTime: '4 min read',
    tags: 'Graphic Design, Branding, Tech',
    isPublished: true,
  });

  // PORTFOLIO Image & Project Management State
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    category: 'Graphic Design' as PortfolioItem['category'],
    clientName: '',
    description: '',
    technologies: 'CorelDraw, Photoshop, Vector Art',
    status: 'Completed' as PortfolioItem['status'],
    liveUrl: '',
    buttonLabel: 'View Project',
    imageUrl: '',
    completionDate: '2026',
  });
  const [imageUploadPreview, setImageUploadPreview] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);

  // New Enquiry & Enrollment modals
  const [isAddEnquiryOpen, setIsAddEnquiryOpen] = useState(false);
  const [newEnquiryData, setNewEnquiryData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    serviceRequired: config.services[0]?.name || 'Website Design and Development',
    projectDescription: '',
    notes: '',
  });

  const [isAddEnrollmentOpen, setIsAddEnrollmentOpen] = useState(false);
  const [newEnrollmentData, setNewEnrollmentData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    preferredCategory: config.youthTraining.categories[0] || 'Computer Fundamentals & Office Productivity',
    trainingFormat: config.youthTraining.trainingFormats[0] || 'In-Person (LivingTech Training Hub, Abocho)',
    additionalInfo: '',
    notes: '',
  });

  // Service Edit Modal & Image Upload State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState({
    id: '',
    name: '',
    shortDesc: '',
    fullDesc: '',
    ctaText: 'Build My Website',
    iconName: 'Globe',
    badge: '',
    imageUrl: '',
    benefits: '',
    features: '',
  });

  // Training Settings form
  const [trainingForm, setTrainingForm] = useState(config.youthTraining);
  const [trainingSavedNotice, setTrainingSavedNotice] = useState(false);

  // Agency Settings form
  const [settingsForm, setSettingsForm] = useState({
    businessName: config.businessName,
    ownerName: config.ownerName,
    ownerRole: config.ownerRole,
    phone: config.contact.phone,
    whatsappRaw: config.contact.whatsappRaw,
    email: config.contact.email,
    locationFull: config.contact.locationFull,
    founderAvatarUrl: config.founderAvatarUrl || '',
    heroBannerUrl: config.heroBannerUrl || '',
  });
  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);

  // Sync state changes from storage events
  useEffect(() => {
    const handleConfigUpdate = (e: Event) => {
      const custom = e as CustomEvent<BusinessConfig>;
      if (custom.detail) {
        setConfig(custom.detail);
        setTrainingForm(custom.detail.youthTraining);
      } else {
        const fresh = AdminStore.getConfig();
        setConfig(fresh);
        setTrainingForm(fresh.youthTraining);
      }
    };

    const handleBlogUpdate = () => {
      setBlogPosts(AdminStore.getBlogPosts());
    };

    const handleEnquiriesUpdate = () => {
      setEnquiries(AdminStore.getEnquiries());
    };

    const handleEnrollmentsUpdate = () => {
      setEnrollments(AdminStore.getEnrollments());
    };

    window.addEventListener('livingtech_config_updated', handleConfigUpdate);
    window.addEventListener('livingtech_blog_updated', handleBlogUpdate);
    window.addEventListener('livingtech_enquiries_updated', handleEnquiriesUpdate);
    window.addEventListener('livingtech_enrollments_updated', handleEnrollmentsUpdate);

    return () => {
      window.removeEventListener('livingtech_config_updated', handleConfigUpdate);
      window.removeEventListener('livingtech_blog_updated', handleBlogUpdate);
      window.removeEventListener('livingtech_enquiries_updated', handleEnquiriesUpdate);
      window.removeEventListener('livingtech_enrollments_updated', handleEnrollmentsUpdate);
    };
  }, []);

  // Helper to copy links with visual feedback
  const handleCopyLink = async (url: string, key: string, title?: string) => {
    await copyToClipboard(url, title);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // --- BLOG MANAGEMENT HANDLERS ---
  const handleOpenNewBlog = () => {
    setEditingBlogId(null);
    setBlogForm({
      title: '',
      slug: '',
      category: 'Graphic Design',
      excerpt: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
      author: config.ownerName || 'Temitope Oluwaseun',
      authorRole: 'Founder & Lead Designer',
      readTime: '4 min read',
      tags: 'Graphic Design, Branding, Kogi State',
      isPublished: true,
    });
    setIsBlogModalOpen(true);
  };

  const handleEditBlog = (post: BlogPost) => {
    setEditingBlogId(post.id);
    setBlogForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage || '',
      author: post.author,
      authorRole: post.authorRole,
      readTime: post.readTime,
      tags: post.tags ? post.tags.join(', ') : '',
      isPublished: post.isPublished,
    });
    setIsBlogModalOpen(true);
  };

  const handleBlogTitleChange = (val: string) => {
    setBlogForm((prev) => ({
      ...prev,
      title: val,
      // Auto-generate slug if not manually customized or editing
      slug: !editingBlogId ? generateSlug(val) : prev.slug,
    }));
  };

  const handleBlogImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size should be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setBlogForm((prev) => ({ ...prev, coverImage: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title.trim()) {
      alert('Please enter a blog post title.');
      return;
    }

    const cleanSlug = blogForm.slug.trim() || generateSlug(blogForm.title);
    const tagsArray = blogForm.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingBlogId) {
      const existing = blogPosts.find((p) => p.id === editingBlogId);
      if (existing) {
        AdminStore.updateBlogPost({
          ...existing,
          title: blogForm.title.trim(),
          slug: cleanSlug,
          category: blogForm.category,
          excerpt: blogForm.excerpt.trim(),
          content: blogForm.content.trim(),
          coverImage: blogForm.coverImage.trim() || undefined,
          author: blogForm.author.trim(),
          authorRole: blogForm.authorRole.trim(),
          readTime: blogForm.readTime.trim(),
          tags: tagsArray,
          isPublished: blogForm.isPublished,
        });
      }
    } else {
      AdminStore.addBlogPost({
        title: blogForm.title.trim(),
        slug: cleanSlug,
        category: blogForm.category,
        excerpt: blogForm.excerpt.trim(),
        content: blogForm.content.trim(),
        coverImage: blogForm.coverImage.trim() || undefined,
        author: blogForm.author.trim(),
        authorRole: blogForm.authorRole.trim(),
        readTime: blogForm.readTime.trim(),
        tags: tagsArray,
        isPublished: blogForm.isPublished,
      });
    }

    setBlogPosts(AdminStore.getBlogPosts());
    setIsBlogModalOpen(false);
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      AdminStore.deleteBlogPost(id);
      setBlogPosts(AdminStore.getBlogPosts());
    }
  };

  const handleTogglePublishBlog = (post: BlogPost) => {
    AdminStore.updateBlogPost({
      ...post,
      isPublished: !post.isPublished,
    });
    setBlogPosts(AdminStore.getBlogPosts());
  };

  // --- PORTFOLIO IMAGE UPLOADER & ITEM HANDLERS ---
  const handleOpenNewPortfolio = () => {
    setEditingPortfolioId(null);
    setPortfolioForm({
      title: '',
      category: 'Graphic Design',
      clientName: '',
      description: '',
      technologies: 'Visual Identity, Flyer Design, Print',
      status: 'Completed',
      liveUrl: '',
      buttonLabel: 'View Project',
      imageUrl: '',
      completionDate: '2026',
    });
    setImageUploadPreview(null);
    setImageFileName(null);
    setIsPortfolioModalOpen(true);
  };

  const handleEditPortfolio = (item: PortfolioItem) => {
    setEditingPortfolioId(item.id);
    setPortfolioForm({
      title: item.title,
      category: item.category,
      clientName: item.clientName || '',
      description: item.description,
      technologies: item.technologies ? item.technologies.join(', ') : '',
      status: item.status,
      liveUrl: item.liveUrl || '',
      buttonLabel: item.buttonLabel || 'View Project',
      imageUrl: item.imageUrl || '',
      completionDate: item.completionDate || '2026',
    });
    setImageUploadPreview(item.imageUrl || null);
    setImageFileName(item.imageUrl ? 'Active Image' : null);
    setIsPortfolioModalOpen(true);
  };

  const handlePortfolioImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image smaller than 5MB.');
      return;
    }

    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImageUploadPreview(result);
      setPortfolioForm((prev) => ({ ...prev, imageUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioForm.title.trim()) {
      alert('Please enter a project title.');
      return;
    }

    const techArray = portfolioForm.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const targetId = editingPortfolioId || `project-${Date.now()}`;
    const itemData: PortfolioItem = {
      id: targetId,
      title: portfolioForm.title.trim(),
      category: portfolioForm.category,
      clientName: portfolioForm.clientName.trim() || undefined,
      description: portfolioForm.description.trim(),
      technologies: techArray,
      status: portfolioForm.status,
      liveUrl: portfolioForm.liveUrl.trim() || undefined,
      buttonLabel: portfolioForm.buttonLabel.trim() || undefined,
      imageUrl: portfolioForm.imageUrl.trim() || undefined,
      completionDate: portfolioForm.completionDate.trim() || '2026',
      isPlaceholder: false,
    };

    if (editingPortfolioId) {
      const updated = AdminStore.updatePortfolioItem(itemData);
      setConfig(updated);
    } else {
      const updated = AdminStore.addPortfolioItem(itemData);
      setConfig(updated);
    }

    setIsPortfolioModalOpen(false);
  };

  const handleDeletePortfolio = (id: string) => {
    if (window.confirm('Are you sure you want to delete this portfolio project?')) {
      const updated = AdminStore.deletePortfolioItem(id);
      setConfig(updated);
    }
  };

  // --- ENQUIRIES & ENROLLMENT HANDLERS ---
  const handleUpdateEnquiryStatus = (id: string, status: EnquiryStatus) => {
    AdminStore.updateEnquiryStatus(id, status);
    setEnquiries(AdminStore.getEnquiries());
  };

  const handleDeleteEnquiry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this enquiry record?')) {
      AdminStore.deleteEnquiry(id);
      setEnquiries(AdminStore.getEnquiries());
    }
  };

  const handleCreateEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEnquiryData.fullName || !newEnquiryData.phoneNumber) {
      alert('Please provide client name and phone number.');
      return;
    }
    AdminStore.addEnquiry({
      fullName: newEnquiryData.fullName,
      phoneNumber: newEnquiryData.phoneNumber,
      email: newEnquiryData.email || undefined,
      serviceRequired: newEnquiryData.serviceRequired,
      projectDescription: newEnquiryData.projectDescription || 'Client enquiry registered via Admin Portal.',
      notes: newEnquiryData.notes,
    });
    setEnquiries(AdminStore.getEnquiries());
    setIsAddEnquiryOpen(false);
    setNewEnquiryData({
      fullName: '',
      phoneNumber: '',
      email: '',
      serviceRequired: config.services[0]?.name || 'Website Design and Development',
      projectDescription: '',
      notes: '',
    });
  };

  const handleUpdateEnrollmentStatus = (id: string, status: EnrollmentStatus) => {
    AdminStore.updateEnrollmentStatus(id, status);
    setEnrollments(AdminStore.getEnrollments());
  };

  const handleDeleteEnrollment = (id: string) => {
    if (window.confirm('Delete this registration?')) {
      AdminStore.deleteEnrollment(id);
      setEnrollments(AdminStore.getEnrollments());
    }
  };

  const handleCreateEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEnrollmentData.fullName || !newEnrollmentData.phoneNumber) {
      alert('Please provide student name and phone number.');
      return;
    }
    AdminStore.addEnrollment({
      fullName: newEnrollmentData.fullName,
      phoneNumber: newEnrollmentData.phoneNumber,
      email: newEnrollmentData.email || undefined,
      preferredCategory: newEnrollmentData.preferredCategory,
      trainingFormat: newEnrollmentData.trainingFormat,
      additionalInfo: newEnrollmentData.additionalInfo,
      notes: newEnrollmentData.notes,
    });
    setEnrollments(AdminStore.getEnrollments());
    setIsAddEnrollmentOpen(false);
    setNewEnrollmentData({
      fullName: '',
      phoneNumber: '',
      email: '',
      preferredCategory: config.youthTraining.categories[0] || '',
      trainingFormat: config.youthTraining.trainingFormats[0] || '',
      additionalInfo: '',
      notes: '',
    });
  };

  // --- SERVICE MANAGEMENT HANDLERS ---
  const handleOpenEditService = (svc: ServiceItem) => {
    setEditingServiceId(svc.id);
    setServiceForm({
      id: svc.id,
      name: svc.name,
      shortDesc: svc.shortDesc,
      fullDesc: svc.fullDesc,
      ctaText: svc.ctaText,
      iconName: svc.iconName,
      badge: svc.badge || '',
      imageUrl: svc.imageUrl || '',
      benefits: svc.benefits ? svc.benefits.join(', ') : '',
      features: svc.features ? svc.features.join(', ') : '',
    });
    setIsServiceModalOpen(true);
  };

  const handleServiceImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image file under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setServiceForm((prev) => ({ ...prev, imageUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.name.trim()) {
      alert('Service name is required.');
      return;
    }

    const benefitsArr = serviceForm.benefits
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean);

    const featuresArr = serviceForm.features
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    const targetId = editingServiceId || `service-${Date.now()}`;
    const updatedServiceItem: ServiceItem = {
      id: targetId,
      name: serviceForm.name.trim(),
      shortDesc: serviceForm.shortDesc.trim(),
      fullDesc: serviceForm.fullDesc.trim(),
      ctaText: serviceForm.ctaText.trim(),
      iconName: serviceForm.iconName,
      badge: serviceForm.badge.trim() || undefined,
      imageUrl: serviceForm.imageUrl.trim() || undefined,
      benefits: benefitsArr.length ? benefitsArr : ['Custom digital solutions', 'Fast delivery'],
      features: featuresArr.length ? featuresArr : ['Dedicated support'],
    };

    const updated = AdminStore.updateService(updatedServiceItem);
    setConfig(updated);
    setIsServiceModalOpen(false);
  };

  // --- TRAINING FLYER IMAGE HANDLER ---
  const handleTrainingImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Flyer image size should be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setTrainingForm((prev) => ({ ...prev, imageUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  // --- AGENCY SETTINGS IMAGE HANDLERS ---
  const handleFounderAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Avatar image size should be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setSettingsForm((prev) => ({ ...prev, founderAvatarUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleHeroBannerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Hero banner image size should be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setSettingsForm((prev) => ({ ...prev, heroBannerUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  // --- SETTINGS HANDLERS ---
  const handleSaveTrainingConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = AdminStore.updateTraining(trainingForm);
    setConfig(updated);
    setTrainingSavedNotice(true);
    setTimeout(() => setTrainingSavedNotice(false), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: BusinessConfig = {
      ...config,
      businessName: settingsForm.businessName,
      ownerName: settingsForm.ownerName,
      ownerRole: settingsForm.ownerRole,
      founderAvatarUrl: settingsForm.founderAvatarUrl.trim() || undefined,
      heroBannerUrl: settingsForm.heroBannerUrl.trim() || undefined,
      contact: {
        ...config.contact,
        phone: settingsForm.phone,
        phoneFormatted: settingsForm.phone.startsWith('+')
          ? settingsForm.phone
          : `+234 ${settingsForm.phone.slice(1, 4)} ${settingsForm.phone.slice(4, 7)} ${settingsForm.phone.slice(7)}`,
        whatsappRaw: settingsForm.whatsappRaw,
        whatsappInternational: settingsForm.whatsappRaw.replace(/[^0-9]/g, '').startsWith('0')
          ? `234${settingsForm.whatsappRaw.replace(/[^0-9]/g, '').slice(1)}`
          : settingsForm.whatsappRaw.replace(/[^0-9]/g, ''),
        email: settingsForm.email,
        locationFull: settingsForm.locationFull,
      },
    };
    AdminStore.saveConfig(updated);
    setConfig(updated);
    setSettingsSavedNotice(true);
    setTimeout(() => setSettingsSavedNotice(false), 3000);
  };

  const handleExportData = () => {
    const jsonStr = AdminStore.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `livingtech-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all website settings, articles, and data back to defaults?')) {
      AdminStore.resetToDefaults();
      const fresh = AdminStore.getConfig();
      setConfig(fresh);
      setTrainingForm(fresh.youthTraining);
      setEnquiries(AdminStore.getEnquiries());
      setEnrollments(AdminStore.getEnrollments());
      setBlogPosts(AdminStore.getBlogPosts());
      alert('Reset completed successfully.');
    }
  };

  // Filtered lists
  const filteredEnquiries = enquiries.filter((item) => {
    const matchSearch =
      item.fullName.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      item.phoneNumber.includes(enquirySearch) ||
      item.serviceRequired.toLowerCase().includes(enquirySearch.toLowerCase());
    const matchStatus = enquiryStatusFilter === 'All' || item.status === enquiryStatusFilter;
    return matchSearch && matchStatus;
  });

  const filteredEnrollments = enrollments.filter((item) => {
    const matchSearch =
      item.fullName.toLowerCase().includes(enrollmentSearch.toLowerCase()) ||
      item.phoneNumber.includes(enrollmentSearch) ||
      item.preferredCategory.toLowerCase().includes(enrollmentSearch.toLowerCase());
    const matchStatus = enrollmentStatusFilter === 'All' || item.status === enrollmentStatusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white font-black text-base shadow-md shadow-cyan-500/20">
            LT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-white tracking-wide uppercase font-mono">
                LIVINGTECH ADMIN PORTAL
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded-full">
                MASTER CONTROL
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Admin: <strong className="text-slate-200">{config.ownerName}</strong> &bull; Abocho, Kogi State
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onBackToSite}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            title="Switch to public customer website view"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">View Live Website</span>
          </button>

          <button
            type="button"
            onClick={handleExportData}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            title="Download full database backup"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Backup</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/80 text-xs font-semibold transition-colors cursor-pointer"
            title="Sign out of Admin Session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Navigation Bar */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-800 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </button>

          {/* BLOG POSTS TAB */}
          <button
            type="button"
            onClick={() => setActiveTab('blog')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'blog'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Blog & Articles</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950 text-cyan-300 border border-slate-700">
              {blogPosts.length}
            </span>
          </button>

          {/* PORTFOLIO & IMAGES TAB */}
          <button
            type="button"
            onClick={() => setActiveTab('portfolio')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'portfolio'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Portfolio & Images</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950 text-cyan-300 border border-slate-700">
              {config.portfolio.length}
            </span>
          </button>

          {/* SHAREABLE LINKS DIRECTORY TAB */}
          <button
            type="button"
            onClick={() => setActiveTab('links')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'links'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>Shareable Links Hub</span>
          </button>

          {/* ENQUIRIES TAB */}
          <button
            type="button"
            onClick={() => setActiveTab('enquiries')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'enquiries'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <MessageSquareText className="w-4 h-4" />
            <span>Quotes & Enquiries</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950 text-cyan-300 border border-slate-700">
              {enquiries.length}
            </span>
          </button>

          {/* TRAINING TAB */}
          <button
            type="button"
            onClick={() => setActiveTab('training')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'training'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Youth Skills Training</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950 text-emerald-300 border border-slate-700">
              {enrollments.length}
            </span>
          </button>

          {/* SERVICES TAB */}
          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Services (8)</span>
          </button>

          {/* SETTINGS TAB */}
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Agency Settings</span>
          </button>
        </div>

        {/* ===================== TAB 1: OVERVIEW ===================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Project Enquiries</span>
                  <MessageSquareText className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">{enquiries.length}</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <span className="text-cyan-400 font-semibold">
                    {enquiries.filter((e) => e.status === 'New').length} New
                  </span>{' '}
                  pending response
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Youth Trainees</span>
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">{enrollments.length}</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <span className="text-emerald-400 font-semibold">
                    {enrollments.filter((e) => e.status === 'Confirmed / Paid').length} Confirmed
                  </span>{' '}
                  students
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Blog Articles</span>
                  <BookOpen className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">{blogPosts.length}</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <span className="text-cyan-400 font-semibold">
                    {blogPosts.filter((b) => b.isPublished).length} Published
                  </span>{' '}
                  live online
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Portfolio Items</span>
                  <FolderGit2 className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">{config.portfolio.length}</div>
                <div className="text-xs text-slate-400 mt-1">
                  Visual designs, EdTech & code projects
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span>Admin Shortcuts & Quick Actions</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Create new blog articles, upload client designs, or copy links with direct share targets.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleOpenNewBlog}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write Blog Article</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenNewPortfolio}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Portfolio Image</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('links')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all cursor-pointer"
                >
                  <LinkIcon className="w-4 h-4 text-cyan-400" />
                  <span>Share Links Hub</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: BLOG & ARTICLES ===================== */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Blog & Articles Management</h3>
                <p className="text-xs text-slate-400">
                  Create, edit, publish, and share blog articles across social media and WhatsApp.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenNewBlog}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Blog Post</span>
              </button>
            </div>

            {/* Blog Posts Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => {
                const shareUrl = getBlogShareUrl(post.slug);
                const isCopied = copiedKey === `blog-${post.id}`;
                const whatsappUrl = generateWhatsAppShareUrl(
                  shareUrl,
                  `Read "${post.title}" by LivingTech Brand Agency:`
                );

                return (
                  <div
                    key={post.id}
                    className="flex flex-col justify-between rounded-2xl bg-slate-900 border border-slate-800 p-5 overflow-hidden hover:border-slate-700 transition-all"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-40 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-4">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs">
                            No Cover Image
                          </div>
                        )}
                        <span
                          className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            post.isPublished
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                              : 'bg-amber-950 text-amber-300 border-amber-800'
                          }`}
                        >
                          {post.isPublished ? 'Published' : 'Draft'}
                        </span>
                        <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-slate-800">
                          {post.category}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white line-clamp-2 leading-snug">
                        {post.title}
                      </h4>
                      <div className="text-[11px] font-mono text-slate-500 mt-1">
                        Slug: /{post.slug}
                      </div>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{post.readTime}</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleCopyLink(shareUrl, `blog-${post.id}`, post.title)}
                          className={`flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                            isCopied
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                              : 'bg-slate-800 text-slate-200 hover:text-white border-slate-700'
                          }`}
                          title="Copy direct shareable link"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied ? 'Copied' : 'Share Link'}</span>
                        </button>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800 hover:bg-emerald-900/60 transition-colors"
                          title="Share to WhatsApp"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </a>

                        <button
                          type="button"
                          onClick={() => handleTogglePublishBlog(post)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700"
                          title="Toggle Published / Draft"
                        >
                          {post.isPublished ? 'Unpublish' : 'Publish'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEditBlog(post)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700"
                          title="Edit Post"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteBlog(post.id)}
                          className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-400 hover:bg-rose-900/60"
                          title="Delete Post"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: PORTFOLIO & IMAGES ===================== */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Portfolio Image Uploader & Project Manager</h3>
                <p className="text-xs text-slate-400">
                  Upload project images, showcase branding and web developments, and generate shareable links.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenNewPortfolio}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer self-start sm:self-auto"
              >
                <Upload className="w-4 h-4" />
                <span>Upload New Project Image</span>
              </button>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {config.portfolio.map((item) => {
                const shareUrl = getPortfolioShareUrl(item.id);
                const isCopied = copiedKey === `portfolio-${item.id}`;
                const whatsappUrl = generateWhatsAppShareUrl(
                  shareUrl,
                  `Check out "${item.title}" by LivingTech Brand Agency:`
                );

                return (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between rounded-2xl bg-slate-900 border border-slate-800 p-5 overflow-hidden hover:border-slate-700 transition-all"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative h-44 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-4">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-slate-500 font-mono text-xs">
                            <ImageIcon className="w-8 h-8 text-slate-600 mb-1" />
                            <span>No Image Uploaded</span>
                          </div>
                        )}
                        <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-slate-800">
                          {item.category}
                        </span>
                        <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 text-slate-300 border border-slate-800">
                          {item.status}
                        </span>
                      </div>

                      {item.clientName && (
                        <div className="text-[11px] text-cyan-400 font-semibold mb-1 flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          <span>{item.clientName}</span>
                        </div>
                      )}

                      <h4 className="text-base font-bold text-white line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                        {item.description}
                      </p>

                      {item.technologies && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {item.technologies.slice(0, 3).map((t, idx) => (
                            <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyLink(shareUrl, `portfolio-${item.id}`, item.title)}
                        className={`flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                          isCopied
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : 'bg-slate-800 text-slate-200 hover:text-white border-slate-700'
                        }`}
                        title="Copy direct shareable project link"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Copied' : 'Share Link'}</span>
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800 hover:bg-emerald-900/60 transition-colors"
                        title="Share to WhatsApp"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={() => handleEditPortfolio(item)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700"
                        title="Edit Project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeletePortfolio(item.id)}
                        className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-400 hover:bg-rose-900/60"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== TAB 4: SHAREABLE LINKS HUB ===================== */}
        {activeTab === 'links' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Central Shareable Links Directory</h3>
              <p className="text-xs text-slate-400">
                Every section of the website has a dedicated canonical URL. Copy individual links or share them directly on WhatsApp.
              </p>
            </div>

            {/* Core Section Links */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                Website Sections & Service Pages
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SECTION_SHARE_DIRECTORY.map((sec) => {
                  const fullUrl = getSectionShareUrl(sec.hash);
                  const isCopied = copiedKey === `sec-${sec.id}`;
                  const whatsappUrl = generateWhatsAppShareUrl(fullUrl, `Visit ${sec.name} on LivingTech Brand Agency:`);

                  return (
                    <div
                      key={sec.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold text-white">{sec.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-400 font-mono">
                            {sec.hash}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mb-3">{sec.description}</p>
                        <div className="text-[11px] font-mono text-slate-500 break-all bg-slate-900 p-1.5 rounded border border-slate-800">
                          {fullUrl}
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyLink(fullUrl, `sec-${sec.id}`, sec.name)}
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            isCopied
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                              : 'bg-slate-800 text-slate-200 hover:text-white border-slate-700'
                          }`}
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                          <span>{isCopied ? 'Link Copied!' : 'Copy Link'}</span>
                        </button>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-400 hover:bg-emerald-900 text-xs font-semibold"
                          title="Share to WhatsApp"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={sec.hash}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
                          title="Preview section"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Blog Article Links */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400">
                Individual Blog Article Links ({blogPosts.length})
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blogPosts.map((post) => {
                  const postUrl = getBlogShareUrl(post.slug);
                  const isCopied = copiedKey === `link-blog-${post.id}`;
                  const whatsappUrl = generateWhatsAppShareUrl(postUrl, `Read "${post.title}" on LivingTech:`);

                  return (
                    <div key={post.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-white mb-1 line-clamp-1">{post.title}</div>
                        <div className="text-[11px] font-mono text-cyan-400 mb-2">#{post.category} &bull; /{post.slug}</div>
                        <div className="text-[11px] font-mono text-slate-500 break-all bg-slate-900 p-1.5 rounded border border-slate-800">
                          {postUrl}
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyLink(postUrl, `link-blog-${post.id}`, post.title)}
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            isCopied
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                              : 'bg-slate-800 text-slate-200 hover:text-white border-slate-700'
                          }`}
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                          <span>{isCopied ? 'Copied!' : 'Copy Article Link'}</span>
                        </button>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-semibold flex items-center gap-1"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Portfolio Project Links */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-purple-400">
                Individual Portfolio Project Links ({config.portfolio.length})
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.portfolio.map((item) => {
                  const itemUrl = getPortfolioShareUrl(item.id);
                  const isCopied = copiedKey === `link-port-${item.id}`;
                  const whatsappUrl = generateWhatsAppShareUrl(itemUrl, `Explore "${item.title}" on LivingTech:`);

                  return (
                    <div key={item.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-white mb-1">{item.title}</div>
                        <div className="text-[11px] font-mono text-cyan-400 mb-2">#{item.category}</div>
                        <div className="text-[11px] font-mono text-slate-500 break-all bg-slate-900 p-1.5 rounded border border-slate-800">
                          {itemUrl}
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyLink(itemUrl, `link-port-${item.id}`, item.title)}
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            isCopied
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                              : 'bg-slate-800 text-slate-200 hover:text-white border-slate-700'
                          }`}
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                          <span>{isCopied ? 'Copied!' : 'Copy Project Link'}</span>
                        </button>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-semibold flex items-center gap-1"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 5: QUOTES & ENQUIRIES ===================== */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Quotations & Project Enquiries ({enquiries.length})</h3>
                <p className="text-xs text-slate-400">
                  Customer quotation requests submitted through the public website or registered manually.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddEnquiryOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Register Enquiry Manually</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, phone, or service..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  className="bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none w-full sm:w-64"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs">
                <span className="text-slate-400">Status:</span>
                <select
                  value={enquiryStatusFilter}
                  onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-slate-200"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="In Discussion">In Discussion</option>
                  <option value="Quotation Sent">Quotation Sent</option>
                  <option value="Completed">Completed</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-mono tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Client Name</th>
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-4">Service Required</th>
                      <th className="py-3.5 px-4">Date & Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredEnquiries.map((enq) => {
                      const whatsappMsg = buildWhatsAppUrl(
                        `Hello ${enq.fullName}, this is LivingTech Brand Agency regarding your inquiry for ${enq.serviceRequired}. We are reviewing your project requirements.`,
                        enq.phoneNumber
                      );

                      return (
                        <tr key={enq.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                            <div>{enq.fullName}</div>
                            {enq.notes && (
                              <div className="text-[11px] text-cyan-400/90 font-normal italic mt-0.5">
                                Note: {enq.notes}
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-cyan-300 whitespace-nowrap">
                            <div>{enq.phoneNumber}</div>
                            {enq.email && (
                              <div className="text-[11px] text-slate-500">{enq.email}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-slate-300">
                            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-medium">
                              {enq.serviceRequired}
                            </span>
                            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                              {enq.projectDescription}
                            </p>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="text-[11px] text-slate-500 mb-1">
                              {new Date(enq.submittedAt).toLocaleDateString()}
                            </div>
                            <select
                              value={enq.status}
                              onChange={(e) =>
                                handleUpdateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)
                              }
                              className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none"
                            >
                              <option value="New">New</option>
                              <option value="In Discussion">In Discussion</option>
                              <option value="Quotation Sent">Quotation Sent</option>
                              <option value="Completed">Completed</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={whatsappMsg}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-400 hover:bg-emerald-900"
                                title="WhatsApp Client"
                              >
                                <MessageSquareText className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`tel:${enq.phoneNumber}`}
                                className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
                                title="Call Client"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <button
                                type="button"
                                onClick={() => handleDeleteEnquiry(enq.id)}
                                className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-400 hover:bg-rose-900/60"
                                title="Remove enquiry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 6: YOUTH TRAINING ===================== */}
        {activeTab === 'training' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Youth Skill Acquisition Program Settings</h3>
                  <p className="text-xs text-slate-400">Configure dates, fee, and availability for the 3-Day Cohort.</p>
                </div>

                {trainingSavedNotice && (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Saved Successfully!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveTrainingConfig} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Registration Status</label>
                    <button
                      type="button"
                      onClick={() => setTrainingForm({ ...trainingForm, isAvailable: !trainingForm.isAvailable })}
                      className={`w-full py-2 px-3 rounded-xl font-bold text-xs border border-slate-700 ${
                        trainingForm.isAvailable ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {trainingForm.isAvailable ? 'Registration Open' : 'Registration Closed'}
                    </button>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Fee ({trainingForm.currencySymbol})</label>
                    <input
                      type="number"
                      value={trainingForm.advertisedPrice}
                      onChange={(e) => setTrainingForm({ ...trainingForm, advertisedPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Duration</label>
                    <input
                      type="text"
                      value={trainingForm.duration}
                      onChange={(e) => setTrainingForm({ ...trainingForm, duration: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Cohort Dates</label>
                    <input
                      type="text"
                      value={trainingForm.dates}
                      onChange={(e) => setTrainingForm({ ...trainingForm, dates: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={trainingForm.location}
                      onChange={(e) => setTrainingForm({ ...trainingForm, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                </div>

                {/* Training Program Promotional Flyer Image Uploader */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <label className="font-semibold text-slate-200 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    <span>Promotional Flyer / Banner Image for Youth Training</span>
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Flyer Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleTrainingImageFile}
                        className="hidden"
                      />
                    </label>

                    <span className="text-slate-500 text-xs">or paste image URL:</span>

                    <input
                      type="text"
                      value={trainingForm.imageUrl || ''}
                      onChange={(e) => setTrainingForm({ ...trainingForm, imageUrl: e.target.value })}
                      placeholder="https://..."
                      className="flex-1 w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>

                  {trainingForm.imageUrl && (
                    <div className="relative h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 mt-2">
                      <img
                        src={trainingForm.imageUrl}
                        alt="Training Flyer Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setTrainingForm({ ...trainingForm, imageUrl: '' })}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/80 text-rose-400 hover:text-white"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Save Program Settings
                  </button>
                </div>
              </form>
            </div>

            {/* Enrolled Students Table */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Enrolled Youths & Learners ({enrollments.length})</h3>
                  <p className="text-xs text-slate-400">
                    Students registered for the digital skills program.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddEnrollmentOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Student Manually</span>
                </button>
              </div>

              <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-mono tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Student Name</th>
                        <th className="py-3.5 px-4">Contact</th>
                        <th className="py-3.5 px-4">Training Track</th>
                        <th className="py-3.5 px-4">Format</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredEnrollments.map((enr) => {
                        const whatsappMsg = buildWhatsAppUrl(
                          `Hello ${enr.fullName}, this is LivingTech Brand Agency regarding your registration for the 3-Day Youth Skill Acquisition Program.`,
                          enr.phoneNumber
                        );

                        return (
                          <tr key={enr.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                              {enr.fullName}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-cyan-300 whitespace-nowrap">
                              <div>{enr.phoneNumber}</div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              {enr.preferredCategory}
                            </td>
                            <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                              {enr.trainingFormat}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <select
                                value={enr.status}
                                onChange={(e) =>
                                  handleUpdateEnrollmentStatus(enr.id, e.target.value as EnrollmentStatus)
                                }
                                className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none"
                              >
                                <option value="Registered">Registered</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Confirmed / Paid">Confirmed / Paid</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={whatsappMsg}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-400 hover:bg-emerald-900"
                                >
                                  <MessageSquareText className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteEnrollment(enr.id)}
                                  className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-400 hover:bg-rose-900/60"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 7: SERVICES ===================== */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Services Directory (8 Core Solutions)</h3>
                <p className="text-xs text-slate-400">
                  Upload cover images and update service details displayed on the public Services section.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.services.map((svc) => (
                <div key={svc.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Cover Image Thumbnail */}
                    <div className="relative h-36 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-3">
                      {svc.imageUrl ? (
                        <img
                          src={svc.imageUrl}
                          alt={svc.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs">
                          No Service Cover Image
                        </div>
                      )}
                      <span className="absolute top-2 left-2 text-[10px] font-mono text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 uppercase font-semibold">
                        {svc.id}
                      </span>
                      {svc.badge && (
                        <span className="absolute top-2 right-2 text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full">
                          {svc.badge}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-white mb-1">{svc.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">{svc.shortDesc}</p>

                    {svc.benefits && svc.benefits.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {svc.benefits.map((b, i) => (
                          <span key={i} className="text-[10px] bg-slate-950 text-slate-300 border border-slate-800 px-2 py-0.5 rounded">
                            ✓ {b}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      CTA: {svc.ctaText}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenEditService(svc)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md transition-all cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Service & Image</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 8: AGENCY SETTINGS ===================== */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Agency Profile & Settings</h3>
                  <p className="text-xs text-slate-400">Centralized contact configuration updated across the website.</p>
                </div>

                {settingsSavedNotice && (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Updated!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={settingsForm.businessName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, businessName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Founder / Owner Name</label>
                    <input
                      type="text"
                      value={settingsForm.ownerName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, ownerName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Owner Designation</label>
                    <input
                      type="text"
                      value={settingsForm.ownerRole}
                      onChange={(e) => setSettingsForm({ ...settingsForm, ownerRole: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Phone Number (Call)</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      value={settingsForm.whatsappRaw}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappRaw: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Official Email Address</label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Physical Address / Hub Location</label>
                  <input
                    type="text"
                    value={settingsForm.locationFull}
                    onChange={(e) => setSettingsForm({ ...settingsForm, locationFull: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                {/* Founder Profile Picture / Avatar Uploader */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="font-semibold text-slate-200 flex items-center gap-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span>Founder Profile Avatar Image ({settingsForm.ownerName})</span>
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Avatar</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFounderAvatarFile}
                        className="hidden"
                      />
                    </label>

                    <input
                      type="text"
                      value={settingsForm.founderAvatarUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, founderAvatarUrl: e.target.value })}
                      placeholder="Avatar image URL..."
                      className="flex-1 w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>

                  {settingsForm.founderAvatarUrl && (
                    <div className="flex items-center gap-3 pt-1">
                      <img
                        src={settingsForm.founderAvatarUrl}
                        alt="Founder Avatar Preview"
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                      />
                      <button
                        type="button"
                        onClick={() => setSettingsForm({ ...settingsForm, founderAvatarUrl: '' })}
                        className="text-[11px] text-rose-400 hover:underline"
                      >
                        Remove Avatar
                      </button>
                    </div>
                  )}
                </div>

                {/* Hero Showcase Banner Image Uploader */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="font-semibold text-slate-200 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-blue-400" />
                    <span>Hero Section Showcase Banner Image</span>
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Hero Banner</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeroBannerFile}
                        className="hidden"
                      />
                    </label>

                    <input
                      type="text"
                      value={settingsForm.heroBannerUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroBannerUrl: e.target.value })}
                      placeholder="Banner image URL..."
                      className="flex-1 w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>

                  {settingsForm.heroBannerUrl && (
                    <div className="relative h-28 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 pt-1">
                      <img
                        src={settingsForm.heroBannerUrl}
                        alt="Hero Banner Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setSettingsForm({ ...settingsForm, heroBannerUrl: '' })}
                        className="absolute top-1 right-1 p-1 rounded bg-black/80 text-rose-400 hover:text-white"
                        title="Remove Hero Banner"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Defaults</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* ===================== MODAL: CREATE / EDIT BLOG POST ===================== */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8 bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <h4 className="text-lg font-bold text-white">
                  {editingBlogId ? 'Edit Blog Article' : 'Create New Blog Post'}
                </h4>
                <p className="text-xs text-slate-400">
                  Write and publish an article with shareable link and featured cover.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsBlogModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs overflow-y-auto pr-1">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => handleBlogTitleChange(e.target.value)}
                  placeholder="e.g., Why Graphic Design Drives Business Growth in Kogi State"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: generateSlug(e.target.value) })}
                    placeholder="why-graphic-design-drives-growth"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-mono"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Link: /#blog/{blogForm.slug || 'slug'}
                  </span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value as BlogPost['category'] })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  >
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Computer Training">Computer Training</option>
                    <option value="Website Design">Website Design</option>
                    <option value="Digital Skills">Digital Skills</option>
                    <option value="Tech Insights">Tech Insights</option>
                    <option value="Community Impact">Community Impact</option>
                  </select>
                </div>
              </div>

              {/* Cover Image Upload & URL */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <label className="block font-semibold text-slate-300">Featured Cover Image</label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Upload Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBlogImageUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-slate-500 text-[11px]">or image URL:</span>
                  <input
                    type="text"
                    value={blogForm.coverImage}
                    onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-[11px]"
                  />
                </div>

                {blogForm.coverImage && (
                  <div className="h-28 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 relative mt-2">
                    <img
                      src={blogForm.coverImage}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setBlogForm({ ...blogForm, coverImage: '' })}
                      className="absolute top-1 right-1 p-1 rounded bg-black/70 text-slate-300 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Short Summary / Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="A concise 1-2 sentence overview of the article..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Article Body Content *</label>
                <textarea
                  rows={8}
                  required
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Write full article here. Use paragraph breaks and markdown headings (### Heading) for clean reading."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    placeholder="e.g., 4 min read"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Publication Status</label>
                  <select
                    value={blogForm.isPublished ? 'published' : 'draft'}
                    onChange={(e) => setBlogForm({ ...blogForm, isPublished: e.target.value === 'published' })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  >
                    <option value="published">Published (Live Online)</option>
                    <option value="draft">Draft (Saved in Admin)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md cursor-pointer"
                >
                  {editingBlogId ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: UPLOAD / EDIT PORTFOLIO ITEM ===================== */}
      {isPortfolioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8 bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <h4 className="text-lg font-bold text-white">
                  {editingPortfolioId ? 'Edit Portfolio Project' : 'Upload Portfolio Project & Image'}
                </h4>
                <p className="text-xs text-slate-400">
                  Add designs, live portals, client works with instant image preview and share link.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPortfolioModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePortfolio} className="space-y-4 text-xs overflow-y-auto pr-1">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={portfolioForm.title}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                  placeholder="e.g., Regional Youth Conference Brand Identity"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={portfolioForm.category}
                    onChange={(e) =>
                      setPortfolioForm({ ...portfolioForm, category: e.target.value as PortfolioItem['category'] })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  >
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Website Design">Website Design</option>
                    <option value="Application Development">Application Development</option>
                    <option value="Branding">Branding</option>
                    <option value="Educational Technology">Educational Technology</option>
                    <option value="Digital Projects">Digital Projects</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Client or Organization</label>
                  <input
                    type="text"
                    value={portfolioForm.clientName}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, clientName: e.target.value })}
                    placeholder="e.g., Grace Assembly Church, Abocho"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
              </div>

              {/* IMAGE UPLOAD ZONE */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-cyan-400" />
                    <span>Upload Portfolio Image File</span>
                  </label>
                  {imageFileName && (
                    <span className="text-[11px] text-emerald-400 font-mono">
                      ✓ {imageFileName}
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Select Image from Computer</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePortfolioImageFile}
                      className="hidden"
                    />
                  </label>

                  <span className="text-slate-500 text-xs">or paste image URL:</span>

                  <input
                    type="text"
                    value={portfolioForm.imageUrl}
                    onChange={(e) => {
                      setPortfolioForm({ ...portfolioForm, imageUrl: e.target.value });
                      setImageUploadPreview(e.target.value);
                    }}
                    placeholder="https://..."
                    className="flex-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>

                {imageUploadPreview && (
                  <div className="relative h-44 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mt-2">
                    <img
                      src={imageUploadPreview}
                      alt="Uploaded preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageUploadPreview(null);
                        setImageFileName(null);
                        setPortfolioForm({ ...portfolioForm, imageUrl: '' });
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/80 text-rose-400 hover:text-white"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Project Description *</label>
                <textarea
                  rows={3}
                  required
                  value={portfolioForm.description}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                  placeholder="Detail the scope of work, creative objectives, and business value delivered..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={portfolioForm.status}
                    onChange={(e) =>
                      setPortfolioForm({ ...portfolioForm, status: e.target.value as PortfolioItem['status'] })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Active Project">Active Project</option>
                    <option value="Educational Initiative">Educational Initiative</option>
                    <option value="In Development">In Development</option>
                    <option value="Proposed Concept">Proposed Concept</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Timeline / Year</label>
                  <input
                    type="text"
                    value={portfolioForm.completionDate}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, completionDate: e.target.value })}
                    placeholder="e.g., 2026"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Live URL (optional)</label>
                  <input
                    type="url"
                    value={portfolioForm.liveUrl}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Technologies / Tags</label>
                  <input
                    type="text"
                    value={portfolioForm.technologies}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, technologies: e.target.value })}
                    placeholder="e.g., Graphic Design, CorelDraw, Vector Art"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPortfolioModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md cursor-pointer"
                >
                  {editingPortfolioId ? 'Save Project' : 'Upload & Add to Showcase'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: REGISTER ENQUIRY MANUALLY ===================== */}
      {isAddEnquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <h4 className="text-lg font-bold text-white mb-1">Manual Client Enquiry Registration</h4>
            <p className="text-xs text-slate-400 mb-4">Register an enquiry received via phone, office walk-in, or referral.</p>

            <form onSubmit={handleCreateEnquiry} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  value={newEnquiryData.fullName}
                  onChange={(e) => setNewEnquiryData({ ...newEnquiryData, fullName: e.target.value })}
                  placeholder="e.g., Grace Audu"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newEnquiryData.phoneNumber}
                    onChange={(e) => setNewEnquiryData({ ...newEnquiryData, phoneNumber: e.target.value })}
                    placeholder="e.g., 08155305685"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newEnquiryData.email}
                    onChange={(e) => setNewEnquiryData({ ...newEnquiryData, email: e.target.value })}
                    placeholder="client@example.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Service Required</label>
                <select
                  value={newEnquiryData.serviceRequired}
                  onChange={(e) => setNewEnquiryData({ ...newEnquiryData, serviceRequired: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                >
                  {config.services.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Project Brief / Notes</label>
                <textarea
                  rows={3}
                  value={newEnquiryData.projectDescription}
                  onChange={(e) => setNewEnquiryData({ ...newEnquiryData, projectDescription: e.target.value })}
                  placeholder="Enter details about this quotation or project requirements..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddEnquiryOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md cursor-pointer"
                >
                  Save Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: REGISTER YOUTH MANUALLY ===================== */}
      {isAddEnrollmentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <h4 className="text-lg font-bold text-white mb-1">Manual Student Registration</h4>
            <p className="text-xs text-slate-400 mb-4">Enroll a student who registered at the Abocho Training Hub.</p>

            <form onSubmit={handleCreateEnrollment} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={newEnrollmentData.fullName}
                  onChange={(e) => setNewEnrollmentData({ ...newEnrollmentData, fullName: e.target.value })}
                  placeholder="e.g., Samuel Sunday"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newEnrollmentData.phoneNumber}
                    onChange={(e) => setNewEnrollmentData({ ...newEnrollmentData, phoneNumber: e.target.value })}
                    placeholder="e.g., 08155305685"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newEnrollmentData.email}
                    onChange={(e) => setNewEnrollmentData({ ...newEnrollmentData, email: e.target.value })}
                    placeholder="optional"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Training Track</label>
                <select
                  value={newEnrollmentData.preferredCategory}
                  onChange={(e) => setNewEnrollmentData({ ...newEnrollmentData, preferredCategory: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                >
                  {config.youthTraining.categories.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddEnrollmentOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md cursor-pointer"
                >
                  Confirm Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: EDIT SERVICE & COVER IMAGE ===================== */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8 bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <h4 className="text-lg font-bold text-white">
                  Edit Service & Cover Image
                </h4>
                <p className="text-xs text-slate-400">
                  Update service details, badge, and upload high-resolution cover image for public view.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsServiceModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs overflow-y-auto pr-1">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  placeholder="e.g., Website Design and Development"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-medium"
                />
              </div>

              {/* COVER IMAGE UPLOAD ZONE */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>Upload Service Cover Image File</span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Select Image from Computer</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleServiceImageFile}
                      className="hidden"
                    />
                  </label>

                  <span className="text-slate-500 text-xs">or paste image URL:</span>

                  <input
                    type="text"
                    value={serviceForm.imageUrl}
                    onChange={(e) => setServiceForm({ ...serviceForm, imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>

                {serviceForm.imageUrl && (
                  <div className="relative h-40 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mt-2">
                    <img
                      src={serviceForm.imageUrl}
                      alt="Service Cover Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setServiceForm({ ...serviceForm, imageUrl: '' })}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/80 text-rose-400 hover:text-white"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={serviceForm.shortDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                  placeholder="Summary shown on service cards..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={serviceForm.fullDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, fullDesc: e.target.value })}
                  placeholder="Detailed breakdown..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={serviceForm.ctaText}
                    onChange={(e) => setServiceForm({ ...serviceForm, ctaText: e.target.value })}
                    placeholder="e.g., Build My Website"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Badge (optional)</label>
                  <input
                    type="text"
                    value={serviceForm.badge}
                    onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })}
                    placeholder="e.g., Youth Program Available"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Key Benefits (comma-separated)</label>
                <input
                  type="text"
                  value={serviceForm.benefits}
                  onChange={(e) => setServiceForm({ ...serviceForm, benefits: e.target.value })}
                  placeholder="e.g., Fast loading & mobile optimized, Built-in SEO"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Scope & Features (comma-separated)</label>
                <input
                  type="text"
                  value={serviceForm.features}
                  onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                  placeholder="e.g., Business websites, School portals, Church websites"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md cursor-pointer"
                >
                  Save Service Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
