import { auth } from '@/db';
import { DB_CONTROLLER } from '@/db/controller';
import { IDbController } from '@/types/interfaces/IDbController';
import { IUserFormSubmit } from '@/types/interfaces/IUserFormSubmit';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

export const useUserAuth = (method: keyof IDbController, data?: IUserFormSubmit) => {
  const [user, loading] = useAuthState(auth);
  const [userName, setUserName] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    const getData = async () => {
      const response = await DB_CONTROLLER[method](data);
      setIsSuccess(response.isSuccess);
      setError(response.err ?? null);
      setUserName(response.name ?? '');
      if (response.name) {
        return navigate('/');
      }
    };
    getData();
  }, [user, loading, method, navigate, data]);
  return { isLoading: loading, userName, error, isSuccess };
};
