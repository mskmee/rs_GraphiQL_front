import styles from './Authors.module.css';

export const Authors = () => {
  return (
    <div className={styles.authors}>
      <div>Created by</div>
      <a href="" className={styles.authorLink}>
        <div className={styles.underline} />
        Pavel Pristupa
      </a>
      <a href="" className={styles.authorLink}>
        <div className={styles.underline} />
        Maksim Maksimenko
      </a>
      <a href="" className={styles.authorLink}>
        <div className={styles.underline} />
        Maria Koroleva
      </a>
    </div>
  );
};
