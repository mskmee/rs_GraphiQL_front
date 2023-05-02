import { IDbController } from '@/types/interfaces/IDbController';
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  signInWithGoogle,
} from './index';

export const DB_CONTROLLER: IDbController = {
  setLoginWithEmailAndPassword: (data) => logInWithEmailAndPassword(data!.email!, data!.password!),
  setLogout: logout,
  setPasswordReset: (data) => sendPasswordReset(data!.email!),
  setSignInWithGoogle: signInWithGoogle,
  setRegisterWithEmailAndPassword: (data) =>
    registerWithEmailAndPassword(data!.email!, data!.password!, data!.name!),
};
