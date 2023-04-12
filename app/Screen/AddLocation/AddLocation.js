import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, TextInput, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../../Component/TabHeader/index';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../../assets/color';
import { Common_Post } from '../../Component/Helper/Helper';
import {RNToasty} from 'react-native-toasty';

const AddLocation = ({ navigation }) => {

    const [Data, SetData] = useState({
        Address: '',
        City: '',
        state: '',
        zip: ''
    })
    const [IsLoading, SetIsLoading] = useState(false);

    const CityInput = useRef(null);
    const StateInput = useRef(null);
    const ZipcodeInput = useRef(null);

    const [BadAddress, SetBadAddress] = useState(false);
    const [BadCity, SetBadCity] = useState(false);
    const [BadState, SetBadState] = useState(false);
    const [BadZip, SetBadZip] = useState(false);


    const validate = () => {
        const { Address, City, state, zip } = Data
        let valid = true;

        if (Address === '') {
            valid = false;
            SetBadAddress(true);
        }
        else {
            SetBadAddress(false);
        }

        if (City === '') {
            valid = false;
            SetBadCity(true)
        }
        else {
            SetBadCity(false)
        }

        if (state === '') {
            valid = false;
            SetBadState(true);
        }
        else {
            SetBadState(false)
        }

        if (zip.length < 5 && zip.length > 7 || zip === '') {
            valid = false;
            SetBadZip(true);
        }
        else {
            SetBadZip(false)
        }

        return valid;

    }

    const AddLocation = () => {
        const {Address, City, state, zip } = Data;
        SetIsLoading(true);
        Common_Post('api/user/addparent/location',{
            address:Address,
            city:City, 
            state:state,
            zip:''
        })
        .then(data => data.json())
        .then(res => {
            console.log(res);
            if(res.status === 200){
                SetIsLoading(false)
                SetData({...Data, Address : '', City:'', state:'', zip:''})
                RNToasty.Success({
                    title: res.message,
                    fontFamily: 'Montserrat-Medium',
                  });
                  navigation.pop();
            }
            else{
                SetIsLoading(false)
            }
        })
        .catch(e => {
            console.log(e);
            SetIsLoading(false)
            alert('Something went wrong...!')
        })
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <SafeAreaView style={{ flex: 1 }}>
                <Header
                    title={'Add Location'}
                    rightComp={null}
                    leftComp={<Icon name="arrow-left" size={20} color="white" />}
                    onPressLeft={() => navigation.pop()}
                />


                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
                    <TextInput
                        returnKeyType="next"
                        onEndEditing={() => { CityInput.current.focus() }}
                        placeholder="Address"
                        value={Data.Address}
                        onChangeText={(text) => SetData({ ...Data, Address: text })}
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
                    {BadAddress ? (
                        <Text
                            style={{
                                marginVertical: 5,
                                fontSize: 11,
                                color: 'red',
                                fontFamily: 'Montserrat-Medium',
                            }}>
                            Enter valid Address
                        </Text>
                    ) : null}

                    <TextInput
                        returnKeyType="next"
                        ref={CityInput}
                        onEndEditing={() => { StateInput.current.focus() }}
                        placeholder="City"
                        value={Data.City}
                        onChangeText={(text) => SetData({ ...Data, City: text })}
                        style={{
                            height: 45,
                            marginTop: 20,
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
                     {BadCity ? (
                        <Text
                            style={{
                                marginVertical: 5,
                                fontSize: 11,
                                color: 'red',
                                fontFamily: 'Montserrat-Medium',
                            }}>
                            Enter valid city
                        </Text>
                    ) : null}

                    <TextInput
                        returnKeyType="next"
                        ref={StateInput}
                        onEndEditing={() => { ZipcodeInput.current.focus() }}
                        placeholder="State"
                        value={Data.state}
                        onChangeText={(text) => SetData({ ...Data, state: text })}
                        style={{
                            height: 45,
                            marginTop: 20,
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
                     {BadState ? (
                        <Text
                            style={{
                                marginVertical: 5,
                                fontSize: 11,
                                color: 'red',
                                fontFamily: 'Montserrat-Medium',
                            }}>
                            Enter valid state
                        </Text>
                    ) : null}

                    <TextInput
                        returnKeyType="done"
                        ref={ZipcodeInput}
                        keyboardType='number-pad'
                        onEndEditing={() => {
                            Keyboard.dismiss();
                            if (validate()) {
                                AddLocation();
                            }
                        }}
                        placeholder="Zipcode"
                        value={Data.zip}
                        onChangeText={(text) => SetData({ ...Data, zip: text })}
                        style={{
                            height: 45,
                            marginTop: 20,
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
                     {BadZip ? (
                        <Text
                            style={{
                                marginVertical: 5,
                                fontSize: 11,
                                color: 'red',
                                fontFamily: 'Montserrat-Medium',
                            }}>
                            Zipcode should be 5 or 6 characters
                        </Text>
                    ) : null}

                    <TouchableOpacity
                        onPress={() => {
                            if (validate()) {
                                AddLocation();
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
                                    Add
                                </Text>
                            )}
                    </TouchableOpacity>
                </ScrollView>

            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default AddLocation;