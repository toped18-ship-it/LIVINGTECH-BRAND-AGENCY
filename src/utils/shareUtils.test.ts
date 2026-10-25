import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  generateSlug,
  getSectionShareUrl,
  getBlogShareUrl,
  getPortfolioShareUrl,
  generateWhatsAppShareUrl,
  generateTwitterShareUrl,
  SECTION_SHARE_DIRECTORY,
} from './shareUtils';

describe('shareUtils - Decoupled pure logic tests', () => {
  it('generateSlug creates clean, URL-safe slugs from titles', () => {
    assert.strictEqual(
      generateSlug('Empowering Youths in Kogi State with Tech Skills!'),
      'empowering-youths-in-kogi-state-with-tech-skills'
    );
    assert.strictEqual(
      generateSlug('Graphic Design & Brand Identity 2026'),
      'graphic-design-and-brand-identity-2026'
    );
    assert.strictEqual(generateSlug('   Multiple   Spaces   '), 'multiple-spaces');
  });

  it('getSectionShareUrl generates valid hash-based share links for all sections', () => {
    assert.strictEqual(getSectionShareUrl('services'), 'https://www.livingtech.name.ng/#services');
    assert.strictEqual(getSectionShareUrl('training'), 'https://www.livingtech.name.ng/#training');
    assert.strictEqual(getSectionShareUrl('blog'), 'https://www.livingtech.name.ng/#blog');
    assert.strictEqual(getSectionShareUrl('portfolio'), 'https://www.livingtech.name.ng/#portfolio');
  });

  it('getBlogShareUrl creates dedicated post links', () => {
    const url = getBlogShareUrl('empowering-youth-computer-training');
    assert.strictEqual(url, 'https://www.livingtech.name.ng/#blog/empowering-youth-computer-training');
  });

  it('getPortfolioShareUrl creates dedicated project links', () => {
    const url = getPortfolioShareUrl('livingstone-edu');
    assert.strictEqual(url, 'https://www.livingtech.name.ng/#portfolio/livingstone-edu');
  });

  it('generateWhatsAppShareUrl correctly encodes text and target url', () => {
    const shareUrl = generateWhatsAppShareUrl(
      'https://www.livingtech.name.ng/#blog/my-post',
      'Check out this article on LivingTech'
    );
    assert.ok(shareUrl.startsWith('https://wa.me/?text='));
    assert.ok(shareUrl.includes('Check%20out%20this%20article%20on%20LivingTech'));
    assert.ok(shareUrl.includes('https%3A%2F%2Fwww.livingtech.name.ng%2F%23blog%2Fmy-post'));
  });

  it('generateTwitterShareUrl generates valid intent url', () => {
    const twitterUrl = generateTwitterShareUrl(
      'https://www.livingtech.name.ng/#training',
      'Learn Tech Skills at LivingTech'
    );
    assert.ok(twitterUrl.startsWith('https://twitter.com/intent/tweet?'));
    assert.ok(twitterUrl.includes('url=https%3A%2F%2Fwww.livingtech.name.ng%2F%23training'));
  });

  it('SECTION_SHARE_DIRECTORY includes all required website sections', () => {
    const sectionIds = SECTION_SHARE_DIRECTORY.map((s) => s.id);
    assert.ok(sectionIds.includes('home'));
    assert.ok(sectionIds.includes('services'));
    assert.ok(sectionIds.includes('graphic-design'));
    assert.ok(sectionIds.includes('computer-training'));
    assert.ok(sectionIds.includes('training'));
    assert.ok(sectionIds.includes('portfolio'));
    assert.ok(sectionIds.includes('blog'));
    assert.ok(sectionIds.includes('about'));
    assert.ok(sectionIds.includes('contact'));
  });
});
