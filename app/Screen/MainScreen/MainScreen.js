import React from 'react';
import { View, Text, ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import Color from '../../../assets/color';

const WIDTH = Dimensions.get('window').width;

const MainScreen = ({ navigation, route }) => {
    console.warn(route.params.type)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground imageStyle='cover' source={require('../../../assets/images/bg2.jpg')} style={{ flex: 1 }}>
                <View style={{ paddingVertical: 30, backgroundColor: Color.PrimaryColor, width: WIDTH - 40, alignSelf: 'center', position: 'absolute', top: 20, alignItems: 'center' }}>
                    <Text style={{ fontSize: Platform.OS === 'ios' ? 36 : 42, color: 'white', fontFamily: "Montserrat-Regular" }}>Sitter App</Text>
                </View>

                <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                    <Text style={{ fontSize: 23, color: 'white', fontFamily: 'Montserrat-Bold', textAlign: 'center', marginBottom: 40 }}>Highly qualified screened sitters anywhere, any time!</Text>
                    <View style={{ height: 100, width: '100%', backgroundColor: Color.PrimaryColor, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={{ height: '100%', width: '49.75%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Montserrat-Regular' }}>My Bookings</Text>
                        </TouchableOpacity>
                        <View style={{ width: '0.5%', height: '100%', backgroundColor: 'black' }}></View>
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('MyTabs')}
                        style={{ height: '100%', width: '49.75%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Montserrat-Regular' }}>{route.params.type === 'Parent' ? 'Book a Sitter' : 'Jobs'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default MainScreen;