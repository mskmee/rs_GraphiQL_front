import React from 'react';
import { Editor } from './Editor';
import styles from './EditorPage.module.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@/components/BasicComponents/ErrorFallback';
import { toast } from 'react-toastify';
import { Loader } from '@/components/Loader';
import { Docs } from './Docs/Docs';
import { useQuery } from '@tanstack/react-query';
import { apiController } from '@/api/apiController';

const onError = (error: Error) => {
  toast(error.message, { type: 'error' });
};

export const EditorPage = () => {
  const schemaResponse = useQuery(['getSchema'], apiController.getSchema);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
      <React.Suspense fallback={<Loader />}>
        <div className={styles.wrapper}>
          <Docs schemaResponse={schemaResponse} />
          <Editor schemaResponse={schemaResponse} />
        </div>
      </React.Suspense>
    </ErrorBoundary>
  );
};
