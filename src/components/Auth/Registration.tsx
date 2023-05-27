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
import { useNavigate } from 'react-router-dom';

export const Registration = () => {
  const { t } = useTranslation();
  const signUpButtonValue = t('login.signUp');
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpSchema),
  });

  const dispatch = useAppDispatch();
  const [createUser, userCredential, isLoading, error] = useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    if (userCredential) {
    }
    if (error) {
      userCredential?.user;
      toast(error.message, { type: 'error' });
    }
  }, [error, userCredential]);

  const onSubmit = async (data: SignUpData) => {
    try {
      const userCredential = await createUser(data.email, data.password);
      if (userCredential?.user) {
        await checkUserData(userCredential.user, data.name);
        dispatch(changeUserName(data.name));
        dispatch(changeLoginStatus(''));
        dispatch(changeIsUserLogged(true));
        navigate('/');
      }
    } catch (err) {
      toast((err as Error).message, { type: 'error' });
    }
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
