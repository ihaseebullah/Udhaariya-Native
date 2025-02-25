import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {useTheme} from '../../../Theme/Context/Theme';
import Text, {Strong} from '../../../components/shared/Text';
import {useUser} from '../../../context/UserContext';
import {Eye, EyeClosed} from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';

const Home: React.FC = () => {
  const {Colors} = useTheme();
  const {user} = useUser();
  const [showBalance, setShowBalance] = useState(true);

  const rotation = useSharedValue(0); // Initial rotation at 0°

  const handleFlip = () => {
    rotation.value = withSpring(rotation.value === 0 ? 180 : 0, {
      damping: 10,
      stiffness: 80,
    });
  };

  // Front card animation style
  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateY: `${interpolate(rotation.value, [0, 180], [0, 180])}deg`},
      ],
      backfaceVisibility: 'hidden',
    };
  });

  // Back card animation style
  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateY: `${interpolate(rotation.value, [0, 180], [180, 360])}deg`},
      ],
      backfaceVisibility: 'hidden',
    };
  });

  return (
    <View style={styles.container}>
      {/* Flip Container */}
      <TouchableWithoutFeedback onPress={handleFlip}>
        <View style={styles.flipContainer}>
          {/* Front Card */}
          <Animated.View
            style={[
              styles.card,
              {backgroundColor: Colors.FunYellow},
              frontAnimatedStyle,
            ]}>
            <View style={{flex: 1}}>
              <Strong style={{fontSize: 24}}>Hello, {user?.fullName}</Strong>
              <Text style={{fontSize: 16}}>Bhai Udhaariya dekh lega</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Strong style={{fontSize: 28}}>
                {showBalance ? '43,421 Rs' : '******'}
              </Strong>
              <TouchableOpacity
                style={{padding: 10}}
                onPress={e => {
                  console.log('clicked');
                  e.stopPropagation();
                  setShowBalance(prev => !prev);
                }}>
                {showBalance ? <Eye size={24} /> : <EyeClosed size={24} />}
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Back Card (Visible when flipped) */}
          <Animated.View
            style={[
              styles.card,
              {backgroundColor: Colors.FunYellow},
              backAnimatedStyle,
            ]}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Hidden Details
            </Text>
            <Text style={{fontSize: 16}}>
              More content appears here after flipping.
            </Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'flex-start', // Align card to the top
  },
  flipContainer: {
    width: 350,
    height: 200,
    position: 'relative',
    marginTop: 20, // Adjusted to move the card to the top
  },
  card: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 25,
    padding: 20,
    justifyContent: 'center',
  },
});

export default Home;
