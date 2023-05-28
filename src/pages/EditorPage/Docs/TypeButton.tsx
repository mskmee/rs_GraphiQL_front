import styles from './Docs.module.css';
import classNames from 'classnames';
import { GraphQLList, GraphQLNonNull, GraphQLType } from 'graphql';
import { HistoryType } from './Docs';
import { GraphQLNonNestedType } from '@/types/GraphQLNonNestedType';

interface TypeButtonProps {
  element: GraphQLType;
  onHistoryPush: (value: HistoryType) => void;
}

export const TypeButton = ({ element, onHistoryPush }: TypeButtonProps) => {
  const getFieldType = (type: GraphQLType): GraphQLNonNestedType => {
    if (type instanceof GraphQLNonNull || type instanceof GraphQLList) {
      const innerType = getFieldType(type.ofType);
      return innerType;
    }

    return type;
  };

  return (
    <button
      className={classNames(styles.button, styles.typesButton)}
      type="button"
      onClick={() => {
        onHistoryPush({ element: getFieldType(element), type: 'type' });
      }}
    >
      <div>{element.toString()}</div>
    </button>
  );
};
