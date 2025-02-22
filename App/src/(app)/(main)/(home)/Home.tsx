import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
} from 'react-native';
import {useTheme} from '../../../Theme/Context/Theme';
import Text from '../../../components/shared/Text';
import {useUser} from '../../../context/UserContext';

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const {Colors, isDarkMode, toggleTheme} = useTheme();
  const {user} = useUser();
  return (
    <View>
      <Text>Hello {user?.fullName}.</Text>
    </View>
  );
};

export default Home;
