/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  StatusBar,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Text,
  View,
} from 'native-base';

import NavigationService from '@Service/Navigation';
import LottieView from 'lottie-react-native';
import Style from '@Theme/Style';
import Styles from '@Screen/Splash/Style';
import AsyncStorage from '@react-native-community/async-storage';

export default class extends React.Component {
  async componentDidMount() {
    this.animation.play();
    let token = await AsyncStorage.getItem('token');
    setTimeout(() => {
      if (token !== null) {
        this.props.navigation.replace('BottomTabs');
      } else {
        this.props.navigation.replace('Login');
      }
    }, 2000);
  }
  render() {
    {
      /* <Container style={Style.bgMain}> */
    }
    return (
      <ImageBackground
        source={require('@Asset/images/bg2.jpg')}
        imageStyle="cover"
        style={Styles.bgCover}>
        <View style={Styles.bgCover}>
          <Header style={Style.navigationTransparent}>
            <StatusBar
              backgroundColor="#7E8BF5"
              animated
              barStyle="light-content"
            />

            <View style={Style.actionBarLeft}>
              {/* <Button
              transparent style={Style.actionBarBtn} onPress={() => {
                NavigationService.navigate('PublicHome')
              }}
            >
              <Icon active name='arrow-left' style={Style.textWhite} type='MaterialCommunityIcons' />
            </Button> */}
            </View>
            <View style={Style.actionBarMiddle}>
              {/* <Text style={Style.actionBarText}>{'Sign In'.toUpperCase()}</Text> */}
            </View>
            <View style={Style.actionBarRight} />
          </Header>

          {/*<Content style={{flex:1}}>

           <View style={Styles.section}>
            <View style={Styles.logo}>
               <Image source={require('@Asset/images/logo.png')} /> 
              <Text style={Style.actionBarText}>Sitteroo</Text>
            </View>
            <View style={Styles.signBg}>
              <TextInput style={Styles.textInput} placeholder='Email Address or Mobile No.' />
              <TextInput style={Styles.textInput} placeholder='Password' />
              <Button
                style={Styles.btn} onPress={() => {
                  NavigationService.navigate('MemberHome')
                }}
              >
                <Text style={Styles.loginBtnText}>{'Login'.toUpperCase()}</Text>
                 <Icon active name='arrow-right' type='MaterialCommunityIcons' style={Styles.loginBtnIcon} /> 
              </Button>
            </View>
            <View style={Styles.forgot}>
              <Text style={Styles.btnForgot}>Forgot Password?</Text>
            </View>
            <View style={Styles.login}>
              <Text style={Styles.account}>Don't have an account yet?</Text>
              <Button
                transparent onPress={() => {
                  NavigationService.navigate('MemberSignUp')
                }}
              >
                <Text style={Styles.btnLogin}>Sign Up Now!</Text>
              </Button>
            </View>
          </View> 
          
        </Content>*/}

          <View style={{flex: 1}}>
            <View style={Styles.logoContainer}>
              <Text style={Styles.appName}>SITTEROO</Text>
              <View style={{marginTop: 30}}>
                <Text style={Styles.appSlogan}>
                  Highly qualified screened sitters
                </Text>
                <Text style={Styles.appSlogan}>anywhere, any time!</Text>
              </View>

              <LottieView
                ref={(animation) => {
                  this.animation = animation;
                }}
                source={require('../../../assets/Loading.json')}
                loop
                resizeMode="contain"
                autoPlay
                duration={1000}
                style={{height: 200, width: 200, marginTop: 40}}
              />
            </View>
            {/* <View style={Styles.appSloganContainer}>
            
          </View> */}

            {/* <View style={Styles.btnContainer}>
              <TouchableOpacity
                style={Styles.btns}
                onPress={() => {
                  this.props.navigation.navigate('Login');
                }}>
                <Text style={Styles.btnTexts}>Login</Text>
              </TouchableOpacity>
              <View style={Styles.divider}></View>
              <TouchableOpacity style={Styles.btns}>
                <Text style={Styles.btnTexts}>Signup </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </ImageBackground>
    );
    /* </Container> */
  }
}
