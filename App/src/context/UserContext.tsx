import React, {createContext, useContext, useState, ReactNode} from 'react';

interface User {
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
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserContextProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
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
