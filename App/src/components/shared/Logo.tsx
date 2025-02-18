import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Logo: React.FC<{size: number}> = ({size}) => {
  return (
    <View>
      <Text style={[styles.text, {fontSize: 15 * size}]}>Bhai,</Text>
      <Text style={[styles.title, {fontSize: 30 * size}]}>Udhaariya</Text>
      <Text
        style={[
          styles.text,
          {fontSize: 15 * size, textAlign: 'right', marginTop: -8},
        ]}>
        dekh lega!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    marginBottom: -8,
  },
  title: {
    fontSize: 30,
  },
});

export default Logo;
