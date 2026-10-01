import styles from './atoms.module.css';

type Option = { label: string; value: string };

type Props = {
  id: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  onBlur?: () => void;
  invalid?: boolean;
};

export function Select({ id, name, value, options, onChange, onBlur, invalid }: Props) {
  return (
    <select
      id={id}
      name={name}
      className={`${styles.input} ${invalid ? styles.invalid : ''}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    >
      <option value="">Select…</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}