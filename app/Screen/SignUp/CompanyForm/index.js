import React, {useState, useRef, useReducer} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Styles from '@Screen/SignUp/Style';
import Color from '../../../../assets/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Material from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Company_SignUp, User_Login} from '../../../Component/Helper/Helper';
import {RNToasty} from 'react-native-toasty';
import Spinner from '../../../Component/Spinner/Spinner';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;

const CompanyForm = ({navigation}) => {
  const typeOfBusinessInput = useRef(null);
  const PhoneInput = useRef(null);
  const EmailInput = useRef(null);
  const PasswordInput = useRef(null);
  const ConfirmPasswordInput = useRef(null);
  const ZipcodeInput = useRef(null);

  const [FormData, SetFormData] = useState({
    fullname: '',
    typeofbusiness: '',
    phonenumber: '',
    email: '',
    password: '',
    zipcode: '',
    confirmPassword: '',
  });

  const [BadFullName, SetBadFullName] = useState(false);
  const [BadTypeBusiness, SetBadTypeBusiness] = useState(false);
  const [BadNumber, SetBadNumber] = useState(false);
  const [BadPassword, SetBadPassword] = useState(false);
  const [BadEmail, SetBadEmail] = useState(false);
  const [BadZip, SetBadZip] = useState(false);
  const [IsLoading, SetIsLoading] = useState(false);
  const [KeyboardViewEnable, SetKeyboardViewEnable] = useState(true);

  const SignUp = () => {
    if (validate()) {
      const {
        fullname,
        typeofbusiness,
        phonenumber,
        email,
        password,
        zipcode,
      } = FormData;
      SetIsLoading(true);
      Company_SignUp('api/user/signup', {
        email: email,
        password: password,
        role: 'company',
        fullName: fullname,
        typeOfBusiness: typeofbusiness,
        phone: phonenumber,
        zipCode: zipcode,
      })
        .then((data) => data.json())
        .then((res) => {
          console.log(res, 'company sign up');
          if (res.status === 201) {
            console.log(res, 'company')
            SetIsLoading(false);
            SetFormData({
              fullname: '',
              typeofbusiness: '',
              phonenumber: '',
              email: '',
              password: '',
              zipcode: '',
              confirmPassword: '',
            });
            RNToasty.Success({
              title: res.message,
              fontFamily: 'Montserrat-Medium',
            });
            navigation.navigate('OTPVerification');
          } else {
            SetIsLoading(false);
            alert(res.message);
          }
        })
        .catch((e) => {
          console.log(e);
          alert('Something went wrong...!');
          SetIsLoading(false);
        });
    }
  };

  const validate = () => {
    let valid = true;

    if (FormData.fullname === '') {
      valid = false;
      SetBadFullName(true);
    } else {
      SetBadFullName(false);
    }

    if (FormData.typeofbusiness === '') {
      valid = false;
      SetBadTypeBusiness(true);
    } else {
      SetBadTypeBusiness(false);
    }

    if (FormData.phonenumber.length != 10) {
      valid = false;
      SetBadNumber(true);
    } else {
      SetBadNumber(false);
    }

    if (reg.test(FormData.email) === false) {
      valid = false;
      SetBadEmail(true);
    } else {
      SetBadEmail(false);
    }

    if (
      FormData.password != FormData.confirmPassword ||
      (FormData.password === '' && FormData.confirmPassword === '') ||
      FormData.password.length <= 5
    ) {
      valid = false;
      SetBadPassword(true);
    } else {
      SetBadPassword(false);
    }

    if (FormData.zipcode.length < 5 || FormData.zipcode.length > 6) {
      valid = false;
      SetBadZip(true);
    } else {
      SetBadZip(false);
    }

    return valid;
  };

  return (
    <LinearGradient
      //onTouchStart={() => Keyboard.dismiss()}
      colors={[Color.PrimaryColor, Color.PrimaryColorRGBA_08]}
      style={{
        flex: 1,
        backgroundColor: Color.PrimaryColor,
        paddingHorizontal: 30,
        paddingTop: Platform.OS === 'ios' ? 35 : 20,
      }}>
      
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 32,
              color: 'white',
              fontFamily: 'Montserrat-Bold',
            }}>
            Company
          </Text>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              width: 40,
              backgroundColor: 'white',
              borderRadius: 20,
            }}>
            <Icon name="close" size={26} color={Color.PrimaryColor} />
            {/* <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Montserrat-SemiBold', marginLeft: 5 }}>Back</Text> */}
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
        //style={{flex: 1}}
        enabled={KeyboardViewEnable}
        // behavior={Platform.OS === 'ios' ? 'position' : null}
        behavior = 'position'
        >
        <Text
          style={{
            fontSize: 48,
            color: 'rgba(255,255,255,0.3)',
            fontFamily: 'Montserrat-Bold',
            textAlign: 'center',
            letterSpacing: 10,
            marginBottom: 0,
          }}>
          SIGNUP
        </Text>

        <View
          style={{
            height: HEIGHT - 250,
            //backgroundColor: Color.PRIMARY_BACKGROUND_COLOR,
            borderRadius: 8,
            padding: 0,
          }}>
          <View style={{
            // flex: 1, 
            // overflow: 'hidden',
            height: HEIGHT - 250 - 30,
            backgroundColor: Color.PRIMARY_BACKGROUND_COLOR,
            borderRadius: 8,
            padding: 20,
            paddingBottom: 40,
            }}>
            <ScrollView
              // bounces={false}
              contentContainerStyle={{paddingBottom: 0}}
              showsVerticalScrollIndicator={true}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  height: 45,
                  borderColor: Color.PrimaryColor,
                  borderRadius: 25,
                  backgroundColor: 'white',
                  paddingHorizontal: 15,
                }}>
                <View
                  style={{
                    width: '10%',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name="face-profile"
                    size={20}
                    color={Color.PrimaryColor}
                  />
                </View>
                <TextInput
                  returnKeyType="next"
                  value={FormData.fullname}
                  onChangeText={(text) =>
                    SetFormData({...FormData, fullname: text})
                  }
                  onSubmitEditing={() => typeOfBusinessInput.current.focus()}
                  placeholder="Full Name"
                  style={{
                    height: 40,
                    width: '90%',
                    fontSize: 15,
                    fontFamily: 'Montserrat-Regular',
                    color: Color.PrimaryColor,
                    backgroundColor: 'white',
                  }}></TextInput>
              </View>
              {BadFullName ? (
                <Text
                  style={{
                    marginVertical: 5,
                    marginLeft: 15,
                    fontSize: 11,
                    color: 'red',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Enter valid full name
                </Text>
              ) : null}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  height: 45,
                  borderColor: Color.PrimaryColor,
                  borderRadius: 25,
                  backgroundColor: 'white',
                  paddingHorizontal: 15,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    width: '10%',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Material
                    name="business-center"
                    size={20}
                    color={Color.PrimaryColor}
                  />
                </View>
                <TextInput
                  onSubmitEditing={() => PhoneInput.current.focus()}
                  ref={typeOfBusinessInput}
                  returnKeyType="next"
                  value={FormData.typeofbusiness}
                  onChangeText={(text) =>
                    SetFormData({...FormData, typeofbusiness: text})
                  }
                  placeholder="Type of Business"
                  style={{
                    height: 40,
                    width: '90%',
                    fontSize: 15,
                    fontFamily: 'Montserrat-Regular',
                    color: Color.PrimaryColor,
                    backgroundColor: 'white',
                  }}></TextInput>
              </View>
              {BadTypeBusiness ? (
                <Text
                  style={{
                    marginVertical: 5,
                    marginLeft: 15,
                    fontSize: 11,
                    color: 'red',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Enter valid type of business
                </Text>
              ) : null}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  height: 45,
                  borderColor: Color.PrimaryColor,
                  borderRadius: 25,
                  backgroundColor: 'white',
                  paddingHorizontal: 15,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    width: '10%',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Material
                    name="local-phone"
                    size={20}
                    color={Color.PrimaryColor}
                  />
                </View>
                <TextInput
                  onSubmitEditing={() => Keyboard.dismiss()}
                  returnKeyType="done"
                  ref={PhoneInput}
                  value={FormData.phonenumber}
                  maxLength={10}
                  keyboardType="phone-pad"
                  onChangeText={(text) =>
                    SetFormData({...FormData, phonenumber: text})
                  }
                  placeholder="Phone"
                  style={{
                    height: 40,
                    width: '90%',
                    fontSize: 15,
                    fontFamily: 'Montserrat-Regular',
                    color: Color.PrimaryColor,
                    backgroundColor: 'white',
                  }}></TextInput>
              </View>
              {BadNumber ? (
                <Text
                  style={{
                    marginVertical: 5,
                    marginLeft: 15,
                    fontSize: 11,
                    color: 'red',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  phone number must be 10 digit
                </Text>
              ) : null}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  height: 45,
                  borderColor: Color.PrimaryColor,
                  borderRadius: 25,
                  backgroundColor: 'white',
                  paddingHorizontal: 15,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    width: '10%',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Material name="email" size={20} color={Color.PrimaryColor} />
                </View>
                <TextInput
                  keyboardType="email-address"
                  returnKeyType="next"
                  value={FormData.email}
                  onSubmitEditing={() => PasswordInput.current.focus()}
                  ref={EmailInput}
                  onChangeText={(text) =>
                    SetFormData({...FormData, email: text})
                  }
                  placeholder="Email"
                  style={{
                    height: 40,
                    width: '90%',
                    fontSize: 15,
                    fontFamily: 'Montserrat-Regular',
                    color: Color.PrimaryColor,
                    backgroundColor: 'white',
                  }}></TextInput>
              </View>
              {BadEmail ? (
                <Text
                  style={{
                    marginVertical: 5,
                    marginLeft: 15,
                    fontSize: 11,
                    color: 'red',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Enter valid email
                </Text>
              ) : null}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  height: 45,
                  borderColor: Color.PrimaryColor,
                  borderRadius: 25,
                  backgroundColor: 'white',
                  paddingHorizontal: 15,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    width: '10%',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Material name="lock" size={20} color={Color.PrimaryColor} />
                </View>
                <TextInput
                  returnKeyType="next"
                  secureTextEntry
                  onSubmitEditing={() => ConfirmPasswordInput.current.focus()}
                  ref={PasswordInput}
                  value={FormData.password}
                  onChangeText={(text) =>
                    SetFormData({...FormData, password: text})
                  }
                  placeholder="Password"
                  style={{
                    height: 40,
                    width: '90%',
                    fontSize: 15,
                    fontFamily: 'Montserrat-Regular',
                    color: Color.PrimaryColor,
                    backgroundColor: 'white',
                  }}></TextInput>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  height: 45,
                  borderColor: Color.PrimaryColor,
                  borderRadius: 25,
                  backgroundColor: 'white',
                  paddingHorizontal: 15,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    width: '10%',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Material name="lock" size={20} color={Color.PrimaryColor} />
                </View>
                <TextInput
                  returnKeyType="next"
                  secureTextEntry
                  onFocus={() => SetKeyboardViewEnable(true)}
                  onBlur={() => SetKeyboardViewEnable(false)}
                  onSubmitEditing={() => ZipcodeInput.current.focus()}
                  ref={ConfirmPasswordInput}
                  value={FormData.confirmPassword}
                  onChangeText={(text) =>
                    SetFormData({...FormData, confirmPassword: text})
                  }
                  placeholder="Confirm Password"
                  style={{
                    height: 40,
                    width: '90%',
                    fontSize: 15,
                    fontFamily: 'Montserrat-Regular',
                    color: Color.PrimaryColor,
                    backgroundColor: 'white',
                  }}></TextInput>
              </View>

              {BadPassword ? (
                <Text
                  style={{
                    marginVertical: 5,
                    marginLeft: 15,
                    fontSize: 11,
                    color: 'red',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Password and Confirm password should be same and more than 6
                  character
                </Text>
              ) : null}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  height: 45,
                  borderColor: Color.PrimaryColor,
                  borderRadius: 25,
                  backgroundColor: 'white',
                  paddingHorizontal: 15,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    width: '10%',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Icon name="zip-box" size={20} color={Color.PrimaryColor} />
                </View>
                <TextInput
                  onBlur={() => SetKeyboardViewEnable(false)}
                  onFocus={() => SetKeyboardViewEnable(true)}
                  returnKeyType="done"
                  keyboardType="numeric"
                  ref={ZipcodeInput}
                  onSubmitEditing={() => SignUp()}
                  value={FormData.zipcode}
                  onChangeText={(text) =>
                    SetFormData({...FormData, zipcode: text})
                  }
                  placeholder="zipcode"
                  style={{
                    height: 40,
                    width: '90%',
                    fontSize: 15,
                    fontFamily: 'Montserrat-Regular',
                    color: Color.PrimaryColor,
                    backgroundColor: 'white',
                  }}></TextInput>
              </View>
              {BadZip ? (
                <Text
                  style={{
                    marginVertical: 5,
                    marginLeft: 15,
                    fontSize: 11,
                    color: 'red',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  zipcode should be 5 or 6 digit
                </Text>
              ) : null}
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() => SignUp()}
            activeOpacity={0.1}
            // onPress={() => {
            //   // navigation.replace('BottomTabs');
            // }}
            style={{
              height: 60,
              backgroundColor: Color.PrimaryColor,
              width: '85%',
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              alignSelf: 'center',
              bottom: 0,
              zIndex: 100,
            }}>
            {IsLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                NEXT
              </Text>
            )}
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        <Text
          style={{
            fontSize: 12,
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'Montserrat-Regular',
            marginTop: 30,
          }}>
          By SignUp you accept our{' '}
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              color: Color.PrimaryColor,
              textDecorationLine: 'underline',
            }}>
            Terms and Conditions
          </Text>
        </Text>
      
      {IsLoading && <Spinner />}
    </LinearGradient>
  );
};

export default CompanyForm;
