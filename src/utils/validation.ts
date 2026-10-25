/**
 * Form validation utilities for LivingTech Brand Agency
 */

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validatePhoneNumber(phone: string): boolean {
  if (!phone) return false;
  const digits = phone.replace(/[^0-9]/g, '');
  // Nigerian numbers are typically 11 digits (e.g. 07067048471, 08155305685) or 13 digits with country code 2348155305685
  return digits.length >= 10 && digits.length <= 15;
}

export function validateEmail(email: string): boolean {
  if (!email || !email.trim()) return true; // Optional field
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function validateName(name: string): boolean {
  if (!name) return false;
  return name.trim().length >= 2;
}

export function validateContactForm(values: {
  fullName: string;
  phoneNumber: string;
  email?: string;
  serviceRequired: string;
  projectDescription: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!validateName(values.fullName)) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!validatePhoneNumber(values.phoneNumber)) {
    errors.phoneNumber = 'Please enter a valid phone number (e.g., 08155305685 or 07067048471).';
  }

  if (values.email && !validateEmail(values.email)) {
    errors.email = 'Please provide a valid email address, or leave it blank.';
  }

  if (!values.serviceRequired || !values.serviceRequired.trim()) {
    errors.serviceRequired = 'Please select the service you require.';
  }

  if (!values.projectDescription || values.projectDescription.trim().length < 10) {
    errors.projectDescription = 'Please describe your project or requirements (at least 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateEnrollmentForm(values: {
  fullName: string;
  phoneNumber: string;
  email?: string;
  preferredCategory: string;
  trainingFormat: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!validateName(values.fullName)) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!validatePhoneNumber(values.phoneNumber)) {
    errors.phoneNumber = 'Please provide a valid contact number (e.g., 08155305685).';
  }

  if (values.email && !validateEmail(values.email)) {
    errors.email = 'Please enter a valid email address or leave it blank.';
  }

  if (!values.preferredCategory || !values.preferredCategory.trim()) {
    errors.preferredCategory = 'Please select a preferred training track.';
  }

  if (!values.trainingFormat || !values.trainingFormat.trim()) {
    errors.trainingFormat = 'Please select your preferred training format.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
