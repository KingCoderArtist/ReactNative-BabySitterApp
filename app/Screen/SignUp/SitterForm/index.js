import React, {useState, useReducer, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Platform,
  ImageBackground,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Styles from '@Screen/SignUp/Style';
import Color from '../../../../assets/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Material from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from 'react-native-checkbox';
import LinearGradient from 'react-native-linear-gradient';
import {Sitter_SignUp} from '../../../Component/Helper/Helper';
import {RNToasty} from 'react-native-toasty';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Spinner from '../../../Component/Spinner/Spinner';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const SitterForm = ({navigation}) => {
  const [FormData, SetFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    gender: 'gender',
    minorschool: '',
    highschool: '',
    year: 'year',
    pets: '',
    hobbies: '',
    babysitting: '',
    password: '',
    confirmpassword: '',
  });

  const LastNameInput = useRef(null);
  const EmailInput = useRef(null);
  const PhoneInput = useRef(null);
  const PasswordInput = useRef(null);
  const MinorInput = useRef(null);
  const HighSchoolInput = useRef(null);
  const HobbiesInput = useRef(null);
  const BabySittingInput = useRef(null);
  const ConfirmPasswordInput = useRef(null);

  const [Avatar, SetAvatar] = useState('');
  const [PetChecked, SetPetChecked] = useState(false);
  const [GenderView, SetGenderView] = useState(false);
  const [BadFirstName, SetBadFirstName] = useState(false);
  const [BadLastName, SetBadLastName] = useState(false);
  const [BadEmail, SetBadEmail] = useState(false);
  const [BadNumber, SetBadNumber] = useState(false);
  const [BadGender, SetBadGender] = useState(false);
  const [BadMinorSchool, SetBadMinorSchool] = useState(false);
  const [BadHighSchool, SetBadHighSchool] = useState(false);
  const [BadYear, SetBadYear] = useState(false);
  const [BadPets, SetBadPets] = useState(false);
  const [BadHobbies, SetBadHobbies] = useState(false);
  const [BadBabySitting, SetBadBabySitting] = useState(false);
  const [BadPassword, SetBadPassword] = useState(false);
  const [isSignUp, SetIsSignUp] = useState(false);
  const [ImageUri, SetImageUri] = useState('');
  const [ImageFileName, SetImageFileName] = useState('');
  const [ImageType, SetImageType] = useState('');
  const [CalendarOpen, SetCalendarOpen] = useState(false);
  const [KeyboardView, SetKeyboardView] = useState(true);

  const [NextView, SetNewView] = useState(false);

  const UploadImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        let IosFileName = response.uri.substring(
          response.uri.toString().lastIndexOf('/') + 1,
          response.uri.toString().length,
        );

        SetImageUri(response.uri);
        SetImageFileName(
          Platform.OS === 'ios' ? IosFileName : response.fileName,
        );
        SetImageType(response.type);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        SetAvatar(source);
        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
  };

  const SignUp = () => {
    Keyboard.dismiss();
    if (validateNextPage()) {
      const {
        firstname,
        lastname,
        email,
        phone,
        gender,
        minorschool,
        highschool,
        password,
        year,
        hobbies,
        babysitting,
      } = FormData;
      SetIsSignUp(true);
      Sitter_SignUp('api/user/signup', {
        profilePic:
          ImageUri === ''
            ? ''
            : {
                uri: ImageUri,
                type: ImageType,
                name: ImageFileName,
              },
        email: email,
        password: password,
        role: 'sitter',
        firstName: firstname,
        lastName: lastname,
        phone: phone,
        gender: gender,
        maiorAndSchool: minorschool,
        highSchool: highschool,
        year: year,
        okayWithPets: PetChecked,
        hobbies: hobbies,
        aboutBabySitting: babysitting,
      })
        .then((data) => data.json())
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            SetIsSignUp(false);
            SetFormData({
              firstname: '',
              lastname: '',
              email: '',
              phone: '',
              gender: 'gender',
              minorschool: '',
              highschool: '',
              year: '',
              pets: '',
              hobbies: '',
              babysitting: '',
              password: '',
            });
            SetPetChecked(false);
            RNToasty.Success({
              title: res.message,
              fontFamily: 'Montserrat-Medium',
            });
            navigation.replace('AccountPending');
          } else {
            SetIsSignUp(false);
            alert(res.message);
          }
        })
        .catch((e) => {
          SetIsSignUp(false);
          alert('Something went wrong...!');
        });
    }
  };

  const validateFirstPage = () => {
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      confirmpassword,
    } = FormData;

    let valid = true;

    if (firstname === '') {
      valid = false;
      SetBadFirstName(true);
    } else {
      SetBadFirstName(false);
    }

    if (lastname === '') {
      valid = false;
      SetBadLastName(true);
    } else {
      SetBadLastName(false);
    }

    if (reg.test(email) === false) {
      valid = false;
      SetBadEmail(true);
    } else {
      SetBadEmail(false);
    }

    if (phone.length != 10) {
      valid = false;
      SetBadNumber(true);
    } else {
      SetBadNumber(false);
    }

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

    return valid;
  };

  let validateNextPage = () => {
    let valid = true;

    const {
      gender,
      minorschool,
      highschool,
      year,
      hobbies,
      babysitting,
    } = FormData;

    if (gender === '') {
      valid = false;
      SetBadGender(true);
    } else {
      SetBadGender(false);
    }

    if (minorschool === '') {
      valid = false;
      SetBadMinorSchool(true);
    } else {
      SetBadMinorSchool(false);
    }

    if (highschool === '') {
      valid = false;
      SetBadHighSchool(true);
    } else {
      SetBadHighSchool(false);
    }

    if (year === 'year') {
      valid = false;
      SetBadYear(true);
    } else {
      SetBadYear(false);
    }

    if (!PetChecked) {
      valid = false;
      SetBadPets(true);
    } else {
      SetBadPets(false);
    }

    if (hobbies === '') {
      valid = false;
      SetBadHobbies(true);
    } else {
      SetBadHobbies(false);
    }

    if (babysitting === '') {
      valid = false;
      SetBadBabySitting(true);
    } else {
      SetBadBabySitting(false);
    }

    return valid;
  };

  const SetYear = (date) => {
    console.log(date);
    SetCalendarOpen(false);
    SetFormData({
      ...FormData,
      year: date.toString().toLocaleString().substring(11, 15),
    });
  };

  return (
    <View style={{flex: 1}}>
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
            Sitter
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
            enabled={KeyboardView}
            // behavior={Platform.OS === 'ios' ? 'position' : null}
            behavior = 'position'
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
                  showsVerticalScrollIndicator={true}>
                  <View>
                    <ImageBackground
                      source={
                        Avatar === ''
                          ? require('../../../../assets/images/avatarrr.png')
                          : Avatar
                      }
                      imageStyle={{borderRadius: 60}}
                      style={{height: 120, width: 120, alignSelf: 'center'}}>
                      <TouchableOpacity
                        onPress={() => UploadImage()}
                        style={{position: 'absolute', bottom: 5, right: 5}}>
                        <Icon
                          name="camera"
                          color={Color.PrimaryColor}
                          size={30}
                        />
                      </TouchableOpacity>
                    </ImageBackground>

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
                        onSubmitEditing={() => LastNameInput.current.focus()}
                        value={FormData.firstname}
                        onChangeText={(text) =>
                          SetFormData({...FormData, firstname: text})
                        }
                        placeholder="First Name"
                        style={{
                          height: 40,
                          width: '90%',
                          fontSize: 15,
                          fontFamily: 'Montserrat-Regular',
                          color: Color.PrimaryColor,
                          backgroundColor: 'white',
                        }}></TextInput>
                    </View>
                    {BadFirstName ? (
                      <Text
                        style={{
                          marginVertical: 5,
                          marginTop: 3,
                          marginLeft: 15,
                          fontSize: 11,
                          color: 'red',
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        Enter valid first name
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
                        returnKeyType="next"
                        onSubmitEditing={() => EmailInput.current.focus()}
                        value={FormData.lastname}
                        onChangeText={(text) =>
                          SetFormData({...FormData, lastname: text})
                        }
                        ref={LastNameInput}
                        placeholder="Last Name"
                        style={{
                          height: 40,
                          width: '90%',
                          fontSize: 15,
                          fontFamily: 'Montserrat-Regular',
                          color: Color.PrimaryColor,
                          backgroundColor: 'white',
                        }}></TextInput>
                    </View>
                    {BadLastName ? (
                      <Text
                        style={{
                          marginVertical: 5,
                          marginTop: 3,
                          marginLeft: 15,
                          fontSize: 11,
                          color: 'red',
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        Enter valid last name
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
                        value={FormData.email}
                        returnKeyType="next"
                        onSubmitEditing={() => PhoneInput.current.focus()}
                        keyboardType="email-address"
                        onChangeText={(text) =>
                          SetFormData({...FormData, email: text})
                        }
                        placeholder="Email"
                        ref={EmailInput}
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
                          marginTop: 3,
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
                          name="local-phone"
                          size={20}
                          color={Color.PrimaryColor}
                        />
                      </View>
                      <TextInput
                        value={FormData.phone}
                        ref={PhoneInput}
                        returnKeyType="done"
                        maxLength={10}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        keyboardType="phone-pad"
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
                    {BadNumber ? (
                      <Text
                        style={{
                          marginVertical: 5,
                          marginTop: 3,
                          marginLeft: 15,
                          fontSize: 11,
                          color: 'red',
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        number must be 10 digit
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
                        returnKeyType="next"
                        onFocus={() => SetKeyboardView(true)}
                        onBlur={() => SetKeyboardView(false)}
                        onSubmitEditing={() =>
                          ConfirmPasswordInput.current.focus()
                        }
                        value={FormData.password}
                        secureTextEntry
                        ref={PasswordInput}
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
                        returnKeyType="done"
                        onFocus={() => SetKeyboardView(true)}
                        onBlur={() => SetKeyboardView(false)}
                        onSubmitEditing={() => {
                          if (validateFirstPage()) {
                            SetNewView(!NextView);
                          }
                        }}
                        value={FormData.confirmpassword}
                        secureTextEntry
                        ref={ConfirmPasswordInput}
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
                          marginTop: 3,
                          marginLeft: 15,
                          fontSize: 11,
                          color: 'red',
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        Password and Confirm password should be same and more
                        than five character
                      </Text>
                    ) : null}
                  </View>
                </ScrollView>
              </View>
              <TouchableOpacity
                activeOpacity={0.1}
                onPress={() => {
                  if (validateFirstPage()) {
                    SetNewView(!NextView);
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
            enabled={KeyboardView}
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
                  contentContainerStyle={{paddingBottom: 0}}
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
                        SetKeyboardView(false);
                        SetNewView(!NextView);
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
                      <MaterialCommunityIcons
                        name="gender-male-female"
                        size={20}
                        color={Color.PrimaryColor}
                      />
                    </View>
                    <TouchableOpacity
                      style={{
                        height: 40,
                        width: '90%',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        SetGenderView(true);
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'Montserrat-Regular',
                          color:
                            FormData.gender === 'gender'
                              ? Color.PLACE_HOLDER_COLOR
                              : Color.PrimaryColor,
                        }}>
                        {FormData.gender}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {BadGender ? (
                    <Text
                      style={{
                        marginVertical: 5,
                        marginTop: 3,
                        marginLeft: 15,
                        fontSize: 11,
                        color: 'red',
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      Select valid gender
                    </Text>
                  ) : null}

                  {GenderView ? (
                    <View
                      style={{
                        width: '100%',
                        marginVertical: 5,
                        backgroundColor: 'white',
                        borderRadius: 8,
                      }}>
                      <TouchableOpacity
                        style={{padding: 5}}
                        onPress={() => {
                          SetFormData({...FormData, gender: 'Male'});
                          SetGenderView(false);
                        }}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: 'black',
                            fontFamily: 'Montserrat-Medium',
                          }}>
                          Male
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{padding: 5}}
                        onPress={() => {
                          SetFormData({...FormData, gender: 'Female'});
                          SetGenderView(false);
                        }}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: 'black',
                            fontFamily: 'Montserrat-Medium',
                          }}>
                          Female
                        </Text>
                      </TouchableOpacity>
                    </View>
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
                        name="school"
                        size={20}
                        color={Color.PrimaryColor}
                      />
                    </View>
                    <TextInput
                      ref={MinorInput}
                      returnKeyType="next"
                      onSubmitEditing={() => HighSchoolInput.current.focus()}
                      value={FormData.minorschool}
                      onChangeText={(text) =>
                        SetFormData({...FormData, minorschool: text})
                      }
                      placeholder="Minor and School"
                      style={{
                        height: 40,
                        width: '90%',
                        fontSize: 15,
                        fontFamily: 'Montserrat-Regular',
                        color: Color.PrimaryColor,
                        backgroundColor: 'white',
                      }}></TextInput>
                  </View>
                  {BadMinorSchool ? (
                    <Text
                      style={{
                        marginVertical: 5,
                        marginTop: 3,
                        marginLeft: 15,
                        fontSize: 11,
                        color: 'red',
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      Enter valid minor school
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
                        name="school"
                        size={20}
                        color={Color.PrimaryColor}
                      />
                    </View>
                    <TextInput
                      value={FormData.highschool}
                      onChangeText={(text) =>
                        SetFormData({...FormData, highschool: text})
                      }
                      returnKeyType="next"
                      onSubmitEditing={() => Keyboard.dismiss()}
                      ref={HighSchoolInput}
                      placeholder="High School"
                      style={{
                        height: 40,
                        width: '90%',
                        fontSize: 15,
                        fontFamily: 'Montserrat-Regular',
                        color: Color.PrimaryColor,
                        backgroundColor: 'white',
                      }}></TextInput>
                  </View>
                  {BadHighSchool ? (
                    <Text
                      style={{
                        marginVertical: 5,
                        marginTop: 3,
                        marginLeft: 15,
                        fontSize: 11,
                        color: 'red',
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      Enter valid high school
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
                        name="calendar"
                        size={20}
                        color={Color.PrimaryColor}
                      />
                    </View>
                    <TouchableOpacity
                      style={{
                        height: 40,
                        width: '90%',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        SetCalendarOpen(true);
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'Montserrat-Regular',
                          color:
                            FormData.year === 'year'
                              ? Color.PLACE_HOLDER_COLOR
                              : Color.PrimaryColor,
                        }}>
                        {FormData.year}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {BadYear ? (
                    <Text
                      style={{
                        marginVertical: 5,
                        marginTop: 3,
                        marginLeft: 15,
                        fontSize: 11,
                        color: 'red',
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      Enter valid year
                    </Text>
                  ) : null}

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: Color.PrimaryColor,
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      Are you okay with Pets?
                    </Text>
                    <CheckBox
                      label=""
                      checked={PetChecked}
                      onChange={(checked) => SetPetChecked(!PetChecked)}
                    />
                  </View>
                  {BadPets ? (
                    <Text
                      style={{
                        marginVertical: 5,
                        marginTop: 3,
                        marginLeft: 15,
                        fontSize: 11,
                        color: 'red',
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      Select pets
                    </Text>
                  ) : null}

                  <TextInput
                    value={FormData.hobbies}
                    ref={HobbiesInput}
                    multiline
                    returnKeyType="next"
                    onFocus={() => SetKeyboardView(true)}
                    onBlur={() => SetKeyboardView(false)}
                    onSubmitEditing={() => BabySittingInput.current.focus()}
                    onChangeText={(text) =>
                      SetFormData({...FormData, hobbies: text})
                    }
                    placeholder="What are yout hobbies?"
                    style={{
                      height: 80,
                      padding: 10,
                      width: '100%',
                      fontSize: 15,
                      fontFamily: 'Montserrat-Regular',
                      color: Color.PrimaryColor,
                      backgroundColor: 'white',
                      marginTop: 20,
                      textAlignVertical: 'top',
                    }}></TextInput>
                  {BadHobbies ? (
                    <Text
                      style={{
                        marginVertical: 5,
                        marginTop: 3,
                        marginLeft: 15,
                        fontSize: 11,
                        color: 'red',
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      Enter your hobbies
                    </Text>
                  ) : null}

                  <TextInput
                    value={FormData.babysitting}
                    onFocus={() => SetKeyboardView(true)}
                    onBlur={() => SetKeyboardView(false)}
                    onChangeText={(text) =>
                      SetFormData({...FormData, babysitting: text})
                    }
                    ref={BabySittingInput}
                    returnKeyType="done"
                    onSubmitEditing={() => SignUp()}
                    placeholder="What do you enjoy about babysitting?"
                    multiline
                    style={{
                      height: 80,
                      padding: 10,
                      width: '100%',
                      fontSize: 15,
                      fontFamily: 'Montserrat-Regular',
                      color: Color.PrimaryColor,
                      backgroundColor: 'white',
                      marginTop: 20,
                      textAlignVertical: 'top',
                    }}></TextInput>
                  {BadBabySitting ? (
                    <Text
                      style={{
                        marginVertical: 5,
                        marginTop: 3,
                        marginLeft: 15,
                        fontSize: 11,
                        color: 'red',
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      Enter baby sitting
                    </Text>
                  ) : null}
                </ScrollView>
              </View>
              <TouchableOpacity
                activeOpacity={0.1}
                onPress={() => SignUp()}
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
                {isSignUp ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'white',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {!NextView ? 'NEXT' : 'SUBMIT'}
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

        {/* </ScrollView> */}
      </LinearGradient>
      <DateTimePicker
        is24Hour
        value={new Date()}
        isVisible={CalendarOpen}
        onConfirm={SetYear}
        onCancel={() => SetCalendarOpen(false)}
        mode="date"
        format="MM/DD/YYYY"
      />
      {isSignUp && <Spinner />}
    </View>
  );
};

export default SitterForm;
