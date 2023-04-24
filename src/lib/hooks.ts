import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
export const useUserData = () => {
  // get user from firebase auth state
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;
    if (user) {
      const ref = doc(getFirestore(), 'users', user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }
    return unsubscribe;
  }, [user]);
  return { user, username };
};
