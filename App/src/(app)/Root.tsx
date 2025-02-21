import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '../Theme/Context/Theme';
import Auth from './(auth)/Auth';
import OnboardingStack from './(onboarding)/OboardingStack';
import {RootStackParamList} from '../../navigationTypes';
import {getFcmToken} from '../Utility/functions/GetFCMToken';
import notifee, {AndroidImportance} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Background notification handler
messaging().setBackgroundMessageHandler(
  async (message: FirebaseMessagingTypes.RemoteMessage) => {
    if (message.data?.notifee) {
      await notifee.displayNotification(
        JSON.parse(
          typeof message.data.notifee === 'string'
            ? JSON.parse(message.data.notifee)
            : message.data.notifee,
        ),
      );
    }
  },
);

const Root = () => {
  const {Colors, isDarkMode} = useTheme();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async message => {
      if (message.data?.notifee) {
        const notificationData =
          typeof message.data.notifee === 'string'
            ? JSON.parse(message.data.notifee)
            : message.data.notifee;

        // Step 1: Show In-App Toast Notification
        Toast.show({
          type: 'info',
          text1: notificationData.title || 'New Notification',
          text2: notificationData.body || 'You have a new message!',
          position: 'top',
          visibilityTime: 5000, // Auto-hide after 5 seconds
          autoHide: true,
          onPress: async () => {
            // Show system notification if the user clicks the toast
            await notifee.displayNotification({
              title: notificationData.title,
              body: notificationData.body,
              android: {
                channelId: 'default',
                importance: AndroidImportance.HIGH,
                pressAction: {
                  id: 'default',
                },
              },
            });
          },
        });
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    getFcmToken();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.Primary}
        animated={true}
      />
      <Stack.Navigator initialRouteName="OnboardingOne">
        <Stack.Screen
          name="OnboardingOne"
          component={OnboardingStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
      </Stack.Navigator>

      {/* Ensure Toast is included in the Root Component */}
      <Toast />
    </>
  );
};

export default Root;
