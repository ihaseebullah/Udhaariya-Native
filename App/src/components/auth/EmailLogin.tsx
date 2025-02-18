import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '../../Theme/Context/Theme';
import Text from '../shared/Text';
import EmailIcon from '../../assets/logo/email.svg'; // Email Icon SVG

const EmailLogin = () => {
  const {Colors} = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.emailButton,
          {backgroundColor: Colors.Secondary, borderColor: Colors.CardBorder},
        ]}
        onPress={() => {}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.iconContainer}>
            <EmailIcon width={32} height={32} />
          </View>
          <Text
            style={[styles.buttonText, {color: Colors.TextPrimary, flex: 1}]}>
            Continue with your Email
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
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  iconContainer: {
    marginRight: 10, // Space between icon and text
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EmailLogin;
