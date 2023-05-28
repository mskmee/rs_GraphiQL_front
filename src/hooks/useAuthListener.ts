import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './useRedux';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { changeIsUserLogged, changeUserName } from '@/store/userSlice';
import { getUserName } from '@/db';
import { DbProvidersIds } from '@/types/DbProvidersIds';

export const useAuthListener = () => {
  const isLogged = useAppSelector((state) => state.userState.isUserLogged);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isUserAuth = useRef(false);
  const isUserWillNavigate = isLogged && location.pathname === '/editor';

  useEffect(() => {
    const auth = getAuth();
    const getName = async (user: User) => {
      try {
        const name = await getUserName(user);
        dispatch(changeUserName(name));
      } catch {}
    };
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(changeIsUserLogged(true));
        const { providerId } = user.providerData[0];
        if ((providerId as DbProvidersIds) === 'password') {
          getName(user);
          return (isUserAuth.current = true);
        }
        dispatch(changeUserName(user.displayName ?? 'unknown'));
        return (isUserAuth.current = true);
      }
      if (isUserWillNavigate) {
        navigate('/');
        dispatch(changeIsUserLogged(false));
        dispatch(changeUserName(''));
      }
      return (isUserAuth.current = false);
    });
    return unsubscribe;
  }, [dispatch, isUserWillNavigate, navigate]);

  return isUserAuth.current;
};
