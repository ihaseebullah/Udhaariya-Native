// Icon.tsx
import React from 'react';
import {View, Text, TextStyle} from 'react-native';
import {Icons} from './Icons';

interface IconProps {
  name: keyof typeof Icons;
  size?: number;
  style?: TextStyle | TextStyle[];
}

export const Icon: React.FC<IconProps> = ({name, size = 24, style}) => {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    return <Text>Icon not found</Text>;
  }

  return <IconComponent width={size} style={style} height={size} />;
};
