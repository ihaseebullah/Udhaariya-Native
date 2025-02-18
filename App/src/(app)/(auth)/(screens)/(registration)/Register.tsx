import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import GoogleLogin from '../../../../components/auth/GoogleLogin';
import FacebookLogin from '../../../../components/auth/FacebookLogin';
import {useTheme} from '../../../../Theme/Context/Theme';
import Text from '../../../../components/shared/Text';
import Udhaariya from '../../../../assets/logo/udhaariya1.svg';
import EmailLogin from '../../../../components/auth/EmailLogin';
const {width} = Dimensions.get('window');

const Register = () => {
  const {Colors} = useTheme(); // Access theme-based Colors

  return (
    <View style={[styles.container, {backgroundColor: Colors.Primary}]}>
      <View style={styles.svgContainer}>
        <Udhaariya height={200} />
      </View>

      <Text style={[styles.title, {color: Colors.TextPrimary}]}>
        Create an Account
      </Text>

      <GoogleLogin />
      <FacebookLogin />
      <EmailLogin />
    </View>
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
    marginBottom: 20,
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
