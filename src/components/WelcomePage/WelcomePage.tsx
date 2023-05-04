import styles from './WelcomePage.module.css';
import { Header } from '@/components/Header/Header';
import bgImage from '@/assets/images/graphiQL-bg.jpg';
import arrowImage from '@/assets/images/arrow.png';
import rsLogo from '@/assets/images/rs-logo.png';
import { Authors } from './Authors';
import { useState } from 'react';
import { LoginPage } from '../LoginPage/LoginPage';

export const WelcomePage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState('');

  const openSignIn = () => {
    setIsLoginOpen('sign-in');
  };

  const openSignUp = () => {
    setIsLoginOpen('sign-up');
  };

  const closeLoginPage = () => {
    setIsLoginOpen('');
  };

  return (
    <div className={styles.wrapper}>
      <Header openSignIn={openSignIn} openSignUp={openSignUp} />
      <LoginPage status={isLoginOpen} closeLoginPage={closeLoginPage} />
      <img className={styles.bgImage} src={bgImage} alt="Image" draggable="false" />
      <img className={styles.arrowImage} src={arrowImage} alt="Arrow" draggable="false" />
      <div className={styles.info}>
        <div className={styles.about}>
          GraphiQL is Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
        <Authors />
        <div className={styles.sponsors}>
          <p>Sponsored by</p>
          <a href="https://rs.school/" target="_blank" rel="noreferrer">
            <img className={styles.rsImage} src={rsLogo} alt="The Rolling Scopes School" />
          </a>
        </div>
      </div>
    </div>
  );
};
