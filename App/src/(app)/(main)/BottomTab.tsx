import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './(home)/Home';
import {Wallet, Home as HomeIcon, Bell} from 'lucide-react-native';
import {useTheme} from '../../Theme/Context/Theme';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const {Colors} = useTheme(); // Access the theme colors

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.Primary, // Use Primary as the tab bar background
          borderTopColor: Colors.CardBorder, // Subtle border for separation
        },
        tabBarActiveTintColor: Colors.TintColorLight, // Active icon/text color
        tabBarInactiveTintColor: Colors.TextSecondary, // Inactive icon/text color
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <HomeIcon color={color} style={{marginTop: 10}} size={26} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Wallet color={color} style={{marginTop: 10}} size={26} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Bell color={color} style={{marginTop: 10}} size={26} />
          ),
          tabBarBadge: 5,
          tabBarBadgeStyle: {
            backgroundColor: Colors.Error, // Use Error color for badge
            color: Colors.Secondary, // Contrast text color
            fontSize: 10,
            minWidth: 18,
            height: 18,
            borderRadius: 9,
          },
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
