import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import styles from './Login.module.css';
import classNames from 'classnames';
import { changeLoginStatus } from '@/store/userSlice';
import { ResetPassword, SignIn, SignUp } from './loginComponents';
import { useTranslation } from 'react-i18next';

export const Login = () => {
  const status = useAppSelector((state) => state.userState.loginStatus);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
        <div className={styles.title}>{t('login.welcome')}</div>
        {status === 'sign-in' && <SignIn />}
        {status === 'sign-up' && <SignUp />}
        {status === 'reset-password' && <ResetPassword />}
      </div>
    </div>
  );
};
