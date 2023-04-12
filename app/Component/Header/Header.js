import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({ LeftNavigation, LeftButton, RightButton, Title, RightNavigation }) => {
    return (
        <View style={Styles.MainContainer}>
            {
                LeftButton
                    ?
                    <TouchableOpacity
                        onPress={() => LeftNavigation()}
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='less-than' color='white' size={16} />
                        <Text style={{ fontSize: 16, color: 'white', fontFamily: 'Montserrat-Regular', marginLeft: 5, marginBottom: 3 }}>Back</Text>
                    </TouchableOpacity>
                    :
                    <View style={{ width: 70 }}></View>
            }

        <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Montserrat-SemiBold' }}>{Title}</Text>

            {
                RightButton
                    ?
                    <TouchableOpacity
                        onPress={() => RightNavigation()}
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, color: 'white', fontFamily: 'Montserrat-Regular', marginRight: 5, marginBottom: 3 }}>Back</Text>
                        <Icon name='greater-than' color='white' size={16} />
                    </TouchableOpacity>
                    :
                    <View style={{ width: 70 }}></View>
            }
        </View>
    )
}

export default Header;