import Loader from '@/components/Loader';
import toast from 'react-hot-toast';

export default function Home() {
  return (
    <>
      <button onClick={() => toast.success('hello toast!')}>Toast Me</button>{' '}
      <Loader show={true} />
    </>
  );
}
