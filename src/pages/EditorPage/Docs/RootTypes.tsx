import { RootTypesIcon } from './DocsIcons';
import styles from './Docs.module.css';
import classNames from 'classnames';
import { HistoryType } from './Docs';
import { useTranslation } from 'react-i18next';
import { GraphQLNonNestedType } from '@/types/GraphQLNonNestedType';

interface RootTypesProps {
  queryType: GraphQLNonNestedType;
  onHistoryPush: (value: HistoryType) => void;
}

export const RootTypes = ({ queryType, onHistoryPush }: RootTypesProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.category}>
      <div className={styles.subtitle}>
        <RootTypesIcon />
        {t('docs.rootTypes')}
      </div>
      <div className={styles.query}>
        query:
        <button
          className={classNames(styles.button, styles.fieldButton)}
          type="button"
          onClick={() => {
            onHistoryPush({ element: queryType, type: 'type' });
          }}
        >
          {queryType.name}
        </button>
      </div>
    </div>
  );
};
