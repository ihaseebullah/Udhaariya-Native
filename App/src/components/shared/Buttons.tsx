import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import Text from './Text';
import {useTheme} from '../../Theme/Context/Theme';
interface ButtonOutlineProps {
  title: String;
  onPress: () => void;
}
export const ButtonOutline: React.FC<ButtonOutlineProps> = ({
  title,
  onPress,
}) => {
  const {Colors} = useTheme();
  return (
    <TouchableOpacity
      style={{backgroundColor: Colors.CardBackground}}
      onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
