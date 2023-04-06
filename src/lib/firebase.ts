import firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBY1i_7Kx9S2NpkYdewnTg_x_W9o8i-mkk',
  authDomain: 'dev-to-clone-ace07.firebaseapp.com',
  projectId: 'dev-to-clone-ace07',
  storageBucket: 'dev-to-clone-ace07.appspot.com',
  messagingSenderId: '154565026848',
  appId: '1:154565026848:web:4565ea564e53ceeba10845',
};

if (!firebase.getApps().length) {
  firebase.initializeApp(firebaseConfig);
}
export const auth = getAuth();
export const firestore = getFirestore();
export const storage = getStorage();
