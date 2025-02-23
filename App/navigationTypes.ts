import {BottomTabNavigatorProps} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  OnboardingStack: undefined;
  OnboardingTwo: undefined;
  OnboardingThree: undefined;
  AuthStack: {destination: String};
  MainStackOnboarding: undefined;
};

export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Create: undefined;
  Profile?: {
    userData: {
      _id: string;
      username: string;
      fullName: string;
      email: string;
      profilePicture: string;
    };
  };
  MainStackAuth: undefined;
};

export type AuthStackNavigationProp<T extends keyof AuthStackParamList> =
  NativeStackNavigationProp<AuthStackParamList, T>;

export type MainStackParamList = {
  BottomTab: undefined;
};

export type MainStackNavigationProp<T extends keyof MainStackParamList> =
  NativeStackNavigationProp<MainStackParamList, T>;
