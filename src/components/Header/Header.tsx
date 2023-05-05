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
          text="Sign in"
          type="button"
          onClick={() => {
            dispatch(changeLoginStatus({ status: 'sign-in' }));
          }}
        />
        <Button
          buttonClass={styles.signUpButton}
          text="Sign up"
          type="button"
          onClick={() => {
            dispatch(changeLoginStatus({ status: 'sign-up' }));
          }}
        />
      </div>
    </header>
  );
});
