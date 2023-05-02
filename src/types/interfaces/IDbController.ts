export interface IDbController {
  setSignInWithGoogle: () => void;
  setLoginWithEmailAndPassword: (email: string, password: string) => void;
  setRegisterWithEmailAndPassword: (name: string, email: string, password: string) => void;
  setPasswordReset: (email: string) => void;
  setLogout: () => void;
}
