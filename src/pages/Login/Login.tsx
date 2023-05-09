import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import styles from './Login.module.css';
import classNames from 'classnames';
import { changeLoginStatus } from '@/store/stateSlice';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { ResetPassword } from './ResetPassword';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '@/db';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/BasicComponents/Button';

export const Login = () => {
  const status = useAppSelector((state) => state.userState.loginStatus);
  const dispatch = useAppDispatch();
  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.open]: status === 'sign-in' || status === 'sign-up' || status === 'reset-password',
      })}
      onClick={() => {
        dispatch(changeLoginStatus(''));
      }}
    >
      <div className={styles.loginWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title}>Welcome!</div>
        {status === 'sign-in' && <SignIn />}
        {status === 'sign-up' && <SignUp />}
        {status === 'reset-password' && <ResetPassword />}
        <Button onClick={logout}>Log out</Button>
      </div>
    </div>
  );
};
