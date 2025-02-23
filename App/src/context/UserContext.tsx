import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {CheckUserIsLoggedIn} from '../Utility/functions/CheckUserIsLoggedIn';

export interface User {
  VFCP: boolean;
  createdAt: string;
  email: string;
  fullName: string;
  isVerified: boolean;
  lastPasswordChangedOn: string;
  linkedEmails: string[];
  password: string;
  profilePicture: string;
  updatedAt: string;
  username: string;
  _id: string;
}

interface UserContextProps {
  user?: User | null;
  setUser: (user: User | null) => void;
  loading?: boolean;
  setLoading: (loading: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserContextProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  async function getUser() {
    const userData = await CheckUserIsLoggedIn();
    if (userData != null) {
      if ('email' in userData) {
        setUser(userData);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <UserContext.Provider value={{user, setUser, loading, setLoading}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};
