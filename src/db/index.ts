import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { query, collection, getDocs, where, getFirestore, addDoc } from 'firebase/firestore';
import { firebaseConfig } from './config';
import { IDbControllerResponse } from '@/types/interfaces/IDbControllerResponse';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async (): Promise<IDbControllerResponse> => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
    return {
      isSuccess: true,
      name: user.displayName ?? 'No name',
    };
  } catch (err) {
    return { isSuccess: false, err: err as Error };
  }
};

const logInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<IDbControllerResponse> => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const q = query(collection(db, 'users'), where('uid', '==', user.user.uid));
    const doc = await getDocs(q);
    const name = (doc.docs[0].data().name as string) || 'unnamed';
    return { isSuccess: true, name };
  } catch (err) {
    return { isSuccess: false, err: err as Error };
  }
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string
): Promise<IDbControllerResponse> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
    return { isSuccess: true, name };
  } catch (err) {
    return { isSuccess: false, err: err as Error };
  }
};

const sendPasswordReset = async (email: string): Promise<IDbControllerResponse> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { isSuccess: true };
  } catch (err) {
    return { isSuccess: false, err: err as Error };
  }
};

const logout = async (): Promise<IDbControllerResponse> => {
  try {
    await signOut(auth);
    return { isSuccess: true, name: '' };
  } catch (err) {
    return { isSuccess: false, err: err as Error };
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
