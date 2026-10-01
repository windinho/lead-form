# Dynamic Lead Form & Design System

A responsive, configuration-driven lead capture form built with React and TypeScript.

This project demonstrates a small reusable design system with tokens, atoms, and molecules, combined with a dynamic form whose fields, visibility, layout, and validation are driven by configuration.

## Features

- Configuration-driven form rendering
- Reusable design-system components
- Design tokens for colors, spacing, typography, and breakpoints
- Conditional field visibility
- Configuration-based validation
- Field-level validation on blur
- Full-form validation on submission
- Responsive desktop, tablet, and mobile layouts
- TypeScript-based type safety
- CSS Modules for scoped styling
- Easily extensible field configuration

## Tech Stack

- React
- TypeScript
- Vite
- CSS Modules

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### Install dependencies

    npm install

### Start the development server

    npm run dev

The application will be available at the local URL shown by Vite, usually:

    http://localhost:5173

### Build for production

    npm run build

### Preview the production build

    npm run preview

## Project Structure

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

The project separates reusable UI components from feature-specific business logic.

## Design System

The design system is located in:

    src/design-system/

It is organized into three layers:

    Tokens
       ↓
    Atoms
       ↓
    Molecules

### Tokens

Located in:

    src/design-system/tokens/

The token layer contains shared design values for:

- Colors
- Spacing
- Typography
- Breakpoints

Components consume these CSS variables instead of duplicating design values.

### Atoms

Located in:

    src/design-system/atoms/

Available atoms:

- `TextInput`
- `Select`
- `Textarea`
- `Checkbox`
- `Button`

These components are intentionally domain-agnostic and do not contain lead-specific validation or business rules.

### Field Molecule

Located at:

    src/design-system/molecules/Field.tsx

The `Field` molecule composes:

- Label
- Form control
- Hint
- Error message

This keeps field presentation consistent across different input types.

## Configuration-Driven Form

The lead feature is located in:

    src/features/lead/

The form is configuration-driven rather than hardcoding every field directly in JSX.

### Field Configuration

Located at:

    src/features/lead/config.ts

Field configuration can define:

- Field name
- Field type
- Label
- Required state
- Placeholder
- Options
- Validation pattern
- Validation message
- Maximum length
- Conditional visibility
- Layout behavior

Example:

    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
      required: true,
      pattern: /^\d{10}$/,
      patternMessage: 'Phone must be exactly 10 digits',
    }

Adding a new supported field can therefore be done primarily through configuration.

## Supported Field Types

| Field Type | Component |
| --- | --- |
| `text` | `TextInput` |
| `email` | `TextInput` |
| `select` | `Select` |
| `textarea` | `Textarea` |
| `checkbox` | `Checkbox` |

## Conditional Fields

The **Company Name** field is conditionally displayed based on the selected Lead Type.

    visibleWhen: (values) => values.leadType === 'company'

Behavior:

- Selecting **Individual** hides Company Name.
- Selecting **Company** displays Company Name.
- Company Name is required only when it is visible.

The form updates dynamically without a page reload.

## Validation

Validation is centralized in:

    src/features/lead/validation.ts

The validation layer follows this model:

    config + values → errors

It handles:

- Required fields
- Email format
- Phone format
- Maximum note length
- Required consent
- Conditional fields

### Validation Triggers

Validation runs on:

1. Field blur
2. Form submission

On submission, all current validation errors are displayed and the form is not submitted until the values are valid.

Lead-specific validation remains outside the design-system atoms, keeping those components reusable.

## Lead Form Fields

| Field | Type | Validation |
| --- | --- | --- |
| Full name | Text | Required |
| Email | Email | Required, valid email |
| Lead type | Select | Required |
| Company name | Text | Required when Company is selected |
| Phone | Text | Required, exactly 10 digits |
| Notes | Textarea | Optional, maximum 200 characters |
| Consent | Checkbox | Required |

## Responsive Layout

Responsive styles are located in:

    src/features/lead/LeadCaptureForm.module.css

### Desktop — 1024px and above

- Two-column form layout
- Full name and Email share a row
- Lead type and Phone share a row
- Notes spans the full width
- Consent spans the full width
- Submit action is aligned to the right

### Tablet — below 1024px

- Single-column layout
- Fields use the available width
- Layout remains optimized for touch interaction

### Mobile — below 768px

- Single-column layout
- Inputs use the available width
- Submit button becomes full width
- Submit action remains accessible through a sticky bottom action area

## Architecture

The application separates reusable UI from feature-specific behavior:

    Design System
          │
      ┌───┼───┐
      ▼   ▼   ▼
    Tokens Atoms Molecules
                  │
                  ▼
             Lead Feature
                  │
          ┌───────┴───────┐
          ▼               ▼
       Config         Validation
          │               │
          └───────┬───────┘
                  ▼
         LeadCaptureForm

### Separation of Responsibilities

| Layer | Responsibility |
| --- | --- |
| Tokens | Shared design values |
| Atoms | Reusable UI controls |
| Molecules | Reusable field-level composition |
| Config | Field definitions and behavior |
| Validation | Feature-specific validation rules |
| LeadCaptureForm | Form state, rendering, and interaction |

This separation keeps the design system reusable while allowing the lead feature to evolve independently.

## Adding a New Field

For an existing supported field type, a new field can generally be added by creating another configuration entry.

Example:

    {
      name: 'city',
      type: 'text',
      label: 'City',
      required: true,
    }

The form will automatically:

1. Read the field configuration.
2. Resolve the configured field type.
3. Render the corresponding design-system atom.
4. Apply the configured validation rules.
5. Display validation feedback through the shared `Field` molecule.

Validation rules such as `required`, `pattern`, and `maxLength` can be defined alongside the field configuration.

## Design Principles

The project follows these principles:

- **Configuration over duplication** — field behavior is defined through configuration where practical.
- **Reusable primitives** — design-system components remain independent of lead-specific business rules.
- **Separation of concerns** — rendering, configuration, validation, and styling have distinct responsibilities.
- **Composition over monolithic components** — larger UI behavior is built from smaller reusable components.
- **Responsive by default** — the form adapts to desktop, tablet, and mobile layouts.
- **Type safety** — TypeScript is used throughout the application to make configuration and component contracts explicit.
