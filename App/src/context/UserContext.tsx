import React, {createContext, useContext, useState} from 'react';

interface UserContextProps {
  user?: {
    firstName: String;
    lastName: String;
    email: String;
    pin: String;
    FCM: String;
    OTP?: String;
    lastPasswordChangedOn?: String;
    linkedEmails: Array<String>;
  };
  setUser?: (user: UserContextProps['user']) => void;
}
const UserContext = createContext<UserContextProps>({});

export const UserContextProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<UserContextProps['user']>();
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext<UserContextProps>(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};
