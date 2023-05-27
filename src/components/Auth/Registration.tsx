import { useEffect } from 'react';
import { changeIsUserLogged, changeLoginStatus, changeUserName } from '@/store/userSlice';
import { useAppDispatch } from '@/hooks/useRedux';
import styles from './Styles.module.css';
import { Input, Link, Button } from '@/components/BasicComponents';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, checkUserData } from '@/db';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import registrationImg from '@/assets/images/registration-img.jpg';
import { SignUpData, signUpSchema } from '@/utils/authFormSchema';

export const Registration = () => {
  const { t } = useTranslation();
  const signUpButtonValue = t('login.signUp');

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpSchema),
  });

  const dispatch = useAppDispatch();
  const [createUser, _, isLoading, error] = useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    if (error) {
      toast(error.message, { type: 'error' });
    }
  }, [error]);

  const onSubmit = async (data: SignUpData) => {
    const user = await createUser(data.email, data.password);
    if (user?.user) {
      await checkUserData(user?.user, data.name);
      dispatch(changeUserName(data.name));
      dispatch(changeLoginStatus(''));
      dispatch(changeIsUserLogged(true));
    }
    reset();
  };

  return (
    <div className={styles.container}>
      <img className={styles.img} src={registrationImg} alt="registration image" />
      {isLoading && <Loader />}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input label="name" register={register} errors={errors} />
        <Input label="email" register={register} errors={errors} />
        <Input label="password" register={register} errors={errors} />
        <Input label="repeatPassword" register={register} errors={errors} />
        <Button type="submit" className={styles.submitButton}>
          <input type="submit" value={signUpButtonValue} className={styles.submitInput} />
        </Button>
        <div className={styles.select}>
          {t('login.haveAccount')}
          <Link
            linkStyle="bold"
            text={t('login.signIn')}
            onClick={() => {
              dispatch(changeLoginStatus('sign-in'));
            }}
          />
        </div>
      </form>
    </div>
  );
};
