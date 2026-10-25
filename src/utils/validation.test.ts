import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validatePhoneNumber,
  validateEmail,
  validateName,
  validateContactForm,
  validateEnrollmentForm,
} from './validation';

test('validatePhoneNumber accepts valid Nigerian and international formats', () => {
  assert.equal(validatePhoneNumber('08155305685'), true);
  assert.equal(validatePhoneNumber('07067048471'), true);
  assert.equal(validatePhoneNumber('+234 815 530 5685'), true);
  assert.equal(validatePhoneNumber('123'), false);
  assert.equal(validatePhoneNumber(''), false);
});

test('validateEmail validates correctly and allows empty/optional', () => {
  assert.equal(validateEmail(''), true);
  assert.equal(validateEmail('user@livingtech.name.ng'), true);
  assert.equal(validateEmail('invalid-email'), false);
});

test('validateName checks length threshold', () => {
  assert.equal(validateName('T'), false);
  assert.equal(validateName('Temitope'), true);
  assert.equal(validateName(''), false);
});

test('validateContactForm catches missing fields', () => {
  const result = validateContactForm({
    fullName: '',
    phoneNumber: '',
    serviceRequired: '',
    projectDescription: 'Short',
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.phoneNumber);
  assert.ok(result.errors.serviceRequired);
  assert.ok(result.errors.projectDescription);
});

test('validateContactForm passes valid submission', () => {
  const result = validateContactForm({
    fullName: 'Temitope Oluwaseun',
    phoneNumber: '08155305685',
    email: 'livinglsuccess@gmail.com',
    serviceRequired: 'Website Design and Development',
    projectDescription: 'I need a fast and modern responsive website for my digital firm.',
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('validateEnrollmentForm validates youth training registration', () => {
  const result = validateEnrollmentForm({
    fullName: 'John Doe',
    phoneNumber: '08155305685',
    preferredCategory: 'Graphic Design Essentials',
    trainingFormat: 'In-Person (LivingTech Training Hub, Abocho)',
  });

  assert.equal(result.isValid, true);
});
