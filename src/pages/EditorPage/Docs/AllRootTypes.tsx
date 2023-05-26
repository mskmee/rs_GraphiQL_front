import { TypesIcon } from './DocsIcons';
import styles from './Docs.module.css';
import classNames from 'classnames';
import { HistoryType } from './Docs';
import { useTranslation } from 'react-i18next';
import { GraphQLSchema } from 'graphql';

interface AllRootTypesProps {
  schema: GraphQLSchema;
  onHistoryPush: (value: HistoryType) => void;
}

export const AllRootTypes = ({ schema, onHistoryPush }: AllRootTypesProps) => {
  const { t } = useTranslation();

  const typeMap = schema?.getTypeMap() as object;

  return (
    <div className={styles.category}>
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
                  onHistoryPush({ element: el, type: 'type' });
                }}
              >
                {el.name}
              </button>
            );
          })}
      </div>
    </div>
  );
};
