import styles from './Link.module.css';
import classNames from 'classnames';

interface LinkProps {
  linkClass?: string;
  linkStyle?: string;
  text: string;
  onClick: () => void;
}

export const Link = ({ linkStyle, linkClass, text, onClick }: LinkProps) => {
  return (
    <div className={classNames(styles.linkWrapper, linkClass)}>
      <button
        type="button"
        className={classNames(styles.link, { [styles.boldLink]: linkStyle === 'bold' })}
        onClick={onClick}
      >
        {text}
      </button>
      <div
        className={classNames(styles.underline, { [styles.boldUnderline]: linkStyle === 'bold' })}
      />
    </div>
  );
};
