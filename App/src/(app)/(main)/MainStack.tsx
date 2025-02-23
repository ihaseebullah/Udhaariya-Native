import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './(home)/Home';
import {MainStackParamList} from '../../../navigationTypes';
import BottomTab from './BottomTab';
const MainStackNav = createNativeStackNavigator<MainStackParamList>();
const MainStack = () => {
  return (
    <MainStackNav.Navigator
      initialRouteName="BottomTab"
      screenOptions={{headerShown: false}}>
      <MainStackNav.Screen name="BottomTab" component={BottomTab} />
    </MainStackNav.Navigator>
  );
};

export default MainStack;
