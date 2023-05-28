import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useAppDispatch } from '@/hooks/useRedux';
import { User } from 'firebase/auth';
import { Loader } from '@/components/Loader';
import { Button, Input, Link } from '@/components/BasicComponents';
import { yupResolver } from '@hookform/resolvers/yup';
import { changeIsUserLogged, changeLoginStatus, changeUserName } from '@/store/userSlice';
import { toast } from 'react-toastify';
import { SingInWithGoogle } from './SingInWithGoogle';
import { SignInData, signInSchema } from '@/utils/authFormSchema';
import { auth, getUserName } from '@/db';

import loginImg from '@/assets/images/login-bg.jpg';
import styles from './Styles.module.css';

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const signInButtonValue = t('login.signIn');
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignInData>({
    mode: 'onSubmit',
    resolver: yupResolver(signInSchema),
  });

  const [signInWithEmailAndPassword, userCredential, isLoading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (userCredential) {
      const getUserData = async (user: User) => {
        const name = await getUserName(user);

        dispatch(changeUserName(name ?? 'unknown'));
        dispatch(changeIsUserLogged(true));
        navigate('/');
      };
      getUserData(userCredential.user);
      reset();
    }
    if (error) {
      toast(error.message, { type: 'error' });
    }
  }, [error, userCredential, dispatch, reset, navigate]);

  const onSubmit = async (data: SignInData) => {
    try {
      await signInWithEmailAndPassword(data.email, data.password);
    } catch (err) {
      toast((err as Error).message, { type: 'error' });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.container}>
        <img className={styles.img} src={loginImg} alt="login image" draggable="false" />
        <div className={styles.formContainer}>
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
        </div>
      </div>
    </>
  );
};
