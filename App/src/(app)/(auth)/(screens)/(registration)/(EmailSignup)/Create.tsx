import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useTheme} from '../../../../../Theme/Context/Theme';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavigationProp} from '../../../../../../navigationTypes';

const {width} = Dimensions.get('window');

const Create: React.FC = () => {
  const {Colors, font} = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp<'Create'>>();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
  });

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < 2) {
      flatListRef.current?.scrollToIndex({index: currentIndex + 1});
      setCurrentIndex(prev => prev + 1);
    } else {
      console.log('User Data:', formData);
      navigation.navigate('Login');
    }
  };

  const handleBack = () => {
    flatListRef.current?.scrollToIndex({index: currentIndex - 1});
    setCurrentIndex(prev => prev - 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({...formData, [field]: value});
    //@ts-ignore
    if (errors[field]) {
      setErrors({...errors, [field]: ''});
    }
  };

  const renderItem = ({item}: {item: number}) => {
    return (
      <View style={[styles.slide, {backgroundColor: Colors.CardBackground}]}>
        {item === 0 && (
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.firstName
                      ? Colors.Error
                      : Colors.CardBorder,
                    color: Colors.TextPrimary,
                    fontFamily: font,
                  },
                ]}
                placeholder="First Name"
                placeholderTextColor={Colors.TextSecondary}
                value={formData.firstName}
                onChangeText={text => handleInputChange('firstName', text)}
              />
              {errors.firstName ? (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.lastName
                      ? Colors.Error
                      : Colors.CardBorder,
                    color: Colors.TextPrimary,
                    fontFamily: font,
                  },
                ]}
                placeholder="Last Name"
                placeholderTextColor={Colors.TextSecondary}
                value={formData.lastName}
                onChangeText={text => handleInputChange('lastName', text)}
              />
              {errors.lastName ? (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              ) : null}
            </View>
          </View>
        )}
        {item === 1 && (
          <View>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: errors.email ? Colors.Error : Colors.CardBorder,
                  color: Colors.TextPrimary,
                  fontFamily: font,
                },
              ]}
              placeholder="Email"
              placeholderTextColor={Colors.TextSecondary}
              keyboardType="email-address"
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>
        )}
        {item === 2 && (
          <View>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: errors.dob ? Colors.Error : Colors.CardBorder,
                  color: Colors.TextPrimary,
                  fontFamily: font,
                },
              ]}
              placeholder="Date of Birth (YYYY-MM-DD)"
              placeholderTextColor={Colors.TextSecondary}
              value={formData.dob}
              onChangeText={text => handleInputChange('dob', text)}
            />
            {errors.dob ? (
              <Text style={styles.errorText}>{errors.dob}</Text>
            ) : null}
          </View>
        )}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            disabled={currentIndex === 0 ? true : false}
            style={[
              styles.button,
              {
                backgroundColor: Colors.TextPrimary,
                borderRadius: 12,
                borderWidth: 1,
                paddingVertical: 10,
                marginRight: 5,
              },
            ]}
            onPress={handleBack}>
            <Text
              style={[
                styles.buttonText,
                {color: Colors.Primary, fontSize: 16},
              ]}>
              {'  Back  '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                borderColor: Colors.CardBorder,
                borderRadius: 12,
                borderWidth: 1,
                paddingVertical: 8,
                flex: 1,
              },
            ]}
            onPress={handleNext}>
            <Text
              style={[
                styles.buttonText,
                {color: Colors.TextPrimary, fontSize: 16},
              ]}>
              {currentIndex < 2 ? ' Next ' : ' Sign Up '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, {backgroundColor: Colors.CardBackground}]}>
      <Animated.FlatList
        ref={flatListRef}
        data={[0, 1, 2]}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.toString()}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
      />

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {[0, 1, 2].map(index => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [20, 20, 20],
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
                  backgroundColor: dotColor,
                },
              ]}
            />
          );
        })}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  slide: {
    width: width - 40,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});
