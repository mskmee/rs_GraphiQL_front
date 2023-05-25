import { useState } from 'react';
import styles from './Docs.module.css';
import classNames from 'classnames';
import docsIcon from '@/assets/icons/archive.svg';
import { UseQueryResult } from '@tanstack/react-query';
import { GraphQLField, GraphQLSchema, GraphQLType } from 'graphql';
import { RootTypesIcon, TypesIcon } from './DocsIcons';
import { Query } from './Query';
import { Types } from './Types';

interface DocsProps {
  schemaResponse: UseQueryResult<GraphQLSchema, unknown>;
}

export type HistoryType = (
  | { element: GraphQLType; type: 'type' }
  | { element: GraphQLField<unknown, unknown>; type: 'field' }
)[];

export const Docs = ({ schemaResponse }: DocsProps) => {
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isQueryOpen, setIsQueryOpen] = useState(false);
  const [isTypesOpen, setIsTypesOpen] = useState(false);
  const [openQuery, setOpenQuery] = useState<string | null>('Query');
  const [openType, setOpenType] = useState<string | null>(null);
  const [openField, setOpenField] = useState<string | null>(null);
  const [queryDescription, setQueryDescription] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryType>([]);

  //console.log(schemaResponse.data);
  const schema = schemaResponse.data;

  const queryTypeName = schema?.getQueryType()?.name;
  //const types = schema?.getQueryType()?.getFields() as object;
  const typeMap = schema?.getTypeMap() as object;

  const onHistoryChange = (value: HistoryType) => {
    setHistory(value);
    console.log('HISTORY:', history);
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
      {isDocsOpen && (
        <div className={styles.docs}>
          <h2 className={styles.docsTitle}>Docs</h2>
          <div className={styles.docsInfo}>
            {!isQueryOpen && !isTypesOpen && (
              <div className={styles.typesWrapper}>
                <div className={styles.subtitle}>
                  <RootTypesIcon />
                  Root types
                </div>
                <div className={styles.query}>
                  query:
                  <button
                    className={classNames(styles.button, styles.fieldButton)}
                    type="button"
                    onClick={() => {
                      setIsQueryOpen(true);
                      setOpenType('Query');
                      setHistory([...history, typeMap['Query']]); // todo тут объект типа Query
                    }}
                  >
                    {queryTypeName}
                  </button>
                </div>

                <div className={styles.subtitle}>
                  <TypesIcon />
                  All schema types
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
                            setIsQueryOpen(true);
                            setOpenType(el.name);
                            setHistory([...history, el]);
                          }}
                        >
                          {el.name}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
            {isQueryOpen && (
              <Types
                schema={schema}
                history={history}
                onHistoryChange={onHistoryChange}
                openField={openField}
                openType={openType}
                onTypeOpen={(typeName) => setOpenType(typeName)}
                onFieldOpen={(fieldName) => setOpenField(fieldName)}
                onClose={() => setIsQueryOpen(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
