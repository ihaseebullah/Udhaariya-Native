import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Login from './(screens)/Login';
import Register from './(screens)/(registration)/Register';
import Create from './(screens)/(registration)/(EmailSignup)/Create';
import {AuthStackParamList} from '../../../navigationTypes';
import RegistrationContextProvider from '../../context/RegistrationContext';
import ProfileScreen from './(screens)/Profile';

type AuthProps = {
  route?: {params?: {destination?: keyof AuthStackParamList}};
};
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Auth: React.FC<AuthProps> = ({route}) => {
  const destination = route?.params?.destination || 'Register';

  return (
    <RegistrationContextProvider>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: 'slide_from_right',
        }}
        initialRouteName={destination}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Profile" component={ProfileScreen} />
        <AuthStack.Screen name="Register" component={Register} />
        <AuthStack.Screen name="Create" component={Create} />
      </AuthStack.Navigator>
    </RegistrationContextProvider>
  );
};

export default Auth;
