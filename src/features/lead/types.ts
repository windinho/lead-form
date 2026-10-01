export type FieldType = 'text' | 'email' | 'select' | 'textarea' | 'checkbox';

export type FieldConfig = {
  name: string;
  type: FieldType;
  label: string;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  maxLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
  options?: { label: string; value: string }[];
  visibleWhen?: (values: FormValues) => boolean;
  fullWidth?: boolean;
};

export type FormValues = Record<string, string | boolean>;
export type FormErrors = Record<string, string | undefined>;