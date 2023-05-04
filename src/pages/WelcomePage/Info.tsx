import styles from './Info.module.css';
import rsLogo from '@/assets/images/rs-logo.png';
import { Authors } from './Authors';

export const Info = () => {
  return (
    <div className={styles.info}>
      <div className={styles.about}>
        GraphiQL is Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
      <Authors />
      <div className={styles.sponsors}>
        <p>Sponsored by</p>
        <a href="https://rs.school/" target="_blank" rel="noreferrer">
          <img className={styles.rsImage} src={rsLogo} alt="The Rolling Scopes School" />
        </a>
      </div>
    </div>
  );
};
