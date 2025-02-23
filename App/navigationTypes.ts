import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  OnboardingOne: undefined;
  OnboardingTwo: undefined;
  OnboardingThree: undefined;
  Auth: {destination: String};
  Main: undefined;
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
  Main: undefined;
};

export type AuthStackNavigationProp<T extends keyof AuthStackParamList> =
  NativeStackNavigationProp<AuthStackParamList, T>;

export type MainStackParamList = {
  Home: undefined;
};

export type MainStackNavigationProp<T extends keyof MainStackParamList> =
  NativeStackNavigationProp<MainStackParamList, T>;
