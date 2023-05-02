import { IDbControllerResponse } from './IDbControllerResponse';
import { IUserFormSubmit } from './IUserFormSubmit';

export interface IDbController {
  setSignInWithGoogle: () => Promise<IDbControllerResponse>;
  setLoginWithEmailAndPassword: (data?: IUserFormSubmit) => Promise<IDbControllerResponse>;
  setRegisterWithEmailAndPassword: (data?: IUserFormSubmit) => Promise<IDbControllerResponse>;
  setPasswordReset: (data?: IUserFormSubmit) => Promise<IDbControllerResponse>;
  setLogout: () => Promise<IDbControllerResponse>;
}
