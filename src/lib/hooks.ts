import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { UserContext } from '@/components/UserContext';
export const useUserData = () => {
  // get user from firebase auth state
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;
    if (user) {
      const ref = doc(firestore, 'users', user.uid);
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
export const useUser = () => {
  const { user, username } = useContext(UserContext);
  return { user, username };
};
