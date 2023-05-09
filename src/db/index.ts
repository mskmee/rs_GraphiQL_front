import { initializeApp } from 'firebase/app';
import { getAuth, UserCredential } from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB1DdGJNwMqUhNw1LZqMEq97l07kV_SRvY',
  authDomain: 'rs-graphql.firebaseapp.com',
  databaseURL: 'https://rs-graphql-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'rs-graphql',
  storageBucket: 'rs-graphql.appspot.com',
  messagingSenderId: '129962341436',
  appId: '1:129962341436:web:9daa83f95790680b393f39',
  measurementId: 'G-LS7EYX098J',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const createUserInDb = async (user: UserCredential, name: string, email: string) => {
  try {
    const userQuery = query(collection(db, 'users'), where('email', '==', email));
    const userDocs = await getDocs(userQuery);
    if (!userDocs.empty) {
      return { isSuccess: false, err: new Error('User with the same email already exists') };
    }
    await addDoc(collection(db, 'users'), {
      uid: user.user.uid,
      name,
      authProvider: 'local',
      email,
    });
    return { isSuccess: true };
  } catch (err) {
    return { success: false, error: err as Error };
  }
};

export { auth, createUserInDb };
