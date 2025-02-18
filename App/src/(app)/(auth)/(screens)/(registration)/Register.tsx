import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import GoogleLogin from '../../../../components/auth/GoogleLogin';
import FacebookLogin from '../../../../components/auth/FacebookLogin';
import {useTheme} from '../../../../Theme/Context/Theme';
import Text from '../../../../components/shared/Text';
import Udhaariya from '../../../../assets/logo/udhaariya1.svg';
import EmailLogin from '../../../../components/auth/EmailLogin';
import Logo from '../../../../components/shared/Logo';
import {Info} from '../../../../constants/Icons/Icons';
import {Icon} from '../../../../constants/Icons/Icon';
const {width} = Dimensions.get('window');
const Register: React.FC = () => {
  const {Colors} = useTheme(); // Access theme-based Colors
  const handleSuccess = function (userData: Object, provider: String) {
    console.log(userData);
  };
  return (
    <>
      <View style={[styles.container, {backgroundColor: Colors.Primary}]}>
        <View style={styles.svgContainer}>
          <Logo size={1.5} />
        </View>
        <View>
          <Icon name="info" />
          <Text style={{color: Colors.TextSecondary}}>
            It is highly encouraged using facebook or google to signup to the
            app
          </Text>
        </View>
        <GoogleLogin onSuccess={handleSuccess} />
        <FacebookLogin onSuccess={handleSuccess} />
        <EmailLogin />
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
