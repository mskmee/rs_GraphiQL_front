import styles from './Authors.module.css';

export const Authors = () => {
  return (
    <div className={styles.authors}>
      <div>Created by</div>
      <a
        href="https://github.com/mooncitizenX/"
        target="_blank"
        rel="noreferrer"
        className={styles.authorLink}
      >
        <div className={styles.underline} />
        <p className={styles.author}>Pavel Pristupa</p>
      </a>
      <a
        href="https://github.com/mskmee/"
        target="_blank"
        rel="noreferrer"
        className={styles.authorLink}
      >
        <div className={styles.underline} />
        <p className={styles.author}>Maksim Maksimenko</p>
      </a>
      <a
        href="https://github.com/mkoroleva5/"
        target="_blank"
        rel="noreferrer"
        className={styles.authorLink}
      >
        <div className={styles.underline} />
        <p className={styles.author}>Maria Koroleva</p>
      </a>
    </div>
  );
};
