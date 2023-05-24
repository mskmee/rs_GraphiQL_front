import { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface IWithIsLoggedProps {
  isLogged: boolean;
  Component: FC;
}
export const WithIsLogged = ({ isLogged, Component }: IWithIsLoggedProps) => {
  return isLogged ? <Navigate to="/" /> : <Component />;
};
