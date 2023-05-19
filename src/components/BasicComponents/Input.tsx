import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import styles from './Input.module.css';
import classNames from 'classnames';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: Path<SignInData> | Path<SignUpData> | Path<ResetData>;
  register: CombinedRegister<SignInData, SignUpData, ResetData>;
  errors: FieldErrors<FieldValues>;
}

type CombinedRegister<T extends FieldValues, U extends FieldValues, V extends FieldValues> =
  | UseFormRegister<T>
  | UseFormRegister<U>
  | UseFormRegister<V>;

interface SignInData extends FieldValues {
  email: string;
  password: string;
}

interface SignUpData extends FieldValues {
  email: string;
  password: string;
  name: string;
  repeatPassword: string;
}

interface ResetData extends FieldValues {
  email: string;
}

export const Input = ({ label, register, errors, className, onChange }: InputProps) => {
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
        type={label === 'password' || label === 'repeatPassword' ? 'password' : 'text'}
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
        {label === 'repeatPassword'
          ? 'Repeat password'
          : label.charAt(0).toUpperCase() + label.slice(1)}
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
      {label === 'repeatPassword' && errors?.repeatPassword && (
        <div className={styles.error}>
          {`${errors?.repeatPassword?.message}` || `Invalid ${label}`}
        </div>
      )}
    </div>
  );
};
