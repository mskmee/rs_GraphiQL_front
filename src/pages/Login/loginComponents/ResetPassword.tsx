import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import styles from '../Login.module.css';
import { changeLoginStatus } from '@/store/userSlice';
import { Input } from '@/components/BasicComponents/Input';
import { Link } from '@/components/BasicComponents/Link';
import { Button } from '@/components/BasicComponents/Button';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '@/db';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetSchema, ResetData } from './FormValidation';
import { useTranslation } from 'react-i18next';

export const ResetPassword = () => {
  const { t } = useTranslation();
  const sendButtonValue = t('login.send');

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ResetData>({
    resolver: yupResolver(resetSchema),
  });

  const dispatch = useAppDispatch();
  const [resetPassword, isLoading, error] = useSendPasswordResetEmail(auth);

  useEffect(() => {
    if (error) {
      toast(error.message, { type: 'error' });
    }
  }, [error]);

  const onSubmit = async (data: ResetData) => {
    const isResetSuccess = await resetPassword(data.email);
    if (isResetSuccess) {
      toast('Check instructions in you email.', { type: 'success' });
      dispatch(changeLoginStatus(''));
    }
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <Loader />}
      <Input required label="email" register={register} errors={errors} />
      <Button type="submit" className={styles.submitButton}>
        <input type="submit" value={sendButtonValue} className={styles.submitInput} />
      </Button>
      <Link
        linkStyle="bold"
        text={t('login.return')}
        onClick={() => {
          dispatch(changeLoginStatus('sign-in'));
        }}
      />
    </form>
  );
};
