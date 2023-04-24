import Loader from '@/components/Loader';
import toast from 'react-hot-toast';

export default function Home() {
  return (
    <main>
      <button onClick={() => toast.success('hello toast!')}>Toast Me</button>{' '}
      <Loader show={true} />
    </main>
  );
}
