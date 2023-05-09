import { useAppDispatch } from '@/hooks/useRedux';
import styles from './Login.module.css';
import { Input } from '@/components/BasicComponents/Input';
import { Button } from '@/components/BasicComponents/Button';
import { Link } from '@/components/BasicComponents/Link';
import { changeIsUserLogged, changeLoginStatus, changeUserName } from '@/store/stateSlice';
import googleLogo from '@/assets/icons/google.png';
import { logInWithEmailAndPassword, signInWithGoogle } from '@/db';
import { ChangeEvent, useState } from 'react';

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRegex = /^\S+@\S+\.\S+$/;

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const authWithGoogle = async () => {
    const data = await signInWithGoogle();
    if (data.isSuccess) {
      dispatch(changeUserName(data.name!));
      dispatch(changeIsUserLogged(true));
      console.log(data.name);
    }
  };

  const authWithEmail = async () => {
    const data = await logInWithEmailAndPassword(email, password);
    if (data.isSuccess) {
      dispatch(changeUserName(data.name!));
      dispatch(changeIsUserLogged(true));
      console.log(data.name);
    }
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <Input
        required
        type="email"
        label="Email"
        pattern={emailRegex.source}
        onChange={(e) => {
          onEmailChange(e);
        }}
      />
      <Input
        required
        type="password"
        label="Password"
        pattern="^(?=.*[A-Z]).{8,}$"
        onChange={(e) => {
          onPasswordChange(e);
        }}
      />
      <Link
        text="Forgot password?"
        linkClass={styles.resetButton}
        onClick={() => {
          dispatch(changeLoginStatus('reset-password'));
        }}
      />
      <Button type="submit" className={styles.submitButton} onClick={authWithEmail}>
        Sign in
      </Button>
      <Button type="button" className={styles.googleButton} onClick={authWithGoogle}>
        <img width="20px" src={googleLogo} alt="Google" />
        Sign in with Google
      </Button>
      <div className={styles.select}>
        {"Don't have an account?"}
        <Link
          linkStyle="bold"
          text="Sign up"
          onClick={() => {
            dispatch(changeLoginStatus('sign-up'));
          }}
        />
      </div>
    </form>
  );
};
