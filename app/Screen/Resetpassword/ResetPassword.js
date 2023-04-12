import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Keyboard, ActivityIndicator, TouchableOpacity } from 'react-native';
import Header from '../../Component/TabHeader/index';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../../assets/color';
import CodeInput from 'react-native-confirmation-code-input';
import { Reset_Password } from '../../Component/Helper/Helper';
import Spinner from '../../Component/Spinner/Spinner';
import { RNToasty } from 'react-native-toasty';

const ResetPassword = ({ navigation }) => {
    const [Data, SetData] = useState({
        NewPassword: '',
        ConfirmPassword: ''
    })

    const [IsLoading, SetIsLoading] = useState(false);
    const [BadPassword, SetBadPassword] = useState(false);
    const [OTP, SetOtp] = useState('');
    const [BadOtp, SetBadOtp] = useState(false)


    const validate = () => {
        const { NewPassword, ConfirmPassword } = Data;
        let valid = true;

        if (NewPassword != ConfirmPassword ||
            (NewPassword === '' && ConfirmPassword === '') ||
            NewPassword.length <= 5) {
            valid = false;
            SetBadPassword(true)
        }
        else {
            SetBadPassword(false)
        }


        if (OTP === '') {
            valid = false;
            SetBadOtp(true)
        }
        else {
            SetBadOtp(false)
        }

        return valid
    }

    const PasswordReset = () => {
        const { NewPassword } = Data;
        SetIsLoading(true)
        Reset_Password('api/user/reset-password', {
            otp: OTP,
            password: NewPassword
        })
            .then(data => data.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    SetIsLoading(false)
                    navigation.replace('Login')
                    RNToasty.Success({
                        title: res.message,
                        fontFamily: 'Montserrat-Medium',
                    });
                }
                else {
                    alert(res.message)
                    SetIsLoading(false)
                }
            })
            .catch(e => {
                console.log(e)
                alert('Something went wrong...!');
                SetIsLoading(false)
            })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header
                onPressLeft={() => {
                    navigation.pop();
                }}
                leftComp={<Icon name="arrow-left" size={20} color="#fff" />}
                title={'Reset Password'}
            />

            <View style={{ flex: 1, paddingTop: 50, paddingHorizontal: 20 }}>
                <CodeInput
                    codeLength={6}
                    // compareWithCode={this.state.code}
                    activeColor={Color.PrimaryColor}
                    inactiveColor={'rgba(0,0,0,0.3)'}
                    autoFocus={false}
                    ignoreCase={true}
                    inputPosition="center"
                    size={40}
                    space={10}
                    // keyboardType="numeric"
                    className={'border-b'}
                    codeInputStyle={{ color: Color.PrimaryColor, fontWeight: 'bold' }}
                    onFulfill={code => SetOtp(code)}
                    containerStyle={{ flex: 0.1, marginTop: 100, }}
                />
                {BadOtp ? (
                    <Text
                        style={{
                            marginVertical: 10,
                            fontSize: 11,
                            color: 'red',
                            textAlign: 'center',
                            fontFamily: 'Montserrat-Medium',

                        }}>
                        Enter valid otp
                    </Text>
                ) : null}

                <TextInput
                    secureTextEntry
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                        // if (validate()) {
                        //   SendEmail();
                        // }
                    }}
                    placeholder="New Password"
                    value={Data.NewPassword}
                    onChangeText={(text) => SetData({ ...Data, NewPassword: text })}
                    style={{
                        height: 45,
                        fontFamily: 'Montserrat-Medium',
                        color: 'black',
                        fontSize: 13,
                        paddingHorizontal: 20,
                        borderWidth: 1,
                        borderRadius: 25,
                        marginTop: 30,
                        borderColor: Color.PrimaryColor,
                        width: '100%',
                    }}
                />


                <TextInput
                    secureTextEntry
                    returnKeyType="done"
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                        if(validate()){
                            PasswordReset();
                        }
                    }}
                    placeholder="Confirm Password"
                    value={Data.ConfirmPassword}
                    onChangeText={(text) => SetData({ ...Data, ConfirmPassword: text })}
                    style={{
                        height: 45,
                        fontFamily: 'Montserrat-Medium',
                        color: 'black',
                        fontSize: 13,
                        paddingHorizontal: 20,
                        borderWidth: 1,
                        borderRadius: 25,
                        marginTop: 20,
                        borderColor: Color.PrimaryColor,
                        width: '100%',
                    }}
                />
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

                <TouchableOpacity
                    onPress={() => {
                        if (validate()) {
                            PasswordReset();
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
                                Reset Password
                            </Text>
                        )}
                </TouchableOpacity>
            </View>
            {IsLoading && <Spinner />}
        </SafeAreaView>
    )
}

export default ResetPassword