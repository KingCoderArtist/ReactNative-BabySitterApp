import React, {useState, useRef, useReducer, Children} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Platform,
  Modal,
  KeyboardAvoidingView,
  FlatList,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import Color from '../../../../assets/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Material from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Company_SignUp} from '../../../Component/Helper/Helper';
import {RNToasty} from 'react-native-toasty';
import CheckBox from 'react-native-checkbox';
import ChildComp from '../../../Component/ChildComp/ChildComp';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spinner from '../../../Component/Spinner/Spinner';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;

const ParentForm = ({navigation}) => {
  const [FormData, SetFormData] = useState({
    fullname: '',
    spousename: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmpassword: '',
    dogpet: '',
    catpet: '',
    referral: '',
    city: '',
    state: '',
    zipcode: '',
  });
  const [children, setChildren] = useState([
    {name: '', birthday: '', key: Date.now()},
  ]);
  const [NextView, SetNextView] = useState(false);
  const [SecondView, SetSecondView] = useState(false);

  const SpouseNameInput = useRef(null);
  const AddressInput = useRef(null);
  const PhoneInput = useRef(null);
  const EmailInput = useRef(null);
  const PasswordInput = useRef(null);
  const ConfirmPasswordInput = useRef(null);
  const ReferralInput = useRef(null);
  const BirthdayInput = useRef(null);
  const CityInput = useRef(null);
  const StateInput = useRef(null);
  const ZipInput = useRef(null);

  const [BadFullName, SetBadFullName] = useState(false);
  const [BadspouseName, SetBadsouseName] = useState(false);
  const [BadAddress, SetBadAddress] = useState(false);
  const [BadPhone, SetBadPhone] = useState(false);
  const [BadEmail, SetBadEmail] = useState(false);
  const [BadPassword, SetBadPassword] = useState(false);
  const [BadReferral, SetBadReferral] = useState(false);
  const [EmptyChildren, SetEmptyChildren] = useState(false);
  const [IsLoading, SetIsLoading] = useState(false);
  const [CatChecked, SetCatChecked] = useState(false);
  const [DogChecked, SetDogChecked] = useState(false);
  const [BadPetChecked, SetBadPetChecked] = useState(false);
  const [KeyboardViewEnable, SetKeyboardViewEnable] = useState(true);
  const [BadCity, SetBadCity] = useState(false);
  const [BadState, SetBadState] = useState(false);
  const [BadZipcode, SetBadZipcode] = useState(false);
  const [OpenDatePicker, SetOpenDatePicker] = useState(false);

  const [Clicked, SetClicked] = useState(false);

  const AddChildren = () => {
    setChildren([...children, {name: '', birthday: '', key: Date.now()}]);
  };

  const RemoveChildren = (index) => {
    let removedChild = children.filter((data, i) => i !== index);
    setChildren(removedChild);
  };

  const ValidateFirstPage = () => {
    const {fullname, spousename, address, city, state, zipcode} = FormData;
    let valid = true;

    if (fullname === '') {
      valid = false;
      SetBadFullName(true);
    } else {
      SetBadFullName(false);
    }

    if (spousename === '') {
      valid = false;
      SetBadsouseName(true);
    } else {
      SetBadsouseName(false);
    }

    if (address === '') {
      valid = false;
      SetBadAddress(true);
    } else {
      SetBadAddress(false);
    }

    if (city === '') {
      valid = false;
      SetBadCity(true);
    } else {
      SetBadCity(false);
    }

    if (state === '') {
      valid = false;
      SetBadState(true);
    } else {
      SetBadState(false);
    }

    if (zipcode.length < 5 || zipcode.length > 6) {
      valid = false;
      SetBadZipcode(true);
    } else {
      SetBadZipcode(false);
    }

    return valid;
  };

  const ValidateSecondPage = () => {
    const {password, confirmpassword, referral, phone, email} = FormData;

    let valid = true;

    if (
      password != confirmpassword ||
      (password === '' && confirmpassword === '') ||
      password.length <= 5
    ) {
      valid = false;
      SetBadPassword(true);
    } else {
      SetBadPassword(false);
    }

    if (phone.length != 10) {
      valid = false;
      SetBadPhone(true);
    } else {
      SetBadPhone(false);
    }

    if (reg.test(email) === false) {
      valid = false;
      SetBadEmail(true);
    } else {
      SetBadEmail(false);
    }

    // if (referral === '') {
    //   valid = false;
    //   SetBadReferral(true)
    // } else {
    //   SetBadReferral(false)
    // }

    if (!DogChecked && !CatChecked) {
      valid = false;
      SetBadPetChecked(true);
    } else {
      SetBadPetChecked(false);
    }

    return valid;
  };

  const ValidateLastPage = () => {
    let valid = true;

    children.map((item, i) => {
      if (item.name === '' || item.birthday === 'birthday') {
        valid = false;
        SetEmptyChildren(true);
      } else {
        SetEmptyChildren(false);
      }
    });
    return valid;
  };

  const SetDate = (date, index) => {
    console.log(date, index);
  };

  const SubmitData = () => {
    const {
      email,
      password,
      fullname,
      confirmpassword,
      spousename,
      address,
      phone,
      referral,
      city,
      state,
      zipcode,
    } = FormData;
    SetIsLoading(true);
    Company_SignUp('api/user/signup', {
      email: email,
      password: password,
      role: 'parent',
      fullName: fullname,
      spouseName: spousename,
      address: [{address, city, state, zip: zipcode}],
      phone: phone,
      childrens: children,
      pets: CatChecked ? 'cat' : 'dog',
      referral: referral,
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res, 'parent sign up');
        if (res.status === 201) {
          SetIsLoading(false);
          SetFormData({
            ...FormData,
            email: '',
            password: '',
            confirmpassword: '',
            fullname: '',
            spousename: '',
            address: '',
            zipcode: '',
            phone: '',
            referral: '',
            city: '',
            state: '',
            zipcode: '',
          });
          setChildren([{name: '', birthday: '', key: Date.now()}]);
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
  };

  const styles = StyleSheet.create({
    btn: {
      height: 60,
      // backgroundColor: Color.PrimaryColor,
      width: '85%',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      alignSelf: 'center',
      bottom: 0,
      zIndex: 100,
    },
  });

  return (
    <LinearGradient
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
          style={{fontSize: 32, color: 'white', fontFamily: 'Montserrat-Bold'}}>
          Parent
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
      {!NextView ? (
        <KeyboardAvoidingView
          enabled={KeyboardViewEnable}
          // behavior={Platform.OS === 'ios' ? 'position' : null}
          behavior='position'
          >
          <View
            style={{
              height: HEIGHT - 250,
              //backgroundColor: Color.PrimaryColorRGBA_08,
              borderRadius: 8,
              paddingBottom: 0,
              paddingTop:0
            }}>
            <View
              style={{
                height: HEIGHT - 250 - 30,
                backgroundColor: Color.PRIMARY_BACKGROUND_COLOR,
                borderRadius: 8,
                padding: 20,
                paddingBottom: 40,
                paddingTop:20
              }}>
                 <ScrollView
                  // bounces={false}
                  contentContainerStyle={{padding: 0}}
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
                      marginTop: 20,
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
                      onSubmitEditing={() => SpouseNameInput.current.focus()}
                      placeholderTextColor={Color.PLACE_HOLDER_COLOR}
                      value={FormData.fullname}
                      onChangeText={(text) =>
                        SetFormData({...FormData, fullname: text})
                      }
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
                      <Icon
                        name="face-profile"
                        size={20}
                        color={Color.PrimaryColor}
                      />
                    </View>
                    <TextInput
                      ref={SpouseNameInput}
                      returnKeyType="next"
                      onSubmitEditing={() => AddressInput.current.focus()}
                      placeholderTextColor={Color.PLACE_HOLDER_COLOR}
                      value={FormData.spousename}
                      onChangeText={(text) =>
                        SetFormData({...FormData, spousename: text})
                      }
                      placeholder="Spouse Name"
                      style={{
                        height: 40,
                        width: '90%',
                        fontSize: 15,
                        fontFamily: 'Montserrat-Regular',
                        color: Color.PrimaryColor,
                        backgroundColor: 'white',
                      }}></TextInput>
                  </View>
                  {BadspouseName ? (
                    <Text
                      style={{
                        marginVertical: 5,
                        marginLeft: 15,
                        fontSize: 11,
                        color: 'red',
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      Enter valid spouse name
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
                      <Foundation
                        name="address-book"
                        size={20}
                        color={Color.PrimaryColor}
                      />
                    </View>
                    <TextInput
                      ref={AddressInput}
                      returnKeyType="next"
                      onSubmitEditing={() => CityInput.current.focus()}
                      placeholderTextColor={Color.PLACE_HOLDER_COLOR}
                      value={FormData.address}
                      onChangeText={(text) =>
                        SetFormData({...FormData, address: text})
                      }
                      placeholder="Address"
                      style={{
                        height: 40,
                        width: '90%',
                        fontSize: 15,
                        fontFamily: 'Montserrat-Regular',
                        color: Color.PrimaryColor,
                        backgroundColor: 'white',
                      }}></TextInput>
                  </View>
                  {BadAddress ? (
                    <Text
                      style={{
                        marginVertical: 5,
                        marginLeft: 15,
                        fontSize: 11,
                        color: 'red',
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      Enter valid address
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
                      <MaterialCommunityIcons
                        name="city"
                        size={20}
                        color={Color.PrimaryColor}
                      />
                    </View>
                    <TextInput
                      ref={CityInput}
                      returnKeyType="next"
                      onSubmitEditing={() => StateInput.current.focus()}
                      value={FormData.city}
                      placeholderTextColor={Color.PLACE_HOLDER_COLOR}
                      onChangeText={(text) =>
                        SetFormData({...FormData, city: text})
                      }
                      placeholder="city"
                      style={{
                        height: 40,
                        width: '90%',
                        fontSize: 15,
                        fontFamily: 'Montserrat-Regular',
                        color: Color.PrimaryColor,
                        backgroundColor: 'white',
                      }}></TextInput>
                  </View>
                  {BadCity ? (
                    <Text
                      style={{
                        marginVertical: 5,
                        marginLeft: 15,
                        fontSize: 11,
                        color: 'red',
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      enter valid city
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
                      <MaterialCommunityIcons
                        name="home-city"
                        size={20}
                        color={Color.PrimaryColor}
                      />
                    </View>
                    <TextInput
                      onFocus={() => SetKeyboardViewEnable(true)}
                      onBlur={() => SetKeyboardViewEnable(false)}
                      ref={StateInput}
                      returnKeyType="next"
                      onSubmitEditing={() => ZipInput.current.focus()}
                      value={FormData.state}
                      placeholderTextColor={Color.PLACE_HOLDER_COLOR}
                      onChangeText={(text) =>
                        SetFormData({...FormData, state: text})
                      }
                      placeholder="state"
                      style={{
                        height: 40,
                        width: '90%',
                        fontSize: 15,
                        fontFamily: 'Montserrat-Regular',
                        color: Color.PrimaryColor,
                        backgroundColor: 'white',
                      }}></TextInput>
                  </View>
                  {BadState ? (
                    <Text
                      style={{
                        marginVertical: 5,
                        marginLeft: 15,
                        fontSize: 11,
                        color: 'red',
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      enter valid state
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
                      <MaterialCommunityIcons
                        name="zip-box"
                        size={20}
                        color={Color.PrimaryColor}
                      />
                    </View>
                    <TextInput
                      ref={ZipInput}
                      onFocus={() => SetKeyboardViewEnable(true)}
                      onBlur={() => SetKeyboardViewEnable(false)}
                      returnKeyType="done"
                      keyboardType="numeric"
                      maxLength={6}
                      onSubmitEditing={() => {
                        if (ValidateFirstPage()) {
                          SetKeyboardViewEnable(false);
                          SetNextView(!NextView);
                        }
                      }}
                      value={FormData.zipcode}
                      placeholderTextColor={Color.PLACE_HOLDER_COLOR}
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
                  {BadZipcode ? (
                    <Text
                      style={{
                        marginVertical: 5,
                        marginLeft: 15,
                        fontSize: 11,
                        color: 'red',
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      zipcode should be five or size digit
                    </Text>
                  ) : null}
                </ScrollView>
            
            </View>
            
           
            <TouchableOpacity
              activeOpacity={0.1}
              // onPress={() => {
              //   navigation.replace('BottomTabs');
              // }}
              onPress={() => {
                SetClicked(true);
                if (ValidateFirstPage()) {
                  SetNextView(!NextView);
                  // SetSecondView(!SecondView)
                }
                SetClicked(false);
              }}
              style={[styles.btn, {backgroundColor: Clicked? Color.PrimaryColorRGBA_08 : Color.PrimaryColor}]}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : !SecondView ? (
        <KeyboardAvoidingView
          enabled={KeyboardViewEnable}
          // behavior={Platform.OS === 'ios' ? 'position' : null}
          behavior='position'
          >
          <View
            style={{
              height: HEIGHT - 250,
              //backgroundColor: Color.PRIMARY_BACKGROUND_COLOR,
              borderRadius: 8,
              padding: 0,
            }}>
            <View style={{
              //flex: 1, 
              //overflow: 'hidden',
              height: HEIGHT - 250 - 30,
              backgroundColor: Color.PRIMARY_BACKGROUND_COLOR,
              borderRadius: 8,
              padding: 20,
              paddingBottom: 40,
              paddingTop:30
              }}>
              <ScrollView
                // bounces={false}
                contentContainerStyle={{paddingBottom: 30}}
                showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    height: 40,
                    width: '100%',
                    alignItems: 'flex-end',
                    marginBottom: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      SetKeyboardViewEnable(false);
                      SetNextView(!NextView);
                    }}
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      backgroundColor: Color.PrimaryColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FontAwesome name="arrow-left" size={18} color="white" />
                  </TouchableOpacity>
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
                    <Material
                      name="local-phone"
                      size={20}
                      color={Color.PrimaryColor}
                    />
                  </View>
                  <TextInput
                    ref={PhoneInput}
                    returnKeyType="done"
                    maxLength={10}
                    onSubmitEditing={() => EmailInput.current.focus()}
                    value={FormData.phone}
                    placeholderTextColor={Color.PLACE_HOLDER_COLOR}
                    keyboardType="phone-pad"
                    maxLength={10}
                    onChangeText={(text) =>
                      SetFormData({...FormData, phone: text})
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
                {BadPhone ? (
                  <Text
                    style={{
                      marginVertical: 5,
                      marginLeft: 15,
                      fontSize: 11,
                      color: 'red',
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    number should be 10 digit
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
                      name="email"
                      size={20}
                      color={Color.PrimaryColor}
                    />
                  </View>
                  <TextInput
                    ref={EmailInput}
                    keyboardType="email-address"
                    returnKeyType="next"
                    // onFocus={() => SetKeyboardViewEnable(true)}
                    // onBlur={() => SetKeyboardViewEnable(false)}
                    onSubmitEditing={() => {
                      PasswordInput.current.focus();
                      // if (ValidateFirstPage()) {
                      //   SetKeyboardViewEnable(false);
                      //   SetNextView(!NextView);
                      //   // SetSecondView(!SecondView)
                      // }
                    }}
                    value={FormData.email}
                    placeholderTextColor={Color.PLACE_HOLDER_COLOR}
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
                    <Material
                      name="lock"
                      size={20}
                      color={Color.PrimaryColor}
                    />
                  </View>
                  <TextInput
                    ref={PasswordInput}
                    returnKeyType="next"
                    secureTextEntry
                    onSubmitEditing={() => ConfirmPasswordInput.current.focus()}
                    value={FormData.password}
                    placeholderTextColor={Color.PLACE_HOLDER_COLOR}
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
                    <Material
                      name="lock"
                      size={20}
                      color={Color.PrimaryColor}
                    />
                  </View>
                  <TextInput
                    secureTextEntry
                    ref={ConfirmPasswordInput}
                    returnKeyType="next"
                    onSubmitEditing={() => ReferralInput.current.focus()}
                    value={FormData.confirmpassword}
                    placeholderTextColor={Color.PLACE_HOLDER_COLOR}
                    onChangeText={(text) =>
                      SetFormData({...FormData, confirmpassword: text})
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
                    Password and Confirm password should be same and more than
                    five character
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
                    <MaterialCommunityIcons
                      name="account-multiple-plus"
                      size={20}
                      color={Color.PrimaryColor}
                    />
                  </View>
                  <TextInput
                    ref={ReferralInput}
                    returnKeyType="done"
                    onFocus={() => SetKeyboardViewEnable(true)}
                    onBlur={() => SetKeyboardViewEnable(false)}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    value={FormData.referral}
                    placeholderTextColor={Color.PLACE_HOLDER_COLOR}
                    onChangeText={(text) =>
                      SetFormData({...FormData, referral: text})
                    }
                    placeholder="Referral from existing sitter connection network"
                    style={{
                      height: 40,
                      width: '90%',
                      fontSize: 15,
                      fontFamily: 'Montserrat-Regular',
                      color: Color.PrimaryColor,
                      backgroundColor: 'white',
                    }}></TextInput>
                </View>
                {/* {
                  BadReferral ? <Text style={{ marginVertical: 5, marginLeft: 15, fontSize: 11, color: 'red', fontFamily: 'Montserrat-Medium' }}>Enter valid referral</Text> : null
                } */}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: 250,
                    alignSelf: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                      label=""
                      checked={CatChecked}
                      onChange={(checked) => {
                        if (DogChecked) {
                          SetDogChecked(!DogChecked);
                        }
                        SetCatChecked(!CatChecked);
                      }}
                    />
                    <ImageBackground
                      source={require('../../../../assets/images/cat.jpeg')}
                      style={{height: 40, width: 40, marginLeft: 20}}
                    />
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                      label=""
                      checked={DogChecked}
                      onChange={(checked) => {
                        if (CatChecked) {
                          SetCatChecked(!CatChecked);
                        }
                        SetDogChecked(!DogChecked);
                      }}
                    />
                    <ImageBackground
                      source={require('../../../../assets/images/dog.jpeg')}
                      style={{height: 40, width: 40, marginLeft: 20}}
                    />
                  </View>
                </View>
                {BadPetChecked ? (
                  <Text
                    style={{
                      marginVertical: 5,
                      marginLeft: 15,
                      fontSize: 11,
                      color: 'red',
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    Select pet or dog
                  </Text>
                ) : null}
              </ScrollView>
            </View>
            <TouchableOpacity
              activeOpacity={0.1}
              // onPress={() => {
              //   navigation.replace('BottomTabs');
              // }}
              onPress={() => {
                if (ValidateSecondPage()) {
                  SetSecondView(!SecondView);
                }
              }}
              style={{
                height: 60,
                backgroundColor: Color.PrimaryColor,
                width: '80%',
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                alignSelf: 'center',
                bottom: 0,
                zIndex: 100,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <KeyboardAvoidingView
          enabled={KeyboardViewEnable}
          // behavior={Platform.OS === 'ios' ? 'position' : null}
          behavior='position'
          >
          <View
            style={{
              height: HEIGHT - 250,
              //backgroundColor: Color.PRIMARY_BACKGROUND_COLOR,
              borderRadius: 8,
              padding: 0,
            }}>
            <View style={{
              height: HEIGHT - 250 - 30,
              backgroundColor: Color.PRIMARY_BACKGROUND_COLOR,
              borderRadius: 8,
              padding: 20,
              paddingBottom: 40,
              }}>
              <ScrollView
                // bounces={false}
                contentContainerStyle={{paddingBottom: 30}}
                showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    height: 40,
                    width: '100%',
                    alignItems: 'flex-end',
                    marginBottom: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => SetSecondView(!SecondView)}
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      backgroundColor: Color.PrimaryColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FontAwesome name="arrow-left" size={18} color="white" />
                  </TouchableOpacity>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        width: '65%',
                        fontFamily: 'Montserrat-Medium',
                        color: 'black',
                      }}>
                      Childern
                    </Text>
                    <View style={{alignItems: 'flex-start', width: '25%'}}>
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: 'Montserrat-Medium',
                          color: 'black',
                        }}>
                        Birthday
                      </Text>
                    </View>
                    <View style={{width: '10%'}}></View>
                  </View>

                  {children.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          marginTop: 10,
                          paddingHorizontal: 5,
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        {/* <TextInput
                            placeholder='Name'
                            returnKeyType='next'
                            defaultValue={item.name}
                            onChangeText={(text) => children[index].name = text}
                            style={{ height: 40, borderRadius: 25, borderWidth: 1, borderColor: Color.PrimaryColor, paddingHorizontal: 10, width: '55%' }}
                          />
                          <TouchableOpacity
                            onPress={() => SetOpenDatePicker(!OpenDatePicker)}
                            style={{ justifyContent: 'center', alignItems: 'center', height: 40, borderRadius: 25, borderWidth: 1, borderColor: Color.PrimaryColor, paddingHorizontal: 10, width: '30%' }}>
                            <Text style={{ fontSize: 13, color: item.birthday === 'birthday' ? 'rgba(0,0,0,0.2)' : 'black', fontFamily: 'Montserrat-Medium' }}>{item.birthday}</Text>
                          </TouchableOpacity>

                          {
                            children.length > 1
                              ?
                              <View style={{ width: '5%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => RemoveChildren(index)} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', height: 25, width: 25, borderRadius: 15 }}>
                                  <FontAwesome name='times' size={15} color='white' />
                                </TouchableOpacity>
                              </View>
                              :
                              <View style={{ width: '5%' }}></View>
                          } */}
                        <ChildComp
                          getDate={item.birthday}
                          getValue={item.name}
                          onChangeText={(val) => (item.name = val)}
                          passDate={(date) => (item.birthday = date)}
                          RemoveChildren={(id) => RemoveChildren(id)}
                          index={index}
                          childrenLength={children.length}
                        />
                      </View>
                    );
                  })}
                  {children.length !== 10 && (
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 10,
                      }}>
                      <View style={{width: '65%'}}></View>
                      <View style={{width: '35%', alignItems: 'flex-end'}}>
                        <TouchableOpacity
                          onPress={() => AddChildren()}
                          style={{padding: 5}}>
                          <Text
                            style={{
                              fontSize: 13,
                              color: Color.PrimaryColor,
                              fontFamily: 'Montserrat-Medium',
                            }}>
                            Add
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
                {EmptyChildren ? (
                  <Text
                    style={{
                      marginVertical: 5,
                      marginLeft: 15,
                      fontSize: 11,
                      color: 'red',
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    Enter valid children name and age
                  </Text>
                ) : null}
              </ScrollView>
            </View>
            {OpenDatePicker ? (
              <DateTimePicker
                value={new Date()}
                mode="datetime"
                is24Hour={false}
                display="default"
                style={{position: 'absolute', bottom: 0}}
                onChange={(event, date) => SetDate(date, index)}
              />
            ) : null}

            <TouchableOpacity
              activeOpacity={0.1}
              onPress={() => {
                if (ValidateLastPage()) {
                  SubmitData();
                }
              }}
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
                  SUBMIT
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
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

export default ParentForm;
