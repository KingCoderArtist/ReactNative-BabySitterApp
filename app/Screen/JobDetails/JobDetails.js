import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../Component/TabHeader/index';
import Econ from 'react-native-vector-icons/FontAwesome5';
import Color from '../../../assets/color';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Material from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from "react-native-modal";

const JobDetails = ({ navigation }) => {
    const [Data, SetData] = useState({
        isModalOpen: true
    })
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                title={'job details'}
                rightComp={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Icon name='calendar-month' size={20} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 15 }}>
                        <Material name='call' size={20} color='white' />
                    </TouchableOpacity>
                </View>}
                leftComp={<Econ name='arrow-left' size={20} color='white' />}
                onPressLeft={() => navigation.pop()}
            />

            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ padding: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', backgroundColor: 'white' }}>
                        <View>
                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Montserrat-Medium' }}>Chris Workman</Text>
                            <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)', fontFamily: 'Montserrat-Medium', marginTop: 5 }}>you will love my son!</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)', fontFamily: 'Montserrat-Medium', marginTop: 5 }}>10:00 AM</Text>
                        </View>
                    </View>

                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Montserrat-Medium' }}>Has pets: dogs, cats</Text>
                    </View>

                    <FlatList
                        ItemSeparatorComponent={() => {
                            return <View style={{ height: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.1)' }}></View>
                        }}
                        ListFooterComponent={() => {
                            return <View>
                                <View style={{ flexDirection: 'row', marginTop: 50, alignSelf: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity style={{ borderRadius: 25, height: 50, width: 50, backgroundColor: Color.DarkRed, justifyContent: 'center', alignItems: 'center' }}>
                                        <AntDesign name='close' size={24} color='white' />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ marginLeft: 30, height: 50, width: 50, borderRadius: 25, backgroundColor: Color.Green, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name='check' size={24} color='white' />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity 
                                onPress={()=>navigation.navigate('SitterJobs')}
                                style={{ marginTop: 30, height: 45, width: 230, backgroundColor: Color.Green, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Montserrat-Medium' }}>CHECK-IN</Text>
                                </TouchableOpacity>
                            </View>
                        }}
                        data={[{ key: 'a' }, { key: 'b' }]}
                        renderItem={(data) => {
                            return <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: 'white' }}>
                                <View>
                                    <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium' }}>Passanger #1</Text>
                                    <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)', fontFamily: 'Montserrat-Medium' }}>Caden</Text>
                                    <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)', fontFamily: 'Montserrat-Medium' }}>9 years old</Text>
                                    <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)', fontFamily: 'Montserrat-Medium' }}>No allergies</Text>
                                    <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)', fontFamily: 'Montserrat-Medium' }}>He's very active, so keep him busy!</Text>
                                </View>
                                <CheckBox
                                    label=''
                                    checked={false}
                                    onChange={(checked) => { }}
                                />
                            </View>
                        }}
                    />
                </ScrollView>
            </View>

            <Modal
                animationIn="slideInUp"
                animationOut="slideOutDown"
                onBackdropPress={() => SetData({ ...Data, isModalOpen: !Data.isModalOpen })}
                style={{ alignItems: 'center', justifyContent: 'center' }}
                isVisible={Data.isModalOpen}>
                <View style={{ width: 300, backgroundColor: 'white', borderRadius: 8 }}>
                    <View style={{ height: 45, width: '100%', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: Color.PrimaryColor }}>
                        <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Montserrat-SemiBold' }}>Contact Parent</Text>
                    </View>
                    <TouchableOpacity style={{ height: 45, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                        <Text style={{ fontSize: 15, color: Color.PrimaryColor, fontFamily: 'Montserrat-SemiBold' }}>Text Parent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 45, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                        <Text style={{ fontSize: 15, color: Color.PrimaryColor, fontFamily: 'Montserrat-SemiBold' }}>Call Parent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => SetData({ ...Data, isModalOpen: !Data.isModalOpen })}
                        style={{ height: 45, width: '100%', alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, backgroundColor: 'white' }}>
                        <Text style={{ fontSize: 18, color: Color.PrimaryColor, fontFamily: 'Montserrat-SemiBold' }}>CANCEL</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    )
}


export default JobDetails;