import { useUser } from '@/lib/hooks';
import Link from 'next/link';
const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { username } = useUser();

  return username ? (
    <>{children}</>
  ) : (
    <Link href="/enter">
      <button className="button btn-blue">You must me signed in</button>
    </Link>
  );
};

export default AuthCheck;
