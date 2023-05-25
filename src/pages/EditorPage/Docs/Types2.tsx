import styles from './Docs.module.css';
import classNames from 'classnames';
import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLType,
} from 'graphql';
import { useState } from 'react';
import leftIcon from '@/assets/icons/left.svg';

interface TypesProps {
  schema: GraphQLSchema | undefined;
  history: string[];
  onHistoryChange: (value: string[]) => void;
  openField: string | null;
  openType: string | null;
  onFieldOpen: (el: string | null) => void;
  onTypeOpen: (el: string | null) => void;
  onClose: () => void;
}

export const Types = ({
  schema,
  history,
  onHistoryChange,
  openField,
  openType,
  onClose,
  onFieldOpen,
  onTypeOpen,
}: TypesProps) => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(openType);

  const typeMap = schema?.getTypeMap() as object;
  const currentTypeObject = typeMap[openType];

  const getFieldsDescription = (type: string) => {
    const openTypeFields = typeMap[type];

    if (
      openTypeFields instanceof GraphQLObjectType ||
      openTypeFields instanceof GraphQLInputObjectType
    ) {
      return openTypeFields.getFields();
    }
    // todo добавить массивы и пр.

    return openTypeFields.description;
  };

  const getFieldType = (type: GraphQLType) => {
    if (type instanceof GraphQLNonNull) {
      // todo рекурсия
      return { type: 'NonNull', displayName: 'NonNull' };
    }

    if (type instanceof GraphQLList) {
      return { type: 'List', displayName: `[List]` };
    }

    return { type: type.name, displayName: type.name };
  };

  return (
    <div>
      <button
        className={classNames(styles.button, styles.backButton)}
        type="button"
        onClick={() => {
          setCurrentCategory(openType);

          if (history.length === 1) {
            onTypeOpen(null);
            onFieldOpen(null);
            onClose();
            onHistoryChange(['Docs']);
          } else {
            history.pop();
            onHistoryChange(history);
            onTypeOpen(history[history.length - 1]);
          }

          // todo сюда переход на предыдущую категорию
        }}
      >
        <img src={leftIcon} alt="Back" />
        {history[history.length - 2]}
      </button>
      <div className={styles.title}>{currentCategory}</div>
      {openField && (
        <>
          <div className={styles.subtitle}>Type</div>
          <button
            className={classNames(styles.button, styles.fieldButton)}
            type="button"
            onClick={() => {
              onHistoryChange([...history, openType]);
              onTypeOpen(getFieldType(currentTypeObject).type);
              onFieldOpen(null);
              setCurrentCategory(getFieldType(currentTypeObject).type);
            }}
          >
            <div>{getFieldType(currentTypeObject).displayName}</div>
          </button>
        </>
      )}
      {!openField && openType && typeof getFieldsDescription(openType) === 'string' && (
        <div className={styles.description}>{getFieldsDescription(openType)}</div>
      )}
      {!openField && openType && typeof getFieldsDescription(openType) !== 'string' && (
        <>
          <div className={styles.subtitle}>Fields</div>
          {Object.values(getFieldsDescription(openType)).map((el) => {
            return (
              <div key={el.name} className={styles.types}>
                <button
                  className={classNames(styles.button, styles.fieldButton)}
                  type="button"
                  onClick={() => {
                    onHistoryChange([...history, el.name]);
                    onFieldOpen(el.name);
                    setCurrentCategory(el.name);
                  }}
                >
                  <div>{el.name}:</div>
                </button>
                <button
                  className={classNames(styles.button, styles.typesButton)}
                  type="button"
                  onClick={() => {
                    onHistoryChange([...history, getFieldType(currentTypeObject).type]);
                    onFieldOpen(null);
                    setCurrentCategory(getFieldType(currentTypeObject).type);
                    onTypeOpen(getFieldType(currentTypeObject).type); // todo сюда функцию с типом
                  }}
                >
                  <div>
                    {
                      getFieldType(currentTypeObject)
                        .displayName /* todo фигачить кучу ифов если массив и т.п. */
                    }
                  </div>
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
