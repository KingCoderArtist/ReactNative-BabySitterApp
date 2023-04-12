import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Platform, ActivityIndicator, Keyboard } from 'react-native';
import Header from '../../Component/TabHeader/index';
import Econ from 'react-native-vector-icons/FontAwesome5';
import Color from '../../../assets/color/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Common_Post, Common_Put } from '../../Component/Helper/Helper';
import { RNToasty } from 'react-native-toasty';
import Spinner from '../../Component/Spinner/Spinner';

var Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const AddChild = ({ navigation, route }) => {
    console.warn(route.params)
    const [ChildDetail, SetChildDetail] = useState({
        DatePicker: false,
        childId: route.params ? route.params.data._id : '',
        type: route.params ? route.params.type : '',
        name: route.params ? route.params.data.name : '',
        gender: route.params ? route.params.data.gender : '',
        date: route.params ? route.params.data.date : 'Date',
        allergies: route.params ? route.params.data.allergies : '',
        notes: route.params ? route.params.data.notes : '',
        PostFormateDate: ''
    })
    const [BadName, SetBadName] = useState(false);
    const [BadGender, SetBadGender] = useState(false);
    const [BadDate, SetBadDate] = useState(false);
    const [BadAllergies, SetBadAllerigies] = useState(false);
    const [IsLoading, SetIsLoading] = useState(false);

    const GenderInput = useRef(null);
    const NotesInput = useRef(null);

    const SetDate = (value) => {
        let month = value.getMonth();
        let monthName = Months[month];

        let date = value.getDate();

        let year = value.getFullYear();

        // let finalDate = monthName + " " + date + ", " + year;
        let postFormateDate = date + '/' + month + '/' + year;

        SetChildDetail({ ...ChildDetail, DatePicker: false, date: postFormateDate, })
    }

    const AddChild = () => {
        console.warn('jjj')
        const { name, gender, date, allergies, notes, PostFormateDate } = ChildDetail;
        SetIsLoading(true);
        Common_Post('api/user/child', {
            name: name,
            gender: gender,
            date: date,
            allergies: allergies,
            notes: notes
        })
            .then(data => data.json())
            .then(res => {
                console.log(res);
                if (res.status === 201) {
                    SetIsLoading(false);
                    SetChildDetail({
                        ...ChildDetail,
                        name: '',
                        gender: '',
                        date: 'Date',
                        allergies: '',
                        notes: '',
                        PostFormateDate: ''
                    })
                    RNToasty.Success({
                        title: res.message,
                        fontFamily: 'Montserrat-Medium',
                    })
                    navigation.pop()
                }
                else {
                    SetIsLoading(false);
                    alert(res.message)
                }
            })
            .catch(e => {
                console.log(e)
                SetIsLoading(false);
                alert('Something went wrong...!')
            })
    }

    const validate = () => {
        const { name, gender, date, } = ChildDetail;
        let valid = true;

        if (name === '') {
            valid = false;
            SetBadName(true);
        }
        else {
            SetBadName(false)
        }

        if (gender === '') {
            valid = false;
            SetBadGender(true);
        }
        else {
            SetBadGender(false)
        }

        if (date === 'Date') {
            valid = false;
            SetBadDate(true);
        }
        else {
            SetBadDate(false)
        }


        return valid

    }

    const UpdateChild = () => {
        const { childId, name, gender, date, allergies, notes } = ChildDetail;
        SetIsLoading(true);
        Common_Put(`api/user/child/${childId}`, {
            name: name,
            gender: gender,
            date: date,
            allergies: allergies,
            notes: notes
        })
            .then(data => data.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    SetIsLoading(false);
                    RNToasty.Success({
                        title: res.message,
                        fontFamily: 'Montserrat-Medium',
                    })
                    navigation.pop()
                }
                else {
                    SetIsLoading(false);
                    alert(res.message)
                }
            })
            .catch(e => {
                console.log(e)
                SetIsLoading(false);
                alert('Something went wrong...!')
            })

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                title={'child'}
                rightComp={null}
                leftComp={<Econ name='arrow-left' size={20} color='white' />}
                onPressLeft={() => navigation.pop()}
            />

            <ScrollView style={{ marginTop: 10 }}>
                <TextInput
                    returnKeyType='next'
                    onSubmitEditing={() => GenderInput.current.focus()}
                    value={ChildDetail.name}
                    onChangeText={(text) => SetChildDetail({ ...ChildDetail, name: text })}
                    placeholder='Name'
                    style={{ height: 45, paddingHorizontal: 20, width: '100%', backgroundColor: 'white', fontFamily: 'Montserrat-Medium', color: Color.PrimaryColor }}>
                </TextInput>
                {BadName ? (
                    <Text
                        style={{
                            marginVertical: 5,
                            marginLeft: 15,
                            fontSize: 11,
                            color: 'red',
                            fontFamily: 'Montserrat-Medium',
                        }}>
                        enter valid name
                    </Text>
                ) : null}

                <TextInput
                    returnKeyType='done'
                    onSubmitEditing={() => Keyboard.dismiss()}
                    ref={GenderInput}
                    value={ChildDetail.gender}
                    onChangeText={(text) => SetChildDetail({ ...ChildDetail, gender: text })}
                    placeholder='Gender'
                    style={{ marginTop: 30, height: 45, paddingHorizontal: 20, width: '100%', backgroundColor: 'white', fontFamily: 'Montserrat-Medium', color: Color.PrimaryColor }}>
                </TextInput>
                {BadGender ? (
                    <Text
                        style={{
                            marginVertical: 5,
                            marginLeft: 15,
                            fontSize: 11,
                            color: 'red',
                            fontFamily: 'Montserrat-Medium',
                        }}>
                        enter valid gender
                    </Text>
                ) : null}


                <TouchableOpacity
                    disabled={ChildDetail.type === 'edit' ? true : false}
                    style={{ justifyContent: 'center', marginTop: 30, height: 45, paddingHorizontal: 20, width: '100%', backgroundColor: 'white', fontFamily: 'Montserrat-Medium', color: Color.PrimaryColor }}
                    onPress={() => SetChildDetail({ ...ChildDetail, DatePicker: true })}>
                    <Text style={{ fontSize: 14, color: ChildDetail.date === 'Date' ? 'rgba(0,0,0,0.2)' : Color.PrimaryColor, fontFamily: 'Montserrat-Medium' }}>{ChildDetail.date}</Text>
                </TouchableOpacity>
                {
                    ChildDetail.DatePicker
                        ?

                        <DateTimePicker
                            value={new Date()}
                            mode='datetime'
                            is24Hour={false}
                            display="default"
                            onChange={(event, date) => SetDate(date)}
                        />

                        :
                        null
                }
                {BadDate ? (
                    <Text
                        style={{
                            marginVertical: 5,
                            marginLeft: 15,
                            fontSize: 11,
                            color: 'red',
                            fontFamily: 'Montserrat-Medium',
                        }}>
                        select valid date
                    </Text>
                ) : null}

                <TextInput
                    value={ChildDetail.allergies}
                    onSubmitEditing={() => NotesInput.current.focus()}
                    returnKeyType='next'
                    onChangeText={(text) => SetChildDetail({ ...ChildDetail, allergies: text })}
                    placeholder='Allergies'
                    style={{ marginTop: 30, height: 45, paddingHorizontal: 20, width: '100%', backgroundColor: 'white', fontFamily: 'Montserrat-Medium', color: Color.PrimaryColor }}>
                </TextInput>
                {/* {BadAllergies ? (
                    <Text
                        style={{
                            marginVertical: 5,
                            marginLeft: 15,
                            fontSize: 11,
                            color: 'red',
                            fontFamily: 'Montserrat-Medium',
                        }}>
                        enter valid allergies
                    </Text>
                ) : null} */}

                <TextInput
                    ref={NotesInput}
                    multiline
                    onSubmitEditing={() => {
                        if (validate()) {
                            AddChild()
                        }
                    }}
                    returnKeyType='done'
                    value={ChildDetail.notes}
                    onChangeText={(text) => SetChildDetail({ ...ChildDetail, notes: text })}
                    placeholder='Notes (Optional)'
                    style={{ marginTop: 30, height: 90, textAlignVertical: 'top', paddingHorizontal: 20, width: '100%', backgroundColor: 'white', fontFamily: 'Montserrat-Medium', color: Color.PrimaryColor }}>
                </TextInput>

                <TouchableOpacity
                    onPress={
                        ChildDetail.type === 'edit'
                            ?
                            () => {
                                if (validate()) {
                                    UpdateChild()
                                }
                            }
                            :
                            () => {
                                if (validate()) {
                                    AddChild()
                                }
                            }}
                    // onPress={() => navigation.navigate('BookSitterContinued')}
                    style={{ height: 45, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.PrimaryColor, alignSelf: 'center', marginTop: 50, borderRadius: 25 }}>
                    {
                        IsLoading
                            ?
                            <ActivityIndicator size='small' color='white' />
                            :
                            <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Montserrat-Medium' }}>{ChildDetail.type === 'edit' ? 'Save' : 'Add'}</Text>
                    }
                </TouchableOpacity>
            </ScrollView>
            {
                IsLoading && <Spinner/>
            }

        </SafeAreaView>
    )
}

export default AddChild;