import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Foundation from 'react-native-vector-icons/Foundation';
import Color from '../../../assets/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { User_Login } from '../../Component/Helper/Helper';
import { RNToasty } from 'react-native-toasty';

const Profile = ({ params }) => {
  let [data, setData] = useState({
    address: [],
    childrens: [{ name: '', birthday: '' }],
    email: 'parent@gmail.com',
    fullName: 'Parent',
    pets: 'dog',
    phone: 8978675645,
    role: '',
  });
  const [IsLoading, SetIsLoading] = useState(false)

  useEffect(() => {
    getUserData();
  }, []);
  let getUserData = async () => {
    let userData = await AsyncStorage.getItem('userData');
    userData = JSON.parse(userData);
    setData(userData);
    console.log(data, 'hhhhhhh');
  };

  const ResendMail = () => {
    SetIsLoading(true);
    User_Login('api/user/resend-email', {
      _id: data._id,
      email: data.email
    })
      .then(data => data.json())
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          SetIsLoading(false)
          RNToasty.Success({
            title: res.message,
            fontFamily: 'Montserrat-Medium',
          });
          navigation.navigate('OTPVerification', { type: 'profile' });
        }
        else {
          SetIsLoading(false)
          alert(res.message)
        }
      })
      .catch(e => {
        SetIsLoading(false)
        alert('Something went wrong...!')
      })
  }
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          padding: 10,
          backgroundColor: '#fbfbf9',
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {data.role == 'sitter' && (
          <View
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              backgroundColor: '#a4a4a3',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="account" size={60} color="#fff" />
          </View>
        )}
        <View style={{ paddingHorizontal: 10, width: '100%' }}>
          <Text style={{ fontSize: 22, fontFamily: 'Montserrat-Medium' }}>
            {data.fullName}
          </Text>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="email-outline" color="#2d6eab" size={16} />
              <Text style={{ marginLeft: 5, fontFamily: 'Montserrat-Regular' }}>
                {data.email}
              </Text>
            </View>
            {!data.isVerified ?
              <Text style={{ fontFamily: 'Montserrat-Regular', color: 'rgba(0,0,0,0.3)' }}>
                email not verified
              </Text>
              :
              null
            }
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="phone" color="#2d6eab" size={16} />
              <Text style={{ marginLeft: 5, fontFamily: 'Montserrat-Regular' }}>
                {data.phone}
              </Text>
            </View>
            {!data.isVerified ?
              <TouchableOpacity
                onPress={() => ResendMail()}
                style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: Color.PrimaryColor, height: 30, width: 80, borderRadius: 20 }}>
                {
                  IsLoading
                    ?
                    <ActivityIndicator size='small' color='white' />
                    :
                    <Text style={{ fontSize: 10, color: 'white', fontFamily: 'Montserrat-Regular' }}>Verify email</Text>
                }
              </TouchableOpacity>
              :
              null
            }
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            backgroundColor: '#fbfbf9',
            marginTop: 10,
            padding: 10,
          }}>
          <Foundation
            name="address-book"
            size={20}
            color={Color.PrimaryColor}
          />
          <Text
            style={{
              marginLeft: 8,
              fontSize: 16,
              fontFamily: 'Montserrat-Medium',
            }}>
            {/* {data.address[0]} */}
            Address :{' '}
            <Text style={{ fontFamily: 'Montserrat-Regular' }}>
              {data.address.length && data.address[0][0]}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            backgroundColor: '#fbfbf9',

            padding: 10,
          }}>
          <MaterialCommunityIcons
            name="city"
            size={20}
            color={Color.PrimaryColor}
          />
          <Text
            style={{
              marginLeft: 8,
              fontSize: 16,
              fontFamily: 'Montserrat-Medium',
            }}>
            {/* {data.address[0]} */}
            City :{' '}
            <Text style={{ fontFamily: 'Montserrat-Regular' }}>
              {data.address.length && data.address[0].city}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            backgroundColor: '#fbfbf9',

            padding: 10,
          }}>
          <MaterialCommunityIcons
            name="home-city"
            size={20}
            color={Color.PrimaryColor}
          />
          <Text
            style={{
              marginLeft: 8,
              fontSize: 16,
              fontFamily: 'Montserrat-Medium',
            }}>
            {/* {data.address[0]} */}
            State :{' '}
            <Text style={{ fontFamily: 'Montserrat-Regular' }}>
              {data.address.length && data.address[0].state}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            backgroundColor: '#fbfbf9',

            padding: 10,
          }}>
          <MaterialCommunityIcons
            name="zip-box"
            size={20}
            color={Color.PrimaryColor}
          />
          <Text
            style={{
              marginLeft: 8,
              fontSize: 16,
              fontFamily: 'Montserrat-Medium',
            }}>
            {/* {data.address[0]} */}
            Zip :{' '}
            <Text style={{ fontFamily: 'Montserrat-Regular' }}>
              {data.address.length && data.address[0].zip}
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fbfbf9',
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            padding: 10,
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 16,
                fontFamily: 'Montserrat-Medium',
              }}>
              Children
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium' }}>
            D.O.B
          </Text>
        </View>
        {data.childrens.map((d, i) => {
          return (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                padding: 10,
                justifyContent: 'space-between',
                backgroundColor: i % 2 == 0 ? 'rgb(223,223,223)' : 'transparet',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon size={24} color="#2d6eab" name="account-child" />
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 16,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {d.name}
                </Text>
              </View>
              <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium' }}>
                {d.birthday}
              </Text>
            </View>
          );
        })}
      </View>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 20,
          color: '#83bcf5',
          fontSize: 16,
          fontFamily: 'Montserrat-Bold',
        }}>
        MODIFY PAYMENTS
      </Text>
    </View>
  );
};

export default Profile;
