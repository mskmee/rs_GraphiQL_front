import { useAppDispatch } from '@/hooks/useRedux';
import styles from './Login.module.css';
import { Input } from '@/components/BasicComponents/Input';
import { Button } from '@/components/BasicComponents/Button';
import { Link } from '@/components/BasicComponents/Link';
import { changeLoginStatus } from '@/store/stateSlice';
import googleLogo from '@/assets/icons/google.png';
import { logInWithEmailAndPassword, signInWithGoogle } from '@/db';
import { ChangeEvent, useState } from 'react';

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <Input
        type="email"
        label="Email"
        pattern="^(?:[a-z0-9!#$%&'*+/=?^{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\[\x01-\x09\x0b\x0c\x0e-\x7f])_)@(?:(?:a-z0-9?.)+a-z0-9?|[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])$"
        onChange={(e) => {
          onEmailChange(e);
        }}
      />
      <Input
        type="password"
        label="Password"
        pattern="^(?=.*[A-Z]).{6,}$"
        onChange={(e) => {
          onPasswordChange(e);
        }}
      />
      <Link
        text="Forgot password?"
        linkClass={styles.resetButton}
        onClick={() => {
          dispatch(changeLoginStatus({ status: 'reset-password' }));
        }}
      />
      <Button
        type="submit"
        buttonClass={styles.submitButton}
        text="Sign in"
        onClick={() => logInWithEmailAndPassword(email, password)}
      />
      <Button
        type="button"
        buttonClass={styles.googleButton}
        text="Sign in with Google"
        onClick={signInWithGoogle}
      >
        <img width="20px" src={googleLogo} alt="Google" />
      </Button>
      <div className={styles.select}>
        {"Don't have an account?"}
        <Link
          linkStyle="bold"
          text="Sign up"
          onClick={() => {
            dispatch(changeLoginStatus({ status: 'sign-up' }));
          }}
        />
      </div>
    </form>
  );
};
