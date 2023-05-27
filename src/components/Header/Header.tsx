import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { changeLang } from '@/store/userSlice';
import { SingComponent, LoggedComponent } from './singModules';

import logo from '@/assets/icons/graphiQL-logo.png';
import styles from './Header.module.css';
import classNames from 'classnames';

export const Header = () => {
  const isUserLogged = useAppSelector((state) => state.userState.isUserLogged);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = useAppSelector((state) => state.userState.lang);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { i18n } = useTranslation();

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
        {isUserLogged ? <LoggedComponent /> : <SingComponent />}
        <div className={styles.langWrapper}>
          <button
            type="button"
            className={classNames(styles.langButton, { [styles.active]: lang === 'en' })}
            onClick={() => {
              dispatch(changeLang('en'));
              i18n.changeLanguage('en');
            }}
          >
            {t('lang.en')}
          </button>
          <button
            type="button"
            className={classNames(styles.langButton, { [styles.active]: lang === 'ru' })}
            onClick={() => {
              dispatch(changeLang('ru'));
              i18n.changeLanguage('ru');
            }}
          >
            {t('lang.ru')}
          </button>
        </div>
      </div>
    </header>
  );
};
