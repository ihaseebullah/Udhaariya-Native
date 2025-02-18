import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {useTheme} from '../../Theme/Context/Theme';
import Text from '../shared/Text';
import Facebook from '../../assets/logo/facebook.svg'; // Import Facebook logo SVG
interface FacebookLoginProps {
  onSuccess: (userData: Object, provider: String) => void;
}
const FacebookLogin: React.FC<FacebookLoginProps> = ({onSuccess}) => {
  const {Colors} = useTheme(); // Get theme colors

  async function onFacebookButtonPress() {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
      // Get the user's AccessToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Fetch user details from Facebook Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture{url},first_name,last_name&access_token=${data.accessToken}`,
      );
      const userData = await response.json();
      console.log('Facebook User Data:', userData);
    } catch (error) {
      console.log('Facebook Login Error:', error);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.facebookButton,
          {
            backgroundColor: Colors.Secondary,
            borderColor: Colors.CardBorder,
          },
        ]}
        onPress={onFacebookButtonPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginLeft: 7}}>
            <Facebook height={40} />
          </View>
          <Text
            style={[styles.buttonText, {color: Colors.TextPrimary, flex: 1}]}>
            Continue with Facebook
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
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default FacebookLogin;
