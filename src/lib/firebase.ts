import { getApps, getApp, initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import {
  DocumentData,
  DocumentSnapshot,
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
interface Config {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
const firebaseConfig = {
  apiKey: 'AIzaSyBY1i_7Kx9S2NpkYdewnTg_x_W9o8i-mkk',
  authDomain: 'dev-to-clone-ace07.firebaseapp.com',
  projectId: 'dev-to-clone-ace07',
  storageBucket: 'dev-to-clone-ace07.appspot.com',
  messagingSenderId: '154565026848',
  appId: '1:154565026848:web:4565ea564e53ceeba10845',
};
let app = null;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  if (app === null) {
    throw new Error('Firebase app not initialized');
  }
}

const createFirebaseApp = (config: Config) => {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
};
const firebaseApp = createFirebaseApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore();
export const storage = getStorage();

export const getUserWithUsername = async (username: string) => {
  const userQuery = query(
    collection(firestore, 'users'),
    where('username', '==', username),
    limit(1)
  );
  const userDoc = (await getDocs(userQuery)).docs[0];
  return userDoc;
};

export const postToJSON = (doc: DocumentSnapshot) => {
  const data = doc.data();
  return {
    ...data,
    createdAt: data?.createdAt.toMillis(),
    updatedAt: data?.updatedAt.toMillis(),
  };
};
