import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-firebase-hooks/auth';
import { Button } from '@/components/BasicComponents/Button';
import { auth } from '@/db';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';
import { changeIsUserLogged, changeLoginStatus, changeUserName } from '@/store/userSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';

import styles from '../Header.module.css';

interface LoggedComponentProps {
  onMenuClose: () => void;
}

export const LoggedComponent = ({ onMenuClose }: LoggedComponentProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [singOut, isLoading, err] = useSignOut(auth);
  const userName = useAppSelector((state) => state.userState.userName);

  const onSingOut = async () => {
    const isSingOut = await singOut();
    if (isSingOut) {
      dispatch(changeUserName(''));
      dispatch(changeIsUserLogged(false));
      dispatch(changeLoginStatus(''));
      navigate('/');
    }
  };

  useEffect(() => {
    if (err) {
      toast(err.message, { type: 'error' });
    }
  }, [err]);

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.nav}>
        <div>{userName}</div>
        <Button
          type="button"
          onClick={() => {
            onSingOut();
            onMenuClose();
          }}
        >
          {t('login.logout')}
        </Button>
      </div>
    </>
  );
};
