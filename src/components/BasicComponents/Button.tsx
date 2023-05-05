import styles from './Button.module.css';
import classNames from 'classnames';

interface ButtonProps {
  buttonClass?: string;
  text: string;
  children?: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
}

export const Button = ({ buttonClass, text, children, type, onClick }: ButtonProps) => {
  return (
    <button type={type} className={classNames(styles.button, buttonClass)} onClick={onClick}>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      {children}
      {text}
    </button>
  );
};
