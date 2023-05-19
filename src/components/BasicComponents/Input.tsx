import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from 'react';
import styles from './Input.module.css';
import classNames from 'classnames';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface IFormValues {
  name: string;
  email: string;
  password: string;
}
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: Path<IFormValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  onSubmitSuccess: boolean;
}

export const Input = ({
  label,
  register,
  errors,
  onSubmitSuccess,
  className,
  onChange,
}: InputProps) => {
  //const inputRef = useRef<HTMLInputElement | null>(null);
  // const passwordTitle = 'Minlength is 8 chars. At least one char should be upper case.';

  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (onSubmitSuccess) {
      setIsEmpty(true);
    }
  }, [onSubmitSuccess]);

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
        type={label === 'password' ? 'password' : 'text'}
        id={label}
        className={classNames(styles.input, className, {
          [styles.empty]: isEmpty,
        })}
        {...register(label)}
        onChange={(e) => {
          onChange ? onChange(e) : null;
          handleChange(e);
        }}
      />
      <label
        className={classNames(styles.label, {
          [styles.empty]: isEmpty,
        })}
        htmlFor={label}
      >
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      {label === 'name' && errors?.name && (
        <div className={styles.error}>{`${errors?.name?.message}` || `Invalid ${label}`}</div>
      )}
      {label === 'email' && errors?.email && (
        <div className={styles.error}>{`${errors?.email?.message}` || `Invalid ${label}`}</div>
      )}
      {label === 'password' && errors?.password && (
        <div className={styles.error}>{`${errors?.password?.message}` || `Invalid ${label}`}</div>
      )}
    </div>
  );
};
