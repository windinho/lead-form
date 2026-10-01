import type { FieldConfig, FormValues, FormErrors } from './types';

export function validate(config: FieldConfig[], values: FormValues): FormErrors {
  const errors: FormErrors = {};

  for (const field of config) {
    if (field.visibleWhen && !field.visibleWhen(values)) continue;

    const value = values[field.name];

    if (field.type === 'checkbox') {
      if (field.required && value !== true) {
        errors[field.name] = `${field.label} is required`;
      }
      continue;
    }

    const str = typeof value === 'string' ? value.trim() : '';

    if (field.required && !str) {
      errors[field.name] = `${field.label} is required`;
      continue;
    }

    if (str && field.pattern && !field.pattern.test(str)) {
      errors[field.name] = field.patternMessage ?? `${field.label} is invalid`;
      continue;
    }

    if (str && field.maxLength && str.length > field.maxLength) {
      errors[field.name] = `${field.label} must be ${field.maxLength} characters or less`;
    }
  }

  return errors;
}