import React, { Component } from 'react';
import { View, Dimensions, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Form, Item, Input, Label, Icon, Thumbnail, Picker, CheckBox, Textarea, Left, Body, Right, Button } from 'native-base';
import Animated, { Easing, Transition, Transitioning } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Styles from '@Screen/SignUp/Style'
import { widthPercentageToDP, heightPercentageToDP, } from '@Theme/Responsive';
import Svg, { Image, Circle, ClipPath, Path } from 'react-native-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Color from '@Asset/color';
import AnimateLoadingButton from '@Component/AnimatedButton'; 
const { width, height } = Dimensions.get('window');

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
  spring,
  SpringUtils
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 500,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}


export default class extends Component {
  constructor(props) {
    super();
    this.state = {
      errorExist: true,
      showText: true,
    }
    this.sitterButtonOpacity = new Value(1);
    this.companyButtonOpacity = new Value(1);
    this.parentButtonOpacity = new Value(1);

    this.sitterBtnStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.sitterButtonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);
    this.closeStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.sitterButtonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);

    this.companyBtnStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.companyButtonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);

    this.closeCompanyForm = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.companyButtonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);

    this.parentBtnStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.parentButtonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);
    this.closeParentForm = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.parentButtonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);

    this.scaleSitterForm = interpolate(this.sitterButtonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    })

    this.scaleCompanyForm = interpolate(this.companyButtonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    })

    this.scaleParentForm = interpolate(this.parentButtonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    })
  }
  

  resgisterSitterForm = () => {
    return (
      <Animated.View style={{
        transform: [{
          scale: this.scaleSitterForm
        }], ...Styles.container
      }}>
        <KeyboardAwareScrollView>
          <View style={{ ...Styles.keyboardAvoidView, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ ...Styles.formModal }}>

              <View style={{ ...Styles.formModalheader }}>
                <Left>
                <TapGestureHandler onHandlerStateChange={this.closeStateChange}>
                  <Animated.View>
                    <Icon type="MaterialIcons" name='arrow-back' style={{ ...Styles.formIcons, marginLeft: 10 }} />
                    </Animated.View>
                  </TapGestureHandler>
                </Left>
                <Text style={{ ...Styles.modalTitle }}>Register as a Sitter</Text>
                <Right></Right>
              </View>
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Thumbnail source={require('@Asset/images/avatar.png')} />
              </View>
              <Form style={{ ...Styles.formContainer }}>
                <Item last style={{ ...Styles.formItems }} error={this.state.errorExist}>
                  <Icon type="MaterialIcons" name='people' style={{ ...Styles.formIcons }} />
                  <Input placeholder="Firstname" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                </Item>
                <Item last >
                  <Icon type="MaterialIcons" name='people' style={{ ...Styles.formIcons }} />
                  <Input placeholder="Lastname" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                </Item>
                <Item last >
                  <Icon type="MaterialIcons" name='email' style={{ ...Styles.formIcons }} />
                  <Input placeholder="Enter email address" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                </Item>
                <Item last >
                  <Icon type="MaterialIcons" name='phone' style={{ ...Styles.formIcons }} />
                  <Input placeholder="Enter Phone number" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                </Item>
                <Item last >
                  <Icon type="FontAwesome5" name='male' style={{ ...Styles.formIcons, marginLeft: 10 }} />
                  <Picker
                    mode="dropdown"
                    style={{ ...Styles.pickerStyle }}
                    placeholder="Gender"
                    placeholderStyle={{ color: Color.PrimaryColorRGBA_08 }}
                  /* selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)} */
                  >
                    <Picker.Item label="Male" value="key0" />
                    <Picker.Item label="Female" value="key1" />
                  </Picker>
                </Item>
                <Item last >
                  <Icon type="MaterialIcons" name='book' style={{ ...Styles.formIcons }} />
                  <Input placeholder="Higher Education" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                </Item>
                <Item last style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ ...Styles.formDoubleItems1, flexDirection: 'row' }}>
                    <Icon type="MaterialIcons" name='people' style={{ ...Styles.formIcons }} />
                    <Input placeholder="High School" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                  </View>
                  {/* <Icon type="MaterialIcons" name='people' style={{...Styles.formIcons}}/> */}
                  <View style={{ ...Styles.formDoubleItems2 }} >
                    <Input placeholder="Year" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                  </View>
                </Item>
                <Item last disabled>

                  <Input editable={false} placeholder="Are you Ok with pets?" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                  <CheckBox checked={true} />
                </Item>
                <Textarea rowSpan={3} bordered placeholder="What are your hobbies?" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                <Textarea rowSpan={3} bordered placeholder="What do you enjoy about baby sitting?" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                <AnimateLoadingButton
                  style={{ ...Styles.button }}
                  ref={c => (this.loadingButton = c)}
                  width={widthPercentageToDP(70)}
                  height={heightPercentageToDP(5)}
                  title="Submit"
                  titleFontSize={16}
                  borderRadius={30}
                  titleColor="rgb(255,255,255)"
                  backgroundColor="rgba(102, 153, 255,1)"
                  titleFontSize={20}
                  onPress={()=>{}}
                />
              </Form>

              
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Animated.View>
    )
  }


  resgisterCompanyForm = () => {
    return (
      <Animated.View style={{
        transform: [{
          scale: this.scaleCompanyForm
        }], ...Styles.container
      }}>
        <KeyboardAwareScrollView>
          <View style={{ ...Styles.keyboardAvoidView, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ ...Styles.formModal,height:heightPercentageToDP(55) }}>

              <View style={{ ...Styles.formModalheader }}>
                <Left>
                <TapGestureHandler onHandlerStateChange={this.closeCompanyForm}>
                  <Animated.View>
                    <Icon type="MaterialIcons" name='arrow-back' style={{ ...Styles.formIcons, marginLeft: 10 }} />
                    </Animated.View>
                  </TapGestureHandler>
                </Left>
                <Text style={{ ...Styles.modalTitle }}>Register as a Company</Text>
                <Right></Right>
              </View>
              <Form style={{ ...Styles.formContainer }}>
                <Item last style={{ ...Styles.formItems }} error={this.state.errorExist}>
                  <Icon type="MaterialIcons" name='people' style={{ ...Styles.formIcons }} />
                  <Input placeholder="Fullname" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                </Item>
                <Item last >
                  <Icon type="MaterialIcons" name='people' style={{ ...Styles.formIcons }} />
                  <Input placeholder="Type of business" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                </Item>
                <Item last >
                  <Icon type="MaterialIcons" name='phone' style={{ ...Styles.formIcons }} />
                  <Input placeholder="Enter Phone number" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                </Item>
                <Item last >
                  <Icon type="MaterialIcons" name='pin-drop' style={{ ...Styles.formIcons }} />
                  <Input placeholder="Zip code" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                </Item>
                <Item last >
                  <Icon type="MaterialIcons" name='email' style={{ ...Styles.formIcons }} />
                  <Input placeholder="Enter email address" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                </Item>
                <Item last >
                  <Icon type="MaterialIcons" name='lock' style={{ ...Styles.formIcons }} />
                  <Input placeholder="Password" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                </Item>
                
                <AnimateLoadingButton
                  style={{ ...Styles.button }}
                  ref={c => (this.loadingButton = c)}
                  width={widthPercentageToDP(70)}
                  height={heightPercentageToDP(5)}
                  title="Submit"
                  titleFontSize={16}
                  borderRadius={30}
                  titleColor="rgb(255,255,255)"
                  backgroundColor="rgba(102, 153, 255,1)"
                  titleFontSize={20}
                  onPress={()=>{}}
                />
              </Form>

              
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Animated.View>
    )
  }

  resgisterParentForm = () => {
    return (
      <Animated.View style={{
        transform: [{
          scale: this.scaleParentForm
        }], ...Styles.container
      }}>
        <KeyboardAwareScrollView>
          <View style={{ ...Styles.keyboardAvoidView, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ ...Styles.formModal }}>

              <View style={{ ...Styles.formModalheader }}>
                <Left>
                <TapGestureHandler onHandlerStateChange={this.closeParentForm}>
                  <Animated.View>
                    <Icon type="MaterialIcons" name='arrow-back' style={{ ...Styles.formIcons, marginLeft: 10 }} />
                    </Animated.View>
                  </TapGestureHandler>
                </Left>
                <Text style={{ ...Styles.modalTitle }}>Register as a Parent</Text>
                <Right></Right>
              </View>
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Thumbnail source={require('@Asset/images/avatar.png')} />
              </View>
              <Form style={{ ...Styles.formContainer }}>
                <Item last style={{ ...Styles.formItems }} error={this.state.errorExist}>
                  <Icon type="MaterialIcons" name='people' style={{ ...Styles.formIcons }} />
                  <Input placeholder="Firstname" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                </Item>
                <Item last >
                  <Icon type="MaterialIcons" name='people' style={{ ...Styles.formIcons }} />
                  <Input placeholder="Lastname" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                </Item>
                <Item last >
                  <Icon type="MaterialIcons" name='email' style={{ ...Styles.formIcons }} />
                  <Input placeholder="Enter email address" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                </Item>
                <Item last >
                  <Icon type="MaterialIcons" name='phone' style={{ ...Styles.formIcons }} />
                  <Input placeholder="Enter Phone number" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                </Item>
                <Item last >
                  <Icon type="FontAwesome5" name='male' style={{ ...Styles.formIcons, marginLeft: 10 }} />
                  <Picker
                    mode="dropdown"
                    style={{ ...Styles.pickerStyle }}
                    placeholder="Gender"
                    placeholderStyle={{ color: Color.PrimaryColorRGBA_08 }}
                  /* selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)} */
                  >
                    <Picker.Item label="Male" value="key0" />
                    <Picker.Item label="Female" value="key1" />
                  </Picker>
                </Item>
                <Item last >
                  <Icon type="MaterialIcons" name='book' style={{ ...Styles.formIcons }} />
                  <Input placeholder="Higher Education" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                </Item>
                <Item last style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ ...Styles.formDoubleItems1, flexDirection: 'row' }}>
                    <Icon type="MaterialIcons" name='people' style={{ ...Styles.formIcons }} />
                    <Input placeholder="High School" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                  </View>
                  {/* <Icon type="MaterialIcons" name='people' style={{...Styles.formIcons}}/> */}
                  <View style={{ ...Styles.formDoubleItems2 }} >
                    <Input placeholder="Year" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                  </View>
                </Item>
                <Item last disabled>

                  <Input editable={false} placeholder="Are you Ok with pets?" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                  <CheckBox checked={true} />
                </Item>
                <Textarea rowSpan={3} bordered placeholder="What are your hobbies?" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                <Textarea rowSpan={3} bordered placeholder="What do you enjoy about baby sitting?" placeholderTextColor={Color.PrimaryColorRGBA_08} />
                <AnimateLoadingButton
                  style={{ ...Styles.button }}
                  ref={c => (this.loadingButton = c)}
                  width={widthPercentageToDP(70)}
                  height={heightPercentageToDP(5)}
                  title="Submit"
                  titleFontSize={16}
                  borderRadius={30}
                  titleColor="rgb(255,255,255)"
                  backgroundColor="rgba(102, 153, 255,1)"
                  titleFontSize={20}
                  onPress={()=>{}}
                />
              </Form>

              
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Animated.View>
    )
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-around'
      }}>

        <View
          style={{
            ...StyleSheet.absoluteFill,
            //transform: [{ translateY: this.bgY }]
          }}
        >
          <Svg height={height + 50} width={width} fill="rgba(0,0,0,0.5)" fillOpacity={1}>
            {/* <ClipPath id="circle">
              <Circle r={height + 50} cx={width / 2} fill="#000" />
            </ClipPath> */}
            <Image
              href={require('@Asset/images/bg2.jpg')}
              height={height + 50}
              width={width}
              preserveAspectRatio="xMidyMid slice"
              clipPath='url(#circle)'
            />
            <Circle r={height + 50} cx={width / 2} fill="rgba(102, 153, 255,0.8)" fillOpacity={0.5} />
          </Svg>
        </View>
        <Animated.View style={{
          ...StyleSheet.absoluteFill,
          zIndex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center'
          //transform: [{ translateY: this.bgY }]
        }}>
          <TapGestureHandler onHandlerStateChange={this.sitterBtnStateChange}>
            <Animated.View style={{ ...Styles.button, opacity: this.sitterButtonOpacity }}>
              <Text style={{ ...Styles.btnText }}>As a Sitter</Text>
            </Animated.View>
          </TapGestureHandler>

          <TapGestureHandler onHandlerStateChange={this.companyBtnStateChange}>
            <Animated.View style={{ ...Styles.button,opacity:this.companyButtonOpacity }}>
              <Text style={{ ...Styles.btnText }}>As a Company</Text>
            </Animated.View>
          </TapGestureHandler>

          <TapGestureHandler onHandlerStateChange={this.parentBtnStateChange}>
            <Animated.View style={{ ...Styles.button ,opacity:this.parentButtonOpacity }}>
              <Text style={{ ...Styles.btnText }}>As a Parent</Text>
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>
        {this.resgisterSitterForm()}
        {this.resgisterCompanyForm()}
        {this.resgisterParentForm()}
      </View>
    )
  }
}