import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Root from './src/(app)/Root';
import {ThemeProvider} from './src/Theme/Context/Theme';
import {NavigationContainer} from '@react-navigation/native';
import {UserContextProvider} from './src/context/UserContext';
import {requestUserPermission} from './src/Utility/permissions/FCM';
import notifee from '@notifee/react-native';

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);
  async function requestPermissions() {
    await notifee.requestPermission();
  }
  async function setupNotificationChannel() {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: 4,
      vibration: true,
    });
  }
  useEffect(() => {
    setupNotificationChannel();
  }, []);

  useEffect(() => {
    requestPermissions();
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
