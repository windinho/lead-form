# Dynamic Lead Form & Design System

A responsive, configuration-driven lead capture form built with React and TypeScript.

The project demonstrates a small reusable design system with tokens, atoms, and a field molecule, combined with a dynamic form whose fields, visibility, and validation are driven by configuration.

## Tech Stack

- React
- TypeScript
- CSS Modules
- Vite

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The application will be available at the local URL shown by Vite, usually:

```text
http://localhost:5173
```
---

## Project Structure

```text
src/
├── design-system/
│   ├── tokens/
│   │   ├── colors.css
│   │   ├── spacing.css
│   │   ├── typography.css
│   │   ├── breakpoints.css
│   │   └── index.css
│   │
│   ├── atoms/
│   │   ├── TextInput.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Button.tsx
│   │   └── atoms.module.css
│   │
│   └── molecules/
│       ├── Field.tsx
│       └── Field.module.css
│
├── features/
│   └── lead/
│       ├── config.ts
│       ├── validation.ts
│       ├── types.ts
│       ├── LeadCaptureForm.tsx
│       └── LeadCaptureForm.module.css
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## Design System

The design system is separated from feature-specific logic so that the UI primitives can be reused by other forms or features.

### Tokens

Located in:

```text
src/design-system/tokens/
```

The token layer contains:

- Colors
- Spacing
- Typography
- Breakpoints

Components consume these CSS variables instead of hardcoding repeated design values.

### Atoms

Located in:

```text
src/design-system/atoms/
```

The project contains the following reusable atoms:

- `TextInput`
- `Select`
- `Textarea`
- `Checkbox`
- `Button`

These components are intentionally domain-agnostic. They do not contain lead-specific validation or business rules.

### Field Molecule

Located in:

```text
src/design-system/molecules/Field.tsx
```

`Field` composes a label, control, hint, and error message into a reusable field structure.

This keeps field-level presentation consistent while allowing different input atoms to be plugged into it.

---

## Dynamic Form

The lead form is located in:

```text
src/features/lead/
```

The form is configuration-driven rather than hardcoding every field directly in the JSX.

### Field Configuration

Located in:

```text
src/features/lead/config.ts
```

The configuration defines:

- Field name
- Field type
- Label
- Required state
- Placeholder
- Options
- Validation patterns
- Maximum length
- Conditional visibility
- Layout behavior

For example:

```ts
{
  name: 'phone',
  type: 'text',
  label: 'Phone',
  required: true,
  pattern: /^\d{10}$/,
  patternMessage: 'Phone must be exactly 10 digits',
}
```

Adding another supported field can therefore be done primarily by adding a configuration entry.

---

## Supported Field Types

The form currently supports:

- `text`
- `email`
- `select`
- `textarea`
- `checkbox`

The form maps the configured field type to the appropriate design-system atom.

---

## Conditional Fields

The Company Name field is conditionally displayed based on the selected Lead Type.

```ts
visibleWhen: (values) => values.leadType === 'company'
```

Therefore:

- Selecting **Individual** hides Company Name.
- Selecting **Company** displays Company Name.
- Company Name is required only when it is visible.

The form updates this dynamically without a page reload.

---

## Validation

Validation is centralized in:

```text
src/features/lead/validation.ts
```

The validation function is a pure function of:

```text
config + values → errors
```

It handles:

- Required fields
- Email format
- Phone format
- Maximum note length
- Required consent
- Conditional fields

Validation is triggered on:

- Field blur
- Form submission

On submission, all current validation errors are displayed and the form is not submitted until the values are valid.

The input atoms themselves do not contain lead-specific validation rules.

---

## Lead Form Fields

| Field | Type | Validation |
|---|---|---|
| Full name | Text | Required |
| Email | Email | Required, valid email |
| Lead type | Select | Required |
| Company name | Text | Visible and required when Company is selected |
| Phone | Text | Required, exactly 10 digits |
| Notes | Textarea | Optional, maximum 200 characters |
| Consent | Checkbox | Required |

---

## Responsive Layout

Responsive styles are located in:

```text
src/features/lead/LeadCaptureForm.module.css
```

### Desktop

At widths of `1024px` and above:

- Form uses two columns.
- Full name and Email appear on the same row.
- Lead type and Phone appear on the next row.
- Notes spans the full width.
- Consent spans the full width.
- Submit action is aligned to the right.

### Mobile

Below `768px`:

- Form switches to a single-column layout.
- Inputs use the available width.
- Submit button becomes full width.
- Submit action remains reachable using a sticky bottom action area.

### Tablet

Tablet widths use the mobile-style single-column layout.

---

## Architecture

The project separates reusable UI from feature-specific logic:

```text
Design System
     │
     ├── Tokens
     │
     ├── Atoms
     │
     └── Field Molecule
             │
             ▼
       Lead Feature
             │
       ┌─────┴─────┐
       │           │
    Config     Validation
       │           │
       └─────┬─────┘
             ▼
          LeadCaptureForm
```
---

## Adding a New Field

For one of the existing supported field types, a new field can generally be added by creating another configuration entry.

For example:

```ts
{
  name: 'city',
  type: 'text',
  label: 'City',
  required: true,
}
```

The form will automatically render the corresponding input atom based on the configured `type`.

The validation logic also consumes the configuration, so validation rules such as `required`, `pattern`, and `maxLength` can be defined alongside the field configuration.