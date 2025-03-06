import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useTheme} from '../../Theme/Context/Theme';
import Text from '../shared/Text';
import Google from '../../assets/logo/google.svg';
import {UserDataProps} from '../Types/ComponentTypes';

GoogleSignin.configure({
  webClientId:
    '356773742763-m13demhj7brhar0cpbgstc55f3edqblj.apps.googleusercontent.com',
});

interface GoogleLoginProps {
  onSuccess: (userData: UserDataProps, provider: string) => void;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({onSuccess}) => {
  const {Colors} = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [remarks, setRemarks] = useState<string | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '356773742763-m13demhj7brhar0cpbgstc55f3edqblj.apps.googleusercontent.com',
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setRemarks('Signing you up...');

      await GoogleSignin.hasPlayServices();
      const returnedUser = (await GoogleSignin.signIn()).data?.user;

      setLoading(false);
      setRemarks('✅ Signup Successful');
      const userData = {
        firstName: returnedUser?.givenName,
        lastName: returnedUser?.familyName,
        id: returnedUser?.id,
        email: returnedUser?.email,
        profilePic: returnedUser?.photo,
      };
      onSuccess(userData, 'google');
    } catch (error) {
      setLoading(false);
      setRemarks('❌ Signup Failed! Try Again');
      console.log('Error with Google Sign-In:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.googleButton,
          {backgroundColor: Colors.Secondary, borderColor: Colors.CardBorder},
        ]}
        onPress={signInWithGoogle}
        disabled={loading}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginLeft: 7}}>
            {loading ? (
              <ActivityIndicator style={{padding: 5}} size={30} />
            ) : (
              <Google height={40} />
            )}
          </View>
          <Text
            style={[styles.buttonText, {color: Colors.TextPrimary, flex: 1}]}>
            {loading
              ? 'Signing You In...'
              : remarks
              ? remarks
              : 'Continue with Google'}
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
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default GoogleLogin;
