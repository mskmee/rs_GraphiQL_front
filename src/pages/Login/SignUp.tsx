import { useAppDispatch } from '@/hooks/useRedux';
import { changeError, changeLoginStatus } from '@/store/stateSlice';
import styles from './Login.module.css';
import classNames from 'classnames';
import { Input } from '@/components/BasicComponents/Input';
import { Link } from '@/components/BasicComponents/Link';
import { Button } from '@/components/BasicComponents/Button';
import { ChangeEvent, useState } from 'react';
import { registerWithEmailAndPassword } from '@/db';

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [firstPassword, setFirstPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const emailRegex = /^\S+@\S+\.\S+$/;

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onFirstPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFirstPassword(value);
  };

  const onSecondPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (firstPassword && firstPassword === value) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const registerNewUser = async () => {
    const data = await registerWithEmailAndPassword(email, firstPassword, name);
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <Input
        minLength={1}
        className={classNames(styles.input, { [styles.valid]: isPasswordValid })}
        type="text"
        label="Name"
        pattern="\w+"
        onChange={(e) => {
          onNameChange(e);
        }}
      />
      <Input
        type="email"
        label="Email"
        pattern={emailRegex.source}
        onChange={(e) => {
          onEmailChange(e);
        }}
      />
      <Input
        type="password"
        label="Password"
        pattern="^(?=.*[A-Z]).{8,}$"
        onChange={(e) => {
          onFirstPasswordChange(e);
        }}
      />
      <Input
        type="password"
        label="Repeat password"
        pattern="^(?=.*[A-Z]).{8,}$"
        className={classNames(styles.input, { [styles.valid]: isPasswordValid })}
        onChange={(e) => {
          onSecondPasswordChange(e);
        }}
      />
      <Button type="submit" className={styles.submitButton} onClick={registerNewUser}>
        Sign up
      </Button>
      <div className={styles.select}>
        {'Already have an account?'}
        <Link
          linkStyle="bold"
          text="Sign in"
          onClick={() => {
            dispatch(changeLoginStatus('sign-in'));
          }}
        />
      </div>
    </form>
  );
};
