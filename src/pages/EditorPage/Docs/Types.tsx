import styles from './Docs.module.css';
import { GraphQLInputObjectType, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { BackButton } from './BackButton';
import { FieldButton } from './FieldButton';
import { TypeButton } from './TypeButton';
import { HistoryType } from './Docs';

interface TypesProps {
  schema: GraphQLSchema;
  history: HistoryType;
  onHistoryChange: (value: HistoryType) => void;
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
  const typeMap = schema?.getTypeMap();

  const getTypeFields = (openType: string) => {
    const type = typeMap[openType];

    if (type instanceof GraphQLObjectType || type instanceof GraphQLInputObjectType) {
      return type.getFields();
    } else {
      return type.description;
    }
  };

  const getFieldType = (field: string) => {
    if (field === 'status') {
      debugger;
    }
    const fields = typeMap[openType].getFields();
    if (fields) {
      const type = fields[field];
      if (typeof type === 'undefined') {
        debugger;
      }
      return type;
    }
    return null;
  };

  return (
    <>
      <BackButton
        history={history}
        onTypeOpen={onTypeOpen}
        onFieldOpen={onFieldOpen}
        onClose={onClose}
        onHistoryChange={onHistoryChange}
      />
      <div className={styles.title}>{history[history.length - 1].name}</div>
      {openField && !openType && (
        <>
          <div className={styles.subtitle}>Type</div>
          <TypeButton
            element={getFieldType(openField)} // todo сюда объект с типом текущего поля
            history={history}
            onFieldOpen={onFieldOpen}
            onTypeOpen={onTypeOpen}
            onHistoryChange={onHistoryChange}
          />
        </>
      )}
      {openType && typeof getTypeFields(openType) === 'string' && (
        <div className={styles.description}>{getTypeFields(openType)}</div>
      )}
      {openType && typeof getTypeFields(openType) !== 'string' && (
        <>
          <div className={styles.subtitle}>Fields</div>
          {Object.values(getTypeFields(openType)).map((el) => {
            return (
              <div key={el.name} className={styles.types}>
                <FieldButton
                  element={el}
                  history={history}
                  onFieldOpen={onFieldOpen}
                  onTypeOpen={onTypeOpen}
                  onHistoryChange={onHistoryChange}
                />
                <TypeButton
                  element={el.type}
                  history={history}
                  onFieldOpen={onFieldOpen}
                  onTypeOpen={onTypeOpen}
                  onHistoryChange={onHistoryChange}
                />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
