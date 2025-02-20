import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Root from './src/(app)/Root';
import {ThemeProvider} from './src/Theme/Context/Theme';
import {NavigationContainer} from '@react-navigation/native';
import {UserContextProvider} from './src/context/UserContext';
import {requestUserPermission} from './src/Utility/permissions/FCM';

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);
  return (
    <NavigationContainer>
      <ThemeProvider>
        <UserContextProvider>
          <Root />
        </UserContextProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
