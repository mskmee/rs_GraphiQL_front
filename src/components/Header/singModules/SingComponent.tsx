import { Button } from '@/components/BasicComponents/Button';
import { changeLoginStatus } from '@/store/stateSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from '../Header.module.css';

export const SingComponent = () => {
  const dispatch = useDispatch();
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
