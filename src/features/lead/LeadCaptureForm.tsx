import { useMemo, useState } from "react";
import type { SubmitEventHandler } from "react";
import { LeadCaptureFormConfig } from "./config";
import { validate } from "./validation";
import type { FieldConfig, FormValues } from "./types";
import { Field } from "../../design-system/molecules/Field";
import { TextInput } from "../../design-system/atoms/TextInput";
import { Select } from "../../design-system/atoms/Select";
import { Textarea } from "../../design-system/atoms/Textarea";
import { Checkbox } from "../../design-system/atoms/Checkbox";
import { Button } from "../../design-system/atoms/Button";
import styles from "./LeadCaptureForm.module.css";

const initialValues = (config: FieldConfig[]): FormValues => {
  const v: FormValues = {};
  for (const f of config) v[f.name] = f.type === "checkbox" ? false : "";
  return v;
};

export function LeadCaptureForm() {
  const [values, setValues] = useState<FormValues>(() =>
    initialValues(LeadCaptureFormConfig),
  );
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  const errors = useMemo(() => validate(LeadCaptureFormConfig, values), [values]);

  const visibleFields = LeadCaptureFormConfig.filter(
    (f) => !f.visibleWhen || f.visibleWhen(values),
  );

  const isValid = Object.keys(errors).length === 0;

  const setValue = (name: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const markTouched = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const showError = (name: string) =>
    touched[name] || submitAttempted ? errors[name] : undefined;

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setSubmitAttempted(true);

    if (!isValid) return;

    setSubmitted(values);
    console.log("Submitted values:", values);
  };

  const renderControl = (field: FieldConfig) => {
    const invalid = !!showError(field.name);
    const common = {
      id: field.name,
      name: field.name,
      invalid,
      onBlur: () => markTouched(field.name),
    };

    switch (field.type) {
      case "text":
      case "email":
        return (
          <TextInput
            {...common}
            type={field.type}
            value={String(values[field.name] ?? "")}
            placeholder={field.placeholder}
            onChange={(v) => setValue(field.name, v)}
          />
        );
      case "select":
        return (
          <Select
            {...common}
            value={String(values[field.name] ?? "")}
            options={field.options ?? []}
            onChange={(v) => setValue(field.name, v)}
          />
        );
      case "textarea":
        return (
          <Textarea
            {...common}
            value={String(values[field.name] ?? "")}
            maxLength={field.maxLength}
            onChange={(v) => setValue(field.name, v)}
          />
        );
      case "checkbox":
        return (
          <Checkbox
            {...common}
            checked={Boolean(values[field.name])}
            label={field.label}
            required={field.required}
            onChange={(v) => setValue(field.name, v)}
          />
        );
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h1 className={styles.title}>Lead Capture Form</h1>
        <span className={styles.subtitle}>Tell us a little about yourself</span>

        <div className={styles.grid}>
          {visibleFields.map((field) => (
            <Field
              key={field.name}
              htmlFor={field.name}
              label={field.type === "checkbox" ? "" : field.label}
              hint={field.hint}
              error={showError(field.name)}
              required={field.type !== "checkbox" && field.required}
              fullWidth={field.fullWidth}
            >
              {renderControl(field)}
            </Field>
          ))}
        </div>

        <div className={styles.actions}>
          <Button type="submit">Submit</Button>
        </div>
      </form>
      {submitted && (
        <div className={styles.result}>
          <h2 className={styles.resultTitle}>Submitted values</h2>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
