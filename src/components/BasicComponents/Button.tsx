import styles from './Button.module.css';
import classNames from 'classnames';

interface ButtonProps {
  buttonClass?: string;
  text: string;
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
}

export const Button = ({ buttonClass, text, type, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      className={classNames(styles.button, buttonClass)}
      onClick={onClick}
    >
      {text}
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
    </button>
  );
};
