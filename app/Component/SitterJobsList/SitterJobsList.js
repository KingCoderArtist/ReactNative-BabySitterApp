import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Color from '../../../assets/color';

export default SitterJobsList = () => {
    return (
        <TouchableOpacity style={{ width: '100%' }}>
            <View style={{ height: 40, backgroundColor: Color.PrimaryColor, width: '100%', paddingHorizontal: 20, justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Montserrat-Medium' }}>Tommorrow (Thur.)</Text>
            </View>
            <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, width: '100%', backgroundColor: 'rgba(0,0,0,0.05)', }}>
                <Text style={{ fontSize: 13, color: 'black', fontFamily: 'Montserrat-Regular' }}>Parent Name: Chris Workman</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <View style={{ width: '29.5%', justifyContent: 'center', alignItems: 'flex-start', paddingVertical: 20 }}>
                        <Text style={{ fontSize: 13, color: 'black', fontFamily: 'Montserrat-Regular' }}>9:00 AM</Text>
                        <Text style={{ fontSize: 13, color: 'black', fontFamily: 'Montserrat-Regular', marginTop: 5 }}>6:00 PM</Text>
                    </View>
                    <View style={{ width: '0.5%', height: '70%', backgroundColor: 'rgba(0,0,0,0.3)' }}></View>
                    <View style={{ width: '29.5%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 13, color: 'black', fontFamily: 'Montserrat-Regular' }}>10 years</Text>
                        <Text style={{ fontSize: 13, color: 'black', fontFamily: 'Montserrat-Regular', marginTop: 5 }}>3 years</Text>
                    </View>
                    <View style={{ width: '0.5%', height: '70%', backgroundColor: 'rgba(0,0,0,0.3)' }}></View>
                    <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
                        <View>
                            <Text style={{ fontSize: 13, color: 'black', fontFamily: 'Montserrat-Regular' }}>Dog</Text>
                            <Text style={{ fontSize: 13, color: 'black', fontFamily: 'Montserrat-Regular', marginTop: 5 }}>Cat</Text>
                        </View>
                        <View style={{ marginLeft: 20, padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                            <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Bold' }}>85260</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}