import styles from './Header.module.css';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { SingComponent, LoggedComponent } from './singModules';
import logo from '@/assets/icons/graphiQL-logo.png';

export const Header = memo(function Header() {
  const isUserLogged = useAppSelector((state) => state.userState.isUserLogged);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.onscroll = handleScroll;

    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <header className={classNames(styles.wrapper, { [styles.headerScroll]: isScrolled })}>
      <NavLink className={styles.logo} to="/">
        <img className={styles.logoImage} src={logo} alt="GraphiQL logo" />
      </NavLink>
      <div className={styles.buttonsWrapper}>
        {isUserLogged ? <LoggedComponent /> : <SingComponent />}
      </div>
    </header>
  );
});
