import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { memo } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import logo from '@/assets/icons/graphiQL-logo.png';
import { SingComponent } from './singModules/SingComponent';
import { LoggedComponent } from './singModules/LoggedComponent';

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
