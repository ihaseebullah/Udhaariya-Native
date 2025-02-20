import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTheme} from '../../../Theme/Context/Theme';
import Logo from '../../../components/shared/Logo';
import {Icon} from '../../../constants/Icons/Icon';
import {AuthStackNavigationProp} from '../../../../navigationTypes';

const ProfileScreen: React.FC = () => {
  const {Colors, font} = useTheme();
  const route = useRoute();
  const email = (route.params as {email: string})?.email;
  const navigation = useNavigation<AuthStackNavigationProp<'Profile'>>();
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowLogo(false);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowLogo(true);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = () => {
    if (pin.length === 4) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log('Logged in successfully');
      }, 1500);
    } else {
      console.log('Please enter a 4-digit PIN.');
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: Colors.Primary}]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          marginTop: 20,
          backgroundColor: Colors.CardBackground,
          padding: 10,
          borderRadius: 50,
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: Colors.CardBorder,
          borderWidth: 2,
        }}>
        <Icon name="back" />
      </TouchableOpacity>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {showLogo && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 20,
            }}>
            <View style={{maxWidth: '93%'}}>
              <Logo size={2} key={'ProfileScreenLogo'} />
            </View>
          </View>
        )}
      </View>
      <View
        style={{
          justifyContent: 'center',
          width: '100%',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: 'https://randomuser.me/api/portraits/men/51.jpg',
          }}
          style={[styles.profileImage, {borderColor: Colors.CardBorder}]}
        />
        <Text
          style={[styles.name, {color: Colors.TextPrimary, fontFamily: font}]}>
          John Doe
        </Text>
        <Text
          style={[
            styles.email,
            {color: Colors.TextSecondary, fontFamily: font},
          ]}>
          {email}
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextInput
          value={pin}
          onChangeText={setPin}
          placeholder="Enter your PIN"
          placeholderTextColor={Colors.TextSecondary}
          style={[
            styles.input,
            {
              borderColor: Colors.CardBorder,
              color: Colors.TextPrimary,
              backgroundColor: Colors.CardBackground,
              borderRadius: 26,
              fontFamily: font,
            },
          ]}
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry
        />

        <TouchableOpacity
          disabled={loading || pin.length !== 4}
          style={[
            styles.button,
            {
              backgroundColor: Colors.CardBackground,
              padding: 10,
              borderWidth: 2,
              borderColor: Colors.CardBorder,
              borderRadius: 26,
            },
          ]}
          onPress={handleLogin}>
          <Text style={[styles.buttonText, {color: Colors.Primary}]}>
            {loading ? (
              <ActivityIndicator size={25} color={Colors.TextPrimary} />
            ) : (
              <Icon name="Next" />
            )}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: -15,
          justifyContent: 'flex-end',
          marginRight: 10,
          marginBottom: 20,
        }}>
        <Text style={{color: Colors.TextSecondary, textAlign: 'right'}}>
          Forgot your pin?
        </Text>
        <TouchableOpacity onPress={() => console.log('Login')}>
          <Text
            style={{
              marginLeft: 10,
              color: Colors.Blue,
              textDecorationLine: 'underline',
              textAlign: 'right',
            }}>
            Reset here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    padding: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
