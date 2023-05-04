import { Button } from '@/components/BasicComponents/Button';
import styles from './NotFoundPage.module.css';
import notFoundImage from '@/assets/images/not-found.jpg';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

export const NotFoundPage = () => {
  const [redirectToMain, setRedirectToMain] = useState(false);

  if (redirectToMain) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404</h1>
      <div className={styles.message}>Something went wrong</div>
      <Button
        text="Return to main page"
        type="button"
        onClick={() => setRedirectToMain(true)}
      ></Button>
      <img
        className={styles.notFoundImage}
        src={notFoundImage}
        alt="Page not found"
        draggable="false"
      ></img>
    </div>
  );
};
