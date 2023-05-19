import { useAppDispatch } from '@/hooks/useRedux';
import styles from '../Login.module.css';
import { Input, Button, Link } from '@/components/BasicComponents';
import { changeIsUserLogged, changeLoginStatus, changeUserName } from '@/store/stateSlice';
import { useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/db';
import { Loader } from '@/components/Loader';
import { SingInWithGoogle } from './SingInWithGoogle';
import { toast } from 'react-toastify';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './FormValidation';

export const SignIn = () => {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
  });

  const [signInWithEmailAndPassword, user, isLoading, error] = useSignInWithEmailAndPassword(auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(changeUserName(user.user.displayName ?? 'no name'));
      dispatch(changeIsUserLogged(true));
      dispatch(changeLoginStatus(''));
    }
    if (error) {
      toast(error.message, { type: 'error' });
    }
  }, [user, dispatch, error]);

  const onSubmit = (data: FieldValues) => {
    console.log(data);

    signInWithEmailAndPassword(data.email, data.password);
    reset();
  };

  return (
    <>
      {isLoading && <Loader />}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="email"
          register={register}
          errors={errors}
          onSubmitSuccess={isSubmitSuccessful}
        />
        <Input
          label="password"
          register={register}
          errors={errors}
          onSubmitSuccess={isSubmitSuccessful}
        />
        <Link
          text="Forgot password?"
          linkClass={styles.resetButton}
          onClick={() => {
            dispatch(changeLoginStatus('reset-password'));
          }}
        />
        <Button type="submit" className={styles.submitButton}>
          <input type="submit" value="Sign in" className={styles.submitInput} />
        </Button>
      </form>
      <SingInWithGoogle />
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
    </>
  );
};
