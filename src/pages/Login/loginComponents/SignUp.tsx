import { useEffect, useRef } from 'react';
import { changeIsUserLogged, changeLoginStatus, changeUserName } from '@/store/stateSlice';
import { useAppDispatch } from '@/hooks/useRedux';
import styles from '../Login.module.css';
import { Input, Link, Button } from '@/components/BasicComponents';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth } from '@/db';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema, SignUpData } from './FormValidation';

export const SignUp = () => {
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
    <>
      {(isLoading || isUpdateLoading) && <Loader />}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input label="name" register={register} errors={errors} />
        <Input label="email" register={register} errors={errors} />
        <Input label="password" register={register} errors={errors} />
        <Input label="repeatPassword" register={register} errors={errors} />
        <Button type="submit" className={styles.submitButton}>
          <input type="submit" value="Sign up" className={styles.submitInput} />
        </Button>
      </form>
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
    </>
  );
};
