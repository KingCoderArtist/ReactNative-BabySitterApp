/**
 * @format
 * @flow strict-local
 */
/* import React from 'react'
import { StatusBar, TextInput, Image, ImageBackground,TouchableOpacity } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, View } from 'native-base'

import NavigationService from '@Service/Navigation'

import Style from '@Theme/Style'
import Styles from '@Screen/Login/Style'
*/
import AnimateLoadingButton from '@Component/AnimatedButton';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Styles from '@Screen/Login/Style';
import Svg, { Image, Circle, ClipPath, Path } from 'react-native-svg';
import NavigationService from '@Service/Navigation';
import Animated, { Easing } from 'react-native-reanimated';
import {
  TapGestureHandler,
  State,
  TouchableOpacity,
} from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
import Color from '@Asset/color';
import { widthPercentageToDP, heightPercentageToDP } from '@Theme/Responsive';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { User_Login } from '../../Component/Helper/Helper';
import AsyncStorage from '@react-native-community/async-storage';
import { RNToasty } from 'react-native-toasty';
import { hLog } from '../../Library/helper';

const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}
class GoThrough extends Component {
  constructor() {
    super();
    (this.state = {
      email: '',
      password: '',

      BadEmail: false,
      BadPassword: false,

      isLogin: false,
    }),
      (this.buttonOpacity = new Value(1));
    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0)),
            ),
          ]),
      },
    ]);

    this.closeStateChange = event([
      {
        nativeEvent: ({ state }) => {
          Keyboard.dismiss()

          return block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1)),
            ),
          ]);
        },
      },
    ]);

    this.signUpBtnStateChaneg = (from) => {
      //f (event.nativeEvent.state === State.ACTIVE) {
      NavigationService.navigateWithParams('Register', { navigateFrom: from });
//      NavigationService.navigate('CreditCardDetails');
      //}
    };

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 50, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });
    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP,
    });

    this.appNameFromTop = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [heightPercentageToDP(50), 0],
      extrapolate: Extrapolate.CLAMP,
    });
  }

  _onPressHandler() {
    // mock
    setTimeout(() => {
      this.props.navigation.replace('BottomTabs');
      this.loadingButton.showLoading(false);
    }, 2000);
  }

  validate(email, password) {
    let valid = true;

    if (reg.test(email) === false) {
      valid = false;
      this.setState({ BadEmail: true });
    } else {
      this.setState({ BadEmail: false });
    }

    if (!password) {
      valid = false;
      this.setState({ BadPassword: true });
    } else {
      this.setState({ BadPassword: false });
    }

    this.loadingButton.showLoading(false);
    Keyboard.dismiss();

    return valid;
  }

  Login() {
    const { email, password } = this.state;
    this.loadingButton.showLoading(true);
    if (this.validate(email, password)) {
      Keyboard.dismiss();
      User_Login('api/user/signin', {
        email: email,
        password: password,
      })
        .then((data) => data.json())
        .then((res) => {
          console.log(res, 'login');
          if (res.status === 200) {
            global.userData = res.user;
            hLog(res.user);
            if (res.user.status === 'Pending') {
              this.props.navigation.navigate('AccountPending', { 
                type : 'login',
                isVerified: res.user.isVerified, 
                email : res.user.email,
                id :   res.user._id
              });
            } else {
              AsyncStorage.multiSet(
                [
                  ['token', res.token],
                  ['userData', JSON.stringify(res.user)],
                ],
                (err, data) => {
                  if (err === null) {
                    this.setState(
                      {
                        email: '',
                        password: '',
                      },
                      () => {
                        RNToasty.Success({
                          title: res.message,
                          fontFamily: 'Montserrat-Medium',
                        });
                        this.loadingButton.showLoading(false);
                        this.props.navigation.replace('BottomTabs');
                      },
                    );
                  } else {
                    this.loadingButton.showLoading(false);
                    alert('Something went wrong...!');
                  }
                },
              );
            }
          } else {
            this.loadingButton.showLoading(false);
            alert(res.message);
          }
        })
        .catch((e) => {
          this.loadingButton.showLoading(false);
          alert('Something went wrong...!');
        });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View
          onTouchStart={() => Keyboard.dismiss()}

          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: '#fff',
          }}>
          {/* Animated background and text */}
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              transform: [{ translateY: this.bgY }],
            }}>
            <Svg
              height={height + 50}
              width={width}
              fill="rgba(0,0,0,0.5)"
              // fill="#fff"
              fillOpacity={1}>
              <ClipPath id="circle">
                <Circle r={height + 50} cx={width / 2} fill="#000" />
              </ClipPath>
              <Image
                href={require('@Asset/images/bg2.jpg')}
                height={height + 50}
                width={width}
                preserveAspectRatio="xMidyMid slice"
                clipPath="url(#circle)"
              />
              <Circle
                r={height + 50}
                cx={width / 2}
                fill={Color.PrimaryColorRGBA_08}
              // fillOpacity={0.5}
              />
            </Svg>
            <Animated.View
              style={{
                ...Styles.logoContainer,
                ...StyleSheet.absoluteFill,
                transform: [{ translateY: this.appNameFromTop }],
              }}>
              <Text style={Styles.appName}>SITTEROO</Text>

              <Text style={[Styles.appSlogan, { marginTop: 20 }]}>
                Highly qualified screened sitters
              </Text>
              <Text style={Styles.appSlogan}>anywhere, any time!</Text>
            </Animated.View>
          </Animated.View>

          {/* Animated buttons view */}
          <View style={{ height: height / 2.5, justifyContent: 'center' }}>
            <Animated.Text
              style={{ ...Styles.signUpAsText, opacity: this.buttonOpacity }}>
              REGISTER
            </Animated.Text>
            <Animated.View
              style={{
                height: height / 2.8,
                justifyContent: 'center',
                backgroundColor: '#FFF',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }],
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.signUpBtnStateChaneg('company');
                }}>
                <Animated.View
                  style={{
                    ...Styles.button,
                    opacity: this.buttonOpacity,
                    transform: [{ translateY: this.buttonY }],
                    backgroundColor: Color.PrimaryColorRGBA_08,
                  }}>
                  <Text style={{ ...Styles.btnTxt, color: 'white' }}>
                    COMPANY
                  </Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.signUpBtnStateChaneg('parent');
                }}>
                <Animated.View
                  style={{
                    ...Styles.button,
                    opacity: this.buttonOpacity,
                    transform: [{ translateY: this.buttonY }],
                    backgroundColor: Color.PrimaryColorRGBA_08,
                  }}>
                  <Text style={{ ...Styles.btnTxt, color: 'white' }}>PARANT</Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.signUpBtnStateChaneg('sitter');
                }}>
                <Animated.View
                  style={{
                    ...Styles.button,
                    opacity: this.buttonOpacity,
                    transform: [{ translateY: this.buttonY }],
                    backgroundColor: Color.PrimaryColorRGBA_08,
                  }}>
                  <Text style={{ ...Styles.btnTxt, color: 'white' }}>SITTER</Text>
                </Animated.View>
              </TouchableOpacity>
              <View style={{ ...Styles.orSaparatorContainer }}>
                <View style={{ ...Styles.lines }}></View>
                <Text style={{ ...Styles.orText }}>OR</Text>
                <View style={{ ...Styles.lines }}></View>
              </View>
              <TapGestureHandler
                /* onHandlerStateChange={this.signUpBtnStateChaneg} */ onHandlerStateChange={
                  this.onStateChange
                }>
                <Animated.View
                  style={{
                    ...Styles.button,
                    backgroundColor: Color.PrimaryColor,
                    opacity: this.buttonOpacity,
                    transform: [{ translateY: this.buttonY }],
                  }}>
                  <Text style={{ ...Styles.btnTxt, color: 'white' }}>
                    SIGN IN
                  </Text>
                </Animated.View>
              </TapGestureHandler>
            </Animated.View>

            {/* Animated Form */}
            <Animated.View
              style={{
                backgroundColor: '#fff',
                zIndex: this.textInputZindex,
                opacity: this.textInputOpacity,
                transform: [
                  {
                    translateY: this.textInputY,
                  },
                ],
                height: height / 3.3,
                ...StyleSheet.absoluteFill,
                top: null,
                justifyContent: 'center',
              }}>
              <TapGestureHandler onHandlerStateChange={this.closeStateChange}>
                <Animated.View style={{ ...Styles.closeButton }}>
                  <Icon name="close" size={24} />
                  {/* <Animated.Text
                  style={{
                    fontSize: 15,
                    transform: [
                      {
                        rotate: concat(this.rotateCross, 'deg'),
                      },
                    ],
                  }}>
                  X
                </Animated.Text> */}
                </Animated.View>
              </TapGestureHandler>
              <TextInput
                returnKeyType="next"
                value={this.state.email}
                onSubmitEditing={() => this.passwordField.focus()}
                keyboardType="email-address"
                onChangeText={(email) => this.setState({ email })}
                placeholder="Email"
                style={{ ...Styles.textInput }}
                placeholderTextColor="#000"
              />
              {this.state.BadEmail ? (
                <Text
                  style={{
                    marginLeft: 35,
                    marginVertical: 5,
                    fontSize: 11,
                    color: 'red',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Enter valid email
                </Text>
              ) : null}
              <TextInput
                returnKeyType="done"
                ref={(ref) => (this.passwordField = ref)}
                value={this.state.password}
                onSubmitEditing={() => this.Login()}
                onChangeText={(password) => this.setState({ password })}
                placeholder="Password"
                secureTextEntry
                style={{ ...Styles.textInput }}
                placeholderTextColor="#000"
              />
              {this.state.BadPassword ? (
                <Text
                  style={{
                    marginLeft: 35,
                    marginVertical: 5,
                    fontSize: 11,
                    color: 'red',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Enter valid password
                </Text>
              ) : null}

              <Text
                onPress={() => this.props.navigation.navigate('ForgotPassword')}
                style={{
                  textAlign: 'right',
                  marginRight: 20,
                  fontSize: 13,
                  color: Color.PrimaryColor,
                  fontFamily: 'Montserrat-SemiBold',
                  marginVertical: 8,
                }}>
                Forgot password ? click here
              </Text>

              {/*  <Animated.View style={{ ...styles.button,backgroundColor:'rgba(102, 153, 255,1)' }}> */}
              <AnimateLoadingButton
                //style={{ ...Styles.button }}
                ref={(c) => (this.loadingButton = c)}
                width={width - 40}
                height={60}
                title="SIGN IN"
                titleFontSize={16}
                borderRadius={30}
                titleColor="rgb(255,255,255)"
                backgroundColor="rgba(102, 153, 255,1)"
                titleFontSize={20}
                onPress={() => this.Login()}
                // onPress={() => this.props.navigation.replace('AccountPending')}
                titleFontFamily="Montserrat-SemiBold"
              />
              {/* <Text style={{ fontSize: 20, fontWeight: 'bold',color:'#fff' }}>SIGN IN</Text>
              </Animated.View> */}
            </Animated.View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
export default GoThrough;
