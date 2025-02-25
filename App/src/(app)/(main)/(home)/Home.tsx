import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {useTheme} from '../../../Theme/Context/Theme';
import {useUser} from '../../../context/UserContext';

import AnimatedCard from '../../../components/Home/Card';

const Home: React.FC = () => {
  const {Colors} = useTheme();
  const {user} = useUser();

  return (
    <View style={styles.container}>
      <AnimatedCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'flex-start', // Align card to the top
  },
});

export default Home;
