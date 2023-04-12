import React from 'react';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
const Setting = ({navigation}) => {
  let list = [
    'Terms of Service',
    'Privacy Policy',
    'Support',
    'Check For Update',
    'Logout',
  ];
  return (
    <View style={{flex: 1, zIndex: 100}}>
      {list.map((d, i) => {
        return (
          <TouchableOpacity
            onPress={() => {
              if (d == 'Logout') {
                Alert.alert('Confirm', 'Are sure you have to logout', [
                  {
                    text: 'Yes',
                    onPress: () => {
                      AsyncStorage.multiRemove(['token', 'userData']).then(
                        () => {
                          navigation.replace('Login');
                        },
                      );
                    },
                  },
                  {
                    text: 'No',
                  },
                ]);
              }
            }}
            activeOpacity={0.9}
            style={{
              height: 45,
              paddingHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              elevation: 2,
              marginHorizontal: 10,
              borderRadius: 5,
              marginVertical: 5,
              justifyContent: 'space-between',
            }}
            key={i}>
            <Text style={{fontSize: 18, fontFamily: 'Montserrat-Medium'}}>
              {d}
            </Text>
            <Icons
              name={d == 'Logout' ? 'logout' : 'chevron-right'}
              size={24}
              color="rgb(210,210,210)"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Setting;
