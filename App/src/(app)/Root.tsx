import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '../Theme/Context/Theme';
import Auth from './(auth)/Auth';
import OboardingStack from './(onboarding)/OboardingStack';
import {RootStackParamList} from '../../navigationTypes';
import {getFcmToken} from '../Utility/functions/GetFCMToken';
const Stack = createNativeStackNavigator<RootStackParamList>();
const Root = () => {
  const {Colors, isDarkMode} = useTheme();
  getFcmToken();
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
          component={OboardingStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default Root;
