import { useEffect, useRef } from 'react';
import { changeIsUserLogged, changeLoginStatus, changeUserName } from '@/store/userSlice';
import { useAppDispatch } from '@/hooks/useRedux';
import styles from './Styles.module.css';
import { Input, Link, Button } from '@/components/BasicComponents';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth } from '@/db';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import registrationImg from '@/assets/images/registration.webp';
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
  const nameRef = useRef<string | null>(null);
  const name = nameRef.current;
  const [createUser, user, isLoading, error] = useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, isUpdateLoading, updateError] = useUpdateProfile(auth);

  useEffect(() => {
    const updateUserInBD = async (name: string) => {
      const isUpdate = await updateProfile({ displayName: name });
      if (isUpdate) {
        dispatch(changeIsUserLogged(true));
        dispatch(changeUserName(name));
        dispatch(changeLoginStatus(''));
      }
    };
    if (error) {
      toast(error.message, { type: 'error' });
    }
    if (updateError) {
      toast(updateError.message, { type: 'error' });
    }
    if (user && name) {
      updateUserInBD(name).catch((err) => toast(err.message, { type: 'error' }));
    }
  }, [error, updateError, updateProfile, dispatch, name, user]);

  const onSubmit = async (data: SignUpData) => {
    nameRef.current = data.name;
    await createUser(data.email, data.password);
    reset();
  };

  return (
    <div className={styles.container}>
      <img className={styles.img} src={registrationImg} alt="registration image" />

      {(isLoading || isUpdateLoading) && <Loader />}
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
