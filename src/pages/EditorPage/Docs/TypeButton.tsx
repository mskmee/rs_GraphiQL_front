import styles from './Docs.module.css';
import classNames from 'classnames';
import { GraphQLList, GraphQLNonNull, GraphQLType } from 'graphql';
import { HistoryType } from './Docs';

interface TypeButtonProps {
  element: GraphQLType;
  history: HistoryType;
  onHistoryChange: (value: HistoryType) => void;
  onFieldOpen: (el: string | null) => void;
  onTypeOpen: (el: string | null) => void;
}

export const TypeButton = ({
  element,
  history,
  onTypeOpen,
  onFieldOpen,
  onHistoryChange,
}: TypeButtonProps) => {
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
    <button
      className={classNames(styles.button, styles.typesButton)}
      type="button"
      onClick={() => {
        onHistoryChange([...history, { element: element, type: 'type' }]);
        onFieldOpen(null);
        onTypeOpen(getFieldType(element).type); // todo сюда функцию с типом
      }}
    >
      <div>{getFieldType(element).displayName}</div>
    </button>
  );
};
