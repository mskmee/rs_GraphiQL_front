import { Button } from '@/components/BasicComponents/Button';
import styles from './Header.module.css';
import logo from '@/assets/icons/graphiQL-logo.png';
import { NavLink } from 'react-router-dom';
import { memo } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import { changeLoginStatus } from '@/store/stateSlice';

export const Header = memo(function Header() {
  const dispatch = useAppDispatch();

  return (
    <header className={styles.wrapper}>
      <NavLink className={styles.logo} to="/">
        <img className={styles.logoImage} src={logo} alt="GraphiQL logo" />
      </NavLink>
      <div className={styles.buttonsWrapper}>
        <Button
          type="button"
          onClick={() => {
            dispatch(changeLoginStatus('sign-in'));
          }}
        >
          Sign in
        </Button>
        <Button
          className={styles.signUpButton}
          type="button"
          onClick={() => {
            dispatch(changeLoginStatus('sign-up'));
          }}
        >
          Sign up
        </Button>
      </div>
    </header>
  );
});
