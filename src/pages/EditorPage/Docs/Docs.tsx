import { useState } from 'react';
import styles from './Docs.module.css';
import classNames from 'classnames';
import docsIcon from '@/assets/icons/archive.svg';
import { UseQueryResult } from '@tanstack/react-query';
import { GraphQLField, GraphQLSchema } from 'graphql';
import { Types } from './Types';
import { BackButton } from './BackButton';
import { GraphQLNonNestedType } from '@/types/GraphQLNonNestedType';
import { RootTypes } from './RootTypes';
import { AllRootTypes } from './AllRootTypes';

interface DocsProps {
  schemaResponse: UseQueryResult<GraphQLSchema, unknown>;
}

export type HistoryType =
  | {
      element: GraphQLNonNestedType;
      type: 'type';
    }
  | { element: GraphQLField<unknown, unknown>; type: 'field' };

export const Docs = ({ schemaResponse }: DocsProps) => {
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [history, setHistory] = useState<ReadonlyArray<HistoryType>>([]);

  const schema = schemaResponse.data;
  const queryType = schema?.getQueryType() || null;

  const onHistoryPush = (el: HistoryType) => {
    setHistory([...history, el]);
  };

  const onHistoryBack = () => {
    setHistory(history.slice(0, -1));
  };

  return (
    <div className={classNames(styles.docsWrapper, { [styles.open]: isDocsOpen })}>
      <button
        type="button"
        title="Docs"
        className={styles.docsButton}
        onClick={() => setIsDocsOpen(!isDocsOpen)}
      >
        <img src={docsIcon} alt="Docs" />
      </button>
      {isDocsOpen && (!queryType || !schema) && (
        <div className={styles.docsTitle}>Docs not found</div>
      )}
      {isDocsOpen && queryType && schema && (
        <div className={styles.docs}>
          <h2 className={styles.docsTitle}>Docs</h2>
          <div className={styles.docsInfo}>
            {history.length === 0 && (
              <div className={styles.typesWrapper}>
                <RootTypes queryType={queryType} onHistoryPush={onHistoryPush} />
                <AllRootTypes schema={schema} onHistoryPush={onHistoryPush} />
              </div>
            )}
            {history.length > 0 && (
              <>
                <BackButton onHistoryBack={onHistoryBack}>
                  {history[history.length - 2]?.element.name || 'Docs'}
                </BackButton>
                <Types lastItem={history[history.length - 1]} onHistoryPush={onHistoryPush} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
