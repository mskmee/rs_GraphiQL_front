import { useState } from 'react';
import styles from './Docs.module.css';
import classNames from 'classnames';
import docsIcon from '@/assets/icons/archive.svg';
import { UseQueryResult } from '@tanstack/react-query';
import { GraphQLField, GraphQLSchema } from 'graphql';
import { RootTypesIcon, TypesIcon } from './DocsIcons';
import { Types } from './Types';
import { BackButton } from './BackButton';
import { GraphQLNonNestedType } from '@/types/GraphQLNonNestedType';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [history, setHistory] = useState<ReadonlyArray<HistoryType>>([]);

  const schema = schemaResponse.data;
  const queryType = schema?.getQueryType() || null;
  const typeMap = schema?.getTypeMap() as object;

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
                <div className={styles.subtitle}>
                  <RootTypesIcon />
                  {t('docs.rootTypes')}
                </div>
                <div className={styles.query}>
                  query:
                  <button
                    className={classNames(styles.button, styles.fieldButton)}
                    type="button"
                    onClick={() => {
                      setHistory([...history, { element: queryType, type: 'type' }]);
                    }}
                  >
                    {queryType.name}
                  </button>
                </div>
                <div className={styles.subtitle}>
                  <TypesIcon />
                  {t('docs.allTypes')}
                </div>
                <div>
                  {Object.values(typeMap)
                    .filter((el) => el.name[0] !== '_')
                    .map((el) => {
                      return (
                        <button
                          key={el.name}
                          className={classNames(styles.button, styles.fieldButton)}
                          type="button"
                          onClick={() => {
                            setHistory([...history, { element: el, type: 'type' }]);
                          }}
                        >
                          {el.name}
                        </button>
                      );
                    })}
                </div>
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
