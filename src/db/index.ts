import { initializeApp } from 'firebase/app';
import { User, getAuth } from 'firebase/auth';
import { query, collection, getDocs, where, getFirestore, addDoc } from 'firebase/firestore';

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

const getUserName = async (user: User) => {
  const q = query(collection(db, 'users'), where('uid', '==', user.uid));
  const docs = await getDocs(q);
  return docs.docs[0].data().name as string;
};

const checkUserData = async (user: User, name?: string) => {
  const q = query(collection(db, 'users'), where('uid', '==', user.uid));
  const docs = await getDocs(q);
  if (docs.docs.length === 0) {
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name: name ?? user.displayName,
      authProvider: 'local',
      email: user.email,
    });
  }
  return true;
};

export { auth, checkUserData, getUserName };
