import { useAppDispatch } from '@/hooks/useRedux';
import { changeLoginStatus } from '@/store/stateSlice';
import styles from './Login.module.css';
import classNames from 'classnames';
import { Input } from '@/components/BasicComponents/Input';
import { Link } from '@/components/BasicComponents/Link';
import { Button } from '@/components/BasicComponents/Button';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth } from '@/db';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [firstPassword, setFirstPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [createUser, user, isLoading, error] = useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, isUpdateLoading, updateError] = useUpdateProfile(auth);

  useEffect(() => {
    if (error) {
      toast(error.message, { type: 'error' });
    }
    if (updateError) {
      toast(updateError.message, { type: 'error' });
    }
  }, [error, updateError]);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onFirstPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFirstPassword(value);
  };

  const onSecondPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (firstPassword && firstPassword === value) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPasswordValid) {
      await createUser(email, firstPassword);
      if (user) {
        await updateProfile({ displayName: name });
      }
    }
  };

  return (
    <>
      {(isLoading || isUpdateLoading) && <Loader />}
      <form className={styles.form} onSubmit={onFormSubmit}>
        <Input
          className={classNames(styles.input, { [styles.valid]: isPasswordValid })}
          type="text"
          label="Name"
          pattern="\w+"
          onChange={(e) => {
            onNameChange(e);
          }}
        />
        <Input
          type="email"
          label="Email"
          onChange={(e) => {
            onEmailChange(e);
          }}
        />
        <Input
          type="password"
          label="Password"
          pattern="^(?=.*[A-Z]).{8,}$"
          onChange={(e) => {
            onFirstPasswordChange(e);
          }}
        />
        <Input
          type="password"
          label="Repeat password"
          pattern="^(?=.*[A-Z]).{8,}$"
          className={classNames(styles.input, { [styles.valid]: isPasswordValid })}
          onChange={(e) => {
            onSecondPasswordChange(e);
          }}
        />
        <Button type="submit" className={styles.submitButton}>
          Sign up
        </Button>
      </form>
      <div className={styles.select}>
        {'Already have an account?'}
        <Link
          linkStyle="bold"
          text="Sign in"
          onClick={() => {
            dispatch(changeLoginStatus('sign-in'));
          }}
        />
      </div>
    </>
  );
};
