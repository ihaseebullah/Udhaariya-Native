import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './(home)/Home';
import {Wallet, Home as HomeIcon, Bell} from 'lucide-react-native';
import {useTheme} from '../../Theme/Context/Theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const {Colors} = useTheme(); // Access theme colors

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          left: 10,
          right: 10,
          backgroundColor: Colors.CardBackground, // Ensure a proper background
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5, // For Android shadow
        },
        tabBarShowLabel: false, // Hides labels globally
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, focused}) => {
            const scale = useSharedValue(focused ? 1.3 : 1); // Scale effect
            const opacity = useSharedValue(focused ? 1 : 0.6); // Opacity effect

            // Animated styles
            const animatedStyle = useAnimatedStyle(() => ({
              transform: [{scale: withTiming(scale.value, {duration: 200})}],
              opacity: withTiming(opacity.value, {duration: 200}),
            }));

            return (
              <Animated.View style={[animatedStyle, {marginTop: 10}]}>
                <HomeIcon color={color} size={26} />
              </Animated.View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Home}
        options={{
          tabBarIcon: ({color, focused}) => {
            const scale = useSharedValue(focused ? 1.3 : 1);
            const opacity = useSharedValue(focused ? 1 : 0.6);

            const animatedStyle = useAnimatedStyle(() => ({
              transform: [{scale: withTiming(scale.value, {duration: 200})}],
              opacity: withTiming(opacity.value, {duration: 200}),
            }));

            return (
              <Animated.View style={[animatedStyle, {marginTop: 10}]}>
                <Wallet color={color} size={26} />
              </Animated.View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Home}
        options={{
          tabBarIcon: ({color, focused}) => {
            const scale = useSharedValue(focused ? 1.3 : 1);
            const opacity = useSharedValue(focused ? 1 : 0.6);

            const animatedStyle = useAnimatedStyle(() => ({
              transform: [{scale: withTiming(scale.value, {duration: 200})}],
              opacity: withTiming(opacity.value, {duration: 200}),
            }));

            return (
              <Animated.View style={[animatedStyle, {marginTop: 10}]}>
                <Bell color={color} size={26} />
              </Animated.View>
            );
          },
          tabBarBadge: 5,
          tabBarBadgeStyle: {
            backgroundColor: Colors.Error, // Badge background color
            color: Colors.Secondary, // Badge text color
            fontSize: 10,
            minWidth: 18,
            height: 18,
            borderRadius: 9,
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      />
    </Tab.Navigator>
  );
}
