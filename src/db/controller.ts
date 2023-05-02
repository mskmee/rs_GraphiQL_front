import { IDbController } from '@/types/interfaces/IDbController';
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  signInWithGoogle,
} from './index';

export const DB_CONTROLLER: IDbController = {
  setLoginWithEmailAndPassword: (email, password) => logInWithEmailAndPassword(email, password),
  setLogout: () => logout,
  setPasswordReset: (email) => sendPasswordReset(email),
  setSignInWithGoogle: () => signInWithGoogle(),
  setRegisterWithEmailAndPassword: (name, email, password) =>
    registerWithEmailAndPassword(name, email, password),
};
