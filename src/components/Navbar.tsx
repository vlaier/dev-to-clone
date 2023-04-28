import Link from 'next/link';
import { useUser } from '@/lib/hooks';
import Image from 'next/image';
const Navbar = () => {
  const { user, username } = useUser();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">FEED</button>
          </Link>
        </li>

        {username && (
          <>
            <li className="push-left">
              <Link href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              {user?.photoURL && (
                <Link href={`/${username}`}>
                  <Image
                    src={user.photoURL}
                    alt="user profile picture"
                    width={100}
                    height={100}
                  />
                </Link>
              )}
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
