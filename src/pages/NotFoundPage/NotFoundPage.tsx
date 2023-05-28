import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/BasicComponents/Button';

import styles from './NotFoundPage.module.css';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const [redirectToMain, setRedirectToMain] = useState(false);
  const { t } = useTranslation();

  if (redirectToMain) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404</h1>
      <div className={styles.message}>{t('notFound.wrong')}</div>
      <Button type="button" onClick={() => setRedirectToMain(true)}>
        {t('notFound.return')}
      </Button>
    </div>
  );
};
