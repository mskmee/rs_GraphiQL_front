import styles from './Docs.module.css';
import classNames from 'classnames';
import leftIcon from '@/assets/icons/left.svg';
import { HistoryType } from './Docs';

interface BackButtonProps {
  history: HistoryType;
  onHistoryChange: (value: HistoryType) => void;
  onFieldOpen: (el: string | null) => void;
  onTypeOpen: (el: string | null) => void;
  onClose: () => void;
}

export const BackButton = ({
  history,
  onTypeOpen,
  onFieldOpen,
  onClose,
  onHistoryChange,
}: BackButtonProps) => {
  return (
    <button
      className={classNames(styles.button, styles.backButton)}
      type="button"
      onClick={() => {
        if (history.length === 1) {
          onTypeOpen(null);
          onFieldOpen(null);
          onClose();
          onHistoryChange([]);
        } else {
          onHistoryChange(history);

          const lastItem = history[history.length - 1];

          if (lastItem && lastItem.type === 'type') {
            onTypeOpen(lastItem.element.name);
          } else if (lastItem && lastItem.type === 'field') {
            onFieldOpen(lastItem.element.name);
          }
          // todo сюда проверку на тайп или филд и onTypeOpen или onFileldOpen
        }
      }}
    >
      <img src={leftIcon} alt="Back" />
      {
        history.length === 1
          ? 'Docs'
          : history[history.length - 2].element.name /* todo выводить правильно */
      }
    </button>
  );
};
