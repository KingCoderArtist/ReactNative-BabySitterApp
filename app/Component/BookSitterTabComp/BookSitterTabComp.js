import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Color from '../../../assets/color';
import Icon from 'react-native-vector-icons/FontAwesome5';

const BookSitterTabComp = ({ state, navigation }) => {
    console.log(state.routes, 'tab')
    const [RouteName, SetRouteName] = useState(state.routes)
    return (
        <View style={{ height: 80, backgroundColor: Color.PrimaryColor, width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, justifyContent: 'space-between' }}>
            {
                RouteName.map((route, i) => {
                    if (route.name === 'BookSitter') {
                        return <TouchableOpacity onPress={() => navigation.navigate(route.name)}>
                            <Text style={{ fontSize: 13, color: 'white', fontFamily: 'Montserrat-Regular' }}>Book a Sitter</Text>
                        </TouchableOpacity>
                    }
                    else if (route.name === 'Setting') {
                        return <TouchableOpacity onPress={() => navigation.navigate(route.name)}>
                                <Icon name='menu' size={18} color='white'/>
                        </TouchableOpacity>
                    }
                })
            }
        </View>
    )
}

export default BookSitterTabComp;