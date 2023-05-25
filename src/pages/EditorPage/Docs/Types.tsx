import styles from './Docs.module.css';
import {
  GraphQLField,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLType,
} from 'graphql';
import { FieldButton } from './FieldButton';
import { TypeButton } from './TypeButton';
import { HistoryType } from './Docs';

interface TypesProps {
  lastItem: HistoryType;
  onHistoryPush: (value: HistoryType) => void;
}

export const Types = ({ lastItem, onHistoryPush }: TypesProps) => {
  const getTypeFields = (openType: GraphQLType | null) => {
    if (
      openType &&
      (openType instanceof GraphQLObjectType || openType instanceof GraphQLInputObjectType)
    ) {
      return openType.getFields();
    }

    return null;
  };

  const getDescription = (openType: GraphQLType | GraphQLField<unknown, unknown> | null) => {
    if (!openType || openType instanceof GraphQLList || openType instanceof GraphQLNonNull) {
      return null;
    }

    return openType.description;
  };

  const description = getDescription(lastItem.element);
  const fields = lastItem.type === 'type' ? getTypeFields(lastItem.element) : null;

  return (
    <>
      <div className={styles.title}>{lastItem.element.name}</div>
      {description && <div className={styles.description}>{description}</div>}
      {lastItem.type === 'field' && (
        <>
          <div className={styles.subtitle}>Type</div>
          <TypeButton element={lastItem.element.type} onHistoryPush={onHistoryPush} />
        </>
      )}
      {lastItem.type === 'type' && fields && (
        <>
          <div className={styles.subtitle}>Fields</div>
          {Object.values(fields).map((el) => {
            return (
              <div key={el.name} className={styles.types}>
                <FieldButton field={el} onHistoryPush={onHistoryPush} />
                <TypeButton element={el.type} onHistoryPush={onHistoryPush} />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
