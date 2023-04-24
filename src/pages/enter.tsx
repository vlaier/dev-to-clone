import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';
import { toast } from 'react-hot-toast';
// Should pop up toast error message if sign in fails
const SignInButton = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      toast.success('Signed in with Google');
    } catch (error) {
      toast.error('Sign in with Google failed');
    }
  };
  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={'/google.png'} /> Sign in with Google
    </button>
  );
};
const SignOutButton = () => {
  return <button onClick={auth.signOut}>Sign Out</button>;
};
const UsernameForm = () => {
  return <h1>TODO: UsernameForm</h1>;
};
export const EnterPage = () => {
  const user = null;
  const username = null;
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
};
export default EnterPage;