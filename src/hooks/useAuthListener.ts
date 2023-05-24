import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from './useRedux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { changeIsUserLogged, changeUserName } from '@/store/userSlice';
import { toast } from 'react-toastify';

export const useAuthListener = () => {
  const [wasUserLogged, setWasUserLogged] = useState(false);
  const isLogged = useAppSelector((state) => state.userState.isUserLogged);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const notificationValue = t('info.tokenExpired');
  const isUserWillNavigate =
    wasUserLogged && location.pathname !== '/auth' && location.pathname !== '/';

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(changeIsUserLogged(true));
        dispatch(changeUserName(user.displayName ?? 'Unknown'));
        setWasUserLogged(true);
        return;
      }
      if (isUserWillNavigate) {
        setWasUserLogged(false);
        navigate('/');
        dispatch(changeIsUserLogged(false));
        dispatch(changeUserName(''));
        toast(notificationValue, { type: 'info' });
      }
    });
  }, [dispatch, navigate, location, isUserWillNavigate, notificationValue]);

  return isLogged;
};
