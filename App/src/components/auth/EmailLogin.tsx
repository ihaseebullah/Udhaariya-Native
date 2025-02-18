import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '../../Theme/Context/Theme';
import Text from '../shared/Text';
import EmailIcon from '../../assets/logo/email.svg'; // Email Icon SVG

const EmailLogin: React.FC = () => {
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
            <EmailIcon width={30} height={30} />
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
    borderRadius: 20,
    borderWidth: 2,
  },
  iconContainer: {
    marginRight: 10, // Space between icon and text
    marginLeft: 15,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default EmailLogin;
