import {
  createContext,
  useState,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import {UserDataProps} from '../components/Types/ComponentTypes';

interface RegistrationContextProps {
  userSignupData: UserDataProps | undefined;
  setUserData: Dispatch<SetStateAction<UserDataProps | undefined>>;
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
  const [userSignupData, setUserData] = useState<UserDataProps>();
  return (
    <RegistrationContext.Provider
      value={{
        userSignupData,
        setUserData,
      }}>
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
