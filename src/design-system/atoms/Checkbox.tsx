import styles from './atoms.module.css';

type Props = {
  id: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  invalid?: boolean;
  label: string;
  required?: boolean;
};

export function Checkbox({
  id,
  name,
  checked,
  onChange,
  onBlur,
  invalid,
  label,
  required,
}: Props) {
  return (
    <label
      className={`${styles.checkboxRow} ${invalid ? styles.invalid : ''}`}
      htmlFor={id}
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        onBlur={onBlur}
      />

      <span>
        {label}
        {required && <span className={styles.required}> *</span>}
      </span>
    </label>
  );
}