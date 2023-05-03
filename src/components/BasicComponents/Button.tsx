import styles from './Button.module.css';
import classNames from 'classnames';

interface ButtonProps {
  buttonClass?: string;
  text: string;
}

export const Button = ({ buttonClass, text }: ButtonProps) => {
  return (
    <button className={classNames(styles.button, buttonClass)}>
      {text}
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
    </button>
  );
};
