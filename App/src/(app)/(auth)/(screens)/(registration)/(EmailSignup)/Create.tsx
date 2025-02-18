import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '../../../../../Theme/Context/Theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {
  AuthStackNavigationProp,
  AuthStackParamList,
} from '../../../../../../navigationTypes';

const Create: React.FC = () => {
  const {Colors} = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp<'Create'>>();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}></TouchableOpacity>
      <Text>Create</Text>
    </View>
  );
};

export default Create;
