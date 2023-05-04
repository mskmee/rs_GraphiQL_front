import { Button } from '@/components/BasicComponents/Button';
import styles from './Header.module.css';
import logo from '@/assets/icons/graphiQL-logo.png';
import { NavLink } from 'react-router-dom';
import { memo } from 'react';

interface HeaderProps {
  openSignIn: () => void;
  openSignUp: () => void;
}

export const Header = memo(function Header({ openSignIn, openSignUp }: HeaderProps) {
  return (
    <header className={styles.wrapper}>
      <NavLink className={styles.logo} to="/">
        <img className={styles.logoImage} src={logo} alt="GraphiQL logo" />
      </NavLink>
      <div className={styles.buttonsWrapper}>
        <Button text="Sign In" type="button" onClick={openSignIn} />
        <Button
          buttonClass={styles.signUpButton}
          text="Sign Up"
          type="button"
          onClick={openSignUp}
        />
      </div>
    </header>
  );
});
