import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BookingComponent from '@Component/BookingComponent';
import AsyncStorage from '@react-native-community/async-storage';
import {Common_Get} from '../../../app/Component/Helper/Helper';
import Spinner from '../../Component/Spinner/Spinner';

const Home = ({navigation}) => {
  const [BookingData, SetBookingData] = useState([]);
  const [IsLoading, SetIsLoading] = useState(true);

  let data = [
    {id: 0, name: 'booking1'},
    {id: 1, name: 'booking2'},
    {id: 2, name: 'booking3'},
    {id: 3, name: 'booking4'},
  ];

  useEffect(() => {
    GetBooking();
  }, []);

  const GetBooking = () => {
    Common_Get('api/user/booking')
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          SetBookingData(res.response);
          SetIsLoading(false);
        } else {
          SetIsLoading(false);
          alert(res.message);
        }
      })
      .catch((e) => {
        console.log(e);
        SetIsLoading(false);
        alert('Something went wrong...!');
      });
  };

  return IsLoading ? (
    <Spinner />
  ) : (
    <View style={{flex: 1}}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('BookSitter')}
        style={{
          backgroundColor: '#2d6eab',
          height: 50,
          width: 50,
          borderRadius: 30,
          elevation: 5,
          position: 'absolute',
          bottom: 10,
          right: 10,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          zIndex: 100000000,
        }}>
        <Icon name="plus" size={28} color="#fff" />
      </TouchableOpacity>
      <FlatList
        data={BookingData}
        contentContainerStyle={{flex: 1}}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40,
            }}>
            <Text style={{fontSize: 18, fontFamily: 'Montserrat-Medium'}}>
              You don't have any booking yet.
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Montserrat-Medium',
                marginTop: 5,
              }}>
              Please Tap "+" to book a Sitter
            </Text>
          </View>
        }
        keyExtractor={(data, index) => index.toString()}
        renderItem={({index, item}) => {
          return (
            <BookingComponent
              key={index}
              item={item}
              NavigateChatScreen={() => navigation.push('ChatScreen')}
              NavigateBookingDetail={() => navigation.push('BookingDetails')}
            />
            //navigation.push('BookingDetails');
          );
        }}
      />
    </View>
  );
};

export default Home;
