import { ResetPassword, Login, Registration } from '@/components/Auth';
import { UserStateLoginStatus } from '@/types/UserStateLoginStatus';
import { ReactElement } from 'react';

export const getComponentFromStatus: Record<UserStateLoginStatus, ReactElement> = {
  '': <Login />,
  'reset-password': <ResetPassword />,
  'sign-in': <Login />,
  'sign-up': <Registration />,
};
