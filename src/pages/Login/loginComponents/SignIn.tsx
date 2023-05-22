import { useAppDispatch } from '@/hooks/useRedux';
import styles from '../Login.module.css';
import { Input, Button, Link } from '@/components/BasicComponents';
import { changeIsUserLogged, changeLoginStatus, changeUserName } from '@/store/userSlice';
import { useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/db';
import { Loader } from '@/components/Loader';
import { SingInWithGoogle } from './SingInWithGoogle';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema, SignInData } from './FormValidation';
import { useTranslation } from 'react-i18next';

export const SignIn = () => {
  const { t } = useTranslation();
  const signInButtonValue = t('login.signIn');

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignInData>({
    resolver: yupResolver(signInSchema),
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

  const onSubmit = (data: SignInData) => {
    signInWithEmailAndPassword(data.email, data.password);
    reset();
  };

  return (
    <>
      {isLoading && <Loader />}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input label="email" register={register} errors={errors} />
        <Input label="password" register={register} errors={errors} />
        <Link
          text={t('login.forgot')}
          linkClass={styles.resetButton}
          onClick={() => {
            dispatch(changeLoginStatus('reset-password'));
          }}
        />
        <Button type="button" className={styles.submitButton}>
          <input type="submit" value={signInButtonValue} className={styles.submitInput} />
        </Button>
      </form>
      <SingInWithGoogle />
      <div className={styles.select}>
        {t('login.account')}
        <Link
          linkStyle="bold"
          text={t('login.signUp')}
          onClick={() => {
            dispatch(changeLoginStatus('sign-up'));
          }}
        />
      </div>
    </>
  );
};
