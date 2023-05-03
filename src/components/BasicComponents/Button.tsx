import styles from './Button.module.css';
import classNames from 'classnames';

interface ButtonProps {
  buttonClass?: string;
  text: string;
  onClick: () => void;
}

export const Button = ({ buttonClass, text, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(styles.button, buttonClass)}
      onClick={() => {
        onClick();
      }}
    >
      {text}
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
    </button>
  );
};
