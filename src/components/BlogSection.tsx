import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Share2,
  Check,
  Search,
  Tag,
  ExternalLink,
  MessageSquare,
  X,
  Sparkles,
} from 'lucide-react';
import { AdminStore, BlogPost } from '../services/adminStore';
import { getBlogShareUrl, generateWhatsAppShareUrl, copyToClipboard } from '../utils/shareUtils';

interface BlogSectionProps {
  onOpenQuoteModal?: (serviceName?: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenQuoteModal }) => {
  const [posts, setPosts] = useState<BlogPost[]>(AdminStore.getBlogPosts());
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Sync with store updates
  useEffect(() => {
    const handleUpdate = () => {
      setPosts(AdminStore.getBlogPosts());
    };
    window.addEventListener('livingtech_blog_updated', handleUpdate);
    return () => window.removeEventListener('livingtech_blog_updated', handleUpdate);
  }, []);

  // Check URL hash for direct blog link on load/hashchange (e.g. #blog/my-slug)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#blog/')) {
        const slug = hash.replace('#blog/', '').trim();
        const found = AdminStore.getBlogPostBySlug(slug);
        if (found) {
          setSelectedPost(found);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const publishedPosts = posts.filter((p) => p.isPublished);

  const categories = ['All', 'Graphic Design', 'Computer Training', 'Website Design', 'Tech Insights', 'Digital Skills'];

  const filteredPosts = publishedPosts.filter((post) => {
    const matchCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const handleCopyLink = async (post: BlogPost, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = getBlogShareUrl(post.slug);
    await copyToClipboard(url, post.title);
    setCopiedSlug(post.slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const handleOpenReader = (post: BlogPost) => {
    setSelectedPost(post);
    try {
      window.history.pushState(null, '', `#blog/${post.slug}`);
    } catch {
      // Ignore
    }
  };

  const handleCloseReader = () => {
    setSelectedPost(null);
    try {
      window.history.pushState(null, '', '#blog');
    } catch {
      // Ignore
    }
  };

  return (
    <section id="blog" className="py-20 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>LivingTech Blog & Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Articles, Guides & Digital Growth
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Practical knowledge on graphic design, computer education, web architecture, and digital
            empowerment written by our team in Abocho, Kogi State.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles or topics..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-slate-900/50 border border-slate-800">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const postShareUrl = getBlogShareUrl(post.slug);
              const isCopied = copiedSlug === post.slug;
              const whatsappUrl = generateWhatsAppShareUrl(
                postShareUrl,
                `Read "${post.title}" by LivingTech Brand Agency:`
              );

              return (
                <article
                  key={post.id}
                  onClick={() => handleOpenReader(post)}
                  className="group flex flex-col justify-between rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 cursor-pointer"
                >
                  <div>
                    {/* Cover Image Frame */}
                    <div className="relative h-48 overflow-hidden bg-slate-950">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-cyan-950 text-cyan-400 font-mono text-xs">
                          LIVINGTECH INSIGHTS
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-950/85 backdrop-blur-sm text-cyan-300 border border-cyan-800/60 shadow">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer & Share Bar */}
                  <div className="p-5 pt-0 mt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                    <span className="text-cyan-400 font-semibold group-hover:underline flex items-center gap-1">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={(e) => handleCopyLink(post, e)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isCopied
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                            : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                        }`}
                        title="Copy shareable link"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/80 hover:bg-emerald-900/60 transition-colors"
                        title="Share on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Full Article Reader Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl my-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {selectedPost.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedPost.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyLink(selectedPost)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    copiedSlug === selectedPost.slug
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-slate-800 text-slate-200 hover:text-white border-slate-700'
                  }`}
                >
                  {copiedSlug === selectedPost.slug ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied Link!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3 h-3 text-cyan-400" />
                      <span>Share Link</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCloseReader}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Cover Image */}
              {selectedPost.coverImage && (
                <div className="rounded-xl overflow-hidden max-h-72 w-full bg-slate-950 border border-slate-800">
                  <img
                    src={selectedPost.coverImage}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Title & Metadata */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  {selectedPost.title}
                </h1>

                <div className="mt-4 flex items-center gap-3 text-xs text-slate-400 border-b border-slate-800 pb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                    LT
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200">{selectedPost.author}</div>
                    <div className="text-[11px] text-slate-400">{selectedPost.authorRole} &bull; Abocho, Kogi State</div>
                  </div>
                  <span className="ml-auto text-[11px] text-slate-400">
                    {new Date(selectedPost.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="prose prose-invert prose-sm sm:prose-base max-w-none space-y-4 text-slate-300 leading-relaxed whitespace-pre-line">
                {selectedPost.content}
              </div>

              {/* Article Tags */}
              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="pt-4 border-t border-slate-800 flex items-center gap-2 flex-wrap">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  {selectedPost.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA Box */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Need professional digital services?</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Partner with LivingTech Brand Agency for graphics, web development, and digital training.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      handleCloseReader();
                      if (onOpenQuoteModal) onOpenQuoteModal(selectedPost.category);
                    }}
                    className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all"
                  >
                    Request a Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
