import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';
import { toast } from 'react-hot-toast';
import { useUser } from '@/lib/hooks';
import UsernameForm from '@/components/UsernameForm';
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

export const EnterPage = () => {
  const { user, username } = useUser();
  return (
    <main>
      {user ? (
        !username ? (
          <>
            <UsernameForm />
          </>
        ) : (
          <>
            <SignOutButton />
          </>
        )
      ) : (
        <>
          <SignInButton />
        </>
      )}
    </main>
  );
};
export default EnterPage;
