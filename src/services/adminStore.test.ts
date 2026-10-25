import test from 'node:test';
import assert from 'node:assert/strict';
import { AdminStore } from './adminStore';

test('AdminStore authentication checks valid passwords', () => {
  assert.equal(AdminStore.login('wrong-pass'), false);
  assert.equal(AdminStore.login('livingtech2026'), true);
  assert.equal(AdminStore.login('admin123'), true);
});

test('AdminStore handles training updates', () => {
  const updated = AdminStore.updateTraining({
    advertisedPrice: 2000,
    isAvailable: false,
    duration: '5 Days',
  });

  assert.equal(updated.youthTraining.advertisedPrice, 2000);
  assert.equal(updated.youthTraining.isAvailable, false);
  assert.equal(updated.youthTraining.duration, '5 Days');

  // Reset back to 1500 and available
  const reset = AdminStore.updateTraining({
    advertisedPrice: 1500,
    isAvailable: true,
    duration: '3 Intensive Days',
  });
  assert.equal(reset.youthTraining.advertisedPrice, 1500);
  assert.equal(reset.youthTraining.isAvailable, true);
});

test('AdminStore adds and updates enquiry records', () => {
  const enquiry = AdminStore.addEnquiry({
    fullName: 'Test Client',
    phoneNumber: '08155305685',
    serviceRequired: 'Website Design and Development',
    projectDescription: 'Need a corporate website for my business in Kogi State.',
  });

  assert.ok(enquiry.id.startsWith('LT-ENQ-'));
  assert.equal(enquiry.status, 'New');

  AdminStore.updateEnquiryStatus(enquiry.id, 'Quotation Sent', 'Sent quote via email');
  const all = AdminStore.getEnquiries();
  const found = all.find((e) => e.id === enquiry.id);
  assert.ok(found);
  assert.equal(found?.status, 'Quotation Sent');
  assert.equal(found?.notes, 'Sent quote via email');

  // Clean up
  AdminStore.deleteEnquiry(enquiry.id);
  const afterDelete = AdminStore.getEnquiries();
  assert.equal(afterDelete.some((e) => e.id === enquiry.id), false);
});

test('AdminStore adds and manages youth enrollment records', () => {
  const enrollment = AdminStore.addEnrollment({
    fullName: 'Learner One',
    phoneNumber: '07067048471',
    preferredCategory: 'Graphic Design Essentials & Visual Branding',
    trainingFormat: 'In-Person (LivingTech Training Hub, Abocho)',
  });

  assert.ok(enrollment.id.startsWith('LT-ENR-'));
  assert.equal(enrollment.status, 'Registered');

  AdminStore.updateEnrollmentStatus(enrollment.id, 'Confirmed / Paid');
  const all = AdminStore.getEnrollments();
  const found = all.find((e) => e.id === enrollment.id);
  assert.ok(found);
  assert.equal(found?.status, 'Confirmed / Paid');

  // Clean up
  AdminStore.deleteEnrollment(enrollment.id);
});

test('AdminStore manages blog posts (create, update, slug retrieval, delete)', () => {
  const initialPosts = AdminStore.getBlogPosts();
  assert.ok(initialPosts.length >= 3);

  const newPost = AdminStore.addBlogPost({
    title: 'Testing Blog Creation in Admin Panel',
    slug: 'testing-blog-creation-admin-panel',
    category: 'Tech Insights',
    excerpt: 'A test article validating blog functionality in LivingTech admin.',
    content: 'Full body content of the test blog article with markdown formatting.',
    coverImage: 'https://example.com/test-cover.jpg',
    author: 'Temitope Oluwaseun',
    authorRole: 'Founder',
    readTime: '3 min read',
    isPublished: true,
    tags: ['Testing', 'Admin'],
  });

  assert.ok(newPost.id.startsWith('LT-BLOG-'));
  assert.equal(newPost.title, 'Testing Blog Creation in Admin Panel');

  // Verify retrieval by slug
  const fetched = AdminStore.getBlogPostBySlug('testing-blog-creation-admin-panel');
  assert.ok(fetched);
  assert.equal(fetched?.id, newPost.id);

  // Update post
  AdminStore.updateBlogPost({
    ...newPost,
    title: 'Updated Blog Title',
    isPublished: false,
  });

  const updatedFetched = AdminStore.getBlogPostBySlug(newPost.slug);
  assert.equal(updatedFetched?.title, 'Updated Blog Title');
  assert.equal(updatedFetched?.isPublished, false);

  // Clean up
  AdminStore.deleteBlogPost(newPost.id);
  const afterDelete = AdminStore.getBlogPostBySlug(newPost.slug);
  assert.equal(afterDelete, undefined);
});

test('AdminStore manages portfolio items with uploaded images and client metadata', () => {
  const testPortfolioItem = {
    id: 'test-client-project',
    title: 'Custom Brand Identity for Local Agri Enterprise',
    category: 'Graphic Design' as const,
    description: 'Complete visual identity package including flex banner and product labels.',
    technologies: ['Graphic Design', 'CorelDraw', 'Vector Art'],
    status: 'Completed' as const,
    imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    clientName: 'GreenPastures Agro Ltd',
    completionDate: '2026',
    isPlaceholder: false,
  };

  AdminStore.addPortfolioItem(testPortfolioItem);
  const config = AdminStore.getConfig();
  const added = config.portfolio.find((p) => p.id === 'test-client-project');
  assert.ok(added);
  assert.equal(added?.clientName, 'GreenPastures Agro Ltd');
  assert.ok(added?.imageUrl?.startsWith('data:image/png;base64,'));

  // Update item
  AdminStore.updatePortfolioItem({
    ...testPortfolioItem,
    title: 'Updated Project Title',
  });
  const updatedConfig = AdminStore.getConfig();
  const updated = updatedConfig.portfolio.find((p) => p.id === 'test-client-project');
  assert.equal(updated?.title, 'Updated Project Title');

  // Clean up
  AdminStore.deletePortfolioItem('test-client-project');
  const finalConfig = AdminStore.getConfig();
  assert.equal(finalConfig.portfolio.some((p) => p.id === 'test-client-project'), false);
});
