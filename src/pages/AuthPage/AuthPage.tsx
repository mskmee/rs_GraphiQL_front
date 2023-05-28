import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { changeLoginStatus } from '@/store/userSlice';
import { getAuthComponentFromStatus } from '@/utils/getAuthComponentFromStatus';
import { useTranslation } from 'react-i18next';

import styles from './AuthPage.module.css';
import classNames from 'classnames';

export const AuthPage = () => {
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
        {getAuthComponentFromStatus[status]}
      </div>
    </div>
  );
};
