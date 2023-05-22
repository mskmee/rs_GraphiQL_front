import React, { useEffect } from 'react';
import { Button } from '@/components/BasicComponents';
import styles from '../Login.module.css';
import googleLogo from '@/assets/icons/google.png';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/db';
import { Loader } from '@/components/Loader';
import { changeIsUserLogged, changeLoginStatus, changeUserName } from '@/store/userSlice';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/hooks/useRedux';
import { useTranslation } from 'react-i18next';

export const SingInWithGoogle = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [signInWithGoogle, user, isLoading, error] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user) {
      dispatch(changeUserName(user.user.displayName ?? 'no name'));
      dispatch(changeIsUserLogged(true));
      dispatch(changeLoginStatus(''));
    }
    if (error) {
      toast(error.message, { type: 'error' });
    }
  }, [user, dispatch, error]);

  return (
    <>
      {isLoading && <Loader />}
      <Button type="button" className={styles.googleButton} onClick={() => signInWithGoogle()}>
        <img width="20px" src={googleLogo} alt="Google" />
        {t('login.google')}
      </Button>
    </>
  );
};
