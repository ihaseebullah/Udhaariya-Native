// Icon.tsx
import React from 'react';
import {View, Text} from 'react-native';
import {Icons} from './Icons';

interface IconProps {
  name: keyof typeof Icons;
  width?: number;
  height?: number;
}

export const Icon: React.FC<IconProps> = ({name, width = 24, height = 24}) => {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    return <Text>Icon not found</Text>;
  }

  return <IconComponent width={width} height={height} />;
};
