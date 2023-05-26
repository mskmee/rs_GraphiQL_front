import styles from './Docs.module.css';
import classNames from 'classnames';
import leftIcon from '@/assets/icons/left.svg';

interface BackButtonProps {
  children: React.ReactNode;
  onHistoryBack: () => void;
}

export const BackButton = ({ children, onHistoryBack }: BackButtonProps) => {
  return (
    <button
      className={classNames(styles.button, styles.backButton)}
      type="button"
      onClick={() => {
        onHistoryBack();
      }}
    >
      <img src={leftIcon} alt="Back" />
      {children}
    </button>
  );
};
