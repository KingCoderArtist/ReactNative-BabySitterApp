import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Header from '../../Component/TabHeader/index';
import Color from '../../../assets/color/index';
import Icon from 'react-native-vector-icons/Feather';
import CheckBox from 'react-native-checkbox';
import Econ from 'react-native-vector-icons/FontAwesome5';

const PreferredSitters = ({ navigation }) => {
    const [CheckBoxData, SetCheckBoxData] = useState({
        boy: false,
        girl: false,
        highSchool: false,
        college: false
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                title={'Preferred Sitters'}
                rightComp={null}
                leftComp={<Econ name='arrow-left' size={20} color='white' />}
                onPressLeft={() => navigation.pop()}
            />

           
            <View style={{ marginTop: 50 }}>
                <View style={{ height: 45, paddingHorizontal: 20, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Montserrat-Medium' }}>BOY ...</Text>
                    <CheckBox
                        label=''
                        checked={CheckBoxData.boy}
                        onChange={(checked) => SetCheckBoxData({ ...CheckBoxData, boy: !CheckBoxData.boy })}
                    />
                </View>

                <View style={{ marginTop: 10, height: 45, paddingHorizontal: 20, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Montserrat-Medium' }}>GIRL ...</Text>
                    <CheckBox
                        label=''
                        checked={CheckBoxData.girl}
                        onChange={(checked) => SetCheckBoxData({ ...CheckBoxData, girl: !CheckBoxData.girl })}
                    />
                </View>

                <View style={{ marginTop: 10, height: 45, paddingHorizontal: 20, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Montserrat-Medium' }}>HIGH SCHOOL</Text>
                    <CheckBox
                        label=''
                        checked={CheckBoxData.highSchool}
                        onChange={(checked) => SetCheckBoxData({ ...CheckBoxData, highSchool: !CheckBoxData.highSchool })}
                    />
                </View>

                <View style={{ marginTop: 10, height: 45, paddingHorizontal: 20, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Montserrat-Medium' }}>COLLEGE & BEYONG</Text>
                    <CheckBox
                        label=''
                        checked={CheckBoxData.college}
                        onChange={(checked) => SetCheckBoxData({ ...CheckBoxData, college: !CheckBoxData.college })}
                    />
                </View>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('BookingNotes')}
                style={{ height: 45, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.PrimaryColor, alignSelf: 'center', marginTop: 50, borderRadius: 25 }}>
                <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Montserrat-Medium' }}>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default PreferredSitters