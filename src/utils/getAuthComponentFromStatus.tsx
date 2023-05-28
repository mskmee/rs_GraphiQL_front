import { ReactElement } from 'react';
import { ResetPassword, Login, Registration } from '@/components/Auth';
import { UserStateLoginStatus } from '@/types/UserStateLoginStatus';

export const getAuthComponentFromStatus: Record<UserStateLoginStatus, ReactElement> = {
  '': <Login />,
  'reset-password': <ResetPassword />,
  'sign-in': <Login />,
  'sign-up': <Registration />,
};
