import { memo, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SingComponent, LoggedComponent } from './singModules';

import logo from '@/assets/icons/graphiQL-logo.png';
import styles from './Header.module.css';
import classNames from 'classnames';

interface HeaderProps {
  isUserLogged: boolean;
}

export const Header = memo(function Header({ isUserLogged }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = localStorage.getItem('i18nextLng') || 'en';
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (headerRef.current) {
        headerRef.current.classList.toggle(styles.headerScroll, scrollPosition > 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header ref={headerRef} className={styles.wrapper}>
      <NavLink className={styles.logo} to="/">
        <img className={styles.logoImage} src={logo} alt="GraphiQL logo" />
      </NavLink>
      <button
        type="button"
        className={classNames(styles.menuButton, { [styles.hidden]: isMenuOpen })}
        onClick={() => setIsMenuOpen(true)}
      >
        <span className={styles.menuLine}></span>
        <span className={styles.menuLine}></span>
        <span className={styles.menuLine}></span>
      </button>
      <div className={classNames(styles.buttonsWrapper, { [styles.open]: isMenuOpen })}>
        <button type="button" className={styles.closeButton} onClick={() => setIsMenuOpen(false)}>
          <span className={styles.closeLine}></span>
          <span className={styles.closeLine}></span>
        </button>
        {isUserLogged ? (
          <LoggedComponent onMenuClose={() => setIsMenuOpen(false)} />
        ) : (
          <SingComponent onMenuClose={() => setIsMenuOpen(false)} />
        )}
        <div className={styles.langWrapper}>
          <button
            type="button"
            className={classNames(styles.langButton, { [styles.active]: lang === 'en' })}
            onClick={() => {
              i18n.changeLanguage('en');
            }}
          >
            {t('lang.en')}
          </button>
          <button
            type="button"
            className={classNames(styles.langButton, { [styles.active]: lang === 'ru' })}
            onClick={() => {
              i18n.changeLanguage('ru');
            }}
          >
            {t('lang.ru')}
          </button>
        </div>
      </div>
    </header>
  );
});
