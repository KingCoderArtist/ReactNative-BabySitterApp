import React from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Booking = ({ NavigateBookingDetail, NavigateChatScreen, item }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={() => NavigateBookingDetail()}
    style={{
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      padding: 10,
      backgroundColor: '#f9f9fc',
      margin: 10,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
    <View
      style={{
        width: 50,
        height: 50,
        // backgroundColor: '#ccc',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* <Icon name="account" size={28} color="#fff" /> */}
      <ImageBackground source={{ uri: item.image }} style={{ height: 28, width: 28 }} />
    </View>
    <View style={{ marginLeft: 10, flex: 1 }}>
      <Text style={{ fontSize: 18, fontFamily: 'Montserrat-Medium' }}>
        {item.name}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="calendar-month" color="#2d6eab" size={16} />
          <Text
            style={{
              fontSize: 12,
              marginLeft: 5,
              fontFamily: 'Montserrat-Medium',
            }}>
            {item.endDate}
          </Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
          <Icon name="clock" color="#2d6eab" size={16} />
          <Text
            style={{
              fontSize: 12,
              marginLeft: 5,
              fontFamily: 'Montserrat-Medium',
            }}>
            12:30 PM
          </Text>
        </View>
      </View>
    </View>
    <Icon
      onPress={() => NavigateChatScreen()}
      name="message-plus"
      color="#2d6eab"
      size={28}
    />
  </TouchableOpacity>
);

export default Booking;
