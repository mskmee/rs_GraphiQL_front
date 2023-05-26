import styles from './Docs.module.css';
import classNames from 'classnames';
import { GraphQLSchema } from 'graphql';
import { useState } from 'react';
import leftIcon from '@/assets/icons/left.svg';

interface QueryProps {
  schema: GraphQLSchema | undefined;
  history: string[];
  onHistoryChange: (value: string[]) => void;
  openField: string | null;
  openType: string | null;
  onFieldOpen: (el: string | null) => void;
  onTypeOpen: (el: string | null) => void;
  onClose: () => void;
}

export const Query = ({
  schema,
  history,
  onHistoryChange,
  openField,
  openType,
  onClose,
  onFieldOpen,
  onTypeOpen,
}: QueryProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentCategory, setCurrentCategory] = useState<string | null>('Docs');

  const queryFields = schema?.getQueryType()?.getFields() as object;
  const typeMap = schema?.getTypeMap() as object;

  const getField = (field: string) => {
    const openField = Object.values(queryFields).find((el) => el.name === field);
    return openField;
  };

  const getFieldType = (type: string, field: string) => {
    const openTypeFields = Object.values(typeMap).find((el) => el.name === type);
    const fields = openTypeFields.getFields();
    const openField = Object.values(fields).find((el) => el.name === field);
    return openField.type.name;
  };

  return (
    <>
      <button
        className={classNames(styles.button, styles.backButton)}
        type="button"
        onClick={() => {
          if (history.length === 1) {
            onTypeOpen(null);
            onFieldOpen(null);
            onClose();
            onHistoryChange(['Docs']);
          } else {
            history.pop();
            onHistoryChange(history);
            onFieldOpen(history[history.length - 1]);
          }

          setCurrentCategory('Docs');
        }}
      >
        <img src={leftIcon} alt="Back" />
        {history[history.length - 2]}
      </button>
      {!openType &&
        openField === 'query' &&
        Object.values(queryFields).map((el) => {
          return (
            <div key={el.name} className={styles.types}>
              <button
                className={classNames(styles.button, styles.fieldButton)}
                type="button"
                onClick={() => {
                  onHistoryChange([...history, el.name]);
                  setCurrentCategory(el.name);
                  onFieldOpen(el.name);
                }}
              >
                {el.name}:
              </button>
              <button
                className={classNames(styles.button, styles.typesButton)}
                type="button"
                onClick={() => {
                  onHistoryChange([...history, el.type.name]);
                  setCurrentCategory(el.type.name);
                  onTypeOpen(el.type.name);
                  onFieldOpen(null);
                }}
              >
                {el.type.name || el.type.ofType.name}
              </button>
            </div>
          );
        })}
      {openField !== 'query' && (
        <>
          <div className={styles.description}>{getField(openField).description}</div>
          <div className={styles.subtitle}>Type</div>
          <button
            className={classNames(styles.button, styles.fieldButton)}
            type="button"
            onClick={() => {
              onHistoryChange([...history, getFieldType(openType, openField)]);
              onFieldOpen(null);
              //onTypeOpen(getField(openField).type.name); // todo сюда функцию с типом
              onTypeOpen(getFieldType(openType, openField));
              setCurrentCategory(getFieldType(openType, openField));
            }}
          >
            <div>{getField(openField).type.name || 'тип' /* сюда функцию с типом */}</div>
          </button>
        </>
      )}
    </>
  );
};
