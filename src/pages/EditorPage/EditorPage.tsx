import React from 'react';
import { Editor } from './Editor';
import styles from './EditorPage.module.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@/components/BasicComponents/ErrorFallback';
import { toast } from 'react-toastify';
import { Loader } from '@/components/Loader';

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
