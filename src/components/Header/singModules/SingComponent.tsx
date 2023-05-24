import React from 'react';
import { Button } from '@/components/BasicComponents/Button';
import { changeLoginStatus } from '@/store/userSlice';
import styles from '../Header.module.css';
import { useAppDispatch } from '@/hooks/useRedux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const SingComponent = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <>
      <Link to={'/auth'}>
        <Button
          type="button"
          onClick={() => {
            dispatch(changeLoginStatus('sign-in'));
          }}
        >
          {t('login.signIn')}
        </Button>
      </Link>
      <Link to={'/auth'}>
        <Button
          className={styles.signUpButton}
          type="button"
          onClick={() => {
            dispatch(changeLoginStatus('sign-up'));
          }}
        >
          {t('login.signUp')}
        </Button>
      </Link>
    </>
  );
};
