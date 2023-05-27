import { Info } from './Info';
import styles from './WelcomePage.module.css';

export const WelcomePage = () => {
  return (
    <div className={styles.wrapper}>
      <Info />
    </div>
  );
};
