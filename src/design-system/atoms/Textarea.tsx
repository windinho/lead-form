import styles from './atoms.module.css';

type Props = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  invalid?: boolean;
  maxLength?: number;
};

export function Textarea({ id, name, value, onChange, onBlur, invalid, maxLength }: Props) {
  return (
    <textarea
      id={id}
      name={name}
      className={`${styles.input} ${styles.textarea} ${invalid ? styles.invalid : ''}`}
      value={value}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
}