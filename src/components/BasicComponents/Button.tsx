import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';
import classNames from 'classnames';

export const Button = ({
  className,
  children,
  type,
  onClick,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button type={type} className={classNames(styles.button, className)} onClick={onClick}>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      {children}
    </button>
  );
};
