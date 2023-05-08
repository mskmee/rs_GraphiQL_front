import { ChangeEvent, useState } from 'react';
import styles from './Input.module.css';
import classNames from 'classnames';

interface InputProps {
  type: string;
  label: string;
  pattern: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ type, label, pattern, className, onChange }: InputProps) => {
  const [isEmpty, setIsEmpty] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type={type}
        id={label}
        className={classNames(styles.input, className, {
          [styles.empty]: isEmpty,
        })}
        pattern={pattern}
        onChange={(e) => {
          handleChange(e);
          onChange(e);
        }}
      />
      <label
        className={classNames(styles.label, {
          [styles.empty]: isEmpty,
        })}
        htmlFor={label}
      >
        {label}
      </label>
    </div>
  );
};
