import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Splash: undefined;
  OnboardingOne: undefined;
  OnboardingTwo: undefined;
  OnboardingThree: undefined;
  Auth: {destination: String};
};

export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Create: undefined;
};

export type AuthStackNavigationProp<T extends keyof AuthStackParamList> =
  NativeStackNavigationProp<AuthStackParamList, T>;
