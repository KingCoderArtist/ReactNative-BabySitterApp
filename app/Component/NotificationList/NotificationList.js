import React from 'react';
import { View, Text } from 'react-native';

const NotificationList = ({ navigation }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', backgroundColor: 'white', width: '100%', padding: 15, justifyContent: 'space-between' }}>
            <View>
                <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Montserrat-Bold' }}>Chris Workman</Text>
                <Text style={{ fontSize: 14, color: 'rgba(0,0,0,0.3)', fontFamily: 'Montserrat-Medium', marginTop:5 }}>5/3/2018</Text>
                <Text style={{ fontSize: 14, color: 'rgba(0,0,0,0.3)', fontFamily: 'Montserrat-Medium', marginTop:5 }}>Preferred Job</Text>
            </View>
            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Montserrat-Medium' }}>5/01/18</Text>
        </View>
    )
}

export default NotificationList;