import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';
import { Editor } from './Editor';
import { ErrorFallback } from '@/components/BasicComponents/ErrorFallback';
import { Docs } from './Docs/Docs';
import { useQuery } from '@tanstack/react-query';
import { apiController } from '@/api/apiController';

import styles from './EditorPage.module.css';

const onError = (error: Error) => {
  toast(error.message, { type: 'error' });
};

export const EditorPage = () => {
  const { data } = useQuery(['getSchema'], apiController.getSchema);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
      <div className={styles.wrapper}>
        <Docs schema={data} />
        <Editor schema={data} />
      </div>
    </ErrorBoundary>
  );
};
