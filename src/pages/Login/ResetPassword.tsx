import { useAppDispatch } from '@/hooks/useRedux';
import { changeLoginStatus } from '@/store/stateSlice';
import styles from './Login.module.css';
import { Input } from '@/components/BasicComponents/Input';
import { Link } from '@/components/BasicComponents/Link';
import { Button } from '@/components/BasicComponents/Button';
import { sendPasswordReset } from '@/db';
import { ChangeEvent, useState } from 'react';

export const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const emailRegex = /^\S+@\S+\.\S+$/;

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <Input
        type="email"
        label="Email"
        pattern={emailRegex.source}
        onChange={(e) => {
          onEmailChange(e);
        }}
      />
      <Button
        type="submit"
        buttonClass={styles.submitButton}
        text="Send me a password"
        onClick={() => sendPasswordReset(email)}
      />
      <Link
        linkStyle="bold"
        text="Return"
        onClick={() => {
          dispatch(changeLoginStatus({ status: 'sign-in' }));
        }}
      />
    </form>
  );
};
