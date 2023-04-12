import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Header from '../../Component/TabHeader/index';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../../assets/color';
import {User_Login} from '../../Component/Helper/Helper';
import {RNToasty} from 'react-native-toasty';
import LottieView from 'lottie-react-native';
import Spinner from '../../Component/Spinner/Spinner';

const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;

const Forgotpassword = ({navigation}) => {
  const [Email, SetEmail] = useState('');
  const [BadEmail, SetBadEmail] = useState(false);
  const [IsLoading, SetIsLoading] = useState(false);
  let animation = useRef(null);
  const validate = () => {
    let valid = true;

    if (reg.test(Email) === false) {
      valid = false;
      SetBadEmail(true);
    } else {
      SetBadEmail(false);
    }

    return valid;
  };

  useEffect(() => {
    animation.current.play();
  }, []);

  const SendEmail = () => {
    SetIsLoading(true);
    User_Login('api/user/forget-password', {
      email: Email,
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        SetIsLoading(false);
        if (res.status === 200) {
          SetEmail('');
          RNToasty.Success({
            title: res.message,
            fontFamily: 'Montserrat-Medium',
          });
          navigation.navigate('ResetPassword');
        } else {
          alert(res.message);
        }
      })
      .catch((e) => {
        alert('Something went wrong...!');
        SetIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        onPressLeft={() => {
          navigation.pop();
        }}
        leftComp={<Icon name="arrow-left" size={20} color="#fff" />}
        title={'Forgot Password'}
      />

      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LottieView
          ref={animation}
          source={require('../../../assets/thinking.json')}
          loop
          resizeMode="center"
          autoPlay
          duration={2000}
          style={{
            // marginBottom: 20,
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            opacity: 0.5,
          }}
        />
        <TextInput
          keyboardType="email-address"
          returnKeyType="done"
          onEndEditing={() => {
            Keyboard.dismiss();
            // if (validate()) {
            //   SendEmail();
            // }
          }}
          placeholder="Enter email"
          value={Email}
          onChangeText={(text) => SetEmail(text)}
          style={{
            height: 45,
            fontFamily: 'Montserrat-Medium',
            color: 'black',
            fontSize: 13,
            paddingHorizontal: 20,
            borderWidth: 1,
            borderRadius: 25,
            borderColor: Color.PrimaryColor,
            width: '100%',
          }}
        />
        {BadEmail ? (
          <Text
            style={{
              marginVertical: 5,
              fontSize: 11,
              color: 'red',
              fontFamily: 'Montserrat-Medium',
              marginLeft: 20,
            }}>
            Enter valid email
          </Text>
        ) : null}

        <TouchableOpacity
          onPress={() => {
            if (validate()) {
              SendEmail();
            }
          }}
          style={{
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            height: 45,
            backgroundColor: Color.PrimaryColor,
            borderRadius: 25,
            width: '100%',
          }}>
          {IsLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text
              style={{
                fontSize: 14,
                color: 'white',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Send Email
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {IsLoading && <Spinner />}
    </SafeAreaView>
  );
};

export default Forgotpassword;
