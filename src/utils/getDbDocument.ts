import { User } from 'firebase/auth';
import { Firestore, collection, getDocs, query, where } from 'firebase/firestore';

export const getDbDocument = async (user: User, db: Firestore) => {
  const dbQuery = query(collection(db, 'users'), where('uid', '==', user.uid));
  return await getDocs(dbQuery);
};
