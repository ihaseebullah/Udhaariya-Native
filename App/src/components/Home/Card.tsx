import React, {useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import Text, {Strong} from '../shared/Text';
import {useTheme} from '../../Theme/Context/Theme';
import {useUser} from '../../context/UserContext';
import FadeScaleText from './AnimatedText';

const AnimatedCard: React.FC = () => {
  const {Colors} = useTheme();
  const {user} = useUser();
  const [showBalance, setShowBalance] = useState(true);

  // Flip animation state
  const flipProgress = useSharedValue(0);

  // Handle card flip
  const handleFlip = () => {
    flipProgress.value = withTiming(flipProgress.value === 0 ? 180 : 0, {
      duration: 500,
    });
  };

  // Animated style for the front side
  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{perspective: 1000}, {rotateY: `${flipProgress.value}deg`}],
      opacity: interpolate(flipProgress.value, [0, 90], [1, 0]),
    };
  });

  // Animated style for the back side (rotated by 180 degrees)
  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {perspective: 1000},
        {rotateY: `${flipProgress.value - 180}deg`},
      ],
      opacity: interpolate(flipProgress.value, [90, 180], [0, 1]),
    };
  });

  return (
    <TouchableWithoutFeedback onPress={handleFlip}>
      <View style={styles.container}>
        <View style={styles.flipContainer}>
          {/* Front Side */}
          <Animated.View
            style={[
              styles.card,
              {backgroundColor: Colors.CardBorder},
              frontAnimatedStyle,
            ]}>
            <View style={{flex: 1}}>
              <View
                style={{
                  backgroundColor: Colors.Primary,
                  borderRadius: 26,
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Image
                  source={{uri: user?.profilePicture}}
                  width={60}
                  height={60}
                  style={{borderRadius: 20, marginRight: 10}}
                />
                <View style={{flex: 1}}>
                  <Strong style={{fontSize: 18}}>
                    Hello, {user?.fullName}
                  </Strong>
                  <FadeScaleText />
                </View>
              </View>
            </View>
            <View style={styles.balanceContainer}>
              <Strong style={{fontSize: 28}}>
                {showBalance ? '43,421 Rs' : '******'}
              </Strong>
            </View>
          </Animated.View>

          {/* Back Side */}
          <Animated.View
            style={[
              styles.card,
              styles.backSide,
              {backgroundColor: Colors.CardBorder},
              backAnimatedStyle,
            ]}>
            <View style={{flex: 1}}>
              <View
                style={{
                  backgroundColor: Colors.CardBackground,
                  padding: 10,
                  borderRadius: 18,
                }}>
                <View style={[styles.row]}>
                  <Text style={{fontSize: 18}}>Amount You Owe</Text>
                  <Strong style={{fontSize: 18, color: Colors.Error}}>
                    1,400 Rs
                  </Strong>
                </View>
                <View style={[styles.row]}>
                  <Text style={{fontSize: 18}}>Amount Your Friends</Text>
                  <Strong style={{fontSize: 18, color: Colors.Success}}>
                    1,400 Rs
                  </Strong>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={{color: Colors.TextPrimary}}>View Details</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flipContainer: {
    width: 350,
    height: 200,
    position: 'relative',
    marginTop: 20,
  },
  card: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 25,
    padding: 20,
    justifyContent: 'center',
    backfaceVisibility: 'hidden', // Prevents flickering
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backSide: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default AnimatedCard;
