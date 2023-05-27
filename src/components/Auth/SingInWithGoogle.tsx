import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Button } from '@/components/BasicComponents';
import { auth } from '@/db';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';

import styles from './Styles.module.css';
import googleLogo from '@/assets/icons/google.png';

export const SingInWithGoogle = () => {
  const { t } = useTranslation();
  const [signInWithGoogle, _, isLoading, error] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (error) {
      toast(error.message, { type: 'error' });
    }
  }, [error]);

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
