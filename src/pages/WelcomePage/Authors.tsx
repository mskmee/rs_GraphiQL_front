import { useTranslation } from 'react-i18next';
import styles from './Authors.module.css';

export const Authors = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.authors}>
      <div>{t('authors.created')}</div>
      <a
        href="https://github.com/mooncitizenX/"
        target="_blank"
        rel="noreferrer"
        className={styles.authorLink}
      >
        <div className={styles.underline} />
        <p className={styles.author}>{t('authors.Pavel')}</p>
      </a>
      <a
        href="https://github.com/mskmee/"
        target="_blank"
        rel="noreferrer"
        className={styles.authorLink}
      >
        <div className={styles.underline} />
        <p className={styles.author}>{t('authors.Maksim')}</p>
      </a>
      <a
        href="https://github.com/mkoroleva5/"
        target="_blank"
        rel="noreferrer"
        className={styles.authorLink}
      >
        <div className={styles.underline} />
        <p className={styles.author}>{t('authors.Maria')}</p>
      </a>
    </div>
  );
};
