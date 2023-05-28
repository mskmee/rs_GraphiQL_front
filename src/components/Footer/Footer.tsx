import styles from './Footer.module.css';
import githubLogo from '@/assets/icons/github.png';
import rsLogo from '@/assets/icons/rs-school.png';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.github__wrapper}>
        <a
          className={styles.github__link}
          href="https://github.com/mskmee/rs_GraphiQL_front"
          target="_blank"
          rel="noreferrer"
        >
          <img className={styles.github__logo} src={githubLogo} alt="GitHub" />
        </a>
      </div>
      <p className={styles.footer__year}>2023</p>
      <a
        className={styles.rs__link}
        href="https://rs.school/react/"
        target="_blank"
        rel="noreferrer"
      >
        <img className={styles.rs__logo} src={rsLogo} alt="Rolling Scopes School" />
      </a>
    </footer>
  );
};
