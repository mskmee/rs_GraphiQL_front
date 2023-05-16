import React, { ChangeEvent, useEffect, useState } from 'react';
import { changeIsUserLogged, changeLoginStatus, changeUserName } from '@/store/stateSlice';
import { useAppDispatch } from '@/hooks/useRedux';
import styles from '../Login.module.css';
import classNames from 'classnames';
import { Input, Link, Button } from '@/components/BasicComponents';
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
    const updateUserInBD = async (name: string) => {
      const isUpdate = await updateProfile({ displayName: name });
      if (isUpdate) {
        dispatch(changeIsUserLogged(true));
        dispatch(changeUserName(name));
        dispatch(changeLoginStatus(''));
      }
    };
    if (error) {
      toast(error.message, { type: 'error' });
    }
    if (updateError) {
      toast(updateError.message, { type: 'error' });
    }
    if (user) {
      updateUserInBD(name).catch((err) => toast(err.message, { type: 'error' }));
    }
  }, [error, updateError, updateProfile, dispatch, name, user]);

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
