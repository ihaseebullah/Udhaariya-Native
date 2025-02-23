import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './(home)/Home';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Home2" component={Home} />
    </Tab.Navigator>
  );
}
