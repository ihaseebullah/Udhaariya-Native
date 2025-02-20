import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../Theme/Context/Theme';
import {AuthStackNavigationProp} from '../../../../navigationTypes';
import Logo from '../../../components/shared/Logo';
import {Icon} from '../../../constants/Icons/Icon';
import axios, {AxiosError} from 'axios';
import {Server} from '../../../constants/server/host';

const Login: React.FC = () => {
  const {Colors, font} = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp<'Profile'>>();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const getUserData = async () => {
    try {
      setLoading(true);
      const response = axios.get(`${Server}/auth/login/user/${email}`);
      if ((await response).status === 200) {
        let user = (await response).data;
        setLoading(false);
        return user;
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
      }
    }
  };
  const handleNext = async () => {
    if (!email) {
      console.log('Email is required');
      return;
    }
    const userData = await getUserData();
    navigation.navigate('Profile', {userData: userData});
  };

  return (
    <View style={[styles.container, {backgroundColor: Colors.Primary}]}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 50,
          }}>
          <View style={{maxWidth: '93%'}}>
            <Logo size={2} key={'LoginScreenLogo'} />
          </View>
        </View>
      </View>

      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email or username"
            placeholderTextColor={Colors.TextSecondary}
            style={[
              styles.input,
              {
                borderColor: Colors.CardBorder,
                color: Colors.TextPrimary,
                backgroundColor: Colors.CardBackground,
                borderRadius: 26,
                fontFamily: font,
                flex: 1,
                marginRight: 5,
              },
            ]}
            keyboardType="email-address"
          />
          <TouchableOpacity
            disabled={loading || !email}
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
            onPress={handleNext}>
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
            Not signed up yet?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                marginLeft: 10,
                color: Colors.Blue,
                textDecorationLine: 'underline',
                textAlign: 'right',
              }}>
              Signup here
            </Text>
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 24,
    marginBottom: 50,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
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

export default Login;
