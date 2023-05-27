import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from './useRedux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { changeIsUserLogged, changeUserName } from '@/store/userSlice';
import { toast } from 'react-toastify';
import { checkUserData } from '@/db';

export const useAuthListener = () => {
  const [wasUserLogged, setWasUserLogged] = useState(false);
  const isLogged = useAppSelector((state) => state.userState.isUserLogged);
  const userName = useAppSelector((state) => state.userState.userName);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const notificationValue = t('info.tokenExpired');
  const isUserWillNavigate = wasUserLogged && location.pathname === '/editor';

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      // if (user) {
      //   const checkUserInDb = async (user: User) => {
      //     const isUserVerificate = await checkUserData(user);
      //     if (isUserVerificate) {
      //       dispatch(changeIsUserLogged(true));
      //       dispatch(changeUserName(user.displayName || userName || 'Unknown'));
      //       setWasUserLogged(true);
      //     }
      //   };
      //   checkUserInDb(user);
      //   return;
      // }
      if (isUserWillNavigate) {
        setWasUserLogged(false);
        navigate('/');
        dispatch(changeIsUserLogged(false));
        dispatch(changeUserName(''));
        toast(notificationValue, { type: 'info' });
      }
    });
  }, []);

  return isLogged;
};
