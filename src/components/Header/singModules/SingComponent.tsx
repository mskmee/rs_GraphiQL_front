import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useRedux';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/BasicComponents/Button';
import { changeLoginStatus } from '@/store/userSlice';

import styles from '../Header.module.css';

interface SingComponentProps {
  onMenuClose: () => void;
}

export const SingComponent = ({ onMenuClose }: SingComponentProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <>
      <Link to={'/auth'}>
        <Button
          type="button"
          onClick={() => {
            dispatch(changeLoginStatus('sign-in'));
            onMenuClose();
          }}
        >
          {t('login.signIn')}
        </Button>
      </Link>
      <Link to={'/auth'}>
        <Button
          className={styles.signUpButton}
          type="button"
          onClick={() => {
            dispatch(changeLoginStatus('sign-up'));
            onMenuClose();
          }}
        >
          {t('login.signUp')}
        </Button>
      </Link>
    </>
  );
};
