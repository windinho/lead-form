import styles from './Field.module.css';

type Props = {
  htmlFor: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
};

export function Field({ htmlFor, label, hint, error, required, fullWidth, children }: Props) {
  return (
    <div className={`${styles.field} ${fullWidth ? styles.fullWidth : ''}`}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      {children}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  );
}