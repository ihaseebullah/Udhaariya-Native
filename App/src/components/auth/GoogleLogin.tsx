import React, {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useTheme} from '../../Theme/Context/Theme';
import Text from '../shared/Text';
import Google from '../../assets/logo/google.svg';
GoogleSignin.configure({
  webClientId:
    '356773742763-m13demhj7brhar0cpbgstc55f3edqblj.apps.googleusercontent.com',
});
interface GoogleLoginProps {
  onSuccess: (userData: Object, provider: String) => void;
}
const GoogleLogin: React.FC<GoogleLoginProps> = ({onSuccess}) => {
  const {Colors} = useTheme();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '356773742763-m13demhj7brhar0cpbgstc55f3edqblj.apps.googleusercontent.com',
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userData = await GoogleSignin.signIn();
      onSuccess(userData, 'google');
    } catch (error) {
      console.log('Error with Google Sign-In:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.googleButton,
          {backgroundColor: Colors.Secondary, borderColor: Colors.CardBorder},
        ]}
        onPress={signInWithGoogle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginLeft: 7}}>
            <Google height={40} />
          </View>
          <Text
            style={[styles.buttonText, {color: Colors.TextPrimary, flex: 1}]}>
            Continue with Google
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 2,
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default GoogleLogin;
