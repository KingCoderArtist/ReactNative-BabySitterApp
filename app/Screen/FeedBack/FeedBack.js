import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../Component/TabHeader/index';
import Econ from 'react-native-vector-icons/FontAwesome5';
import Color from '../../../assets/color';
import { Rating, AirbnbRating } from 'react-native-ratings';
import CheckBox from 'react-native-checkbox';

const FeedBack = ({ navigation }) => {
    const [Data, SetData] = useState({
        DefaultRating: 5,
        feedBackText: '',
        FiveDollar: false,
        TenDollar: false,
        OtherDollar: '',
        TotalHours: '',
        HourlyRate: '',
        SubTotal: '',
        Tip: '',
        TotalCharge: '',
        RebookedWith: '',
        isRebookedWith:false
    })
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.PRIMARY_BACKGROUND_COLOR }}>
            <Header
                title={'feedback'}
                rightComp={null}
                leftComp={<Econ name='arrow-left' size={20} color='white' />}
                onPressLeft={() => navigation.pop()}
            />

            <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false} >
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Montserrat-Medium' }}>Rate Sitter</Text>
                        <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Montserrat-Medium', marginTop: 5 }}>(Kayla)</Text>
                    </View>
                    <AirbnbRating
                        selectedColor={'#f4a521'}
                        count={5}
                        showRating={false}
                        starContainerStyle={{ height: 20, }}
                        defaultRating={Data.DefaultRating}
                        reviewColor={'#f4a521'}
                        size={20}
                        onFinishRating={(val) => SetData({ ...Data, DefaultRating: val })}
                    />
                </View>

                <TextInput
                    multiline
                    value={Data.feedBackText}
                    onChangeText={(text) => SetData({ ...Data, feedBackText: text })}
                    placeholder='Please give your feedback...'
                    style={{ borderRadius: 8, padding: 15, height: 90, width: '100%', marginTop: 20, textAlignVertical: 'top', backgroundColor: 'white', fontFamily: 'Montserrat-Medium', fontSize: 15, color: Color.PrimaryColor }}>
                </TextInput>

                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 20 }}>
                    <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium', marginTop: 5 }}>Tip</Text>
                    <View style={{ marginLeft: 55 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium' }}>$5.00</Text>
                            <View style={{ marginLeft: 40 }}>
                                <CheckBox
                                    label=''
                                    checked={Data.FiveDollar}
                                    onChange={(checked) => SetData({ ...Data, FiveDollar: !Data.FiveDollar })}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium' }}>$10.00</Text>
                            <View style={{ marginLeft: 35 }}>
                                <CheckBox
                                    label=''
                                    checked={Data.TenDollar}
                                    onChange={(checked) => SetData({ ...Data, TenDollar: !Data.TenDollar })}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium', marginTop: 5 }}>Others</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                        <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium' }}>$</Text>
                        <View style={{ marginLeft: 10 }}>
                            <TextInput
                                value={Data.OtherDollar}
                                onChangeText={(text) => SetData({ ...Data, OtherDollar: text })}
                                keyboardType='numeric'
                                style={{ paddingHorizontal: 10, height: 45, backgroundColor: 'white', width: 80, fontFamily: 'Montserrat-Medium', color: Color.PrimaryColor }}>

                            </TextInput>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center',  }}>
                    <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium', marginTop: 5 }}>Total Hours :</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 , }}>
                        <View>
                            <TextInput
                                value={Data.TotalHours}
                                onChangeText={(text) => SetData({ ...Data, TotalHours: text })}
                                keyboardType='numeric'
                                style={{ paddingHorizontal: 10, height: 45, backgroundColor: 'white', width: 40, fontFamily: 'Montserrat-Medium', color: Color.PrimaryColor }}>

                            </TextInput>
                        </View>
                        <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium', marginTop: 0, marginHorizontal: 10 }}>X $</Text>
                        <View>
                            <TextInput
                                value={Data.HourlyRate}
                                onChangeText={(text) => SetData({ ...Data, HourlyRate: text })}
                                keyboardType='numeric'
                                style={{ paddingHorizontal: 10, height: 45, backgroundColor: 'white', width: 80, fontFamily: 'Montserrat-Medium', color: Color.PrimaryColor }}>

                            </TextInput>
                        </View>
                        <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium', marginTop: 0, marginLeft: 10 }}>hourly rate</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium', marginTop: 5 }}>SubTotal :</Text>
                    <View style={{ marginLeft: 25 }}>
                        <TextInput
                            value={Data.SubTotal}
                            onChangeText={(text) => SetData({ ...Data, SubTotal: text })}
                            keyboardType='numeric'
                            style={{ paddingHorizontal: 10, height: 45, backgroundColor: 'white', width: 80, fontFamily: 'Montserrat-Medium', color: Color.PrimaryColor }}>

                        </TextInput>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium', marginTop: 5 }}>Tip :</Text>
                    <View style={{ marginLeft: 65 }}>
                        <TextInput
                            value={Data.Tip}
                            onChangeText={(text) => SetData({ ...Data, Tip: text })}
                            keyboardType='numeric'
                            style={{ paddingHorizontal: 10, height: 45, backgroundColor: 'white', width: 80, fontFamily: 'Montserrat-Medium', color: Color.PrimaryColor }}>

                        </TextInput>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Bold', marginTop: 5 }}>Total Charge :</Text>
                    <View style={{ marginLeft: 20 }}>
                        <TextInput
                            value={Data.TotalCharge}
                            onChangeText={(text) => SetData({ ...Data, TotalCharge: text })}
                            keyboardType='numeric'
                            style={{ paddingHorizontal: 10, height: 45, backgroundColor: 'white', width: 80, fontFamily: 'Montserrat-Medium', color: Color.PrimaryColor }}>

                        </TextInput>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium', marginTop: 5 }}>Would you rebook with</Text>

                    <TextInput
                        value={Data.RebookedWith}
                        onChangeText={(text) => SetData({ ...Data, RebookedWith: text })}
                        keyboardType='numeric'
                        style={{ paddingHorizontal: 10, height: 40, width: 80, borderBottomWidth: 1, borderColor: 'black', fontFamily: 'Montserrat-Medium', color: Color.PrimaryColor }}>

                    </TextInput>
                    <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium', marginTop: 5 }}>?</Text>
                    <View style={{ marginLeft: 40 }}>
                        <CheckBox
                            label=''
                            checked={Data.isRebookedWith}
                            onChange={(checked) => SetData({ ...Data, isRebookedWith: !Data.isRebookedWith })}
                        />
                    </View>

                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('JobDetails')}
                    style={{ height: 45, width: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.PrimaryColor, alignSelf: 'center', marginTop: 50, borderRadius: 25 }}>
                    <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Montserrat-Medium' }}>Checkout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default FeedBack;