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
        Pavel Pristupa
      </a>
      <a
        href="https://github.com/mskmee/"
        target="_blank"
        rel="noreferrer"
        className={styles.authorLink}
      >
        <div className={styles.underline} />
        Maksim Maksimenko
      </a>
      <a
        href="https://github.com/mkoroleva5/"
        target="_blank"
        rel="noreferrer"
        className={styles.authorLink}
      >
        <div className={styles.underline} />
        Maria Koroleva
      </a>
    </div>
  );
};
