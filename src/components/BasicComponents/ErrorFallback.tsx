import { useErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Button } from './Button';

import styles from './ErrorFallback.module.css';
import { useTranslation } from 'react-i18next';

interface IErrorFallback {
  error: Error;
}
export const ErrorFallback = ({ error }: IErrorFallback) => {
  const { t } = useTranslation();
  const { resetBoundary } = useErrorBoundary();
  const { reset } = useQueryErrorResetBoundary();

  return (
    <div onReset={reset} className={styles.wrapper} role="alert">
      <h2 className={styles.title}>{t('notFound.wrong')}</h2>
      <p className={styles.errorMessage} style={{ color: 'red' }}>
        {error?.message ?? 'error'}
      </p>
      <Button onClick={resetBoundary}>{t('login.return')}</Button>
    </div>
  );
};
