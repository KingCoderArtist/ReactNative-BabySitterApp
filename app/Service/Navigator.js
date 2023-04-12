/**
 * @format
 * @flow strict-local
 */
import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import NavigationService from '@Service/Navigation';
import Login from '@Screen/Login';
import Splash from '@Screen/Splash';
import Register from '@Screen/SignUp';
import ChatScreen from '@Screen/ChatScreen';

import CreditCardDetails from '@Screen/CreditCard';
import LoginScreen from '../Screen/LoginScreen';
import AccountPending from '../Screen/AccountPending/AccountPending';
import MainScreen from '../Screen/MainScreen/MainScreen';
import MyTabs from '../Component/BookSitterTab/BookSitterTab';
import BottomTabBar from './BottomTabs';
import MyBookings from '../Screen/MyBookings/MyBookings';
import BookSitterContinued from '../Screen/BookSitterContinued/BookSitterContinued';
import AddChild from '../Screen/AddChild/AddChild';
import PreferredSitters from '../Screen/PreferredSitters/PreferredSitters';
import BookingNotes from '../Screen/BookingNotes/BookingNotes';
import FeedBack from '../Screen/FeedBack/FeedBack';

import {SafeAreaView, StatusBar} from 'react-native';
import Color from '../../assets/color';
import BookingDetails from '../Screen/BookingDetails';
import JobDetails from '../Screen/JobDetails/JobDetails';
import Notification from '../Screen/Notification/ Notification';
import SitterJobs from '../Screen/SitterJobs/SitterJobs';
import Forgotpassword from '../Screen/ForgotPassword/ForgotPassword';
import BookSitter from '../Screen/BookSitter/BookSitter';
import AddLocation from '../Screen/AddLocation/AddLocation';
import OTPVerification from '../Screen/OTPVerification/OTPVerification';
import ResetPassword from '../Screen/Resetpassword/ResetPassword';

const Stack = createStackNavigator();

const Navigator = () => {
  const navigatorRef = useRef(null);
  useEffect(() => {
    //console.log('navigatorRef: ', navigatorRef.current);
    // if (navigatorRef !== null) {
    console.log('navigatorRef 2: ', navigatorRef);
    NavigationService.setTopLevelNavigator(navigatorRef.current);
    // }
  }, [navigatorRef]);

  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  const MyTransition = {
    gestureDirection: 'horizontal',
    /*  transitionSpec: {
      open: {
        duration:1000,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      close: config,
    }, */
    headerStyleInterpolators: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({current, next, layouts}) => {
      return {
        cardStyle: {
          transform: [
            {
              scale: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 1],
              }),
            },
          ],
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      };
    },
  };

  return (
    <NavigationContainer ref={navigatorRef}>
      <Stack.Navigator headerMode="none" initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreditCardDetails"
          component={CreditCardDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AccountPending"
          component={AccountPending}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="BottomTabs" component={BottomTabBar} />
        <Stack.Screen name="BookSitter" component={BookSitter} />

        <Stack.Screen name="MyBookings" component={MyBookings} />
        <Stack.Screen
          name="BookSitterContinued"
          component={BookSitterContinued}
        />
        <Stack.Screen name="AddChild" component={AddChild} />
        <Stack.Screen name="PreferredSitters" component={PreferredSitters} />
        <Stack.Screen name="BookingNotes" component={BookingNotes} />
        <Stack.Screen name="FeedBack" component={FeedBack} />
        <Stack.Screen name="JobDetails" component={JobDetails} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="SitterJobs" component={SitterJobs} />
        <Stack.Screen name="ForgotPassword" component={Forgotpassword} />
        <Stack.Screen name="AddLocation" component={AddLocation} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
