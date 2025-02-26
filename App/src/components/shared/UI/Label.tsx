import {View} from 'react-native';
import React from 'react';
import {useTheme} from '../../../Theme/Context/Theme';
import Text from '../Text';
import {Star} from 'lucide-react-native';

interface TrustRate {
  rate: number;
}

const Trust: React.FC<TrustRate> = ({rate}) => {
  const {Colors} = useTheme();
  return (
    <View
      style={{
        backgroundColor: Colors.Error,
        padding: 2,
        paddingHorizontal: 5,
        borderRadius: 15,
        marginBottom: 10,
        width: 170,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text style={{color: Colors.Primary, marginTop: 3}}>Trust Rate: </Text>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          fill={index < rate ? Colors.FunYellow : 'none'}
          color={index < rate ? Colors.FunYellow : Colors.Primary}
        />
      ))}
    </View>
  );
};

export default Trust;
