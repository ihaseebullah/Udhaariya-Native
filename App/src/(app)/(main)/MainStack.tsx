import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './(home)/Home';
import {MainStackParamList} from '../../../navigationTypes';
const MainStackNav = createNativeStackNavigator<MainStackParamList>();
const MainStack = () => {
  return (
    <MainStackNav.Navigator>
      <MainStackNav.Screen name="Home" component={Home} />
    </MainStackNav.Navigator>
  );
};

export default MainStack;
