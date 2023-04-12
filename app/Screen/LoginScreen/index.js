import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Color from '../../../assets/color';
import Styles from './Style';
import Header from '../../Component/Header/Header';

const LoginScreen = ({navigation}) => {
  const [InputData, SetInputData] = useState({
    email: '',
    password: '',
  });
  return (
    <View style={Styles.MainContainer}>
      <Header
        navigation={navigation}
        LeftNavigation={() => navigation.goBack()}
        LeftButton={true}
        RightButton={false}
        Title={'Log-in'}
      />
      <Text style={Styles.heading}>Email and Password</Text>

      <View
        style={{
          borderTopWidth: 0.5,
          borderColor: Color.PLACE_HOLDER_COLOR,
          marginTop: 10,
        }}>
        <TextInput
          value={InputData.email}
          onChangeText={(text) => SetInputData({...InputData, email: text})}
          placeholder="Email"
          placeholderTextColor={Color.PLACE_HOLDER_COLOR}
          style={Styles.emailInput}></TextInput>

        <TextInput
          value={InputData.password}
          onChangeText={(text) => SetInputData({...InputData, password: text})}
          placeholder="Password"
          placeholderTextColor={Color.PLACE_HOLDER_COLOR}
          style={[Styles.emailInput, {marginTop: 0}]}></TextInput>
      </View>

      <TouchableOpacity>
        <Text style={Styles.forgotpassword}>
          Forgot your password? Click Here
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={Styles.LoginButton}
        onPress={() =>
          navigation.replace('BottomTabs', {type: InputData.email})
        }>
        <Text style={Styles.ButtonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
