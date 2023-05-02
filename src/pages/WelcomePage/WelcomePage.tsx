import styles from './WelcomePage.module.css';
import { Header } from '@/components/Header/Header';
import bgImage from '@/assets/images/graphiQL-bg.jpg';
import arrowImage from '@/assets/images/arrow.png';
import { useCallback, useState } from 'react';
import { Login } from './Login';
import { Info } from './Info';

export const WelcomePage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState('');

  const openSignIn = useCallback(() => {
    setIsLoginOpen('sign-in');
  }, []);

  const openSignUp = useCallback(() => {
    setIsLoginOpen('sign-up');
  }, []);

  const closeLoginPage = useCallback(() => {
    setIsLoginOpen('');
  }, []);

  return (
    <div className={styles.wrapper}>
      <img className={styles.bgImage} src={bgImage} alt="Image" draggable="false" />
      <img className={styles.arrowImage} src={arrowImage} alt="Arrow" draggable="false" />
      <Header openSignIn={openSignIn} openSignUp={openSignUp} />
      <Login status={isLoginOpen} closeLoginPage={closeLoginPage} />
      <Info />
    </div>
  );
};
