import styles from './WelcomePage.module.css';
import { Header } from '@/components/Header/Header';
import bgImage from '@/assets/images/graphiQL-bg.jpg';
import rsLogo from '@/assets/images/rs-logo.png';
import { Authors } from './Authors';

export const WelcomePage = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <img className={styles.bgImage} src={bgImage} alt="Image" />
      <div className={styles.info}>
        <div className={styles.about}>
          GraphiQL is Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat.
        </div>
        <Authors />
        <div className={styles.sponsors}>
          <p>Sponsored by</p>
          <a href="" target="_blank">
            <img
              className={styles.rsImage}
              src={rsLogo}
              alt="The Rolling Scopes School"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
