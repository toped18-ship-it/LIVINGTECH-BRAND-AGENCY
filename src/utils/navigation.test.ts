import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveRoute, NAV_ITEMS } from './navigation';

test('resolveRoute correctly resolves standard multi-page paths', () => {
  assert.equal(resolveRoute('/').route, 'home');
  assert.equal(resolveRoute('/home').route, 'home');
  assert.equal(resolveRoute('/about').route, 'about');
  assert.equal(resolveRoute('/services').route, 'services');
  assert.equal(resolveRoute('/portfolio').route, 'portfolio');
  assert.equal(resolveRoute('/blog').route, 'blog');
  assert.equal(resolveRoute('/training').route, 'training');
  assert.equal(resolveRoute('/process').route, 'process');
  assert.equal(resolveRoute('/contact').route, 'contact');
});

test('resolveRoute handles trailing slashes and case insensitivity', () => {
  assert.equal(resolveRoute('/ABOUT/').route, 'about');
  assert.equal(resolveRoute('/Services/').route, 'services');
  assert.equal(resolveRoute('/TRAINING').route, 'training');
});

test('resolveRoute handles sub-paths like /blog/my-slug and /services/web-design', () => {
  const blogRes = resolveRoute('/blog/my-slug');
  assert.equal(blogRes.route, 'blog');
  assert.equal(blogRes.param, 'my-slug');

  const svcRes = resolveRoute('/services/graphic-design-branding');
  assert.equal(svcRes.route, 'services');
  assert.equal(svcRes.param, 'graphic-design-branding');
});

test('resolveRoute resolves admin routes securely across paths, query params, and redirects', () => {
  assert.equal(resolveRoute('/admin').route, 'admin');
  assert.equal(resolveRoute('/admin/dashboard').route, 'admin');
  assert.equal(resolveRoute('/admin.html').route, 'admin');
  assert.equal(resolveRoute('/login').route, 'admin');
  assert.equal(resolveRoute('/portal').route, 'admin');
  assert.equal(resolveRoute('/staff').route, 'admin');
  assert.equal(resolveRoute('/dashboard').route, 'admin');
  assert.equal(resolveRoute('/', '#admin').route, 'admin');
  assert.equal(resolveRoute('/', '#/admin').route, 'admin');
  assert.equal(resolveRoute('/', '', '?admin=1').route, 'admin');
  assert.equal(resolveRoute('/', '', '?admin=true').route, 'admin');
  assert.equal(resolveRoute('/', '', '?path=%2Fadmin').route, 'admin');
});

test('resolveRoute handles legacy hash navigation fallback', () => {
  assert.equal(resolveRoute('/', '#services').route, 'services');
  assert.equal(resolveRoute('/', '#about').route, 'about');
  assert.equal(resolveRoute('/', '#training').route, 'training');
});

test('NAV_ITEMS contains all 8 main menu items matching user menu', () => {
  assert.equal(NAV_ITEMS.length, 8);
  const names = NAV_ITEMS.map((item) => item.name);
  assert.deepEqual(names, [
    'Home',
    'About',
    'Services',
    'Portfolio',
    'Blog',
    'Training',
    'Process',
    'Contact',
  ]);
});
