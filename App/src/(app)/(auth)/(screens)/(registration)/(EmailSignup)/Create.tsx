import React, {useEffect, useRef, useState} from 'react';
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
import Dash from '../../../../../components/shared/UI/Dash';
import {useRegistration} from '../../../../../context/RegistrationContext';
import axios, {AxiosError} from 'axios';
import {Server} from '../../../../../constants/server/host';
import {Icon} from '../../../../../constants/Icons/Icon';

const {width} = Dimensions.get('window');

const Create: React.FC = () => {
  const {Colors, font} = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp<'Create'>>();
  const {userSignupData} = useRegistration();
  //OTP Verification ---------Yet to implement
  const [OTPSent, setOTPSent] = useState<boolean>(false);
  const [OTP, setOTP] = useState('');
  const [correctOTP, setCorrectOTP] = useState<string>();
  const [OTPVerified, setOTPVerified] = useState<boolean>(false);
  const [uregisterId, setUregisterId] = useState<string>();
  const [invalidUsername, setInvalidUsername] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  const [checkingUsername, setCheckingUsername] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: userSignupData?.firstName,
    lastName: userSignupData?.lastName,
    email: userSignupData?.email,
    username:
      `i${userSignupData?.firstName}_${userSignupData?.lastName}`.toLowerCase(),
    pin: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    pin: '',
  });

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    checkUsernameAvailability();
  }, [username]);
  const handleNext = async () => {
    if (currentIndex < 2) {
      if (currentIndex === 0) {
      }
      flatListRef.current?.scrollToIndex({index: currentIndex + 1});
      setCurrentIndex(prev => prev + 1);
    } else {
      console.log('User Data:', formData);
      navigation.navigate('Login');
    }
  };
  const checkUsernameAvailability = async () => {
    try {
      setCheckingUsername(true);
      if (!formData.username) {
        setInvalidUsername(true);
        setCheckingUsername(false);
        return;
      }

      if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
        setInvalidUsername(true);
        setCheckingUsername(false);
        return;
      }

      const response = await axios.put(
        `${Server}/auth/register/verify-username`,
        {
          username: formData.username.toLowerCase(),
        },
      );

      console.log('Response:', response.data);

      if (response.status === 200) {
        setInvalidUsername(false);
        setCheckingUsername(false);
      }
    } catch (err: unknown) {
      console.error('Error checking username:', err);

      if (err instanceof AxiosError) {
        setCheckingUsername(false);
        if (err.response) {
          if (err.response.status === 400) {
            console.log('Username is required.');
          } else if (err.response.status === 403) {
            console.log('Username already exists.');
            setInvalidUsername(true);
          } else {
            console.log('Server error:', err.response.data.message);
          }
        } else if (err.request) {
          console.log('No response from server. Check network connection.');
        } else {
          console.log('Unexpected error:', err.message);
        }
      }
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
  const handleVerifyOTP = () => {
    if (correctOTP === OTP) {
      setOTPVerified(true);
    } else {
      console.log('Invalid OTP');
    }
  };
  const handleSendOTP = async () => {
    try {
      const response = await axios.post(`${Server}/auth/uregister`, {
        email: formData.email,
        password: userSignupData?.id,
        fullName: `${formData.firstName} ${formData.lastName}`,
      });

      if (response.status === 201) {
        setOTPSent(true);
        setUregisterId(response.data.URId);
        setCorrectOTP(response.data.OTP);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          if (error.response.status === 403) {
            console.log('User Already Exists');
            navigation.replace('Login');
          } else if (error.response.status === 400) {
            console.log('Email and password are required.');
          } else {
            console.log('Error:', error.response.data.message);
          }
        } else {
          console.log('Network error:', error.message);
        }
      }
    }
  };

  const handleSignUp = () => {
    axios
      .post(`${Server}/auth/register`, {
        uregisterId: uregisterId,
        otp: OTP,
        pin: formData.pin,
      })
      .then(res => {
        if (res.status === 201) {
          console.log('User Registered');
          navigation.replace('Login');
        }
      });
  };
  const renderItem = ({item}: {item: number}) => {
    return (
      <View style={[styles.slide, {backgroundColor: Colors.CardBackground}]}>
        {item === 0 && (
          <View>
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
                  value={formData.firstName ? formData.firstName : ''}
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
                  value={formData.lastName ? formData.lastName : ''}
                  onChangeText={text => handleInputChange('lastName', text)}
                />
                {errors.lastName ? (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                ) : null}
              </View>
            </View>
            <View style={{marginBottom: -15}}>
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
                placeholder="username"
                placeholderTextColor={Colors.TextSecondary}
                value={formData.username}
                onChangeText={text => {
                  handleInputChange('username', text);
                  setUsername(text);
                }}
              />
              {invalidUsername ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: -5,
                  }}>
                  <Icon name="info" size={16} style={{marginRight: 5}} />
                  <Text
                    style={
                      styles.errorText
                    }>{`${formData.username} not available`}</Text>
                </View>
              ) : null}
            </View>
          </View>
        )}
        {item === 1 && (
          <View>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.email
                      ? Colors.Error
                      : Colors.CardBorder,
                    color: Colors.TextPrimary,
                    fontFamily: font,
                    fontSize: 14,
                    width: '70%',
                    marginRight: 10,
                  },
                ]}
                placeholder="Email"
                placeholderTextColor={Colors.TextSecondary}
                keyboardType="email-address"
                value={formData.email}
                onChangeText={text => handleInputChange('email', text)}
              />
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.pin ? Colors.Error : Colors.CardBorder,
                    color: Colors.TextPrimary,
                    fontFamily: font,
                    flex: 1,
                  },
                ]}
                placeholder="OTP"
                keyboardType="number-pad"
                maxLength={6}
                placeholderTextColor={Colors.TextSecondary}
                onChangeText={setOTP}
              />
            </View>
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
                  borderColor: errors.pin ? Colors.Error : Colors.CardBorder,
                  color: Colors.TextPrimary,
                  fontFamily: font,
                },
              ]}
              placeholder="Enter 4-digit PIN"
              keyboardType="number-pad"
              maxLength={4}
              placeholderTextColor={Colors.TextSecondary}
              value={formData.pin}
              onChangeText={text => handleInputChange('pin', text)}
            />
            {errors.pin ? (
              <Text style={styles.errorText}>{errors.pin}</Text>
            ) : null}
          </View>
        )}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            disabled={currentIndex === 0 ? true : false}
            style={[
              styles.button,
              {
                borderColor: Colors.CardBorder,
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
                {color: Colors.TextPrimary, fontSize: 16},
              ]}>
              {'   Back   '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: Colors.TextPrimary,
                borderRadius: 12,
                paddingVertical: 8,
                flex: 1,
              },
            ]}
            onPress={
              currentIndex === 0
                ? handleNext
                : currentIndex === 1 && !OTPVerified && !OTPSent
                ? handleSendOTP
                : currentIndex === 1 && !OTPVerified && OTPSent
                ? handleVerifyOTP
                : currentIndex === 1 && OTPVerified
                ? handleNext
                : handleSignUp
            }>
            <Text
              style={[
                styles.buttonText,
                {color: Colors.Primary, fontSize: 16},
              ]}>
              {currentIndex === 0
                ? 'Next'
                : currentIndex === 1 && !OTPVerified && !OTPSent
                ? 'Send OTP'
                : currentIndex === 1 && !OTPVerified && OTPSent
                ? 'Verify'
                : currentIndex === 1 && OTPVerified
                ? 'Next'
                : 'Sign Up'}
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
      <Dash scrollX={scrollX} styles={styles} />
    </KeyboardAvoidingView>
  );
};

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

export default Create;
