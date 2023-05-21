import React from 'react';
import { Button } from '@/components/BasicComponents/Button';
import { changeLoginStatus } from '@/store/userSlice';
import styles from '../Header.module.css';
import { useAppDispatch } from '@/hooks/useRedux';
import { useTranslation } from 'react-i18next';

export const SingComponent = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          dispatch(changeLoginStatus('sign-in'));
        }}
      >
        {t('login.signIn')}
      </Button>
      <Button
        className={styles.signUpButton}
        type="button"
        onClick={() => {
          dispatch(changeLoginStatus('sign-up'));
        }}
      >
        {t('login.signUp')}
      </Button>
    </>
  );
};
