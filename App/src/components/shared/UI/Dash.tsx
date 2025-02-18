import {View, Animated, Dimensions, ViewStyle} from 'react-native';
import React from 'react';
import {useTheme} from '../../../Theme/Context/Theme';

interface DashProps {
  styles: {
    dotsContainer: ViewStyle;
    dot: ViewStyle;
  };
  scrollX: Animated.Value;
}

const Dash: React.FC<DashProps> = ({styles, scrollX}) => {
  const {Colors} = useTheme();
  const {width} = Dimensions.get('window');

  return (
    <View style={styles.dotsContainer}>
      {[0, 1, 2].map(index => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10], // Animated width
          extrapolate: 'clamp',
        });

        const dotColor = scrollX.interpolate({
          inputRange,
          outputRange: [
            Colors.TextSecondary,
            Colors.TextPrimary,
            Colors.TextSecondary,
          ],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: dotWidth,
                backgroundColor: dotColor, // Background color will animate correctly
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default Dash;
