import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppUrl,
  getWhatsAppServiceUrl,
  formatQuoteWhatsAppMessage,
  formatEnrollmentWhatsAppMessage,
  PRESET_MESSAGES,
} from './whatsapp';

test('buildWhatsAppUrl strips non-digits from phone number and URI encodes text', () => {
  const url = buildWhatsAppUrl('Hello World! How are you?', '+234 815-530-5685');
  assert.match(url, /^https:\/\/wa\.me\/2348155305685\?text=/);
  assert.ok(url.includes(encodeURIComponent('Hello World! How are you?')));
});

test('getWhatsAppServiceUrl creates correct contextual messages for website design', () => {
  const url = getWhatsAppServiceUrl('website-design');
  assert.ok(url.includes('wa.me/2348155305685'));
  assert.ok(url.includes(encodeURIComponent(PRESET_MESSAGES['website-design'])));
});

test('getWhatsAppServiceUrl creates correct contextual messages for graphic design', () => {
  const url = getWhatsAppServiceUrl('graphic-design');
  assert.ok(url.includes(encodeURIComponent(PRESET_MESSAGES['graphic-design'])));
});

test('getWhatsAppServiceUrl creates correct contextual messages for computer training', () => {
  const url = getWhatsAppServiceUrl('computer-training');
  assert.ok(url.includes(encodeURIComponent(PRESET_MESSAGES['computer-training'])));
});

test('formatQuoteWhatsAppMessage structures quote request correctly with email', () => {
  const msg = formatQuoteWhatsAppMessage({
    fullName: 'Grace Audu',
    phoneNumber: '07067048471',
    email: 'grace@example.com',
    serviceRequired: 'Website Design and Development',
    projectDescription: 'We need an official website for our secondary school in Abocho.',
  });

  assert.ok(msg.includes('Grace Audu'));
  assert.ok(msg.includes('07067048471'));
  assert.ok(msg.includes('grace@example.com'));
  assert.ok(msg.includes('Website Design and Development'));
  assert.ok(msg.includes('secondary school in Abocho'));
});

test('formatEnrollmentWhatsAppMessage structures 3-day youth skills enrollment message', () => {
  const msg = formatEnrollmentWhatsAppMessage({
    fullName: 'Emmanuel Daniel',
    phoneNumber: '08155305685',
    preferredCategory: 'Graphic Design Essentials & Visual Branding',
    trainingFormat: 'In-Person (LivingTech Training Hub, Abocho)',
  });

  assert.ok(msg.includes('Emmanuel Daniel'));
  assert.ok(msg.includes('Graphic Design Essentials'));
  assert.ok(msg.includes('3-Day Youth Skill Acquisition Program'));
});
