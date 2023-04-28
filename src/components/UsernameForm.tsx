import { firestore } from '@/lib/firebase';
import { useUser } from '@/lib/hooks';
import { doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore';
import { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
const UsernameForm = () => {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = useUser();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    setFormValue(val);
    setIsValid(false);
    if (re.test(val)) {
      setLoading(true);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // create refs for both documents
    const userDoc = doc(firestore, `users/${user?.uid}`);
    const usernameDoc = doc(firestore, `usernames/${formValue}`);
    const batch = writeBatch(getFirestore());
    batch.set(userDoc, {
      username: formValue,
      photoURL: user?.photoURL,
      displayName: user?.displayName,
    });
    batch.set(usernameDoc, { uid: user?.uid });
    await batch.commit();
  };
  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = doc(firestore, 'usernames', username);
        const snap = await getDoc(ref);
        setIsValid(!snap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);
  return (
    <section>
      <h3>Choose Username</h3>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="username"
          value={formValue}
          onChange={onChange}
        />
        <button type="submit" className="btn-green" disabled={!isValid}>
          Choose
        </button>
      </form>
      <h3>Debug State</h3>
      <div>
        Username: {formValue}
        <br />
        Loading: {loading.toString()}
        <br />
        Username Valid: {isValid.toString()}
        <br />
        User String: {JSON.stringify(user)}
      </div>
    </section>
  );
};

export default UsernameForm;
