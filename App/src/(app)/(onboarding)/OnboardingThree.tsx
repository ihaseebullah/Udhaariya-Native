import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '../../Theme/Context/Theme';
import Text from '../../components/shared/Text';
import Next from '../../components/shared/Next';
import OnboardingThreeSvg from '../../assets/svg/chasing.svg';
import {useNavigation} from '@react-navigation/native';
import {SplashScreenNavigationProp} from '../../../navigationTypes';
import {ButtonOutline} from '../../components/shared/Buttons';
const OnboardingThree: React.FC = () => {
  const {Colors} = useTheme();
  const navigation = useNavigation<SplashScreenNavigationProp>();

  return (
    <View style={[styles.container, {backgroundColor: Colors.Primary}]}>
      <View style={styles.svgContainer}>
        <OnboardingThreeSvg height={350} width={300} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, {color: Colors.TextPrimary}]}>
          Let Udhaariya do the job!
        </Text>
        <Text
          style={[
            styles.description,
            {color: Colors.TextSecondary, fontSize: 14},
          ]}>
          No more awkward reminders | Smart tracking & auto-reminders. | Voice
          notes & fun chats to settle dues!
        </Text>
        <TouchableOpacity onPress={() => navigation.replace('OnboardingOne')}>
          <ButtonOutline
            onPress={() => {
              navigation.navigate('Auth', {destination: 'Login'});
            }}
            title={'Login'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  svgContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  svgPlaceholder: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingThree;
