import React from 'react';
import { Button } from '@/components/BasicComponents/Button';
import { changeLoginStatus } from '@/store/userSlice';
import styles from '../Header.module.css';
import { useAppDispatch } from '@/hooks/useRedux';

export const SingComponent = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Button
        type="button"
        onClick={() => {
          dispatch(changeLoginStatus('sign-in'));
        }}
      >
        Sign in
      </Button>
      <Button
        className={styles.signUpButton}
        type="button"
        onClick={() => {
          dispatch(changeLoginStatus('sign-up'));
        }}
      >
        Sign up
      </Button>
    </>
  );
};
