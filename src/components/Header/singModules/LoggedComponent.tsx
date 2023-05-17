import React, { useEffect } from 'react';
import { Button } from '@/components/BasicComponents/Button';
import { auth } from '@/db';
import { useSignOut } from 'react-firebase-hooks/auth';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';
import { changeIsUserLogged, changeLoginStatus, changeUserName } from '@/store/userSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import styles from '../Header.module.css';

export const LoggedComponent = () => {
  const dispatch = useAppDispatch();
  const [singOut, isLoading, err] = useSignOut(auth);
  const userName = useAppSelector((state) => state.userState.userName);

  const onSingOut = async () => {
    const isSingOut = await singOut();
    if (isSingOut) {
      dispatch(changeUserName(''));
      dispatch(changeIsUserLogged(false));
      dispatch(changeLoginStatus(''));
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
        <Button type="button" onClick={onSingOut}>
          Log out
        </Button>
      </div>
    </>
  );
};
