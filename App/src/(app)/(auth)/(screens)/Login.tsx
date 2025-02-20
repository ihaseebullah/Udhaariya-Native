import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../Theme/Context/Theme';
import {AuthStackNavigationProp} from '../../../../navigationTypes';
import {Icon} from '../../../constants/Icons/Icon';
import axios, {AxiosError} from 'axios';
import {Server} from '../../../constants/server/host';
import CustomLoader from '../../../components/shared/UI/CustomLoader';
import LoginSvg from '../../../assets/svg/login3.svg';
import Text from '../../../components/shared/Text';

const Login: React.FC = () => {
  const {Colors, font} = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp<'Profile'>>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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
      <CustomLoader visible={loading} />

      {/* SVG Section */}
      <View style={[styles.svgContainer, {flex: 1}]}>
        <LoginSvg
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
        />
      </View>

      {/* Input & Button */}
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

        {/* Signup Section */}
        <View style={styles.signupContainer}>
          <Text style={{color: Colors.TextSecondary, textAlign: 'right'}}>
            Not signed up yet?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.signupText, {color: Colors.Blue}]}>
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
  svgContainer: {
    width: '100%',
    height: 200, // Adjust height as needed
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, // Space between SVG and input fields
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
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: -15,
    marginRight: 10,
    marginBottom: 20,
  },
  signupText: {
    marginLeft: 10,
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
});

export default Login;
