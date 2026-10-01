import type { FieldConfig } from './types';

export const LeadCaptureFormConfig: FieldConfig[] = [
  {
    name: 'fullName',
    type: 'text',
    label: 'Full name',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: 'Enter a valid email address',
  },
  {
    name: 'leadType',
    type: 'select',
    label: 'Lead type',
    required: true,
    options: [
      { label: 'Individual', value: 'individual' },
      { label: 'Company', value: 'company' },
    ],
  },
  {
    name: 'companyName',
    type: 'text',
    label: 'Company name',
    required: true,
    visibleWhen: (values) => values.leadType === 'company',
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Phone',
    required: true,
    pattern: /^\d{10}$/,
    patternMessage: 'Phone must be exactly 10 digits',
    placeholder: '1234567890',
  },
  {
    name: 'notes',
    type: 'textarea',
    label: 'Notes',
    maxLength: 200,
    hint: 'Optional, up to 200 characters',
    fullWidth: true,
  },
  {
    name: 'consent',
    type: 'checkbox',
    label: 'I agree to be contacted',
    required: true,
    fullWidth: true,
  },
];