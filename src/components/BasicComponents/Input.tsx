import { InputHTMLAttributes, useRef } from 'react';
import styles from './Input.module.css';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ type, label, pattern, className, onChange }: InputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const passwordTitle = 'Minlength is 8 chars. At least one char should be upper case.';
  const title = type === 'password' ? passwordTitle : undefined;

  return (
    <div className={styles.inputWrapper}>
      <input
        required
        ref={inputRef}
        type={type}
        id={label}
        title={title}
        className={classNames(styles.input, className, {
          [styles.empty]: !inputRef.current?.value.length,
        })}
        pattern={pattern}
        onChange={(e) => {
          onChange ? onChange(e) : null;
        }}
      />
      <label
        className={classNames(styles.label, {
          [styles.empty]: !inputRef.current?.value.length,
        })}
        htmlFor={label}
      >
        {label}
      </label>
    </div>
  );
};
