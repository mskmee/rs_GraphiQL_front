import { useAppDispatch } from '@/hooks/useRedux';
import { changeLoginStatus } from '@/store/stateSlice';
import styles from './Login.module.css';
import { Input } from '@/components/BasicComponents/Input';
import { Link } from '@/components/BasicComponents/Link';
import { Button } from '@/components/BasicComponents/Button';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '@/db';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';

export const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [resetPassword, isLoading, error] = useSendPasswordResetEmail(auth);

  useEffect(() => {
    if (error) {
      toast(error.message, { type: 'error' });
    }
  }, [error]);

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isSuccess = await resetPassword(email);
    if (isSuccess) {
      toast('Check instructions in you email.', { type: 'success' });
      dispatch(changeLoginStatus(''));
    }
  };

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      {isLoading && <Loader />}
      <Input
        required
        type="email"
        label="Email"
        onChange={(e) => {
          onEmailChange(e);
        }}
      />
      <Button type="submit" className={styles.submitButton}>
        Send me a password
      </Button>
      <Link
        linkStyle="bold"
        text="Return"
        onClick={() => {
          dispatch(changeLoginStatus('sign-in'));
        }}
      />
    </form>
  );
};
