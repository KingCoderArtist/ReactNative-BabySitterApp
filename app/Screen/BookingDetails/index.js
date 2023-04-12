import React from 'react';
import {Text, View} from 'react-native';
import Header from '@Component/TabHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';

const BookingDetails = ({navigation}) => (
  <View style={{flex: 1}}>
    <Header
      onPressLeft={() => {
        navigation.pop();
      }}
      leftComp={<Icon name="arrow-left" size={20} color="#fff" />}
      title={'Chat'}
      rightComp={<Icon name="edit" size={20} color="#fff" />}
    />
    <Text>Comming Soon</Text>
  </View>
);

export default BookingDetails;
