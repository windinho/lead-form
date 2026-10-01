import styles from './atoms.module.css';

type Props = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: 'text' | 'email';
  invalid?: boolean;
  placeholder?: string;
};

export function TextInput({ id, name, value, onChange, onBlur, type = 'text', invalid, placeholder }: Props) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      className={`${styles.input} ${invalid ? styles.invalid : ''}`}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
}