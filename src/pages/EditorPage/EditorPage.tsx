import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';
import { Editor } from './Editor';
import { ErrorFallback } from '@/components/BasicComponents/ErrorFallback';
import { Loader } from '@/components/Loader';

import styles from './EditorPage.module.css';

const onError = (error: Error) => {
  toast(error.message, { type: 'error' });
};

export const EditorPage = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
    <React.Suspense fallback={<Loader />}>
      <div className={styles.wrapper}>
        <Editor />
      </div>
    </React.Suspense>
  </ErrorBoundary>
);
