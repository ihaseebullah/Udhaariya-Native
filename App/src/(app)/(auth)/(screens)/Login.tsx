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

const Login: React.FC = () => {
  const {Colors, font} = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp<'Profile'>>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const handleNext = () => {
    navigation.navigate('Profile', {email: 'ihaseebullah@gmail.com'});
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

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email or username"
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
