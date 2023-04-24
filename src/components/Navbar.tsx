import Link from 'next/link';
// Navbar styles

export default function Navbar() {
  // mockup user object and username:
  const user = {
    uid: '123',
    email: '',
    photoURL:
      'https://pbs.twimg.com/profile_images/1361039856870400000/6QZ7Q9Zg_400x400.jpg',
    username: 'johndoe',
  };
  const username = user?.username;

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
              <Link href={`/${username}`}>
                <img src={user?.photoURL} alt="user profile picture" />
              </Link>
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
}
