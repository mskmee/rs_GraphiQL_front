import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import styles from '../Login.module.css';
import { changeLoginStatus } from '@/store/stateSlice';
import { Input } from '@/components/BasicComponents/Input';
import { Link } from '@/components/BasicComponents/Link';
import { Button } from '@/components/BasicComponents/Button';
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
    const isResetSuccess = await resetPassword(email);
    if (isResetSuccess) {
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
