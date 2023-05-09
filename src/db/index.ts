import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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

export { auth };
