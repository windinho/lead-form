Dynamic Lead Form & Design System

A responsive, configuration-driven lead capture form built with React and TypeScript.

This project demonstrates how a small, reusable design system can be combined with a dynamic form architecture. UI primitives are separated into tokens, atoms, and molecules, while the lead form uses configuration-driven rendering, conditional fields, and centralized validation.

✨ Features

Configuration-driven form rendering

Reusable design-system components

Design tokens for colors, spacing, typography, and breakpoints

Conditional field visibility

Configuration-based validation

Field-level validation on blur

Full-form validation on submission

Responsive desktop, tablet, and mobile layouts

TypeScript-based type safety

CSS Modules for component-scoped styling

Easily extensible field configuration

🛠️ Tech Stack

React — UI library

TypeScript — Type safety

Vite — Development and build tooling

CSS Modules — Scoped component styling

🚀 Getting Started
Prerequisites

Make sure you have a recent version of Node.js and npm installed.

Installation

Clone the repository and install dependencies:

npm install

Development

Start the development server:

npm run dev


The application will be available at the local URL provided by Vite, typically:

http://localhost:5173

Production Build

Create a production build:

npm run build


To preview the production build locally:

npm run preview

📁 Project Structure
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


The architecture intentionally separates reusable UI primitives from feature-specific business logic.

🎨 Design System

The design system lives under:

src/design-system/


It is organized into three layers:

Tokens
  ↓
Atoms
  ↓
Molecules

Tokens

Located in:

src/design-system/tokens/


The token layer defines shared design values such as:

Colors

Spacing

Typography

Breakpoints

Components consume these CSS variables instead of duplicating design values throughout the application.

Atoms

Located in:

src/design-system/atoms/


The project currently includes:

TextInput

Select

Textarea

Checkbox

Button

These components are intentionally domain-agnostic. They provide reusable UI behavior without containing lead-specific business rules or validation.

Field Molecule

Located at:

src/design-system/molecules/Field.tsx


The Field molecule composes common field-level UI:

Label

Input/control

Hint

Error message

This provides a consistent structure across different field types while allowing individual atoms to be swapped in as needed.

🧩 Configuration-Driven Form

The lead feature is located in:

src/features/lead/


Instead of hardcoding every field directly in the form JSX, field behavior is defined through configuration.

Field Configuration

Located at:

src/features/lead/config.ts


A field configuration can define:

Field name

Field type

Label

Required state

Placeholder

Options

Validation pattern

Validation message

Maximum length

Conditional visibility

Layout behavior

For example:

{
  name: 'phone',
  type: 'text',
  label: 'Phone',
  required: true,
  pattern: /^\d{10}$/,
  patternMessage: 'Phone must be exactly 10 digits',
}


The form uses the configuration to determine which component to render and how that field should behave.

This makes the form easier to extend without repeatedly modifying the form's rendering logic.

🧱 Supported Field Types

The form currently supports:

Type	Component
text	TextInput
email	TextInput
select	Select
textarea	Textarea
checkbox	Checkbox

The configured field type is mapped to the corresponding design-system atom at runtime.

🔀 Conditional Fields

Fields can define their own visibility rules.

For example, the Company Name field is displayed only when the user selects Company as the lead type:

visibleWhen: (values) => values.leadType === 'company'


This results in the following behavior:

Individual → Company Name is hidden

Company → Company Name is displayed

Company Name becomes required only when it is visible

The form responds to the user's selection immediately without requiring a page reload.

✅ Validation

Validation is centralized in:

src/features/lead/validation.ts


The validation layer is designed as a pure function:

config + values → errors


It currently handles:

Required fields

Email format

Phone format

Maximum note length

Required consent

Conditional fields

Validation Lifecycle

Validation runs on:

Field blur — validates the individual field after the user leaves it.

Form submission — validates the complete form.

When submission validation fails, the relevant errors are displayed and the form is not submitted until the values are valid.

Importantly, the design-system atoms remain reusable because lead-specific validation rules live outside the atoms.

📋 Lead Form Fields
Field	Type	Validation
Full name	Text	Required
Email	Email	Required, valid email
Lead type	Select	Required
Company name	Text	Required when Company is selected
Phone	Text	Required, exactly 10 digits
Notes	Textarea	Optional, maximum 200 characters
Consent	Checkbox	Required
📱 Responsive Layout

Responsive behavior is defined in:

src/features/lead/LeadCaptureForm.module.css

Desktop — 1024px+

Two-column form layout

Full name and Email share a row

Lead type and Phone share a row

Notes spans the full width

Consent spans the full width

Submit action is aligned to the right

Tablet — < 1024px

Single-column layout

Fields use the available width

Form remains optimized for touch interaction

Mobile — < 768px

Single-column layout

Inputs use the full available width

Submit button becomes full width

Submit action remains accessible through a sticky bottom action area

🏗️ Architecture

The application separates reusable UI from feature-specific behavior:

                 Design System
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
       Tokens       Atoms      Molecules
                                  │
                                  ▼
                           Lead Feature
                                  │
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
                 Config                     Validation
                    │                           │
                    └─────────────┬─────────────┘
                                  ▼
                         LeadCaptureForm

Separation of Responsibilities
Layer	Responsibility
Tokens	Shared design values
Atoms	Reusable UI controls
Molecules	Reusable field-level composition
Config	Field definitions and behavior
Validation	Feature-specific validation rules
LeadCaptureForm	Form state, rendering, and interaction

This separation keeps the design system reusable while allowing the lead feature to evolve independently.

➕ Adding a New Field

For an existing supported field type, adding a new field generally requires only a new configuration entry.

For example:

{
  name: 'city',
  type: 'text',
  label: 'City',
  required: true,
}


The form will automatically:

Read the new field configuration.

Resolve its configured field type.

Render the corresponding design-system atom.

Apply the configured validation rules.

Display validation feedback through the shared Field molecule.

Validation rules such as required, pattern, and maxLength can therefore live alongside the field definition rather than being duplicated inside the form component.

💡 Design Principles

This project follows a few core principles:

Configuration over duplication — field behavior is described through configuration where practical.

Reusable primitives — design-system components remain independent of lead-specific business rules.

Separation of concerns — rendering, configuration, validation, and styling have distinct responsibilities.

Composition over monolithic components — larger UI behavior is built from smaller reusable pieces.

Responsive by default — the form adapts to desktop, tablet, and mobile layouts.

Type safety — TypeScript is used throughout the application to make configuration and component contracts explicit.

📄 License

This project is provided for demonstration and evaluation purposes.