import { useUserData } from '@/lib/hooks';
import { User } from 'firebase/auth';
import { createContext } from 'react';
interface AuthContextInterface {
  user: User | null | undefined;
  username: string | null | undefined;
}
export const UserContext = createContext<AuthContextInterface>({
  user: null,
  username: null,
});
export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};
