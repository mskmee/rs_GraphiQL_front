import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import classNames from 'classnames';
import styles from './Input.module.css';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };

  const getLabel = (label: string) => {
    return label === 'repeatPassword' ? t('login.repeatPassword') : t(`login.${label}`);
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
        {getLabel(label)}
      </label>
      {label === 'name' && errors?.name && (
        <div className={styles.error}>{t(`${errors?.name?.message}`) || `Invalid ${label}`}</div>
      )}
      {label === 'email' && errors?.email && (
        <div className={styles.error}>{t(`${errors?.email?.message}`) || `Invalid ${label}`}</div>
      )}
      {label === 'password' && errors?.password && (
        <div className={styles.error}>
          {t(`${errors?.password?.message}`) || `Invalid ${label}`}
        </div>
      )}
      {label === 'repeatPassword' && errors?.repeatPassword && (
        <div className={styles.error}>
          {t(`${errors?.repeatPassword?.message}`) || `Invalid ${label}`}
        </div>
      )}
    </div>
  );
};
