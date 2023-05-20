import { useErrorBoundary } from 'react-error-boundary';
import styles from './ErrorFallback.module.css';
import errorImg from '@/assets/images/not-found.jpg';
import { Button } from './Button';

interface IErrorFallback {
  error: Error;
}
export const ErrorFallback = ({ error }: IErrorFallback) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className={styles.wrapper} role="alert">
      <img className={styles.img} src={errorImg} alt="Got error" />
      <h2>Something went wrong:</h2>
      <pre style={{ color: 'red' }}>{error?.message ?? 'error'}</pre>
      <Button onClick={resetBoundary}>Try again</Button>
    </div>
  );
};
