import { Button } from '@/components/BasicComponents/Button';
import styles from './Header.module.css';
import logo from '@/assets/icons/graphiQL-logo.png';

export const Header = () => {
  return (
    <header className={styles.wrapper}>
      <a href="" className={styles.logo}>
        <img className={styles.logoImage} src={logo} alt="GraphiQL logo" />
      </a>
      <div className={styles.buttonsWrapper}>
        <Button text="Sign In" />
        <Button buttonClass={styles.signUpButton} text="Sign Up" />
      </div>
    </header>
  );
};
