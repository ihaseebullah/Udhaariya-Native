import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import Text from './Text';
import {useTheme} from '../../Theme/Context/Theme';
interface ButtonOutlineProps {
  title: String;
  onPress: () => void;
}
interface ButtonProps {
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
      style={{
        backgroundColor: Colors.CardBackground,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderColor: Colors.TextPrimary,
        borderRadius: 10,
        borderWidth: 0.5,
      }}
      onPress={onPress}>
      <Text style={{fontSize: 18, color: Colors.TextPrimary}}>{title}</Text>
    </TouchableOpacity>
  );
};
export const Button: React.FC<ButtonProps> = ({title, onPress}) => {
  const {Colors} = useTheme();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.TextPrimary,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderColor: Colors.TextPrimary,
        borderWidth: 0.5,
        borderRadius: 10,
        flex: 1,
        marginLeft: 20,
      }}
      onPress={onPress}>
      <Text style={{fontSize: 18, color: Colors.Primary, textAlign: 'center'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
