import styles from './atoms.module.css';

type Props = {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({ children, type = 'button', disabled, onClick }: Props) {
  return (
    <button className={styles.button} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}