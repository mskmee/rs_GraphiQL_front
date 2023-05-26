import styles from './Docs.module.css';
import classNames from 'classnames';
import { GraphQLField } from 'graphql';
import { HistoryType } from './Docs';

interface FieldButtonProps {
  field: GraphQLField<unknown, unknown>;
  onHistoryPush: (value: HistoryType) => void;
}

export const FieldButton = ({ field, onHistoryPush }: FieldButtonProps) => {
  return (
    <button
      className={classNames(styles.button, styles.fieldButton)}
      type="button"
      onClick={() => {
        onHistoryPush({ element: field, type: 'field' });
      }}
    >
      <div>{field.name}:</div>
    </button>
  );
};
