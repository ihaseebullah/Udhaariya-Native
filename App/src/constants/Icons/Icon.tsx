import React from 'react';
import {Text, TextStyle} from 'react-native';
import {Icons} from './Icons';

interface IconProps {
  name: keyof typeof Icons;
  size?: number;
  color?: string; // Added color prop
  style?: TextStyle | TextStyle[];
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'black',
  style,
}) => {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    return <Text>Icon not found</Text>;
  }

  return (
    <IconComponent width={size} height={size} fill={color} style={style} />
  );
};
