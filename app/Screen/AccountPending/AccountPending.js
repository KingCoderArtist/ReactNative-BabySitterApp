import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Color from '../../../assets/color';
import LottieView from 'lottie-react-native';
import { User_Login } from '../../Component/Helper/Helper';
import { RNToasty } from 'react-native-toasty';
import Spinner from '../../Component/Spinner/Spinner';

const AccountPending = ({ navigation, route }) => {
  const [ParamData, SetParamData] = useState(route.params ? route.params : {
    id:'',
    email:'',
    isVerified:true,
    type : ''
  });
  const [IsLoading, SetIsLoading] = useState(false);

  let animation = useRef(null);

  useEffect(() => {
    animation.current.play();
  }, []);

  const ResendMail = () => {
    const { email, id, type} = ParamData;
    SetIsLoading(true);
    User_Login('api/user/resend-email', {
      _id: id,
      email: email
    })
      .then(data => data.json())
      .then(res => {
        if (res.status === 200) {
          SetIsLoading(false)
          RNToasty.Success({
            title: res.message,
            fontFamily: 'Montserrat-Medium',
          });
          navigation.navigate('OTPVerification',{type:ParamData.type});
        }
        else {
          SetIsLoading(false)
          alert(res.message)
        }
      })
      .catch(e => {
        SetIsLoading(false)
        alert('Something went wrong...!')
      })
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
      }}>
      <LottieView
        ref={animation}
        source={require('../../../assets/document-preview.json')}
        loop
        resizeMode="contain"
        autoPlay
        duration={3000}
        style={{
          //   position: 'absolute',
          //   top: 0,
          //   bottom: 0,
          //   right: 0,
          //   left: 0,
          //   opacity: 0.5,
          height: 200,
          width: 200,
        }}
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          color: 'black',
          fontFamily: 'Montserrat-Bold',
        }}>
        Thank you for registering!
      </Text>
      {
        !ParamData.isVerified
          ?
          <Text
            style={{
              textAlign: 'center',
              width: 350,
              marginTop: 20,
              fontSize: 16,
              color: 'black',
              fontFamily: 'Montserrat-Medium',
            }}>
            It seems you not verified your email id , Please verify it...!
      </Text>
          :
          <Text
            style={{
              textAlign: 'center',
              width: 350,
              marginTop: 20,
              fontSize: 16,
              color: 'black',
              fontFamily: 'Montserrat-Medium',
            }}>
            Your account is currently being reviewed. We will contact you shortly!
      </Text>
      }
      <TouchableOpacity
        onPress={
          !ParamData.isVerified
            ?
            () => ResendMail()
            :
            () => navigation.navigate('Login')
        }
        style={{
          height: 45,
          backgroundColor: Color.PrimaryColor,
          paddingHorizontal: 15,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 25,
          marginTop: 40,
        }}>
        <Text style={{ color: 'white', fontFamily: 'Montserrat-Medium' }}>
          {
            !ParamData.isVerified
              ?
              'Resend Email'
              :
              'Done'
          }
        </Text>
      </TouchableOpacity>

      {
        IsLoading && (
          <Spinner/>
        )
      }
    </SafeAreaView>
  );
};

export default AccountPending;
