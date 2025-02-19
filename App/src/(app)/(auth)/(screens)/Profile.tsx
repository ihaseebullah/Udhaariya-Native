import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useTheme} from '../../../Theme/Context/Theme';
import Text from '../../../components/shared/Text';
import {Button} from '../../../components/shared/Buttons';

const ProfileScreen: React.FC = () => {
  const {Colors} = useTheme();
  const route = useRoute();
  const email = (route.params as {email: string})?.email;
  const [pin, setPin] = useState('');

  const handleLogin = () => {
    if (pin.length === 4) {
      console.log('Welcome Back! 🎉');
    } else {
      console.log('Please enter a 4-digit PIN.');
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: Colors.Primary}]}>
      <Text style={[styles.title, {color: Colors.TextPrimary}]}>
        Hi, {email}
      </Text>

      <TextInput
        value={pin}
        onChangeText={setPin}
        style={styles.input}
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry
      />

      <Button title={'Next'} onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    padding: 8,
    borderRadius: 10,
  },
});

export default ProfileScreen;
