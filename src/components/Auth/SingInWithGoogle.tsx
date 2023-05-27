import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useAppDispatch } from '@/hooks/useRedux';
import { changeIsUserLogged, changeUserName } from '@/store/userSlice';
import { Button } from '@/components/BasicComponents';
import { auth } from '@/db';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';

import styles from './Styles.module.css';
import googleLogo from '@/assets/icons/google.png';

export const SingInWithGoogle = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signInWithGoogle, userCredential, isLoading, error] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (userCredential) {
      dispatch(changeUserName(userCredential.user.displayName ?? 'Unknown'));
      dispatch(changeIsUserLogged(true));
      navigate('/');
    }
    if (error) {
      toast(error.message, { type: 'error' });
    }
  }, [error, userCredential, navigate, dispatch]);

  const loginHandler = () => {
    signInWithGoogle();
  };

  return (
    <>
      {isLoading && <Loader />}
      <Button type="button" className={styles.googleButton} onClick={loginHandler}>
        <img width="20px" src={googleLogo} alt="Google" />
        {t('login.google')}
      </Button>
    </>
  );
};
