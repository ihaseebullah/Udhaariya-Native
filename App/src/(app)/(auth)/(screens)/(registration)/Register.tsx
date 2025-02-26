import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import GoogleLogin from '../../../../components/auth/GoogleLogin';
import FacebookLogin from '../../../../components/auth/FacebookLogin';
import {useTheme} from '../../../../Theme/Context/Theme';
import Text from '../../../../components/shared/Text';
import Udhaariya from '../../../../assets/logo/udhaariya1.svg';
import EmailLogin from '../../../../components/auth/EmailLogin';
import Logo from '../../../../components/shared/Logo';
import {Icon} from '../../../../constants/Icons/Icon';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavigationProp} from '../../../../../navigationTypes';
import {useRegistration} from '../../../../context/RegistrationContext';
import {UserDataProps} from '../../../../components/Types/ComponentTypes';
const Register: React.FC = () => {
  const {Colors} = useTheme(); // Access theme-based Colors
  const navigation = useNavigation<AuthStackNavigationProp<'Register'>>();
  const {setUserData, userSignupData} = useRegistration();
  const handleSuccess = function (userData: UserDataProps, provider: string) {
    setUserData(userData);
    navigation.navigate('Create');
  };
  return (
    <>
      <View style={[styles.container, {backgroundColor: Colors.Primary}]}>
        <View style={styles.svgContainer}>
          <Logo size={1.5} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Icon
            name="info"
            size={20}
            style={{marginRight: 5, marginBottom: 5}}
          />
          <Text style={{color: Colors.TextSecondary}}>
            Using social signup is Recommended
          </Text>
        </View>
        <GoogleLogin onSuccess={handleSuccess} />
        <FacebookLogin onSuccess={handleSuccess} />
        <EmailLogin />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{color: Colors.TextSecondary}}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                marginLeft: 10,
                color: Colors.Blue,
                textDecorationLine: 'underline',
              }}>
              Login here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          textAlign: 'center',
          marginBottom: 5,
          backgroundColor: Colors.Primary,
        }}>
        Powered By Promeol
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  svgContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  emailButton: {
    marginTop: 15,
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Register;
