import {View} from 'react-native';
import React, {useEffect} from 'react';
import Udhaariya from '../../assets/logo/udhaariya.svg';
import Text from '../../components/shared/Text';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../../navigationTypes';
import {useUser} from '../../context/UserContext';

const Splash: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<'Splash'>>();
  const {user, loading} = useUser();

  useEffect(() => {
    if (!loading) {
      if (user) {
        console.log(user);
        navigation.navigate('Main');
      } else {
        navigation.navigate('Auth', {destination: 'Register'});
      }
    }
  }, [loading, user, navigation]);

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Udhaariya height={300} width={300} />
        <View>
          <Text style={{fontSize: 15, textAlign: 'left', marginBottom: -8}}>
            Bhai,
          </Text>
          <Text style={{fontSize: 30}}>Udhaariya</Text>
          <Text style={{fontSize: 15, textAlign: 'right', marginTop: -8}}>
            dekh lega!
          </Text>
        </View>
      </View>
      <Text style={{textAlign: 'center', marginBottom: 5}}>
        Powered By Promeol
      </Text>
    </>
  );
};

export default Splash;
