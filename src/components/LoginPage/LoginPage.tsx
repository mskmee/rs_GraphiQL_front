import styles from './LoginPage.module.css';
import classNames from 'classnames';

interface LoginPageProps {
  status: string;
  closeLoginPage: () => void;
}

export const LoginPage = ({ status, closeLoginPage }: LoginPageProps) => {
  return (
    <button
      type="button"
      className={classNames(styles.wrapper, {
        [styles.signInOpen]: status === 'sign-in',
        [styles.signUpOpen]: status === 'sign-up',
      })}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeLoginPage();
        }
      }}
    >
      <div className={styles.loginWrapper}>Welcome</div>
    </button>
  );
};
