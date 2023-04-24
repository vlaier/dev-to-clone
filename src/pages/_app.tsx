import Navbar from '@/components/Navbar';
import { UserContextProvider } from '@/components/UserContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContextProvider>
  );
}
