import styles from './Docs.module.css';
import classNames from 'classnames';
import { GraphQLField, GraphQLType } from 'graphql';
import { HistoryType } from './Docs';

interface FieldButtonProps {
  element: GraphQLField<unknown, unknown>;
  history: HistoryType;
  onHistoryChange: (value: HistoryType) => void;
  onFieldOpen: (el: string | null) => void;
  onTypeOpen: (el: string | null) => void;
}

export const FieldButton = ({
  element,
  history,
  onTypeOpen,
  onFieldOpen,
  onHistoryChange,
}: FieldButtonProps) => {
  return (
    <button
      className={classNames(styles.button, styles.fieldButton)}
      type="button"
      onClick={() => {
        onHistoryChange([...history, { element: element, type: 'field' }]);
        onFieldOpen(element.name);
        // onTypeOpen(null);
      }}
    >
      <div>{element.name}:</div>
    </button>
  );
};
