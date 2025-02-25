import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import Text from '../shared/Text';
import {useTheme} from '../../Theme/Context/Theme';

const phrases = [
  'Bhai Udhaariya dekh lega',
  'Bhai Udhaariya sambhal lega',
  'Bhai Udhaariya begar lega',
];

const FadeScaleText: React.FC = () => {
  const {Colors} = useTheme();
  const [phraseIndex, setPhraseIndex] = useState(0);

  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    const interval = setInterval(() => {
      opacity.value = withTiming(0, {duration: 500}, () => {
        runOnJS(setPhraseIndex)((phraseIndex + 1) % phrases.length);
        opacity.value = withTiming(1, {duration: 500});
      });

      scale.value = withTiming(0.8, {duration: 500}, () => {
        scale.value = withTiming(1, {duration: 500});
      });
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [phraseIndex]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Text style={{fontSize: 14}}>{phrases[phraseIndex]}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
  },
});

export default FadeScaleText;
