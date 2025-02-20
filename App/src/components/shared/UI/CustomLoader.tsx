import React, {useEffect, useRef} from 'react';
import {View, Modal, StyleSheet, Animated} from 'react-native';
import {useTheme} from '../../../Theme/Context/Theme'; // Assuming you have a theme context
import Logo from '../Logo';

interface CustomLoaderProps {
  visible: boolean;
  text?: string;
}

const CustomLoader: React.FC<CustomLoaderProps> = ({visible, text}) => {
  const {Colors} = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Controls the fade animation for the logo

  useEffect(() => {
    if (visible) {
      // Start fade-in/out animation for the logo
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600, // Smooth fade-in
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 600, // Smooth fade-out
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      fadeAnim.setValue(0); // Reset animation when loader closes
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View
          style={[
            styles.loaderContainer,
            {
              backgroundColor: Colors.CardBackground,
              borderColor: Colors.CardBorder,
              borderWidth: 2,
            },
          ]}>
          {/* Animated Logo */}
          <Animated.View style={{opacity: fadeAnim, marginTop: -10}}>
            <Logo size={0.9} />
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  loaderContainer: {
    width: 180,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
});

export default CustomLoader;
