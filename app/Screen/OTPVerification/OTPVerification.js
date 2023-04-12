import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import Color from '../../../assets/color';
import Header from '../../Component/TabHeader/index';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Spinner from '../../Component/Spinner/Spinner';
import { Verify_Otp } from '../../Component/Helper/Helper';

const OTPVerification = ({ navigation, route }) => {
    const [ParamData, SetParamData] = useState(route.params ? route.params : {
        type: ''
    })
    const [OTP, SetOtp] = useState('');
    const [BadOtp, SetBadOtp] = useState(false)
    const [IsLoading, SetIsLoading] = useState(false);

    const validate = () => {
        let valid = true;

        if (OTP === '') {
            valid = false;
            SetBadOtp(true)
        }
        else {
            SetBadOtp(false)
        }

        return valid
    }

    const VerfiyOtp = () => {
        console.log("Here1!");
        SetIsLoading(true);
        console.log("Here2!");
        Verify_Otp('api/user/confirm-email', {
            otp: OTP
        })
            .then(data => data.json())
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    SetIsLoading(false)
                    ParamData.type === 'profile'
                    ?
                    navigation.goBack()
                    :
                    navigation.replace('AccountPending', {
                        isVerified: ParamData.type === 'login' ? true : false
                    })
                }
                else {
                    SetIsLoading(false)
                    alert(res.message)
                }
            })
            .catch(e => {
                console.log(e);
                alert('Something went wrong...!')
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
                title={'Verify OTP'}
            />
            <View style={{ flex: 1 }}>
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
                            marginVertical: 5,
                            fontSize: 11,
                            color: 'red',
                            textAlign: 'center',
                            fontFamily: 'Montserrat-Medium',

                        }}>
                        Enter valid otp
                    </Text>
                ) : null}
                <TouchableOpacity
                    onPress={() => {
                        if (validate()) {
                            VerfiyOtp();
                        }
                    }}
                    style={{
                        marginTop: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 45,
                        backgroundColor: Color.PrimaryColor,
                        borderRadius: 25,
                        width: '75%',
                        alignSelf: 'center'
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
                                Verify OTP
                            </Text>
                        )}
                </TouchableOpacity>
            </View>
            {IsLoading && <Spinner />}
        </SafeAreaView>
    )
}

export default OTPVerification;