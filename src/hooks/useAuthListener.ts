import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './useRedux';
import { useTranslation } from 'react-i18next';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { changeIsUserLogged, changeUserName } from '@/store/userSlice';

export const useAuthListener = () => {
  const [wasUserLogged, setWasUserLogged] = useState(false);
  const isLogged = useAppSelector((state) => state.userState.isUserLogged);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const notificationValue = t('info.tokenExpired');
  const isUserWillNavigate = wasUserLogged && location.pathname === '/editor';

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setWasUserLogged(true);
        return;
      }
      if (isUserWillNavigate) {
        setWasUserLogged(false);
        navigate('/');
        dispatch(changeIsUserLogged(false));
        dispatch(changeUserName(''));
      }
    });
  }, [dispatch, isUserWillNavigate, navigate, notificationValue]);

  return isLogged;
};
