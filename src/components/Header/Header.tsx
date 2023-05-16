import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { memo } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { SingComponent, LoggedComponent } from './singModules';
import logo from '@/assets/icons/graphiQL-logo.png';

export const Header = memo(function Header() {
  const isUserLogged = useAppSelector((state) => state.userState.isUserLogged);

  return (
    <header className={styles.wrapper}>
      <NavLink className={styles.logo} to="/">
        <img className={styles.logoImage} src={logo} alt="GraphiQL logo" />
      </NavLink>
      <div className={styles.buttonsWrapper}>
        {isUserLogged ? <LoggedComponent /> : <SingComponent />}
      </div>
    </header>
  );
});
