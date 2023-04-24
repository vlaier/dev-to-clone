import { createContext, useContext } from 'react';

interface User {
  uid: string;
  email: string;
  photoURL: string;
  username: string;
}
const UserContext = createContext<null | User>(null);
export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
};
export const useUser = () => useContext(UserContext);
