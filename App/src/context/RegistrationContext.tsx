import {createContext, useState, ReactNode, useContext} from 'react';

interface RegistrationContextProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  pin?: string;
  OTP?: string;
}

const RegistrationContext = createContext<RegistrationContextProps | undefined>(
  undefined,
);

interface RegistrationContextProviderProps {
  children: ReactNode;
}

export const RegistrationContextProvider: React.FC<
  RegistrationContextProviderProps
> = ({children}) => {
  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const [lastName, setLastName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);

  return (
    <RegistrationContext.Provider value={{firstName, lastName, email}}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext<RegistrationContextProps | undefined>(
    RegistrationContext,
  );
  if (context === undefined) {
    throw new Error(
      'useRegistration must be used within a RegistrationContextProvider',
    );
  }
  return context;
};
export default RegistrationContextProvider;
