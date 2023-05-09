import { useAppDispatch } from '@/hooks/useRedux';
import styles from './Login.module.css';
import { Input } from '@/components/BasicComponents/Input';
import { Button } from '@/components/BasicComponents/Button';
import { Link } from '@/components/BasicComponents/Link';
import { changeIsUserLogged, changeLoginStatus, changeUserName } from '@/store/stateSlice';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, getUserName } from '@/db';
import { Loader } from '@/components/Loader';
import { SingInWithGoogle } from './SingInWithGoogle';
import { UserCredential } from 'firebase/auth';
import { toast } from 'react-toastify';

export const SignIn = () => {
  const [signInWithEmailAndPassword, user, isLoading, error] = useSignInWithEmailAndPassword(auth);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const setUserData = async (user: UserCredential) => {
      const userName = await getUserName(user);
      dispatch(changeUserName(userName));
      dispatch(changeIsUserLogged(true));
      dispatch(changeLoginStatus(''));
    };
    if (user) {
      setUserData(user).catch((err) => {
        toast(err.message, { type: 'error' });
      });
    }
    if (error) {
      toast(error.message, { type: 'error' });
    }
  }, [user, dispatch, error]);

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  return (
    <>
      <form className={styles.form} onSubmit={onFormSubmit}>
        {isLoading && <Loader />}
        <Input
          required
          type="email"
          label="Email"
          title="Please enter a valid email"
          onChange={(e) => {
            onEmailChange(e);
          }}
        />
        <Input
          required
          type="password"
          label="Password"
          pattern="^(?=.*[A-Z]).{8,}$"
          onChange={(e) => {
            onPasswordChange(e);
          }}
        />
        <Link
          text="Forgot password?"
          linkClass={styles.resetButton}
          onClick={() => {
            dispatch(changeLoginStatus('reset-password'));
          }}
        />
        <Button type="submit" className={styles.submitButton}>
          Sign in
        </Button>
      </form>
      <SingInWithGoogle />
      <div className={styles.select}>
        {"Don't have an account?"}
        <Link
          linkStyle="bold"
          text="Sign up"
          onClick={() => {
            dispatch(changeLoginStatus('sign-up'));
          }}
        />
      </div>
    </>
  );
};
