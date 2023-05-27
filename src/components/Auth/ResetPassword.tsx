import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/hooks/useRedux';
import { useEffect } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { changeLoginStatus } from '@/store/userSlice';
import { Loader } from '../Loader';
import { Button, Input, Link } from '../BasicComponents';
import { auth } from '@/db';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetData, resetSchema } from '@/utils/authFormSchema';

import emailImg from '@/assets/images/searching.webp';
import styles from './Styles.module.css';

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
    }
    reset();
  };

  return (
    <div className={styles.container}>
      <img className={styles.img} src={emailImg} alt="login image" />
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
    </div>
  );
};
